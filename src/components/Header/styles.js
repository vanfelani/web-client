import { makeStyles } from "@material-ui/core/styles";
import { DRAWER_WIDTH } from "../constants";

const styles = theme => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  title: {
    flexGrow: 1
  }
});

export default styles;
