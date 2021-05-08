import React from 'react';
import useStore from '../store';

const Dashboard = () => {
  const { userInfo } = useStore(state => state);
  return Array.isArray(userInfo.flavours) ? (
    <div>
      <h3>Your Noccoflavours</h3>
      {userInfo.flavours.map(noccoFlavor => {
        return <div>{noccoFlavor}</div>;
      })}
      <br />
    </div>
  ) : null;
};

export default Dashboard;
