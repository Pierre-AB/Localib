import axios from 'axios';


const service = axios.create({
  baseURL: `${process.env.REACT_APP_APIURL || ""}/api`,
  withCredentials: true
});
export default service;

function storesDistance( latlng ) {
  return service.get(`/stores/distances/48.794850700000005,2.4614814`, { latlng }).then(response => response.data)
}
export {storesDistance}

function storesRadius( zipcode, distance ) {
  return service.get('/stores/zipcode/:zipcode/distance/:distance', { zipcode, distance }).then(response => response.data)
}
export {storesRadius}