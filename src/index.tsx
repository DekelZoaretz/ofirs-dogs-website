import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './app.component';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import he from './app/languages/he';

i18n.use(initReactI18next).init({
  resources: {
    he,
  },
  lng: 'he',
  fallbackLng: 'he',
  interpolation: {
    escapeValue: false,
  },
});

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

serviceWorker.unregister();
