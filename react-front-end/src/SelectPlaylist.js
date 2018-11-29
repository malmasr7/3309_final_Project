import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText, ListGroup, ListGroupItem } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
      <Form>
        <Row form>
          <Col md={6}>
              <Label for="Playlist">Available Playlists</Label>
          </Col>
        </Row>
        <ListGroup stylename= "songNames">
          <ListGroupItem tag="button" action>Playlist 1</ListGroupItem>
          <ListGroupItem tag="button" action>Playlist 2</ListGroupItem>
          <ListGroupItem tag="button" action>Playlist 3</ListGroupItem>
        </ListGroup>
      </Form>
    );
  }
}