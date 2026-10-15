
/* Support filtering by day, week, month, and year:
    this is means I have to provide CLI arguments like: -- duration: day, week ,etc.

*/
// perioudFilter it may contain month or day or week or year

const MAN = `
NAME
    github-repos - list recently created GitHub repositories
 
SYNOPSIS
    node app.js <period> [count]
    node app.js man
    node app.js --help
 
DESCRIPTION
    Searches the GitHub Search API for repositories created within the
    given period and prints a table with each repository's name,
    description, star count and primary language.
 
ARGUMENTS
    period    How far back to look (required):
                day    => last day
                week   => last 7 days
                month  => last month
                year   => last 12 months
 
    count     Number of repositories to show, 1-25 (default 10).
 
HOW IT WORKS
    1. app.js reads <period> and [count] from the command line.
    2. filter.js turns the period into a start date and builds the
       search qualifier, e.g.  created:>2026-10-07
    3. fetcher.js sends the request to the GitHub API and keeps only
       name, description, stars and language.
    4. app.js prints the result as a table.
 
EXAMPLES
    node app.js day            10 repositories from the last day
    node app.js week 20        20 repositories from the last week
    node app.js month 5        5 repositories from the last month
    node app.js man            show this manual
 
NOTES
    Dates are calculated in UTC.
    Requests are unauthenticated, so GitHub's search rate limit applies.
 
EXIT STATUS
    0  success
    1  invalid input, network failure, or GitHub API error
`;

export function filterDate(periodFilter) {
  const startDate = new Date();

  switch (periodFilter) {
    case "day":
      startDate.setDate(startDate.getDate() - 1);
      break;

    case "week":
      startDate.setDate(startDate.getDate() - 7);
      break;

    case "month":
      return subtractMonth(startDate)
        .toISOString()
        .split("T")[0];


    case "year":
      startDate.setFullYear(startDate.getFullYear() - 1);
      break;

    case "man":
      console.log(MAN);
      return null;

    case "--help":
      console.log(
        "day   => last day\n" +
        "week  => last week\n" +
        "month => last month\n" +
        "year  => last year"
      );
      return null;

    default:
      return null;
  }


  return `created:>${startDate.toISOString().split("T")[0]}`;
}


// Handling Month issue (Mars 31):
export function subtractMonth(date) {
  const result = new Date(date);
  const day = result.getDate();

  // Move to the first day to avoid month overflow
  result.setDate(1);
  result.setMonth(result.getMonth() - 1);

  // Restore the original day, capped at the last day
  // of the target month
  const lastDay = new Date(
    result.getFullYear(),
    result.getMonth() + 1,
    0
  ).getDate();

  result.setDate(Math.min(day, lastDay));

  return result;
}


