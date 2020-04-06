import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export default styles;
