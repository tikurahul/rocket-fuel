const debug = true;

const Logger = {};

Logger.log = function() {
  return console.log.call(console, arguments);
};

module.exports = Logger;
