import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://yahoo-finance127.p.rapidapi.com/search/cba.ax',
  headers: {
    'X-RapidAPI-Key': '250da071b0mshbf74f527dca6feep16895bjsnfccff7f73612',
    'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}