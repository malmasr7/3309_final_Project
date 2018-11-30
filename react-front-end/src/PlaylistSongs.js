import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText, ListGroup, Table, ListGroupItem, ButtonGroup,  Badge, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

export default class Example extends React.Component {
    
     constructor (props){
    super(props);
        
        this.state=
        {
          playlistID:1,
          allSongs:[],
          isloaded: false,
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleClick= this.handleClick.bind(this);
     }
  
     handleChange(event) {
        this.setState({playlistID: event.target.value});
} 
    handleClick(){
        var playlistIDObj= {"playlistID": this.state.playlistID};
          this.getAllSongs(playlistIDObj);
}
    getAllSongs(playlistIDObj){
        
    fetch('https://se3309-final-project-amali28.c9users.io:8081/playlistsongs/'+playlistIDObj.playlistID)
    .then(res=> res.json())
    .then(json => {
   this.setState({
        isloaded: true,
        allSongs: json,
      })
    });
  }
    
    
    
     render() {
         
             var{isloaded, allSongs}= this.state;

         
    return (
        <Form class="2">
        <Row form>
          <Col md={6}>
            <FormGroup>
              <h3 for="Playlist">Retrieve Playlist Songs</h3>
              <Input type="text" name="Playlist"  placeholder="Enter Playlist ID..." 
                 value={this.state.value}
                  onChange={this.handleChange}/>
                <br></br>
              <Button  onClick= {this.handleClick} id="createPlaylist">Show songs</Button>
              <br></br>
              <hr></hr> 
            </FormGroup>
          </Col>
        </Row>
         
        <br></br>
          <h3 for="Playlist">Retrieve All Songs</h3>
        <br></br>
        <br></br>
      
      <Table>
        <thead>
          <tr>
            <th>Song #</th>
            <th>Album #</th>
            <th>Hit Counter</th>
            <th>Song Name</th>
          </tr>
        </thead>
        <tbody>
        {allSongs.map(result => (
        <tr>
          <td>{result.songID}</td>
          <td>{result.albumID} </td>
          <td>{result.hitCounter}</td>
          <td>{result.songName}</td>
        </tr>
        ))}
        </tbody>
        </Table>
  </Form>
  
        );
     }
}