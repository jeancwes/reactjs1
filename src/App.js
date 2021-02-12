import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import PlanTable from './components/PlanTable';
import ClientTableFilterable from './components/ClientTableFilterable';

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
