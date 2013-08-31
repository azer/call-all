var call = require("./");

var searchDDG = createTestFn('ddg');
var searchGoogle = createTestFn('google');
var searchBing = createTestFn('bing');
var errorToRaise = new Error('foobar');
var content = {
  ddg: ['foo', 'bar'],
  google: ['qux', 'corge'],
  bing: ['span', 'eggs']
};

it('returns the callaposition of given async functions', function(done){
  call(searchDDG, searchGoogle, searchBing)('foobar', function (error, results) {
    expect(error).to.not.exist;
    expect(results.length).to.equal(3);
    expect(results[0]).to.equal(content['ddg']);
    expect(results[1]).to.equal(content['google']);
    expect(results[2]).to.equal(content['bing']);
    done();
  });
});

it('stops on error', function(done){
  call(searchDDG, raiseError, searchGoogle, searchBing)('foobar', function (error, results) {
    expect(error).to.equal(errorToRaise);
    expect(results.length).to.equal(1);
    expect(results[0]).to.equal(content['ddg']);
    done();
  });
});

function createTestFn (name) {
  return function (keyword, cb) {
    setTimeout(function () {
      cb(undefined, content[name], keyword);
    }, 0);
  };
}

function raiseError (_, cb) {
  cb(errorToRaise);
}
