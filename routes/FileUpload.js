const express= require('express');
const router = express.Router();

const {localfileupload, imageUpload, videoUpload}= require("../controllers/fileUpload")

router.post('/localfileUpload', localfileupload)
router.post('/imageUpload' , imageUpload)
router.post('/videoUpload', videoUpload)
// router.post('/imageReducer', imageReducerUpload)

module.exports= router