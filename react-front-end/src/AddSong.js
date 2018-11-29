import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText, ListGroup, ListGroupItem } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
  }
  

  render() {
   // var{value}= this.state;
    return (
      <Form>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="AddSong">Add a song</Label>
              <Input type="text" name="createSong" id="song" placeholder="Enter a song name..."
        
              />
            </FormGroup>
          </Col>
        </Row>
        <Button id="createSong">Create</Button>
      </Form>
    );
  }
}