var emitter = require('emitter-component')

function Connection(url) {
  this.url = url
  this.ws = null
}

emitter(Connection.prototype)

Connection.prototype.connect = function(room) {
  var connection = this
  this.ws = new WebSocket(this.url + '/' + room)
  this.ws.onopen = function() {
    connection.emit('opened', connection)
  }

  this.ws.onclose = function() {
    connection.emit('closed', connection)
  }

  this.ws.onmessage = function(e) {
    var r = JSON.parse(e.data)
    connection.emit(r.t, r.d, r.s)
  }
}

Connection.prototype.send = function(data) {
  return this.ws.send(JSON.stringify(data))
}

module.exports = Connection
