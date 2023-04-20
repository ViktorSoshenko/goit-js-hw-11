import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchImage } from './js/fetch';

const form = document.querySelector('#search-form');
console.log(form);
const input = document.querySelector('input');
console.log(input);
const boxImages = document.querySelector('.gallery');
console.log(boxImages);
let inputSerch = '';
form.addEventListener('submit', callSubmit);

function callSubmit(event) {
  event.preventDefault();
  inputSerch = input.value.trim();
  if (inputSerch === '') {
    clearAll();

    return;
  } else {
    fetchImage(inputSerch)
      .then(images => {
        const arr = images.hits;

        cartImage(arr);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

function cartImage(images) {
  clearAll();
  console.log(images.length);
  if (images.length === 0) {
    Notiflix.Notify.warning(
      '"Sorry, there are no images matching your search query. Please try again."'
    );
  } else {
    const markup = images
      .map(imag => {
        return `<div class="photo-card">
  <img src="${imag.webformatURL}" alt="#" loading="lazy" height=400px width = 600px/>
  <div class="info">
    <p class="info-item">
      <b>Likes :${imag.likes}</b>
    </p>
    <p class="info-item">
      <b>Views :${imag.views}</b>
    </p>
    <p class="info-item">
      <b>Comments :${imag.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads :${imag.downloads}</b>
    </p>
  </div>
</div>
      `;
      })
      .join('');

    boxImages.insertAdjacentHTML('beforeend', markup);
  }
}

function clearAll() {
  boxImages.innerHTML = '';
}
