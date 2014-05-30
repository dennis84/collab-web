var ripple = require('ripplejs')
  , each = require('ripplejs-each')
  , navigation = require('./navigation')
  , status = require('./status')
  , pane = require('./pane')
  , template = require('../templates/editor.html')
  , _ = require('lodash')

module.exports = function(conn) {
  var Editor = ripple(template)
    .compose('navigation', navigation(conn))
    .compose('status', status(conn))
    .compose('pane', pane(conn))
    .use(each)

  Editor.on('created', function(view) {
    view.set('members', [])
    view.set('panes', [])
    view.set('files', [])
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

      var current = _.find(view.data.panes, function(elem) {
        return elem.data.file === data.file
      })

      if(undefined === current) {
        view.data.panes.unshift(data)
        view.data.files.unshift(data)
      } else {
        current.set('buffer', data.buffer)
      }
    })

    conn.on('cursor', function(data) {
      if(true === window.follow) {
        view.open(data.file, data.y)
      }
    })
  })

  Editor.prototype.findMember = function(id) {
    return _.find(this.data.members, function(elem) {
      return elem.data.id === id
    })
  }

  Editor.prototype.open = function(file, pos) {
    this.data.panes.forEach(function(pane) {
      var $elem = $(pane.el)
      if(pane.data.file === file) {
        $elem.show()
        if(undefined !== pos) {
          $elem.stop().animate({ scrollTop:
            (pos - 1) * 23 - ($(window).height() * 0.3) + 'px'
          })
        }
      } else {
        $elem.hide()
      }
    })
  }

  return Editor
}
