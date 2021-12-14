import styled, { ThemeProvider } from 'styled-components';
import "the-new-css-reset/css/reset.css";
import Header from './app/components/Header';
import light from './app/themes/light';
import Main from './app/components/Main';

const AppContainer = styled.div`
  font-family: 'Amatic SC', cursive;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const App = () => {
  return (
    <ThemeProvider theme={light}>
      <AppContainer>
        <Header />
        <Main />
      </AppContainer>
    </ThemeProvider>
    
  );
}

export default App;
