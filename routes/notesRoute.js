const express = require('express');
const multer = require('multer');
const upload = multer({dest:"./upload"});

const {uploadFile, checkGrammer, renderNote} = require("./../controllers/noteController");

const router = express.Router();

router.post("/upload", upload.single('markdownFile'), uploadFile);
router.post("/check-grammer", upload.single('markdownFile'), checkGrammer);
router.post("/render-notes", upload.single('markdownFile'), renderNote);

module.exports = router;