import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ActionTypeSchema = Schema({
  mParentTypeID: { type: Schema.Types.ObjectId, ref: "ParentType" },
  typeName: { type: String, require: true },
});

let ActionType = mongoose.model("ActionType", ActionTypeSchema, "ActionType");
export default ActionType;
