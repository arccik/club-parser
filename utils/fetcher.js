const baseUrl = process.env.API;

export default function fetcher(url) {
  return fetch(baseUrl + url).then((res) => res.json());
}
