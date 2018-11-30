import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText, ListGroup, Table, ListGroupItem, ButtonGroup,  Badge } from 'reactstrap';

export default class Example extends React.Component {
  
 
  constructor (props){
    super(props);

    this.state={
      checked: false,
      clicked_id: [],
      songsForPlaylist: [],
      isloaded: false,
      playlistsToBeAdded: [],
      allPlaylist:[],
      
      newPlaylist: "",
      currentplaylist:1,
      addedsong:1,
    };
    
    this.handleClick= this.handleClick.bind(this);
    this.handleClickNew= this.handleClickNew.bind(this);
    this.handleClickAddSong=this.handleClickAddSong.bind(this);
    
    this.handleChange= this.handleChange.bind(this);
    this.handleChangecurrent= this.handleChangecurrent.bind(this);
    this.handleChangesongID=this.handleChangesongID.bind(this);
  }

  
  handleChange(event) {
    this.setState({newPlaylist: event.target.value});
    }
  handleChangecurrent(event) {
    this.setState({currentplaylist: event.target.value});
    }  
  handleChangesongID(event) {
    this.setState({addedsong: event.target.value});
    }  
 
  getAllplaylists(){
    fetch('https://se3309-final-project-amali28.c9users.io:8081/userplaylists/12345')
    .then(res=> res.json())
    .then(json => {
   this.setState({
        isloaded: true,
        allPlaylist: json,
      })
    });
  }
  
   addnewPlaylist(nameobj){
     let user=12345;
    fetch('https://se3309-final-project-amali28.c9users.io:8081/playlist/'+user +'/'+nameobj.name)
    .then(res=> res.json())
    .then(json => {
   this.setState({})
    });
  }
  
  addsongtoPlaylist(currentPlaylistObject){
     
    fetch('https://se3309-final-project-amali28.c9users.io:8081/addsong/'+currentPlaylistObject.songID +'/'
                  +currentPlaylistObject.playlistID)
    .then(res=> res.json())
    .then(json => {
   this.setState({})
    });
  }
  
  
  
  handleClickAddSong(){
  var currentPlaylistObject= {"playlistID": this.state.currentplaylist,
                                "songID": this.state.addedsong
  };
    this.addsongtoPlaylist(currentPlaylistObject);
    alert("the song with ID "+ currentPlaylistObject.songID+ " is added to "+ currentPlaylistObject.playlistID );
  }

  handleClick(){
    this.getAllplaylists()
  }
  
  handleClickNew(){
    var nameobj= {"name": this.state.newPlaylist};
    this.addnewPlaylist(nameobj);
    this.getAllplaylists();
   console.error(nameobj);
   
  }
  render() {
   
    var{isloaded, allPlaylist}= this.state;
  
    return (
          
      <Form class="2">
        <Row form>
          <Col md={6}>
            <FormGroup>
              <h3 for="Playlist">Create a Playlist</h3>
              <Input type="text" name="Playlist" id="exampleEmail" placeholder="Enter playlist Name..." 
                 value={this.state.value}
                  onChange={this.handleChange}/>
              <Button  onClick= {this.handleClickNew} id="createPlaylist">Add New Playlist</Button>
              <br></br>
              <hr></hr> 
              
                  <div>
                        <Input type="text" name="currentPlaylist" placeholder="Enter playlist ID"
                              value={this.state.value}
                               onChange={this.handleChangecurrent}/>
                        <Input type="text" name="songID" placeholder="Enter songID "
                                  value={this.state.value}
                                   onChange={this.handleChangesongID}/>
                                
                          <button onClick= {this.handleClickAddSong} >Add song to playlist</button>
                  </div>

            </FormGroup>
          </Col>
        </Row>
         
        <br></br>
        <Button  onClick= {this.handleClick}  id="createPlaylist">Get All playlists</Button>
      
          
          
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Date Created</th>
            <th>User ID</th>
            <th>Playlist Name</th>
          </tr>
        </thead>
        <tbody>
        {allPlaylist.map(result => (
        <tr>
          <td>{result.playlistID}</td>
          <td>{result.dataCreated} </td>
          <td>{result.userID}</td>
          <td>{result.playlistName}</td>
        </tr>
        ))}
        </tbody>
        </Table>
          
  </Form>
  
    );
    
    
   

  }
}

