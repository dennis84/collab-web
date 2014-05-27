var es = require('event-stream')
  , path = require('path')
  , util = require('gulp-util')
  , File = util.File

module.exports = function(filename) {
  if (!filename) {
    throw new Error("Missing filename option for gulp-templates")
  }

  var templates = {}
    , first = null

  function bufferContents(file) {
    if(null === first) {
      first = file
    }

    if(!file.isDirectory()) {
      templates[path.basename(file.path)] = String(file.contents)
    }
  }

  function endStream() {
    var output = 'module.exports = ' + JSON.stringify(templates)
      , joinedPath = path.join(first.base, filename)

    var joinedFile = new File({
      cwd:  first.cwd,
      base: first.base,
      path: joinedPath,
      contents: new Buffer(output)
    })

    this.emit('data', joinedFile)
    this.emit('end')
  }

  return es.through(bufferContents, endStream)
}
