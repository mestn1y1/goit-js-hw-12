import iziToast from 'izitoast';
import { renderImgCard } from './js/render-function.js';
import { getPicturesByQuery } from './js/pixabay-api.js';
import loadMoreFunction from './js/loadMoreFunction.js';

const searchForm = document.querySelector('.search-form');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.button');
const spinner = document.querySelector('.spinner');
let query = '';
let page = 1; // Початкова сторінка

searchForm.addEventListener('submit', handlerSearch);

const params = {
  q: '',
  page: 1,
  per_page: 15,
  maxPage: 0,
};

loadMoreFunction.hide(loadMoreBtn);

async function handlerSearch(evt) {
  evt.preventDefault();

  const form = evt.currentTarget;
  query = form.elements.query.value.trim().toLowerCase(); // Оновлюємо глобальну змінну query

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
      position: 'topRight',
      timeout: 2000,
    });
    return;
  }
  page = 1; // Скидаємо сторінку до початкового значення
  showLoader();
  loadMoreFunction.show(loadMoreBtn);
  loadMoreFunction.disable(loadMoreBtn, spinner);

  try {
    const { hits, total } = await getPicturesByQuery(query, page);
    // розрахунок максимальної сторінки
    params.maxPage = Math.ceil(total / params.per_page);

    console.log(params.maxPage);

    if (hits.length === 0) {
      iziToast.warning({
        title: 'Warning',
        message: 'Nothing found for your request.',
        position: 'topRight',
        timeout: 2000,
      });
    } else {
      renderImgCard(hits);
    }

    console.log(hits, total);

    // Перевірка, чи потрібно показувати кнопку "Завантажити ще"
    if (hits.length !== total) {
      loadMoreFunction.enable(loadMoreBtn, spinner);
      loadMoreBtn.addEventListener('click', handleLoadMore);
    } else {
      loadMoreFunction.hide(loadMoreBtn);
    }
  } catch (error) {
    onFetchError(error);
  } finally {
    hideLoader();
    form.reset();
  }
}

async function handleLoadMore() {
  page += 1; // Збільшуємо сторінку для наступного запиту
  loadMoreFunction.disable(loadMoreBtn, spinner);

  try {
    const { hits } = await getPicturesByQuery(query, page); // Використовуємо оновлене значення query і page

    // Малюємо нові зображення
    renderImgCard(hits);
  } catch (err) {
    console.log(err);
  } finally {
    loadMoreFunction.enable(loadMoreBtn, spinner);

    // Перевіряємо, чи досягли максимальної сторінки
    if (page === params.maxPage) {
      loadMoreFunction.hide(loadMoreBtn);
      loadMoreBtn.removeEventListener('click', handleLoadMore);
    }
  }
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
