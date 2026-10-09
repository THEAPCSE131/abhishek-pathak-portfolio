# Portfolio GA4

Measurement ID: G-C6W75EXTK5. The Angular app initializer starts AnalyticsService.
Only the production hostname abhishekpathak.in is tracked. No analytics script,
cookies, or Google requests are initiated by this integration before explicit
analytics consent. Advertising consent stays denied.

## Visitor consent

AnalyticsConsentComponent provides a compact consent notice with equal accept/decline
choices on production. A Cookie Settings button styled as a footer link reopens it;
there is no persistent floating settings button or large consent panel. The
existing portfolio layout and components are unchanged; only the consent overlay
is added. No tag is loaded before an explicit opt-in. Withdrawal stores denial,
clears first-party GA cookies, and reloads to unload the tag. Advertising remains
disabled. The service also accepts an explicit choice from another consent UI:

```typescript
window.dispatchEvent(new CustomEvent('portfolio:analytics-consent', {
  detail: 'granted', // 'denied' for rejection or withdrawal
}));
```

The disclosure describes Google Analytics cookies and usage collection. Maintain
an appropriate full privacy notice for the site's actual data practices.

In GA4 Admin > Data streams > your web stream, disable Enhanced measurement.
This integration owns page_view events; automatic history page views would cause
duplicates, while automatic interaction/form/search events could collect unwanted
URLs or text. Do not install another Google tag or GTM page-view configuration.

The initial consented page and subsequent Angular NavigationEnd path changes each
send one page_view. Query strings and section fragments do not count as pages and
are excluded from page_location. No custom user IDs, email addresses, contact data,
form values, or external referrer URLs are sent by this integration. Future route
paths and page titles must also avoid personal information.

## Manual production verification

Deploy normally. In a private browser with analytics blockers disabled:

1. Before consent, confirm no gtag.js or Google Analytics collection requests.
2. Accept through the connected consent interface, then use Tag Assistant and
   GA4 Realtime to confirm one page_view with G-C6W75EXTK5.
3. Navigate homepage section anchors: no additional page_view should be sent.
   If real Angular routes are added later, verify one view per changed path.
4. Reject or withdraw consent and confirm tracking stops; reloads remain off.
5. Confirm localhost and Vercel preview hosts do not send tracking requests.

For developer-only verification on production, the documented CustomEvent can be
issued from the browser console to simulate your own consent. It is not a visitor
consent interface and must not be dispatched automatically for visitors.

References:
https://developers.google.com/tag-platform/security/concepts/consent-mode
https://developers.google.com/analytics/devguides/collection/ga4/views

Consent remains required by this implementation before loading GA4 for every visitor.
The minimal notice is retained instead of guessing visitor jurisdiction. It does not
establish universal legal compliance; keep the full privacy disclosure appropriate
to Google processing and applicable requirements. No live deployment verification
was performed for this UI change.
