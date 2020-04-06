import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import styles from "./styles.js";

class Header extends Component {
  render() {
    const { classes, onMenuClick } = this.props;

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            id="menu-button"
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Web Application
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  onMenuClick: PropTypes.func
};

export default withStyles(styles, { withTheme: true })(Header);
