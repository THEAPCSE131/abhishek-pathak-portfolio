import { Component } from '@angular/core';
import { portfolioConfig } from '../../../models/portfolio.config';
import { IconComponent } from '../../../shared/icon.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  readonly profile = portfolioConfig;
  readonly technologies = [
    { label: 'Angular', icon: 'angular' },
    { label: 'Node.js', icon: 'node' },
    { label: 'JavaScript', icon: 'javascript' },
  ];
  readonly stats = [
    { value: '4+', label: 'Years Experience', labelDetail: '', icon: 'briefcase' },
    { value: '10+', label: 'Projects Completed', labelDetail: '', icon: 'code' },
    { value: 'AI & Web', label: 'Passionate about building', labelDetail: 'real-world solutions', icon: 'people' },
    { value: 'India', label: 'Open to Remote / Onsite', labelDetail: '', icon: 'location' },
  ];
}
