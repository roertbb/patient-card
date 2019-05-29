import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/baseDstu3/'
});

export default instance;
