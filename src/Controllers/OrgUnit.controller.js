import OrgUnit from "../models/OrgUnit.model.js";

const createOrgUnit = async (req, res) => {
  try {
    let { mNameOrgUnit } = req.body;
    if (!mNameOrgUnit) {
      return res.status(400).send({
        statuscode: 400,
        message: "mNameOrgUnit is missing",
      });
    }

    let data = await OrgUnit.findOne({
      mNameOrgUnit: mNameOrgUnit,
    });
    if (!data) {
      let newData = {
        mNameOrgUnit,
      };
      await OrgUnit.create(newData);
      return res.status(200).send({
        statuscode: 200,
        message: "",
        content: newData,
      });
    } else {
      return res.status(400).send({
        statuscode: 400,
        message: "mNameOrgUnit has been used",
      });
    }
  } catch (error) {
    res.status(500).send({ statuscode: 500, message: error.message });
  }
};

// list Unit
const listUnit = async (req, res) => {
  try {
    let data = await OrgUnit.aggregate([
      {
        $project: {
          _id: 1,
          mNameOrgUnit: 1,
        },
      },
    ]);
    res.status(200).send({ statusCode: 200, message: "", content: data });
  } catch (error) {
    res.status(500).send({ statuscode: 500, message: error.message });
  }
};

export { createOrgUnit, listUnit };
