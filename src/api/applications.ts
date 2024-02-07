import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/applications';

export const getApplications = (page) => {
  const url = `${baseUrl}?_page=${page}&_limit=5`;
  return axios.get(url).then((response) => response.data);
};