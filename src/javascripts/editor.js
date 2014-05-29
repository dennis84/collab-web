var ripple = require('ripplejs')
  , each = require('ripplejs-each')
  , navigation = require('./navigation')
  , status = require('./status')
  , pane = require('./pane')
  , template = require('../templates/editor.html')

module.exports = function(conn) {
  var Editor = ripple(template)
    .compose('navigation', navigation(conn))
    .compose('status', status(conn))
    .compose('pane', pane(conn))
    .use(each)

  Editor.on('created', function(view) {
    view.set('members', [])
    view.set('panes', [])
  })

  Editor.on('mounted', function(view) {
    conn.on('opened', function() {
      conn.send({ 't': 'members' })
    })

    conn.on('join', function(id) {
      if(undefined === view.findMember(id)) {
        view.data.members.push({ id: id, name: id })
      }
    })

    conn.on('leave', function(id) {
      var member = view.findMember(id)
        , index = view.data.members.indexOf(member)

      view.data.members.splice(index, 1)
    })

    conn.on('update-member', function(data) {
      var member = view.findMember(data.id)
      member.set('name', data.name)
    })

    conn.on('members', function(data) {
      data.forEach(function(item) {
        var member = view.findMember(item.id)
        if(undefined === member) {
          view.data.members.push(item)
        } else {
          member.set(item)
        }
      })
    })

    conn.on('code', function(data, sender) {
      view.findMember(sender).set('coding', true)

      var current = view.data.panes.find(function(elem) {
        return elem.data.file === data.file
      })

      if(undefined === current) {
        view.data.panes.unshift(data)
      } else {
        current.set('buffer', data.buffer)
      }
    })

    conn.on('cursor', function(data) {
      if(true === window.follow) {
        view.data.panes.forEach(function(pane) {
          var $elem = $(pane.el)
          if(pane.data.file === data.file) {
            $elem.show().stop().animate({ scrollTop:
              (data.y - 1) * 23 - ($(window).height() * 0.3) + 'px'
            })
          } else {
            $elem.hide()
          }
        })
      }
    })
  })

  Editor.prototype.findMember = function(id) {
    return this.data.members.find(function(elem) {
      return elem.data.id === id
    })
  }

  return Editor
}
