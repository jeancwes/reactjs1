import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import ClientForm from './ClientForm';

class ClientModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleClose(e) {
    this.setState({ show: false });
  }

  handleShow(e) {
    this.setState({ show: true });
  }

  handleSubmit(e) {
    this.handleClose(e);
  }

  render() {
    return (
      <Row>
        <Col>
          <Button
            variant="primary"
            className="float-right"
            onClick={this.handleShow}
          >
            Adicionar
          </Button>
          <Modal
            show={this.state.show}
            onHide={this.handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Adicionar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ClientForm
                onSubmit={this.handleSubmit}>
              </ClientForm>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.handleClose}>
                Fechar
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    );
  }
}

export default ClientModal;