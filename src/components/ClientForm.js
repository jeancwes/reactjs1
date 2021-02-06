import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

class ClientForm extends React.Component {
  render() {
    return (
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="Informe seu nome" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="cpfCnpj">
              <Form.Label>CPF / CNPJ</Form.Label>
              <Form.Control type="text" placeholder="Informe seu CPF / CNPJ" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="rg">
              <Form.Label>RG</Form.Label>
              <Form.Control type="text" placeholder="Informe seu RG" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="bornDate">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control type="date" placeholder="Informe sua Data de Nascimento" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="phone">
              <Form.Label>Telefone</Form.Label>
              <Form.Control type="text" placeholder="Informe seu telefone" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Informe seu email" />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" className="float-right" type="submit">
          Salvar
        </Button>
      </Form>
    );
  }
}

export default ClientForm;
