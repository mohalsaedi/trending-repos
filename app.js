import { getData } from "./fetcher.js";
export function passing_agruments(dateType, repoNumbers = 10 ) {

  return getData(dateType, repoNumbers);

}
passing_agruments(process.argv[2], process.argv[3]);