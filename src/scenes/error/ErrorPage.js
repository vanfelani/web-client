import React, { Component } from "react";
import { Typography, withStyles, CssBaseline } from "@material-ui/core";
import Page from "../../components/Page";
import styles from "./styles";

class ItemsPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Page>
        <Typography paragraph>Error {this.props.code} </Typography>
      </Page>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ItemsPage);
