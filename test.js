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
    expect(results[0]).to.deep.equal([content['ddg'], 'foobar']);
    expect(results[1]).to.deep.equal([content['google'], 'foobar']);
    expect(results[2]).to.deep.equal([content['bing'], 'foobar']);
    done();
  });
});

it('stops on error', function(done){
  call(searchDDG, raiseError, searchGoogle, searchBing)('foobar', function (error, results) {
    expect(error).to.equal(errorToRaise);
    expect(results.length).to.equal(1);
    expect(results[0]).to.deep.equal([content['ddg'], 'foobar']);
    done();
  });
});

it('ignores invalid functions', function(done){
  call(searchDDG, undefined, searchGoogle, undefined, undefined, searchBing)('foobar', function (error, results) {
    expect(error).to.not.exist;
    expect(results.length).to.equal(6);
    expect(results[0]).to.deep.equal([content['ddg'], 'foobar']);
    expect(results[2]).to.deep.equal([content['google'], 'foobar']);
    expect(results[5]).to.deep.equal([content['bing'], 'foobar']);
    expect(results[1]).to.not.exist;
    expect(results[3]).to.not.exist;
    expect(results[4]).to.not.exist;
    done();
  });
});

it('calls the callback with empty result if no function was given', function(done){
  call()(function (error, results) {
    expect(error).to.not.exist;
    expect(results.length).to.equal(0);
    done();
  });
});

it('accepts an array of functions', function(done){
  call([searchDDG, searchGoogle, searchBing])('foobar', function (error, results) {
    expect(error).to.not.exist;
    expect(results.length).to.equal(3);
    expect(results[0]).to.deep.equal([content['ddg'], 'foobar']);
    expect(results[1]).to.deep.equal([content['google'], 'foobar']);
    expect(results[2]).to.deep.equal([content['bing'], 'foobar']);
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
