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

        if (!fn) return next();

        params[params.length - 1] = function (error, result) {
          if (error) return callback(error, results);
          results[ind] = Array.prototype.slice.call(arguments, 1);
          next();
        };

        fn.apply(undefined, params);
      });
  };
}
