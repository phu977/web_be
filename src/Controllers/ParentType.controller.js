import ParentType from "../models/ParentType.model.js";

const createParentType = async (req, res) => {
  try {
    let { nameParentType, mLevel, mUrl } = req.body;
    if ((!nameParentType, !mLevel, !mUrl)) {
      return res.status(400).send({
        statuscode: 400,
        message: "nameParentType is missing",
      });
    }
    let data = await ParentType.findOne({
      nameParentType: nameParentType,
    });
    if (!data) {
      let newParentType = {
        nameParentType,
        mLevel,
        mUrl,
      };
      await ParentType.create(newParentType);
      return res.status(200).send({
        statuscode: 200,
        message: "",
        content: newParentType,
      });
    } else {
      return res.status(400).send({
        statuscode: 400,
        message: "nameParentType has been used",
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ statuscode: 500, message: "", message: error.message });
  }
};

const getParentType = async (req, res) => {
  try {
    let data = await ParentType.find();
    if (!data) {
      return res
        .status(400)
        .send({ statusCode: 400, message: "Không có dữ liệu" });
    }
    return res
      .status(200)
      .send({ statusCode: 200, message: "", content: data });
  } catch (error) {
    res
      .status(500)
      .send({ statuscode: 500, message: "", message: error.message });
  }
};

export { createParentType, getParentType };
