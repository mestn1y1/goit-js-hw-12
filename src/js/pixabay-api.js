export function getPicturesByQuery(query) {
  const API_KEY = '44784729-ebc9a0f5cc587c2700d41657d';
  const imageType = 'photo';
  const orientation = 'horizontal';
  const safeSearch = true;

  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=${imageType}&orientation=${orientation}&safesearch=${safeSearch}`;

  return fetch(url).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }

    return res.json();
  });
}
