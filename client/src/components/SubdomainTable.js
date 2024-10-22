import React from "react";
import { Table, Container } from "react-bootstrap";
import TableSearch from "./TableSearch";

const isSearched = searchTerm => item =>
  item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  item.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
  item.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
  item.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
  item.cidr.toLowerCase().includes(searchTerm.toLowerCase()) ||
  item.asn.toLowerCase().includes(searchTerm.toLowerCase()) ||
  item.desc.toLowerCase().includes(searchTerm.toLowerCase());

class subdomainTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subdomains: [],
      searchTerm: ""
    };
  }

  componentDidMount() {
    const subdomain = this.props.match.params.name;
    console.log(subdomain);
    const url =
      process.env.REACT_APP_PROXY_PATH + "/server/" + subdomain.split(".")[0];
    fetch(url)
      .then(res => res.json())
      .then(result => this.setState({ subdomains: result }));

    console.log(this.state.subdomains);
  }

  onSearch = search => {
    this.setState({
      searchTerm: search.target.value
    });
  };

  render() {
    const { subdomains, searchTerm } = this.state;
    return (
      <Container>
        <TableSearch onSearch={this.onSearch} />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Name</th>
              <th className="d-none d-md-table-cell">IP</th>
              <th className="d-none d-lg-table-cell">Source</th>
              <th className="d-none d-lg-table-cell">Tag</th>
              <th className="d-none d-md-table-cell">CIDR</th>
              <th className="d-none d-lg-table-cell">ASN</th>
              <th className="d-none d-lg-table-cell">Desc</th>
            </tr>
          </thead>
          <tbody>
            {subdomains.filter(isSearched(searchTerm)).map(subdomain => (
              <tr>
                <td>{subdomain.name}</td>
                <td className="d-none d-md-table-cell">{subdomain.ip}</td>
                <td className="d-none d-lg-table-cell">{subdomain.source}</td>
                <td className="d-none d-lg-table-cell">{subdomain.tag}</td>
                <td className="d-none d-md-table-cell">{subdomain.cidr}</td>
                <td className="d-none d-lg-table-cell">{subdomain.asn}</td>
                <td className="d-none d-lg-table-cell">{subdomain.desc}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default subdomainTable;
