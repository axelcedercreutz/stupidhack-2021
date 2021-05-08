import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import useStore from '../store';

const Dashboard = () => {
  const { userInfo } = useStore(state => state);
  console.log(userInfo);
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
