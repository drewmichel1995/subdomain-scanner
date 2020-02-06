import React from "react";
import AddDomain from "./AddDomain";
import { Navbar, Nav } from "react-bootstrap";

class NavigationBar extends React.Component {
  getDefault = () =>
    window.location.href.includes("pending") ? "#pending" : "#domains";

  render() {
    console.log(this.props.defaultActive);
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>Subdomain Scanner</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="mr-auto"
            fill
            variant="pills"
            defaultActiveKey={this.getDefault()}
          >
            <Nav.Item>
              <Nav.Link href="#domains">Domains</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#pending">Pending Domains</Nav.Link>
            </Nav.Item>
          </Nav>

          <AddDomain />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;
