import { combineReducers } from "redux";
import { saveItem, deleteItemById, findItemById, findItems } from "./items";
import {
  saveStock,
  deleteStockById,
  findStockById,
  findStocks,
} from "./stocks";
import { saveUnit, deleteUnitById, findUnitById, findUnits } from "./units";
import {
  deleteTransactionById,
  findTransactionById,
  findTransactions,
  saveTransaction,
} from "./transactions";

export default combineReducers({
  saveItem,
  deleteItemById,
  findItemById,
  findItems,

  saveUnit,
  deleteUnitById,
  findUnitById,
  findUnits,

  saveTransaction,
  deleteTransactionById,
  findTransactionById,
  findTransactions,

  saveStock,
  deleteStockById,
  findStockById,
  findStocks,
});
