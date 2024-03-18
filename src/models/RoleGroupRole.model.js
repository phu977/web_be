import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RoleGroupRoleSchema = Schema({
  mGroupRoleID: { type: String, require: true },
  mRoleID: { type: String, require: true },
});

let RoleGroupRole = mongoose.model(
  "RoleGroupRole",
  RoleGroupRoleSchema,
  "RoleGroupRole"
);
export default RoleGroupRole;
