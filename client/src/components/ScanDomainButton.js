import React from "react";
import { Button } from "react-bootstrap";

class ScanDomainButton extends React.Component {
  constructor(props) {
    super(props);

    this.onScan = this.onScan.bind(this);
  }

  onScan = () => {
    var data = { "name": this.props.domain };
    const url = process.env.REACT_APP_PROXY_PATH + "/server/scanDomain";
    fetch(url, {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
      })
      .catch(() => {
        this.props.reload();
      });

    this.props.reload();
  };

  render() {
    return (
      <Button
        variant={this.props.variant}
        className="link"
        onClick={this.onScan}
      >
        {this.props.text}
      </Button>
    );
  }
}

export default ScanDomainButton;
