import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DestroyRef, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const measurementId = 'G-C6W75EXTK5';
const consentKey = 'portfolio-analytics-consent';

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private enabled = false;
  private configured = false;
  private started = false;
  private lastPage = '';

  initialize(): void {
    if (this.started || !isPlatformBrowser(this.platformId)) return;
    const browser = this.document.defaultView as AnalyticsWindow | null;
    // Keep local development and deployment previews out of production reports.
    if (!browser || browser.location.hostname !== 'abhishekpathak.in') return;
    this.started = true;

    const onConsent = (event: Event): void => {
      const choice: unknown = (event as CustomEvent<unknown>).detail;
      if (choice === 'granted' || choice === 'denied') {
        this.setConsent(choice === 'granted');
      }
    };
    browser.addEventListener('portfolio:analytics-consent', onConsent);
    this.destroyRef.onDestroy(() => browser.removeEventListener('portfolio:analytics-consent', onConsent));
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(event => {
      if (event instanceof NavigationEnd) this.trackPage();
    });

    // Only a previous explicit opt-in can enable tracking. No regional guessing.
    try {
      if (browser.localStorage.getItem(consentKey) === 'granted') this.setConsent(true);
    } catch { /* Without stored consent, tracking stays disabled. */ }
  }

  /** Call only with a visitor's explicit choice from a consent interface. */
  setConsent(granted: boolean): void {
    if (!this.started) return;
    const browser = this.document.defaultView as AnalyticsWindow;
    try {
      browser.localStorage.setItem(consentKey, granted ? 'granted' : 'denied');
    } catch { /* The choice still applies for the current visit. */ }
    this.enabled = granted;
    if (!granted) {
      browser.gtag?.('consent', 'update', { analytics_storage: 'denied' });
      this.clearAnalyticsCookies();
      // Reload to unload the tag and stop further automatic collection.
      if (this.configured) browser.location.reload();
      return;
    }

    if (!this.configured) {
      this.configured = true;
      browser.dataLayer = browser.dataLayer || [];
      browser.gtag = function (..._args: unknown[]): void {
        browser.dataLayer!.push(arguments);
      };
      browser.gtag('consent', 'default', {
        analytics_storage: 'denied', ad_storage: 'denied',
        ad_user_data: 'denied', ad_personalization: 'denied',
      });
      browser.gtag('consent', 'update', { analytics_storage: 'granted' });
      browser.gtag('js', new Date());
      browser.gtag('config', measurementId, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        // Do not forward query strings, fragments, or external referrer URLs.
        page_location: this.pageUrl(),
        page_referrer: '',
      });
      const script = this.document.createElement('script');
      script.async = true;
      script.onerror = () => console.warn('Google Analytics tag could not load. Check browser blocking and Content Security Policy.');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      this.document.head.appendChild(script);
    }
    this.trackPage();
  }

  private pageUrl(): string {
    const browser = this.document.defaultView!;
    return browser.location.origin + browser.location.pathname;
  }

  private clearAnalyticsCookies(): void {
    for (const cookie of this.document.cookie.split(';')) {
      const name = cookie.split('=')[0].trim();
      if (name !== '_ga' && !name.startsWith('_ga_')) continue;
      for (const domain of ['', '; domain=abhishekpathak.in', '; domain=.abhishekpathak.in']) {
        this.document.cookie = `${name}=; max-age=0; path=/${domain}; SameSite=Lax; Secure`;
      }
    }
  }

  private trackPage(): void {
    if (!this.enabled) return;
    const page = this.pageUrl();
    if (page === this.lastPage) return;
    const browser = this.document.defaultView as AnalyticsWindow;
    browser.gtag?.('event', 'page_view', {
      send_to: measurementId,
      page_location: page,
      page_title: this.document.title,
      page_referrer: this.lastPage,
    });
    this.lastPage = page;
  }
}
