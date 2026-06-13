# Ofir's Pets Website 🐕🐈

A modern, TypeScript-based React application for browsing dog and cat images, powered by the [Dog CEO API](https://dog.ceo/dog-api/) and [The Cat API](https://thecatapi.com/).

## 🚀 Tech Stack

- **Framework:** React 18 (TypeScript)
- **State Management:** Redux Toolkit 1.9
- **Build Tool:** React Scripts 5
- **Styling:** Styled-components
- **API Client:** Axios (Custom HttpClient & Axios Instances)
- **Localization:** i18next (supports Hebrew with RTL layout)

## ✨ Features

- **Pill Tab Navigator:** Seamlessly switch between dogs and cats views with smooth transitions.
- **Breed Exploration:** Fetch and filter images by specific dog and cat breeds.
- **Infinite Scroll:** Independent client-side pagination that loads additional images dynamically as you scroll.
- **Interactive Lightbox:** Click on any photo to open a high-resolution modal view. Supports close actions via Escape key, close button, or backdrop click.
- **Multilingual Support:** Full RTL support with Hebrew localization.

## 🏗️ Architecture

The project uses a modular structure with dedicated folders for components, services, and features:

- **Components:** `src/app/components/[name]/` - Self-contained components containing `.component.tsx`, `.styled.tsx`, and `.constants.ts`.
- **Services:** `src/app/services/[name]/` - Isolated API handlers (e.g. `api.service.ts` for dogs, `cat-api.service.ts` for cats) built on top of customized client wrappers.
- **State:** `src/app/features/` - Redux slices managing isolated features (`dogs/`, `cats/`, and `ui/` tabs configuration).
- **Theme & Types:** `src/app/generic/` and `src/app/themes/` - Shared types, HTTP constants, and theme configs.

## 🛠️ Getting Started

### Scripts

- `npm start`: Runs the app in development mode at [http://localhost:3000](http://localhost:3000).
- `npm run build`: Bundles the app for production.
- `npm test`: Launches the test runner.
