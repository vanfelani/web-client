import { ItemsPage, ItemPage } from "../scenes/item";
import { StocksPage, StockPage } from "../scenes/stock";
import { TransactionsPage, TransactionPage } from "../scenes/transaction";
import { UnitsPage, UnitPage } from "../scenes/unit";
import { ErrorPage } from "../scenes/error";

const routes = [
  {
    path: "/transactions/add",
    component: TransactionPage,
  },
  {
    path: "/transactions/:id",
    component: TransactionPage,
  },
  {
    path: "/transactions",
    component: TransactionsPage,
  },
  {
    path: "/",
    component: TransactionsPage,
  },
  {
    path: "/items/add",
    component: ItemPage,
  },
  {
    path: "/units/add",
    component: UnitPage,
  },
  {
    path: "/stocks/add",
    component: StockPage,
  },
  {
    path: "/stocks/:id",
    component: StockPage,
  },
  {
    path: "/stocks",
    component: StocksPage,
  },
  {
    path: "/units/:id",
    component: UnitPage,
  },
  {
    path: "/units",
    component: UnitsPage,
  },
  {
    path: "/items/:id",
    component: ItemPage,
  },
  {
    path: "/items",
    component: ItemsPage,
  },
  {
    path: "*",
    component: ErrorPage,
    props: {
      code: 404,
    },
  },
];

export default routes;
