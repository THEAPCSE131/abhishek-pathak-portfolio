import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, ElementRef, HostListener, afterNextRender, inject, signal } from '@angular/core';
import { navigation, portfolioConfig } from '../../../models/portfolio.config';
import { IconComponent } from '../../../shared/icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly document = inject(DOCUMENT);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private scrollFrame: number | null = null;
  private scrollIdleTimer: number | undefined;
  private pendingSection: string | null = null;
  readonly navigation = navigation.filter(item => item.enabled);
  readonly resumeUrl = portfolioConfig.resumeUrl;
  readonly menuOpen = signal(false);
  readonly currentSection = signal('home');
  readonly lightTheme = signal(false);

  constructor() {
    let savedTheme: string | null | undefined;
    try {
      savedTheme = this.document.defaultView?.localStorage.getItem('portfolio-theme');
    } catch { /* Storage can be unavailable in private browsing. */ }
    this.lightTheme.set(savedTheme === 'light' || (savedTheme !== 'dark' &&
      (this.document.defaultView?.matchMedia('(prefers-color-scheme: light)').matches ?? false)));
    this.applyTheme();
    afterNextRender(() => this.scheduleSectionUpdate());
    this.destroyRef.onDestroy(() => {
      const browserWindow = this.document.defaultView;
      if (this.scrollFrame !== null) browserWindow?.cancelAnimationFrame(this.scrollFrame);
      browserWindow?.clearTimeout(this.scrollIdleTimer);
    });
  }

  toggleTheme(): void {
    this.lightTheme.update(value => !value);
    this.applyTheme();
    try {
      this.document.defaultView?.localStorage.setItem('portfolio-theme', this.lightTheme() ? 'light' : 'dark');
    } catch { /* The toggle still works without persisted preferences. */ }
  }

  toggleMenu(): void {
    this.menuOpen.update(value => !value);
    if (this.menuOpen()) {
      this.document.defaultView?.requestAnimationFrame(() => {
        if (this.menuOpen()) {
          this.document.querySelector<HTMLElement>('#primary-navigation a')?.focus();
        }
      });
    }
  }

  navigateToSection(event: MouseEvent, sectionId: string): void {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const section = this.document.getElementById(sectionId);
    if (!section) return;
    event.preventDefault();
    this.menuOpen.set(false);
    this.pendingSection = sectionId;
    this.currentSection.set(sectionId);
    this.keepActiveLinkVisible();
    const reducedMotion = this.document.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches;
    section.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
    this.scheduleSectionUpdate();
    this.scheduleScrollIdle();
    const browserWindow = this.document.defaultView;
    browserWindow?.history.replaceState(browserWindow.history.state, '', '#' + sectionId);
    const heading = section.querySelector<HTMLElement>('h1, h2');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }

  @HostListener('document:keydown.escape')
  closeMenu(): void {
    if (this.menuOpen()) {
      this.menuOpen.set(false);
      this.document.getElementById('menu-toggle')?.focus();
    }
  }

  @HostListener('document:click', ['$event'])
  @HostListener('document:focusin', ['$event'])
  dismissMenuOutsideHeader(event: Event): void {
    if (this.menuOpen() && !this.element.nativeElement.contains(event.target as Node | null)) {
      this.menuOpen.set(false);
    }
  }

  @HostListener('window:resize')
  closeMenuOnDesktop(): void {
    if (this.document.defaultView?.matchMedia('(min-width: 901px)').matches) {
      this.menuOpen.set(false);
    }
    this.scheduleSectionUpdate();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scheduleSectionUpdate();
    this.scheduleScrollIdle();
  }

  private scheduleScrollIdle(): void {
    const browserWindow = this.document.defaultView;
    if (!browserWindow) return;
    browserWindow.clearTimeout(this.scrollIdleTimer);
    this.scrollIdleTimer = browserWindow.setTimeout(() => {
      this.pendingSection = null;
      this.scheduleSectionUpdate();
    }, 180);
  }

  private scheduleSectionUpdate(): void {
    const browserWindow = this.document.defaultView;
    if (!browserWindow || this.scrollFrame !== null) return;
    this.scrollFrame = browserWindow.requestAnimationFrame(() => {
      this.scrollFrame = null;
      const headerBottom = this.element.nativeElement.getBoundingClientRect().bottom;
      const activationLine = headerBottom + Math.min(120, browserWindow.innerHeight * .2);
      let activeId = this.navigation[0]?.id;
      for (const item of this.navigation) {
        const section = this.document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= activationLine) activeId = item.id;
      }
      // Retain the selected link while smooth scrolling past intermediate sections.
      if (this.pendingSection && activeId !== this.pendingSection) return;
      this.pendingSection = null;
      if (activeId && activeId !== this.currentSection()) {
        this.currentSection.set(activeId);
        this.keepActiveLinkVisible();
      }
    });
  }

  private keepActiveLinkVisible(): void {
    const browserWindow = this.document.defaultView;
    const menu = this.element.nativeElement.querySelector<HTMLElement>('#primary-navigation');
    const link = menu?.querySelector<HTMLElement>(`a[href="#${this.currentSection()}"]`);
    if (!browserWindow || !menu || !link || menu.scrollWidth <= menu.clientWidth) return;
    const style = browserWindow.getComputedStyle(menu);
    if (style.visibility === 'hidden' || !['auto', 'scroll'].includes(style.overflowX)) return;
    const menuBounds = menu.getBoundingClientRect();
    const linkBounds = link.getBoundingClientRect();
    const offset = linkBounds.left < menuBounds.left ? linkBounds.left - menuBounds.left - 8
      : linkBounds.right > menuBounds.right ? linkBounds.right - menuBounds.right + 8 : 0;
    if (offset) menu.scrollBy({ left: offset, behavior: 'instant' });
  }

  private applyTheme(): void {
    this.document.documentElement.setAttribute('data-theme', this.lightTheme() ? 'light' : 'dark');
  }
}
