import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
});
export default service;

function createProduct(name, store_id, description, picture, price, category,Tags) {
  return service.post('/products', {name, store_id, description, picture, price, category,Tags}).then(response => response.data)
}
export {createProduct}