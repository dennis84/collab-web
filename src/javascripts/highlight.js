var hljs = require('highlight.js')

function withLineNumbers(code) {
  var linesNum = (1 + code.split('\n').length)
    , lines = new Array(linesNum)

  lines = lines.join('<span></span>')
  return code + '<span class="line-numbers-rows">' + lines + '</span>'
}

function highlight(code, lang) {
  if(!hljs.getLanguage(lang)) {
    var content = hljs.highlightAuto(code).value
  } else {
    var content = hljs.highlight(lang, code).value
  }

  return '<code class="hljs '+ lang +'">'+ withLineNumbers(content) +'</code>'
}

module.exports = highlight
