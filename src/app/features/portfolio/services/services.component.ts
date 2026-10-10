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
      description: 'Modern, responsive portfolio websites that showcase your skills, experience, and professional identity.',
      tags: ['Personal Portfolio', 'Resume Website', 'Modern UI/UX'],
    },
    {
      id: 'business', title: 'Business Websites', icon: 'globe', accent: 'blue',
      description: 'Professional websites for local businesses, clinics, service providers, and startups to build a strong online presence.',
      tags: ['Business Website', 'Landing Pages', 'Mobile Friendly'],
    },
    {
      id: 'applications', title: 'Web Applications', icon: 'dashboard', accent: 'violet',
      description: 'Custom web applications, dashboards, and management tools designed to simplify business operations.',
      tags: ['Custom Web Apps', 'Admin Dashboards', 'API Integration'],
    },
    {
      id: 'ai', title: 'AI-Powered Tools', icon: 'brain', accent: 'teal',
      description: 'Smart chatbots and practical AI automation solutions that help businesses manage inquiries and everyday tasks.',
      tags: ['AI Chatbots', 'Appointment Automation', 'Workflow Automation'],
    },
    {
      id: 'improvements', title: 'Website Improvements', icon: 'wrench', accent: 'blue',
      description: 'Improve your existing website with better design, bug fixes, API integrations, and performance enhancements.',
      tags: ['UI/UX Improvements', 'Bug Fixes', 'Performance Optimization'],
    },
    {
      id: 'api', title: 'API Integration Services', icon: 'code', accent: 'purple',
      description: 'Seamlessly connect websites and applications with third-party services to add useful features and improve functionality.',
      tags: ['REST APIs', 'Third-Party Services', 'Custom Integrations'],
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
