"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditButton = exports.PreviewCookie = exports.Endpoints = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _utils = require("../utils");

var _prismicJavascript = _interopRequireDefault(require("prismic-javascript"));

var Endpoints = {
  DEFAULT_DOMAIN: 'prismic.io',
  regexp: /^((https?):\/\/)?([-a-zA-Z0-9_]+)([.]cdn)?[.]?((prismic|wroom)\.(io|test|dev))?/,
  _parse: function _parse(repositoryName) {
    var result = repositoryName.match(this.regexp);

    if (result) {
      var subdomain = result[3];
      var domain = result[5];
      var isSecuredScheme = Boolean(result[2] && result[2] === 'https') || !domain || domain === this.DEFAULT_DOMAIN || domain === 'wroom.io';
      return {
        isSecuredScheme: isSecuredScheme,
        subdomain: subdomain,
        domain: domain || this.DEFAULT_DOMAIN
      };
    } else throw "Invalid Prismic repository name provided: ".concat(repositoryName);
  },
  domain: function domain(repositoryName) {
    var _this$_parse = this._parse(repositoryName),
        subdomain = _this$_parse.subdomain,
        domain = _this$_parse.domain;

    return "".concat(subdomain, ".").concat(domain);
  },
  root: function root(repositoryName) {
    var withCDN = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var _this$_parse2 = this._parse(repositoryName),
        isSecuredScheme = _this$_parse2.isSecuredScheme,
        subdomain = _this$_parse2.subdomain,
        domain = _this$_parse2.domain;

    var scheme = isSecuredScheme ? 'https' : 'http';
    var cdn = isSecuredScheme && withCDN ? '.cdn' : '';
    return "".concat(scheme, "://").concat(subdomain).concat(cdn, ".").concat(domain);
  },
  graphql: function graphql(repositoryName) {
    return this.root(repositoryName, false) + '/graphql';
  },
  v2: function v2(repositoryName) {
    return this.root(repositoryName) + '/api/v2';
  }
};
exports.Endpoints = Endpoints;
var PreviewCookie = {
  get: function get(repositoryName) {
    var cookies = (0, _utils.getCookies)();
    var cookieValue = cookies.get(_prismicJavascript.default.previewCookie);
    if (!cookieValue) return;

    try {
      return JSON.parse(cookieValue);
    } catch (e) {
      // legacy cookie format
      return (0, _defineProperty2.default)({}, Endpoints.domain(repositoryName), {
        preview: cookieValue
      });
    }
  },
  ref: function ref(repositoryName) {
    var cookie = this.get(repositoryName);
    if (cookie) return cookie[Endpoints.domain(repositoryName)] && cookie[Endpoints.domain(repositoryName)].preview;else return;
  }
};
exports.PreviewCookie = PreviewCookie;
var EditButton = {
  HEADER_NAME: 'prismic-editbutton-url'
};
exports.EditButton = EditButton;