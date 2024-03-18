import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ActionSchema = Schema({
  mParentTypeID: { type: Schema.Types.ObjectId, ref: "ParentType" },
  mTypeActionID: {
    type: Schema.Types.ObjectId,
    ref: "ActionType",
  },
  mOrgUnitID: { type: Schema.Types.ObjectId, ref: "OrgUnit" },
  mNameAction: { type: String, require: true },
  mOwer: { type: String, require: true },
  mParticipant: { type: Number, require: true },
  mLat: { type: Number, require: true },
  mLong: { type: Number, require: true },
  mDescription: { type: String },
});

let Action = mongoose.model("Action", ActionSchema, "Action");
export default Action;
//10.74802096121828, 106.64534898273978

//10.798534321868006, 106.61408338458799

//10.791203472226508, 106.68147248934733

//10.763267633556376, 106.66887174008593

//10.840983224458379, 106.68066736924662

//10.764089010791842, 106.68184752691681

//10.849588256806074, 106.66565756089183

//10.883183537702985, 106.75147266766419

//10.82052511737757, 106.70471318629423

//10.79175862882703, 106.73064986270163
