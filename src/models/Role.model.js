import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RoleSchema = Schema({
  nNameRole: { type: String, require: true },
  mDescriptionRole: { type: String },
});

let Role = mongoose.model("Role", RoleSchema, "Role");
export default Role;
