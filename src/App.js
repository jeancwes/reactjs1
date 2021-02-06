import React, { useState } from 'react';
import { Button, Col, Modal, Row, Tab, Tabs } from 'react-bootstrap';
import ClientModal from './components/ClientModal';
const axios = require('axios');

const CLIENTS = [
  {
    id: 0,
    name: 'Client 1',
    cpfCnpj: '111.111.111-11',
    rg: '1.111.111-1',
    bornDate: new Date().toUTCString(),
    phone: '1111111111',
    email: 'client1@client1.com',
    registerDate: new Date().toUTCString(),
  }
];

const PLANS = [
  {
    id: 0,
    name: '',
    permitLegalPerson: true,
    startEffectiveDate: new Date().toUTCString(),
    endEffectiveDate: new Date().toUTCString(),
    registerDate: new Date().toUTCString(),
  }
];

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
        client.cpfCnpj.indexOf(filterText) === -1
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
          <ClientModal></ClientModal>
        </Col>
      </Row>
    );
  }
}

class FilterableClientTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      clients: []
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/clients')
      .then(function (response) {
        console.log(response);
        this.setState({
          clients: response.data
        })
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
          clients={this.state.clients}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}

function App() {
  const [key, setKey] = useState('clients');

  return (
    <Tabs
      defaultActiveKey="clients"
      id="controlled-key"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="clients" title="Clientes">
        <FilterableClientTable />
      </Tab>
      <Tab eventKey="plans" title="Planos">

      </Tab>
    </Tabs>
  );
}

export default App;
