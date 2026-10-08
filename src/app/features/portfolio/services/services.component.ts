import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IconComponent } from '../../../shared/icon.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  private readonly document = inject(DOCUMENT);
  readonly services = [
    {
      id: 'portfolio', title: 'Portfolio Websites', icon: 'monitor', accent: 'purple',
      description: 'Modern and responsive personal portfolios, resumes and professional websites.',
      tags: ['Personal Portfolio', 'Resume Website', 'Modern UI/UX'],
    },
    {
      id: 'business', title: 'Business Websites', icon: 'globe', accent: 'blue',
      description: 'Professional websites for businesses, startups and service providers.',
      tags: ['Corporate Website', 'Landing Page', 'Responsive Design'],
    },
    {
      id: 'applications', title: 'Web Applications', icon: 'dashboard', accent: 'violet',
      description: 'Custom web applications, dashboards and admin panels tailored to your needs.',
      tags: ['Custom Development', 'Admin Dashboard', 'API Integration'],
    },
    {
      id: 'ai', title: 'AI-Powered Tools', icon: 'brain', accent: 'teal',
      description: 'Practical AI integrations and automation tools to make workflows smarter and faster.',
      tags: ['AI Integration', 'Chatbots', 'Automation Tools'],
    },
    {
      id: 'commerce', title: 'E-Commerce Solutions', icon: 'cart', accent: 'orange',
      description: 'Complete e-commerce solutions with product catalogs, shopping experiences and more.',
      tags: ['Online Store', 'Product Catalog', 'Secure Payments'],
    },
    {
      id: 'improvements', title: 'Website Improvements', icon: 'wrench', accent: 'blue',
      description: 'UI enhancements, API integration, bug fixes and performance improvements.',
      tags: ['UI/UX Enhancements', 'Bug Fixes', 'Performance Optimization'],
    },
  ];

  contact(event: MouseEvent): void {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const section = this.document.getElementById('contact');
    if (!section) return;
    event.preventDefault();
    const browserWindow = this.document.defaultView;
    const reducedMotion = browserWindow?.matchMedia('(prefers-reduced-motion: reduce)').matches;
    section.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
    browserWindow?.history.replaceState(browserWindow.history.state, '', '#contact');
    const heading = section.querySelector<HTMLElement>('h2');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }
}
