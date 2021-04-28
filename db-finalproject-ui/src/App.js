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
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Music Player</p>
        <div className='header-links'>
          <a href='/artists'>Artists List</a>
          <a href='/songs'>Songs List</a>
          <a href='/users'>Users List</a>
          <a href='/playlists'>Playlists List</a>
        </div>
      </header>
      <body className="AppBody">
        <Switch>

          <Route exact path='/' render={props =>
            <HomePage />
          } />

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
