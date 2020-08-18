# Movies Fight

Get all information of any Movies and compare. The site use [bulma.io](https://bulma.io/) as the css framework

## Installation

Clone the Repo.

```bash
git clone https://github.com/bineetNaidu/moviesFight
cd moviesFight
```

## Usage

_make sure to use you own apikey at index.js @line-13 && @line-50_

-   this is at line 13

```javascript
 params: {
  apiKey: __Your_API_KEY__,
  s: searchQuery,
  plot: true,
  },
```

-   this is at line 50

```javascript
params: {
  apiKey: __Your_API_KEY__,
  i: imdbID,
  plot: true,
  },
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
