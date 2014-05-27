var ripple = require('ripplejs')
  , events = require('ripplejs-events')
  , templates = require('./templates')

var Homepage = ripple(templates['home.html']).use(events)

Homepage.prototype.next = function(e) {
  var elem = $(e.target).closest('section').next()
  $('body').animate({
    scrollTop: elem.offset().top
  }, 200)
}

module.exports = Homepage
