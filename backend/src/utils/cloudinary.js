const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteImageFromCloudinary = async (imageUrl) => {
    try {
        const parts = imageUrl.split("/");

        const fileName = parts.pop().split(".")[0];

        const folder = parts.slice(parts.indexOf("upload") + 2).join("/");

        const publicId = `${folder}/${fileName}`;

        await cloudinary.uploader.destroy(publicId);

        return true;

    } catch (error) {
        console.error("Cloudinary Delete Error:", error);
        throw error;
    }
};

module.exports = {
    deleteImageFromCloudinary,
};