import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText, ListGroup, Table, ListGroupItem, ButtonGroup,  Badge, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

export default class Example extends React.Component {
  
 
  constructor (props){
    super(props);
    
   this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);

    this.state={
      checked: false,
      clicked_id: [],
      songsForPlaylist: [],
      isloaded: false,
      playlistsToBeAdded: [],
      allPlaylist:[],
      songIDs: [],
      newPlaylist: "",
      currentplaylist:1,
      addedsong:1,
      songIDHits:1,
      albumValue: "",
    };
    
    this.handleClick= this.handleClick.bind(this);
    this.handleClickNew= this.handleClickNew.bind(this);
    this.handleClickAddSong=this.handleClickAddSong.bind(this);
    this.handleClickHitCounter= this.handleClickHitCounter.bind(this);
    this.handleChange= this.handleChange.bind(this);
    this.handleChangecurrent= this.handleChangecurrent.bind(this);
    this.handleChangesongID=this.handleChangesongID.bind(this);
    this.handleChangeHitCounter= this.handleChangeHitCounter.bind(this);
    this.toggle = this.toggle.bind(this);
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
  handleChangeHitCounter(event) {
    this.setState({songIDHits: event.target.value});
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
  
  increaseHitCounter(songIDObj){
    fetch('https://se3309-final-project-amali28.c9users.io:8081/play/'+songIDObj.songID)
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
  
  handleClickHitCounter(){
    var songIDObj= {"songID": this.state.songIDHits};
    this.increaseHitCounter(songIDObj);
   console.error(songIDObj);
  }
  
   toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  select(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      albumValue: event.target.innerText
    });
  }
  
  compomentDidMount(){
     fetch('https://se3309-final-project-amali28.c9users.io:8081/userplaylists/12345')
    .then(res=> res.json())
    .then(json => {
   this.setState({
        isloaded: true,
        songsID: json,
      })
    });
  }
  
  handleChange(event) {
    this.setState({newPlaylist: event.target.value});
  }
  
  render() {
   
    var{isloaded, allPlaylist}= this.state;
    var{isloaded, songsID}= this.state;
  
    return (
          
      <Form class="2">
        <Row form>
          <Col md={6}>
            <FormGroup>
              <h3 for="Playlist">Create a Playlist</h3>
              <Input type="text" name="Playlist" id="exampleEmail" placeholder="Enter playlist Name..." 
                 value={this.state.value}
                  onChange={this.handleChange}/>
                <br></br>
              <Button  onClick= {this.handleClickNew} id="createPlaylist">Add New Playlist</Button>
              <br></br>
              <hr></hr> 
              
                <h3 for="Playlist">Add a Song to a Playlist</h3>
                   <div>
                        <Input type="text" name="currentPlaylist" placeholder="Enter playlist ID"
                              value={this.state.value}
                               onChange={this.handleChangecurrent}/>
                              <br />
                        <Input type="text" name="songID" placeholder="Enter songID "
                                  value={this.state.value}
                                   onChange={this.handleChangesongID}/>
                                <br></br>
                          <Button onClick= {this.handleClickAddSong} >Add song to playlist</Button>
                  </div>

            </FormGroup>
          </Col>
        </Row>
         
        <br></br>
          <h3 for="Playlist">Retrieve All Playlists</h3>
        <br></br>
        <Button  onClick= {this.handleClick}  id="createPlaylist">Get All playlists</Button>
        <br></br>
        <br></br>
          
          
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
          <hr></hr>
          <br /> <br />
          <h4>Play a Song</h4>
          <br></br>
             <div>
                    <Input type="text" name="currentPlaylist" placeholder="Enter Song ID"
                              value={this.state.value}
                               onChange={this.handleChangeHitCounter}/>
                               <br></br>
                        <Button onClick= {this.handleClickHitCounter} >Play</Button>        
             </div>                 
                               
  </Form>
  
    );
  }
}

