import axios from 'axios'

const BASEURL=(process.env.NODE_ENV === 'production') ? '/dhclf/api' : '/api';
const service=axios.create({
  baseURL: BASEURL,
  timeout: 5000,
});

service.interceptors.request.use(function(config){

  return config;
},function(error){

  return Promise.reject(error);
})

service.interceptors.response.use(function(response){

  return response;
},function(error){

  return Promise.reject(error);
})


export default service;