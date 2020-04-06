import React, { Component } from "react";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import { withStyles, CircularProgress, Button } from "@material-ui/core";
import Page from "../../components/Page";
import MUIDataTable from "mui-datatables";
import styles from "./styles";
import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from "@material-ui/icons/Refresh";
import { deleteById, findAll } from "../../actions/units";
import { connect } from "react-redux";

class UnitsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // data: []
      params: {
        data: [],
        total: 0,
        search: { name: "" },
        page: 0,
        size: 2
      },
      error: null
    };
  }

  componentDidMount() {
    this.reload();
  }

  reload() {
    this.props.findAll(this.state.params);
  }

  onReload = () => {
    this.reload();
  };

  componentDidUpdate(prevProps, prevState) {
    const { deleteData, deleteError, error, data } = this.props;
    const { params } = this.state;

    if (prevProps.data !== data) {
      this.setState({ data: data.list, total: data.total });
    }
    if (prevState.params !== params || prevProps.deleteData !== deleteData) {
      this.reload();
    } else if (deleteError && prevProps.deleteError !== deleteError) {
      this.setState({ error: deleteError });
    } else if (error && prevProps.error !== error) {
      this.setState({ error: error });
    }
  }

  onAdd = () => {
    this.props.history.push(`/units/add`);
  };

  onRowsDelete = rowsDeleted => {
    const { list } = this.props.data;
    const e = list[rowsDeleted.data[0].index];
    this.props.deleteById(e.id);
    return false;
  };

  onRowClick = rowData => {
    this.props.history.push(`/units/${rowData[0]}`);
  };

  onChangeRowsPerPage = numberofRows => {
    const { params } = this.state;
    this.setState({ params: { ...params, size: numberofRows } });
  };

  onChangePage = currentPage => {
    const { params } = this.state;
    this.setState({ params: { ...params, page: currentPage } });
  };

  onSearchChange = SearchText => {
    const { params } = this.state;
    this.setState({ params: { ...params, search: { name: SearchText } } });
  };

  onColumnSortChange = (changedColumn, direction) => {
    const { params } = this.state;
    const sort = direction == "descending" ? "desc" : "asc";
    this.setState({ params: { ...params, sort } });
  };

  render() {
    const { classes, loading } = this.props;
    const { params, data, total, error } = this.state;
    const columns = [
      {
        name: "id",
        label: "Id",
        options: {
          sortDirection: params.sort
        }
      },
      {
        name: "name",
        label: "Name",
        options: {
          sort: false
        }
      },

      {
        name: "description",
        label: "Description",
        options: {
          sort: false
        }
      }
    ];

    return (
      <Page error={error}>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.onAdd}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </div>
        <MUIDataTable
          title={"Unit List"}
          data={!loading ? data : []}
          columns={columns}
          options={{
            searchText: params.search.name,
            page: params.page,
            filter: false,
            count: total,
            rowsPerPage: params.size,
            rowsPerPageOptions: [2, 10, 15, 100],
            onRowsDelete: this.onRowsDelete,
            onRowClick: this.onRowClick,
            onChangePage: this.onChangePage,
            onChangeRowsPerPage: this.onChangeRowsPerPage,
            serverSide: true,
            onSearchChange: this.onSearchChange,
            onColumnSortChange: this.onColumnSortChange,
            selectableRows: "single",
            textLabels: {
              body: {
                noMatch: loading ? (
                  <CircularProgress />
                ) : (
                  "Sorry, no matching records found"
                )
              }
            }
          }}
        />
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.onReload}
            startIcon={<RefreshIcon />}
            disabled={loading}
          >
            Reload
          </Button>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  deleteData: state.deleteUnitById.data,
  deleteError: state.deleteUnitById.error,

  data: state.findUnits.data,
  loading: state.findUnits.loading || state.deleteUnitById.loading,
  error: state.findUnits.error
});

const mapDispatchToProps = {
  deleteById,
  findAll
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(UnitsPage)
);
