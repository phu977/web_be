import Role from "../models/Role.model.js";

const createRole = async (req, res) => {
  try {
    let { nNameRole, mDescriptionRole } = req.body;
    if (!nNameRole || !mDescriptionRole) {
      return res.status(400).send({
        success: false,
        status: "INPUT_MISSING",
        message: "nNameRole or mDescriptionRole is missing",
      });
    }
    let dataRole = await Role.findOne({
      nNameRole: nNameRole,
    });
    if (!dataRole) {
      let newRole = {
        nNameRole,
        mDescriptionRole,
      };
      await Role.create(newRole);
      return res.status(200).send({
        success: true,
        status: "OK",
        message: "",
        content: newRole,
      });
    } else {
      return res.status(400).send({
        success: false,
        status: "DUPLICATED",
        message: "nNameRole has been used",
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, STATUS: "INTERNAL_ERR", message: error.message });
  }
};

export { createRole };
