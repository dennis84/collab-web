var ripple = require('ripplejs')
  , each = require('ripplejs-each')
  , navigation = require('./navigation')
  , status = require('./status')
  , pane = require('./pane')
  , templates = require('./templates')

module.exports = function(conn) {
  var Editor = ripple(templates['editor.html'])
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

      var view = view.data.panes.find(function(elem) {
        return elem.data.file === data.file
      })

      if(undefined === view) {
        view.data.panes.unshift(data)
      } else {
        view.set('buffer', data.buffer)
      }
    })

    conn.on('cursor', function(data) {
      if(true === window.follow) {
        var view = view.data.panes.find(function(elem) {
          return elem.data.file === data.file
        })

        view.data.panes.forEach(function(elem) {
          $(elem.el).hide()
        })

        $(view.el).show()

        var offset = $(window).height() * 0.3

        $(view.el).stop().animate({ scrollTop:
          (data.y - 1) * 23 - offset + 'px'
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
