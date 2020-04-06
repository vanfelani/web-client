import React, { Component } from "react";
import { Button, TextField, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Page from "../../../components/Page";
import { save, findById } from "../../../actions/units";
import styles from "./styles.js";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { connect } from "react-redux";

class UnitPage extends Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      form: {
        id: match.params.id,
        name: "",
        description: "",
      },
      error: false,
    };
  }

  componentDidMount() {
    const { form } = this.state;
    if (form.id) {
      this.props.findById(form.id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { saveData, data, saveError, error } = this.props;

    if (prevProps.data !== data) {
      this.setState({ form: data });
    } else if (prevProps.saveError !== saveError) {
      this.setState({ error: saveError });
    } else if (prevProps.error !== error) {
      this.setState({ error: error });
    } else if (saveData && prevProps.saveData !== saveData) {
      this.props.history.goBack();
    }
  }

  onChange = (event) => {
    const { name, value } = event.target;
    const { form } = this.state;
    this.setState({ form: { ...form, [name]: value } });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.save(this.state.form);
    console.log(this.state.form);
  };

  render() {
    const { classes, loading, saveError } = this.props;
    const { form, error } = this.state;
    const errorData = saveError?.data || {};
    return (
      <Page error={error}>
        <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
          {form.id && (
            <div className={classes.formField}>
              <TextField
                id="id"
                name="id"
                label="Id"
                value={form.id}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </div>
          )}
          <div className={classes.formField}>
            <TextField
              id="name"
              name="name"
              label="Name"
              value={form.name}
              error={errorData.name}
              helperText={errorData.name ? errorData.name[0] : null}
              fullWidth
              onChange={this.onChange}
            />
          </div>
          <div className={classes.formField}>
            <TextField
              id="description"
              name="description"
              label="Description"
              value={form.description}
              error={errorData.description}
              helperText={
                errorData.description ? errorData.description[0] : null
              }
              fullWidth
              onChange={this.onChange}
            />
          </div>
          <div className={classes.formField}>
            <Button
              className={classes.formButton}
              variant="contained"
              color="primary"
              type="submit"
              startIcon={<SaveAltIcon />}
              disabled={loading}
            >
              Save
            </Button>
            <Button
              className={classes.backButton}
              variant="contained"
              color="inherit"
              href="/units"
              startIcon={<ArrowBackIcon />}
              disabled={loading}
            >
              Back
            </Button>
          </div>
        </form>
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  saveData: state.saveUnit.data,
  saveError: state.saveUnit.error,
  data: state.findUnitById.data,
  loading: state.findUnitById.loading || state.saveUnit.loading,
  error: state.findUnitById.error,
});

const mapDispatchToProps = {
  save,
  findById,
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(UnitPage)
);
