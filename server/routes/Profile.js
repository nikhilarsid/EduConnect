const express = require("express");
const router = express.Router();

const{updateProfile, deleteProfile} = require("../controllers/Profile");

router.put("/updateProfile", updateProfile);
router.delete("/deleteprofile", deleteProfile);

module.exports = router;