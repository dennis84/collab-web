var ripple = require('ripplejs')
  , each = require('ripplejs-each')
  , template = require('../templates/pane.html')
  , highlight = require('./highlight')
  , Cursor = require('./cursor')
  , _ = require('lodash')

module.exports = function(conn) {
  var Pane = ripple(template)
    .compose('cursor', Cursor)
    .use(each)

  Pane.on('created', function(view) {
    view.set('buffer', '')
    view.set('file', '')
    view.set('lang', '')
    view.set('cursors', [])
  })

  Pane.on('mounted', function(pane) {
    conn.on('cursor', function(data, sender) {
      var view = _.find(pane.data.cursors, function(c) {
        return c.data.id === sender
      })

      if(data.file === pane.data.file) {
        if(undefined === view) {
          var member = pane.root.findMember(sender)

          pane.data.cursors.push({
            'id': sender,
            'name': (member.get('name') || sender),
            'file': data.file,
            'x': data.x,
            'y': data.y
          })
        } else {
          view.set('x', data.x)
          view.set('y', data.y)
        }
      } else {
        if(undefined !== view) {
          var index = pane.data.cursors.indexOf(view)
          pane.data.cursors.splice(index, 1)
        }
      }
    })

    conn.on('update-member', function(data, sender) {
      var view = _.find(pane.data.cursors, function(c) {
        return c.data.id === sender
      })

      if(undefined !== view) {
        view.set('name', data.name)
      }
    })
  })

  Pane.directive('highlight', {
    update: function(value, el, view) {
      el.innerHTML = highlight(view.get('buffer'), view.get('lang'))
    }
  })

  return Pane
}
