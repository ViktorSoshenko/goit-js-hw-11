import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import './css/styles.css';
import Notiflix from 'notiflix';
import FetchImage from './js/fetch';
import LoadMoreBtn from './js/button';
import { fetchImage } from './js/fetch';

// -----------------------------------------------------------------
const refs = {
  form: document.getElementById('search-form'),
  input: document.querySelector('input'),
  buttonForm: document.querySelector('button'),
};
const loadMoreBt = document.querySelector('.load-more');
loadMoreBt.classList.add('hidden');
console.log(loadMoreBt);
refs.form.addEventListener('submit', callSubmit);
loadMoreBt.addEventListener('click', buttonFunctionClick);

let inputSerch = '';
const boxImages = document.querySelector('.gallery');

let page;
let per_page = 40;

// document.documentElement.getBoundingClientRect().top = 0;
// document.documentElement.getBoundingClientRect().bottom = 1044;
// window.addEventListener('scroll', populate);
// function populate(event) {
//   while (true) {
//     // нижня частина документа
//     let windowRelativeBottom =
//       document.documentElement.getBoundingClientRect().bottom;

//     // якщо користувач не прокрутив достатньо далеко (>100px до кінця)
//     if (windowRelativeBottom > document.documentElement.clientHeight + 50)
//       break;

//     // додамо більше даних

//     boxImages.insertAdjacentHTML('beforeend', buttonFunctionClick());
//   }
// }

function callSubmit(event) {
  event.preventDefault();
  page = 1;

  loadMoreBt.classList.add('hidden');
  clearAll();
  const form = event.currentTarget;
  inputSerch = form.elements.searchQuery.value.trim();
  console.log(inputSerch);
  fetchImage(inputSerch, page, per_page)
    .then(({ hits, totalHits }) => {
      let division = Math.ceil(totalHits / per_page);
      if (hits.length === 0 || inputSerch === '') {
        Notiflix.Notify.failure(
          `'"Sorry, there are no images matching your search query. Please try again."'`
        );
      } else {
        Notiflix.Notify.info(`"Hooray! We found ${totalHits} images."`);

        loadMoreBt.classList.remove('hidden');
        const wert = hits.reduce((markup, hit) => markup + cartImage(hit), '');
        boxImages.innerHTML = wert;

        const lightbox = new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
          captionPosition: 'bottom',
          captionDelay: 250,
          overlayOpacity: 0.9,
          closeText: '+',
          animationSlide: true,
          animationSpeed: 250,
        });
        lightbox.refresh();
        if (division === page) {
          Notiflix.Notify.warning(
            `'We're sorry, but you've reached the end of search results'`
          );
          loadMoreBt.classList.add('hidden');
        }
      }
    })

    .catch(error => {
      console.log(error);
    })
    .finally(() => refs.form.reset());
}

function cartImage(hit) {
  return `<div class="photo-card">
    <a class="gallery__link" href="${hit.largeImageURL}"><img src="${hit.webformatURL}" alt="#" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes :${hit.likes}</b>
      </p>
      <p class="info-item">
        <b>Views :${hit.views}</b>
      </p>
      <p class="info-item">
        <b>Comments :${hit.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads :${hit.downloads}</b>
      </p>
    </div>
  </div>
        `;
}

function buttonFunctionClick(e) {
  page += 1;
  fetchImage(inputSerch, page, per_page)
    .then(({ hits, totalHits }) => {
      console.log(totalHits);
      console.log(per_page);
      console.log(page);
      let division = Math.ceil(totalHits / per_page);
      console.log(division);
      if (division === page) {
        Notiflix.Notify.warning(
          `'We're sorry, but you've reached the end of search results'`
        );
        loadMoreBt.classList.add('hidden');
      } else {
        const wert = hits.reduce((markup, hit) => markup + cartImage(hit), '');

        boxImages.insertAdjacentHTML('beforeend', wert);

        const { height: cardHeight } = document
          .querySelector('.gallery')
          .firstElementChild.getBoundingClientRect();
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });

        const lightbox = new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
          captionPosition: 'bottom',
          captionDelay: 250,
          overlayOpacity: 0.9,
          closeText: '+',
          animationSlide: true,
          animationSpeed: 250,
        });
      }
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => refs.form.reset());
}

// let inputSerch = '';

// const fetchImageNew = new FetchImage();
// const loadMoreBt = new LoadMoreBtn({
//   selector: '.load-more',
//   isHidden: true,
// });

// console.log(loadMoreBt);
// refs.form.addEventListener('submit', callSubmit);
// refs.input.addEventListener('click', cleareInput);
// loadMoreBt.button.addEventListener('click', name);

// function cleareInput(event) {
//   event.preventDefault();
//   loadMoreBt.hide();
//   clearAll();
//   event.target.value = '';
// }

// function callSubmit(event) {
//   event.preventDefault();
//   inputSerch = refs.input.value.trim();
//   fetchImageNew.query = inputSerch;
//   console.log(fetchImageNew);
//   if (inputSerch === '') {
//     clearAll();

//     return;
//   } else {
//     fetchImageNew
//       .getImage(inputSerch)
//       .then(images => {
//         const arr = images.hits;
//         loadMoreBt.show();
//         cartImage(arr);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }
// }

// function cartImage(hits) {
//   clearAll();

//   if (hits.length === 0) {
//     Notiflix.Notify.warning(
//       '"Sorry, there are no images matching your search query. Please try again."'
//     );
//     loadMoreBt.hide();
//   } else {
//     const markup = images
//       .map(({ webformatURL, likes, views, comments, downloads }) => {
//         return `<div class="photo-card">
//   <img src="${webformatURL}" alt="#" loading="lazy" height=400px width = 600px/>
//   <div class="info">
//     <p class="info-item">
//       <b>Likes :${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views :${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments :${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads :${downloads}</b>
//     </p>
//   </div>
// </div>
//       `;
//       })
//       .join('');

//     boxImages.insertAdjacentHTML('beforeend', markup);
//   }
// }
// function fetchNewPage(event) {
//   fetchImageNew.page += 1;
//   console.log(fetchImageNew);
//   callSubmit(event) + callSubmit(event);
// }

// function name(event) {
//   fetchNewPage().then(data => data.json());
// }

// function fetchNewPage() {
//   return fetchImageNew.getImage().then(({ images }) => {
//     if (images.length === 0) throw new Error('No data!');
//     return images.reduce(
//       markup,
//       ({ webformatURL, likes, views, comments, downloads }) =>
//         markup + cartImage(images),
//       ''
//     );
//   });
// }

function clearAll() {
  boxImages.innerHTML = '';
}
