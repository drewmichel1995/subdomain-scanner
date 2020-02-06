import React from "react";
import { Form } from "react-bootstrap";

class TableSearch extends React.Component {
  render() {
    return (
      <Form>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Control
            type="text"
            placeholder="Search..."
            onChange={this.props.onSearch}
          />
        </Form.Group>
      </Form>
    );
  }
}

export default TableSearch;
