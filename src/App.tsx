import styled, { ThemeProvider } from 'styled-components';
import "the-new-css-reset/css/reset.css";
import Header from './app/components/Header';
import light from './app/themes/light';

const AppContainer = styled.div`
  font-family: 'Amatic SC', cursive;
`;

const App = () => {
  return (
    <ThemeProvider theme={light}>
      <AppContainer>
        <Header />  
      </AppContainer>
    </ThemeProvider>
    
  );
}

export default App;
