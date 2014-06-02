var ripple = require('ripplejs')
  , template = require('../templates/cursor.html')

var Cursor = ripple(template)

Cursor.on('mounted', function(view) {
  view.watch(['x', 'y'], function() {
    view.move(view.get('x'), view.get('y'))
  })

  view.watch('name', function(name) {
    view.tooltip(name)
  })

  view.move(view.get('x'), view.get('y'))
  view.tooltip(view.get('name') || view.get('id'))
})

Cursor.prototype.move = function(x, y) {
  this.el.style.top  = (y - 1) * 23 + 'px'
  this.el.style.left = (x - 1) + 'ch'
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

module.exports = Cursor
