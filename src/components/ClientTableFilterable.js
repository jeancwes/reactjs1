import React from 'react';
import { connect } from 'react-redux'
import { Col, Row } from 'react-bootstrap';
import ClientModal from './ClientModal';
import { getClients } from '../store/actions/client';

const axios = require('axios');

class ClientRow extends React.Component {
  render() {
    const client = this.props.client;

    return (
      <tr>
        <td># {client.id}</td>
        <td>{client.name}</td>
        <td>{client.cpfCnpj}</td>
        <td>{client.rg}</td>
        <td>{client.bornDate}</td>
        <td>{client.phone}</td>
        <td>{client.email}</td>
      </tr>
    );
  }
}

class ClientTable extends React.Component {
  render() {
    const filterText = this.props.filterText;

    const rows = [];

    this.props.clients.forEach((client) => {
      if (
        client.name.indexOf(filterText) === -1 &&
        client.cpfCnpj.indexOf(filterText) === -1 && 
        client.bornDate.indexOf(filterText) === -1
      ) {
        return;
      }
      rows.push(
        <ClientRow
          client={client}
          key={client.id}
        />
      );
    });

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>CPF / CNPJ</th>
            <th>RG</th>
            <th>Data Nascimento</th>
            <th>Telefone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  render() {
    return (
      <Row className="my-3">
        <Col>
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="Digite para buscar..."
              value={this.props.filterText}
              onChange={this.handleFilterTextChange}
            />
          </form>
        </Col>
        <Col>
          <ClientModal />     
        </Col>
      </Row>
    );
  }
}

class ClientTableFilterable extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      filterText: '',
      clients: []
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  componentDidMount() {
    this.getClients();
  }

  getClients() {
    axios.get('http://localhost:5000/api/clients')
      .then(function (response) {
        console.log(response);
        this.props.getClients(response.data);
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        <ClientTable
          clients={this.props.clients}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    clients: state.clients
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getClients(newClients) {
      const action = getClients(newClients);
      dispatch(action);
    }
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ClientTableFilterable);
