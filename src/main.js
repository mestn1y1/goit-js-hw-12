// import iziToast from 'izitoast';
// import { renderImgCard } from './js/render-function.js';
// import { getPicturesByQuery } from './js/pixabay-api.js';
// import loadMoreFunction from './js/loadMoreFunction.js';

// const searchForm = document.querySelector('.search-form');
// const loader = document.querySelector('.loader');
// const loadMoreBtn = document.querySelector('.button');
// const spinner = document.querySelector('.spinner');

// let query = '';
// let page = 1;

// searchForm.addEventListener('submit', handlerSearch);

// const params = {
//   q: '',
//   page: 1,
//   per_page: 15,
//   maxPage: 0,
// };

// loadMoreFunction.hide(loadMoreBtn);

// async function handlerSearch(evt) {
//   evt.preventDefault();
//   const form = evt.currentTarget;
//   query = form.elements.query.value.trim().toLowerCase();

//   if (!query) {
//     iziToast.error({
//       title: 'Error',
//       message: 'Please enter a search query.',
//       position: 'topRight',
//       timeout: 2000,
//     });
//     return;
//   }

//   galleryList.innerHTML = ''; // Очистимо вміст галереї перед новим запитом
//   page = 1;
//   showLoader();
//   loadMoreFunction.show(loadMoreBtn);
//   loadMoreFunction.disable(loadMoreBtn, spinner);

//   try {
//     const { hits, total } = await getPicturesByQuery(
//       query,
//       page,
//       params.per_page
//     );
//     // розрахунок максимальної сторінки
//     params.maxPage = Math.ceil(total / params.per_page);

//     console.log(params.maxPage);

//     if (hits.length === 0) {
//       iziToast.warning({
//         title: 'Warning',
//         message: 'Nothing found for your request.',
//         position: 'topRight',
//         timeout: 2000,
//       });
//     } else {
//       renderImgCard(hits);
//     }

//     console.log(hits, total);

//     if (hits.length !== total) {
//       loadMoreFunction.enable(loadMoreBtn, spinner);
//       loadMoreBtn.addEventListener('click', handleLoadMore);
//     } else {
//       loadMoreFunction.hide(loadMoreBtn);
//     }
//   } catch (error) {
//     onFetchError(error);
//   } finally {
//     hideLoader();
//     form.reset();
//   }
// }

// async function handleLoadMore() {
//   page += 1;
//   loadMoreFunction.disable(loadMoreBtn, spinner);

//   try {
//     const { hits } = await getPicturesByQuery(query, page, params.per_page);

//     renderImgCard(hits);
//   } catch (err) {
//     console.log(err);
//   } finally {
//     loadMoreFunction.enable(loadMoreBtn, spinner);

//     // Перевіряємо, чи досягли максимальної сторінки
//     if (page === params.maxPage) {
//       loadMoreFunction.hide(loadMoreBtn);
//       loadMoreBtn.removeEventListener('click', handleLoadMore);
//     }
//   }
// }

// function onFetchError(err) {
//   console.error('Fetch Error:', err);
//   hideLoader();
// }

// function showLoader() {
//   loader.style.display = 'block';
// }

// function hideLoader() {
//   loader.style.display = 'none';
// }

import iziToast from 'izitoast';
import { renderImgCard } from './js/render-function.js';
import { getPicturesByQuery } from './js/pixabay-api.js';
import loadMoreFunction from './js/loadMoreFunction.js';

const searchForm = document.querySelector('.search-form');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.button');
const spinner = document.querySelector('.spinner');
let query = '';
let page = 1;
let galleryList;

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
  query = form.elements.query.value.trim().toLowerCase();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
      position: 'topRight',
      timeout: 2000,
    });
    return;
  }

  // Шукаємо galleryList і зберігаємо посилання на нього
  galleryList = document.querySelector('.gallery');

  if (!galleryList) {
    console.error('Element with class "gallery-list" not found.');
    return;
  }

  galleryList.innerHTML = ''; // Очистка вмісту галереї перед новим запитом

  page = 1;
  loadMoreFunction.show(loadMoreBtn);
  loadMoreFunction.disable(loadMoreBtn, spinner);

  try {
    const { hits, total } = await getPicturesByQuery(
      query,
      page,
      params.per_page
    );
    params.maxPage = Math.ceil(total / params.per_page);

    if (hits.length === 0) {
      iziToast.warning({
        title: 'Warning',
        message: 'Nothing found for your request.',
        position: 'topRight',
        timeout: 2000,
      });
    } else {
      renderImgCard(hits);
      galleryList.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (hits.length !== total) {
      loadMoreFunction.enable(loadMoreBtn, spinner);
      loadMoreBtn.addEventListener('click', handleLoadMore);
    } else {
      loadMoreFunction.hide(loadMoreBtn);
    }
  } catch (error) {
    onFetchError(error);
  } finally {
    form.reset();
  }
}

async function handleLoadMore() {
  page += 1;
  loadMoreFunction.disable(loadMoreBtn, spinner);

  try {
    const { hits } = await getPicturesByQuery(query, page, params.per_page);
    renderImgCard(hits);

    const { height: cardHeight } =
      galleryList.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2, // Прокручувати на висоту двох карток
      behavior: 'smooth',
    });
  } catch (err) {
    console.log(err);
  } finally {
    loadMoreFunction.enable(loadMoreBtn, spinner);

    // Перевіряємо, чи досягли максимальної сторінки
    if (page === params.maxPage) {
      loadMoreFunction.hide(loadMoreBtn);
      loadMoreBtn.removeEventListener('click', handleLoadMore);
      iziToast.show({
        title: 'No more results',
        message: 'No more results available.',
        position: 'bottomRight',
        theme: 'blue',
        timeout: 3000,
        progressBarColor: '#444444',
        icon: 'fa fa-info-circle',
      });
    }
  }
}

function onFetchError(err) {
  console.error('Fetch Error:', err);
}
