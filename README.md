# Personal Portfolio and CV Template

A React and Vite starter for building a personal portfolio and CV website. It provides a responsive, card-based layout with editable sample content. Use it as a starting point, adapt the design and data to your needs, and choose your own hosting and deployment approach.

## Features

- Portfolio sections for an introduction, career overview, experience, education and credentials, skills, projects, and interests.
- Content loaded from JSON, so most personal information can be changed without editing React components.
- Light and dark themes, with the initial theme following the visitor's system preference. A visitor's theme choice is saved in the browser.
- Localized UI text and content files. The app discovers supported language files and provides a language selector when more than one is available. The selected language is saved in the browser.
- Multiple CV downloads, with language labels, when configured.
- Expandable experience history and carousel-style detail views for experience and education entries.
- Responsive layout and Vite development and production build commands.

## Requirements

- Node.js and npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser. The development server reloads the page as you edit source files and public assets.

To create and preview a local production build:

```bash
npm run build
npm run preview
```

The build output is written to `dist/`.

## Customize the content

Edit `public/data.json` to change the default language content. The main fields are:

| Field | Purpose |
| --- | --- |
| `personal` | Name, role, introduction, contact details, profile image, social links, and CV downloads |
| `highlightCard` | Optional featured achievement or metric in the overview |
| `experienceCounter` | Optional live time counter configured with a start date and descriptive text |
| `experiences` | Roles, companies, dates, tags, and highlights |
| `education` | Degrees, certificates, scholarships, links, dates, and highlights |
| `skills` | Skill categories and their items |
| `projects` | Project categories and linked items |
| `interests` | Interest cards with optional images |
| `ui` | Optional UI text overrides for a language |

Keep the JSON valid when editing it: use double quotes and do not leave trailing commas. `src/defaultData.js` supplies fallback content if the public data file cannot be loaded.

### Images and documents

Place images and downloadable files in `public/assets/`, then refer to them with paths relative to `public`, for example `assets/img/profile.jpg` or `assets/my-cv.pdf`. Remote image and link URLs can also be used where appropriate. Update the existing sample paths and links to your own files.

### Add another language

Keep `public/data.json` as the default English content. Add a sibling file named `public/data.<code>.json` for another language, such as `public/data.it.json` or `public/data.es.json`. The app checks common language codes automatically; for another code, add it to the `languages` array in `public/data.json` as well. Only language files the app can load are offered in the selector. Translate the content and any UI labels that should differ; `src/i18n.js` contains built-in UI text, with optional per-language overrides in the JSON data.

Resume downloads are configured under `personal.resumeDownloads`. Each item can include a language code, button label, and file URL. Add the corresponding files under `public/assets/` and update their paths.

## Project structure

```text
public/
  assets/       Images, PDFs, and other static files
  data.json     Default portfolio content
  data.*.json   Optional localized content
src/
  components/   Portfolio sections and detail modal
  constants/    Shared visual data helpers
  i18n.js       Built-in localized interface text
  App.jsx       Page composition and application state
```

## Available commands

- `npm run dev` — start the local development server.
- `npm run build` — build the static site into `dist/`.
- `npm run preview` — preview the production build locally.

