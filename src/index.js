import Notiflix from 'notiflix';
import { fetchPhotos } from './api';
import { photosPerPage } from './api';

const form = document.querySelector('.search-form');
// const searchInput = document.querySelector('[name="searchQuery"]');
const searchInput = form.firstElementChild;
const gallery = document.querySelector('.gallery');
const loadMoreBtn = gallery.nextElementSibling;

function fillGallery(dataArray) {
  dataArray.forEach(element => {
    gallery.insertAdjacentHTML(
      'beforeend',
      `<div class="photo-card">
        <img class="photo" src="${element.webformatURL}" alt="${element.tags}" loading="lazy" width="238px" height="158px" />

        <div class="info">
          <p class="info-item">
            <b class="likes">Likes</b>
            <span>${element.likes}</span>
          </p>

          <p class="info-item">
            <b class="views">Views</b>
            <span>${element.views}</span>
          </p>

          <p class="info-item">
            <b class="comments">Comments</b>
            <span>${element.comments}</span>
          </p>

          <p class="info-item">
            <b class="downloads">Downloads</b>
            <span>${element.downloads}</span>
          </p>
        </div>
      </div>`
    );
  });
}

let searchQuery = '';
let pageNumber = 2;

form.addEventListener('submit', event => {
  event.preventDefault();
  searchQuery = event.currentTarget.firstElementChild.value;
  pageNumber = 2;

  loadMoreBtn.setAttribute('show-btn', 'false');

  if (searchQuery !== '') {
    fetchPhotos(searchQuery)
      .then(response => {
        console.log(response.data.hits);
        if (response.data.hits.length === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          gallery.innerHTML = '';
          fillGallery(response.data.hits);

          if (response.data.totalHits > pageNumber * photosPerPage) {
            loadMoreBtn.setAttribute('show-btn', 'true');
          }
          // console.log(response.data.hits);

          console.log(response.data.totalHits);
        }
      })
      .catch(error => {
        Notiflix.Notify.failure(`Action failed with error: ${error}`);
      });
  } else {
    Notiflix.Notify.warning('Search query must contain at least some symbols');
  }
});

loadMoreBtn.addEventListener('click', event => {
  loadMoreBtn.setAttribute('show-btn', 'false');

  fetchPhotos(searchQuery, pageNumber)
    .then(response => {
      fillGallery(response.data.hits);
      console.log(response.data.hits, pageNumber);

      if (response.data.totalHits > pageNumber * photosPerPage) {
        loadMoreBtn.setAttribute('show-btn', 'true');
        pageNumber++;
      } else {
        Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results"
        );
      }
    })
    .catch(error => {
      Notiflix.Notify.failure(`Action failed with error: ${error}`);
    });
});
