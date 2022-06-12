import axios from "axios";

const avatarUrl = "http://smear-backend.test/api/v1/avatars";

const getAvatar = () => {
  return axios.get(avatarUrl);
};

const avatarServices = { getAvatar };
export default avatarServices;
