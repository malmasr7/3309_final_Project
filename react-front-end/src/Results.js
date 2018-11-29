import React from 'react';
import { Table, Label} from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Song Name</th>
            <th>Other Attribute</th>
            <th>Other Attribute 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
        <br></br><br></br>
           <Label>Albums</Label>

        <thead>
          <tr>
            <th>#</th>
            <th>Album Name</th>
            <th>Other Attribute</th>
            <th>Other Attribute 2</th>
          </tr>
        </thead>
        <tbody>
          
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
        <br></br><br></br>
           <Label>Playlists</Label>
        <thead>
          <tr>
            <th>#</th>
            <th>Playlist Name</th>
            <th>Other Attribute</th>
            <th>Other Attribute 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
      
    );
  }
}