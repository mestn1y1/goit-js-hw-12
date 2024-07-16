import iziToast from 'izitoast';
import { renderImgCard } from './js/render-function.js';
import { getPicturesByQuery } from './js/pixabay-api.js';
import loadMoreFunction from './js/loadMoreFunction.js';

const searchForm = document.querySelector('.search-form');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.button');
const spinner = document.querySelector('.spinner');
let query = '';
searchForm.addEventListener('submit', handlerSearch);

const params = {
  q: '',
  page: 1,
  per_page: 15,
  maxPage: 0,
};

loadMoreFunction.hide(loadMoreBtn);

//___________async function

async function handlerSearch(evt) {
  evt.preventDefault();

  const form = evt.currentTarget;
  const query = form.elements.query.value.trim().toLowerCase();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
      position: 'topRight',
      timeout: 2000,
    });
    return;
  }

  showLoader();
  loadMoreFunction.show(loadMoreBtn);
  loadMoreFunction.disable(loadMoreBtn, spinner);

  try {
    const { hits, total } = await getPicturesByQuery(query);
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

    //перевірка на те, що по-перше, у нас взагалі є результати, і на те, що кількість статей не дорівнює кількості всіх результатів (якщо вони рівні, то у нас не існує наступних сторінок)
    if (hits.length !== total) {
      // розблоковуємо кнопку для натискань
      loadMoreFunction.enable(loadMoreBtn, spinner);
      // коли кнопка розблокується і стане доступною для взаємодії - ми повісимо на неї обробник
      loadMoreBtn.addEventListener('click', handleLoadMore);
    } else {
      // ховаємо кнопку якщо немає результатів по запиту, або не існує наступної сторінки
      loadMoreFunction.hide(loadMoreBtn);
    }
  } catch (error) {
    onFetchError(error);
  } finally {
    hideLoader();
    form.reset();
  }
}

// функция кнопки по обработчику

async function handleLoadMore() {
  params.page += 1;
  loadMoreFunction.disable(loadMoreBtn, spinner);

  try {
    const { hits } = await getPicturesByQuery(query);

    // малюємо розмітку
    renderImgCard(hits);
  } catch (err) {
    console.log(err);
  } finally {
    // розблоковуємо кнопку для натискань
    loadMoreFunction.enable(loadMoreBtn, spinner);

    // якщо поточна сторінка рівна максимальні сторінці, то наступних сторінок не існує
    if (params.page === params.maxPage) {
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
