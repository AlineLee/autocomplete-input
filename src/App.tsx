import React from 'react';
import './App.css';

import AutocompleteInput from './components/autocompleteInput';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Autocomplete input</h1>
      </header>
      <main>
        <AutocompleteInput/>
      </main>
    </div>
  );
}

export default App;
