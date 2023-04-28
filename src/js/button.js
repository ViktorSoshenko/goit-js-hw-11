// export default class LoadMoreBtn {
//   constructor({ selector, isHidden = false }) {
//     this.button = this.getButton(selector);
//     if ((isHidden = true)) {
//       this.hide();
//     } else {
//       this.show();
//     }
//   }

//   getButton(selector) {
//     return document.querySelector(selector);
//   }
//   disable() {
//     // this.button.classList.add('hidden');
//     this.button.disabled = true;
//   }

//   anable() {
//     // this.button.classList.add('hidden');
//     this.button.disabled = false;
//   }
//   hide() {
//     this.button.classList.add('hidden');
//   }
//   show() {
//     this.button.classList.remove('hidden');
//   }
// }

// async function callSubmit(event) {
//   event.preventDefault();
//   page = 1;

//   loadMoreBt.classList.add('hidden');
//   clearAll();
//   const form = event.currentTarget;
//   inputSerch = form.elements.searchQuery.value.trim();
//   console.log(inputSerch);
//   await fetchImage(inputSerch, page, per_page)
//     .then(({ hits, totalHits }) => {
//       console.log(page);
//       console.log(per_page);
//       let division = Math.ceil(totalHits / per_page);
//       if (hits.length === 0 || inputSerch === '') {
//         Notiflix.Notify.failure(
//           `'"Sorry, there are no images matching your search query. Please try again."'`
//         );
//       } else {
//         Notiflix.Notify.info(`"Hooray! We found ${totalHits} images."`);

//         loadMoreBt.classList.remove('hidden');
//         const wert = hits.reduce((markup, hit) => markup + cartImage(hit), '');
//         boxImages.innerHTML = wert;

//         const lightbox = new SimpleLightbox('.gallery a', {
//           captionsData: 'alt',
//           captionPosition: 'bottom',
//           captionDelay: 250,
//           overlayOpacity: 0.9,
//           closeText: '+',
//           animationSlide: true,
//           animationSpeed: 250,
//         });
//         lightbox.refresh();
//         if (division === page) {
//           Notiflix.Notify.warning(
//             `'We're sorry, but you've reached the end of search results'`
//           );
//           loadMoreBt.classList.add('hidden');
//         }
//       }
//     })

//     .catch(error => {
//       console.log(error);
//     })
//     .finally(() => refs.form.reset());
// }
// function endlessScroll() {
//   fetchImage(inputSerch, page, per_page).then(({ hits, totalHits }) => {
//     console.log(hits);
//     console.log(page);
//     console.log(per_page);
//     // const names = hits.map(hit =>hit.);
//   });
// }

// let division = Math.ceil(totalHits / per_page);
// console.log(division);
// if (division === page) {
//   Notiflix.Notify.warning(
//     `'We're sorry, but you've reached the end of search results'`
//   );
//   loadMoreBt.classList.add('hidden');
// } else {
//         const wert = hits.reduce((callSubmit(), hit) => markup + cartImage(hit), '');

//         boxImages.insertAdjacentHTML('beforeend', wert);

//         const { height: cardHeight } = document
//           .querySelector('.gallery')
//           .firstElementChild.getBoundingClientRect();
//         window.scrollBy({
//           top: cardHeight * 2,
//           behavior: 'smooth',
//         });

//         const lightbox = new SimpleLightbox('.gallery a', {
//           captionsData: 'alt',
//           captionPosition: 'bottom',
//           captionDelay: 250,
//           overlayOpacity: 0.9,
//           closeText: '+',
//           animationSlide: true,
//           animationSpeed: 250,
//         });
//       }
//     })
//     .catch(error => {
//       console.log(error);
//     })
//     .finally(() => refs.form.reset());
// }
