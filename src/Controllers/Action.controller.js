import Action from "../models/Action.model.js";
import ActionType from "../models/ActionType.model.js";
import ParentType from "../models/ParentType.model.js";
import moment from "moment-timezone";
import mongoose from "mongoose";

function momentWithTz(day, tz) {
  let m = moment(day);
  m.tz(tz);
  return m;
}

const createAction = async (req, res) => {
  try {
    let {
      mParentTypeID,
      mTypeActionID,
      mOrgUnitID,
      mNameAction,
      mOwer,
      mParticipant,
      mLat,
      mLong,
      mDescription,
      mStartDay,
      mEndDay,
    } = req.body;

    if (!mNameAction || !mLat || !mLong) {
      return res.status(400).send({
        statusCode: 404,
        message: "mNameAction or mLat or mLong is missing",
      });
    }

    // Kiểm tra xem mNameAction đã tồn tại hay chưa
    let existingAction = await Action.findOne({ mNameAction });
    if (!existingAction) {
      // Nếu mNameAction chưa tồn tại, tạo hành động mới
      let newAction = {
        mParentTypeID,
        mTypeActionID,
        mOrgUnitID,
        mNameAction,
        mOwer,
        mParticipant,
        mLat,
        mLong,
        mDescription,
        mStartDay: new Date(mStartDay),
        mEndDay: new Date(mEndDay),
      };
      await Action.create(newAction);

      return res.status(200).send({
        success: true,
        status: "OK",
        message: "Action created successfully",
        content: newAction,
      });
    } else {
      // Nếu đã tồn tại hành động với mNameAction tương tự, trả về lỗi
      return res.status(400).send({
        success: false,
        status: "DUPLICATED",
        message: "mNameAction has been used",
      });
    }
  } catch (error) {
    res.status(500).send({ statusCode: 500, message: error.message });
  }
};

const updateAction = async (req, res) => {
  try {
    let { ActionID } = req.params;
    let {
      mParentTypeID,
      mTypeActionID,
      mOrgUnitID,
      mNameAction,
      mOwer,
      mParticipant,
      mLat,
      mLong,
      mDescription,
      mStartDay,
      mEndDay,
    } = req.body;
    let updateData = {
      mParentTypeID,
      mTypeActionID,
      mOrgUnitID,
      mNameAction,
      mOwer,
      mParticipant,
      mLat,
      mLong,
      mDescription,
      mStartDay: new Date(mStartDay),
      mEndDay: new Date(mEndDay),
    };
    let updateAction = await Action.findOneAndUpdate(
      { _id: ActionID },
      updateData
    );
    if (!updateAction) {
      return res
        .status(404)
        .send({ statusCode: 404, message: "Action không tồn tại" });
    }
    res.status(200).send({
      success: true,
      status: "OK",
      message: "",
      content: updateAction,
    });
  } catch (error) {
    res.status(500).send({ statusCode: 500, message: error.message });
  }
};

//API list action
const getAction = async (req, res) => {
  try {
    let { id } = req.body;
    if (id == 1) {
      const action = await Action.aggregate([
        {
          $lookup: {
            from: "ActionType",
            localField: "mTypeActionID",
            foreignField: "_id",
            as: "type",
          },
        },
        {
          $unwind: "$type",
        },
        {
          $project: {
            _id: 1,
            mNameAction: 1,
            mOwer: 1,
            mParticipant: 1,
            mLat: 1,
            mLong: 1,
            mDescription: 1,
            mStartDay: 1,
            mEndDay: 1,
            typeName: "$type.typeName",
          },
        },
      ]);
      res.status(200).send({ statusCode: 200, message: "", content: action });
    } else {
      const actionType = await ActionType.findOne({ _id: id });
      if (!actionType) {
        return res
          .status(404)
          .send({ statusCode: 404, message: "loại hoạt động không tồn tại" });
      }
      // Lấy danh sách các action tương ứng với mTypeActionID của ActionType
      const actions = await Action.aggregate([
        {
          $lookup: {
            from: "ActionType",
            localField: "mTypeActionID",
            foreignField: "_id",
            as: "type",
          },
        },
        {
          $match: {
            mTypeActionID: new mongoose.Types.ObjectId(actionType._id),
          },
        },
        {
          $unwind: "$type",
        },
        {
          $project: {
            _id: 1,
            mNameAction: 1,
            mOwer: 1,
            mParticipant: 1,
            mLat: 1,
            mLong: 1,
            mDescription: 1,
            mStartDay: 1,
            mEndDay: 1,
            typeName: "$type.typeName",
          },
        },
      ]);

      res.status(200).send({ statusCode: 200, message: "", content: actions });
    }
  } catch (error) {
    res.status(500).send({ statusCode: 500, message: error.message });
  }
};

//get together action
const loadFullAction = async (req, res) => {
  let action = await Action.aggregate([
    {
      $project: {
        _id: 1,
        mNameAction: 1,
        mOwer: 1,
        mParticipant: 1,
        mLat: 1,
        mLong: 1,
        mDescription: 1,
      },
    },
  ]);
  res.status(200).send({ statusCode: 200, message: "", content: action });
  try {
  } catch (error) {
    res.status(500).send({ statusCode: 500, message: error.message });
  }
};

//API list searchAction with name,typename
const searchListAction = async (req, res) => {
  try {
    const { searchText } = req.body;
    if (!searchText) {
      return res.status(400).send({
        success: false,
        status: "INPUT_MISSING",
        message: "searchText is missing",
      });
    }
    const results = await Action.aggregate([
      // Tìm kiếm ActionType có typeName chứa searchText
      {
        $lookup: {
          from: "ActionType", // Tên collection của ActionType
          localField: "mTypeActionID",
          foreignField: "_id",
          as: "actionType",
        },
      },
      {
        $match: {
          $or: [
            { mNameAction: { $regex: searchText, $options: "i" } },
            { "actionType.typeName": { $regex: searchText, $options: "i" } },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          mNameAction: 1,
          typeName: { $arrayElemAt: ["$actionType.typeName", 0] },
        },
      },
    ]);
    res.status(200).send({ statuscode: 200, message: "", content: results });
  } catch (error) {
    res.status(500).send({ statusCode: 500, message: error.message });
  }
};

const renderAction = async (req, res) => {
  try {
    let { text } = req.body;
    const actionType = await ActionType.findOne({ typeName: text });

    if (actionType) {
      const action = await Action.aggregate([
        {
          $lookup: {
            from: "ActionType",
            localField: "mTypeActionID",
            foreignField: "_id",
            as: "type",
          },
        },
        {
          $match: {
            mTypeActionID: new mongoose.Types.ObjectId(actionType._id),
          },
        },
        {
          $unwind: "$type",
        },
        {
          $project: {
            _id: 1,
            mNameAction: 1,
            mOwer: 1,
            mParticipant: 1,
            mLat: 1,
            mLong: 1,
            mDescription: 1,
            mStartDay: 1,
            mEndDay: 1,
            typeName: "$type.typeName",
          },
        },
      ]);

      return res
        .status(200)
        .send({ statusCode: 200, message: "", content: action });
    } else {
      const action = await Action.aggregate([
        {
          $match: {
            mNameAction: { $regex: text, $options: "i" }, // Tìm kiếm không phân biệt chữ hoa chữ thường
          },
        },
        {
          $lookup: {
            from: "ActionType",
            localField: "mTypeActionID",
            foreignField: "_id",
            as: "type",
          },
        },
        {
          $unwind: "$type",
        },
        {
          $project: {
            _id: 1,
            mNameAction: 1,
            mOwer: 1,
            mParticipant: 1,
            mLat: 1,
            mLong: 1,
            mDescription: 1,
            mStartDay: 1,
            mEndDay: 1,
            typeName: "$type.typeName",
          },
        },
      ]);
      return res
        .status(200)
        .send({ statusCode: 200, message: "", content: action });
    }
  } catch (error) {
    res.status(500).send({ statusCode: 500, message: error.message });
  }
};

const getListAction = async (req, res) => {
  try {
    const actions = await Action.aggregate([
      {
        $lookup: {
          from: "ActionType", // Tên bảng loại hành động
          localField: "mTypeActionID",
          foreignField: "_id",
          as: "actionType",
        },
      },
      {
        $unwind: "$actionType",
      },
      {
        $project: {
          _id: 1,
          mNameAction: 1,
          mOwer: 1,
          mParticipant: 1,
          mDescription: 1,
          mStartDay: 1,
          mEndDay: 1,
          typeName: "$actionType.typeName",
        },
      },
    ]);

    return res
      .status(200)
      .send({ statusCode: 200, message: "", content: actions });
  } catch (error) {
    res.status(500).send({ statusCode: 500, message: error.message });
  }
};

const deleteAction = async (req, res) => {
  try {
    let { id } = req.body;
    let action = await Action.findById(id);
    if (!action) {
      return res
        .status(400)
        .send({ statusCode: 400, message: "Hoạt động không tồn tại" });
    } else {
      await Action.findByIdAndDelete(id);
      return res
        .status(200)
        .send({ statusCode: 200, message: "Xóa thành công" });
    }
  } catch (error) {
    res.status(500).send({ statusCode: 500, message: error.message });
  }
};

// list action with mOrgUnit, ParentType

const actionOrgUnit = async (req, res) => {
  try {
    let { mOrgUnitID } = req.body;
    if (mOrgUnitID == 1) {
      const action = await Action.aggregate([
        {
          $lookup: {
            from: "ActionType",
            localField: "mTypeActionID",
            foreignField: "_id",
            as: "type",
          },
        },
        {
          $unwind: "$type",
        },
        {
          $project: {
            _id: 1,
            mNameAction: 1,
            mOwer: 1,
            mParticipant: 1,
            mLat: 1,
            mLong: 1,
            mDescription: 1,
            mStartDay: 1,
            mEndDay: 1,
            typeName: "$type.typeName",
          },
        },
      ]);
      res.status(200).send({ statusCode: 200, message: "", content: action });
    } else {
      const actions = await Action.aggregate([
        {
          $match: {
            mOrgUnitID: new mongoose.Types.ObjectId(mOrgUnitID), // Chuyển orgUnitId thành ObjectId để so sánh
          },
        },
        {
          $lookup: {
            from: "ParentType", // Tên của collection ParentType
            localField: "mParentTypeID",
            foreignField: "_id",
            as: "parentType",
          },
        },
        {
          $lookup: {
            from: "ActionType", // Tên của collection ActionType
            localField: "mTypeActionID",
            foreignField: "_id",
            as: "actionType",
          },
        },
        {
          $project: {
            mNameAction: 1,
            mOwer: 1,
            mParticipant: 1,
            mLat: 1,
            mLong: 1,
            mDescription: 1,
            mStartDay: 1,
            mEndDay: 1,
            nameParentType: { $arrayElemAt: ["$parentType.nameParentType", 0] },
            typeName: { $arrayElemAt: ["$actionType.typeName", 0] },
          },
        },
      ]);
      if (actions.length === 0) {
        return res
          .status(404)
          .send({ statusCode: 404, message: "Không tìm thấy hoạt động" });
      }
      return res
        .status(200)
        .send({ statusCode: 200, message: "", content: actions });
    }
  } catch (error) {
    res.status(500).send({ statusCode: 500, message: error.message });
  }
};

const actionParentType = async (req, res) => {
  try {
    let { parentTypeID } = req.body;
    const actions = await Action.aggregate([
      {
        $match: {
          mParentTypeID: new mongoose.Types.ObjectId(parentTypeID), // Chuyển parentTypeID thành parentTypeID để so sánh
        },
      },
      {
        $lookup: {
          from: "ParentType", // Tên của collection ParentType
          localField: "mParentTypeID",
          foreignField: "_id",
          as: "parentType",
        },
      },
      {
        $lookup: {
          from: "ActionType", // Tên của collection ActionType
          localField: "mTypeActionID",
          foreignField: "_id",
          as: "actionType",
        },
      },
      {
        $project: {
          mNameAction: 1,
          mOwer: 1,
          mParticipant: 1,
          mLat: 1,
          mLong: 1,
          mDescription: 1,
          mStartDay: 1,
          mEndDay: 1,
          nameParentType: { $arrayElemAt: ["$parentType.nameParentType", 0] },
          typeName: { $arrayElemAt: ["$actionType.typeName", 0] },
        },
      },
    ]);
    if (actions.length === 0) {
      return res
        .status(404)
        .send({ statusCode: 404, message: "Không tìm thấy hoạt động" });
    }
    return res
      .status(200)
      .send({ statusCode: 200, message: "", content: actions });
  } catch (error) {
    res.status(500).send({ statusCode: 500, message: error.message });
  }
};

export {
  createAction,
  getAction,
  searchListAction,
  updateAction,
  renderAction,
  loadFullAction,
  getListAction,
  deleteAction,
  actionOrgUnit,
  actionParentType,
};
