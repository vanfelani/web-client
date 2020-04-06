import {
  SAVE_STOCK_REQUEST,
  SAVE_STOCK_SUCCESS,
  SAVE_STOCK_FAILURE,
  DELETE_STOCK_REQUEST,
  DELETE_STOCK_SUCCESS,
  DELETE_STOCK_FAILURE,
  FIND_STOCK_REQUEST,
  FIND_STOCK_SUCCESS,
  FIND_STOCK_FAILURE,
  FIND_STOCKS_REQUEST,
  FIND_STOCKS_SUCCESS,
  FIND_STOCKS_FAILURE,
} from "./constants";

import { commonAxios } from "../utils/apiUtils";

function sleep(delay, value) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay, value);
  });
}

function saveStockSucces(data) {
  return { type: SAVE_STOCK_SUCCESS, data: data };
}

function saveStockFailure(error) {
  return {
    type: SAVE_STOCK_FAILURE,
    error: error,
  };
}

export const save = ({ id, item, quantity, unit } = {}) => (dispatch) => {
  dispatch({
    type: SAVE_STOCK_REQUEST,
  });
  const request = id
    ? commonAxios.put(`stocks/${id}`, {
        id,
        item: { id: item.id },
        quantity,
        unit: { id: unit.id },
      })
    : commonAxios.post("stocks", {
        item: { id: item.id },
        quantity,
        unit: { id: unit.id },
      });

  request
    .then((data) => sleep(1000, data))
    .then((data) => {
      dispatch(saveStockSucces(data));
    })
    .catch((error) => {
      dispatch(saveStockFailure(error));
    });
};

function deleteStockSucces(data) {
  return { type: DELETE_STOCK_SUCCESS, data: data };
}

function deleteStockFailure(error) {
  return {
    type: DELETE_STOCK_FAILURE,
    error: error,
  };
}

export const deleteById = (id) => (dispatch) => {
  dispatch({
    type: DELETE_STOCK_REQUEST,
  });
  commonAxios
    .delete(`stocks/${id}`)
    .then((data) => sleep(1000, data))
    .then((data) => {
      dispatch(deleteStockSucces(data));
    })
    .catch((error) => {
      dispatch(deleteStockFailure(error));
    });
};

function findStockSucces(data) {
  return { type: FIND_STOCK_SUCCESS, data: data };
}

function findStockFailure(error) {
  return {
    type: FIND_STOCK_FAILURE,
    error: error,
  };
}

export const findById = (id) => (dispatch) => {
  dispatch({
    type: FIND_STOCK_REQUEST,
  });
  commonAxios
    .get(`stocks/${id}`)
    .then((data) => sleep(1000, data))
    .then((data) => {
      dispatch(findStockSucces(data));
    })
    .catch((error) => {
      dispatch(findStockFailure(error));
    });
};

function findStocksSucces(data) {
  return { type: FIND_STOCKS_SUCCESS, data: data };
}

function findStocksFailure(error) {
  return {
    type: FIND_STOCKS_FAILURE,
    error: error,
  };
}

export const findAll = ({
  search = {},
  sort = "asc",
  page = 0,
  size = 10,
} = {}) => (dispatch) => {
  dispatch({
    type: FIND_STOCKS_REQUEST,
  });
  commonAxios
    .get("stocks", { params: { ...search, sort, page, size } })
    .then((data) => sleep(1000, data))
    .then((data) => {
      dispatch(findStocksSucces(data));
    })
    .catch((error) => {
      dispatch(findStocksFailure(error));
    });
};
