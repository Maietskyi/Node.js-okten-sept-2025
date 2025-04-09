import multer from "multer";
import path from "path";
import { v6 } from "uuid";
import { ApiError } from "../errors/api.error";
import { StatusCodeEnum } from "../enums/status-codes";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = v6();
        const ext = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpg|jpeg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const minetype = allowedTypes.test(file.minetype);

    if (extname && minetype) {
        return cb(null, true);
    } else {
        cb(new ApiError("Only images are allowed", StatusCodeEnum.BED_REQUEST));
    }
};

const upload = multer ({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5mb
    fileFilter: fileFilter,
});

export { upload };