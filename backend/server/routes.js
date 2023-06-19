const express = require("express");
const router = express.Router();
const {createNewAgent, getAllAgents, getSingleAgent, searchAgents} = require('./controllers/agentsController')
const {createReview, getReviews, getAgentreviews} = require('./controllers/reviewController');
const multer = require("multer")()

router.post("/newagent", multer.single("file"), createNewAgent);
router.get("/agents", getAllAgents);
router.get("/agent", getSingleAgent);
router.get("/search", searchAgents);


router.post("/newreview", createReview);
router.get("/getreviews", getReviews);
router.get("/getAgentreviews", getAgentreviews);

module.exports = router;
