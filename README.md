# trending-repos

A zero-dependency Node.js command-line tool that shows trending GitHub repositories. It uses the public [GitHub Search API](https://docs.github.com/en/rest/search/search#search-repositories), so no authentication is required.

Project idea from [roadmap.sh: GitHub Trending CLI](https://roadmap.sh/projects/github-trending-cli).

"Trending" here means the **most-starred repositories created within the chosen period**.

## Features

- Filter by `day`, `week`, `month` or `year`
- Choose how many repositories to show (1-25)
- Shows name, description, star count and language
- Clear errors for invalid input, network failures and GitHub rate limits
- No dependencies, no API key needed

## Requirements

- Node.js 18 or newer (uses the built-in `fetch`)

## Installation

```bash
git clone https://github.com/<your-username>/trending-repos.git
cd trending-repos
```

No `npm install` is needed.

## Usage

```bash
node <srcitptName.js> <period> <numberOfRepos>
```

Or, without installing the command:

```bash
node app.js <period> <number>
```

| Argument | Description | Default |
| -------- | ----------- | ------- |
| `period` | Required. One of `day`, `week`, `month`, `year` | none |
| `number` | Optional. Number of repositories to show, from 1 to 25 | `10` |

### Examples

```bash
node <app.js> day            # top 10 from the last day
node <app.js> week 20        # top 20 from the last week
node <app.js> month 5        # top 5 from the last month
node <app.js> year 25        # top 25 from the last year
```

### Help

```bash
node <app.js> --help         # short list of periods
node <app.js> man            # full manual
```

### Example output

```js
[
  {
    name: 'chenglou/handwired',
    description: 'Turn your regular JavaScript code into a neural net.',
    stars: 178,
    language: 'TypeScript'
  },
  {
    name: 'Supermedo/uncharted_pc',
    description: 'Uncharted: The Nathan Drake Collection running natively on Windows - by SuperMedo',
    stars: 88,
    language: 'C++'
  },
  {
    name: 'Binaryify/MonitorBar',
    description: 'macOS 菜单栏 / Windows 托盘的显示器管理工具：不依赖 DDC/CI，通过澎湃 OS 局域网接口切换输入源、调节音量',
    stars: 52,
    language: 'Go'
  }
]
```

## Errors

- Invalid period or number: nothing is fetched and a short hint is printed.
- Network failure, GitHub API error or rate limit: an error message is printed and the exit code is `1`.

Unauthenticated search requests are limited by GitHub (about 10 per minute). If you hit the limit, wait a minute and try again.

## Project structure

```
.
├── app.js          # Entry point, reads CLI arguments
├── filter.js       # Period -> date qualifier, plus --help and man text
├── fetcher.js      # Calls the GitHub API and shapes the response
├── constants.js    # API URL and default query parameters
```

## Notes

- Dates are calculated in UTC.
- The number of repositories must be between 1 and 25.

## License

MIT