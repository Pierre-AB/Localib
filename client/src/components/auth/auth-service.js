import axios from 'axios';

const service = axios.create({
  baseURL: `${process.env.REACT_APP_APIURL || ""}/api`,
  withCredentials: true
});
export default service;

function consumerSignup(email, password, type) {
  return service.post('/consumerSignup', { email, password, type }).then(response => response.data)
}
export { consumerSignup }

function loggedIn() {
  return service.get('/loggedIn').then(response => response.data)
}
export { loggedIn }

function login(username, password) {
  return service.post('/login', { username, password }).then(response => response.data)
}
export { login }

function logout() {
  return service.post('/logout', {}).then(response => response.data)
}
export {logout}