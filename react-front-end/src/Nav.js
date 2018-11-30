import React from 'react';
import { Nav, NavItem, NavLink, Media} from 'reactstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Search from './Search';
import AddSong from './AddSong';
import HitCount from './HitCount';
import CreatePlayList from './createPlaylistForm';
import PlaylistSongs from './PlaylistSongs';
import Quit from './Quit';

export default class Example extends React.Component {
  render() {
    return (
      <div>
        <Nav>
          <NavItem>
          <NavLink href='/'>Create Playlists</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/search/">Search</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/topcharts/">Top Charts</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/addsong">Add Song</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/playlistSong">View Public Playlists</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/quit/">Quit</NavLink>
          </NavItem>
        </Nav>
        <hr />
        <Router>
        <Route path="/" exact component = {CreatePlayList} />
        </Router>
        <Router>
          <Route path="/search/" component = {Search} />
        </Router>
        <Router>
        <Route path="/topcharts/" component = {HitCount} />
        </Router>
        <Router>
        <Route path="/addsong/" component = {AddSong} /> 
        </Router>
        <Router>
        <Route path="/playlistSong/" component = {PlaylistSongs} /> 
        </Router>
        <Router>
        <Route path="/quit/" component = {Quit} />
        </Router>

      </div>
    );
  }
}