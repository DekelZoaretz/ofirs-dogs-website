import React from 'react';
import { ThemeProvider } from 'styled-components';
import 'the-new-css-reset/css/reset.css';
import { Header } from './app/components/header.component';
import { Main } from './app/components/main.component';
import light from './app/themes/light';
import { AppContainer } from './app.styled';

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={light}>
      <AppContainer>
        <Header />
        <Main />
      </AppContainer>
    </ThemeProvider>
  );
};
