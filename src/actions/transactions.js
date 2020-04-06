import {
  SAVE_TRANSACTION_REQUEST,
  SAVE_TRANSACTION_SUCCESS,
  SAVE_TRANSACTION_FAILURE,
  DELETE_TRANSACTION_REQUEST,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAILURE,
  FIND_TRANSACTION_REQUEST,
  FIND_TRANSACTION_SUCCESS,
  FIND_TRANSACTION_FAILURE,
  FIND_TRANSACTIONS_REQUEST,
  FIND_TRANSACTIONS_SUCCESS,
  FIND_TRANSACTIONS_FAILURE,
} from "./constants";

import { commonAxios } from "../utils/apiUtils";

function sleep(delay, value) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay, value);
  });
}

function saveTransactionSucces(data) {
  return { type: SAVE_TRANSACTION_SUCCESS, data: data };
}

function saveTransactionFailure(error) {
  return {
    type: SAVE_TRANSACTION_FAILURE,
    error: error,
  };
}

export const save = (model) => (dispatch) => {
  dispatch({
    type: SAVE_TRANSACTION_REQUEST,
  });
  const request = model.id
    ? commonAxios.put(`transactions/${model.id}`, model)
    : commonAxios.post("transactions", model);

  request
    .then((data) => sleep(1000, data))
    .then((data) => {
      dispatch(saveTransactionSucces(data));
    })
    .catch((error) => {
      dispatch(saveTransactionFailure(error));
    });
};

function deleteTransactionSucces(data) {
  return { type: DELETE_TRANSACTION_SUCCESS, data: data };
}

function deleteTransactionFailure(error) {
  return {
    type: DELETE_TRANSACTION_FAILURE,
    error: error,
  };
}

export const deleteById = (id) => (dispatch) => {
  dispatch({
    type: DELETE_TRANSACTION_REQUEST,
  });
  commonAxios
    .delete(`transactions/${id}`)
    .then((data) => sleep(1000, data))
    .then((data) => {
      dispatch(deleteTransactionSucces(data));
    })
    .catch((error) => {
      dispatch(deleteTransactionFailure(error));
    });
};

function findTransactionSucces(data) {
  return { type: FIND_TRANSACTION_SUCCESS, data: data };
}

function findTransactionFailure(error) {
  return {
    type: FIND_TRANSACTION_FAILURE,
    error: error,
  };
}

export const findById = (id) => (dispatch) => {
  dispatch({
    type: FIND_TRANSACTION_REQUEST,
  });
  commonAxios
    .get(`transactions/${id}`)
    .then((data) => sleep(1000, data))
    .then((data) => {
      dispatch(findTransactionSucces(data));
    })
    .catch((error) => {
      dispatch(findTransactionFailure(error));
    });
};

function findTransactionsSucces(data) {
  return { type: FIND_TRANSACTIONS_SUCCESS, data: data };
}

function findTransactionsFailure(error) {
  return {
    type: FIND_TRANSACTIONS_FAILURE,
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
    type: FIND_TRANSACTIONS_REQUEST,
  });
  commonAxios
    .get("transactions", { params: { ...search, sort, page, size } })
    .then((data) => sleep(1000, data))
    .then((data) => {
      dispatch(findTransactionsSucces(data));
    })
    .catch((error) => {
      dispatch(findTransactionsFailure(error));
    });
};
