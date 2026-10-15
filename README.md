# trending-repos

A zero-dependency Node.js command-line tool that shows trending GitHub repositories. It uses the public [GitHub Search API](https://docs.github.com/en/rest/search/search#search-repositories), so no authentication is required.

Project idea from [roadmap.sh: GitHub Trending CLI](https://roadmap.sh/projects/github-trending-cli).

"Trending" here means the **most-starred repositories created within the chosen period**.

## Features

- Filter by `day`, `week`, `month` or `year`
- Choose how many repositories to show
- Shows name, description, star count and language
- Clear errors for invalid input, network failures and GitHub rate limits
- No dependencies, no API key needed

## Requirements

- Node.js 18.3 or newer

## Installation

```bash
git clone https://github.com/<your-username>/trending-repos.git
cd trending-repos
npm link        # optional: makes the `trending-repos` command available globally
```

Without `npm link`, run it with `node bin/trending-repos.js` instead.

## Usage

```bash
trending-repos [--duration <period>] [--limit <number>]
```

| Option | Short | Description | Default |
| ------ | ----- | ----------- | ------- |
| `--duration` | `-d` | `day`, `week`, `month` or `year` | `week` |
| `--limit` | `-l` | Number of repositories to show (1-100) | `10` |
| `--help` | `-h` | Show help | |

### Examples

```bash
trending-repos                              # top 10 from the last week
trending-repos --duration month --limit 20  # top 20 from the last month
trending-repos -d day -l 5                  # top 5 from the last day
node bin/trending-repos.js --help
```

### Example output

```
Trending repositories (created in the last week, by stars)

 1. owner/some-repo  ★ 2,704  [Rust]
    A short description of the repository
    https://github.com/owner/some-repo

 2. owner/another-repo  ★ 2,417  [TypeScript]
    No description
    https://github.com/owner/another-repo
```

## Errors and exit codes

| Code | Meaning |
| ---- | ------- |
| `0` | Success |
| `1` | Network failure or GitHub API error (including rate limiting) |
| `2` | Invalid command-line input |

Unauthenticated search requests are limited by GitHub (about 10 per minute). To raise the limit, optionally set a token:

```bash
export GITHUB_TOKEN=<your-token>
```

## Project structure

```
.
├──    # Executable entry point
├── src/
│   ├── app.js              # Argument parsing, validation, exit codes
│   ├── filter.js            # Duration -> start date (UTC, month-end safe)
│   ├── fetcher.js           # GitHub API request and error handling
│──-└── constants.js           # Handling the URL


```

## Notes

- Dates are calculated in UTC.
- Descriptions longer than 100 characters are shortened in the output.

## License

MIT