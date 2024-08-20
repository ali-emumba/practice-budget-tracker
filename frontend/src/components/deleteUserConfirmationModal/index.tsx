import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

interface DeleteUserConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  user: {
    firstname?: string;
    lastname?: string;
    email?: string;
    phoneNumber?: string;
    budgetLimit?: number;
  };
}

const DeleteUserConfirmationModal: React.FC<
  DeleteUserConfirmationModalProps
> = ({ open, onClose, onConfirm, title, user }) => {
  return (
    <Dialog open={open} onClose={onClose} sx={{ minHeight: '400px', p: 4 }}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ maxWidth: '460px', minWidth: '345px' }}>
        <Box>
          {/* Line 1 */}
          <Box sx={{ display: 'flex', mb: 1 }}>
            <Typography
              variant="body1"
              sx={{ fontSize: 14, fontWeight: 'bold', flex: 1 }}
            >
              First Name
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: 14, fontWeight: 'bold', flex: 1 }}
            >
              Last Name
            </Typography>
          </Box>
          {/* Line 2 */}
          <Box sx={{ display: 'flex', mb: 1 }}>
            <Typography
              variant="body2"
              sx={{ fontSize: 14, color: 'text.secondary', flex: 1 }}
            >
              {user.firstname}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: 14, color: 'text.secondary', flex: 1 }}
            >
              {user.lastname}
            </Typography>
          </Box>
          {/* Line 3 */}
          <Typography
            variant="body1"
            sx={{ fontSize: 14, fontWeight: 'bold', mb: 1 }}
          >
            Email
          </Typography>
          {/* Line 4 */}
          <Typography
            variant="body2"
            sx={{ fontSize: 14, color: 'text.secondary', mb: 2 }}
          >
            {user.email}
          </Typography>
          {/* Line 5 */}
          <Box sx={{ display: 'flex', mb: 1 }}>
            <Typography
              variant="body1"
              sx={{ fontSize: 14, fontWeight: 'bold', flex: 1 }}
            >
              Phone Number
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: 14, fontWeight: 'bold', flex: 1 }}
            >
              Budget Limit
            </Typography>
          </Box>
          {/* Line 6 */}
          <Box sx={{ display: 'flex' }}>
            <Typography
              variant="body2"
              sx={{ fontSize: 14, color: 'text.secondary', flex: 1 }}
            >
              {user.phoneNumber || '-'}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: 14, color: 'text.secondary', flex: 1 }}
            >
              {user.budgetLimit}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, display: 'flex', gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            flex: 1,
            borderColor: 'lightGray',
            color: 'gray',
            '&:hover': {
              borderColor: 'gray',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            flex: 1,
            backgroundColor: '#EF4435',
            color: 'white',
            '&:hover': {
              backgroundColor: '#D63027',
            },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserConfirmationModal;
