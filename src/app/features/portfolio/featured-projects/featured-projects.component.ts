import { Component } from '@angular/core';
import { allProjectsUrl, projects } from '../../../models/projects.config';
import { IconComponent } from '../../../shared/icon.component';

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './featured-projects.component.html',
  styleUrl: './featured-projects.component.scss',
})
export class FeaturedProjectsComponent {
  readonly projects = projects;
  readonly allProjectsUrl = allProjectsUrl;
  readonly highlights = [
    { label: 'Experience', value: '4+ Years', description: 'Professional Experience', icon: 'briefcase' },
    { label: 'Projects', value: '10+', description: 'Personal & Professional', icon: 'code' },
    { label: 'Learning', value: 'AI/ML', description: 'Exploring & Building', icon: 'graduation' },
    { label: 'Location', value: 'Godhra, Gujarat', description: 'Open to Opportunities', icon: 'location' },
  ];
}
