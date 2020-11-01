import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import Home from './features/Home/Home';
import './App.scss';
import SearchSuggestion from './features/SearchSuggestion/SearchSuggestion';

function App() {
  return (
    <div className="App">
      <Home />
      {/* <SearchSuggestion/> */}
    </div>
  );
}

export default App;
