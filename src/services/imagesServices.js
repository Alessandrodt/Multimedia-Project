import axios from "axios";

// const userImages = ``;

// const createGallery = (newGallery) => {
//     return axios.get(userImages, newGallery)
//     .then((x) => {
//         console.log(x.data);
//         return x.data;
//     }).catch((error) => console.log(error));
//  }

const uploadUrl = `http://smear-backend.test/api/v1/folders/{folder}/uploads`;

const uploadImage = async (newUpload) => {
  return axios
    .post(uploadUrl, newUpload)
    .then((y) => {
      console.log(y.data);
      return y.data;
    })
    .catch((error) => console.log(error));
};

const imagesServices = { uploadImage };

export default imagesServices;
