const express = require("express");
const UploadController = require("../controllers/UploadController");
const router = express.Router();
const multer = require("multer");

// Cấu hình Multer để lưu file vào thư mục 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Khởi tạo multer với cấu hình lưu trữ đã được định nghĩa
const upload = multer({ storage: storage });

// Định nghĩa route upload file
router.post("/upload", upload.single("file"), UploadController.uploadFile);

module.exports = router;
