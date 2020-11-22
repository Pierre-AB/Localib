import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
});
export default service;

function storesDistance( latlng ) {
  return service.get('/stores/distances/:latlng', { latlng }).then(response => response.data)
}
export {storesDistance}

function storesRadius( zipcode, distance ) {
  return service.get('/stores/zipcode/:zipcode/distance/:distance', { zipcode, distance }).then(response => response.data)
}
export {storesRadius}