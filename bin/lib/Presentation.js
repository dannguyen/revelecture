'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _contentParser = require('./contentParser');

var _contentParser2 = _interopRequireDefault(_contentParser);

var _Slide = require('./Slide');

var _Slide2 = _interopRequireDefault(_Slide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var revealjs_required_path = _path2.default.resolve(require.resolve('reveal'));

var slideshowTemplate = _handlebars2.default.compile('<html>\n    <head>\n      {{#each stylesheets as |css_path|}}\n        <link rel="stylesheet" href="{{css_path}}">\n      {{/each}}\n    </head>\n    <body>\n        <div class="reveal">\n            <div class="slides">\n              {{#each slides as |slide|}}\n                 {{{slide}}}\n              {{/each}}\n            </div>\n        </div>\n        <script src="{{revealjs_path}}"></script>\n        <script>\n            Reveal.initialize();\n        </script>\n    </body>\n</html>');

var Presentation = function () {
  function Presentation(srcPath) {
    _classCallCheck(this, Presentation);

    this.srcPath = srcPath;
    this.title = 'Read from YAML or first slide';
    this.description = 'Get this from YAML or first slide';
    this.slides = this._gather_files(this.srcPath);
  }

  _createClass(Presentation, [{
    key: '_gather_files',
    value: function _gather_files(src_path) {
      console.log('gathering from ' + src_path);
      var fnames = _glob2.default.sync(_path2.default.join(src_path, '*.md'));
      var slides = [];
      fnames.forEach(function (fname) {
        console.log('Processing ' + fname);
        slides.push(new _Slide2.default((0, _contentParser2.default)(fname)));
      });

      return slides;
    }
  }, {
    key: 'renderSlideshow',
    value: function renderSlideshow() {
      return slideshowTemplate({
        slides: this.slides.map(function (slide) {
          return slide.renderSlide();
        }),
        revealjs_path: revealjs_required_path
      });
    }
  }, {
    key: 'renderOverview',
    value: function renderOverview() {}
  }, {
    key: 'render',
    value: function render() {}
  }]);

  return Presentation;
}();

exports.default = Presentation;