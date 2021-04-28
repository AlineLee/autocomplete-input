import React from 'react';
import styled from 'styled-components';

import AutocompleteInput from './components/autocompleteInput';

const AppHeader = styled('header')`
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  margin-bottom: 10px;
`;

const AppWrapper = styled('div')`
  text-align: center;
  display: block;
  max-width: 800px;
  margin: 0 auto;
`;

const Main = styled('main')`
  padding: 20px;
  display: block;
`;

function App() {
  return (
    <AppWrapper>
      <AppHeader>
        <h1>Autocomplete input</h1>
      </AppHeader>
      <Main>
        <AutocompleteInput/>
      </Main>
    </AppWrapper>
  );
}

export default App;
