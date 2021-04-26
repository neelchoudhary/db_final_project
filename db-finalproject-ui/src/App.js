import './App.css';
import { Route, Switch } from 'react-router-dom'
import ArtistsPage from './components/ArtistsPage';
import React from 'react';
import ArtistsEditPage from './components/ArtistsEditPage';
import UsersPage from './components/UsersPage';
import UsersEditPage from './components/UsersEditPage';
import SongsPage from './components/SongsPage';
import SongsEditPage from './components/SongsEditPage';
import PlaylistsPage from './components/PlaylistsPage';
import PlaylistsEditPage from './components/PlaylistsEditPage';


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
      <body className="AppBody">
        <Switch>
          <Route exact path='/artists' render={props =>
            <ArtistsPage />
          } />

          <Route path='/artists/edit' render={props =>
            <ArtistsEditPage />
          } />

          <Route exact path='/users' render={props =>
            <UsersPage />
          } />

          <Route path='/users/edit' render={props =>
            <UsersEditPage />
          } />

          <Route exact path='/songs' render={props =>
            <SongsPage />
          } />

          <Route path='/songs/edit' render={props =>
            <SongsEditPage />
          } />

          <Route exact path='/playlists' render={props =>
            <PlaylistsPage />
          } />

          <Route path='/playlists/edit' render={props =>
            <PlaylistsEditPage />
          } />
        </Switch>
      </body>
    </div>
  );
}

export default App;
