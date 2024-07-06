const express = require('express');
const router = express.Router();
const{createSubSection, updateSubSection, deleteSubSection} = require("../controllers/SubSection")
router.post("/createSubSection", createSubSection);

router.put("/updateSubSection", updateSubSection);
router.delete("/deleteSubSection", deleteSubSection);


module.exports = router;
