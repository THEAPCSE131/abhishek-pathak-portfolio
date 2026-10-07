import { Component } from '@angular/core';
import { IconComponent } from '../../../shared/icon.component';
import { TechStackComponent } from '../tech-stack/tech-stack.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [IconComponent, TechStackComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  // Set to a real section anchor when a separate detailed About destination exists.
  readonly moreAboutUrl: string | null = null;
}
