import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import fontawesome from '@fortawesome/fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import { faSearch } from '@fortawesome/fontawesome-free-solid';
import React from 'react';
import './App.css';

/**
 * Build a library of fontawesome icons
 *
 * This keeps bundle size low as we only bundle icons
 * defined in this library.
 *
 * Icons in this library can be used by any fontawesome
 * component
 */
fontawesome.library.add(brands, faSearch);

const App = () => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title-lg"><FontAwesomeIcon icon="search" size="8px" /> Spotlight</h1>
    </header>
    <p className="App-intro">
      I&apos;m nowhere near ready yet. PUNCH SOME CODE IN HERE!
    </p>
  </div>
);

export default App;
