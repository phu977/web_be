import mongoose from "mongoose";
const Schema = mongoose.Schema;
const OrgUnitSchema = Schema({
  mNameOrgUnit: { type: String, require: true },
});

let OrgUnit = mongoose.model("OrgUnit", OrgUnitSchema, "OrgUnit");
export default OrgUnit;
