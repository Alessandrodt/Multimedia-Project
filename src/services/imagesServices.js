import axios from "./axios";

const userImages = (userId, pageNumber, searchParams) => {
  let url = `http://smi-laravel.fly.dev/api/v1/users/${userId}/uploads?page=${pageNumber}`;

  if (searchParams.tags && searchParams.tags.length >= 1) {
    const tags = searchParams.tags.map((_) => _.value).join();
    url += `&filter[tags]=0,${tags}`;
  }

  console.log(searchParams.date);

  if (searchParams.date && searchParams.date[0]) {
    if (!searchParams.date[1]) {
      url += `&filter[created_at_to]=${
        searchParams.date[0].toISOString().split("T")[0]
      }`;
    } else {
      url += `&filter[created_at_between]=${
        searchParams.date[1].toISOString().split("T")[0]
      },${searchParams.date[0].toISOString().split("T")[0]}`;
    }

    console.log(url);
  }

  return url;
};

const headersGet = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: "Bearer " + sessionStorage.getItem("Auth Token"),
};

const folderImages = (folderId, pageNumber) =>
  `https://smi-laravel.fly.dev/api/v1/folders/${folderId}/uploads?page=${pageNumber}`;

/**
 *
 * @param {number} folderId - if defined get images in folder, if not defined get user images
 * @param {number} pageNumber - current page
 * @returns the JSON with the images and the pagination details
 */
const loadImages = (folderId, userId, pageNumber, searchParams) => {
  const url = folderId
    ? folderImages(folderId, pageNumber)
    : userImages(userId, pageNumber, searchParams);
  const headersGet = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + sessionStorage.getItem("Auth Token"),
  };
  return axios
    .get(url, { headers: headersGet })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => console.log(error));
};

const imageDetailUrl = (id) =>
  `http://smi-laravel.fly.dev/api/v1/uploads/${id}`;

const loadImageDetail = (idImage) => {
  return axios
    .get(imageDetailUrl(idImage), { headers: headersGet })
    .then((response) => {
      console.log(response.data);
      return response;
    });
};

const headers = {
  "Content-Type": "multipart/form-data",
  Accept: "application/json",
  Authorization: "Bearer " + sessionStorage.getItem("Auth Token"),
};

const uploadUrl = (folder) =>
  `https://smi-laravel.fly.dev/api/v1/folders/${folder}/uploads`;

/**
 *
 * @param {number} folderId
 * @param {image} newUpload
 * @param {array} tags
 * @returns 201 response when succesful and the JSON with the uploaded image
 */
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

/**
 *
 * @param {string} tag
 * @returns 201 response when succesful
 */
const uploadTag = async (tag) => {
  return axios
    .post(createTagUrl, { name: tag }, { headers: headers })
    .then((z) => {
      console.log(z.data);
      return z.data;
    })
    .catch((error) => console.log(error));
};

const allTagsUrl = `http://smi-laravel.fly.dev/api/v1/tags`;

/**
 *
 * @returns an array of all the tags in the database
 */
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
  loadImages,
  uploadImage,
  uploadTag,
  getAllTags,
  loadImageDetail,
};

export default imagesServices;
