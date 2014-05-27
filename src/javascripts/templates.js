module.exports = {"change-nick.html":"<div id=\"modal\" class=\"modal fade bs-modal-sm\">\n  <div class=\"modal-dialog modal-sm\">\n    <div class=\"modal-content\">\n      <form on-submit=\"{{ this.submit }}\">\n        <div class=\"modal-body\">\n          <label for=\"nick\">Nickname</label>\n          <input type=\"text\" class=\"form-control input-lg\" ref=\"nick\">\n        </div>\n\n        <div class=\"modal-footer\">\n          <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n          <button type=\"submit\" class=\"btn btn-primary\">Apply</button>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n","cursor.html":"<div class=\"cursor-container\">\n  <div class=\"cursor\"></div>\n</div>\n","editor.html":"<div class=\"layout\">\n  <navigation members=\"{{ members }}\"></navigation>\n  <div class=\"editor-wrapper\">\n    <status></status>\n    <div class=\"editor\" each=\"{{ panes }}\">\n      <pane file=\"{{ file }}\" buffer=\"{{ buffer }}\" lang=\"{{ lang }}\"></pane>\n    </div>\n  </div>\n</div>\n","home.html":"<div class=\"page\">\n  <section class=\"promo container center-me\">\n    <div class=\"row\">\n      <div class=\"col-md-6 col-md-offset-3\">\n        <h1>Collab</h1>\n\n        <p class=\"lead\">\n          Collab is a screen sharing tool that allows you to share source code\n          in real time to the web. \n        </p>\n\n        <button\n          class=\"btn btn-primary btn-lg\"\n          data-toggle=\"modal\"\n          data-target=\"#video\">\n          See how Collab works\n        </button>\n        <br>\n\n        <p>\n          Collab is an open source project, go and check it out at Github.\n        </p>\n\n        <div>\n          <a href=\"https://github.com/dennis84/collab\">Backend</a> |\n          <a href=\"https://github.com/dennis84/vim-collab\">VIM Plugin</a> |\n          <a href=\"https://github.com/dennis84/collab-sublime\">Sublime Text 2 Plugin</a> |\n          <a href=\"https://github.com/dennis84/collab-web\">Web App</a>\n        </div>\n\n        <a href=\"#\" class=\"btn btn-circle\" on-click=\"{{ this.next }}\">\n          <span class=\"glyphicon glyphicon-chevron-down\"></span>\n        </a>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"footer\">\n    <div class=\"container center-me\">\n      <div class=\"row\">\n        <div class=\"col-md-6 col-md-offset-3\">\n          <h2>Let's make it together</h2>\n          <p class=\"lead\">\n            If you have any idea to improve Collab, feel free to open an issue \n            or send me an <a href=\"mailto:d.dietrich84@gmail.com\">e-mail</a>.\n          </p>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <div id=\"video\" class=\"modal fade\">\n    <div class=\"modal-dialog modal-lg\">\n      <div class=\"modal-content\" style=\"line-height: 0\">\n        <div class=\"video-container\">\n          <iframe src=\"//www.youtube.com/embed/u73O79Ztvts\"\n            width=\"900\"\n            height=\"466\"\n            frameborder=\"0\"\n            allowfullscreen>\n          </iframe>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n","member.html":"<li class=\"list-group-item\">\n  {{ name }}\n  <span class=\"glyphicon {{ me ? 'glyphicon-user' : '' }} pull-right\"></span>\n  <span class=\"glyphicon {{ coding ? 'glyphicon-pencil' : '' }} pull-right\"></span>\n</li>\n","navigation.html":"<div class=\"navigation\">\n  <h1>Collab</h1>\n  <ul class=\"list-group\">\n    <li class=\"list-group-item\">\n      Follow Cursor <input type=\"checkbox\" class=\"pull-right\" on-change=\"{{ this.toggleFollow }}\" checked>\n    </li>\n\n    <li class=\"list-group-item\">\n      Online <span class=\"label label-primary pull-right\">{{ nbMembers }}</span>\n    </li>\n\n    <li class=\"list-group-item\">\n      <a href=\"\" on-click=\"{{ this.changeNick }}\">Change Nickname</a>\n    </li>\n  </ul>\n\n  <h3>Who's Online</h3>\n  <ul class=\"list-group\" each=\"{{ members }}\">\n    <member id=\"{{ id }}\" name=\"{{ name }}\" me=\"{{ me }}\" coding=\"{{ coding }}\"></member>\n  </ul>\n</div>\n","pane.html":"<div class=\"pane\">\n  <pre class=\"content\" highlight=\"{{ buffer }}\"></pre>\n  <div class=\"filename\">{{ file }}</div>\n  <div class=\"cursors\" each=\"{{ cursors }}\">\n    <cursor x=\"{{ x }}\" y=\"{{ y }}\" id=\"{{ id }}\" name=\"{{ name }}\"></cursor>\n  </div>\n</div>\n","status-closed.html":"<div class=\"center\">\n  <h3>Connection lost</h3>\n  <center>\n    <button\n      class=\"btn btn-primary\"\n      onClick=\"window.location.reload()\">\n      refresh\n    </button>\n  </center>\n</div>\n","status-open.html":"<div class=\"center\">\n  <img src=\"assets/images/loading-bubbles.svg\" alt=\"...\" height=\"64\" width=\"64\">\n  <h3>Waiting for connection</h3>\n</div>\n","status-opened.html":"<div class=\"center\">\n  <img src=\"assets/images/loading-bubbles.svg\" alt=\"...\" height=\"64\" width=\"64\">\n  <h3>Waiting for code</h3>\n</div>\n"}