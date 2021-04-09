import Axios from 'axios';

const axios = Axios.create({
  baseURL: `${
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_BACKEND_URL_DEV
      : process.env.REACT_APP_BACKEND_URL_PROD
  }`,
});

export default axios;
