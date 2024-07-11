import iziToast from 'izitoast';
import { renderImgCard } from './js/render-function.js';
import { getPicturesByQuery } from './js/pixabay-api.js';

const searchForm = document.querySelector('.search-form');
const loader = document.querySelector('.loader');

searchForm.addEventListener('submit', handlerSearch);

function handlerSearch(evt) {
  evt.preventDefault();

  const form = evt.currentTarget;
  const queryValue = form.elements.query.value.trim().toLowerCase();

  if (!queryValue) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
      position: 'topRight',
      timeout: 2000,
    });
    return;
  }

  showLoader();

  getPicturesByQuery(queryValue)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.warning({
          title: 'Warning',
          message: 'Nothing found for your request.',
          position: 'topRight',
          timeout: 2000,
        });
      } else {
        renderImgCard(data.hits);
      }
    })
    .catch(onFetchError)
    .finally(() => {
      hideLoader();
      form.reset();
    });
}

function onFetchError(err) {
  console.error('Fetch Error:', err);
  hideLoader();
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}
