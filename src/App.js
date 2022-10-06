import './style.css';

import React from 'react';

import ColorList from './containers/ColorList';
import Wallet from './containers/Wallet';

function App() {
  return (
    <div className="App">
      <Wallet />
      <ColorList />
    </div>
  );
}

export default App;