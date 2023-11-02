import axios from 'axios';
const API_key = '40414908-c5b127de93d48db35f1a240f6';
const image_type = 'photo';
const orientation = 'horizontal';
const safesearch = true;

async function getPhotos(value, page = 1) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_key}&q=${value}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}&per_page=40&page=${page}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export { getPhotos };
