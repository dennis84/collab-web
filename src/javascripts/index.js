var Connection = require('./connection')
  , conn = new Connection('ws://localhost:9000')
  , Homepage = require('./homepage')
  , Editor = require('./editor')(conn)

// start app
var room = location.hash.substring(1)
if(!room) {
  var home = new Homepage
  home.appendTo(document.body)
} else {
  conn.connect(room)
  var editor = new Editor
  editor.appendTo(document.body)
}
