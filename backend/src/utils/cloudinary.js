import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

export const uploadToCloudinary = async (filePath, resourceType) => {
  return await cloudinary.uploader.upload(filePath, {
    resource_type: resourceType,
  });
};
