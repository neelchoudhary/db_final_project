import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom'
import ArtistsPage from './components/ArtistsPage';
import React from 'react';
import ArtistsEditPage from './components/ArtistsEditPage';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Music Player
        </p>
        <p>
          Neel Choudhary,
          Angela Hu
        </p>
      </header>
      <body>
        <Switch>
          <Route exact path='/artists' render={props =>
            <ArtistsPage />
          } />

          <Route path='/artists/edit' render={props =>
            <ArtistsEditPage />
          } />
        </Switch>
      </body>
    </div>
  );
}

export default App;
