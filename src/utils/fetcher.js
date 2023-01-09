const fetcher = (url) => {
  const baseUrl = process.env.API;
  return fetch(baseUrl + url).then((res) => res.json());
};
export default fetcher;
