import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { navigation, portfolioConfig } from '../../../models/portfolio.config';
import { IconComponent } from '../../../shared/icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private readonly document = inject(DOCUMENT);
  readonly year = new Date().getFullYear();
  readonly links = ['home', 'about', 'services', 'projects', 'contact']
    .flatMap(id => navigation.filter(link => link.id === id && link.enabled));
  readonly socialLinks = portfolioConfig.socialLinks.map(link => ({
    ...link,
    url: link.icon === 'email' ? portfolioConfig.contactUrl + '?subject=Portfolio%20Inquiry' : link.url,
  }));
  readonly whatsappUrl = /^91[6-9]\d{9}$/.test(environment.contact.whatsappNumber)
    ? `https://wa.me/${environment.contact.whatsappNumber}?text=${encodeURIComponent('Hi Abhishek, I visited your developer portfolio and would like to discuss a project or professional opportunity.')}`
    : null;

  navigateToSection(event: MouseEvent, sectionId: string): void {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const section = this.document.getElementById(sectionId);
    if (!section) return;
    event.preventDefault();
    const browserWindow = this.document.defaultView;
    const reducedMotion = browserWindow?.matchMedia('(prefers-reduced-motion: reduce)').matches;
    section.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
    browserWindow?.history.replaceState(browserWindow.history.state, '', '#' + sectionId);
    const heading = section.querySelector<HTMLElement>('h1, h2');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }
}
