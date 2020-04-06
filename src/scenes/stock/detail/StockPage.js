import React, { Component } from "react";
import { Button, TextField, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Page from "../../../components/Page";
import { save, findById } from "../../../actions/stocks";
import { findAll as findItems } from "../../../actions/items";
import { findAll as findUnits } from "../../../actions/units";
import styles from "./styles.js";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { connect } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";

class StockPage extends Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      form: {
        id: match.params.id,
        item: null,
        quantity: 0,
        unit: null,
      },
      itemOptions: [],
      unitOptions: [],
      error: null,
    };
  }

  componentDidMount() {
    const { form } = this.state;
    if (form.id) {
      this.props.findById(form.id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      saveData,
      data,
      saveError,
      error,
      itemsData,
      unitsData,
    } = this.props;

    if (prevProps.itemsData !== itemsData) {
      this.setState({ itemOptions: itemsData.list });
    } else if (prevProps.unitsData !== unitsData) {
      this.setState({ unitsOptions: unitsData.list });
    } else if (prevProps.data !== data) {
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

  onItemChange = (event, value) => {
    const { form } = this.state;
    this.setState({ form: { ...form, item: value } });
  };

  onItemTextChange = (event) => {
    const { value } = event.target;
    if (value) {
      this.props.findItems({ search: { name: value } });
    }
  };

  onUnitChange = (event, value) => {
    const { form } = this.state;
    this.setState({ form: { ...form, unit: value } });
  };

  onUnitTextChange = (event) => {
    const { value } = event.target;
    if (value) {
      this.props.findUnits({ search: { name: value } });
    }
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.save(this.state.form);
    console.log(this.state.form);
  };

  onItemOpen = (event) => {
    this.props.findItems();
  };

  onUnitOpen = (event) => {
    this.props.findUnits();
  };

  render() {
    const {
      classes,
      itemsLoading,
      itemsData,
      loading,
      saveError,
      unitsLoading,
      unitsData,
    } = this.props;
    const { form, error } = this.state;
    const itemOptions = !itemsLoading && itemsData ? itemsData.list : [];
    const unitOptions = !unitsLoading && unitsData ? unitsData.list : [];
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
            <Autocomplete
              id="combo-box-demo"
              options={itemOptions}
              autoHighlight
              value={form.item}
              onChange={this.onItemChange}
              loading={itemsLoading}
              onOpen={this.onItemOpen}
              getOptionLabel={(option) => option?.name}
              getOptionSelected={(option, value) => option.id == value.id}
              className={classes.select}
              renderInput={(params) => (
                <TextField {...params} label="Item" variant="outlined" />
              )}
            />
          </div>

          <div className={classes.formField}>
            <Autocomplete
              id="combo-box-demo"
              options={unitOptions}
              autoHighlight
              value={form.unit}
              onChange={this.onUnitChange}
              loading={unitsLoading}
              onOpen={this.onUnitOpen}
              getOptionLabel={(option) => option?.name}
              getOptionSelected={(option, value) => option.id == value.id}
              className={classes.select}
              renderInput={(params) => (
                <TextField {...params} label="Unit" variant="outlined" />
              )}
            />
          </div>

          <div className={classes.formField}>
            <TextField
              id="quantity"
              name="quantity"
              label="Quantity"
              value={form.quantity}
              error={errorData.quantity}
              helperText={errorData.quantity ? errorData.quantity[0] : null}
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
              href="/stocks"
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
  itemsData: state.findItems.data,
  itemsLoading: state.findItems.loading,
  itemsError: state.findItems.error,

  unitsData: state.findUnits.data,
  unitsLoading: state.findUnits.loading,
  unitsError: state.findUnits.error,

  saveData: state.saveStock.data,
  saveError: state.saveStock.error,
  data: state.findStockById.data,
  loading: state.findStockById.loading || state.saveStock.loading,
  error: state.findStockById.error,
});

const mapDispatchToProps = {
  save,
  findById,
  findItems,
  findUnits,
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(StockPage)
);
