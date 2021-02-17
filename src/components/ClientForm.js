import React from 'react';
import { connect } from 'react-redux'
import { Button, Col, Row } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';

import { postClient } from '../store/actions/client';
import Client, { clientValidationSchema, clientInitialValues } from '../models/client'
import { DatePickerField } from './DatePickerField'

const axios = require('axios');

function ClientForm(props) {

  const handleSubmit = (values) => {
    axios.post('http://localhost:5000/api/clients', new Client(values))
      .then(function (response) {
        console.log(response);
        props.postClient(response.data);
        props.onSubmit();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <Formik
        initialValues={clientInitialValues}
        validationSchema={clientValidationSchema}
        isInitialValid={false}
        onSubmit={(values, actions) => {
          console.log(values);
          console.log(actions);
          handleSubmit(values);
        }}
      >
        {({ errors, touched, values, setFieldValue, isValid }) => (
          <Form>
            <Row>
              <Col md={6}>
                <label htmlFor="name">Nome</label>
                <Field name="name" className="form-control" />
                {errors.name && touched.name ? (
                  <div className="text-danger"><small>{errors.name}</small></div>
                ) : null}
              </Col>
              <Col md={6}>
                <label htmlFor="cpfCnpj">CPF / CNPJ</label>
                <Field name="cpfCnpj" className="form-control" />
                {errors.cpfCnpj && touched.cpfCnpj ? (
                  <div className="text-danger"><small>{errors.cpfCnpj}</small></div>
                ) : null}
              </Col>
              {values.cpfCnpj.length <= 11 ? (
                <>
                  <Col md={6}>
                    <label htmlFor="rg">RG</label>
                    <Field name="rg" className="form-control" />
                    {errors.rg && touched.rg ? (
                      <div className="text-danger"><small>{errors.rg}</small></div>
                    ) : null}
                  </Col>
                  <Col md={6}>
                    <label htmlFor="bornDate">Data de Nascimento</label>
                    <DatePickerField
                      name="bornDate"
                      value={values.bornDate}
                      onChange={setFieldValue}
                    />
                    {errors.bornDate && touched.bornDate ? (
                      <div className="text-danger"><small>{errors.bornDate}</small></div>
                    ) : null}
                  </Col>
                </>
              ) : null}
              <Col md={6}>
                <label htmlFor="email">Email</label>
                <Field name="email" className="form-control" />
                {errors.email && touched.email ? (
                  <div className="text-danger"><small>{errors.email}</small></div>
                ) : null}
              </Col>
              <Col md={6}>
                <label htmlFor="phone">Telefone</label>
                <Field name="phone" className="form-control" />
                {errors.phone && touched.phone ? (
                  <div className="text-danger"><small>{errors.phone}</small></div>
                ) : null}
              </Col>
              <Col md={6}>
                <label htmlFor="plans">Planos</label>
                <Field
                  name="plans"
                  className="form-control"
                  as="select"
                  multiple="multiple">
                  {props.plans &&
                    props.plans.map((element) => (
                      <>
                        {(element.isEndEffectiveDateValid()) && 
                        (element.permitLegalPerson || values.cpfCnpj.length <= 11) ?
                          (<option key={element.id} value={element.id}>
                            {element.name} (Permite PJ: {element.permitLegalPersonLabel()})
                          </option>
                        ) : null}
                      </>
                    ))}
                </Field>
                {errors.plans && touched.plans ? (
                  <div className="text-danger"><small>{errors.plans}</small></div>
                ) : null}
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={12}>
                <Button variant="primary" className="float-right" type="submit"
                  disabled={!isValid}>
                  Salvar
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
}

function mapStateToProps(state) {
  return {
    clients: state.clients,
    plans: state.plans
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
