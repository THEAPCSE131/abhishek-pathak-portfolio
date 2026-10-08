import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { portfolioConfig } from '../../../models/portfolio.config';
import { IconComponent } from '../../../shared/icon.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly emailUrl = portfolioConfig.contactUrl + '?subject=Portfolio%20Inquiry';
  readonly socialLinks = portfolioConfig.socialLinks.map(link => ({
    ...link,
    url: link.icon === 'email' ? this.emailUrl : link.url,
    description: link.icon === 'github' ? 'View my code and projects'
      : link.icon === 'linkedin' ? "Let's connect professionally" : 'Send me a mail',
  }));
  readonly whatsappUrl = /^91[6-9]\d{9}$/.test(environment.contact.whatsappNumber)
    ? `https://wa.me/${environment.contact.whatsappNumber}?text=${encodeURIComponent('Hi Abhishek, I visited your developer portfolio and would like to discuss a project or professional opportunity.')}`
    : null;
}
