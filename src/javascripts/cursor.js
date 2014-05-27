var ripple = require('ripplejs')
  , templates = require('./templates')

module.exports = function(conn) {
  var Cursor = ripple(templates['cursor.html'])

  Cursor.on('mounted', function(view) {
    view.watch(['x', 'y'], function() {
      view.move(view.get('x'), view.get('y'))
    })

    view.watch('name', function(name) {
      view.tooltip(name)
    })

    view.move(view.get('x'), view.get('y'))
    view.tooltip(view.get('name') || view.get('id'))

    conn.on('update-member', function(data, sender) {
      if(sender === view.get('id')) {
        view.set('name', data.name)
      }
    })
  })

  Cursor.prototype.move = function(x, y) {
    $(this.el).css({
      'top':  (y - 1) * 23 + 'px',
      'left': (x - 1) + 'ch'
    })
  }

  Cursor.prototype.tooltip = function(text) {
    var $elem = $(this.el)
    $elem.tooltip('destroy')
    setTimeout(function() {
      $elem.tooltip({
        'placement': 'top',
        'title': text,
        'container': $elem
      })

      $elem.tooltip('show')
      setTimeout(function() {
        $elem.tooltip('hide')
      }, 3000)
    }, 200)
  }

  return Cursor
}