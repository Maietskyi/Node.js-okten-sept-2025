import multer from "multer";
import path from "node:path";
import { v6 } from "uuid";
import { ApiError } from "../errors/api.error";
import { StatusCodeEnum } from "../enums/status-codes";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), "upload"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = v6();
        const ext = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /.jpeg|.jpg|.png|.gif/;
    console.log(path.extname(file.originalname).toLowerCase(), "11111111111111111111111111111111111");
    console.log(file.mimetype, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else
        cb(new ApiError("Only images are allowed", StatusCodeEnum.BED_REQUEST));
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, //5mb
    fileFilter: fileFilter,
});

export { upload };