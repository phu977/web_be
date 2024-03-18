import ActionType from "../models/ActionType.model.js";
import moment from "moment-timezone";
function momentWithTz(day, tz) {
  let m = moment(day);
  m.tz(tz);
  return m;
}

const createActionType = async (req, res) => {
  try {
    let { typeName, mLevel } = req.body;
    if (!typeName || !mLevel) {
      return res.status(400).send({
        statusCode: 404,
        message: "typeName or mLevel is missing",
      });
    }
    let data = await ActionType.findOne({ typeName: req.body.typeName });
    if (!data) {
      let newActionType = {
        typeName,
        mLevel,
      };
      await ActionType.create(newActionType);
      return res.status(200).send({
        success: true,
        status: "200",
        message: "",
        data: newActionType,
      });
    } else {
      return res.status(400).send({
        success: false,
        status: "DUPLICATED",
        message: "typeName has been used",
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, STATUS: "INTERNAL_ERR", message: error.message });
  }
};

const updateActionType = async (req, res) => {
  try {
    let { id } = req.params;
    let { typeName, mLevel } = req.body;
    let updateData = {
      typeName,
      mLevel,
    };

    let updateActionType = await ActionType.findOneAndUpdate(
      { _id: id },
      updateData
    );
    if (!updateActionType) {
      return res
        .status(404)
        .send({ statusCode: 404, message: "Type không tồn tại" });
    }

    res.status(200).send({
      success: true,
      status: "OK",
      message: "",
      content: updateActionType,
    });
  } catch (error) {
    res.status(500).send({ statusCode: 500, message: error.message });
  }
};

// API list ActionTypeName
const getActionTypeName = async (req, res) => {
  try {
    let data = await ActionType.aggregate([
      {
        $project: {
          _id: 1,
          typeName: 1,
        },
      },
    ]);
    res.status(200).send({ statusCode: 200, message: "", content: data });
  } catch (error) {
    res.status(500).send({ statusCode: 500, message: error.message });
  }
};

const getActionTypeInformation = async (req, res) => {
  try {
    let infor = await ActionType.find();
    res.status(200).send({ statusCode: 200, message: "", content: infor });
  } catch (error) {
    res.status(500).send({ statusCode: 500, message: error.message });
  }
};

export {
  getActionTypeName,
  createActionType,
  getActionTypeInformation,
  updateActionType,
};
