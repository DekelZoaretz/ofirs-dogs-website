# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm start              # Development server at http://localhost:3000
npm run build          # Production build
npm test               # Run tests in watch mode
```

## Tech Stack

- **React 18** with TypeScript
- **Redux Toolkit 1.9** for state management
- **React Scripts 5** (Create React App with React 18 support)
- **Styled-components** for styling
- **Axios** with custom HttpClient
- **i18next** for internationalization (Hebrew/RTL)

## Code Organization

### File Structure
All components and services are organized into **dedicated folders** with co-located related files:

```
src/
├── app.component.tsx          # Root app component
├── app.styled.tsx             # Root app styles
├── app/
│   ├── components/
│   │   ├── breed-selector/
│   │   │   ├── breed-selector.component.tsx
│   │   │   └── breed-selector.styled.tsx
│   │   ├── header/
│   │   │   ├── header.component.tsx
│   │   │   └── header.styled.tsx
│   │   ├── loader/
│   │   │   ├── loader.component.tsx
│   │   │   └── loader.styled.tsx
│   │   └── main/
│   │       ├── main.component.tsx
│   │       ├── main.styled.tsx
│   │       └── main.constants.ts
│   ├── services/
│   │   ├── api/
│   │   │   └── api.service.ts
│   │   └── http-client/
│   │       ├── http-client.service.ts
│   │       └── http-client.constants.ts
│   ├── features/
│   │   └── dogs/
│   │       └── dogsSlice.ts
│   ├── generic/
│   │   ├── types/
│   │   └── constants/
│   ├── hooks.ts
│   ├── store.ts
│   └── themes/
│       └── light.ts
└── index.tsx                  # Entry point
```

### Naming Conventions
- **Components:** kebab-case folders with `[name].component.tsx` files
- **Styles:** `[name].styled.tsx` in the same folder
- **Constants:** `[name].constants.ts` in the component folder
- **Services:** `[name].service.ts` in dedicated service folders
- **Exports:** Named exports only (no default exports)
- **Quotes:** Single quotes throughout

## Architecture Overview

### State Management (Redux Toolkit)
- **Store:** `src/app/store.ts` - Configures Redux store
- **Slices:** `src/app/features/dogs/dogsSlice.ts` - Dog breeds and image management
  - State: `breeds`, `selectedBreed`, `allImages`, `visibleImages`, `status`, `error`
  - Async Thunks: `fetchBreedsThunk`, `fetchImagesThunk`
  - Actions: `setSelectedBreed`, `loadMoreImages`
  - Image pagination: 24 items per page, client-side infinite scroll

### Services Layer
- **HttpClient** (`src/app/services/http-client/`): Axios wrapper
  - Base URL: `https://dog.ceo/api`
  - Generic HTTP methods: `get`, `post`, `put`, `patch`, `delete`
  - Response type: `{ data: T, errorCode?: string }`

- **ApiService** (`src/app/services/api/`): High-level API methods
  - `fetchBreedList()` - Get all breeds with sub-breeds
  - `fetchRandomImages(count)` - Random images across all breeds
  - `fetchBreedImageList(breed)` - Images for specific breed

### Components
- **Header** - Sticky header with breed selector, fetches breed list on mount
- **BreedSelector** - Dropdown for breed selection, dispatches `setSelectedBreed`
- **Main** - Image grid with infinite scroll and modal lightbox
  - Fetches images when breed changes
  - Listens for scroll events to load more
  - Modal opens on image click, closes with Escape or backdrop click
- **Loader** - Animated ripple spinner

### Styling
- **Styled-components** for component styling
- **Separated styles:** Each component has a `.styled.tsx` file
- **Constants:** Style-related constants (image size, thresholds) in `.constants.ts`
- **Responsive:** Grid uses `repeat(auto-fit, minmax(300px, 1fr))`
- **Theme:** Light theme in `src/app/themes/light.ts`

### Internationalization (i18n)
- i18next for translations (Hebrew/RTL support)
- Locale files in `src/app/languages/`
- Default language: Hebrew

## Adding New Features

### Add a new component
1. Create `src/app/components/[name]/` folder
2. Create `[name].component.tsx` with named export
3. Create `[name].styled.tsx` if needed
4. Create `[name].constants.ts` for constants
5. Import using relative paths: `import { Component } from '../[name]/[name].component'`

### Add a new service
1. Create `src/app/services/[name]/` folder
2. Create `[name].service.ts` with named export
3. Import via `../../services/[name]/[name].service`

### Add a Redux action
1. Edit `src/app/features/dogs/dogsSlice.ts`
2. Add reducer logic to `createSlice`
3. Export action and use via `useAppDispatch()` hook

### Modify API calls
1. Update endpoint in `src/app/services/api/api.service.ts`
2. Update types in `src/app/generic/types/apiService.ts` if needed
3. Update thunk in `dogsSlice.ts` if response format changes

## Key Patterns

### Relative imports from components
Components are in subdirectories, so relative paths must account for depth:
- From component to hooks: `../../hooks`
- From component to features: `../../features/dogs/dogsSlice`
- From component to sibling component: `../[name]/[name].component`

### Image pagination
- All images for a breed fetched upfront into `allImages`
- Client-side infinite scroll appends 24 items to `visibleImages`
- Threshold: 350px from bottom triggers load

### Modal lightbox
- Fixed positioning with `z-index: 1000`
- Backdrop blur + fade animation
- Click backdrop or press Escape to close
- Stop propagation on content click

## Prettier Configuration
Single quotes enforced via `.prettierrc`: `{ "singleQuote": true }`
