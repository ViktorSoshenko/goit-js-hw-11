import axios from 'axios';

export let page = 1;

export const perPage = 40;

export async function fetchImages(inputSerch) {
  const searchParams = new URLSearchParams({
    key: '35497735-411f01a289f525705140a14cf',
    q: inputSerch,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: perPage,
    page,
  });
  const images = await axios
    .get(`https://pixabay.com/api/?${searchParams}`)
    .then((page += 1));
  console.log(images.data);
  return images.data;
}

export function resetPage() {
  page = 1;
}
