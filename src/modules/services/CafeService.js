import axios from '@utils/axios';

const CafeService = {
    fetchFeatures: function (country) {
        return axios.get().then((response) => {
            return response.data;
        });
    }
}

export default CafeService;