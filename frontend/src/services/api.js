import axios from 'axios';

const api = axios.create({
  baseURL: 'http://backend:3000/api', // Docker: usamos el nombre del contenedor
});

export default api;
