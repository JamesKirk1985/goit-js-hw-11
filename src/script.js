import { getPhotos } from './api.js';
import { Report } from 'notiflix/build/notiflix-report-aio';

const formElement = document.querySelector('.search-form');
const galleryElement = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
let page = 1;
formElement.addEventListener('submit', handlerClick);
loadMore.addEventListener('click', loadMoreFunc);

function handlerClick(evt) {
  evt.preventDefault();
  galleryElement.innerHTML = '';
  let q = formElement.searchQuery.value;
  let arrPhoto = [];
  getPhotos(q).then(res => {
    arrPhoto = res.hits;
    addMarkup(arrPhoto);
    loadMore.hidden = false;
    if (arrPhoto.length === 0) {
      Report.failure(
        '',
        'Sorry, there are no images matching your search query. Please try again.',
        'Ok'
      );
      loadMore.hidden = true;
      formElement.reset();
    }
    if (res.total <= page * 40) {
      loadMore.hidden = true;
    }
  });
}

function loadMoreFunc() {
  page += 1;
  let q = formElement.searchQuery.value;
  let arrPhoto = [];
  getPhotos(q, page).then(res => {
    arrPhoto = res.hits;
    loadMore.hidden = false;
    console.log(arrPhoto.length);
    addMarkup(arrPhoto);
    if (res.total <= page * 40) {
      console.log(res.total);
      loadMore.hidden = true;
      Report.info(
        '',
        "We're sorry, but you've reached the end of search results.",
        'Ok'
      );
    }
  });
}
function addMarkup(arr) {
  const markup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" class="photo" loading="lazy" width="300" height="200"/>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          <span>${likes}</span>
        </p>
        <p class="info-item">
          <b>Views</b>
          <span>${views}</span>
        </p>
        <p class="info-item">
          <b>Comments</b>
          <span>${comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads</b>
          <span>${downloads}</span>
        </p>
      </div>      
    </div>`;
      }
    )
    .join('');
  galleryElement.insertAdjacentHTML('beforeend', markup);
}
