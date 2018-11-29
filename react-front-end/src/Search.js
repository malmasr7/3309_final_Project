import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText, ListGroup, ListGroupItem, Table, Collapse, CardBody, Card } from 'reactstrap';
import Toggle from './Toggle';
export default class Example extends React.Component {
 constructor(props) {
    super(props);
    this.state = 
    {
      isToggleOn: true,
      value: '',
      songs: [],
      albums: [],
      playlists: [],
      isLoaded: false,
      on: false,
    };
   this.handleChange= this.handleChange.bind(this);
   this.handleClick= this.handleClick.bind(this);
  }

  _showQueries = (bool) => {
    this.setState({
      showQueries: bool,
    });
  }
  
   
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }

processAlbumQuery(nameobj){
  fetch('https://se3309-final-project-amali28.c9users.io:8081/searchalbum/'+ nameobj.name )
      .then(res=> res.json())
      .then(json => {
      this.setState({
        isLoaded: true,
        albums: json,
      })
    });
}

 processQuery(nameobj) {
     fetch('https://se3309-final-project-amali28.c9users.io:8081/searchretrieve/'+ nameobj.name )
      .then(res=> res.json())
      .then(json => {
      this.setState({
        isLoaded: true,
        songs: json,
      })
    });
   }
   
processPlayListQuery(nameobj){
  fetch('https://se3309-final-project-amali28.c9users.io:8081/searchplaylist/'+ nameobj.name )
      .then(res=> res.json())
      .then(json => {
      this.setState({
        isLoaded: true,
        playlists: json,
      })
    });
}
   
   handleClick(){
      var nameobj= {"name": this.state.value};
      console.error(nameobj);
      this.processQuery(nameobj);
      this.processAlbumQuery(nameobj);
      this.processPlayListQuery(nameobj);
   }
   
  render() {
    var{isLoaded, songs}= this.state;
    var{isLoaded, albums}= this.state;
    var{isLoaded, playlists} = this.state;
  
    return(
      <Form>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <h3><b>Search</b></h3>
              <Input type="text" name="search" id="searchField" placeholder="Search for a song, album, or playlist" 
              value={this.state.value}
                  onChange={this.handleChange}/>
            </FormGroup>
          </Col>
        </Row>
        <Button onClick= {this.handleClick} id="search" >Search</Button>
         <br></br><br></br>
        <h4><b>Songs</b></h4>
        <Table option={false}>
         <thead>
          <tr>
            <th>#</th>
            <th>Song Name</th>
            <th>Hit Counter</th>
          </tr>
         </thead>
        
        <tbody>
        {songs.map(result => (
        <tr>
          <td>{result.songID}</td>
          <td>{result.songName} </td>
          <td>{result.hitCounter}</td>
        </tr>
        ))}
        </tbody>
        </Table>
        <br></br><br></br>
             <br></br><br></br>
        <h4><b>Albums</b></h4>
         <Table>
         <thead>
          <tr>
            <th>#</th>
            <th>Album Name</th>
            <th>Date Released</th>
            <th>Genre</th>
          </tr>
         </thead>
        <tbody>
        {albums.map(res => (
        <tr>
          <td>{res.albumID}</td>
          <td>{res.albumName}</td>
          <td>{res.date} </td>
          <td>{res.genre}</td>
        </tr>
        ))}
        </tbody>
        </Table>
        <br></br><br></br>
             <br></br><br></br>
         <h4><b>Playlists</b></h4>
         <Table>
         <thead>
          <tr>
            <th>#</th>
            <th>Playlist Name</th>
            <th>Date Created</th>
          </tr>
         </thead>
        <tbody>
        {playlists.map(res => (
        <tr>
          <td>{res.playlistID}</td>
          <td>{res.playlistName}</td>
          <td>{res.dataCreated} </td>
        </tr>
        ))}
        </tbody>
        </Table>
        
      </Form>
    );
  }
}
