import React from 'react';
import useStore from '../store';

const Dashboard = () => {
  const { userInfo } = useStore(state => state);
  if (!Array.isArray(userInfo.flavours)) return null;

  const uniqueFlavours = Array.from(new Set(userInfo.flavours));
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Flavor</TableCell>
          <TableCell>Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {uniqueFlavours.map(noccoFlavor => {
          return (
            <TableRow key={noccoFlavor}>
              <TableCell>{noccoFlavor}</TableCell>
              <TableCell>
                {userInfo.flavours.filter(x => x === noccoFlavor).length}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default Dashboard;
