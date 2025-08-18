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

import { Avatar, Badge, Dialog, DialogActions, DialogContent, DialogContentText, Divider, Icon, IconButton, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close, Settings, ShoppingCart } from '@material-ui/icons';
import CodeIcon from '@material-ui/icons/Code';
import { hover } from '@testing-library/user-event/dist/hover';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { logout } from 'features/Auth/userSlice';
import { cartItemsCountSelector } from 'features/Cart/selector';
import { use, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

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
  const dispatch = useDispatch(); // Sử dụng useDispatch để lấy hàm dispatch từ Redux store
  const loggedInUser = useSelector((state) => state.user.current);// Lấy thông tin người dùng đã đăng nhập từ Redux store
  const isLoggedIn = !!loggedInUser.id; // Kiểm tra xem người dùng đã đăng nhập hay chưa
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);
  const cartItemsCount = useSelector(cartItemsCountSelector);
  const history = useHistory();

  const handleClickMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

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

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action); // Gọi action logout để đăng xuất người dùng
  };

  const handleCartClick = () => {
    history.push('/cart');
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
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleCartClick}
            >
              <Badge badgeContent={cartItemsCount} color='secondary'>
                <ShoppingCart />
              </Badge>
            </IconButton>

            {isLoggedIn && (
              <IconButton color='inherit' onClick={handleClickMenu}>
                <AccountCircle />
              </IconButton>
            )}

          </Toolbar>
        </AppBar>
      </Box>

      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)} // Đảm bảo open là boolean, true nếu anchorEl có giá trị
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null} // Đặt null để không sử dụng content anchor, tránh lỗi trong các phiên bản MUI mới hơn
      // getPaperAnchorEl // Có thể là getContentAnchorEl như trong ảnh, tùy thuộc vào phiên bản MUI
      // getcontentAnchorEl // Prop này có thể không còn được sử dụng trong các phiên bản MUI mới hơn hoặc có tên khác.
      // Nếu bạn gặp lỗi, hãy kiểm tra tài liệu MUI cho phiên bản của bạn.
      >
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

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
