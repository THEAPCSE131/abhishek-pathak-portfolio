import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, PLATFORM_ID, inject, signal } from '@angular/core';
import { AnalyticsService } from './analytics.service';

@Component({
  selector: 'app-analytics-consent',
  standalone: true,
  template: `
    @if (available && open()) {
      <section class="notice" role="region" aria-label="Analytics cookie choices">
        <p>Allow Google Analytics cookies to measure visits? Google processes usage data.
          Advertising is disabled. Change your choice anytime via Cookie Settings in the footer.</p>
        <div class="choices">
          <button type="button" (click)="choose(false)">Decline</button>
          <button type="button" (click)="choose(true)">Accept analytics</button>
        </div>
      </section>
    }
  `,
  styles: `
    :host { display: block; }
    .notice { position: fixed; bottom: 12px; left: 50%; transform: translateX(-50%);
      z-index: 1000; width: min(680px, calc(100vw - 24px)); padding: 10px 14px;
      border: 1px solid var(--border); border-radius: 10px; background: var(--surface);
      color: var(--text); box-shadow: var(--shadow); display: flex; flex-wrap: wrap;
      align-items: center; gap: 10px; }
    p { flex: 1 1 280px; margin: 0; font-size: 12px; line-height: 1.5; }
    .choices { display: flex; gap: 8px; }
    button { background: var(--surface); color: var(--text); border: 1px solid var(--border-strong);
      padding: 7px 10px; border-radius: 6px; font: inherit; font-size: 12px; cursor: pointer; }
    button:focus-visible { outline: 2px solid var(--blue); outline-offset: 3px; }
  `,
})
export class AnalyticsConsentComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  readonly available = isPlatformBrowser(inject(PLATFORM_ID)) &&
    this.document.defaultView?.location.hostname === 'abhishekpathak.in';
  readonly open = signal(this.needsChoice());

  constructor() {
    if (!this.available) return;
    const browser = this.document.defaultView!;
    const show = (): void => this.open.set(true);
    browser.addEventListener('portfolio:cookie-settings', show);
    this.destroyRef.onDestroy(() => browser.removeEventListener('portfolio:cookie-settings', show));
  }

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
