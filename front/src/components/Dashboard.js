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
  return (
    userInfo.flavors && (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Flavor</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userInfo.flavors.map(noccoFlavor => {
            return (
              <TableRow>
                <TableCell>{noccoFlavor.flavor}</TableCell>
                <TableCell>{noccoFlavor.amount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    )
  );
};

export default Dashboard;
