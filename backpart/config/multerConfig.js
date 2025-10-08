const multer = require("multer");
const path = require("path");
const appConfig = require("./appConfig");
// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Use the absolute path directly from the appConfig
        cb(null, appConfig.baseUploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File filter for PDF
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === "application/pdf") {
//         cb(null, true);
//     } else {
//         cb(new Error("Only PDF files are allowed!"), false);
//     }
// };

// Export the configured multer
const upload = multer({ storage: storage });

module.exports = upload;
