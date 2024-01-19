const multer = require('multer');

const profileUpload = multer({
    fileFilter: (req, file, callback) => {
        if (file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpeg') {
            callback(null, true);
        }
        else {
            callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
});

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'resumes/');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + file.originalname);
    }
})
const resumeUpload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype === 'application/pdf') {
            callback(null, true);
        }
        else {
            callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
});

module.exports = {
    profileUpload,
    resumeUpload
}