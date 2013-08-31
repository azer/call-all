## call-all

Call Given Async Functions In Given Order

## Install

```bash
$ npm install call-all
```

## Usage

```js
search = juxt(searchDDG, searchGoogle, searchBing)('hello world', function (error, results) {

  results[0]
  // => results of DDG

  results[1]
  // => results of Google

  results[2]
  // => results of Bing

})

function searchDDG (keyword, callback) {}
function searchGoogle (keyword, callback) {}
function searchBing (keyword, callback) {}
```
