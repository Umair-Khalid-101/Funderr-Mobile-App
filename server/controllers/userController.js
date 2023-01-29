const dotenv = require("dotenv");
dotenv.config();
const _ = require("lodash");
const User = require("../models/userSignUpModel");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const register = async (req, res, next) => {
  let cloudinaryImage;
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User Already Registered.");

  const file = req.files.picture;
  await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    cloudinaryImage = result.url;
  });
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    picture: cloudinaryImage,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", " name", "email", "role", "picture"]));
};

const auth = async (req, res, next) => {
  const email = req.body.email;
  let user = await User.findOne({ email }).exec();
  if (!user) return res.status(400).send("Invalid Email");
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Password");

  const token = user.generateAuthToken();
  res.json(token);
};

const currentUser = async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
};

exports.register = register;
exports.auth = auth;
exports.currentUser = currentUser;
