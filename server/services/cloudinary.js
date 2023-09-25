const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "do9somcfd",
  api_key: "375162913183513",
  api_secret: "aZzXEgMS0fgaQEYm9wlU2nNJdO0",
});

uploadToCloudinary = (path, folder) => {
  return cloudinary.v2.uploader
    .upload(path, {
      resource_type: "image",
      folder,
    })
    .then((data) => {
      return { url: data.url, public_id: data.public_id, format: data.format };
    })
    .catch((error) => {
      console.log(error);
    });
};

const uploadToCloudinaryV = (path, folder) => {
  return cloudinary.v2.uploader.upload(path, {
    resource_type: "video",
    folder,
    chunk_size: 6000000,
    eager: [
      { format: "webm", transformation: [{ width: 640, height: 480 }] },
      { format: "mp4", transformation: [{ width: 640, height: 480 }] },
    ],
  });
};
removeFromCloudinary = async (public_id) => {
  await cloudinary.v2.uploader.destroy(public_id, function (error, result) {
    console.log(result, error);
  });
};

uploadToCloudinaryFile = (path, folder) => {
  return cloudinary.v2.uploader
    .upload(path, {
      resource_type: "auto",
      folder,
    })
    .then((data) => {
      return { url: data.url, public_id: data.public_id, format: data.format };
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  uploadToCloudinary,
  uploadToCloudinaryV,
  removeFromCloudinary,
  uploadToCloudinaryFile,
};
