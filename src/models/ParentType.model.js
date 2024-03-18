import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ParentTypeSchema = Schema({
  nameParentType: { type: String, require: true },
  mLevel: { type: String, require: true },
  mUrl: { type: String, require: true },
});
let ParentType = mongoose.model("ParentType", ParentTypeSchema, "ParentType");
export default ParentType;
