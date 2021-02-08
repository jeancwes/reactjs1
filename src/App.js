import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import PlanTable from './components/PlanTable';
import ClientTableFilterable from './components/ClientTableFilterable';

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
        <ClientTableFilterable />
      </Tab>
      <Tab eventKey="plans" title="Planos">
        <PlanTable />  
      </Tab>
    </Tabs>
  );
}

export default App;
