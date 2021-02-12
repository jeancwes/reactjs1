import React, { useState } from 'react';
import { connect } from 'react-redux'
// import { Button, Col, Form, Row } from 'react-bootstrap';
import { Button, Col, Form, Row } from 'react-bootstrap';
// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
import { postClient } from '../store/actions/client';

const axios = require('axios');

// const SignupSchema = Yup.object().shape({
//   name: Yup.string()
//     .min(2, 'Too Short!')
//     .max(50, 'Too Long!')
//     .required('Required'),
//   cpfCnpj: Yup.string()
//     .min(2, 'Too Short!')
//     .max(50, 'Too Long!')
//     .required('Required'),
//   email: Yup.string().email('Invalid email').required('Required'),
// });

function ClientForm(props) {

  const [client, setClient] = useState(props.client);

  const handleSubmit = (e) => {
    e.preventDefault();

    client.plans = [{ planId: 1 }];

    axios.post('http://localhost:5000/api/clients', client)
      .then(function (response) {
        console.log(response);
        props.postClient(response.data);
        props.onSubmit(e);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    // <>
    //   <Formik
    //    validationSchema={SignupSchema}
    //    onSubmit={handleSubmit}
    //  >
    //    {({ errors, touched }) => (
    //      <Form>
    //         <Row>
    //           <Col>
    //             <label htmlFor="name">Nome</label>
    //             <Field name="name" className="form-control" />
    //             {errors.name && touched.name ? (
    //               <div>{errors.name}</div>
    //             ) : null}
    //           </Col>
    //           <Col>
    //             <label htmlFor="cpfCnpj">CPF / CNPJ</label>
    //             <Field name="cpfCnpj" className="form-control" />
    //             {errors.cpfCnpj && touched.cpfCnpj ? (
    //               <div>{errors.cpfCnpj}</div>
    //             ) : null}
    //           </Col>
    //         </Row>
    //        <Field name="email" type="email" />
    //        {errors.email && touched.email ? <div>{errors.email}</div> : null}
    //        <Button variant="primary" className="float-right" type="submit">
    //         Salvar
    //        </Button>
    //      </Form>
    //    )}
    //  </Formik>
    // </>
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

function mapStateToProps(state) {
  return {
    clients: state.clients
  }
}

function mapDispatchToProps(dispatch) {
  return {
    postClient(newClient) {
      const action = postClient(newClient);
      dispatch(action);
    }
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ClientForm);
