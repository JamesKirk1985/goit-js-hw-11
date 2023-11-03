import axios from 'axios';

// const image_type = 'photo';
const orientation = 'horizontal';
const safesearch = true;

async function getPhotos(value, page = 1) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_kEY = '40414908-c5b127de93d48db35f1a240f6';
  const params = new URLSearchParams({
    key: API_kEY,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page,
  });
  const response = await axios.get(`${BASE_URL}?${params}`);
  return response.data;
}
export { getPhotos };
