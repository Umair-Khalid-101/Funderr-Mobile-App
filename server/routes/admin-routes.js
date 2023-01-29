const express = require("express");
const {
  acceptCampaign,
  getUsers,
  deleteUser,
} = require("../controllers/adminController");
const router = express.Router();

router.get("/acceptcampaign/:id", acceptCampaign);
router.get("/users", getUsers);
router.delete("/deleteuser/:id", deleteUser);
module.exports = router;
