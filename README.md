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
