import React from 'react';
import styled from 'styled-components';
import resetCssStyles from './ResetCss';

const AppContainer = styled.div`${resetCssStyles}`;

function App() {
  return (
    <AppContainer>
      Ofir's Dogs Club
    </AppContainer>
  );
}

export default App;
