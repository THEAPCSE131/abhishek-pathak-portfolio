# Abhishek Pathak Portfolio

Standalone Angular 22.1 application with routing, SCSS, and strict TypeScript configuration.

## Development

Use `nvm use` to select Node.js 26.6.0 from `.nvmrc`, with npm 11.18.0.

Install dependencies with `npm ci`, then run `npm start` to start the development server.

## Structure

- `src/app/core/layout`: future header/navbar and footer.
- `src/app/shared`: reusable presentation components, directives, and pipes as needed.
- `src/app/features/portfolio`: future hero, about, tech stack, featured projects, experience, skills, and contact sections.
- `src/app/models`: shared TypeScript types as needed.
- `src/styles/_tokens.scss`: future design tokens and theme variables.
- `src/styles/_base.scss`: global layout and form control defaults.
- `public`: future static assets.

The root component contains only a router outlet. Routes and section folders are intentionally empty until implementation begins. Empty folders are tracked with .gitkeep files.

No builds or tests were run during setup.

## Contact section setup

The Contact section uses direct Email and WhatsApp links, with equally sized cards
and a full-width Find Me Online section. No contact form, email service account,
API credentials, or backend is required.

- Send Email opens the default email application using
  `mailto:apcse131@gmail.com?subject=Portfolio%20Inquiry`.
- GitHub and LinkedIn reuse URLs from `src/app/models/portfolio.config.ts`
  and open in new tabs. The social Email link uses the same mailto URL.
- WhatsApp uses `contact.whatsappNumber` in `src/environments/environment.ts`,
  currently configured to `917069314800`. Use digits only: country code 91
  followed by a valid 10-digit Indian mobile number. Missing or invalid values
  disable the action without creating a broken link or a visible warning.
- The official wa.me link includes this encoded message:

> Hi Abhishek, I visited your developer portfolio and would like to discuss a project or professional opportunity.

Email and WhatsApp open a composer/chat; visitors choose to send the message.
The obsolete email integration, service, form logic, and configuration were removed.
No WhatsApp configuration is missing. Contact remains the last main section,
followed by the standalone footer in `src/app/core/layout/footer`. The footer
reuses configured navigation and contact links and displays the current year.
Header and Footer navigation include Home, About, Services, Projects, and Contact.
Tech Stack remains within About, with its existing section ID unchanged.

## What I Can Build

The standalone component in `src/app/features/portfolio/services` appears between
About / Tech Stack and Featured Projects. Its six service cards use data-driven
content, shared icons, decorative inline SVG illustrations, and a responsive
three / two / one-column grid. Header and footer Services links use `#services`.
Each card's arrow scrolls to `#contact`, respects reduced-motion preferences,
and focuses the Contact heading. Existing fixed-header scroll offsets are reused.
No dependencies, generated images, service routes, or modals were added.
No builds or tests were run for this implementation.

## Featured project showcase

Featured Projects uses a navy two-column showcase with the existing local
Resume Analyzer screenshot and configured Live Demo / GitHub URLs. Project data,
including feature bullets, lives in `src/app/models/projects.config.ts`.
One project is displayed at a time. Previous / next controls and accessible
pagination appear only when the project array contains at least two entries.
Adding projects requires unique IDs and their own content, feature lists,
technologies, screenshot paths, and verified URLs; do not duplicate projects to
fill slides. Screenshots render at their natural aspect ratio without cropping.
The adjacent statistics strip is unchanged. No dependencies or images were added,
and no builds or tests were run for this redesign.

## Typography and functional icons

Shared design tokens in `src/styles/_tokens.scss` control the responsive type
scale, weights, line heights, heading gaps, and functional icon dimensions.
Component styles consume these tokens without global heading overrides.

| Category | Shared scale |
| --- | --- |
| Hero name | 38–64px; 36–48px on small screens |
| Services / Projects / Contact headings | 30–48px, weight 700 |
| Compact About / Tech Stack headings | 24–28px, weight 700 |
| Card titles | 20–24px, weight 700 |
| Section descriptions | 15–18px |
| Body and card descriptions | 14–16px |
| Eyebrows | 13px; 12px on small screens |
| Tags and supporting labels | 12px |
| Buttons and footer text | 14px |
| Statistics values | 24–30px, weight 700 |

Inline, button, technology, card, statistics, and social icon tokens are 16, 20,
30, 32, 28, and 24px respectively. Explicit equal width and height retain SVG
proportions and avoid the shared icon host's em-based sizing changing by context.
Decorative SVG illustrations retain their existing dimensions and styles.
The existing font families, colors, gradients, alignments, backgrounds, grids,
animations, navigation, and functionality remain in place. Cards retain natural
content height so larger readable text can wrap without clipping.
No builds or tests were run for the typography standardization.

No build commands or tests were run for this redesign.

## SEO and indexing

Production canonical URL: https://abhishekpathak.in/

Vercel manages the existing WWW 308 redirect. The existing deployment domain
https://abhishek-pathak-portfolio-lilac.vercel.app remains available and serves
metadata pointing to the custom-domain canonical URL; no app redirects were added.

- Static metadata and Person / WebSite / ProfilePage JSON-LD live in src/index.html,
  so crawlers and social preview clients can read them without executing Angular.
- Social previews reuse assets/images/portfolio-social-preview.png, the portfolio
  homepage screenshot proportionally resized and padded to 1200 × 630. Open Graph
  (including og:image:secure_url) and Twitter summary_large_image use the same
  absolute HTTPS URL on the custom domain. The hero portrait is preloaded and
  remains eager/high priority; project previews remain lazy-loaded with dimensions.
- public/robots.txt allows crawlers and advertises public/sitemap.xml. The sitemap
  contains only the canonical homepage: section fragments are not separate pages.
  No fabricated last-modified dates or unimplemented routes are included.
- public/site.webmanifest reuses the AP SVG icon. No fonts, packages, or generated
  imagery were added. Existing system font fallbacks do not require network fonts.
- The latest resume remains assets/resume/Abhishek Pathak - (Software Engineer).pdf.
- There is one H1, section H2 headings, and card H3 headings. Existing alt text,
  semantic landmarks, section links, accessible labels, and external-link safety
  attributes are retained without adding hidden keywords or changing visible copy.

Rendering limitation: this application currently uses client-side rendering.
The initial HTML contains metadata and structured data, but portfolio body content
requires JavaScript. SSR/prerendering is not configured; enabling it would require
Angular server-rendering dependencies and deployment/build verification. Metadata
alone does not remove this limitation or guarantee ranking or indexing.
No repository Vercel configuration is present; deployment settings remain managed
by the existing Vercel project. Confirm the deployed assets are served as files,
not rewritten to the Angular HTML shell, and that deployment protection does not
block anonymous crawlers. Update canonical, social and schema URLs and sitemap
if the production domain changes.

After deploying:
1. Verify a URL-prefix property for https://abhishekpathak.in/ in Google Search Console.
   Add its exact verification tag to src/index.html if using the HTML-tag method.
2. Open /robots.txt, /sitemap.xml, the social image, favicon, manifest, and latest
   resume on the production domain; confirm successful responses and MIME types.
3. Submit sitemap.xml through Search Console's Sitemaps report.
4. Use URL Inspection's live inspection to review the rendered page and request
   indexing for the canonical homepage. Check structured data with Google's Rich
   Results Test (these schemas do not promise a special rich result).
5. Review social previews, mobile rendering, accessibility, and measured Core Web
   Vitals after deployment. External profile/project destinations also need live
   verification; source inspection cannot confirm their availability.

Reference: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
Rendering: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
No builds, tests, Lighthouse runs, deployment or indexing verification were performed.
