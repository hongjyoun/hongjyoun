import axios from 'axios';

function createInstance() {
	return axios.create({
		baseURL: 'https://lakeg.choonpoong.com/api/adm',
		// baseURL: 'http://localhost:3085',
	});
}
const instance = createInstance();

export default instance;
