import React from 'react';
import { connect } from 'react-redux'
import { Button, Col, Row } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';

import { postPlan } from '../store/actions/plan';
import Plan, { planValidationSchema, planInitialValues } from '../models/plan'
import { DatePickerField } from './DatePickerField'

const axios = require('axios');

function PlanForm(props) {
  const handleSubmit = (values) => {
    axios.post('http://localhost:5000/api/plans', new Plan(values))
      .then(function (response) {
        console.log(response);
        props.postPlan(response.data);
        props.onSubmit();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <Formik
        initialValues={planInitialValues}
        validationSchema={planValidationSchema}
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
                <label className="mt-4">
                  <Field
                    name="permitLegalPerson"
                    type="checkbox"
                  />
                  Permite pessoa jurídica?
                </label>
                {errors.permitLegalPerson && touched.permitLegalPerson ? (
                  <div className="text-danger"><small>{errors.permitLegalPerson}</small></div>
                ) : null}
              </Col>
              <Col md={6}>
                <label htmlFor="startEffectiveDate">Data de Início</label>
                <DatePickerField
                  name="startEffectiveDate"
                  value={values.startEffectiveDate}
                  onChange={setFieldValue}
                />
                {errors.startEffectiveDate && touched.startEffectiveDate ? (
                  <div className="text-danger"><small>{errors.startEffectiveDate}</small></div>
                ) : null}
              </Col>
              <Col md={6}>
                <label htmlFor="endEffectiveDate">Data de Fim</label>
                <DatePickerField
                  name="endEffectiveDate"
                  value={values.endEffectiveDate}
                  onChange={setFieldValue}
                />
                {errors.endEffectiveDate && touched.endEffectiveDate ? (
                  <div className="text-danger"><small>{errors.endEffectiveDate}</small></div>
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
    plans: state.plans
  }
}

function mapDispatchToProps(dispatch) {
  return {
    postPlan(newPlan) {
      const action = postPlan(newPlan);
      dispatch(action);
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanForm);
