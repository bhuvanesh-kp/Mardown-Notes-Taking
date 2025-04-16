const express = require("express")
const multer = require("multer")
const upload = multer({dest: "./uploads"})

const {uploadFile, checkGrammar, renderNote} = require("../controllers/noteController")

const router = express.Router()

router.post("/upload", upload.single('markdownFile'), uploadFile)
router.post("/check-grammar",  upload.single('markdownFile'), checkGrammar)
router.post("/render-note",  upload.single('markdownFile'), renderNote)


module.exports = router