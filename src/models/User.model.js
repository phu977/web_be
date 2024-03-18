import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = Schema({
  mName: { type: String, require: true },
  mEmail: { type: String, require: true, unique: true },
  mPassWord: { type: String, require: true },
  mBirth: { type: String, require: true },
  mAge: { type: Number, require: true },
  mGender: { type: String, require: true },
  mAddress: { type: String, require: true },
  mCompany: { type: String, require: true },
  mPhoneNumber: { type: String, require: true },
});

let User = mongoose.model("User", UserSchema, "User");
export default User;
