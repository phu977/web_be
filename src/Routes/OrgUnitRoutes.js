import express from "express";
import { createOrgUnit, listUnit } from "../Controllers/OrgUnit.controller.js";
const OrgUnit = express.Router();
OrgUnit.post("/create", createOrgUnit);
OrgUnit.get("/list", listUnit);
export default OrgUnit;
