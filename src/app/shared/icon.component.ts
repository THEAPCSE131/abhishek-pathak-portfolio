import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      @switch (name()) {
        @case ('github') { <path fill="currentColor" stroke="none" d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.08c-3.12.68-3.78-1.32-3.78-1.32-.51-1.29-1.24-1.64-1.24-1.64-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.71 2.62 1.22 3.26.93.1-.72.39-1.22.71-1.5-2.49-.28-5.11-1.25-5.11-5.54 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.08 1.15a10.74 10.74 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.54.23 2.68.11 2.96.71.78 1.15 1.78 1.15 3 0 4.3-2.63 5.26-5.13 5.54.4.35.76 1.03.76 2.08v3.05c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" /> }
        @case ('linkedin') { <path fill="currentColor" stroke="none" d="M20.5 2h-17C2.67 2 2 2.67 2 3.5v17c0 .83.67 1.5 1.5 1.5h17c.83 0 1.5-.67 1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5ZM8 19H5V9h3v10ZM6.5 7.7a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4ZM19 19h-3v-5.2c0-1.3-.3-2.2-1.5-2.2-1.3 0-1.7.9-1.7 2.2V19h-3V9h2.9v1.4c.4-.7 1.3-1.6 2.9-1.6 3 0 3.4 2 3.4 4.6V19Z" /> }
        @case ('email') { <rect x="3" y="5" width="18" height="14" rx="3" /><path d="m3 7 9 6 9-6" /> }
        @case ('whatsapp') {
          <path d="M20.5 11.5a9 9 0 0 1-13.4 7.8L2 21l1.7-5.1A9 9 0 1 1 20.5 11.5Z" />
          <path fill="currentColor" stroke="none" transform="translate(5.5 5.5) scale(.5)" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.79a2 2 0 0 1-.45 2.11L8.09 9.89a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.33 1.83.56 2.79.69A2 2 0 0 1 22 16.92Z" />
        }
        @case ('sun') { <circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /> }
        @case ('moon') { <path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z" /> }
        @case ('download') { <path d="M12 3v12m-4-4 4 4 4-4M4 16v4h16v-4" /> }
        @case ('arrow') { <path d="M4 12h16m-6-6 6 6-6 6" /> }
        @case ('menu') { <path d="M4 6h16M4 12h16M4 18h16" /> }
        @case ('close') { <path d="m6 6 12 12M6 18 18 6" /> }
        @case ('code') { <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-12-2 14" /> }
        @case ('monitor') { <rect x="3" y="3" width="18" height="13" rx="2" /><path d="M8 21h8m-7 0 1-5m5 5-1-5m-7-9 5 4 5-4" /> }
        @case ('globe') { <circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18M5 6h14M5 18h14" /> }
        @case ('dashboard') { <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M10 3v18M10 12h11M3 9h7m4-2h3m-3 10h3" /> }
        @case ('cart') { <path d="M2 3h3l3 14h11l3-10H6m3 5h6m-2-2 2 2-2 2" /><circle cx="9" cy="21" r="1" /><circle cx="18" cy="21" r="1" /> }
        @case ('wrench') { <path d="M21 7a6 6 0 0 1-8 6L6 20a2 2 0 0 1-3-3l7-7a6 6 0 0 1 7-8l-4 4 4 4 4-4v1Z" /> }
        @case ('briefcase') { <rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V4h8v3M3 12a23 23 0 0 0 18 0M10 12v3h4v-3" /> }
        @case ('people') { <circle cx="10" cy="7" r="3" /><path d="M3 21v-3a6 6 0 0 1 12 0v3M17 4a3 3 0 0 1 0 6m1 4a5 5 0 0 1 3 4v3" /> }
        @case ('location') { <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /> }
        @case ('angular') {
          <path fill="var(--angular)" stroke="none" d="m12 1 10 4-1.6 14L12 23l-8.4-4L2 5Z" />
          <path stroke="var(--button-text)" stroke-width="2" d="m7 17 5-12 5 12M9 13h6" />
        }
        @case ('node') {
          <path stroke="var(--node)" d="m12 1 10 5.5v11L12 23 2 17.5v-11Z" />
          <path stroke="var(--node)" stroke-width="1.5" d="M10 8v7c0 3-4 3-4 0m12-5c0-3-5-3-5 0s5 1 5 4-5 3-5 0" />
        }
        @case ('python') {
          <path fill="var(--python-blue)" stroke="none" d="M12 1c-5 0-5 1-5 5v2h6v1H5c-4 0-4 9 0 9h2v-4c0-2 2-3 4-3h5c2 0 3-1 3-3V5c0-3-2-4-7-4Z" />
          <path fill="var(--python-yellow)" stroke="none" d="M12 23c5 0 5-1 5-5v-2h-6v-1h8c4 0 4-9 0-9h-2v4c0 2-2 3-4 3H8c-2 0-3 1-3 3v3c0 3 2 4 7 4Z" />
          <circle cx="10" cy="4" r="1" fill="var(--button-text)" stroke="none" /><circle cx="14" cy="20" r="1" fill="var(--background)" stroke="none" />
        }
        @case ('javascript') {
          <rect x="1" y="1" width="22" height="22" rx="2" fill="var(--javascript)" stroke="none" />
          <text x="5" y="20" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="var(--brand-ink)" stroke="none">JS</text>
        }
        @case ('mongodb') {
          <path d="M12 1C10 5 5 7 5 13c0 4 3 7 7 9 4-2 7-5 7-9 0-6-5-8-7-12Z" fill="var(--mongodb)" stroke="none" />
          <path d="M12 6v17" stroke="var(--brand-ink)" stroke-width="1" />
        }
        @case ('typescript') {
          <rect x="1" y="1" width="22" height="22" rx="2" fill="currentColor" stroke="none" />
          <text x="4" y="20" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="var(--button-text)" stroke="none">TS</text>
        }
        @case ('express') {
          <circle cx="12" cy="12" r="10" fill="var(--accent-soft)" stroke="var(--border-strong)" stroke-width="1" />
          <text x="4.5" y="16" font-family="Arial, sans-serif" font-size="12" fill="currentColor" stroke="none">ex</text>
        }
        @case ('html5') {
          <path fill="currentColor" stroke="none" d="M2 1h20l-2 20-8 2-8-2Z" />
          <path stroke="var(--button-text)" stroke-width="2" stroke-linecap="square" d="M17 6H7l.5 5H16l-.5 6-3.5 1-3.5-1-.2-2" />
        }
        @case ('css3') {
          <path fill="currentColor" stroke="none" d="M2 1h20l-2 20-8 2-8-2Z" />
          <path stroke="var(--button-text)" stroke-width="2" stroke-linecap="square" d="M7 6h10l-.5 5H9m7.5 0-1 6-3.5 1-3.5-1-.2-2" />
        }
        @case ('git') {
          <path fill="currentColor" stroke="none" d="M11 1.4a1.4 1.4 0 0 1 2 0l9.6 9.6a1.4 1.4 0 0 1 0 2L13 22.6a1.4 1.4 0 0 1-2 0L1.4 13a1.4 1.4 0 0 1 0-2Z" />
          <path stroke="var(--button-text)" d="m7 5 9 9M10 8v10" />
          <circle cx="10" cy="8" r="1.8" fill="var(--button-text)" stroke="none" /><circle cx="10" cy="18" r="1.8" fill="var(--button-text)" stroke="none" /><circle cx="16" cy="14" r="1.8" fill="var(--button-text)" stroke="none" />
        }
        @case ('cloud') {
          <path d="M6 19a4 4 0 0 1-1-7 6 6 0 0 1 11.8-3A5 5 0 0 1 18 19H6Z" />
        }
        @case ('database') {
          <ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 4 16 4 16 0V5M4 10c0 4 16 4 16 0M4 15c0 4 16 4 16 0" />
        }
        @case ('brain') {
          <path d="M12 5c0-4-6-4-6 0-3 0-4 4-2 6-3 3-1 7 2 7 0 5 6 5 6 1V5Zm0 0c0-4 6-4 6 0 3 0 4 4 2 6 3 3 1 7-2 7 0 5-6 5-6 1M6 5v3l3 2M4 11h3v3m-1 4 3-2m9-11v3l-3 2m5 1h-3v3m1 4-3-2" />
        }
        @case ('vscode') {
          <path fill="currentColor" stroke="none" d="m17 1 6 3v16l-6 3-10-8-4 3-3-2 5-4-5-4 3-2 4 3L17 1Zm0 6-6 5 6 5V7Z" />
        }
        @case ('document-search') {
          <path d="M13 21H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9l5 5v5M14 2v5h5M7 7h3M7 11h6M7 15h3" /><circle cx="16" cy="16" r="4" /><path d="m19 19 3 3" />
        }
        @case ('graduation') {
          <path d="m1 8 11-5 11 5-11 5L1 8Zm4 2v7c4 4 10 4 14 0v-7m4-2v9" />
        }
        @case ('bolt') { <path d="m13 2-9 12h7l-1 8 10-13h-8l1-7Z" /> }
        @case ('sparkles') { <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3ZM3 2v4M1 4h4m16 14v4m-2-2h4" /> }
      }
    </svg>`,
  styles: [':host { display: inline-flex; width: 1.2em; height: 1.2em; flex-shrink: 0; } svg { width: 100%; height: 100%; }'],
})
export class IconComponent {
  readonly name = input.required<string>();
}
