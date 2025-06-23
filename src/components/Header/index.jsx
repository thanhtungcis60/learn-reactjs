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

import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import CodeIcon from '@material-ui/icons/Code';

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
}));


export default function Header() {
    const classes = useStyles();
  return (
    <div className={classes.root}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <CodeIcon className={classes.menuButton}/>
          <Typography variant="h6" className={classes.title}>
            EZ Shop
          </Typography>
          <Button color="inherit">Todos</Button>
          <Button color="inherit">Albums</Button>
          <Button color="inherit">Regeister</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  );
}
