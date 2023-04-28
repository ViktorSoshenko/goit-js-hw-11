export function cartImage(hits) {
  return hits
    .map(
      hit => `<div class="photo-card">
    <a class="gallery__link" href="${hit.largeImageURL}"><img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" class="image" /></a>
    <div class="info">
      <p class="info-item">${hit.likes}
        <b>Likes: </b>
      </p>
      <p class="info-item">${hit.views}
        <b>Views: </b>
      </p>
      <p class="info-item">${hit.comments}
        <b>Comments: </b>
      </p>
      <p class="info-item"> ${hit.downloads}
        <b>Downloads:</b>
      </p>
    </div>
  </div>`
    )
    .join('');
}
