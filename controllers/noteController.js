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

const validateFile = (file) =>{
    if (file.size <= 0) throw new AppError("The file cannont be empty");

    if (!file.originalname.endsWith(".md")) {
        throw new AppError(
          "The file should be a markdown file i.e ends with '.md'",
          400,
        );
    }

    const sizeInMb = file.size / (1024 * 1024);

    if (sizeInMb > 2) {
        throw new AppError(
        "The file exceeds the file limit. The limit is 2mb",
        400,
        );
    }
};

exports.uploadFile = catchAsync(async (req, res, next) => {
    if (!req.file) {
      return next(new AppError("No uploaded file found", 400));
    }
  
    validateFile(req.file);
  
    const filePath = path.join(__dirname, "..", req.file.path);
    let data
    try {
      data = await fs.readFile(filePath, "utf8");
    } catch (error) {
      console.log(error);
      return next(new AppError("Error reading the uploaded file", 500));
    }
  
    const note = await Note.create({
      title: req.file.filename,
      markdownContent: data,
    });
  
    deleteFile(filePath);
    res.status(201).json({
      message: "success",
      markdownNote: note,
    });
  });
  
  exports.checkGrammar = catchAsync(async (req, res, next) => {
    if (!req.file) {
      return next(new AppError("No uploaded file found", 400));
    }
  
    validateFile(req.file);
  
    const filePath = path.join(__dirname, "..", req.file.path);
    let markdownText
    try {
      markdownText = await fs.readFile(filePath, "utf8");
    } catch (error) {
      console.log(error);
      return next(new AppError("Error reading the uploaded file", 500));
    }
  
    const text = markdownToTxt(markdownText);
  
    let grammarChecks
    try {
      grammarChecks = await axios.post(
        "https://api.languagetoolplus.com/v2/check",
        querystring.stringify({
          language: "en-US",
          text,
        }),
      );
    } catch (error) {
      console.log(error);
      return next(
        new AppError("Error contacting the grammar checking service", 500),
      );
    }
  
    const data = grammarChecks.data.matches;
  
    deleteFile(filePath);
  
    res.status(200).json({
      message: "success",
      data,
    });
  });
  
  exports.renderNote = catchAsync(async (req, res, next) => {
    if (!req.file) {
      return next(new AppError("No uploaded file found", 400));
    }
  
    validateFile(req.file);
  
    const filePath = path.join(__dirname, "..", req.file.path);
    let data
    try {
      data = await fs.readFile(filePath, "utf8");
    } catch (error) {
      console.log(error);
      return next(new AppError("Error reading the uploaded file", 500));
    }
  
    const html = md.render(data);
    deleteFile(filePath);
    res.status(200).send(html);
  });