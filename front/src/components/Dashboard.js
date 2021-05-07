import React from 'react';
import Analytics from './Analytics';
import Inventory from './Inventory';

function Dashboard(props) {
  return (
    <>
        <Analytics inventory={props.inventory}/>
        <Inventory
            collectedData={props.collectedData}
            inventory={props.inventory}
        />
    </>
  );
}

export default Dashboard;