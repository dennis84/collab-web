var ripple = require('ripplejs')
  , each = require('ripplejs-each')
  , events = require('ripplejs-events')
  , templates = require('./templates')
  , Member = require('./member')
  , changeNick = require('./change-nick')

module.exports = function(conn) {
  var Navigation = ripple(templates['navigation.html'])
    .compose('member', Member)
    .use(each).use(events)

  Navigation.on('created', function(view) {
    view.set('nbMembers', 0)
    window.follow = true
  })

  Navigation.on('mounted', function(view) {
    view.data.members.on('change', function(a) {
      view.set('nbMembers', view.data.members.length)
    })
  })

  Navigation.prototype.changeNick = function(e) {
    e.preventDefault()
    var nick = new (changeNick(conn))
    nick.appendTo(document.body)
  }

  Navigation.prototype.toggleFollow = function(e) {
    if(true === e.target.checked) {
      window.follow = true
    } else {
      window.follow = false
    }
  }

  return Navigation
}
