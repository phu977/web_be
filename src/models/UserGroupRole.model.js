import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserGroupRoleSchema = Schema({
  mUserID: { type: String, require: true, unique: true },
  mGroupRoleID: { type: String, require: true },
});

let UserGroupRole = mongoose.model(
  "UserGroupRole",
  UserGroupRoleSchema,
  "UserGroupRole"
);
export default UserGroupRole;
