import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
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
    this.currentSection.set(sectionId);
    const reducedMotion = this.document.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches;
    section.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
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
  }

  private applyTheme(): void {
    this.document.documentElement.setAttribute('data-theme', this.lightTheme() ? 'light' : 'dark');
  }
}
