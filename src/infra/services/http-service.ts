import axios from 'axios';
import {Alert} from 'react-native';
import {config} from '../config/api';

const instance = axios.create({
  baseURL: config.baseUrl || 'https://dummyjson.com',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
instance.interceptors.request.use(async (config: any) => {
  config.params = config.params || {};
  config.params.requestOrigin = 'ap';
  config.headers['Access-Control-Allow-Origin'] = '*';
  return config;
});

instance.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    //Expected errors for debugging
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      Alert.alert('Something went wrong, Please try again later');
    } else {
      /**
       * Logged out user, this status come only if user are not authenticated,
       incase users token expired and he's still loggedIn
       when he make a request then he will kickout from the dashbaord
       */
      if (error.response.status === 401) {
        // store.dispatch(logout());
        Alert.alert(error.response.data.message);
      }

      if (error.response.status === 403) {
        if (error.response.data && error.response.data.message) {
          Alert.alert(error.response.data.message);
        }
      }
      if (error.response.status === 400) {
        if (error.response.data && error.response.data.message) {
          Alert.alert(error.response.data.message);
        }
      }
      if (error.response.status === 404) {
        if (error.response.data && error.response.data.message) {
          Alert.alert(error.response.data.message);
        }
      }
    }
    // return promise, if u need error status in your local component as well...
    return Promise.reject(error);
  },
);

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
};
