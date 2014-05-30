var Connection = require('./connection')
  , conn = new Connection('wss://polar-woodland-4270.herokuapp.com')
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
