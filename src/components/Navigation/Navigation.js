import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import {
  Home as homeIcon,
  LocalOffer as itemIcon,
  Speed as unitIcon,
  Storage as stockIcon,
} from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

const menus = [
  {
    path: "/",
    icon: homeIcon,
    label: "Home",
  },
  {
    path: "/stocks",
    icon: stockIcon,
    label: "Stocks",
  },
  {
    path: "/items",
    icon: itemIcon,
    label: "Item",
  },
  {
    path: "/units",
    icon: unitIcon,
    label: "Units",
  },
];

class Navigation extends Component {
  render() {
    const { classes, theme, mobileOpen, handleDrawerToggle } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {menus.map((menu, index) => (
            <Link to={menu.path} key={index}>
              <ListItem button>
                <ListItemIcon>
                  <menu.icon />
                </ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </div>
    );

    return (
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    );
  }
}

Navigation.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};
export default withStyles(styles, { withTheme: true })(Navigation);
