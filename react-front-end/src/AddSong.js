import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText, ListGroup, ListGroupItem, Table,
        ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Dropdown} from 'reactstrap';

export default class Example extends React.Component {
  
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = 
    {
      songs: [],
      albums: [],
      isLoaded: false,
      value: "",
      albumValue: "",
    };
    
   this.handleChange= this.handleChange.bind(this);
   this.handleClick= this.handleClick.bind(this);
   this.toggle = this.toggle.bind(this);
    
  }

  componentDidMount(){
    fetch('https://se3309-final-project-amali28.c9users.io:8081/newaddedsong/')
    .then(res=> res.json())
    .then(json => {
   this.setState({
        isLoaded: true,
        songs: json,
      })
    });
    
    fetch('https://se3309-final-project-amali28.c9users.io:8081/album/')
    .then(res=> res.json())
    .then(json => {
   this.setState({
        isLoaded: true,
        albums: json,
      })
    });
  
  }
  
   handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  handleClick(){
      var nameobj= {"name": this.state.value};
      console.error(nameobj.name);
      this.processQuery(nameobj);
      alert("The new song has been added to your database");
   }
  
    processQuery(nameobj) {
     let albumID= 10;
     fetch('https://se3309-final-project-amali28.c9users.io:8081/addnewsong/'+nameobj.name+'/'+ this.state.albumValue, {mode: 'no-cors'})
      .then(res=> res.json())
      .then(json => {
      this.setState({

      })
    });
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
   
  render() {
     var{isLoaded, songs}= this.state;
     var{isLoaded, albums}= this.state;
    return (
     <Form>
     <Row form>
              <Col md={6}>
                <FormGroup>
                  <h4><b>Add a Song</b></h4>
                  <Input type="text" name="createSong" id="song" placeholder="Enter a song name..."
                     value={this.state.value}
                      onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
             <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Select Album
        </DropdownToggle>
      
        <span
          onClick = {this.toggle}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded={this.state.dropdownOpen}
        >{this.state.albumValue}
        </span>
        <DropdownMenu>
        {albums.map(result => (
        <div onClick={this.select}>{result.albumID}</div>
        ))}

        </DropdownMenu>
        
      </Dropdown>
            <br></br>
            <Button onClick= {this.handleClick} id="createSong">Create</Button>
            <br></br>
            <br></br>
     <br></br><br></br>
        <h4><b>Songs</b></h4>
        <Table>
         <thead>
          <tr>
            <th>Song ID</th>
            <th>Song Name</th>
            <th>Genre </th>
            <th>Album ID</th>
            <th>Hit Counter</th>
          </tr>
         </thead>
        
        <tbody>
        {songs.map(result => (
        <tr>
          <td>{result.songID}</td>
          <td>{result.songName} </td>
          <td>{result.genre}</td>
          <td>{result.albumID} </td>
          <td>{result.hitCounter} </td>
        </tr>
         ))}
        </tbody>
        </Table>
     </Form>
    );
  }
}