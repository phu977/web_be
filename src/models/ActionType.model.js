import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ActionTypeSchema = Schema({
  typeName: { type: String, require: true },
  mLevel: { type: String, require: true },
});

let ActionType = mongoose.model("ActionType", ActionTypeSchema, "ActionType");
export default ActionType;
