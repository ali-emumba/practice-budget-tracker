import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  CircularProgress,
} from '@mui/material';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { getUserNotifications } from './../../services/notificationServices'; // Update the path to where your getUserNotifications function is located
import { useAppSelector } from './../../app/hooks';
import { getTimeAgoFromCreatedAt } from './../../utils/utils'; // Update the path to where your getTimeAgoFromCreatedAt function is located

interface Notification {
  _id: string;
  title: string;
  message: string;
  createdAt: string;
}

const NotificationDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const accessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (anchorEl) {
      setLoading(true);
      getUserNotifications(accessToken)
        .then((data) => {
          // Sort by createdAt in descending order
          const sortedNotifications = data.sort(
            (a: Notification, b: Notification) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          // Take the first 5 notifications
          setNotifications(sortedNotifications.slice(0, 5));
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [anchorEl, accessToken]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getIcon = (message: string) => {
    if (message === 'Added Successfully') {
      return (
        <AddCircleIcon
          sx={{
            color: 'white',
            backgroundColor: '#6BB648',
            borderRadius: '50%',
            height: '25px',
          }}
        />
      );
    } else if (message === 'Updated Successfully') {
      return (
        <EditIcon
          sx={{
            color: 'white',
            backgroundColor: '#2FB6E1',
            borderRadius: '50%',
            height: '25px',
            width: '25px',
            fontSize: '5px',
          }}
        />
      );
    } else if (message === 'Deleted Successfully') {
      return (
        <CancelIcon
          sx={{
            color: 'white',
            backgroundColor: '#F04A4A',
            borderRadius: '50%',
            height: '25px',
            width: '25px',
            fontSize: '5px',
          }}
        />
      );
    }
    return null;
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={notifications.length} sx={{ color: 'red' }}>
          <NotificationsOutlinedIcon sx={{ color: 'gray' }} />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ minWidth: 300, maxWidth: 400, p: 2 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          ) : notifications.length === 0 ? (
            <Typography variant="body2">No notifications</Typography>
          ) : (
            notifications.map((notification) => (
              <MenuItem key={notification._id}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 2 }}>{getIcon(notification.message)}</Box>
                  <Box>
                    <Typography variant="subtitle2">
                      {notification.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {getTimeAgoFromCreatedAt(notification.createdAt)}
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
            ))
          )}
        </Box>
      </Menu>
    </>
  );
};

export default NotificationDropdown;
