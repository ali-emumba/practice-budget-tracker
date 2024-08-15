import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { User } from './../../features/users/usersSlice'; // Assuming user data is in authSlice

interface UserTableProps {
  users: User[];
  handleDelete: (user: User) => void;
  setSelectedUser?: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  setSelectedUser,
  handleDelete,
}) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        overflowX: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        boxShadow: 1,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>First Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Last Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.firstname}</TableCell>
              <TableCell>{user.lastname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => {
                    setSelectedUser!(user);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(user)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
