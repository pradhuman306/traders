import axios from 'axios';

export const get = (url) => axios.get(url);

export const post = (url, data) => axios.post(url, data);

export const remove = (url) => axios.delete(url);

export const put = (url, data) => axios.put(url, data);
