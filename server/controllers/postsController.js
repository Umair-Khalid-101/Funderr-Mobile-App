const posts = require("../models/posts");
const favPost = require("../models/favorites");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const addPost = async (req, res, next) => {
  let cloudinaryImage;
  const file = req.files.picture;
  await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    cloudinaryImage = result.url;
  });
  const {
    title,
    description,
    enddate,
    postedBy,
    startdate,
    campaignGoal,
    posterName,
    walletAddress,
    permission,
    posterPic,
    category,
  } = req.body;
  const post = new posts({
    title,
    description,
    enddate,
    postedBy,
    startdate,
    campaignGoal,
    posterName,
    walletAddress,
    permission,
    posterPic,
    category,
    picture: cloudinaryImage,
  });
  try {
    await post.save();
  } catch (error) {
    console.log(error);
  }
  return res.status(201).json({ message: post });
};

const getPosts = async (req, res, next) => {
  let allposts;
  try {
    allposts = await posts.find();
  } catch (error) {
    return new Error(error);
  }
  if (!allposts) {
    return res.status(400).json({ message: "No Posts found!" });
  }
  return res.status(200).json({ allposts });
};

const getUserPosts = async (req, res, next) => {
  let userposts;
  try {
    // const postedBy = req.params.id;
    const postedBy = req.user._id;
    userposts = await posts.find({ postedBy: postedBy });
  } catch (error) {
    return new Error(error);
  }
  if (!userposts) {
    return res.status(400).json({ message: "No User Posts found!" });
  }
  return res.status(200).json({ userposts });
};

const updatePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    let cloudinaryImage;
    const file = req.files.picture;
    await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
      cloudinaryImage = result.url;
    });
    const {
      title,
      description,
      enddate,
      postedBy,
      startdate,
      campaignGoal,
      posterName,
      walletAddress,
      permission,
      posterPic,
      category,
    } = req.body;
    const updates = {
      title,
      description,
      enddate,
      startdate,
      campaignGoal,
      posterName,
      postedBy,
      walletAddress,
      permission,
      posterPic,
      category,
      picture: cloudinaryImage,
    };
    const options = { new: true };
    const result = await posts.findByIdAndUpdate(id, updates, options);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
};

const deletePost = async (req, res, next) => {
  const postId = req.params.id;
  try {
    posts.deleteOne({ _id: postId }).then((result) => {
      res.status(200).json({ message: `Deleted Post: ${result.deletedCount}` });
    });
  } catch (error) {
    return new Error(error);
  }
};

const postById = async (req, res, next) => {
  try {
    newpost = await posts.findById(req.params.id);
  } catch (error) {
    return new Error(error);
  }
  if (!newpost) {
    return res.status(400).json({ message: "No Post found!" });
  }
  return res.status(200).json({ newpost });
};

const pendingPosts = async (req, res, next) => {
  try {
    pending = await posts.find({ permission: "pending" });
  } catch (error) {
    console.log(error);
  }
  if (!pending) {
    return res.status(400).json({ message: "No Pending Posts" });
  }
  return res.status(200).json({ pending });
};

const addfavPost = async (req, res, next) => {
  const {
    title,
    description,
    enddate,
    postedBy,
    startdate,
    campaignGoal,
    posterName,
    walletAddress,
    permission,
    posterPic,
    category,
    picture,
    favoritedBy,
  } = req.body;
  const userFavPost = new favPost({
    title,
    description,
    enddate,
    postedBy,
    startdate,
    campaignGoal,
    posterName,
    walletAddress,
    permission,
    posterPic,
    category,
    picture,
    favoritedBy,
  });
  try {
    await userFavPost.save();
  } catch (error) {
    console.log(error);
  }
  return res.status(201).json({ message: "FavAdded" });
};

const deleteFavPost = async (req, res, next) => {
  const postId = req.params.id;
  try {
    await favPost.deleteOne({ favoritedBy: postId }).then(() => {
      res.status(200).json({ message: `FavRemoved` });
    });
  } catch (error) {
    return new Error(error);
  }
};

const getUserFavPosts = async (req, res, next) => {
  let userFavPosts;
  try {
    const favoritedBy = req.user._id;
    userFavPosts = await favPost.find({ favoritedBy: favoritedBy });
  } catch (error) {
    console.log(error);
  }
  if (!userFavPosts) {
    return res.status(400).json({ message: "No UserFav Posts found!" });
  }
  return res.status(200).json({ userFavPosts });
};

exports.addPost = addPost;
exports.getPosts = getPosts;
exports.getUserPosts = getUserPosts;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
exports.postById = postById;
exports.pendingPosts = pendingPosts;
exports.addfavPost = addfavPost;
exports.deleteFavPost = deleteFavPost;
exports.getUserFavPosts = getUserFavPosts;
