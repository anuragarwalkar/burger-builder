import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-2540d.firebaseio.com/'
})

export default instance;