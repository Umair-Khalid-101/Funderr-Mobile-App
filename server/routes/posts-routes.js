const express = require("express");
const {
  addPost,
  getPosts,
  getUserPosts,
  deletePost,
  updatePost,
  postById,
  pendingPosts,
  addfavPost,
  deleteFavPost,
  getUserFavPosts,
} = require("../controllers/postsController");
const authmiddleware = require("../middleware/auth");
const router = express.Router();

router.post("/newpost", addPost);
router.get("/allposts", getPosts);
router.get("/userposts", authmiddleware, getUserPosts);
router.delete("/deletepost/:id", deletePost);
router.patch("/editpost/:id", updatePost);
router.get("/post/:id", postById);
router.get("/pendingposts", pendingPosts);
router.post("/addfavorite", addfavPost);
router.delete("/deletefromfav/:id", deleteFavPost);
router.get("/userfavposts", authmiddleware, getUserFavPosts);

module.exports = router;
