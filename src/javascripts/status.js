var ripple = require('ripplejs')
  , templateOpen = require('../templates/status-open.html')
  , templateOpened = require('../templates/status-opened.html')
  , templateClosed = require('../templates/status-closed.html')
  , _ = require('lodash')

module.exports = function(conn) {
  var Status = ripple('<div class="status"></div>')

  Status.ready(function() {
    this.el.innerHTML = templateOpen
    conn.once('opened', _.bind(this.opened, this))
    conn.once('closed', _.bind(this.closed, this))
    conn.once('code', _.bind(this.destroy, this))
  })

  Status.prototype.opened = function(conn) {
    this.el.innerHTML = templateOpened
  }

  Status.prototype.closed = function(conn) {
    this.el.innerHTML = templateClosed
  }

  return Status
}
