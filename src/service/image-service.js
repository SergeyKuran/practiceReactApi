import axios from 'axios';

const API_KEY = '5yLdReu0aJ1AU7V6znvRpGjaiH5Px2OjlPIKaiYysWZSP0XsB8rT1ZmR';
axios.defaults.baseURL = 'https://apiv.pexelsssssssssssssssssss.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query, page) => {
  const { data } = await axios.get(`search?query=${query}&page=${page}`);
  return data;
};
