# Ofir's Dogs Website 🐕

A modern, TypeScript-based React application for browsing dog images, powered by the [Dog CEO API](https://dog.ceo/dog-api/).

## 🚀 Tech Stack

- **Framework:** React 17 (TypeScript)
- **State Management:** Redux Toolkit
- **Styling:** Styled-components
- **API Client:** Axios (Custom HttpClient)
- **Localization:** i18next (supports Hebrew)

## ✨ Features

- **Breed Exploration:** Fetch and display images from various dog breeds.
- **Responsive Grid:** A fluid image layout designed with Styled-components.
- **Multilingual Support:** RTL support with Hebrew localization.

## 🏗️ Architecture

The project uses a modular service-oriented structure:

- `src/app/services`: Centralized API logic via `HttpClient` and `ApiService`.
- `src/app/components`: Reusable UI components.
- `src/app/store.ts`: Centralized state management using Redux Toolkit.

## 🛠️ Getting Started

### Scripts

- `npm start`: Runs the app in development mode at [http://localhost:3000](http://localhost:3000).
- `npm run build`: Bundles the app for production.
- `npm test`: Launches the test runner.
