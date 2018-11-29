import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText, ListGroup, ListGroupItem, ButtonGroup,  Badge } from 'reactstrap';

export default class Example extends React.Component {
  
 
  constructor (props){
    super(props);

    this.state={
      checked: false,
      clicked_id: [],
      songsForPlaylist: [],
      isloaded: false,
      isButtonDisabled: false,
      playlistsToBeAdded: [],
    };
    
  this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);

  }
  
  componentDidMount(){
    fetch('https://se3309-final-project-amali28.c9users.io:8081/retrievePlaylistSongs')
    .then(res=> res.json())
    .then(json => {
   this.setState({
        isloaded: true,
        songsForPlaylist: json,
      })
    });
  }
  
   handleClick(songID){
  
    console.error("Yo");

   
  }
  
  onClick = event => {
  const id = event.currentTarget.getAttribute("songForPlaylist-rowid");
  console.error(id);
   
  };
  
  onCheckboxBtnClick(selected) {
    const index = this.state.cSelected.indexOf(selected);
    if (index < 0) {
      this.state.cSelected.push(selected);
    } else {
      this.state.cSelected.splice(index, 1);
    }
    this.setState({ cSelected: [...this.state.cSelected] });
  }

  
  disableButton() {
    this.setState({
        isButtonDisabled: true
     });
  }
  
  render() {
    var{isloaded, songsForPlaylist} = this.state;
  
    return (
      <Form>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <h3 for="Playlist">Create a Playlist</h3>
              <Input type="text" name="Playlist" id="exampleEmail" placeholder="Enter playlist name..." />
            </FormGroup>
          </Col>
        </Row>
        
      <table>  
      <tbody>
      <ListGroup>
     <div class = "selectSongs">
     {songsForPlaylist.map (songs =>  (
            <ListGroupItem tag="a" href = "#" key={songs.songID} songsForPlaylist-rowid={songs.songID}>
            {songs.songName}
            <h1> {this.key} </h1>
            </ListGroupItem>
		  ))}
		  </div>
		  </ListGroup>
		  
		
       </tbody>
  	     </table>
   
        <br></br>
        <h3>Songs Added</h3>
          <li key={this.clicked_id}></li>
        <br></br>
        <Button id="createPlaylist">Create</Button>
      </Form>
    );
    
    
   

  }
}

