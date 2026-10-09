import { Component } from '@angular/core';
import { HeaderComponent } from './core/layout/header/header.component';
import { HeroComponent } from './features/portfolio/hero/hero.component';
import { AboutComponent } from './features/portfolio/about/about.component';
import { FeaturedProjectsComponent } from './features/portfolio/featured-projects/featured-projects.component';
import { ContactComponent } from './features/portfolio/contact/contact.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { ServicesComponent } from './features/portfolio/services/services.component';
import { AnalyticsConsentComponent } from './core/analytics/analytics-consent.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, HeroComponent, AboutComponent, ServicesComponent, FeaturedProjectsComponent, ContactComponent, FooterComponent, AnalyticsConsentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {}
