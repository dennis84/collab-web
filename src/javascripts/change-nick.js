var ripple = require('ripplejs')
  , events = require('ripplejs-events')
  , refs = require('ripplejs-refs')
  , template = require('../templates/change-nick.html')
  , _ = require('lodash')

module.exports = function(conn) {
  var ChangeNick = ripple(template)
    .use(events)
    .use(refs)

  function focus(e) {
    $(e.target).find('input:first').focus()
  }

  ChangeNick.on('mounted', function(view) {
    var elem = $(view.el)
    elem.modal('show')
    elem.on('shown.bs.modal', focus)
    elem.on('hidden.bs.modal', _.bind(view.destroy, view))
  })

  ChangeNick.prototype.submit = function(e) {
    e.preventDefault()
    var nick = this.refs.nick.value

    if('' !== nick) {
      conn.send({ 't': 'update-nick', 'd': nick })
    }

    $(this.el).modal('hide')
  }

  return ChangeNick
}
