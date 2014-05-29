var ripple = require('ripplejs')
  , events = require('ripplejs-events')
  , template = require('../templates/home.html')

var Homepage = ripple(template).use(events)

Homepage.prototype.next = function(e) {
  var elem = $(e.target).closest('section').next()
  $('body').animate({
    scrollTop: elem.offset().top
  }, 200)
}

module.exports = Homepage
