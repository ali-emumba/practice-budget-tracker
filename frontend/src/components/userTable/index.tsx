import React, { useState } from 'react';
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
import DeleteUserConfirmationModal from './../../components/deleteUserConfirmationModal'; // Import the modal
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleOpenDeleteModal = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      handleDelete(userToDelete);
      handleCloseDeleteModal();
    }
  };

  return (
    <>
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
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  textAlign: 'right', // Right-align the icons column
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell
                  sx={{
                    textAlign: 'right', // Right-align the icons
                    '& .MuiIconButton-root': {
                      transition: 'none', // Remove default hover animation
                      '&:hover': {
                        backgroundColor: 'transparent', // Remove hover effect
                      },
                    },
                  }}
                >
                  <IconButton
                    onClick={() => handleOpenDeleteModal(user)}
                    sx={{ p: 0 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="39"
                      height="19"
                      viewBox="0 0 9 19"
                      fill="none"
                    >
                      <path
                        d="M1 4.7947H2.59454M2.59454 4.7947H15.3509M2.59454 4.7947V15.9565C2.59454 16.3794 2.76253 16.7849 3.06157 17.084C3.3606 17.383 3.76618 17.551 4.18908 17.551H12.1618C12.5847 17.551 12.9902 17.383 13.2893 17.084C13.5883 16.7849 13.7563 16.3794 13.7563 15.9565V4.7947H2.59454ZM4.98635 4.7947V3.20016C4.98635 2.77726 5.15434 2.37168 5.45338 2.07265C5.75241 1.77362 6.15799 1.60562 6.58089 1.60562H9.76996C10.1929 1.60562 10.5984 1.77362 10.8975 2.07265C11.1965 2.37168 11.3645 2.77726 11.3645 3.20016V4.7947M6.58089 8.78105V13.5647M9.76996 8.78105V13.5647"
                        stroke="#FF5771"
                        strokeWidth="1.43509"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setSelectedUser!(user);
                    }}
                    sx={{ p: 0 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="59"
                      height="19"
                      viewBox="0 0 59 19"
                      fill="none"
                    >
                      <path
                        d="M53.7579 2.40813C53.9673 2.19873 54.2159 2.03263 54.4895 1.9193C54.763 1.80598 55.0563 1.74765 55.3524 1.74765C55.6485 1.74765 55.9418 1.80598 56.2154 1.9193C56.489 2.03263 56.7376 2.19873 56.9469 2.40813C57.1563 2.61753 57.3225 2.86612 57.4358 3.13971C57.5491 3.4133 57.6074 3.70654 57.6074 4.00267C57.6074 4.2988 57.5491 4.59204 57.4358 4.86563C57.3225 5.13922 57.1563 5.38781 56.9469 5.59721L46.1838 16.3603L41.7988 17.5562L42.9947 13.1713L53.7579 2.40813Z"
                        stroke="#7539FF"
                        strokeWidth="1.43509"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Modal */}
      <DeleteUserConfirmationModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDeleteUser}
        title="Confirm User Deletion"
        user={{
          firstname: userToDelete?.firstname,
          lastname: userToDelete?.lastname,
          email: userToDelete?.email,
          phoneNumber: userToDelete?.phone,
          budgetLimit: userToDelete?.budget,
        }}
      />
    </>
  );
};

export default UserTable;
