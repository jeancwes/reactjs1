import React from 'react';
import { connect } from 'react-redux'
import { Col, Row } from 'react-bootstrap';
import PlanModal from './PlanModal';
import { getPlans } from '../store/actions/plan';

const axios = require('axios');

class PlanRow extends React.Component {
  render() {
    const plan = this.props.plan;

    return (
      <tr>
        <td># {plan.id}</td>
        <td>{plan.name}</td>
        <td>{plan.permitLegalPersonLabel()}</td>
        <td>{plan.startEffectiveDateLabel()}</td>
        <td>{plan.endEffectiveDateLabel()}</td>
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
  }

  componentDidMount() {
    this.getPlans();
  }

  getPlans() {
    axios.get('http://localhost:5000/api/plans')
      .then(function (response) {
        console.log(response);
        this.props.getPlans(response.data);
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const rows = [];

    this.props.plans.forEach((plan) => {
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
            <PlanModal />
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

function mapStateToProps(state) {
  return {
    plans: state.plans
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPlans(newPlans) {
      const action = getPlans(newPlans);
      dispatch(action);
    }
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(PlanTable);
