import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserTokenSchema = Schema({
  mUserID: { type: String, require: true, unique: true },
  mToken: { type: String, require: true },
  mIssued: { type: Date, require: true },
  mExpiration: { type: Date, require: true },
});

let UserToken = mongoose.model("UserToken", UserTokenSchema, "UserToken");
export default UserToken;
