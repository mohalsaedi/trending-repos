export const API_URL =
  "https://api.github.com/search/repositories";


export const QUERY_PARAMS = new URLSearchParams({
  q: "",
  sort: "stars",
  order: "desc",
  per_page: 20,
});

