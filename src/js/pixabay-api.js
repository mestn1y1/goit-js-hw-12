// export async function getPicturesByQuery(query) {
//   const API_KEY = '44784729-ebc9a0f5cc587c2700d41657d';
//   const imageType = 'photo';
//   const orientation = 'horizontal';
//   const safeSearch = true;

//   const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=${imageType}&orientation=${orientation}&safesearch=${safeSearch}`;

//   try {
//     const res = await fetch(url);

//     if (!res.ok) {
//       throw new Error(res.status);
//     }
//     return await res.json();
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }
import axios from 'axios';

export async function getPicturesByQuery(query, page, per_page = 20) {
  const params = {
    key: '44784729-ebc9a0f5cc587c2700d41657d',
    q: query,
    imageType: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: per_page,
  };

  const url = 'https://pixabay.com/api/';

  try {
    const response = await axios.get(url, { params });

    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
