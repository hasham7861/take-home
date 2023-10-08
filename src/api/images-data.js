export const getImages = async (page, perPage) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_UNSPLASH_API}/photos?client_id=${process.env.REACT_APP_CLIENT_ID}&page=${page}&per_page=${perPage}`, {
      method: 'GET',
      cache: 'default' // default cache supported by server to be used by browser
    });
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error:', error);
    return []
  }
}