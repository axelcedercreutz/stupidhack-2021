import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';

const Dashboard = props => {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Flavor</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.noccoFlavors.map(noccoFlavor => {
            return (
              <TableRow>
                <TableCell>{noccoFlavor.flavor}</TableCell>
                <TableCell>{noccoFlavor.amount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default Dashboard;
