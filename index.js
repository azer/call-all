var iter = require("iter");

module.exports = call;

function call () {
  var functions = arguments.length == 1 && Array.isArray(arguments[0]) ?
        arguments[0] : Array.prototype.slice.call(arguments);

  return function () {
    var params = Array.prototype.slice.call(arguments, 0, -1);
    var callback = arguments[arguments.length - 1];
    var results = [];
    var fn;

    params.push(undefined); // callback function

    iter(functions.length)
      .done(function () {
        callback(undefined, results);
      })
      .run(function (next, ind) {
        fn = functions[ind];

        params[params.length - 1] = function (error, result) {
          if (error) return callback(error, results);
          results[ind] = result;
          next();
        };

        fn.apply(undefined, params);
      });
  };
}
