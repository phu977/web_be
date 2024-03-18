import express from "express";
import ActionType from "./ActionTypeRoutes.js";
import UserRoutes from "./UserRoutes.js";
import ImageRoutes from "./ImageRoutes.js";
import Action from "./ActionRoutes.js";
import GroupRole from "./GroupRoleRoutes.js";
import Role from "./RoleRoutes.js";
import ParentType from "./ParentTypeRoutes.js";
import OrgUnit from "./OrgUnitRoutes.js";

const rootRoutes = express.Router();

rootRoutes.use("/v1/type", ActionType);
rootRoutes.use("/v1/action", Action);
rootRoutes.use("/v1/user", UserRoutes);
rootRoutes.use("/v1/image", ImageRoutes);
rootRoutes.use("/v1/grouprole", GroupRole);
rootRoutes.use("/v1/role", Role);
rootRoutes.use("/v1/parent", ParentType);
rootRoutes.use("/v1/orgunit", OrgUnit);
export default rootRoutes;
