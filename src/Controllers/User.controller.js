import { createToken } from "../config/jwt.js";
import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment-timezone";
import UserToken from "../models/UserToken.model.js";

function momentWithTz(day, tz) {
  let m = moment(day);
  m.tz(tz);
  return m;
}

const signUp = async (req, res) => {
  try {
    let {
      mName,
      mEmail,
      mPassWord,
      mBirth,
      mAge,
      mGender,
      mAddress,
      mCompany,
      mPhoneNumber,
    } = req.body;

    if (!mEmail || !mPassWord) {
      return res.status(400).send({
        success: false,
        status: "INPUT_MISSING",
        message: "email or password is missing",
      });
    }
    let data = await User.findOne({ mEmail: req.body.mEmail });
    if (!data) {
      let encodePassword = bcrypt.hashSync(mPassWord, 10);
      let newUser = {
        mName,
        mEmail,
        mPassWord: encodePassword,
        mBirth,
        mAge,
        mGender,
        mAddress,
        mCompany,
        mPhoneNumber,
      };
      await User.create(newUser);
      return res.status(200).send({
        success: true,
        status: "OK",
        message: "",
        content: newUser,
      });
    } else {
      return res.status(400).send({
        success: false,
        status: "DUPLICATED",
        message: "email has been used",
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, STATUS: "INTERNAL_ERR", message: error.message });
  }
};

const login = async (req, res) => {
  try {
    let { mEmail, password } = req.body;

    if (!mEmail || !password) {
      return res.status(400).send({
        success: false,
        status: "INPUT_MISSING",
        message: "email or password is missing",
      });
    }
    let data = await User.findOne({ mEmail });
    if (data) {
      let checkPassword = bcrypt.compareSync(password, data.mPassWord);

      if (checkPassword) {
        let payload = {
          userID: data._id,
          mEmail,
        };

        let token = createToken(payload);
        let decode_token = jwt.decode(token);
        let issued_Time = decode_token.iat;
        let expiration_time = decode_token.exp;
        let endTime = new Date(expiration_time * 1000);
        // endTime.setHours(endTime.getHours() + 7);

        let startTime = new Date(issued_Time * 1000);
        // startTime.setHours(startTime.getHours() + 7);
        let tz = "Asia/Ho_Chi_Minh";
        let expirationTime = momentWithTz(endTime, tz);
        let issuedTime = momentWithTz(startTime, tz);
        let userToke = await UserToken.findOne({ mUserID: data._id });
        if (!userToke) {
          let newUserToken = {
            mUserID: data._id,
            mToken: token,
            mIssued: issuedTime,
            mExpiration: expirationTime,
          };
          await UserToken.create(newUserToken);
          return res.status(200).send({
            success: true,
            status: "OK",
            message: "Login successfully",
            content: {
              tokenKey: token,
              issuedTime: startTime,
              expirationTime: endTime,
              user: data,
            },
          });
        } else {
          await UserToken.findOneAndUpdate(
            { mUserID: data._id },
            { mToken: token, mIssued: startTime, mExpiration: endTime }
          );

          return res.status(200).send({
            success: true,
            status: "OK",
            message: "Login successfully and update token",
            content: {
              tokenKey: token,
              issuedTime: startTime,
              expirationTime: endTime,
              user: data,
            },
          });
        }
      }
    } else {
      return res.status(404).send({
        success: false,
        STATUS: "NOT_FOUND",
        message: "user does not exist",
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, STATUS: "INTERNAL_ERR", message: error.message });
  }
};

const uploadSingleAvatar = (req, res) => {
  res.send(req.file);
};

export { signUp, login, uploadSingleAvatar };
