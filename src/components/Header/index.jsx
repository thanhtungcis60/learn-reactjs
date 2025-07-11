// import React from 'react';
// import PropTypes from 'prop-types';
// import './style.scss';

// Header.propTypes = {

// };

// function Header(props) {
//     return (
//         <div>

//         </div>
//     );
// }

// export default Header;

import { Dialog, DialogActions, DialogContent, DialogContentText, Icon, IconButton } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close } from '@material-ui/icons';
import CodeIcon from '@material-ui/icons/Code';
import { hover } from '@testing-library/user-event/dist/hover';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { use, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
  },
  closeButton: {
    position: 'absolute',// Đặt vị trí tuyệt đối để nút đóng nằm trên dialog
    top: theme.spacing(1),// Đặt khoảng cách từ trên xuống
    right: theme.spacing(1),// Đặt khoảng cách từ bên phải
    color: theme.palette.grey[500],
    zIndex: 1,// Đặt zIndex để nút đóng nằm trên dialog
  },
}));

const MODE = {
  REGISTER: 'R',
  LOGIN: 'L',
}
export default function Header() {
  const loggedInUser = useSelector((state) => state.user.current);// Lấy thông tin người dùng đã đăng nhập từ Redux store
  const isLoggedIn = !!loggedInUser.id; // Kiểm tra xem người dùng đã đăng nhập hay chưa
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    // Nếu reason là 'backdropClick', 'escapeKeyDown', không làm gì cả (không đóng Dialog)
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      return;
    }
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <CodeIcon className={classes.menuButton} />
            <Typography variant="h6" className={classes.title}>
              <Link className={classes.link} to="/">EZ Shop</Link>
            </Typography>
            <NavLink className={classes.link} to="/todos"><Button color="inherit">Todos</Button></NavLink>
            <NavLink className={classes.link} to="/albums"><Button color="inherit">Albums</Button></NavLink>
            {!isLoggedIn && (
              <Button color="inherit" onClick={handleClickOpen}>Login or Regeister</Button>
            )}
            {isLoggedIn && (
              <IconButton color='inherit'>
                <AccountCircle />
              </IconButton>
            )}

          </Toolbar>
        </AppBar>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <Close />
        </IconButton>
        <DialogContent>
          <DialogContentText>
            {mode === MODE.REGISTER && (
              <>
                <Register closeDialog={handleClose} />
                <Box textAlign="center">
                  <Button color='primary' onClick={() => setMode(MODE.LOGIN)}>Already have an account.Login here.</Button>
                </Box>
              </>
            )}

            {mode === MODE.LOGIN && (
              <>
                <Login closeDialog={handleClose} />
                <Box textAlign="center">
                  <Button color='primary' onClick={() => setMode(MODE.REGISTER)}>Do not have an account.Register here.</Button>
                </Box>
              </>
            )}
          </DialogContentText>
        </DialogContent>

        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
