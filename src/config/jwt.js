import jwt from "jsonwebtoken";
import { dbConfig } from "./dbConfig.js";
import User from "../models/User.model.js";

const createToken = (data) => {
  return jwt.sign(data, dbConfig.secret, { expiresIn: "1y" });
};

const checkToken = (token) => {
  return jwt.verify(token, dbConfig.secret, (err, decoded) => {
    if (err) {
      return {
        statusCode: 401, // 401 - unauthorized
        message: "Invalid token",
      };
    }
    return {
      statusCode: 200,
      data: decoded,
    };
  });
};

const keyApi = async (req, res, next) => {
  let { token } = req.headers;
  if (token) {
    let verifyToken = checkToken(token);
    if (verifyToken.statusCode == 401) {
      res.status(401).send({
        statusCode: 401, // 401 - unauthorized
        message: "Invalid token",
      });
      return;
    }
    // nếu muốn check role
    let user_id = verifyToken.data;

    // check user_id có trong DB hay khôngs
    let checkUser = await User.findOne({ _id: user_id.userID });
    if (!checkUser) {
      res.status(401).send("Invalid token");
      return;
    }
    next();
  } else {
    res.status(401).send("Unauthorized");
    return;
  }
};

export { createToken, checkToken, keyApi };
