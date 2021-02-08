import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
const axios = require('axios');

function ClientForm(props) {

  const [client, setClient] = useState(props.client)

  const handleSubmit = (e) => {
    e.preventDefault()

    client.plans = [{ planId: 1 }];

    console.log('submit');
    console.log(client);

    axios.post('http://localhost:5000/api/clients', client)
      .then(function (response) {
        console.log(response);
        props.onSubmit(e);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" placeholder="Informe seu nome"
              onChange={e => setClient({ ...client, name: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="cpfCnpj">
            <Form.Label>CPF / CNPJ</Form.Label>
            <Form.Control type="text" placeholder="Informe seu CPF / CNPJ"
              onChange={e => setClient({ ...client, cpfCnpj: e.target.value })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="rg">
            <Form.Label>RG</Form.Label>
            <Form.Control type="text" placeholder="Informe seu RG"
              onChange={e => setClient({ ...client, rg: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="bornDate">
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control type="date" placeholder="Informe sua Data de Nascimento"
              onChange={e => setClient({ ...client, bornDate: e.target.value })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="phone">
            <Form.Label>Telefone</Form.Label>
            <Form.Control type="text" placeholder="Informe seu telefone"
              onChange={e => setClient({ ...client, phone: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Informe seu email"
              onChange={e => setClient({ ...client, email: e.target.value })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" className="float-right" type="submit">
        Salvar
      </Button>
    </Form>
  );
}

export default ClientForm;
