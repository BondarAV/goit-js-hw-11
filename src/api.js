import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38324271-7e43a2be81ff0199763370e16';

export const photosPerPage = 40;

export async function fetchPhotos(searchQuery, pageNumber = 1) {
  // fetch(
  //   `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal`
  // )
  //   .then(res => {
  //     if (!res.ok) {
  //       throw new Error(res.status);
  //     }

  //     console.log(res);

  //     return res.json();
  //   })
  //   .catch(error => {
  //     Notiflix.Notify.failure(`Action failed with error: ${error}`);
  //   });

  return axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${photosPerPage}&page=${pageNumber}`
  );
}
