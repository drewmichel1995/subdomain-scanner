import React from "react";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";

class AddDomain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addText: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }

  onChange = event => {
    this.setState({
      addText: event.target.value
    });
  };

  onAdd = () => {
    var data = { "name": this.state.addText };
    const url = process.env.REACT_APP_PROXY_PATH + "/server/addDomain";
    fetch(url, {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          addText: ""
        });
        window.location.reload();
      });
  };

  render() {
    const { addText } = this.state;
    return (
      <Form inline className="justify-content-center">
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Add Domain"
            value={addText}
            onChange={this.onChange}
          />
          <InputGroup.Append>
            <Button variant="secondary" onClick={this.onAdd}>
              Add
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    );
  }
}

export default AddDomain;
