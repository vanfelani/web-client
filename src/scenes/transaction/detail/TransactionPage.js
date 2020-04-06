import React, { Component } from "react";
import { Button, TextField, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Page from "../../../components/Page";
import { save, findById } from "../../../actions/transactions";
import styles from "./styles.js";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { connect } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";

const typeList = [
  {
    id: 0,
    desc: "IN",
  },
  {
    id: 1,
    desc: "OUT",
  },
];

class TransactionPage extends Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      form: {
        id: match.params.id,
        amount: "",
        type: "",
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

  onTypeChange = (event, value) => {
    const { form } = this.state;

    this.setState({ form: { ...form, type: value.id } });
  };

  onClick = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push("/transactions");
  };

  // onTypeOpen = (event) => {
  //   this.props.typeList.desc;
  // };

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
              id="amount"
              name="amount"
              label="Amount"
              value={form.amount}
              error={errorData.amount}
              helperText={errorData.amount ? errorData.amount[0] : null}
              fullWidth
              onChange={this.onChange}
            />
          </div>
          <div className={classes.formField}>
            <Autocomplete
              id="combo-box-demo"
              options={typeList}
              value={typeList[form.type] || form.type}
              onChange={this.onTypeChange}
              onOpen={typeList.desc}
              getOptionLabel={(option) => option.desc}
              getOptionSelected={(option, value) => option.id === value.id}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Type" variant="outlined" />
              )}
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
              onClick={this.onClick}
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
  saveData: state.saveTransaction.data,
  saveError: state.saveTransaction.error,
  data: state.findTransactionById.data,
  loading: state.findTransactionById.loading || state.saveTransaction.loading,
  error: state.findTransactionById.error,
});

const mapDispatchToProps = {
  save,
  findById,
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(TransactionPage)
);
