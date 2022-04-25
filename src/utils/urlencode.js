function urlEncode(clearString) {
  var output = '';
  var x = 0;
  clearString = clearString.toString();
  var regex = /(^[a-zA-Z0-9-_.\-]*)/;
  while (x < clearString.length) {
    var match = regex.exec(clearString.substr(x));
    if (match != null && match.length > 1 && match[1] != '') {
        output += match[1];
      x += match[1].length;
    } else {
      if (clearString.substr(x, 1) == ' ') {
        //原文在此用 clearString[x] == ' ' 做判断, 但ie不支持把字符串当作数组来访问, 
        //修改后两种浏览器都可兼容 
        output += '+';
      }
      else {
        var charCode = clearString.charCodeAt(x);
        var hexVal = charCode.toString(16);
        output += '%' + ( hexVal.length < 2 ? '0' : '' ) + hexVal.toUpperCase();
      }
      x++;
    }
  }
  return output;
};

function urlencode(u){
    return new urlEncode(u);
}
module.exports = urlencode