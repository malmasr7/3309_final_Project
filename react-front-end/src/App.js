import React, { Component} from 'react';
import logo from './logo.svg';
import Playlistform from './createPlaylistForm';
import Search from './Search';
import Results  from './Results';
import AddSong from './AddSong';
import SelectPlaylist from './SelectPlaylist';
import HitCount from './HitCount';
import './App.css';
import {Label} from 'reactstrap';
import Nav from './Nav';


class App extends Component {
  render() {
    return (
      <div className="App">
      <Nav />
 
      </div>
    );
  }
}

export default App;
