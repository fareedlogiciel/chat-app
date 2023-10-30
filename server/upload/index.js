const multer = require("multer");

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "storage/");
  },
  filename: (req, file, cb) => {
    const fileName = Date?.now() + "-" + file?.originalname;
    cb(null, fileName);
  },
});

// Create the multer instance
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 1000, // 1 GB (storage limit)
  },
});

module.exports = upload;
