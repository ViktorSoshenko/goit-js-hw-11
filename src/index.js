import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import './css/styles.css';
import Notiflix from 'notiflix';

import { fetchImages, page, perPage, resetPage } from './js/fetch';
import { cartImage } from './js/cartImage';
import { onScroll } from './js/button';
// -----------------------------------------------------------------

// --------------------------------------------------
const refs = {
  form: document.getElementById('search-form'),
  input: document.querySelector('input'),
  buttonForm: document.querySelector('button'),
};
const boxImages = document.querySelector('.gallery');
const loadMoreBt = document.querySelector('.load-more');
loadMoreBt.classList.add('hidden');
refs.form.addEventListener('submit', callSubmit);

loadMoreBt.addEventListener('click', buttonFunctionClick);

let inputSerch = '';
let lightbox;
const options = {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  overlayOpacity: 0.9,
  closeText: '+',
  animationSlide: true,
  animationSpeed: 250,
};

async function callSubmit(event) {
  event.preventDefault();
  // resetPage();
  loadMoreBt.classList.add('hidden');
  clearAll();
  inputSerch = refs.input.value.trim();
  if (inputSerch === '') {
    clearAll();
    loadMoreBt.classList.add('hidden');
    Notiflix.Notify.info(
      `'"Sorry, there are no images matching your search query. Please try again."'`
    );
    return;
  } else {
    try {
      resetPage();
      console.log(`wert${page}`);
      const result = await fetchImages(inputSerch);
      console.log(`trew${page}`);
      // resetPage();
      if (result.hits.length < 1) {
        refs.form.reset();
        clearAll();
        loadMoreBt.classList.add('hidden');
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
      } else {
        clearAll();
        refs.form.reset();

        boxImages.innerHTML = cartImage(result.hits);

        const { height: cardHeight } = document
          .querySelector('.gallery')
          .firstElementChild.getBoundingClientRect();
        window.scrollBy({
          top: cardHeight * 0,
          behavior: 'smooth',
        });
        lightbox = new SimpleLightbox('.gallery a', options).refresh();
        loadMoreBt.classList.remove('hidden');
        Notiflix.Notify.success(
          `"Hooray! We found ${result.totalHits} images."`
        );
        if (result.hits.length < perPage) {
          loadMoreBt.classList.add('hidden');
        }
      }
    } catch (error) {
      clearAll();
      loadMoreBt.classList.add('hidden');
      Notiflix.Report.info(
        'Oh',
        'Something get wrong, please try again',
        'Okay'
      );
    }
  }
}

// --------------------------------------------

async function buttonFunctionClick(e) {
  try {
    const result = await fetchImages(inputSerch);

    let division = Math.ceil(result.totalHits / perPage);

    // let sumImg = page - 1;

    if (page > division) {
      const wert = cartImage(result.hits);
      boxImages.insertAdjacentHTML('beforeend', wert);
      Notiflix.Notify.warning(
        `'We're sorry, but you've reached the end of search results'`
      );
      loadMoreBt.classList.add('hidden');
    } else {
      // const wert = hits.reduce((markup, hit) => markup + cartImage(), '');
      const wert = cartImage(result.hits);
      boxImages.insertAdjacentHTML('beforeend', wert);

      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });

      lightbox = new SimpleLightbox('.gallery a', options).refresh();
    }
  } catch (error) {
    console.log(error);
  }
}

function clearAll() {
  boxImages.innerHTML = '';
}

document.documentElement.getBoundingClientRect().top = 0;
document.documentElement.getBoundingClientRect().bottom = 0;
window.addEventListener('scroll', populate);

async function populate() {
  while (true) {
    // нижня частина документа
    let windowRelativeBottom =
      document.documentElement.getBoundingClientRect().bottom;

    // якщо користувач не прокрутив достатньо далеко (>100px до кінця)
    if (windowRelativeBottom > document.documentElement.clientHeight + 1) break;

    try {
      console.log(page);
      const result = await fetchImages(inputSerch);
      console.log(page);

      let division = Math.ceil(result.totalHits / perPage + 1);
      // let sumImg = page - 1;
      const wert = cartImage(result.hits);
      boxImages.insertAdjacentHTML('beforeend', wert);
      window.removeEventListener('click', populate);

      // console.log(sumImg);
      // console.log(division);
      // const we = perPage * sumImg;
      if (page === division) {
        window.removeEventListener('click', populate);
        //refs.form.reset();
        //const wert = cartImage(result.hits);
        //boxImages.insertAdjacentHTML('beforeend', wert);
        loadMoreBt.classList.add('hidden');
        // console.log(result.totalHits);
        // console.log(we);
        // alert(`''Oh', 'Images is over', 'Okay''`);
        Notiflix.Report.info('Oh', 'Images is over', 'Okay');
      } else {
        const { height: cardHeight } = document
          .querySelector('.gallery')
          .firstElementChild.getBoundingClientRect();
        window.scrollBy({
          top: cardHeight * 0,
          behavior: 'smooth',
        });
        lightbox = new SimpleLightbox('.gallery a', options).refresh();
        // console.log(sumImg);
        // console.log(division);
        // console.log(result.totalHits);
        // console.log(we);
        // const wert = cartImage(result.hits);
        // boxImages.insertAdjacentHTML('beforeend', wert);
      }
    } catch (error) {
      console.log(error);
    }
    return;
  }
}
