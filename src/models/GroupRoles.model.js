import mongoose from "mongoose";
const Schema = mongoose.Schema;

const GroupRolesSchema = Schema({
  mNameGroupRole: { type: String, require: true },
  mDescription: { type: String },
});
let GroupRoles = mongoose.model("GroupRoles", GroupRolesSchema, "GroupRoles");
export default GroupRoles;
