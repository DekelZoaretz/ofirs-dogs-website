# Ofir's Dogs Website 🐕

A modern, TypeScript-based React application for browsing dog images, powered by the [Dog CEO API](https://dog.ceo/dog-api/).

## 🚀 Tech Stack

- **Framework:** React 18 (TypeScript)
- **State Management:** Redux Toolkit 1.9
- **Build Tool:** React Scripts 5
- **Styling:** Styled-components
- **API Client:** Axios (Custom HttpClient)
- **Localization:** i18next (supports Hebrew)

## ✨ Features

- **Breed Exploration:** Fetch and display images from various dog breeds.
- **Responsive Grid:** A fluid image layout designed with Styled-components.
- **Multilingual Support:** RTL support with Hebrew localization.

## 🏗️ Architecture

The project uses a modular service-oriented structure with dedicated folders for each component:

- **Components:** `src/app/components/[name]/` - Each component has its own folder with `.component.tsx`, `.styled.tsx`, and `.constants.ts` files
- **Services:** `src/app/services/[name]/` - API services grouped by function (api, http-client)
- **State:** `src/app/features/dogs/` - Redux slices for feature state management
- **Theme & Types:** `src/app/generic/` - Shared types, constants, and theme configuration

## 🛠️ Getting Started

### Scripts

- `npm start`: Runs the app in development mode at [http://localhost:3000](http://localhost:3000).
- `npm run build`: Bundles the app for production.
- `npm test`: Launches the test runner.
