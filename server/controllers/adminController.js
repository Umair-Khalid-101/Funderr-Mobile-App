const posts = require("../models/posts");
const User = require("../models/userSignUpModel");

const acceptCampaign = async (req, res, next) => {
  const id = req.params.id;
  const options = { new: true };
  try {
    const result = await posts.findByIdAndUpdate(
      id,
      {
        $set: {
          permission: "accepted",
        },
      },
      options
    );
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const allusers = await User.find();
    res.send(allusers);
  } catch (error) {
    console.log("No Users Found");
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    User.deleteOne({ _id: id }).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
  }
};

// const createUser = async (req, res, next) => {
//   try {

//   } catch (error) {

//   }
// }

exports.acceptCampaign = acceptCampaign;
exports.getUsers = getUsers;
exports.deleteUser = deleteUser;
