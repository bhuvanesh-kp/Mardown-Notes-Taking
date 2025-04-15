const markdownit = require("markdown-it");
const {markdownToTxt} = require("markdown-to-text");
const axios = require("axios");

const fs = require("node:fs/promises");
const path = require("path");
const querystring = require("querystring");

const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsyn");
const notes = require("./../models/noteModel");

const md = markdownit();

const deleteFile = async(path) =>{
    fs.unlink(path);
};

