import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from '../pages/Home'

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
