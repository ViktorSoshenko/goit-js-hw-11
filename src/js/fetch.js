const BASE_URL = `https://pixabay.com/api/?`;
const API_KEY = 'key=35497735-411f01a289f525705140a14cf';

function fetchImage(name, page, per_page) {
  return fetch(
    `${BASE_URL}${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${per_page}&page=${page}`
  ).then(data => data.json());

  // .then(({ articles }) => console.log(articles));

  // { if (response.ok) {

  //     return response.json();
  //   }
  //   throw new Error(response.statusText);
  // });
}
export { fetchImage };

// export default class FetchImage {
//   static BASE_URL = `https://pixabay.com/api/`;
//   static API_KEY = 'key=35497735-411f01a289f525705140a14cf';
//   constructor() {
//     this.query = '';
//     this.page = 1;
//   }
//   getImage() {
//     const url = `${FetchImage.BASE_URL}?${FetchImage.API_KEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
//     return fetch(url).then(data => data.json());
//   }
//   oldPage() {
//     this.page = 1;
//   }
//   newPage() {
//     this.page += 1;
//   }
// }
