import axios from 'axios';

axios.defaults.baseURL = "https://cafe-app-api.herokuapp.com/shops/geojson?token=eQqmJKdK3ikxNUD51gmp3A";
axios.defaults.headers.common = { 'Content-Type': 'application/json' };
// axios.defaults.headers.common = { 'Content-Transfer-Encoding': 'application/gzip' };
axios.defaults.responseType = 'json';

export const setClientToken = token => {
    axios.defaults.headers.common['x-auth-token'] = token;
};

export const removeClientToken = () => {
    delete axios.defaults.headers.common['x-auth-token'];
};

export default axios;