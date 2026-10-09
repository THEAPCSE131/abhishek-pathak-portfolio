import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { AnalyticsService } from './analytics.service';

@Component({
  selector: 'app-analytics-consent',
  standalone: true,
  template: `
    @if (available) {
      @if (open()) {
        <section class="consent" role="region" aria-label="Analytics privacy choices">
          <strong>Optional analytics</strong>
          <p>With your permission, this website uses Google Analytics cookies to measure visits.
            Google receives usage information to process it for analytics. Advertising features
            are disabled. You can decline or change your choice anytime in Analytics settings.</p>
          <div class="actions">
            <button type="button" (click)="choose(false)">Decline analytics</button>
            <button type="button" (click)="choose(true)">Accept analytics</button>
          </div>
        </section>
      } @else {
        <button class="settings" type="button" (click)="open.set(true)">Analytics settings</button>
      }
    }
  `,
  styles: `
    :host { position: fixed; bottom: 16px; left: 16px; z-index: 1000; max-width: calc(100vw - 32px); }
    .consent { width: 420px; max-width: 100%; padding: 18px; border: 1px solid var(--border);
      border-radius: 12px; background: var(--surface); color: var(--text); box-shadow: var(--shadow); }
    p { margin: 8px 0 14px; font-size: 13px; line-height: 1.5; }
    .actions { display: flex; flex-wrap: wrap; gap: 10px; }
    button { padding: 9px 12px; border: 1px solid var(--border-strong); border-radius: 8px;
      background: var(--surface); color: var(--text); font: inherit; font-size: 13px; cursor: pointer; }
    button:focus-visible { outline: 2px solid var(--blue); outline-offset: 3px; }
  `,
})
export class AnalyticsConsentComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly document = inject(DOCUMENT);
  readonly available = isPlatformBrowser(inject(PLATFORM_ID)) &&
    this.document.defaultView?.location.hostname === 'abhishekpathak.in';
  readonly open = signal(this.needsChoice());

  choose(granted: boolean): void {
    this.open.set(false);
    this.analytics.setConsent(granted);
  }

  private needsChoice(): boolean {
    if (!this.available) return false;
    try {
      const choice = this.document.defaultView!.localStorage.getItem('portfolio-analytics-consent');
      return choice !== 'granted' && choice !== 'denied';
    } catch { return true; }
  }
}
