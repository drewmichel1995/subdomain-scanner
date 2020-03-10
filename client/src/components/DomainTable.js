import React from "react";
import { Table, Spinner, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableSearch from "./TableSearch";

import ScanDomainButton from "./ScanDomainButton";

const isSearched = searchTerm => item =>
  item.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
  item.date.toLowerCase().includes(searchTerm.toLowerCase());

class DomainTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domains: [],
      searchTerm: ""
    };

    this.reload = this.reload.bind(this);
  }

  componentDidMount() {
    const url =
      process.env.REACT_APP_PROXY_PATH + "/server/getAvailableDomains";
    fetch(url)
      .then(res => res.json())
      .then(result => this.setState({ domains: result }));
  }

  onSearch = search => {
    this.setState({
      searchTerm: search.target.value
    });
  };

  reload = () => {
    const url =
      process.env.REACT_APP_PROXY_PATH + "/server/getAvailableDomains";
    fetch(url)
      .then(res => res.json())
      .then(result => this.setState({ domains: result }));
  };

  render() {
    const { domains, searchTerm } = this.state;
    return (
      <Container>
        <TableSearch onSearch={this.onSearch} />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Domain</th>
              <th className="d-none d-md-table-cell">Number of Subdomains</th>
              <th className="d-none d-md-table-cell">Last Scanned</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {domains.filter(isSearched(searchTerm)).map(domain => (
              <tr key={domain.domain + domain.date}>
                <td>
                  <Link
                    className="link"
                    to={{
                      pathname: "/subdomain/" + domain.domain
                    }}
                  >
                    {domain.domain}
                  </Link>
                </td>
                <td className="d-none d-md-table-cell">{domain.total}</td>
                <td className="d-none d-md-table-cell">{domain.date}</td>
                <td>
                  {domain.isScanning ? (
                    <Spinner animation="grow" />
                  ) : (
                    <ScanDomainButton
                      reload={this.reload}
                      text="Scan Again"
                      variant="link"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default DomainTable;
