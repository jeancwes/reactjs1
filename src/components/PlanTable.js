import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PlanModal from './PlanModal';
import { format } from 'date-fns';

const axios = require('axios');

class PlanRow extends React.Component {
  render() {
    const plan = this.props.plan;

    return (
      <tr>
        <td># {plan.id}</td>
        <td>{plan.name}</td>
        <td>{plan.permitLegalPerson}</td>
        <td>{plan.startEffectiveDate}</td>
        <td>{plan.endEffectiveDate}</td>
      </tr>
    );
  }
}

class PlanTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      plans: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getPlans();
  }

  handleSubmit(e) {
    this.getPlans();
  }

  getPlans() {
    axios.get('http://localhost:5000/api/plans')
      .then(function (response) {
        console.log(response);
        const plans = response.data.map((plan) => {
          plan.startEffectiveDate = format(new Date(plan.startEffectiveDate), 'dd/MM/yyy');
          plan.endEffectiveDate = format(new Date(plan.endEffectiveDate), 'dd/MM/yyy');
          plan.permitLegalPerson = (plan.permitLegalPerson) ? 'Sim' : 'Não';
          return plan;
        });
        this.setState({
          plans: plans
        })
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const rows = [];

    this.state.plans.forEach((plan) => {
      rows.push(
        <PlanRow
          plan={plan}
          key={plan.id}
        />
      );
    });

    return (
      <>
        <Row className="my-3">
          <Col>
            <PlanModal onSubmit={this.handleSubmit} />
          </Col>
        </Row>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Permite PJ</th>
              <th>Data Início</th>
              <th>Data Fim</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </>
    );
  }
}

export default PlanTable;
