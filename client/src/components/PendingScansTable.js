import React from "react";
import { Table, Spinner, Container } from "react-bootstrap";
import PendingScanOptions from "./PendingScanOptions";
import TableSearch from "./TableSearch";

const isSearched = searchTerm => item =>
  item.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
  item.date.toLowerCase().includes(searchTerm.toLowerCase());

class PendingScansTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domains: [],
      searchTerm: ""
    };

    this.reload = this.reload.bind(this);
  }

  componentDidMount() {
    const url = process.env.REACT_APP_PROXY_PATH + "/server/getPendingScans";
    fetch(url)
      .then(res => res.json())
      .then(result => this.setState({ domains: result }));
  }

  onSearch = search => {
    this.setState({
      searchTerm: String(search.target.value)
    });
  };

  reload = () => {
    const url = process.env.REACT_APP_PROXY_PATH + "/server/getPendingScans";
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
              <th className="d-none d-md-table-cell">Date Added</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {domains.filter(isSearched(searchTerm)).map(domain => (
              <tr key={domain.domain + domain.date}>
                <td>{domain.domain}</td>
                <td className="d-none d-md-table-cell">{domain.date}</td>
                {domain.isScanning ? (
                  <td className="text-center">
                    <Spinner animation="grow" />
                    Scanning
                  </td>
                ) : (
                  <PendingScanOptions
                    domain={domain.domain}
                    reload={this.reload}
                  />
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default PendingScansTable;
