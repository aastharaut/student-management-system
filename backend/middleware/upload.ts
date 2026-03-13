import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../constants/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "student_profiles",
      public_id: Date.now() + "-" + file.originalname.split(".")[0],
    };
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
