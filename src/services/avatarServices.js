import axios from "./axios";

const avatarUrl = "https://smi-laravel.fly.dev/api/v1/avatars";

const getAvatar = () => {
  return axios.get(avatarUrl);
};

const avatarServices = { getAvatar };
export default avatarServices;
