import {
  SAVE_UNIT_REQUEST,
  SAVE_UNIT_SUCCESS,
  SAVE_UNIT_FAILURE,
  DELETE_UNIT_REQUEST,
  DELETE_UNIT_SUCCESS,
  DELETE_UNIT_FAILURE,
  FIND_UNIT_REQUEST,
  FIND_UNIT_SUCCESS,
  FIND_UNIT_FAILURE,
  FIND_UNITS_REQUEST,
  FIND_UNITS_SUCCESS,
  FIND_UNITS_FAILURE,
} from "./constants";

import { commonAxios } from "../utils/apiUtils";

function sleep(delay, value) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay, value);
  });
}

function saveUnitSucces(data) {
  return { type: SAVE_UNIT_SUCCESS, data: data };
}

function saveUnitFailure(error) {
  return {
    type: SAVE_UNIT_FAILURE,
    error: error,
  };
}

export const save = (model) => (dispatch) => {
  dispatch({
    type: SAVE_UNIT_REQUEST,
  });
  const request = model.id
    ? commonAxios.put(`units/${model.id}`, model)
    : commonAxios.post("units", model);

  request
    .then((data) => sleep(1000, data))
    .then((data) => {
      dispatch(saveUnitSucces(data));
    })
    .catch((error) => {
      dispatch(saveUnitFailure(error));
    });
};

function deleteUnitSucces(data) {
  return { type: DELETE_UNIT_SUCCESS, data: data };
}

function deleteUnitFailure(error) {
  return {
    type: DELETE_UNIT_FAILURE,
    error: error,
  };
}

export const deleteById = (id) => (dispatch) => {
  dispatch({
    type: DELETE_UNIT_REQUEST,
  });
  commonAxios
    .delete(`units/${id}`)
    .then((data) => sleep(1000, data))
    .then((data) => {
      dispatch(deleteUnitSucces(data));
    })
    .catch((error) => {
      dispatch(deleteUnitFailure(error));
    });
};

function findUnitSucces(data) {
  return { type: FIND_UNIT_SUCCESS, data: data };
}

function findUnitFailure(error) {
  return {
    type: FIND_UNIT_FAILURE,
    error: error,
  };
}

export const findById = (id) => (dispatch) => {
  dispatch({
    type: FIND_UNIT_REQUEST,
  });
  commonAxios
    .get(`units/${id}`)
    .then((data) => sleep(1000, data))
    .then((data) => {
      dispatch(findUnitSucces(data));
    })
    .catch((error) => {
      dispatch(findUnitFailure(error));
    });
};

function findUnitsSucces(data) {
  return { type: FIND_UNITS_SUCCESS, data: data };
}

function findUnitsFailure(error) {
  return {
    type: FIND_UNITS_FAILURE,
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
    type: FIND_UNITS_REQUEST,
  });
  commonAxios
    .get("units", { params: { ...search, sort, page, size } })
    .then((data) => sleep(1000, data))
    .then((data) => {
      dispatch(findUnitsSucces(data));
    })
    .catch((error) => {
      dispatch(findUnitsFailure(error));
    });
};
