import express from "express";
import {
  actionOrgUnit,
  actionParentType,
  createAction,
  deleteAction,
  getAction,
  getListAction,
  loadFullAction,
  renderAction,
  searchListAction,
  updateAction,
} from "../Controllers/Action.controller.js";
import { keyApi } from "../config/jwt.js";

const Action = express.Router();

Action.post("/createAction", createAction);
Action.post("/inforaction", keyApi, getAction);
Action.get("/all", keyApi, loadFullAction);
Action.post("/search", keyApi, searchListAction);
Action.put("updateaction/:ActionID", keyApi, updateAction);
Action.post("/render", keyApi, renderAction);
Action.get("/list", keyApi, getListAction);
Action.post("/delete", keyApi, deleteAction);
Action.post("/actionUnit", actionOrgUnit);
Action.post("/actionParent", actionParentType);
export default Action;
