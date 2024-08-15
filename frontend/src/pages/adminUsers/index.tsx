import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import {
  deleteUser as deleteUserFromBackend,
  getAllUsers,
  updateUser,
} from './../../services/adminServices';
import Pagination from './../../components/pagination';
import UserTable from './../../components/userTable';
import UserTableFilterSection from './../../components/userTableFilterSection';
import { useAppDispatch, useAppSelector } from './../../app/hooks';
import {
  deleteUser,
  editUser,
  setUsers,
} from './../../features/users/usersSlice';
import { User } from './../../features/users/usersSlice';
import UpdateUserModal from './../../components/updateUserModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminUsers: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [filter, setFilter] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('name-asc');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);

  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const users = useAppSelector((state) => state.users.users);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedUsers = await getAllUsers(accessToken);
        dispatch(setUsers(fetchedUsers));
      } catch (err: any) {
        setError(err.message);
        toast.error('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [accessToken, dispatch]);

  const handleDelete = async (user: User) => {
    try {
      setError(null);
      setLoading(true);
      await deleteUserFromBackend(user._id, accessToken);
      dispatch(deleteUser(user._id));
      toast.success('User deleted successfully');
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      setError(null);
      setLoading(true);
      await updateUser(updatedUser._id, updatedUser, accessToken);
      dispatch(editUser(updatedUser));
      toast.success('User updated successfully');
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  const onUpdateUserClick = (user: User) => {
    setSelectedUser(user);
    setUpdateModalOpen(true);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers =
    users &&
    users.filter((user) => {
      return (
        user.firstname.toLowerCase().includes(filter.toLowerCase()) ||
        user.lastname.toLowerCase().includes(filter.toLowerCase())
      );
    });

  const sortedUsers = filteredUsers.sort((a, b) => {
    const fullNameA = `${a.firstname} ${a.lastname}`.toLowerCase();
    const fullNameB = `${b.firstname} ${b.lastname}`.toLowerCase();

    if (sortOrder === 'name-asc') {
      return fullNameA.localeCompare(fullNameB);
    } else if (sortOrder === 'name-desc') {
      return fullNameB.localeCompare(fullNameA);
    }
    return 0;
  });

  const paginatedUsers = sortedUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ p: 1, backgroundColor: '#ECF1F2' }}>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && (
        <>
          <UserTableFilterSection
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            filter={filter}
            setFilter={setFilter}
          />
          <UserTable
            users={paginatedUsers}
            handleDelete={handleDelete}
            setSelectedUser={onUpdateUserClick}
          />
          <Pagination
            count={filteredUsers.length}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <UpdateUserModal
            open={updateModalOpen}
            onClose={() => setUpdateModalOpen(false)}
            onUpdateUser={handleUpdateUser}
            initialUser={selectedUser}
          />
        </>
      )}
    </Box>
  );
};

export default AdminUsers;
