var ripple = require('ripplejs')
  , templates = require('./templates')
  , _ = require('lodash')

module.exports = function(conn) {
  var Status = ripple('<div class="status"></div>')

  Status.ready(function() {
    conn.once('open', _.bind(this.open, this))
    conn.once('opened', _.bind(this.opened, this))
    conn.once('closed', _.bind(this.closed, this))
    conn.once('code', _.bind(this.destroy, this))
  })

  Status.prototype.open = function(conn) {
    this.el.innerHTML = templates['status-open.html']
  }

  Status.prototype.opened = function(conn) {
    this.el.innerHTML = templates['status-opened.html']
  }

  Status.prototype.closed = function(conn) {
    this.el.innerHTML = templates['status-closed.html']
  }

  return Status
}
