import React from 'react';
import { Table, Label, Form} from 'reactstrap';

export default class Example extends React.Component {
  
  constructor(props){
    super(props);
    this.state = 
    {
      songs: [],
      isLoaded: false,
    };
    
  }
  componentDidMount(){
    fetch('https://se3309-final-project-amali28.c9users.io:8081/topchart')
    .then(res=> res.json())
    .then(json => {
   this.setState({
        isLoaded: true,
        songs: json,
      })
    });
  }
  
  render() {
     var{isLoaded, songs}= this.state;
    return (
      
     <Form>
     <br></br><br></br>
        <h4><b>Songs</b></h4>
        <Table>
         <thead>
          <tr>
            <th>Song ID</th>
            <th>Song Name</th>
            <th>Genre </th>
            <th>Album Name </th>
            <th>Album ID</th>
            <th>Artist Name </th>
            <th>Amount of Plays</th>
          </tr>
         </thead>
        
        <tbody>
        {songs.map(result => (
        <tr>
          <td>{result.songID}</td>
          <td>{result.songName} </td>
          <td>{result.genre} </td>
          <td>{result.albumName} </td>
          <td>{result.albumID} </td>
          <td>{result.artistName} </td>
          <td>{result.hitCounter} </td>
        </tr>
        ))}
        </tbody>
        </Table>
     </Form>
    );
  }
}