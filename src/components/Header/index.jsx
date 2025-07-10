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

import { Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CodeIcon from '@material-ui/icons/Code';
import Register from 'features/Auth/components/Register';
import { useState } from 'react';
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
  }
}));


export default function Header() {
  const [open, setOpen] = useState(false);

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
            <Button color="inherit" onClick={handleClickOpen}>Regeister</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            <Register closeDialog={handleClose}></Register>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
