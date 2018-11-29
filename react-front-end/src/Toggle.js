import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText, ListGroup, ListGroupItem } from 'reactstrap';

export default class Example extends React.Component {

  state = {
      on: false,
  }
  
  toggle = () => {
      this.setState({
          on: !this.on.state,
      });
  };
  
render() {
const { rend } = this.props;

return <div>{rend({
	on: this.state.on,
	toggle: this.toggle

	})}
</div>
}
};
