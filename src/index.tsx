import React from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
