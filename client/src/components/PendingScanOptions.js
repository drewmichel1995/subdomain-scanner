import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import ScanDomainButton from "./ScanDomainButton";

class PendingScanOptions extends React.Component {
  constructor(props) {
    super(props);

    this.onScan = this.onScan.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete = () => {
    var data = { "name": this.props.domain };
    const url = process.env.REACT_APP_PROXY_PATH + "/server/deletePendingScan";
    fetch(url, {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(res => res.json())
      .then(result => {
        this.props.reload();
      });
  };

  render() {
    return (
      <td className="text-center">
        <ButtonGroup aria-label="Basic example">
          <ScanDomainButton
            reload={this.props.reload}
            text={"Scan"}
            variant="secondary"
          />

          <Button variant="danger" onClick={this.onDelete}>
            Delete
          </Button>
        </ButtonGroup>
      </td>
    );
  }
}

export default PendingScanOptions;
