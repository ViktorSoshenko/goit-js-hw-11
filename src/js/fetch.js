export function fetchImage(name) {
  const BASE_URL = `https://pixabay.com/api/?key=35497735-411f01a289f525705140a14cf`;
  return fetch(
    `${BASE_URL}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=2`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
}
