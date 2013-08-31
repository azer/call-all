## call-all

Call Given Async Functions In Given Order

## Install

```bash
$ npm install call-all
```

## Usage

```js
call = require('call-all')

search = call(searchDDG, searchGoogle, searchBing)

search('hello world', function (error, results) {

  results[0]
  // => results by DDG

  results[1]
  // => results by Google

  results[2]
  // => results by Bing

})

function searchDDG (keyword, callback) {}
function searchGoogle (keyword, callback) {}
function searchBing (keyword, callback) {}
```

See `test.js` for more info.
