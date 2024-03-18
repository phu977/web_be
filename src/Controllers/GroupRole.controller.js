import GroupRoles from "../models/GroupRoles.model.js";

const createGroupRole = async (req, res) => {
  try {
    let { mNameGroupRole, mDescription } = req.body;
    if (!mNameGroupRole || !mDescription) {
      return res.status(400).send({
        statuscode: 400,
        message: "mNameGroupRole or mDescription is missing",
      });
    }
    let dataGroupRole = await GroupRoles.findOne({
      mNameGroupRole: mNameGroupRole,
    });
    if (!dataGroupRole) {
      let newGroupRole = {
        mNameGroupRole,
        mDescription,
      };
      await GroupRoles.create(newGroupRole);
      return res.status(200).send({
        statuscode: 200,
        message: "",
        content: newGroupRole,
      });
    } else {
      return res.status(400).send({
        statuscode: 400,
        message: "mNameGroupRole has been used",
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ statuscode: 500, message: "", message: error.message });
  }
};

export { createGroupRole };
