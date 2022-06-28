import axios from "./axios";

// const userImages = (userId) =>
//   `http://smear-backend.test/api/v1/users/${userId}/uploads`;

const folderImages = (folderId) =>
  `https://smi-laravel.fly.dev/api/v1/folders/${folderId}/uploads?page=1`;
// TODO change once endpoint to get all images exists
const homeImages = `https://smi-laravel.fly.dev/api/v1/folders/8/uploads?page=1`;

const createFolderGallery = (folderId) => {
  const url = folderId ? folderImages(folderId) : homeImages;
  const headersGet = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + sessionStorage.getItem("Auth Token"),
  };
  return axios
    .get(url, { headers: headersGet })
    .then((x) => {
      return x.data;
    })
    .catch((error) => console.log(error));
};

const headers = {
  "Content-Type": "multipart/form-data",
  Accept: "application/json",
  Authorization: "Bearer " + sessionStorage.getItem("Auth Token"),
};

const uploadUrl = (folder) =>
  `https://smi-laravel.fly.dev/api/v1/folders/${folder}/uploads`;

const uploadImage = async (folderId, newUpload, tags) => {
  const formData = new FormData();
  formData.append("file", newUpload);

  tags.forEach((el) => formData.append("tags[]", el.value));

  return axios
    .post(uploadUrl(folderId), formData, { headers: headers })
    .then((y) => {
      console.log(y.data);
      return y;
    })
    .catch((error) => console.log(error));
};

const createTagUrl = `https://smi-laravel.fly.dev/api/v1/tags`;

const uploadTag = async (tag) => {
  console.log(tag);
  return axios
    .post(createTagUrl, { name: tag }, { headers: headers })
    .then((z) => {
      console.log(z.data);
      return z.data;
    })
    .catch((error) => console.log(error));
};

const allTagsUrl = `http://smi-laravel.fly.dev/api/v1/tags`;

const getAllTags = () => {
  return axios
    .get(allTagsUrl, { headers: headers })
    .then((x) => {
      console.log(x.data);
      return x.data;
    })
    .catch((error) => console.log(error));
};

const imagesServices = {
  createFolderGallery,
  uploadImage,
  uploadTag,
  getAllTags,
};

export default imagesServices;
