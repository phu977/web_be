import express from "express";
import {
  createActionType,
  getActionTypeInformation,
  getActionTypeName,
  updateActionType,
} from "../Controllers/ActionType.controller.js";
import { keyApi } from "../config/jwt.js";

const ActionType = express.Router();

ActionType.get("/getactiontype", keyApi, getActionTypeName);
ActionType.post("/createActionType", createActionType);
ActionType.get("/getActionTypeinfor", keyApi, getActionTypeInformation);
ActionType.put("/updateType", keyApi, updateActionType);
export default ActionType;
