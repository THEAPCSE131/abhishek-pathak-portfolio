import { Component } from '@angular/core';
import { HeaderComponent } from './core/layout/header/header.component';
import { HeroComponent } from './features/portfolio/hero/hero.component';
import { AboutComponent } from './features/portfolio/about/about.component';
import { FeaturedProjectsComponent } from './features/portfolio/featured-projects/featured-projects.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, HeroComponent, AboutComponent, FeaturedProjectsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {}
