import { makeStyles } from "@material-ui/core/styles";
import { DRAWER_WIDTH } from "../constants";

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
});

export default styles;
