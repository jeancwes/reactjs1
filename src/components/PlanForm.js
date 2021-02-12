import React, { useState } from 'react';
import { connect } from 'react-redux'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { postPlan } from '../store/actions/plan';
const axios = require('axios');

function PlanForm(props) {
  const [plan, setPlan] = useState(props.plan)

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:5000/api/plans', plan)
      .then(function (response) {
        console.log(response);
        props.postPlan(response.data);
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
            <Form.Control type="text" placeholder="Informe o nome do plano"
              onChange={e => setPlan({ ...plan, name: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mt-4" controlId="permitLegalPerson">
            <Form.Check label="Permite pessoa jurídica?" 
              type="checkbox" id="permitLegalPerson" 
              onChange={e => setPlan({ ...plan, permitLegalPerson: !plan.permitLegalPerson })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="startEffectiveDate">
            <Form.Label>Data de Início</Form.Label>
            <Form.Control type="date" placeholder="Informe a Data de Início"
              onChange={e => setPlan({ ...plan, startEffectiveDate: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="endEffectiveDate">
            <Form.Label>Data de Fim</Form.Label>
            <Form.Control type="date" placeholder="Informe a Data de Fim"
              onChange={e => setPlan({ ...plan, endEffectiveDate: e.target.value })}
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
