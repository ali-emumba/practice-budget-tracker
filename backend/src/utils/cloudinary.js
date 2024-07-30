import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCLoudinary = async (filePath) => {
  try {
    if (!filePath) {
      return null;
    }
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    console.log("file uploaded successfully", result);
    return result;
  } catch (error) {
    fs.unlinkSync(filePath);
    // remove file from server if it is not uploaded to cloudinary successfully to save space on server
    console.log("cloudinary uploading error", error);
  }
};

export { uploadOnCLoudinary };
