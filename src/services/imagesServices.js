import axios from "axios";

// const userImages = ``;

// const createGallery = (newGallery) => {
//     return axios.get(userImages, newGallery)
//     .then((x) => {
//         console.log(x.data);
//         return x.data;
//     }).catch((error) => console.log(error));
//  }

const uploadUrl = (folder) =>
  `https://smi-laravel.fly.dev/api/v1/folders/${folder}/uploads`;

const headers = {
  "Content-Type": "multipart/form-data",
  Accept: "application/json",
  Authorization: "Bearer " + sessionStorage.getItem("Auth Token"),
};

const uploadImage = async (folderId, newUpload, tags) => {
  const formData = new FormData();
  formData.append("file", newUpload);
  formData.append("tags", JSON.stringify([2]));

  console.log(formData.getAll("tags"));

  return axios
    .post(uploadUrl("2"), formData, { headers: headers }) // One should refrain from hard coding the folder id, init
    .then((y) => {
      console.log(y.data);
      return y.data;
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

const imagesServices = { uploadImage, uploadTag, getAllTags };

export default imagesServices;
