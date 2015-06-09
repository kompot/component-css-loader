var fs = require('fs');
var loaderUtils = require('loader-utils');

module.exports = function(source) {
  this.cacheable && this.cacheable();

  var query = loaderUtils.parseQuery(this.query);
  var ext = query.ext || 'styl';
  var varName = query.varName;

  var componentFileName = this.resourcePath.match(/[^\/]+$/)[0];
  var componentExt = componentFileName.match(/\.(.+)$/)[1];
  var styleFileName = componentFileName.replace(componentExt, ext);
  var stylePath = this.resourcePath.replace(componentExt, ext);

  try {
    var stats = fs.statSync(stylePath);
    if (stats.isFile()) {
      var prefix = varName
          ? ('const ' + varName + ' = ')
          : '';
      return prefix + "require('./" + styleFileName + "');\n" + source;
    }
  } catch(e) {}

  return source;
};

