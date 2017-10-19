module.exports = {
  stripWhitespace: stripWhitespace
}

var stripWhitespace = function (str) {
    if (!str) { return str; }
    return str.replace(/^\s+|\s+$/g,'');
};