// config/multer.js
import multer from "multer";

const storage = multer.memoryStorage(); // Store files in memory

const upload = multer({
  storage,
  limits: {
    fileSize: 500 * 1024, // Limit file size to 500KB
    files: 3, // Limit number of files to 3
  },
  fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Please upload an image file"));
    }
  },
});

export default upload;
