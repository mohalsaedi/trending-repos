
import { API_URL, QUERY_PARAMS } from "./constants.js";
import { filterDate } from "./filter.js";


/*
I have to specify the response to fetch:
      [] Repository Name
      []  Desciption
      []  Number of Stars
      []  Language
*/



export async function getData( dateType, repoNumbers) {
  try {
    // If date not valid or repos number isn't valid then the fetching process will not be executed  
    if (filterDate(dateType) != null && repoNumbers > 0 && repoNumbers < 25) {
      QUERY_PARAMS.set("q", filterDate(dateType));
      QUERY_PARAMS.set("per_page", String(repoNumbers))
      const url = `${API_URL}?${QUERY_PARAMS.toString()}`;
     
      const response = await fetch(url);
      if (!response) {
        throw new Error(`Response Status: ${response.status}`);
      }
      const result = await response.json();
      const repositories = result.items.map((repo) => ({
        name: repo.full_name,
        description: repo.description,
        stars: repo.stargazers_count,
        language: repo.language,
      }));
      console.log(repositories);
      return repositories;
    } else return console.log("Type node <scriptName.js> --help OR man; to show how it works ");
  } catch (error) {
    console.log("Certian Error happend", error.message);
  }
}
