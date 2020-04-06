import { FIND_ITEM_BY_ID, FIND_ITEMS } from "../actions/constants";

const data = [
  {
    id: 1,
    name: "Kopi"
  },
  {
    id: 2,
    name: "Susu"
  },
  {
    id: 3,
    name: "Gula"
  }
];

function sleep(delay) {
  return new Promise(function(resolve) {
    setTimeout(resolve, delay);
  });
}

export const findById = id => dispatch =>
  sleep(3000).then(() => {
    let result;
    for (const e of data) {
      if (e.id == id) {
        result = e;
      }
    }
    dispatch({
      data: result
    });
  });

export const findAll = () => dispatch =>
  sleep(3000).then(() => {
    dispatch({
      data: data
    });
  });
