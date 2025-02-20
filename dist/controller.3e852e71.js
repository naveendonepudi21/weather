// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"1af3afb847b173c466651e24124cd8a8":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "3e852e7113a09cb590cb859263b48920";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"684bda6a4d515a4b12d20f73f5ac084a":[function(require,module,exports) {
require('./bundle-manifest').register(JSON.parse("{\"90cb859263b48920\":\"controller.3e852e71.js\",\"4099aefe9d0dc1ed\":\"icons.782b9d3f.svg\"}"));
},{"./bundle-manifest":"ba8df6b71e73837c465d69bebde6e64d"}],"ba8df6b71e73837c465d69bebde6e64d":[function(require,module,exports) {
"use strict";

var mapping = {};

function register(pairs) {
  var keys = Object.keys(pairs);

  for (var i = 0; i < keys.length; i++) {
    mapping[keys[i]] = pairs[keys[i]];
  }
}

function resolve(id) {
  var resolved = mapping[id];

  if (resolved == null) {
    throw new Error('Could not resolve bundle with id ' + id);
  }

  return resolved;
}

module.exports.register = register;
module.exports.resolve = resolve;
},{}],"175e469a7ea7db1c8c0744d04372621f":[function(require,module,exports) {
"use strict";

var _auto = _interopRequireDefault(require("chart.js/auto"));

var _chartView = _interopRequireDefault(require("./views/chartView"));

var model = _interopRequireWildcard(require("./model.js"));

var _citiesView = _interopRequireDefault(require("./views/citiesView"));

var _weatherForecastView = _interopRequireDefault(require("./views/weatherForecastView"));

var _reportView = _interopRequireDefault(require("./views/reportView"));

var _searchView = _interopRequireDefault(require("./views/searchView"));

var _sidenavView = _interopRequireDefault(require("./views/sidenavView"));

var _mapView = _interopRequireDefault(require("./views/mapView"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const start = async function () {
  try {
    _reportView.default.renderSpinner();

    _weatherForecastView.default.renderSpinner();

    await model.loadWeatherData();

    _reportView.default.render(model.state);

    _reportView.default.updateUI(model.state.current);

    _weatherForecastView.default.render(model.state);

    _chartView.default.createChartData(model.state);

    _chartView.default.chartRender();

    _mapView.default.renderMap(model.state);
  } catch (err) {
    console.error(err);
  }
};

const controlChartData = function () {
  _chartView.default.createChartData(model.state);

  _chartView.default.updateChart();
};

const controlChartTempUnit = function () {
  _chartView.default.changeTempUnit();

  _chartView.default.updateChart();
};

const controlGetLocation = async function () {
  try {
    _reportView.default.renderSpinner();

    _weatherForecastView.default.renderSpinner();

    await model.getPosition();
    await model.loadWeatherData();

    _reportView.default.render(model.state);

    _reportView.default.updateUI(model.state.current);

    _weatherForecastView.default.render(model.state);

    _chartView.default.createChartData(model.state);

    _chartView.default.updateChart();

    _mapView.default.renderMap(model.state);
  } catch (error) {
    console.error(error);
  }
};

const controlSearchResults = async function () {
  try {
    _reportView.default.renderSpinner();

    _weatherForecastView.default.renderSpinner();

    const query = _searchView.default.getQuery();

    await model.getPlaceName(query);
    await model.loadWeatherData(false);

    _reportView.default.render(model.state);

    _reportView.default.updateUI(model.state.current);

    _weatherForecastView.default.render(model.state);

    _chartView.default.createChartData(model.state);

    _chartView.default.updateChart();

    _mapView.default.renderMap(model.state);
  } catch (err) {
    console.error(err);
  }
};

const controlSidenavMenu = async function () {
  try {
    console.log(_sidenavView.default.getActiveMenu());

    if (_sidenavView.default.getActiveMenu() === "map") {
      _mapView.default.showMap();
    }

    if (_sidenavView.default.getActiveMenu() === "dashboard") {
      _mapView.default.hideMap();
    }
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  start();

  _chartView.default.addHandlerClickOpt(controlChartData);

  _chartView.default.addHandlerChangeUnit(controlChartTempUnit);

  _reportView.default.addHandlerGetLocation(controlGetLocation);

  _searchView.default.addHandlerSearch(controlSearchResults);

  _sidenavView.default.addHandlerClick(controlSidenavMenu);
};

init();
},{"chart.js/auto":"66afc3fc036ac0a9124314181ca6daf9","./views/chartView":"ddb3dc54ac3a604c18c302314a865c0c","./model.js":"aabf248f40f7693ef84a0cb99f385d1f","./views/citiesView":"9bdacaa3dd400962d700caddac76d41f","./views/weatherForecastView":"6313d141f311799352124137c4d0b697","./views/reportView":"ff8d0b5abc33481142ff72d5db7c4a23","./views/searchView":"c5d792f7cac03ef65de30cc0fbb2cae7","./views/sidenavView":"6a99379ebb973230e3a06e0ffca5a1df","./views/mapView":"9e1d07cb25d7e22cbff545c01da9197b"}],"66afc3fc036ac0a9124314181ca6daf9":[function(require,module,exports) {
module.exports = require('../dist/chart');

},{"../dist/chart":"61753c70c5ff96f0d66ca3d1d263fb74"}],"61753c70c5ff96f0d66ca3d1d263fb74":[function(require,module,exports) {
var define;

/*!
 * Chart.js v3.4.1
 * https://www.chartjs.org
 * (c) 2021 Chart.js Contributors
 * Released under the MIT License
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Chart = factory());
})(this, function () {
  'use strict';

  function fontString(pixelSize, fontStyle, fontFamily) {
    return fontStyle + ' ' + pixelSize + 'px ' + fontFamily;
  }

  const requestAnimFrame = function () {
    if (typeof window === 'undefined') {
      return function (callback) {
        return callback();
      };
    }

    return window.requestAnimationFrame;
  }();

  function throttled(fn, thisArg, updateFn) {
    const updateArgs = updateFn || (args => Array.prototype.slice.call(args));

    let ticking = false;
    let args = [];
    return function (...rest) {
      args = updateArgs(rest);

      if (!ticking) {
        ticking = true;
        requestAnimFrame.call(window, () => {
          ticking = false;
          fn.apply(thisArg, args);
        });
      }
    };
  }

  function debounce(fn, delay) {
    let timeout;
    return function () {
      if (delay) {
        clearTimeout(timeout);
        timeout = setTimeout(fn, delay);
      } else {
        fn();
      }

      return delay;
    };
  }

  const _toLeftRightCenter = align => align === 'start' ? 'left' : align === 'end' ? 'right' : 'center';

  const _alignStartEnd = (align, start, end) => align === 'start' ? start : align === 'end' ? end : (start + end) / 2;

  const _textX = (align, left, right, rtl) => {
    const check = rtl ? 'left' : 'right';
    return align === check ? right : align === 'center' ? (left + right) / 2 : left;
  };

  class Animator {
    constructor() {
      this._request = null;
      this._charts = new Map();
      this._running = false;
      this._lastDate = undefined;
    }

    _notify(chart, anims, date, type) {
      const callbacks = anims.listeners[type];
      const numSteps = anims.duration;
      callbacks.forEach(fn => fn({
        chart,
        initial: anims.initial,
        numSteps,
        currentStep: Math.min(date - anims.start, numSteps)
      }));
    }

    _refresh() {
      const me = this;

      if (me._request) {
        return;
      }

      me._running = true;
      me._request = requestAnimFrame.call(window, () => {
        me._update();

        me._request = null;

        if (me._running) {
          me._refresh();
        }
      });
    }

    _update(date = Date.now()) {
      const me = this;
      let remaining = 0;

      me._charts.forEach((anims, chart) => {
        if (!anims.running || !anims.items.length) {
          return;
        }

        const items = anims.items;
        let i = items.length - 1;
        let draw = false;
        let item;

        for (; i >= 0; --i) {
          item = items[i];

          if (item._active) {
            if (item._total > anims.duration) {
              anims.duration = item._total;
            }

            item.tick(date);
            draw = true;
          } else {
            items[i] = items[items.length - 1];
            items.pop();
          }
        }

        if (draw) {
          chart.draw();

          me._notify(chart, anims, date, 'progress');
        }

        if (!items.length) {
          anims.running = false;

          me._notify(chart, anims, date, 'complete');

          anims.initial = false;
        }

        remaining += items.length;
      });

      me._lastDate = date;

      if (remaining === 0) {
        me._running = false;
      }
    }

    _getAnims(chart) {
      const charts = this._charts;
      let anims = charts.get(chart);

      if (!anims) {
        anims = {
          running: false,
          initial: true,
          items: [],
          listeners: {
            complete: [],
            progress: []
          }
        };
        charts.set(chart, anims);
      }

      return anims;
    }

    listen(chart, event, cb) {
      this._getAnims(chart).listeners[event].push(cb);
    }

    add(chart, items) {
      if (!items || !items.length) {
        return;
      }

      this._getAnims(chart).items.push(...items);
    }

    has(chart) {
      return this._getAnims(chart).items.length > 0;
    }

    start(chart) {
      const anims = this._charts.get(chart);

      if (!anims) {
        return;
      }

      anims.running = true;
      anims.start = Date.now();
      anims.duration = anims.items.reduce((acc, cur) => Math.max(acc, cur._duration), 0);

      this._refresh();
    }

    running(chart) {
      if (!this._running) {
        return false;
      }

      const anims = this._charts.get(chart);

      if (!anims || !anims.running || !anims.items.length) {
        return false;
      }

      return true;
    }

    stop(chart) {
      const anims = this._charts.get(chart);

      if (!anims || !anims.items.length) {
        return;
      }

      const items = anims.items;
      let i = items.length - 1;

      for (; i >= 0; --i) {
        items[i].cancel();
      }

      anims.items = [];

      this._notify(chart, anims, Date.now(), 'complete');
    }

    remove(chart) {
      return this._charts.delete(chart);
    }

  }

  var animator = new Animator();
  /*!
   * @kurkle/color v0.1.9
   * https://github.com/kurkle/color#readme
   * (c) 2020 Jukka Kurkela
   * Released under the MIT License
   */

  const map$1 = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15
  };
  const hex = '0123456789ABCDEF';

  const h1 = b => hex[b & 0xF];

  const h2 = b => hex[(b & 0xF0) >> 4] + hex[b & 0xF];

  const eq = b => (b & 0xF0) >> 4 === (b & 0xF);

  function isShort(v) {
    return eq(v.r) && eq(v.g) && eq(v.b) && eq(v.a);
  }

  function hexParse(str) {
    var len = str.length;
    var ret;

    if (str[0] === '#') {
      if (len === 4 || len === 5) {
        ret = {
          r: 255 & map$1[str[1]] * 17,
          g: 255 & map$1[str[2]] * 17,
          b: 255 & map$1[str[3]] * 17,
          a: len === 5 ? map$1[str[4]] * 17 : 255
        };
      } else if (len === 7 || len === 9) {
        ret = {
          r: map$1[str[1]] << 4 | map$1[str[2]],
          g: map$1[str[3]] << 4 | map$1[str[4]],
          b: map$1[str[5]] << 4 | map$1[str[6]],
          a: len === 9 ? map$1[str[7]] << 4 | map$1[str[8]] : 255
        };
      }
    }

    return ret;
  }

  function hexString(v) {
    var f = isShort(v) ? h1 : h2;
    return v ? '#' + f(v.r) + f(v.g) + f(v.b) + (v.a < 255 ? f(v.a) : '') : v;
  }

  function round(v) {
    return v + 0.5 | 0;
  }

  const lim = (v, l, h) => Math.max(Math.min(v, h), l);

  function p2b(v) {
    return lim(round(v * 2.55), 0, 255);
  }

  function n2b(v) {
    return lim(round(v * 255), 0, 255);
  }

  function b2n(v) {
    return lim(round(v / 2.55) / 100, 0, 1);
  }

  function n2p(v) {
    return lim(round(v * 100), 0, 100);
  }

  const RGB_RE = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;

  function rgbParse(str) {
    const m = RGB_RE.exec(str);
    let a = 255;
    let r, g, b;

    if (!m) {
      return;
    }

    if (m[7] !== r) {
      const v = +m[7];
      a = 255 & (m[8] ? p2b(v) : v * 255);
    }

    r = +m[1];
    g = +m[3];
    b = +m[5];
    r = 255 & (m[2] ? p2b(r) : r);
    g = 255 & (m[4] ? p2b(g) : g);
    b = 255 & (m[6] ? p2b(b) : b);
    return {
      r: r,
      g: g,
      b: b,
      a: a
    };
  }

  function rgbString(v) {
    return v && (v.a < 255 ? `rgba(${v.r}, ${v.g}, ${v.b}, ${b2n(v.a)})` : `rgb(${v.r}, ${v.g}, ${v.b})`);
  }

  const HUE_RE = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;

  function hsl2rgbn(h, s, l) {
    const a = s * Math.min(l, 1 - l);

    const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

    return [f(0), f(8), f(4)];
  }

  function hsv2rgbn(h, s, v) {
    const f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);

    return [f(5), f(3), f(1)];
  }

  function hwb2rgbn(h, w, b) {
    const rgb = hsl2rgbn(h, 1, 0.5);
    let i;

    if (w + b > 1) {
      i = 1 / (w + b);
      w *= i;
      b *= i;
    }

    for (i = 0; i < 3; i++) {
      rgb[i] *= 1 - w - b;
      rgb[i] += w;
    }

    return rgb;
  }

  function rgb2hsl(v) {
    const range = 255;
    const r = v.r / range;
    const g = v.g / range;
    const b = v.b / range;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h, s, d;

    if (max !== min) {
      d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h = h * 60 + 0.5;
    }

    return [h | 0, s || 0, l];
  }

  function calln(f, a, b, c) {
    return (Array.isArray(a) ? f(a[0], a[1], a[2]) : f(a, b, c)).map(n2b);
  }

  function hsl2rgb(h, s, l) {
    return calln(hsl2rgbn, h, s, l);
  }

  function hwb2rgb(h, w, b) {
    return calln(hwb2rgbn, h, w, b);
  }

  function hsv2rgb(h, s, v) {
    return calln(hsv2rgbn, h, s, v);
  }

  function hue(h) {
    return (h % 360 + 360) % 360;
  }

  function hueParse(str) {
    const m = HUE_RE.exec(str);
    let a = 255;
    let v;

    if (!m) {
      return;
    }

    if (m[5] !== v) {
      a = m[6] ? p2b(+m[5]) : n2b(+m[5]);
    }

    const h = hue(+m[2]);
    const p1 = +m[3] / 100;
    const p2 = +m[4] / 100;

    if (m[1] === 'hwb') {
      v = hwb2rgb(h, p1, p2);
    } else if (m[1] === 'hsv') {
      v = hsv2rgb(h, p1, p2);
    } else {
      v = hsl2rgb(h, p1, p2);
    }

    return {
      r: v[0],
      g: v[1],
      b: v[2],
      a: a
    };
  }

  function rotate(v, deg) {
    var h = rgb2hsl(v);
    h[0] = hue(h[0] + deg);
    h = hsl2rgb(h);
    v.r = h[0];
    v.g = h[1];
    v.b = h[2];
  }

  function hslString(v) {
    if (!v) {
      return;
    }

    const a = rgb2hsl(v);
    const h = a[0];
    const s = n2p(a[1]);
    const l = n2p(a[2]);
    return v.a < 255 ? `hsla(${h}, ${s}%, ${l}%, ${b2n(v.a)})` : `hsl(${h}, ${s}%, ${l}%)`;
  }

  const map$1$1 = {
    x: 'dark',
    Z: 'light',
    Y: 're',
    X: 'blu',
    W: 'gr',
    V: 'medium',
    U: 'slate',
    A: 'ee',
    T: 'ol',
    S: 'or',
    B: 'ra',
    C: 'lateg',
    D: 'ights',
    R: 'in',
    Q: 'turquois',
    E: 'hi',
    P: 'ro',
    O: 'al',
    N: 'le',
    M: 'de',
    L: 'yello',
    F: 'en',
    K: 'ch',
    G: 'arks',
    H: 'ea',
    I: 'ightg',
    J: 'wh'
  };
  const names = {
    OiceXe: 'f0f8ff',
    antiquewEte: 'faebd7',
    aqua: 'ffff',
    aquamarRe: '7fffd4',
    azuY: 'f0ffff',
    beige: 'f5f5dc',
    bisque: 'ffe4c4',
    black: '0',
    blanKedOmond: 'ffebcd',
    Xe: 'ff',
    XeviTet: '8a2be2',
    bPwn: 'a52a2a',
    burlywood: 'deb887',
    caMtXe: '5f9ea0',
    KartYuse: '7fff00',
    KocTate: 'd2691e',
    cSO: 'ff7f50',
    cSnflowerXe: '6495ed',
    cSnsilk: 'fff8dc',
    crimson: 'dc143c',
    cyan: 'ffff',
    xXe: '8b',
    xcyan: '8b8b',
    xgTMnPd: 'b8860b',
    xWay: 'a9a9a9',
    xgYF: '6400',
    xgYy: 'a9a9a9',
    xkhaki: 'bdb76b',
    xmagFta: '8b008b',
    xTivegYF: '556b2f',
    xSange: 'ff8c00',
    xScEd: '9932cc',
    xYd: '8b0000',
    xsOmon: 'e9967a',
    xsHgYF: '8fbc8f',
    xUXe: '483d8b',
    xUWay: '2f4f4f',
    xUgYy: '2f4f4f',
    xQe: 'ced1',
    xviTet: '9400d3',
    dAppRk: 'ff1493',
    dApskyXe: 'bfff',
    dimWay: '696969',
    dimgYy: '696969',
    dodgerXe: '1e90ff',
    fiYbrick: 'b22222',
    flSOwEte: 'fffaf0',
    foYstWAn: '228b22',
    fuKsia: 'ff00ff',
    gaRsbSo: 'dcdcdc',
    ghostwEte: 'f8f8ff',
    gTd: 'ffd700',
    gTMnPd: 'daa520',
    Way: '808080',
    gYF: '8000',
    gYFLw: 'adff2f',
    gYy: '808080',
    honeyMw: 'f0fff0',
    hotpRk: 'ff69b4',
    RdianYd: 'cd5c5c',
    Rdigo: '4b0082',
    ivSy: 'fffff0',
    khaki: 'f0e68c',
    lavFMr: 'e6e6fa',
    lavFMrXsh: 'fff0f5',
    lawngYF: '7cfc00',
    NmoncEffon: 'fffacd',
    ZXe: 'add8e6',
    ZcSO: 'f08080',
    Zcyan: 'e0ffff',
    ZgTMnPdLw: 'fafad2',
    ZWay: 'd3d3d3',
    ZgYF: '90ee90',
    ZgYy: 'd3d3d3',
    ZpRk: 'ffb6c1',
    ZsOmon: 'ffa07a',
    ZsHgYF: '20b2aa',
    ZskyXe: '87cefa',
    ZUWay: '778899',
    ZUgYy: '778899',
    ZstAlXe: 'b0c4de',
    ZLw: 'ffffe0',
    lime: 'ff00',
    limegYF: '32cd32',
    lRF: 'faf0e6',
    magFta: 'ff00ff',
    maPon: '800000',
    VaquamarRe: '66cdaa',
    VXe: 'cd',
    VScEd: 'ba55d3',
    VpurpN: '9370db',
    VsHgYF: '3cb371',
    VUXe: '7b68ee',
    VsprRggYF: 'fa9a',
    VQe: '48d1cc',
    VviTetYd: 'c71585',
    midnightXe: '191970',
    mRtcYam: 'f5fffa',
    mistyPse: 'ffe4e1',
    moccasR: 'ffe4b5',
    navajowEte: 'ffdead',
    navy: '80',
    Tdlace: 'fdf5e6',
    Tive: '808000',
    TivedBb: '6b8e23',
    Sange: 'ffa500',
    SangeYd: 'ff4500',
    ScEd: 'da70d6',
    pOegTMnPd: 'eee8aa',
    pOegYF: '98fb98',
    pOeQe: 'afeeee',
    pOeviTetYd: 'db7093',
    papayawEp: 'ffefd5',
    pHKpuff: 'ffdab9',
    peru: 'cd853f',
    pRk: 'ffc0cb',
    plum: 'dda0dd',
    powMrXe: 'b0e0e6',
    purpN: '800080',
    YbeccapurpN: '663399',
    Yd: 'ff0000',
    Psybrown: 'bc8f8f',
    PyOXe: '4169e1',
    saddNbPwn: '8b4513',
    sOmon: 'fa8072',
    sandybPwn: 'f4a460',
    sHgYF: '2e8b57',
    sHshell: 'fff5ee',
    siFna: 'a0522d',
    silver: 'c0c0c0',
    skyXe: '87ceeb',
    UXe: '6a5acd',
    UWay: '708090',
    UgYy: '708090',
    snow: 'fffafa',
    sprRggYF: 'ff7f',
    stAlXe: '4682b4',
    tan: 'd2b48c',
    teO: '8080',
    tEstN: 'd8bfd8',
    tomato: 'ff6347',
    Qe: '40e0d0',
    viTet: 'ee82ee',
    JHt: 'f5deb3',
    wEte: 'ffffff',
    wEtesmoke: 'f5f5f5',
    Lw: 'ffff00',
    LwgYF: '9acd32'
  };

  function unpack() {
    const unpacked = {};
    const keys = Object.keys(names);
    const tkeys = Object.keys(map$1$1);
    let i, j, k, ok, nk;

    for (i = 0; i < keys.length; i++) {
      ok = nk = keys[i];

      for (j = 0; j < tkeys.length; j++) {
        k = tkeys[j];
        nk = nk.replace(k, map$1$1[k]);
      }

      k = parseInt(names[ok], 16);
      unpacked[nk] = [k >> 16 & 0xFF, k >> 8 & 0xFF, k & 0xFF];
    }

    return unpacked;
  }

  let names$1;

  function nameParse(str) {
    if (!names$1) {
      names$1 = unpack();
      names$1.transparent = [0, 0, 0, 0];
    }

    const a = names$1[str.toLowerCase()];
    return a && {
      r: a[0],
      g: a[1],
      b: a[2],
      a: a.length === 4 ? a[3] : 255
    };
  }

  function modHSL(v, i, ratio) {
    if (v) {
      let tmp = rgb2hsl(v);
      tmp[i] = Math.max(0, Math.min(tmp[i] + tmp[i] * ratio, i === 0 ? 360 : 1));
      tmp = hsl2rgb(tmp);
      v.r = tmp[0];
      v.g = tmp[1];
      v.b = tmp[2];
    }
  }

  function clone$1(v, proto) {
    return v ? Object.assign(proto || {}, v) : v;
  }

  function fromObject(input) {
    var v = {
      r: 0,
      g: 0,
      b: 0,
      a: 255
    };

    if (Array.isArray(input)) {
      if (input.length >= 3) {
        v = {
          r: input[0],
          g: input[1],
          b: input[2],
          a: 255
        };

        if (input.length > 3) {
          v.a = n2b(input[3]);
        }
      }
    } else {
      v = clone$1(input, {
        r: 0,
        g: 0,
        b: 0,
        a: 1
      });
      v.a = n2b(v.a);
    }

    return v;
  }

  function functionParse(str) {
    if (str.charAt(0) === 'r') {
      return rgbParse(str);
    }

    return hueParse(str);
  }

  class Color {
    constructor(input) {
      if (input instanceof Color) {
        return input;
      }

      const type = typeof input;
      let v;

      if (type === 'object') {
        v = fromObject(input);
      } else if (type === 'string') {
        v = hexParse(input) || nameParse(input) || functionParse(input);
      }

      this._rgb = v;
      this._valid = !!v;
    }

    get valid() {
      return this._valid;
    }

    get rgb() {
      var v = clone$1(this._rgb);

      if (v) {
        v.a = b2n(v.a);
      }

      return v;
    }

    set rgb(obj) {
      this._rgb = fromObject(obj);
    }

    rgbString() {
      return this._valid ? rgbString(this._rgb) : this._rgb;
    }

    hexString() {
      return this._valid ? hexString(this._rgb) : this._rgb;
    }

    hslString() {
      return this._valid ? hslString(this._rgb) : this._rgb;
    }

    mix(color, weight) {
      const me = this;

      if (color) {
        const c1 = me.rgb;
        const c2 = color.rgb;
        let w2;
        const p = weight === w2 ? 0.5 : weight;
        const w = 2 * p - 1;
        const a = c1.a - c2.a;
        const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
        w2 = 1 - w1;
        c1.r = 0xFF & w1 * c1.r + w2 * c2.r + 0.5;
        c1.g = 0xFF & w1 * c1.g + w2 * c2.g + 0.5;
        c1.b = 0xFF & w1 * c1.b + w2 * c2.b + 0.5;
        c1.a = p * c1.a + (1 - p) * c2.a;
        me.rgb = c1;
      }

      return me;
    }

    clone() {
      return new Color(this.rgb);
    }

    alpha(a) {
      this._rgb.a = n2b(a);
      return this;
    }

    clearer(ratio) {
      const rgb = this._rgb;
      rgb.a *= 1 - ratio;
      return this;
    }

    greyscale() {
      const rgb = this._rgb;
      const val = round(rgb.r * 0.3 + rgb.g * 0.59 + rgb.b * 0.11);
      rgb.r = rgb.g = rgb.b = val;
      return this;
    }

    opaquer(ratio) {
      const rgb = this._rgb;
      rgb.a *= 1 + ratio;
      return this;
    }

    negate() {
      const v = this._rgb;
      v.r = 255 - v.r;
      v.g = 255 - v.g;
      v.b = 255 - v.b;
      return this;
    }

    lighten(ratio) {
      modHSL(this._rgb, 2, ratio);
      return this;
    }

    darken(ratio) {
      modHSL(this._rgb, 2, -ratio);
      return this;
    }

    saturate(ratio) {
      modHSL(this._rgb, 1, ratio);
      return this;
    }

    desaturate(ratio) {
      modHSL(this._rgb, 1, -ratio);
      return this;
    }

    rotate(deg) {
      rotate(this._rgb, deg);
      return this;
    }

  }

  function index_esm(input) {
    return new Color(input);
  }

  const isPatternOrGradient = value => value instanceof CanvasGradient || value instanceof CanvasPattern;

  function color(value) {
    return isPatternOrGradient(value) ? value : index_esm(value);
  }

  function getHoverColor(value) {
    return isPatternOrGradient(value) ? value : index_esm(value).saturate(0.5).darken(0.1).hexString();
  }

  function noop() {}

  const uid = function () {
    let id = 0;
    return function () {
      return id++;
    };
  }();

  function isNullOrUndef(value) {
    return value === null || typeof value === 'undefined';
  }

  function isArray(value) {
    if (Array.isArray && Array.isArray(value)) {
      return true;
    }

    const type = Object.prototype.toString.call(value);

    if (type.substr(0, 7) === '[object' && type.substr(-6) === 'Array]') {
      return true;
    }

    return false;
  }

  function isObject(value) {
    return value !== null && Object.prototype.toString.call(value) === '[object Object]';
  }

  const isNumberFinite = value => (typeof value === 'number' || value instanceof Number) && isFinite(+value);

  function finiteOrDefault(value, defaultValue) {
    return isNumberFinite(value) ? value : defaultValue;
  }

  function valueOrDefault(value, defaultValue) {
    return typeof value === 'undefined' ? defaultValue : value;
  }

  const toPercentage = (value, dimension) => typeof value === 'string' && value.endsWith('%') ? parseFloat(value) / 100 : value / dimension;

  const toDimension = (value, dimension) => typeof value === 'string' && value.endsWith('%') ? parseFloat(value) / 100 * dimension : +value;

  function callback(fn, args, thisArg) {
    if (fn && typeof fn.call === 'function') {
      return fn.apply(thisArg, args);
    }
  }

  function each(loopable, fn, thisArg, reverse) {
    let i, len, keys;

    if (isArray(loopable)) {
      len = loopable.length;

      if (reverse) {
        for (i = len - 1; i >= 0; i--) {
          fn.call(thisArg, loopable[i], i);
        }
      } else {
        for (i = 0; i < len; i++) {
          fn.call(thisArg, loopable[i], i);
        }
      }
    } else if (isObject(loopable)) {
      keys = Object.keys(loopable);
      len = keys.length;

      for (i = 0; i < len; i++) {
        fn.call(thisArg, loopable[keys[i]], keys[i]);
      }
    }
  }

  function _elementsEqual(a0, a1) {
    let i, ilen, v0, v1;

    if (!a0 || !a1 || a0.length !== a1.length) {
      return false;
    }

    for (i = 0, ilen = a0.length; i < ilen; ++i) {
      v0 = a0[i];
      v1 = a1[i];

      if (v0.datasetIndex !== v1.datasetIndex || v0.index !== v1.index) {
        return false;
      }
    }

    return true;
  }

  function clone(source) {
    if (isArray(source)) {
      return source.map(clone);
    }

    if (isObject(source)) {
      const target = Object.create(null);
      const keys = Object.keys(source);
      const klen = keys.length;
      let k = 0;

      for (; k < klen; ++k) {
        target[keys[k]] = clone(source[keys[k]]);
      }

      return target;
    }

    return source;
  }

  function isValidKey(key) {
    return ['__proto__', 'prototype', 'constructor'].indexOf(key) === -1;
  }

  function _merger(key, target, source, options) {
    if (!isValidKey(key)) {
      return;
    }

    const tval = target[key];
    const sval = source[key];

    if (isObject(tval) && isObject(sval)) {
      merge(tval, sval, options);
    } else {
      target[key] = clone(sval);
    }
  }

  function merge(target, source, options) {
    const sources = isArray(source) ? source : [source];
    const ilen = sources.length;

    if (!isObject(target)) {
      return target;
    }

    options = options || {};
    const merger = options.merger || _merger;

    for (let i = 0; i < ilen; ++i) {
      source = sources[i];

      if (!isObject(source)) {
        continue;
      }

      const keys = Object.keys(source);

      for (let k = 0, klen = keys.length; k < klen; ++k) {
        merger(keys[k], target, source, options);
      }
    }

    return target;
  }

  function mergeIf(target, source) {
    return merge(target, source, {
      merger: _mergerIf
    });
  }

  function _mergerIf(key, target, source) {
    if (!isValidKey(key)) {
      return;
    }

    const tval = target[key];
    const sval = source[key];

    if (isObject(tval) && isObject(sval)) {
      mergeIf(tval, sval);
    } else if (!Object.prototype.hasOwnProperty.call(target, key)) {
      target[key] = clone(sval);
    }
  }

  function _deprecated(scope, value, previous, current) {
    if (value !== undefined) {
      console.warn(scope + ': "' + previous + '" is deprecated. Please use "' + current + '" instead');
    }
  }

  const emptyString = '';
  const dot = '.';

  function indexOfDotOrLength(key, start) {
    const idx = key.indexOf(dot, start);
    return idx === -1 ? key.length : idx;
  }

  function resolveObjectKey(obj, key) {
    if (key === emptyString) {
      return obj;
    }

    let pos = 0;
    let idx = indexOfDotOrLength(key, pos);

    while (obj && idx > pos) {
      obj = obj[key.substr(pos, idx - pos)];
      pos = idx + 1;
      idx = indexOfDotOrLength(key, pos);
    }

    return obj;
  }

  function _capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const defined = value => typeof value !== 'undefined';

  const isFunction = value => typeof value === 'function';

  const setsEqual = (a, b) => {
    if (a.size !== b.size) {
      return false;
    }

    for (const item of a) {
      if (!b.has(item)) {
        return false;
      }
    }

    return true;
  };

  const overrides = Object.create(null);
  const descriptors = Object.create(null);

  function getScope$1(node, key) {
    if (!key) {
      return node;
    }

    const keys = key.split('.');

    for (let i = 0, n = keys.length; i < n; ++i) {
      const k = keys[i];
      node = node[k] || (node[k] = Object.create(null));
    }

    return node;
  }

  function set(root, scope, values) {
    if (typeof scope === 'string') {
      return merge(getScope$1(root, scope), values);
    }

    return merge(getScope$1(root, ''), scope);
  }

  class Defaults {
    constructor(_descriptors) {
      this.animation = undefined;
      this.backgroundColor = 'rgba(0,0,0,0.1)';
      this.borderColor = 'rgba(0,0,0,0.1)';
      this.color = '#666';
      this.datasets = {};

      this.devicePixelRatio = context => context.chart.platform.getDevicePixelRatio();

      this.elements = {};
      this.events = ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'];
      this.font = {
        family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        size: 12,
        style: 'normal',
        lineHeight: 1.2,
        weight: null
      };
      this.hover = {};

      this.hoverBackgroundColor = (ctx, options) => getHoverColor(options.backgroundColor);

      this.hoverBorderColor = (ctx, options) => getHoverColor(options.borderColor);

      this.hoverColor = (ctx, options) => getHoverColor(options.color);

      this.indexAxis = 'x';
      this.interaction = {
        mode: 'nearest',
        intersect: true
      };
      this.maintainAspectRatio = true;
      this.onHover = null;
      this.onClick = null;
      this.parsing = true;
      this.plugins = {};
      this.responsive = true;
      this.scale = undefined;
      this.scales = {};
      this.showLine = true;
      this.describe(_descriptors);
    }

    set(scope, values) {
      return set(this, scope, values);
    }

    get(scope) {
      return getScope$1(this, scope);
    }

    describe(scope, values) {
      return set(descriptors, scope, values);
    }

    override(scope, values) {
      return set(overrides, scope, values);
    }

    route(scope, name, targetScope, targetName) {
      const scopeObject = getScope$1(this, scope);
      const targetScopeObject = getScope$1(this, targetScope);
      const privateName = '_' + name;
      Object.defineProperties(scopeObject, {
        [privateName]: {
          value: scopeObject[name],
          writable: true
        },
        [name]: {
          enumerable: true,

          get() {
            const local = this[privateName];
            const target = targetScopeObject[targetName];

            if (isObject(local)) {
              return Object.assign({}, target, local);
            }

            return valueOrDefault(local, target);
          },

          set(value) {
            this[privateName] = value;
          }

        }
      });
    }

  }

  var defaults = new Defaults({
    _scriptable: name => !name.startsWith('on'),
    _indexable: name => name !== 'events',
    hover: {
      _fallback: 'interaction'
    },
    interaction: {
      _scriptable: false,
      _indexable: false
    }
  });
  const PI = Math.PI;
  const TAU = 2 * PI;
  const PITAU = TAU + PI;
  const INFINITY = Number.POSITIVE_INFINITY;
  const RAD_PER_DEG = PI / 180;
  const HALF_PI = PI / 2;
  const QUARTER_PI = PI / 4;
  const TWO_THIRDS_PI = PI * 2 / 3;
  const log10 = Math.log10;
  const sign = Math.sign;

  function niceNum(range) {
    const roundedRange = Math.round(range);
    range = almostEquals(range, roundedRange, range / 1000) ? roundedRange : range;
    const niceRange = Math.pow(10, Math.floor(log10(range)));
    const fraction = range / niceRange;
    const niceFraction = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
    return niceFraction * niceRange;
  }

  function _factorize(value) {
    const result = [];
    const sqrt = Math.sqrt(value);
    let i;

    for (i = 1; i < sqrt; i++) {
      if (value % i === 0) {
        result.push(i);
        result.push(value / i);
      }
    }

    if (sqrt === (sqrt | 0)) {
      result.push(sqrt);
    }

    result.sort((a, b) => a - b).pop();
    return result;
  }

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function almostEquals(x, y, epsilon) {
    return Math.abs(x - y) < epsilon;
  }

  function almostWhole(x, epsilon) {
    const rounded = Math.round(x);
    return rounded - epsilon <= x && rounded + epsilon >= x;
  }

  function _setMinAndMaxByKey(array, target, property) {
    let i, ilen, value;

    for (i = 0, ilen = array.length; i < ilen; i++) {
      value = array[i][property];

      if (!isNaN(value)) {
        target.min = Math.min(target.min, value);
        target.max = Math.max(target.max, value);
      }
    }
  }

  function toRadians(degrees) {
    return degrees * (PI / 180);
  }

  function toDegrees(radians) {
    return radians * (180 / PI);
  }

  function _decimalPlaces(x) {
    if (!isNumberFinite(x)) {
      return;
    }

    let e = 1;
    let p = 0;

    while (Math.round(x * e) / e !== x) {
      e *= 10;
      p++;
    }

    return p;
  }

  function getAngleFromPoint(centrePoint, anglePoint) {
    const distanceFromXCenter = anglePoint.x - centrePoint.x;
    const distanceFromYCenter = anglePoint.y - centrePoint.y;
    const radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);
    let angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);

    if (angle < -0.5 * PI) {
      angle += TAU;
    }

    return {
      angle,
      distance: radialDistanceFromCenter
    };
  }

  function distanceBetweenPoints(pt1, pt2) {
    return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
  }

  function _angleDiff(a, b) {
    return (a - b + PITAU) % TAU - PI;
  }

  function _normalizeAngle(a) {
    return (a % TAU + TAU) % TAU;
  }

  function _angleBetween(angle, start, end, sameAngleIsFullCircle) {
    const a = _normalizeAngle(angle);

    const s = _normalizeAngle(start);

    const e = _normalizeAngle(end);

    const angleToStart = _normalizeAngle(s - a);

    const angleToEnd = _normalizeAngle(e - a);

    const startToAngle = _normalizeAngle(a - s);

    const endToAngle = _normalizeAngle(a - e);

    return a === s || a === e || sameAngleIsFullCircle && s === e || angleToStart > angleToEnd && startToAngle < endToAngle;
  }

  function _limitValue(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function _int16Range(value) {
    return _limitValue(value, -32768, 32767);
  }

  function toFontString(font) {
    if (!font || isNullOrUndef(font.size) || isNullOrUndef(font.family)) {
      return null;
    }

    return (font.style ? font.style + ' ' : '') + (font.weight ? font.weight + ' ' : '') + font.size + 'px ' + font.family;
  }

  function _measureText(ctx, data, gc, longest, string) {
    let textWidth = data[string];

    if (!textWidth) {
      textWidth = data[string] = ctx.measureText(string).width;
      gc.push(string);
    }

    if (textWidth > longest) {
      longest = textWidth;
    }

    return longest;
  }

  function _longestText(ctx, font, arrayOfThings, cache) {
    cache = cache || {};
    let data = cache.data = cache.data || {};
    let gc = cache.garbageCollect = cache.garbageCollect || [];

    if (cache.font !== font) {
      data = cache.data = {};
      gc = cache.garbageCollect = [];
      cache.font = font;
    }

    ctx.save();
    ctx.font = font;
    let longest = 0;
    const ilen = arrayOfThings.length;
    let i, j, jlen, thing, nestedThing;

    for (i = 0; i < ilen; i++) {
      thing = arrayOfThings[i];

      if (thing !== undefined && thing !== null && isArray(thing) !== true) {
        longest = _measureText(ctx, data, gc, longest, thing);
      } else if (isArray(thing)) {
        for (j = 0, jlen = thing.length; j < jlen; j++) {
          nestedThing = thing[j];

          if (nestedThing !== undefined && nestedThing !== null && !isArray(nestedThing)) {
            longest = _measureText(ctx, data, gc, longest, nestedThing);
          }
        }
      }
    }

    ctx.restore();
    const gcLen = gc.length / 2;

    if (gcLen > arrayOfThings.length) {
      for (i = 0; i < gcLen; i++) {
        delete data[gc[i]];
      }

      gc.splice(0, gcLen);
    }

    return longest;
  }

  function _alignPixel(chart, pixel, width) {
    const devicePixelRatio = chart.currentDevicePixelRatio;
    const halfWidth = width !== 0 ? Math.max(width / 2, 0.5) : 0;
    return Math.round((pixel - halfWidth) * devicePixelRatio) / devicePixelRatio + halfWidth;
  }

  function clearCanvas(canvas, ctx) {
    ctx = ctx || canvas.getContext('2d');
    ctx.save();
    ctx.resetTransform();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  function drawPoint(ctx, options, x, y) {
    let type, xOffset, yOffset, size, cornerRadius;
    const style = options.pointStyle;
    const rotation = options.rotation;
    const radius = options.radius;
    let rad = (rotation || 0) * RAD_PER_DEG;

    if (style && typeof style === 'object') {
      type = style.toString();

      if (type === '[object HTMLImageElement]' || type === '[object HTMLCanvasElement]') {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rad);
        ctx.drawImage(style, -style.width / 2, -style.height / 2, style.width, style.height);
        ctx.restore();
        return;
      }
    }

    if (isNaN(radius) || radius <= 0) {
      return;
    }

    ctx.beginPath();

    switch (style) {
      default:
        ctx.arc(x, y, radius, 0, TAU);
        ctx.closePath();
        break;

      case 'triangle':
        ctx.moveTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
        rad += TWO_THIRDS_PI;
        ctx.lineTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
        rad += TWO_THIRDS_PI;
        ctx.lineTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
        ctx.closePath();
        break;

      case 'rectRounded':
        cornerRadius = radius * 0.516;
        size = radius - cornerRadius;
        xOffset = Math.cos(rad + QUARTER_PI) * size;
        yOffset = Math.sin(rad + QUARTER_PI) * size;
        ctx.arc(x - xOffset, y - yOffset, cornerRadius, rad - PI, rad - HALF_PI);
        ctx.arc(x + yOffset, y - xOffset, cornerRadius, rad - HALF_PI, rad);
        ctx.arc(x + xOffset, y + yOffset, cornerRadius, rad, rad + HALF_PI);
        ctx.arc(x - yOffset, y + xOffset, cornerRadius, rad + HALF_PI, rad + PI);
        ctx.closePath();
        break;

      case 'rect':
        if (!rotation) {
          size = Math.SQRT1_2 * radius;
          ctx.rect(x - size, y - size, 2 * size, 2 * size);
          break;
        }

        rad += QUARTER_PI;

      case 'rectRot':
        xOffset = Math.cos(rad) * radius;
        yOffset = Math.sin(rad) * radius;
        ctx.moveTo(x - xOffset, y - yOffset);
        ctx.lineTo(x + yOffset, y - xOffset);
        ctx.lineTo(x + xOffset, y + yOffset);
        ctx.lineTo(x - yOffset, y + xOffset);
        ctx.closePath();
        break;

      case 'crossRot':
        rad += QUARTER_PI;

      case 'cross':
        xOffset = Math.cos(rad) * radius;
        yOffset = Math.sin(rad) * radius;
        ctx.moveTo(x - xOffset, y - yOffset);
        ctx.lineTo(x + xOffset, y + yOffset);
        ctx.moveTo(x + yOffset, y - xOffset);
        ctx.lineTo(x - yOffset, y + xOffset);
        break;

      case 'star':
        xOffset = Math.cos(rad) * radius;
        yOffset = Math.sin(rad) * radius;
        ctx.moveTo(x - xOffset, y - yOffset);
        ctx.lineTo(x + xOffset, y + yOffset);
        ctx.moveTo(x + yOffset, y - xOffset);
        ctx.lineTo(x - yOffset, y + xOffset);
        rad += QUARTER_PI;
        xOffset = Math.cos(rad) * radius;
        yOffset = Math.sin(rad) * radius;
        ctx.moveTo(x - xOffset, y - yOffset);
        ctx.lineTo(x + xOffset, y + yOffset);
        ctx.moveTo(x + yOffset, y - xOffset);
        ctx.lineTo(x - yOffset, y + xOffset);
        break;

      case 'line':
        xOffset = Math.cos(rad) * radius;
        yOffset = Math.sin(rad) * radius;
        ctx.moveTo(x - xOffset, y - yOffset);
        ctx.lineTo(x + xOffset, y + yOffset);
        break;

      case 'dash':
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(rad) * radius, y + Math.sin(rad) * radius);
        break;
    }

    ctx.fill();

    if (options.borderWidth > 0) {
      ctx.stroke();
    }
  }

  function _isPointInArea(point, area, margin) {
    margin = margin || 0.5;
    return point && point.x > area.left - margin && point.x < area.right + margin && point.y > area.top - margin && point.y < area.bottom + margin;
  }

  function clipArea(ctx, area) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
    ctx.clip();
  }

  function unclipArea(ctx) {
    ctx.restore();
  }

  function _steppedLineTo(ctx, previous, target, flip, mode) {
    if (!previous) {
      return ctx.lineTo(target.x, target.y);
    }

    if (mode === 'middle') {
      const midpoint = (previous.x + target.x) / 2.0;
      ctx.lineTo(midpoint, previous.y);
      ctx.lineTo(midpoint, target.y);
    } else if (mode === 'after' !== !!flip) {
      ctx.lineTo(previous.x, target.y);
    } else {
      ctx.lineTo(target.x, previous.y);
    }

    ctx.lineTo(target.x, target.y);
  }

  function _bezierCurveTo(ctx, previous, target, flip) {
    if (!previous) {
      return ctx.lineTo(target.x, target.y);
    }

    ctx.bezierCurveTo(flip ? previous.cp1x : previous.cp2x, flip ? previous.cp1y : previous.cp2y, flip ? target.cp2x : target.cp1x, flip ? target.cp2y : target.cp1y, target.x, target.y);
  }

  function renderText(ctx, text, x, y, font, opts = {}) {
    const lines = isArray(text) ? text : [text];
    const stroke = opts.strokeWidth > 0 && opts.strokeColor !== '';
    let i, line;
    ctx.save();
    ctx.font = font.string;
    setRenderOpts(ctx, opts);

    for (i = 0; i < lines.length; ++i) {
      line = lines[i];

      if (stroke) {
        if (opts.strokeColor) {
          ctx.strokeStyle = opts.strokeColor;
        }

        if (!isNullOrUndef(opts.strokeWidth)) {
          ctx.lineWidth = opts.strokeWidth;
        }

        ctx.strokeText(line, x, y, opts.maxWidth);
      }

      ctx.fillText(line, x, y, opts.maxWidth);
      decorateText(ctx, x, y, line, opts);
      y += font.lineHeight;
    }

    ctx.restore();
  }

  function setRenderOpts(ctx, opts) {
    if (opts.translation) {
      ctx.translate(opts.translation[0], opts.translation[1]);
    }

    if (!isNullOrUndef(opts.rotation)) {
      ctx.rotate(opts.rotation);
    }

    if (opts.color) {
      ctx.fillStyle = opts.color;
    }

    if (opts.textAlign) {
      ctx.textAlign = opts.textAlign;
    }

    if (opts.textBaseline) {
      ctx.textBaseline = opts.textBaseline;
    }
  }

  function decorateText(ctx, x, y, line, opts) {
    if (opts.strikethrough || opts.underline) {
      const metrics = ctx.measureText(line);
      const left = x - metrics.actualBoundingBoxLeft;
      const right = x + metrics.actualBoundingBoxRight;
      const top = y - metrics.actualBoundingBoxAscent;
      const bottom = y + metrics.actualBoundingBoxDescent;
      const yDecoration = opts.strikethrough ? (top + bottom) / 2 : bottom;
      ctx.strokeStyle = ctx.fillStyle;
      ctx.beginPath();
      ctx.lineWidth = opts.decorationWidth || 2;
      ctx.moveTo(left, yDecoration);
      ctx.lineTo(right, yDecoration);
      ctx.stroke();
    }
  }

  function addRoundedRectPath(ctx, rect) {
    const {
      x,
      y,
      w,
      h,
      radius
    } = rect;
    ctx.arc(x + radius.topLeft, y + radius.topLeft, radius.topLeft, -HALF_PI, PI, true);
    ctx.lineTo(x, y + h - radius.bottomLeft);
    ctx.arc(x + radius.bottomLeft, y + h - radius.bottomLeft, radius.bottomLeft, PI, HALF_PI, true);
    ctx.lineTo(x + w - radius.bottomRight, y + h);
    ctx.arc(x + w - radius.bottomRight, y + h - radius.bottomRight, radius.bottomRight, HALF_PI, 0, true);
    ctx.lineTo(x + w, y + radius.topRight);
    ctx.arc(x + w - radius.topRight, y + radius.topRight, radius.topRight, 0, -HALF_PI, true);
    ctx.lineTo(x + radius.topLeft, y);
  }

  function _lookup(table, value, cmp) {
    cmp = cmp || (index => table[index] < value);

    let hi = table.length - 1;
    let lo = 0;
    let mid;

    while (hi - lo > 1) {
      mid = lo + hi >> 1;

      if (cmp(mid)) {
        lo = mid;
      } else {
        hi = mid;
      }
    }

    return {
      lo,
      hi
    };
  }

  const _lookupByKey = (table, key, value) => _lookup(table, value, index => table[index][key] < value);

  const _rlookupByKey = (table, key, value) => _lookup(table, value, index => table[index][key] >= value);

  function _filterBetween(values, min, max) {
    let start = 0;
    let end = values.length;

    while (start < end && values[start] < min) {
      start++;
    }

    while (end > start && values[end - 1] > max) {
      end--;
    }

    return start > 0 || end < values.length ? values.slice(start, end) : values;
  }

  const arrayEvents = ['push', 'pop', 'shift', 'splice', 'unshift'];

  function listenArrayEvents(array, listener) {
    if (array._chartjs) {
      array._chartjs.listeners.push(listener);

      return;
    }

    Object.defineProperty(array, '_chartjs', {
      configurable: true,
      enumerable: false,
      value: {
        listeners: [listener]
      }
    });
    arrayEvents.forEach(key => {
      const method = '_onData' + _capitalize(key);

      const base = array[key];
      Object.defineProperty(array, key, {
        configurable: true,
        enumerable: false,

        value(...args) {
          const res = base.apply(this, args);

          array._chartjs.listeners.forEach(object => {
            if (typeof object[method] === 'function') {
              object[method](...args);
            }
          });

          return res;
        }

      });
    });
  }

  function unlistenArrayEvents(array, listener) {
    const stub = array._chartjs;

    if (!stub) {
      return;
    }

    const listeners = stub.listeners;
    const index = listeners.indexOf(listener);

    if (index !== -1) {
      listeners.splice(index, 1);
    }

    if (listeners.length > 0) {
      return;
    }

    arrayEvents.forEach(key => {
      delete array[key];
    });
    delete array._chartjs;
  }

  function _arrayUnique(items) {
    const set = new Set();
    let i, ilen;

    for (i = 0, ilen = items.length; i < ilen; ++i) {
      set.add(items[i]);
    }

    if (set.size === ilen) {
      return items;
    }

    return Array.from(set);
  }

  function _getParentNode(domNode) {
    let parent = domNode.parentNode;

    if (parent && parent.toString() === '[object ShadowRoot]') {
      parent = parent.host;
    }

    return parent;
  }

  function parseMaxStyle(styleValue, node, parentProperty) {
    let valueInPixels;

    if (typeof styleValue === 'string') {
      valueInPixels = parseInt(styleValue, 10);

      if (styleValue.indexOf('%') !== -1) {
        valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
      }
    } else {
      valueInPixels = styleValue;
    }

    return valueInPixels;
  }

  const getComputedStyle = element => window.getComputedStyle(element, null);

  function getStyle(el, property) {
    return getComputedStyle(el).getPropertyValue(property);
  }

  const positions = ['top', 'right', 'bottom', 'left'];

  function getPositionedStyle(styles, style, suffix) {
    const result = {};
    suffix = suffix ? '-' + suffix : '';

    for (let i = 0; i < 4; i++) {
      const pos = positions[i];
      result[pos] = parseFloat(styles[style + '-' + pos + suffix]) || 0;
    }

    result.width = result.left + result.right;
    result.height = result.top + result.bottom;
    return result;
  }

  const useOffsetPos = (x, y, target) => (x > 0 || y > 0) && (!target || !target.shadowRoot);

  function getCanvasPosition(evt, canvas) {
    const e = evt.native || evt;
    const touches = e.touches;
    const source = touches && touches.length ? touches[0] : e;
    const {
      offsetX,
      offsetY
    } = source;
    let box = false;
    let x, y;

    if (useOffsetPos(offsetX, offsetY, e.target)) {
      x = offsetX;
      y = offsetY;
    } else {
      const rect = canvas.getBoundingClientRect();
      x = source.clientX - rect.left;
      y = source.clientY - rect.top;
      box = true;
    }

    return {
      x,
      y,
      box
    };
  }

  function getRelativePosition$1(evt, chart) {
    const {
      canvas,
      currentDevicePixelRatio
    } = chart;
    const style = getComputedStyle(canvas);
    const borderBox = style.boxSizing === 'border-box';
    const paddings = getPositionedStyle(style, 'padding');
    const borders = getPositionedStyle(style, 'border', 'width');
    const {
      x,
      y,
      box
    } = getCanvasPosition(evt, canvas);
    const xOffset = paddings.left + (box && borders.left);
    const yOffset = paddings.top + (box && borders.top);
    let {
      width,
      height
    } = chart;

    if (borderBox) {
      width -= paddings.width + borders.width;
      height -= paddings.height + borders.height;
    }

    return {
      x: Math.round((x - xOffset) / width * canvas.width / currentDevicePixelRatio),
      y: Math.round((y - yOffset) / height * canvas.height / currentDevicePixelRatio)
    };
  }

  function getContainerSize(canvas, width, height) {
    let maxWidth, maxHeight;

    if (width === undefined || height === undefined) {
      const container = _getParentNode(canvas);

      if (!container) {
        width = canvas.clientWidth;
        height = canvas.clientHeight;
      } else {
        const rect = container.getBoundingClientRect();
        const containerStyle = getComputedStyle(container);
        const containerBorder = getPositionedStyle(containerStyle, 'border', 'width');
        const containerPadding = getPositionedStyle(containerStyle, 'padding');
        width = rect.width - containerPadding.width - containerBorder.width;
        height = rect.height - containerPadding.height - containerBorder.height;
        maxWidth = parseMaxStyle(containerStyle.maxWidth, container, 'clientWidth');
        maxHeight = parseMaxStyle(containerStyle.maxHeight, container, 'clientHeight');
      }
    }

    return {
      width,
      height,
      maxWidth: maxWidth || INFINITY,
      maxHeight: maxHeight || INFINITY
    };
  }

  const round1 = v => Math.round(v * 10) / 10;

  function getMaximumSize(canvas, bbWidth, bbHeight, aspectRatio) {
    const style = getComputedStyle(canvas);
    const margins = getPositionedStyle(style, 'margin');
    const maxWidth = parseMaxStyle(style.maxWidth, canvas, 'clientWidth') || INFINITY;
    const maxHeight = parseMaxStyle(style.maxHeight, canvas, 'clientHeight') || INFINITY;
    const containerSize = getContainerSize(canvas, bbWidth, bbHeight);
    let {
      width,
      height
    } = containerSize;

    if (style.boxSizing === 'content-box') {
      const borders = getPositionedStyle(style, 'border', 'width');
      const paddings = getPositionedStyle(style, 'padding');
      width -= paddings.width + borders.width;
      height -= paddings.height + borders.height;
    }

    width = Math.max(0, width - margins.width);
    height = Math.max(0, aspectRatio ? Math.floor(width / aspectRatio) : height - margins.height);
    width = round1(Math.min(width, maxWidth, containerSize.maxWidth));
    height = round1(Math.min(height, maxHeight, containerSize.maxHeight));

    if (width && !height) {
      height = round1(width / 2);
    }

    return {
      width,
      height
    };
  }

  function retinaScale(chart, forceRatio, forceStyle) {
    const pixelRatio = forceRatio || 1;
    const deviceHeight = Math.floor(chart.height * pixelRatio);
    const deviceWidth = Math.floor(chart.width * pixelRatio);
    chart.height = deviceHeight / pixelRatio;
    chart.width = deviceWidth / pixelRatio;
    const canvas = chart.canvas;

    if (canvas.style && (forceStyle || !canvas.style.height && !canvas.style.width)) {
      canvas.style.height = `${chart.height}px`;
      canvas.style.width = `${chart.width}px`;
    }

    if (chart.currentDevicePixelRatio !== pixelRatio || canvas.height !== deviceHeight || canvas.width !== deviceWidth) {
      chart.currentDevicePixelRatio = pixelRatio;
      canvas.height = deviceHeight;
      canvas.width = deviceWidth;
      chart.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      return true;
    }

    return false;
  }

  const supportsEventListenerOptions = function () {
    let passiveSupported = false;

    try {
      const options = {
        get passive() {
          passiveSupported = true;
          return false;
        }

      };
      window.addEventListener('test', null, options);
      window.removeEventListener('test', null, options);
    } catch (e) {}

    return passiveSupported;
  }();

  function readUsedSize(element, property) {
    const value = getStyle(element, property);
    const matches = value && value.match(/^(\d+)(\.\d+)?px$/);
    return matches ? +matches[1] : undefined;
  }

  function getRelativePosition(e, chart) {
    if ('native' in e) {
      return {
        x: e.x,
        y: e.y
      };
    }

    return getRelativePosition$1(e, chart);
  }

  function evaluateAllVisibleItems(chart, handler) {
    const metasets = chart.getSortedVisibleDatasetMetas();
    let index, data, element;

    for (let i = 0, ilen = metasets.length; i < ilen; ++i) {
      ({
        index,
        data
      } = metasets[i]);

      for (let j = 0, jlen = data.length; j < jlen; ++j) {
        element = data[j];

        if (!element.skip) {
          handler(element, index, j);
        }
      }
    }
  }

  function binarySearch(metaset, axis, value, intersect) {
    const {
      controller,
      data,
      _sorted
    } = metaset;
    const iScale = controller._cachedMeta.iScale;

    if (iScale && axis === iScale.axis && _sorted && data.length) {
      const lookupMethod = iScale._reversePixels ? _rlookupByKey : _lookupByKey;

      if (!intersect) {
        return lookupMethod(data, axis, value);
      } else if (controller._sharedOptions) {
        const el = data[0];
        const range = typeof el.getRange === 'function' && el.getRange(axis);

        if (range) {
          const start = lookupMethod(data, axis, value - range);
          const end = lookupMethod(data, axis, value + range);
          return {
            lo: start.lo,
            hi: end.hi
          };
        }
      }
    }

    return {
      lo: 0,
      hi: data.length - 1
    };
  }

  function optimizedEvaluateItems(chart, axis, position, handler, intersect) {
    const metasets = chart.getSortedVisibleDatasetMetas();
    const value = position[axis];

    for (let i = 0, ilen = metasets.length; i < ilen; ++i) {
      const {
        index,
        data
      } = metasets[i];
      const {
        lo,
        hi
      } = binarySearch(metasets[i], axis, value, intersect);

      for (let j = lo; j <= hi; ++j) {
        const element = data[j];

        if (!element.skip) {
          handler(element, index, j);
        }
      }
    }
  }

  function getDistanceMetricForAxis(axis) {
    const useX = axis.indexOf('x') !== -1;
    const useY = axis.indexOf('y') !== -1;
    return function (pt1, pt2) {
      const deltaX = useX ? Math.abs(pt1.x - pt2.x) : 0;
      const deltaY = useY ? Math.abs(pt1.y - pt2.y) : 0;
      return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    };
  }

  function getIntersectItems(chart, position, axis, useFinalPosition) {
    const items = [];

    if (!_isPointInArea(position, chart.chartArea, chart._minPadding)) {
      return items;
    }

    const evaluationFunc = function (element, datasetIndex, index) {
      if (element.inRange(position.x, position.y, useFinalPosition)) {
        items.push({
          element,
          datasetIndex,
          index
        });
      }
    };

    optimizedEvaluateItems(chart, axis, position, evaluationFunc, true);
    return items;
  }

  function getNearestItems(chart, position, axis, intersect, useFinalPosition) {
    const distanceMetric = getDistanceMetricForAxis(axis);
    let minDistance = Number.POSITIVE_INFINITY;
    let items = [];

    if (!_isPointInArea(position, chart.chartArea, chart._minPadding)) {
      return items;
    }

    const evaluationFunc = function (element, datasetIndex, index) {
      if (intersect && !element.inRange(position.x, position.y, useFinalPosition)) {
        return;
      }

      const center = element.getCenterPoint(useFinalPosition);

      if (!_isPointInArea(center, chart.chartArea, chart._minPadding)) {
        return;
      }

      const distance = distanceMetric(position, center);

      if (distance < minDistance) {
        items = [{
          element,
          datasetIndex,
          index
        }];
        minDistance = distance;
      } else if (distance === minDistance) {
        items.push({
          element,
          datasetIndex,
          index
        });
      }
    };

    optimizedEvaluateItems(chart, axis, position, evaluationFunc);
    return items;
  }

  function getAxisItems(chart, e, options, useFinalPosition) {
    const position = getRelativePosition(e, chart);
    const items = [];
    const axis = options.axis;
    const rangeMethod = axis === 'x' ? 'inXRange' : 'inYRange';
    let intersectsItem = false;
    evaluateAllVisibleItems(chart, (element, datasetIndex, index) => {
      if (element[rangeMethod](position[axis], useFinalPosition)) {
        items.push({
          element,
          datasetIndex,
          index
        });
      }

      if (element.inRange(position.x, position.y, useFinalPosition)) {
        intersectsItem = true;
      }
    });

    if (options.intersect && !intersectsItem) {
      return [];
    }

    return items;
  }

  var Interaction = {
    modes: {
      index(chart, e, options, useFinalPosition) {
        const position = getRelativePosition(e, chart);
        const axis = options.axis || 'x';
        const items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition) : getNearestItems(chart, position, axis, false, useFinalPosition);
        const elements = [];

        if (!items.length) {
          return [];
        }

        chart.getSortedVisibleDatasetMetas().forEach(meta => {
          const index = items[0].index;
          const element = meta.data[index];

          if (element && !element.skip) {
            elements.push({
              element,
              datasetIndex: meta.index,
              index
            });
          }
        });
        return elements;
      },

      dataset(chart, e, options, useFinalPosition) {
        const position = getRelativePosition(e, chart);
        const axis = options.axis || 'xy';
        let items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition) : getNearestItems(chart, position, axis, false, useFinalPosition);

        if (items.length > 0) {
          const datasetIndex = items[0].datasetIndex;
          const data = chart.getDatasetMeta(datasetIndex).data;
          items = [];

          for (let i = 0; i < data.length; ++i) {
            items.push({
              element: data[i],
              datasetIndex,
              index: i
            });
          }
        }

        return items;
      },

      point(chart, e, options, useFinalPosition) {
        const position = getRelativePosition(e, chart);
        const axis = options.axis || 'xy';
        return getIntersectItems(chart, position, axis, useFinalPosition);
      },

      nearest(chart, e, options, useFinalPosition) {
        const position = getRelativePosition(e, chart);
        const axis = options.axis || 'xy';
        return getNearestItems(chart, position, axis, options.intersect, useFinalPosition);
      },

      x(chart, e, options, useFinalPosition) {
        options.axis = 'x';
        return getAxisItems(chart, e, options, useFinalPosition);
      },

      y(chart, e, options, useFinalPosition) {
        options.axis = 'y';
        return getAxisItems(chart, e, options, useFinalPosition);
      }

    }
  };
  const LINE_HEIGHT = new RegExp(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);
  const FONT_STYLE = new RegExp(/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/);

  function toLineHeight(value, size) {
    const matches = ('' + value).match(LINE_HEIGHT);

    if (!matches || matches[1] === 'normal') {
      return size * 1.2;
    }

    value = +matches[2];

    switch (matches[3]) {
      case 'px':
        return value;

      case '%':
        value /= 100;
        break;
    }

    return size * value;
  }

  const numberOrZero$1 = v => +v || 0;

  function _readValueToProps(value, props) {
    const ret = {};
    const objProps = isObject(props);
    const keys = objProps ? Object.keys(props) : props;
    const read = isObject(value) ? objProps ? prop => valueOrDefault(value[prop], value[props[prop]]) : prop => value[prop] : () => value;

    for (const prop of keys) {
      ret[prop] = numberOrZero$1(read(prop));
    }

    return ret;
  }

  function toTRBL(value) {
    return _readValueToProps(value, {
      top: 'y',
      right: 'x',
      bottom: 'y',
      left: 'x'
    });
  }

  function toTRBLCorners(value) {
    return _readValueToProps(value, ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']);
  }

  function toPadding(value) {
    const obj = toTRBL(value);
    obj.width = obj.left + obj.right;
    obj.height = obj.top + obj.bottom;
    return obj;
  }

  function toFont(options, fallback) {
    options = options || {};
    fallback = fallback || defaults.font;
    let size = valueOrDefault(options.size, fallback.size);

    if (typeof size === 'string') {
      size = parseInt(size, 10);
    }

    let style = valueOrDefault(options.style, fallback.style);

    if (style && !('' + style).match(FONT_STYLE)) {
      console.warn('Invalid font style specified: "' + style + '"');
      style = '';
    }

    const font = {
      family: valueOrDefault(options.family, fallback.family),
      lineHeight: toLineHeight(valueOrDefault(options.lineHeight, fallback.lineHeight), size),
      size,
      style,
      weight: valueOrDefault(options.weight, fallback.weight),
      string: ''
    };
    font.string = toFontString(font);
    return font;
  }

  function resolve(inputs, context, index, info) {
    let cacheable = true;
    let i, ilen, value;

    for (i = 0, ilen = inputs.length; i < ilen; ++i) {
      value = inputs[i];

      if (value === undefined) {
        continue;
      }

      if (context !== undefined && typeof value === 'function') {
        value = value(context);
        cacheable = false;
      }

      if (index !== undefined && isArray(value)) {
        value = value[index % value.length];
        cacheable = false;
      }

      if (value !== undefined) {
        if (info && !cacheable) {
          info.cacheable = false;
        }

        return value;
      }
    }
  }

  function _addGrace(minmax, grace) {
    const {
      min,
      max
    } = minmax;
    return {
      min: min - Math.abs(toDimension(grace, min)),
      max: max + toDimension(grace, max)
    };
  }

  const STATIC_POSITIONS = ['left', 'top', 'right', 'bottom'];

  function filterByPosition(array, position) {
    return array.filter(v => v.pos === position);
  }

  function filterDynamicPositionByAxis(array, axis) {
    return array.filter(v => STATIC_POSITIONS.indexOf(v.pos) === -1 && v.box.axis === axis);
  }

  function sortByWeight(array, reverse) {
    return array.sort((a, b) => {
      const v0 = reverse ? b : a;
      const v1 = reverse ? a : b;
      return v0.weight === v1.weight ? v0.index - v1.index : v0.weight - v1.weight;
    });
  }

  function wrapBoxes(boxes) {
    const layoutBoxes = [];
    let i, ilen, box;

    for (i = 0, ilen = (boxes || []).length; i < ilen; ++i) {
      box = boxes[i];
      layoutBoxes.push({
        index: i,
        box,
        pos: box.position,
        horizontal: box.isHorizontal(),
        weight: box.weight
      });
    }

    return layoutBoxes;
  }

  function setLayoutDims(layouts, params) {
    let i, ilen, layout;

    for (i = 0, ilen = layouts.length; i < ilen; ++i) {
      layout = layouts[i];

      if (layout.horizontal) {
        layout.width = layout.box.fullSize && params.availableWidth;
        layout.height = params.hBoxMaxHeight;
      } else {
        layout.width = params.vBoxMaxWidth;
        layout.height = layout.box.fullSize && params.availableHeight;
      }
    }
  }

  function buildLayoutBoxes(boxes) {
    const layoutBoxes = wrapBoxes(boxes);
    const fullSize = sortByWeight(layoutBoxes.filter(wrap => wrap.box.fullSize), true);
    const left = sortByWeight(filterByPosition(layoutBoxes, 'left'), true);
    const right = sortByWeight(filterByPosition(layoutBoxes, 'right'));
    const top = sortByWeight(filterByPosition(layoutBoxes, 'top'), true);
    const bottom = sortByWeight(filterByPosition(layoutBoxes, 'bottom'));
    const centerHorizontal = filterDynamicPositionByAxis(layoutBoxes, 'x');
    const centerVertical = filterDynamicPositionByAxis(layoutBoxes, 'y');
    return {
      fullSize,
      leftAndTop: left.concat(top),
      rightAndBottom: right.concat(centerVertical).concat(bottom).concat(centerHorizontal),
      chartArea: filterByPosition(layoutBoxes, 'chartArea'),
      vertical: left.concat(right).concat(centerVertical),
      horizontal: top.concat(bottom).concat(centerHorizontal)
    };
  }

  function getCombinedMax(maxPadding, chartArea, a, b) {
    return Math.max(maxPadding[a], chartArea[a]) + Math.max(maxPadding[b], chartArea[b]);
  }

  function updateMaxPadding(maxPadding, boxPadding) {
    maxPadding.top = Math.max(maxPadding.top, boxPadding.top);
    maxPadding.left = Math.max(maxPadding.left, boxPadding.left);
    maxPadding.bottom = Math.max(maxPadding.bottom, boxPadding.bottom);
    maxPadding.right = Math.max(maxPadding.right, boxPadding.right);
  }

  function updateDims(chartArea, params, layout) {
    const box = layout.box;
    const maxPadding = chartArea.maxPadding;

    if (!isObject(layout.pos)) {
      if (layout.size) {
        chartArea[layout.pos] -= layout.size;
      }

      layout.size = layout.horizontal ? box.height : box.width;
      chartArea[layout.pos] += layout.size;
    }

    if (box.getPadding) {
      updateMaxPadding(maxPadding, box.getPadding());
    }

    const newWidth = Math.max(0, params.outerWidth - getCombinedMax(maxPadding, chartArea, 'left', 'right'));
    const newHeight = Math.max(0, params.outerHeight - getCombinedMax(maxPadding, chartArea, 'top', 'bottom'));
    const widthChanged = newWidth !== chartArea.w;
    const heightChanged = newHeight !== chartArea.h;
    chartArea.w = newWidth;
    chartArea.h = newHeight;
    return layout.horizontal ? {
      same: widthChanged,
      other: heightChanged
    } : {
      same: heightChanged,
      other: widthChanged
    };
  }

  function handleMaxPadding(chartArea) {
    const maxPadding = chartArea.maxPadding;

    function updatePos(pos) {
      const change = Math.max(maxPadding[pos] - chartArea[pos], 0);
      chartArea[pos] += change;
      return change;
    }

    chartArea.y += updatePos('top');
    chartArea.x += updatePos('left');
    updatePos('right');
    updatePos('bottom');
  }

  function getMargins(horizontal, chartArea) {
    const maxPadding = chartArea.maxPadding;

    function marginForPositions(positions) {
      const margin = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };
      positions.forEach(pos => {
        margin[pos] = Math.max(chartArea[pos], maxPadding[pos]);
      });
      return margin;
    }

    return horizontal ? marginForPositions(['left', 'right']) : marginForPositions(['top', 'bottom']);
  }

  function fitBoxes(boxes, chartArea, params) {
    const refitBoxes = [];
    let i, ilen, layout, box, refit, changed;

    for (i = 0, ilen = boxes.length, refit = 0; i < ilen; ++i) {
      layout = boxes[i];
      box = layout.box;
      box.update(layout.width || chartArea.w, layout.height || chartArea.h, getMargins(layout.horizontal, chartArea));
      const {
        same,
        other
      } = updateDims(chartArea, params, layout);
      refit |= same && refitBoxes.length;
      changed = changed || other;

      if (!box.fullSize) {
        refitBoxes.push(layout);
      }
    }

    return refit && fitBoxes(refitBoxes, chartArea, params) || changed;
  }

  function placeBoxes(boxes, chartArea, params) {
    const userPadding = params.padding;
    let x = chartArea.x;
    let y = chartArea.y;
    let i, ilen, layout, box;

    for (i = 0, ilen = boxes.length; i < ilen; ++i) {
      layout = boxes[i];
      box = layout.box;

      if (layout.horizontal) {
        box.left = box.fullSize ? userPadding.left : chartArea.left;
        box.right = box.fullSize ? params.outerWidth - userPadding.right : chartArea.left + chartArea.w;
        box.top = y;
        box.bottom = y + box.height;
        box.width = box.right - box.left;
        y = box.bottom;
      } else {
        box.left = x;
        box.right = x + box.width;
        box.top = box.fullSize ? userPadding.top : chartArea.top;
        box.bottom = box.fullSize ? params.outerHeight - userPadding.bottom : chartArea.top + chartArea.h;
        box.height = box.bottom - box.top;
        x = box.right;
      }
    }

    chartArea.x = x;
    chartArea.y = y;
  }

  defaults.set('layout', {
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
  var layouts = {
    addBox(chart, item) {
      if (!chart.boxes) {
        chart.boxes = [];
      }

      item.fullSize = item.fullSize || false;
      item.position = item.position || 'top';
      item.weight = item.weight || 0;

      item._layers = item._layers || function () {
        return [{
          z: 0,

          draw(chartArea) {
            item.draw(chartArea);
          }

        }];
      };

      chart.boxes.push(item);
    },

    removeBox(chart, layoutItem) {
      const index = chart.boxes ? chart.boxes.indexOf(layoutItem) : -1;

      if (index !== -1) {
        chart.boxes.splice(index, 1);
      }
    },

    configure(chart, item, options) {
      item.fullSize = options.fullSize;
      item.position = options.position;
      item.weight = options.weight;
    },

    update(chart, width, height, minPadding) {
      if (!chart) {
        return;
      }

      const padding = toPadding(chart.options.layout.padding);
      const availableWidth = Math.max(width - padding.width, 0);
      const availableHeight = Math.max(height - padding.height, 0);
      const boxes = buildLayoutBoxes(chart.boxes);
      const verticalBoxes = boxes.vertical;
      const horizontalBoxes = boxes.horizontal;
      each(chart.boxes, box => {
        if (typeof box.beforeLayout === 'function') {
          box.beforeLayout();
        }
      });
      const visibleVerticalBoxCount = verticalBoxes.reduce((total, wrap) => wrap.box.options && wrap.box.options.display === false ? total : total + 1, 0) || 1;
      const params = Object.freeze({
        outerWidth: width,
        outerHeight: height,
        padding,
        availableWidth,
        availableHeight,
        vBoxMaxWidth: availableWidth / 2 / visibleVerticalBoxCount,
        hBoxMaxHeight: availableHeight / 2
      });
      const maxPadding = Object.assign({}, padding);
      updateMaxPadding(maxPadding, toPadding(minPadding));
      const chartArea = Object.assign({
        maxPadding,
        w: availableWidth,
        h: availableHeight,
        x: padding.left,
        y: padding.top
      }, padding);
      setLayoutDims(verticalBoxes.concat(horizontalBoxes), params);
      fitBoxes(boxes.fullSize, chartArea, params);
      fitBoxes(verticalBoxes, chartArea, params);

      if (fitBoxes(horizontalBoxes, chartArea, params)) {
        fitBoxes(verticalBoxes, chartArea, params);
      }

      handleMaxPadding(chartArea);
      placeBoxes(boxes.leftAndTop, chartArea, params);
      chartArea.x += chartArea.w;
      chartArea.y += chartArea.h;
      placeBoxes(boxes.rightAndBottom, chartArea, params);
      chart.chartArea = {
        left: chartArea.left,
        top: chartArea.top,
        right: chartArea.left + chartArea.w,
        bottom: chartArea.top + chartArea.h,
        height: chartArea.h,
        width: chartArea.w
      };
      each(boxes.chartArea, layout => {
        const box = layout.box;
        Object.assign(box, chart.chartArea);
        box.update(chartArea.w, chartArea.h);
      });
    }

  };

  class BasePlatform {
    acquireContext(canvas, aspectRatio) {}

    releaseContext(context) {
      return false;
    }

    addEventListener(chart, type, listener) {}

    removeEventListener(chart, type, listener) {}

    getDevicePixelRatio() {
      return 1;
    }

    getMaximumSize(element, width, height, aspectRatio) {
      width = Math.max(0, width || element.width);
      height = height || element.height;
      return {
        width,
        height: Math.max(0, aspectRatio ? Math.floor(width / aspectRatio) : height)
      };
    }

    isAttached(canvas) {
      return true;
    }

  }

  class BasicPlatform extends BasePlatform {
    acquireContext(item) {
      return item && item.getContext && item.getContext('2d') || null;
    }

  }

  const EXPANDO_KEY = '$chartjs';
  const EVENT_TYPES = {
    touchstart: 'mousedown',
    touchmove: 'mousemove',
    touchend: 'mouseup',
    pointerenter: 'mouseenter',
    pointerdown: 'mousedown',
    pointermove: 'mousemove',
    pointerup: 'mouseup',
    pointerleave: 'mouseout',
    pointerout: 'mouseout'
  };

  const isNullOrEmpty = value => value === null || value === '';

  function initCanvas(canvas, aspectRatio) {
    const style = canvas.style;
    const renderHeight = canvas.getAttribute('height');
    const renderWidth = canvas.getAttribute('width');
    canvas[EXPANDO_KEY] = {
      initial: {
        height: renderHeight,
        width: renderWidth,
        style: {
          display: style.display,
          height: style.height,
          width: style.width
        }
      }
    };
    style.display = style.display || 'block';
    style.boxSizing = style.boxSizing || 'border-box';

    if (isNullOrEmpty(renderWidth)) {
      const displayWidth = readUsedSize(canvas, 'width');

      if (displayWidth !== undefined) {
        canvas.width = displayWidth;
      }
    }

    if (isNullOrEmpty(renderHeight)) {
      if (canvas.style.height === '') {
        canvas.height = canvas.width / (aspectRatio || 2);
      } else {
        const displayHeight = readUsedSize(canvas, 'height');

        if (displayHeight !== undefined) {
          canvas.height = displayHeight;
        }
      }
    }

    return canvas;
  }

  const eventListenerOptions = supportsEventListenerOptions ? {
    passive: true
  } : false;

  function addListener(node, type, listener) {
    node.addEventListener(type, listener, eventListenerOptions);
  }

  function removeListener(chart, type, listener) {
    chart.canvas.removeEventListener(type, listener, eventListenerOptions);
  }

  function fromNativeEvent(event, chart) {
    const type = EVENT_TYPES[event.type] || event.type;
    const {
      x,
      y
    } = getRelativePosition$1(event, chart);
    return {
      type,
      chart,
      native: event,
      x: x !== undefined ? x : null,
      y: y !== undefined ? y : null
    };
  }

  function createAttachObserver(chart, type, listener) {
    const canvas = chart.canvas;

    const container = canvas && _getParentNode(canvas);

    const element = container || canvas;
    const observer = new MutationObserver(entries => {
      const parent = _getParentNode(element);

      entries.forEach(entry => {
        for (let i = 0; i < entry.addedNodes.length; i++) {
          const added = entry.addedNodes[i];

          if (added === element || added === parent) {
            listener(entry.target);
          }
        }
      });
    });
    observer.observe(document, {
      childList: true,
      subtree: true
    });
    return observer;
  }

  function createDetachObserver(chart, type, listener) {
    const canvas = chart.canvas;

    const container = canvas && _getParentNode(canvas);

    if (!container) {
      return;
    }

    const observer = new MutationObserver(entries => {
      entries.forEach(entry => {
        for (let i = 0; i < entry.removedNodes.length; i++) {
          if (entry.removedNodes[i] === canvas) {
            listener();
            break;
          }
        }
      });
    });
    observer.observe(container, {
      childList: true
    });
    return observer;
  }

  const drpListeningCharts = new Map();
  let oldDevicePixelRatio = 0;

  function onWindowResize() {
    const dpr = window.devicePixelRatio;

    if (dpr === oldDevicePixelRatio) {
      return;
    }

    oldDevicePixelRatio = dpr;
    drpListeningCharts.forEach((resize, chart) => {
      if (chart.currentDevicePixelRatio !== dpr) {
        resize();
      }
    });
  }

  function listenDevicePixelRatioChanges(chart, resize) {
    if (!drpListeningCharts.size) {
      window.addEventListener('resize', onWindowResize);
    }

    drpListeningCharts.set(chart, resize);
  }

  function unlistenDevicePixelRatioChanges(chart) {
    drpListeningCharts.delete(chart);

    if (!drpListeningCharts.size) {
      window.removeEventListener('resize', onWindowResize);
    }
  }

  function createResizeObserver(chart, type, listener) {
    const canvas = chart.canvas;

    const container = canvas && _getParentNode(canvas);

    if (!container) {
      return;
    }

    const resize = throttled((width, height) => {
      const w = container.clientWidth;
      listener(width, height);

      if (w < container.clientWidth) {
        listener();
      }
    }, window);
    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      const width = entry.contentRect.width;
      const height = entry.contentRect.height;

      if (width === 0 && height === 0) {
        return;
      }

      resize(width, height);
    });
    observer.observe(container);
    listenDevicePixelRatioChanges(chart, resize);
    return observer;
  }

  function releaseObserver(chart, type, observer) {
    if (observer) {
      observer.disconnect();
    }

    if (type === 'resize') {
      unlistenDevicePixelRatioChanges(chart);
    }
  }

  function createProxyAndListen(chart, type, listener) {
    const canvas = chart.canvas;
    const proxy = throttled(event => {
      if (chart.ctx !== null) {
        listener(fromNativeEvent(event, chart));
      }
    }, chart, args => {
      const event = args[0];
      return [event, event.offsetX, event.offsetY];
    });
    addListener(canvas, type, proxy);
    return proxy;
  }

  class DomPlatform extends BasePlatform {
    acquireContext(canvas, aspectRatio) {
      const context = canvas && canvas.getContext && canvas.getContext('2d');

      if (context && context.canvas === canvas) {
        initCanvas(canvas, aspectRatio);
        return context;
      }

      return null;
    }

    releaseContext(context) {
      const canvas = context.canvas;

      if (!canvas[EXPANDO_KEY]) {
        return false;
      }

      const initial = canvas[EXPANDO_KEY].initial;
      ['height', 'width'].forEach(prop => {
        const value = initial[prop];

        if (isNullOrUndef(value)) {
          canvas.removeAttribute(prop);
        } else {
          canvas.setAttribute(prop, value);
        }
      });
      const style = initial.style || {};
      Object.keys(style).forEach(key => {
        canvas.style[key] = style[key];
      });
      canvas.width = canvas.width;
      delete canvas[EXPANDO_KEY];
      return true;
    }

    addEventListener(chart, type, listener) {
      this.removeEventListener(chart, type);
      const proxies = chart.$proxies || (chart.$proxies = {});
      const handlers = {
        attach: createAttachObserver,
        detach: createDetachObserver,
        resize: createResizeObserver
      };
      const handler = handlers[type] || createProxyAndListen;
      proxies[type] = handler(chart, type, listener);
    }

    removeEventListener(chart, type) {
      const proxies = chart.$proxies || (chart.$proxies = {});
      const proxy = proxies[type];

      if (!proxy) {
        return;
      }

      const handlers = {
        attach: releaseObserver,
        detach: releaseObserver,
        resize: releaseObserver
      };
      const handler = handlers[type] || removeListener;
      handler(chart, type, proxy);
      proxies[type] = undefined;
    }

    getDevicePixelRatio() {
      return window.devicePixelRatio;
    }

    getMaximumSize(canvas, width, height, aspectRatio) {
      return getMaximumSize(canvas, width, height, aspectRatio);
    }

    isAttached(canvas) {
      const container = _getParentNode(canvas);

      return !!(container && _getParentNode(container));
    }

  }

  var platforms = /*#__PURE__*/Object.freeze({
    __proto__: null,
    BasePlatform: BasePlatform,
    BasicPlatform: BasicPlatform,
    DomPlatform: DomPlatform
  });

  const atEdge = t => t === 0 || t === 1;

  const elasticIn = (t, s, p) => -(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * TAU / p));

  const elasticOut = (t, s, p) => Math.pow(2, -10 * t) * Math.sin((t - s) * TAU / p) + 1;

  const effects = {
    linear: t => t,
    easeInQuad: t => t * t,
    easeOutQuad: t => -t * (t - 2),
    easeInOutQuad: t => (t /= 0.5) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1),
    easeInCubic: t => t * t * t,
    easeOutCubic: t => (t -= 1) * t * t + 1,
    easeInOutCubic: t => (t /= 0.5) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2),
    easeInQuart: t => t * t * t * t,
    easeOutQuart: t => -((t -= 1) * t * t * t - 1),
    easeInOutQuart: t => (t /= 0.5) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2),
    easeInQuint: t => t * t * t * t * t,
    easeOutQuint: t => (t -= 1) * t * t * t * t + 1,
    easeInOutQuint: t => (t /= 0.5) < 1 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2) * t * t * t * t + 2),
    easeInSine: t => -Math.cos(t * HALF_PI) + 1,
    easeOutSine: t => Math.sin(t * HALF_PI),
    easeInOutSine: t => -0.5 * (Math.cos(PI * t) - 1),
    easeInExpo: t => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
    easeOutExpo: t => t === 1 ? 1 : -Math.pow(2, -10 * t) + 1,
    easeInOutExpo: t => atEdge(t) ? t : t < 0.5 ? 0.5 * Math.pow(2, 10 * (t * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (t * 2 - 1)) + 2),
    easeInCirc: t => t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1),
    easeOutCirc: t => Math.sqrt(1 - (t -= 1) * t),
    easeInOutCirc: t => (t /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
    easeInElastic: t => atEdge(t) ? t : elasticIn(t, 0.075, 0.3),
    easeOutElastic: t => atEdge(t) ? t : elasticOut(t, 0.075, 0.3),

    easeInOutElastic(t) {
      const s = 0.1125;
      const p = 0.45;
      return atEdge(t) ? t : t < 0.5 ? 0.5 * elasticIn(t * 2, s, p) : 0.5 + 0.5 * elasticOut(t * 2 - 1, s, p);
    },

    easeInBack(t) {
      const s = 1.70158;
      return t * t * ((s + 1) * t - s);
    },

    easeOutBack(t) {
      const s = 1.70158;
      return (t -= 1) * t * ((s + 1) * t + s) + 1;
    },

    easeInOutBack(t) {
      let s = 1.70158;

      if ((t /= 0.5) < 1) {
        return 0.5 * (t * t * (((s *= 1.525) + 1) * t - s));
      }

      return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
    },

    easeInBounce: t => 1 - effects.easeOutBounce(1 - t),

    easeOutBounce(t) {
      const m = 7.5625;
      const d = 2.75;

      if (t < 1 / d) {
        return m * t * t;
      }

      if (t < 2 / d) {
        return m * (t -= 1.5 / d) * t + 0.75;
      }

      if (t < 2.5 / d) {
        return m * (t -= 2.25 / d) * t + 0.9375;
      }

      return m * (t -= 2.625 / d) * t + 0.984375;
    },

    easeInOutBounce: t => t < 0.5 ? effects.easeInBounce(t * 2) * 0.5 : effects.easeOutBounce(t * 2 - 1) * 0.5 + 0.5
  };
  const transparent = 'transparent';
  const interpolators = {
    boolean(from, to, factor) {
      return factor > 0.5 ? to : from;
    },

    color(from, to, factor) {
      const c0 = color(from || transparent);
      const c1 = c0.valid && color(to || transparent);
      return c1 && c1.valid ? c1.mix(c0, factor).hexString() : to;
    },

    number(from, to, factor) {
      return from + (to - from) * factor;
    }

  };

  class Animation {
    constructor(cfg, target, prop, to) {
      const currentValue = target[prop];
      to = resolve([cfg.to, to, currentValue, cfg.from]);
      const from = resolve([cfg.from, currentValue, to]);
      this._active = true;
      this._fn = cfg.fn || interpolators[cfg.type || typeof from];
      this._easing = effects[cfg.easing] || effects.linear;
      this._start = Math.floor(Date.now() + (cfg.delay || 0));
      this._duration = this._total = Math.floor(cfg.duration);
      this._loop = !!cfg.loop;
      this._target = target;
      this._prop = prop;
      this._from = from;
      this._to = to;
      this._promises = undefined;
    }

    active() {
      return this._active;
    }

    update(cfg, to, date) {
      const me = this;

      if (me._active) {
        me._notify(false);

        const currentValue = me._target[me._prop];
        const elapsed = date - me._start;
        const remain = me._duration - elapsed;
        me._start = date;
        me._duration = Math.floor(Math.max(remain, cfg.duration));
        me._total += elapsed;
        me._loop = !!cfg.loop;
        me._to = resolve([cfg.to, to, currentValue, cfg.from]);
        me._from = resolve([cfg.from, currentValue, to]);
      }
    }

    cancel() {
      const me = this;

      if (me._active) {
        me.tick(Date.now());
        me._active = false;

        me._notify(false);
      }
    }

    tick(date) {
      const me = this;
      const elapsed = date - me._start;
      const duration = me._duration;
      const prop = me._prop;
      const from = me._from;
      const loop = me._loop;
      const to = me._to;
      let factor;
      me._active = from !== to && (loop || elapsed < duration);

      if (!me._active) {
        me._target[prop] = to;

        me._notify(true);

        return;
      }

      if (elapsed < 0) {
        me._target[prop] = from;
        return;
      }

      factor = elapsed / duration % 2;
      factor = loop && factor > 1 ? 2 - factor : factor;
      factor = me._easing(Math.min(1, Math.max(0, factor)));
      me._target[prop] = me._fn(from, to, factor);
    }

    wait() {
      const promises = this._promises || (this._promises = []);
      return new Promise((res, rej) => {
        promises.push({
          res,
          rej
        });
      });
    }

    _notify(resolved) {
      const method = resolved ? 'res' : 'rej';
      const promises = this._promises || [];

      for (let i = 0; i < promises.length; i++) {
        promises[i][method]();
      }
    }

  }

  const numbers = ['x', 'y', 'borderWidth', 'radius', 'tension'];
  const colors = ['color', 'borderColor', 'backgroundColor'];
  defaults.set('animation', {
    delay: undefined,
    duration: 1000,
    easing: 'easeOutQuart',
    fn: undefined,
    from: undefined,
    loop: undefined,
    to: undefined,
    type: undefined
  });
  const animationOptions = Object.keys(defaults.animation);
  defaults.describe('animation', {
    _fallback: false,
    _indexable: false,
    _scriptable: name => name !== 'onProgress' && name !== 'onComplete' && name !== 'fn'
  });
  defaults.set('animations', {
    colors: {
      type: 'color',
      properties: colors
    },
    numbers: {
      type: 'number',
      properties: numbers
    }
  });
  defaults.describe('animations', {
    _fallback: 'animation'
  });
  defaults.set('transitions', {
    active: {
      animation: {
        duration: 400
      }
    },
    resize: {
      animation: {
        duration: 0
      }
    },
    show: {
      animations: {
        colors: {
          from: 'transparent'
        },
        visible: {
          type: 'boolean',
          duration: 0
        }
      }
    },
    hide: {
      animations: {
        colors: {
          to: 'transparent'
        },
        visible: {
          type: 'boolean',
          easing: 'linear',
          fn: v => v | 0
        }
      }
    }
  });

  class Animations {
    constructor(chart, config) {
      this._chart = chart;
      this._properties = new Map();
      this.configure(config);
    }

    configure(config) {
      if (!isObject(config)) {
        return;
      }

      const animatedProps = this._properties;
      Object.getOwnPropertyNames(config).forEach(key => {
        const cfg = config[key];

        if (!isObject(cfg)) {
          return;
        }

        const resolved = {};

        for (const option of animationOptions) {
          resolved[option] = cfg[option];
        }

        (isArray(cfg.properties) && cfg.properties || [key]).forEach(prop => {
          if (prop === key || !animatedProps.has(prop)) {
            animatedProps.set(prop, resolved);
          }
        });
      });
    }

    _animateOptions(target, values) {
      const newOptions = values.options;
      const options = resolveTargetOptions(target, newOptions);

      if (!options) {
        return [];
      }

      const animations = this._createAnimations(options, newOptions);

      if (newOptions.$shared) {
        awaitAll(target.options.$animations, newOptions).then(() => {
          target.options = newOptions;
        }, () => {});
      }

      return animations;
    }

    _createAnimations(target, values) {
      const animatedProps = this._properties;
      const animations = [];
      const running = target.$animations || (target.$animations = {});
      const props = Object.keys(values);
      const date = Date.now();
      let i;

      for (i = props.length - 1; i >= 0; --i) {
        const prop = props[i];

        if (prop.charAt(0) === '$') {
          continue;
        }

        if (prop === 'options') {
          animations.push(...this._animateOptions(target, values));
          continue;
        }

        const value = values[prop];
        let animation = running[prop];
        const cfg = animatedProps.get(prop);

        if (animation) {
          if (cfg && animation.active()) {
            animation.update(cfg, value, date);
            continue;
          } else {
            animation.cancel();
          }
        }

        if (!cfg || !cfg.duration) {
          target[prop] = value;
          continue;
        }

        running[prop] = animation = new Animation(cfg, target, prop, value);
        animations.push(animation);
      }

      return animations;
    }

    update(target, values) {
      if (this._properties.size === 0) {
        Object.assign(target, values);
        return;
      }

      const animations = this._createAnimations(target, values);

      if (animations.length) {
        animator.add(this._chart, animations);
        return true;
      }
    }

  }

  function awaitAll(animations, properties) {
    const running = [];
    const keys = Object.keys(properties);

    for (let i = 0; i < keys.length; i++) {
      const anim = animations[keys[i]];

      if (anim && anim.active()) {
        running.push(anim.wait());
      }
    }

    return Promise.all(running);
  }

  function resolveTargetOptions(target, newOptions) {
    if (!newOptions) {
      return;
    }

    let options = target.options;

    if (!options) {
      target.options = newOptions;
      return;
    }

    if (options.$shared) {
      target.options = options = Object.assign({}, options, {
        $shared: false,
        $animations: {}
      });
    }

    return options;
  }

  function scaleClip(scale, allowedOverflow) {
    const opts = scale && scale.options || {};
    const reverse = opts.reverse;
    const min = opts.min === undefined ? allowedOverflow : 0;
    const max = opts.max === undefined ? allowedOverflow : 0;
    return {
      start: reverse ? max : min,
      end: reverse ? min : max
    };
  }

  function defaultClip(xScale, yScale, allowedOverflow) {
    if (allowedOverflow === false) {
      return false;
    }

    const x = scaleClip(xScale, allowedOverflow);
    const y = scaleClip(yScale, allowedOverflow);
    return {
      top: y.end,
      right: x.end,
      bottom: y.start,
      left: x.start
    };
  }

  function toClip(value) {
    let t, r, b, l;

    if (isObject(value)) {
      t = value.top;
      r = value.right;
      b = value.bottom;
      l = value.left;
    } else {
      t = r = b = l = value;
    }

    return {
      top: t,
      right: r,
      bottom: b,
      left: l,
      disabled: value === false
    };
  }

  function getSortedDatasetIndices(chart, filterVisible) {
    const keys = [];

    const metasets = chart._getSortedDatasetMetas(filterVisible);

    let i, ilen;

    for (i = 0, ilen = metasets.length; i < ilen; ++i) {
      keys.push(metasets[i].index);
    }

    return keys;
  }

  function applyStack(stack, value, dsIndex, options) {
    const keys = stack.keys;
    const singleMode = options.mode === 'single';
    let i, ilen, datasetIndex, otherValue;

    if (value === null) {
      return;
    }

    for (i = 0, ilen = keys.length; i < ilen; ++i) {
      datasetIndex = +keys[i];

      if (datasetIndex === dsIndex) {
        if (options.all) {
          continue;
        }

        break;
      }

      otherValue = stack.values[datasetIndex];

      if (isNumberFinite(otherValue) && (singleMode || value === 0 || sign(value) === sign(otherValue))) {
        value += otherValue;
      }
    }

    return value;
  }

  function convertObjectDataToArray(data) {
    const keys = Object.keys(data);
    const adata = new Array(keys.length);
    let i, ilen, key;

    for (i = 0, ilen = keys.length; i < ilen; ++i) {
      key = keys[i];
      adata[i] = {
        x: key,
        y: data[key]
      };
    }

    return adata;
  }

  function isStacked(scale, meta) {
    const stacked = scale && scale.options.stacked;
    return stacked || stacked === undefined && meta.stack !== undefined;
  }

  function getStackKey(indexScale, valueScale, meta) {
    return `${indexScale.id}.${valueScale.id}.${meta.stack || meta.type}`;
  }

  function getUserBounds(scale) {
    const {
      min,
      max,
      minDefined,
      maxDefined
    } = scale.getUserBounds();
    return {
      min: minDefined ? min : Number.NEGATIVE_INFINITY,
      max: maxDefined ? max : Number.POSITIVE_INFINITY
    };
  }

  function getOrCreateStack(stacks, stackKey, indexValue) {
    const subStack = stacks[stackKey] || (stacks[stackKey] = {});
    return subStack[indexValue] || (subStack[indexValue] = {});
  }

  function getLastIndexInStack(stack, vScale, positive) {
    for (const meta of vScale.getMatchingVisibleMetas('bar').reverse()) {
      const value = stack[meta.index];

      if (positive && value > 0 || !positive && value < 0) {
        return meta.index;
      }
    }

    return null;
  }

  function updateStacks(controller, parsed) {
    const {
      chart,
      _cachedMeta: meta
    } = controller;
    const stacks = chart._stacks || (chart._stacks = {});
    const {
      iScale,
      vScale,
      index: datasetIndex
    } = meta;
    const iAxis = iScale.axis;
    const vAxis = vScale.axis;
    const key = getStackKey(iScale, vScale, meta);
    const ilen = parsed.length;
    let stack;

    for (let i = 0; i < ilen; ++i) {
      const item = parsed[i];
      const {
        [iAxis]: index,
        [vAxis]: value
      } = item;
      const itemStacks = item._stacks || (item._stacks = {});
      stack = itemStacks[vAxis] = getOrCreateStack(stacks, key, index);
      stack[datasetIndex] = value;
      stack._top = getLastIndexInStack(stack, vScale, true);
      stack._bottom = getLastIndexInStack(stack, vScale, false);
    }
  }

  function getFirstScaleId(chart, axis) {
    const scales = chart.scales;
    return Object.keys(scales).filter(key => scales[key].axis === axis).shift();
  }

  function createDatasetContext(parent, index) {
    return Object.assign(Object.create(parent), {
      active: false,
      dataset: undefined,
      datasetIndex: index,
      index,
      mode: 'default',
      type: 'dataset'
    });
  }

  function createDataContext(parent, index, element) {
    return Object.assign(Object.create(parent), {
      active: false,
      dataIndex: index,
      parsed: undefined,
      raw: undefined,
      element,
      index,
      mode: 'default',
      type: 'data'
    });
  }

  function clearStacks(meta, items) {
    const axis = meta.vScale && meta.vScale.axis;

    if (!axis) {
      return;
    }

    items = items || meta._parsed;

    for (const parsed of items) {
      const stacks = parsed._stacks;

      if (!stacks || stacks[axis] === undefined || stacks[axis][meta.index] === undefined) {
        return;
      }

      delete stacks[axis][meta.index];
    }
  }

  const isDirectUpdateMode = mode => mode === 'reset' || mode === 'none';

  const cloneIfNotShared = (cached, shared) => shared ? cached : Object.assign({}, cached);

  class DatasetController {
    constructor(chart, datasetIndex) {
      this.chart = chart;
      this._ctx = chart.ctx;
      this.index = datasetIndex;
      this._cachedDataOpts = {};
      this._cachedMeta = this.getMeta();
      this._type = this._cachedMeta.type;
      this.options = undefined;
      this._parsing = false;
      this._data = undefined;
      this._objectData = undefined;
      this._sharedOptions = undefined;
      this._drawStart = undefined;
      this._drawCount = undefined;
      this.enableOptionSharing = false;
      this.$context = undefined;
      this._syncList = [];
      this.initialize();
    }

    initialize() {
      const me = this;
      const meta = me._cachedMeta;
      me.configure();
      me.linkScales();
      meta._stacked = isStacked(meta.vScale, meta);
      me.addElements();
    }

    updateIndex(datasetIndex) {
      if (this.index !== datasetIndex) {
        clearStacks(this._cachedMeta);
      }

      this.index = datasetIndex;
    }

    linkScales() {
      const me = this;
      const chart = me.chart;
      const meta = me._cachedMeta;
      const dataset = me.getDataset();

      const chooseId = (axis, x, y, r) => axis === 'x' ? x : axis === 'r' ? r : y;

      const xid = meta.xAxisID = valueOrDefault(dataset.xAxisID, getFirstScaleId(chart, 'x'));
      const yid = meta.yAxisID = valueOrDefault(dataset.yAxisID, getFirstScaleId(chart, 'y'));
      const rid = meta.rAxisID = valueOrDefault(dataset.rAxisID, getFirstScaleId(chart, 'r'));
      const indexAxis = meta.indexAxis;
      const iid = meta.iAxisID = chooseId(indexAxis, xid, yid, rid);
      const vid = meta.vAxisID = chooseId(indexAxis, yid, xid, rid);
      meta.xScale = me.getScaleForId(xid);
      meta.yScale = me.getScaleForId(yid);
      meta.rScale = me.getScaleForId(rid);
      meta.iScale = me.getScaleForId(iid);
      meta.vScale = me.getScaleForId(vid);
    }

    getDataset() {
      return this.chart.data.datasets[this.index];
    }

    getMeta() {
      return this.chart.getDatasetMeta(this.index);
    }

    getScaleForId(scaleID) {
      return this.chart.scales[scaleID];
    }

    _getOtherScale(scale) {
      const meta = this._cachedMeta;
      return scale === meta.iScale ? meta.vScale : meta.iScale;
    }

    reset() {
      this._update('reset');
    }

    _destroy() {
      const meta = this._cachedMeta;

      if (this._data) {
        unlistenArrayEvents(this._data, this);
      }

      if (meta._stacked) {
        clearStacks(meta);
      }
    }

    _dataCheck() {
      const me = this;
      const dataset = me.getDataset();
      const data = dataset.data || (dataset.data = []);
      const _data = me._data;

      if (isObject(data)) {
        me._data = convertObjectDataToArray(data);
      } else if (_data !== data) {
        if (_data) {
          unlistenArrayEvents(_data, me);
          const meta = me._cachedMeta;
          clearStacks(meta);
          meta._parsed = [];
        }

        if (data && Object.isExtensible(data)) {
          listenArrayEvents(data, me);
        }

        me._syncList = [];
        me._data = data;
      }
    }

    addElements() {
      const me = this;
      const meta = me._cachedMeta;

      me._dataCheck();

      if (me.datasetElementType) {
        meta.dataset = new me.datasetElementType();
      }
    }

    buildOrUpdateElements(resetNewElements) {
      const me = this;
      const meta = me._cachedMeta;
      const dataset = me.getDataset();
      let stackChanged = false;

      me._dataCheck();

      const oldStacked = meta._stacked;
      meta._stacked = isStacked(meta.vScale, meta);

      if (meta.stack !== dataset.stack) {
        stackChanged = true;
        clearStacks(meta);
        meta.stack = dataset.stack;
      }

      me._resyncElements(resetNewElements);

      if (stackChanged || oldStacked !== meta._stacked) {
        updateStacks(me, meta._parsed);
      }
    }

    configure() {
      const me = this;
      const config = me.chart.config;
      const scopeKeys = config.datasetScopeKeys(me._type);
      const scopes = config.getOptionScopes(me.getDataset(), scopeKeys, true);
      me.options = config.createResolver(scopes, me.getContext());
      me._parsing = me.options.parsing;
    }

    parse(start, count) {
      const me = this;
      const {
        _cachedMeta: meta,
        _data: data
      } = me;
      const {
        iScale,
        _stacked
      } = meta;
      const iAxis = iScale.axis;
      let sorted = start === 0 && count === data.length ? true : meta._sorted;
      let prev = start > 0 && meta._parsed[start - 1];
      let i, cur, parsed;

      if (me._parsing === false) {
        meta._parsed = data;
        meta._sorted = true;
        parsed = data;
      } else {
        if (isArray(data[start])) {
          parsed = me.parseArrayData(meta, data, start, count);
        } else if (isObject(data[start])) {
          parsed = me.parseObjectData(meta, data, start, count);
        } else {
          parsed = me.parsePrimitiveData(meta, data, start, count);
        }

        const isNotInOrderComparedToPrev = () => cur[iAxis] === null || prev && cur[iAxis] < prev[iAxis];

        for (i = 0; i < count; ++i) {
          meta._parsed[i + start] = cur = parsed[i];

          if (sorted) {
            if (isNotInOrderComparedToPrev()) {
              sorted = false;
            }

            prev = cur;
          }
        }

        meta._sorted = sorted;
      }

      if (_stacked) {
        updateStacks(me, parsed);
      }
    }

    parsePrimitiveData(meta, data, start, count) {
      const {
        iScale,
        vScale
      } = meta;
      const iAxis = iScale.axis;
      const vAxis = vScale.axis;
      const labels = iScale.getLabels();
      const singleScale = iScale === vScale;
      const parsed = new Array(count);
      let i, ilen, index;

      for (i = 0, ilen = count; i < ilen; ++i) {
        index = i + start;
        parsed[i] = {
          [iAxis]: singleScale || iScale.parse(labels[index], index),
          [vAxis]: vScale.parse(data[index], index)
        };
      }

      return parsed;
    }

    parseArrayData(meta, data, start, count) {
      const {
        xScale,
        yScale
      } = meta;
      const parsed = new Array(count);
      let i, ilen, index, item;

      for (i = 0, ilen = count; i < ilen; ++i) {
        index = i + start;
        item = data[index];
        parsed[i] = {
          x: xScale.parse(item[0], index),
          y: yScale.parse(item[1], index)
        };
      }

      return parsed;
    }

    parseObjectData(meta, data, start, count) {
      const {
        xScale,
        yScale
      } = meta;
      const {
        xAxisKey = 'x',
        yAxisKey = 'y'
      } = this._parsing;
      const parsed = new Array(count);
      let i, ilen, index, item;

      for (i = 0, ilen = count; i < ilen; ++i) {
        index = i + start;
        item = data[index];
        parsed[i] = {
          x: xScale.parse(resolveObjectKey(item, xAxisKey), index),
          y: yScale.parse(resolveObjectKey(item, yAxisKey), index)
        };
      }

      return parsed;
    }

    getParsed(index) {
      return this._cachedMeta._parsed[index];
    }

    getDataElement(index) {
      return this._cachedMeta.data[index];
    }

    applyStack(scale, parsed, mode) {
      const chart = this.chart;
      const meta = this._cachedMeta;
      const value = parsed[scale.axis];
      const stack = {
        keys: getSortedDatasetIndices(chart, true),
        values: parsed._stacks[scale.axis]
      };
      return applyStack(stack, value, meta.index, {
        mode
      });
    }

    updateRangeFromParsed(range, scale, parsed, stack) {
      const parsedValue = parsed[scale.axis];
      let value = parsedValue === null ? NaN : parsedValue;
      const values = stack && parsed._stacks[scale.axis];

      if (stack && values) {
        stack.values = values;
        range.min = Math.min(range.min, value);
        range.max = Math.max(range.max, value);
        value = applyStack(stack, parsedValue, this._cachedMeta.index, {
          all: true
        });
      }

      range.min = Math.min(range.min, value);
      range.max = Math.max(range.max, value);
    }

    getMinMax(scale, canStack) {
      const me = this;
      const meta = me._cachedMeta;
      const _parsed = meta._parsed;
      const sorted = meta._sorted && scale === meta.iScale;
      const ilen = _parsed.length;

      const otherScale = me._getOtherScale(scale);

      const stack = canStack && meta._stacked && {
        keys: getSortedDatasetIndices(me.chart, true),
        values: null
      };
      const range = {
        min: Number.POSITIVE_INFINITY,
        max: Number.NEGATIVE_INFINITY
      };
      const {
        min: otherMin,
        max: otherMax
      } = getUserBounds(otherScale);
      let i, value, parsed, otherValue;

      function _skip() {
        parsed = _parsed[i];
        value = parsed[scale.axis];
        otherValue = parsed[otherScale.axis];
        return !isNumberFinite(value) || otherMin > otherValue || otherMax < otherValue;
      }

      for (i = 0; i < ilen; ++i) {
        if (_skip()) {
          continue;
        }

        me.updateRangeFromParsed(range, scale, parsed, stack);

        if (sorted) {
          break;
        }
      }

      if (sorted) {
        for (i = ilen - 1; i >= 0; --i) {
          if (_skip()) {
            continue;
          }

          me.updateRangeFromParsed(range, scale, parsed, stack);
          break;
        }
      }

      return range;
    }

    getAllParsedValues(scale) {
      const parsed = this._cachedMeta._parsed;
      const values = [];
      let i, ilen, value;

      for (i = 0, ilen = parsed.length; i < ilen; ++i) {
        value = parsed[i][scale.axis];

        if (isNumberFinite(value)) {
          values.push(value);
        }
      }

      return values;
    }

    getMaxOverflow() {
      return false;
    }

    getLabelAndValue(index) {
      const me = this;
      const meta = me._cachedMeta;
      const iScale = meta.iScale;
      const vScale = meta.vScale;
      const parsed = me.getParsed(index);
      return {
        label: iScale ? '' + iScale.getLabelForValue(parsed[iScale.axis]) : '',
        value: vScale ? '' + vScale.getLabelForValue(parsed[vScale.axis]) : ''
      };
    }

    _update(mode) {
      const me = this;
      const meta = me._cachedMeta;
      me.configure();
      me._cachedDataOpts = {};
      me.update(mode || 'default');
      meta._clip = toClip(valueOrDefault(me.options.clip, defaultClip(meta.xScale, meta.yScale, me.getMaxOverflow())));
    }

    update(mode) {}

    draw() {
      const me = this;
      const ctx = me._ctx;
      const chart = me.chart;
      const meta = me._cachedMeta;
      const elements = meta.data || [];
      const area = chart.chartArea;
      const active = [];
      const start = me._drawStart || 0;
      const count = me._drawCount || elements.length - start;
      let i;

      if (meta.dataset) {
        meta.dataset.draw(ctx, area, start, count);
      }

      for (i = start; i < start + count; ++i) {
        const element = elements[i];

        if (element.active) {
          active.push(element);
        } else {
          element.draw(ctx, area);
        }
      }

      for (i = 0; i < active.length; ++i) {
        active[i].draw(ctx, area);
      }
    }

    getStyle(index, active) {
      const mode = active ? 'active' : 'default';
      return index === undefined && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(mode) : this.resolveDataElementOptions(index || 0, mode);
    }

    getContext(index, active, mode) {
      const me = this;
      const dataset = me.getDataset();
      let context;

      if (index >= 0 && index < me._cachedMeta.data.length) {
        const element = me._cachedMeta.data[index];
        context = element.$context || (element.$context = createDataContext(me.getContext(), index, element));
        context.parsed = me.getParsed(index);
        context.raw = dataset.data[index];
        context.index = context.dataIndex = index;
      } else {
        context = me.$context || (me.$context = createDatasetContext(me.chart.getContext(), me.index));
        context.dataset = dataset;
        context.index = context.datasetIndex = me.index;
      }

      context.active = !!active;
      context.mode = mode;
      return context;
    }

    resolveDatasetElementOptions(mode) {
      return this._resolveElementOptions(this.datasetElementType.id, mode);
    }

    resolveDataElementOptions(index, mode) {
      return this._resolveElementOptions(this.dataElementType.id, mode, index);
    }

    _resolveElementOptions(elementType, mode = 'default', index) {
      const me = this;
      const active = mode === 'active';
      const cache = me._cachedDataOpts;
      const cacheKey = elementType + '-' + mode;
      const cached = cache[cacheKey];
      const sharing = me.enableOptionSharing && defined(index);

      if (cached) {
        return cloneIfNotShared(cached, sharing);
      }

      const config = me.chart.config;
      const scopeKeys = config.datasetElementScopeKeys(me._type, elementType);
      const prefixes = active ? [`${elementType}Hover`, 'hover', elementType, ''] : [elementType, ''];
      const scopes = config.getOptionScopes(me.getDataset(), scopeKeys);
      const names = Object.keys(defaults.elements[elementType]);

      const context = () => me.getContext(index, active);

      const values = config.resolveNamedOptions(scopes, names, context, prefixes);

      if (values.$shared) {
        values.$shared = sharing;
        cache[cacheKey] = Object.freeze(cloneIfNotShared(values, sharing));
      }

      return values;
    }

    _resolveAnimations(index, transition, active) {
      const me = this;
      const chart = me.chart;
      const cache = me._cachedDataOpts;
      const cacheKey = `animation-${transition}`;
      const cached = cache[cacheKey];

      if (cached) {
        return cached;
      }

      let options;

      if (chart.options.animation !== false) {
        const config = me.chart.config;
        const scopeKeys = config.datasetAnimationScopeKeys(me._type, transition);
        const scopes = config.getOptionScopes(me.getDataset(), scopeKeys);
        options = config.createResolver(scopes, me.getContext(index, active, transition));
      }

      const animations = new Animations(chart, options && options.animations);

      if (options && options._cacheable) {
        cache[cacheKey] = Object.freeze(animations);
      }

      return animations;
    }

    getSharedOptions(options) {
      if (!options.$shared) {
        return;
      }

      return this._sharedOptions || (this._sharedOptions = Object.assign({}, options));
    }

    includeOptions(mode, sharedOptions) {
      return !sharedOptions || isDirectUpdateMode(mode) || this.chart._animationsDisabled;
    }

    updateElement(element, index, properties, mode) {
      if (isDirectUpdateMode(mode)) {
        Object.assign(element, properties);
      } else {
        this._resolveAnimations(index, mode).update(element, properties);
      }
    }

    updateSharedOptions(sharedOptions, mode, newOptions) {
      if (sharedOptions && !isDirectUpdateMode(mode)) {
        this._resolveAnimations(undefined, mode).update(sharedOptions, newOptions);
      }
    }

    _setStyle(element, index, mode, active) {
      element.active = active;
      const options = this.getStyle(index, active);

      this._resolveAnimations(index, mode, active).update(element, {
        options: !active && this.getSharedOptions(options) || options
      });
    }

    removeHoverStyle(element, datasetIndex, index) {
      this._setStyle(element, index, 'active', false);
    }

    setHoverStyle(element, datasetIndex, index) {
      this._setStyle(element, index, 'active', true);
    }

    _removeDatasetHoverStyle() {
      const element = this._cachedMeta.dataset;

      if (element) {
        this._setStyle(element, undefined, 'active', false);
      }
    }

    _setDatasetHoverStyle() {
      const element = this._cachedMeta.dataset;

      if (element) {
        this._setStyle(element, undefined, 'active', true);
      }
    }

    _resyncElements(resetNewElements) {
      const me = this;
      const data = me._data;
      const elements = me._cachedMeta.data;

      for (const [method, arg1, arg2] of me._syncList) {
        me[method](arg1, arg2);
      }

      me._syncList = [];
      const numMeta = elements.length;
      const numData = data.length;
      const count = Math.min(numData, numMeta);

      if (count) {
        me.parse(0, count);
      }

      if (numData > numMeta) {
        me._insertElements(numMeta, numData - numMeta, resetNewElements);
      } else if (numData < numMeta) {
        me._removeElements(numData, numMeta - numData);
      }
    }

    _insertElements(start, count, resetNewElements = true) {
      const me = this;
      const meta = me._cachedMeta;
      const data = meta.data;
      const end = start + count;
      let i;

      const move = arr => {
        arr.length += count;

        for (i = arr.length - 1; i >= end; i--) {
          arr[i] = arr[i - count];
        }
      };

      move(data);

      for (i = start; i < end; ++i) {
        data[i] = new me.dataElementType();
      }

      if (me._parsing) {
        move(meta._parsed);
      }

      me.parse(start, count);

      if (resetNewElements) {
        me.updateElements(data, start, count, 'reset');
      }
    }

    updateElements(element, start, count, mode) {}

    _removeElements(start, count) {
      const me = this;
      const meta = me._cachedMeta;

      if (me._parsing) {
        const removed = meta._parsed.splice(start, count);

        if (meta._stacked) {
          clearStacks(meta, removed);
        }
      }

      meta.data.splice(start, count);
    }

    _onDataPush() {
      const count = arguments.length;

      this._syncList.push(['_insertElements', this.getDataset().data.length - count, count]);
    }

    _onDataPop() {
      this._syncList.push(['_removeElements', this._cachedMeta.data.length - 1, 1]);
    }

    _onDataShift() {
      this._syncList.push(['_removeElements', 0, 1]);
    }

    _onDataSplice(start, count) {
      this._syncList.push(['_removeElements', start, count]);

      this._syncList.push(['_insertElements', start, arguments.length - 2]);
    }

    _onDataUnshift() {
      this._syncList.push(['_insertElements', 0, arguments.length]);
    }

  }

  DatasetController.defaults = {};
  DatasetController.prototype.datasetElementType = null;
  DatasetController.prototype.dataElementType = null;

  class Element {
    constructor() {
      this.x = undefined;
      this.y = undefined;
      this.active = false;
      this.options = undefined;
      this.$animations = undefined;
    }

    tooltipPosition(useFinalPosition) {
      const {
        x,
        y
      } = this.getProps(['x', 'y'], useFinalPosition);
      return {
        x,
        y
      };
    }

    hasValue() {
      return isNumber(this.x) && isNumber(this.y);
    }

    getProps(props, final) {
      const me = this;
      const anims = this.$animations;

      if (!final || !anims) {
        return me;
      }

      const ret = {};
      props.forEach(prop => {
        ret[prop] = anims[prop] && anims[prop].active() ? anims[prop]._to : me[prop];
      });
      return ret;
    }

  }

  Element.defaults = {};
  Element.defaultRoutes = undefined;
  const intlCache = new Map();

  function getNumberFormat(locale, options) {
    options = options || {};
    const cacheKey = locale + JSON.stringify(options);
    let formatter = intlCache.get(cacheKey);

    if (!formatter) {
      formatter = new Intl.NumberFormat(locale, options);
      intlCache.set(cacheKey, formatter);
    }

    return formatter;
  }

  function formatNumber(num, locale, options) {
    return getNumberFormat(locale, options).format(num);
  }

  const formatters = {
    values(value) {
      return isArray(value) ? value : '' + value;
    },

    numeric(tickValue, index, ticks) {
      if (tickValue === 0) {
        return '0';
      }

      const locale = this.chart.options.locale;
      let notation;
      let delta = tickValue;

      if (ticks.length > 1) {
        const maxTick = Math.max(Math.abs(ticks[0].value), Math.abs(ticks[ticks.length - 1].value));

        if (maxTick < 1e-4 || maxTick > 1e+15) {
          notation = 'scientific';
        }

        delta = calculateDelta(tickValue, ticks);
      }

      const logDelta = log10(Math.abs(delta));
      const numDecimal = Math.max(Math.min(-1 * Math.floor(logDelta), 20), 0);
      const options = {
        notation,
        minimumFractionDigits: numDecimal,
        maximumFractionDigits: numDecimal
      };
      Object.assign(options, this.options.ticks.format);
      return formatNumber(tickValue, locale, options);
    },

    logarithmic(tickValue, index, ticks) {
      if (tickValue === 0) {
        return '0';
      }

      const remain = tickValue / Math.pow(10, Math.floor(log10(tickValue)));

      if (remain === 1 || remain === 2 || remain === 5) {
        return formatters.numeric.call(this, tickValue, index, ticks);
      }

      return '';
    }

  };

  function calculateDelta(tickValue, ticks) {
    let delta = ticks.length > 3 ? ticks[2].value - ticks[1].value : ticks[1].value - ticks[0].value;

    if (Math.abs(delta) >= 1 && tickValue !== Math.floor(tickValue)) {
      delta = tickValue - Math.floor(tickValue);
    }

    return delta;
  }

  var Ticks = {
    formatters
  };
  defaults.set('scale', {
    display: true,
    offset: false,
    reverse: false,
    beginAtZero: false,
    bounds: 'ticks',
    grace: 0,
    grid: {
      display: true,
      lineWidth: 1,
      drawBorder: true,
      drawOnChartArea: true,
      drawTicks: true,
      tickLength: 8,
      tickWidth: (_ctx, options) => options.lineWidth,
      tickColor: (_ctx, options) => options.color,
      offset: false,
      borderDash: [],
      borderDashOffset: 0.0,
      borderWidth: 1
    },
    title: {
      display: false,
      text: '',
      padding: {
        top: 4,
        bottom: 4
      }
    },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: false,
      textStrokeWidth: 0,
      textStrokeColor: '',
      padding: 3,
      display: true,
      autoSkip: true,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: Ticks.formatters.values,
      minor: {},
      major: {},
      align: 'center',
      crossAlign: 'near',
      showLabelBackdrop: false,
      backdropColor: 'rgba(255, 255, 255, 0.75)',
      backdropPadding: 2
    }
  });
  defaults.route('scale.ticks', 'color', '', 'color');
  defaults.route('scale.grid', 'color', '', 'borderColor');
  defaults.route('scale.grid', 'borderColor', '', 'borderColor');
  defaults.route('scale.title', 'color', '', 'color');
  defaults.describe('scale', {
    _fallback: false,
    _scriptable: name => !name.startsWith('before') && !name.startsWith('after') && name !== 'callback' && name !== 'parser',
    _indexable: name => name !== 'borderDash' && name !== 'tickBorderDash'
  });
  defaults.describe('scales', {
    _fallback: 'scale'
  });
  defaults.describe('scale.ticks', {
    _scriptable: name => name !== 'backdropPadding' && name !== 'callback',
    _indexable: name => name !== 'backdropPadding'
  });

  function autoSkip(scale, ticks) {
    const tickOpts = scale.options.ticks;
    const ticksLimit = tickOpts.maxTicksLimit || determineMaxTicks(scale);
    const majorIndices = tickOpts.major.enabled ? getMajorIndices(ticks) : [];
    const numMajorIndices = majorIndices.length;
    const first = majorIndices[0];
    const last = majorIndices[numMajorIndices - 1];
    const newTicks = [];

    if (numMajorIndices > ticksLimit) {
      skipMajors(ticks, newTicks, majorIndices, numMajorIndices / ticksLimit);
      return newTicks;
    }

    const spacing = calculateSpacing(majorIndices, ticks, ticksLimit);

    if (numMajorIndices > 0) {
      let i, ilen;
      const avgMajorSpacing = numMajorIndices > 1 ? Math.round((last - first) / (numMajorIndices - 1)) : null;
      skip(ticks, newTicks, spacing, isNullOrUndef(avgMajorSpacing) ? 0 : first - avgMajorSpacing, first);

      for (i = 0, ilen = numMajorIndices - 1; i < ilen; i++) {
        skip(ticks, newTicks, spacing, majorIndices[i], majorIndices[i + 1]);
      }

      skip(ticks, newTicks, spacing, last, isNullOrUndef(avgMajorSpacing) ? ticks.length : last + avgMajorSpacing);
      return newTicks;
    }

    skip(ticks, newTicks, spacing);
    return newTicks;
  }

  function determineMaxTicks(scale) {
    const offset = scale.options.offset;

    const tickLength = scale._tickSize();

    const maxScale = scale._length / tickLength + (offset ? 0 : 1);
    const maxChart = scale._maxLength / tickLength;
    return Math.floor(Math.min(maxScale, maxChart));
  }

  function calculateSpacing(majorIndices, ticks, ticksLimit) {
    const evenMajorSpacing = getEvenSpacing(majorIndices);
    const spacing = ticks.length / ticksLimit;

    if (!evenMajorSpacing) {
      return Math.max(spacing, 1);
    }

    const factors = _factorize(evenMajorSpacing);

    for (let i = 0, ilen = factors.length - 1; i < ilen; i++) {
      const factor = factors[i];

      if (factor > spacing) {
        return factor;
      }
    }

    return Math.max(spacing, 1);
  }

  function getMajorIndices(ticks) {
    const result = [];
    let i, ilen;

    for (i = 0, ilen = ticks.length; i < ilen; i++) {
      if (ticks[i].major) {
        result.push(i);
      }
    }

    return result;
  }

  function skipMajors(ticks, newTicks, majorIndices, spacing) {
    let count = 0;
    let next = majorIndices[0];
    let i;
    spacing = Math.ceil(spacing);

    for (i = 0; i < ticks.length; i++) {
      if (i === next) {
        newTicks.push(ticks[i]);
        count++;
        next = majorIndices[count * spacing];
      }
    }
  }

  function skip(ticks, newTicks, spacing, majorStart, majorEnd) {
    const start = valueOrDefault(majorStart, 0);
    const end = Math.min(valueOrDefault(majorEnd, ticks.length), ticks.length);
    let count = 0;
    let length, i, next;
    spacing = Math.ceil(spacing);

    if (majorEnd) {
      length = majorEnd - majorStart;
      spacing = length / Math.floor(length / spacing);
    }

    next = start;

    while (next < 0) {
      count++;
      next = Math.round(start + count * spacing);
    }

    for (i = Math.max(start, 0); i < end; i++) {
      if (i === next) {
        newTicks.push(ticks[i]);
        count++;
        next = Math.round(start + count * spacing);
      }
    }
  }

  function getEvenSpacing(arr) {
    const len = arr.length;
    let i, diff;

    if (len < 2) {
      return false;
    }

    for (diff = arr[0], i = 1; i < len; ++i) {
      if (arr[i] - arr[i - 1] !== diff) {
        return false;
      }
    }

    return diff;
  }

  const reverseAlign = align => align === 'left' ? 'right' : align === 'right' ? 'left' : align;

  const offsetFromEdge = (scale, edge, offset) => edge === 'top' || edge === 'left' ? scale[edge] + offset : scale[edge] - offset;

  function sample(arr, numItems) {
    const result = [];
    const increment = arr.length / numItems;
    const len = arr.length;
    let i = 0;

    for (; i < len; i += increment) {
      result.push(arr[Math.floor(i)]);
    }

    return result;
  }

  function getPixelForGridLine(scale, index, offsetGridLines) {
    const length = scale.ticks.length;
    const validIndex = Math.min(index, length - 1);
    const start = scale._startPixel;
    const end = scale._endPixel;
    const epsilon = 1e-6;
    let lineValue = scale.getPixelForTick(validIndex);
    let offset;

    if (offsetGridLines) {
      if (length === 1) {
        offset = Math.max(lineValue - start, end - lineValue);
      } else if (index === 0) {
        offset = (scale.getPixelForTick(1) - lineValue) / 2;
      } else {
        offset = (lineValue - scale.getPixelForTick(validIndex - 1)) / 2;
      }

      lineValue += validIndex < index ? offset : -offset;

      if (lineValue < start - epsilon || lineValue > end + epsilon) {
        return;
      }
    }

    return lineValue;
  }

  function garbageCollect(caches, length) {
    each(caches, cache => {
      const gc = cache.gc;
      const gcLen = gc.length / 2;
      let i;

      if (gcLen > length) {
        for (i = 0; i < gcLen; ++i) {
          delete cache.data[gc[i]];
        }

        gc.splice(0, gcLen);
      }
    });
  }

  function getTickMarkLength(options) {
    return options.drawTicks ? options.tickLength : 0;
  }

  function getTitleHeight(options, fallback) {
    if (!options.display) {
      return 0;
    }

    const font = toFont(options.font, fallback);
    const padding = toPadding(options.padding);
    const lines = isArray(options.text) ? options.text.length : 1;
    return lines * font.lineHeight + padding.height;
  }

  function createScaleContext(parent, scale) {
    return Object.assign(Object.create(parent), {
      scale,
      type: 'scale'
    });
  }

  function createTickContext(parent, index, tick) {
    return Object.assign(Object.create(parent), {
      tick,
      index,
      type: 'tick'
    });
  }

  function titleAlign(align, position, reverse) {
    let ret = _toLeftRightCenter(align);

    if (reverse && position !== 'right' || !reverse && position === 'right') {
      ret = reverseAlign(ret);
    }

    return ret;
  }

  function titleArgs(scale, offset, position, align) {
    const {
      top,
      left,
      bottom,
      right
    } = scale;
    let rotation = 0;
    let maxWidth, titleX, titleY;

    if (scale.isHorizontal()) {
      titleX = _alignStartEnd(align, left, right);
      titleY = offsetFromEdge(scale, position, offset);
      maxWidth = right - left;
    } else {
      titleX = offsetFromEdge(scale, position, offset);
      titleY = _alignStartEnd(align, bottom, top);
      rotation = position === 'left' ? -HALF_PI : HALF_PI;
    }

    return {
      titleX,
      titleY,
      maxWidth,
      rotation
    };
  }

  class Scale extends Element {
    constructor(cfg) {
      super();
      this.id = cfg.id;
      this.type = cfg.type;
      this.options = undefined;
      this.ctx = cfg.ctx;
      this.chart = cfg.chart;
      this.top = undefined;
      this.bottom = undefined;
      this.left = undefined;
      this.right = undefined;
      this.width = undefined;
      this.height = undefined;
      this._margins = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      };
      this.maxWidth = undefined;
      this.maxHeight = undefined;
      this.paddingTop = undefined;
      this.paddingBottom = undefined;
      this.paddingLeft = undefined;
      this.paddingRight = undefined;
      this.axis = undefined;
      this.labelRotation = undefined;
      this.min = undefined;
      this.max = undefined;
      this._range = undefined;
      this.ticks = [];
      this._gridLineItems = null;
      this._labelItems = null;
      this._labelSizes = null;
      this._length = 0;
      this._maxLength = 0;
      this._longestTextCache = {};
      this._startPixel = undefined;
      this._endPixel = undefined;
      this._reversePixels = false;
      this._userMax = undefined;
      this._userMin = undefined;
      this._suggestedMax = undefined;
      this._suggestedMin = undefined;
      this._ticksLength = 0;
      this._borderValue = 0;
      this._cache = {};
      this._dataLimitsCached = false;
      this.$context = undefined;
    }

    init(options) {
      const me = this;
      me.options = options.setContext(me.getContext());
      me.axis = options.axis;
      me._userMin = me.parse(options.min);
      me._userMax = me.parse(options.max);
      me._suggestedMin = me.parse(options.suggestedMin);
      me._suggestedMax = me.parse(options.suggestedMax);
    }

    parse(raw, index) {
      return raw;
    }

    getUserBounds() {
      let {
        _userMin,
        _userMax,
        _suggestedMin,
        _suggestedMax
      } = this;
      _userMin = finiteOrDefault(_userMin, Number.POSITIVE_INFINITY);
      _userMax = finiteOrDefault(_userMax, Number.NEGATIVE_INFINITY);
      _suggestedMin = finiteOrDefault(_suggestedMin, Number.POSITIVE_INFINITY);
      _suggestedMax = finiteOrDefault(_suggestedMax, Number.NEGATIVE_INFINITY);
      return {
        min: finiteOrDefault(_userMin, _suggestedMin),
        max: finiteOrDefault(_userMax, _suggestedMax),
        minDefined: isNumberFinite(_userMin),
        maxDefined: isNumberFinite(_userMax)
      };
    }

    getMinMax(canStack) {
      const me = this;
      let {
        min,
        max,
        minDefined,
        maxDefined
      } = me.getUserBounds();
      let range;

      if (minDefined && maxDefined) {
        return {
          min,
          max
        };
      }

      const metas = me.getMatchingVisibleMetas();

      for (let i = 0, ilen = metas.length; i < ilen; ++i) {
        range = metas[i].controller.getMinMax(me, canStack);

        if (!minDefined) {
          min = Math.min(min, range.min);
        }

        if (!maxDefined) {
          max = Math.max(max, range.max);
        }
      }

      return {
        min: finiteOrDefault(min, finiteOrDefault(max, min)),
        max: finiteOrDefault(max, finiteOrDefault(min, max))
      };
    }

    getPadding() {
      const me = this;
      return {
        left: me.paddingLeft || 0,
        top: me.paddingTop || 0,
        right: me.paddingRight || 0,
        bottom: me.paddingBottom || 0
      };
    }

    getTicks() {
      return this.ticks;
    }

    getLabels() {
      const data = this.chart.data;
      return this.options.labels || (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels || [];
    }

    beforeLayout() {
      this._cache = {};
      this._dataLimitsCached = false;
    }

    beforeUpdate() {
      callback(this.options.beforeUpdate, [this]);
    }

    update(maxWidth, maxHeight, margins) {
      const me = this;
      const tickOpts = me.options.ticks;
      const sampleSize = tickOpts.sampleSize;
      me.beforeUpdate();
      me.maxWidth = maxWidth;
      me.maxHeight = maxHeight;
      me._margins = margins = Object.assign({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }, margins);
      me.ticks = null;
      me._labelSizes = null;
      me._gridLineItems = null;
      me._labelItems = null;
      me.beforeSetDimensions();
      me.setDimensions();
      me.afterSetDimensions();
      me._maxLength = me.isHorizontal() ? me.width + margins.left + margins.right : me.height + margins.top + margins.bottom;

      if (!me._dataLimitsCached) {
        me.beforeDataLimits();
        me.determineDataLimits();
        me.afterDataLimits();
        me._range = _addGrace(me, me.options.grace);
        me._dataLimitsCached = true;
      }

      me.beforeBuildTicks();
      me.ticks = me.buildTicks() || [];
      me.afterBuildTicks();
      const samplingEnabled = sampleSize < me.ticks.length;

      me._convertTicksToLabels(samplingEnabled ? sample(me.ticks, sampleSize) : me.ticks);

      me.configure();
      me.beforeCalculateLabelRotation();
      me.calculateLabelRotation();
      me.afterCalculateLabelRotation();

      if (tickOpts.display && (tickOpts.autoSkip || tickOpts.source === 'auto')) {
        me.ticks = autoSkip(me, me.ticks);
        me._labelSizes = null;
      }

      if (samplingEnabled) {
        me._convertTicksToLabels(me.ticks);
      }

      me.beforeFit();
      me.fit();
      me.afterFit();
      me.afterUpdate();
    }

    configure() {
      const me = this;
      let reversePixels = me.options.reverse;
      let startPixel, endPixel;

      if (me.isHorizontal()) {
        startPixel = me.left;
        endPixel = me.right;
      } else {
        startPixel = me.top;
        endPixel = me.bottom;
        reversePixels = !reversePixels;
      }

      me._startPixel = startPixel;
      me._endPixel = endPixel;
      me._reversePixels = reversePixels;
      me._length = endPixel - startPixel;
      me._alignToPixels = me.options.alignToPixels;
    }

    afterUpdate() {
      callback(this.options.afterUpdate, [this]);
    }

    beforeSetDimensions() {
      callback(this.options.beforeSetDimensions, [this]);
    }

    setDimensions() {
      const me = this;

      if (me.isHorizontal()) {
        me.width = me.maxWidth;
        me.left = 0;
        me.right = me.width;
      } else {
        me.height = me.maxHeight;
        me.top = 0;
        me.bottom = me.height;
      }

      me.paddingLeft = 0;
      me.paddingTop = 0;
      me.paddingRight = 0;
      me.paddingBottom = 0;
    }

    afterSetDimensions() {
      callback(this.options.afterSetDimensions, [this]);
    }

    _callHooks(name) {
      const me = this;
      me.chart.notifyPlugins(name, me.getContext());
      callback(me.options[name], [me]);
    }

    beforeDataLimits() {
      this._callHooks('beforeDataLimits');
    }

    determineDataLimits() {}

    afterDataLimits() {
      this._callHooks('afterDataLimits');
    }

    beforeBuildTicks() {
      this._callHooks('beforeBuildTicks');
    }

    buildTicks() {
      return [];
    }

    afterBuildTicks() {
      this._callHooks('afterBuildTicks');
    }

    beforeTickToLabelConversion() {
      callback(this.options.beforeTickToLabelConversion, [this]);
    }

    generateTickLabels(ticks) {
      const me = this;
      const tickOpts = me.options.ticks;
      let i, ilen, tick;

      for (i = 0, ilen = ticks.length; i < ilen; i++) {
        tick = ticks[i];
        tick.label = callback(tickOpts.callback, [tick.value, i, ticks], me);
      }
    }

    afterTickToLabelConversion() {
      callback(this.options.afterTickToLabelConversion, [this]);
    }

    beforeCalculateLabelRotation() {
      callback(this.options.beforeCalculateLabelRotation, [this]);
    }

    calculateLabelRotation() {
      const me = this;
      const options = me.options;
      const tickOpts = options.ticks;
      const numTicks = me.ticks.length;
      const minRotation = tickOpts.minRotation || 0;
      const maxRotation = tickOpts.maxRotation;
      let labelRotation = minRotation;
      let tickWidth, maxHeight, maxLabelDiagonal;

      if (!me._isVisible() || !tickOpts.display || minRotation >= maxRotation || numTicks <= 1 || !me.isHorizontal()) {
        me.labelRotation = minRotation;
        return;
      }

      const labelSizes = me._getLabelSizes();

      const maxLabelWidth = labelSizes.widest.width;
      const maxLabelHeight = labelSizes.highest.height;

      const maxWidth = _limitValue(me.chart.width - maxLabelWidth, 0, me.maxWidth);

      tickWidth = options.offset ? me.maxWidth / numTicks : maxWidth / (numTicks - 1);

      if (maxLabelWidth + 6 > tickWidth) {
        tickWidth = maxWidth / (numTicks - (options.offset ? 0.5 : 1));
        maxHeight = me.maxHeight - getTickMarkLength(options.grid) - tickOpts.padding - getTitleHeight(options.title, me.chart.options.font);
        maxLabelDiagonal = Math.sqrt(maxLabelWidth * maxLabelWidth + maxLabelHeight * maxLabelHeight);
        labelRotation = toDegrees(Math.min(Math.asin(Math.min((labelSizes.highest.height + 6) / tickWidth, 1)), Math.asin(Math.min(maxHeight / maxLabelDiagonal, 1)) - Math.asin(maxLabelHeight / maxLabelDiagonal)));
        labelRotation = Math.max(minRotation, Math.min(maxRotation, labelRotation));
      }

      me.labelRotation = labelRotation;
    }

    afterCalculateLabelRotation() {
      callback(this.options.afterCalculateLabelRotation, [this]);
    }

    beforeFit() {
      callback(this.options.beforeFit, [this]);
    }

    fit() {
      const me = this;
      const minSize = {
        width: 0,
        height: 0
      };
      const {
        chart,
        options: {
          ticks: tickOpts,
          title: titleOpts,
          grid: gridOpts
        }
      } = me;

      const display = me._isVisible();

      const isHorizontal = me.isHorizontal();

      if (display) {
        const titleHeight = getTitleHeight(titleOpts, chart.options.font);

        if (isHorizontal) {
          minSize.width = me.maxWidth;
          minSize.height = getTickMarkLength(gridOpts) + titleHeight;
        } else {
          minSize.height = me.maxHeight;
          minSize.width = getTickMarkLength(gridOpts) + titleHeight;
        }

        if (tickOpts.display && me.ticks.length) {
          const {
            first,
            last,
            widest,
            highest
          } = me._getLabelSizes();

          const tickPadding = tickOpts.padding * 2;
          const angleRadians = toRadians(me.labelRotation);
          const cos = Math.cos(angleRadians);
          const sin = Math.sin(angleRadians);

          if (isHorizontal) {
            const labelHeight = tickOpts.mirror ? 0 : sin * widest.width + cos * highest.height;
            minSize.height = Math.min(me.maxHeight, minSize.height + labelHeight + tickPadding);
          } else {
            const labelWidth = tickOpts.mirror ? 0 : cos * widest.width + sin * highest.height;
            minSize.width = Math.min(me.maxWidth, minSize.width + labelWidth + tickPadding);
          }

          me._calculatePadding(first, last, sin, cos);
        }
      }

      me._handleMargins();

      if (isHorizontal) {
        me.width = me._length = chart.width - me._margins.left - me._margins.right;
        me.height = minSize.height;
      } else {
        me.width = minSize.width;
        me.height = me._length = chart.height - me._margins.top - me._margins.bottom;
      }
    }

    _calculatePadding(first, last, sin, cos) {
      const me = this;
      const {
        ticks: {
          align,
          padding
        },
        position
      } = me.options;
      const isRotated = me.labelRotation !== 0;
      const labelsBelowTicks = position !== 'top' && me.axis === 'x';

      if (me.isHorizontal()) {
        const offsetLeft = me.getPixelForTick(0) - me.left;
        const offsetRight = me.right - me.getPixelForTick(me.ticks.length - 1);
        let paddingLeft = 0;
        let paddingRight = 0;

        if (isRotated) {
          if (labelsBelowTicks) {
            paddingLeft = cos * first.width;
            paddingRight = sin * last.height;
          } else {
            paddingLeft = sin * first.height;
            paddingRight = cos * last.width;
          }
        } else if (align === 'start') {
          paddingRight = last.width;
        } else if (align === 'end') {
          paddingLeft = first.width;
        } else {
          paddingLeft = first.width / 2;
          paddingRight = last.width / 2;
        }

        me.paddingLeft = Math.max((paddingLeft - offsetLeft + padding) * me.width / (me.width - offsetLeft), 0);
        me.paddingRight = Math.max((paddingRight - offsetRight + padding) * me.width / (me.width - offsetRight), 0);
      } else {
        let paddingTop = last.height / 2;
        let paddingBottom = first.height / 2;

        if (align === 'start') {
          paddingTop = 0;
          paddingBottom = first.height;
        } else if (align === 'end') {
          paddingTop = last.height;
          paddingBottom = 0;
        }

        me.paddingTop = paddingTop + padding;
        me.paddingBottom = paddingBottom + padding;
      }
    }

    _handleMargins() {
      const me = this;

      if (me._margins) {
        me._margins.left = Math.max(me.paddingLeft, me._margins.left);
        me._margins.top = Math.max(me.paddingTop, me._margins.top);
        me._margins.right = Math.max(me.paddingRight, me._margins.right);
        me._margins.bottom = Math.max(me.paddingBottom, me._margins.bottom);
      }
    }

    afterFit() {
      callback(this.options.afterFit, [this]);
    }

    isHorizontal() {
      const {
        axis,
        position
      } = this.options;
      return position === 'top' || position === 'bottom' || axis === 'x';
    }

    isFullSize() {
      return this.options.fullSize;
    }

    _convertTicksToLabels(ticks) {
      const me = this;
      me.beforeTickToLabelConversion();
      me.generateTickLabels(ticks);
      let i, ilen;

      for (i = 0, ilen = ticks.length; i < ilen; i++) {
        if (isNullOrUndef(ticks[i].label)) {
          ticks.splice(i, 1);
          ilen--;
          i--;
        }
      }

      me.afterTickToLabelConversion();
    }

    _getLabelSizes() {
      const me = this;
      let labelSizes = me._labelSizes;

      if (!labelSizes) {
        const sampleSize = me.options.ticks.sampleSize;
        let ticks = me.ticks;

        if (sampleSize < ticks.length) {
          ticks = sample(ticks, sampleSize);
        }

        me._labelSizes = labelSizes = me._computeLabelSizes(ticks, ticks.length);
      }

      return labelSizes;
    }

    _computeLabelSizes(ticks, length) {
      const {
        ctx,
        _longestTextCache: caches
      } = this;
      const widths = [];
      const heights = [];
      let widestLabelSize = 0;
      let highestLabelSize = 0;
      let i, j, jlen, label, tickFont, fontString, cache, lineHeight, width, height, nestedLabel;

      for (i = 0; i < length; ++i) {
        label = ticks[i].label;
        tickFont = this._resolveTickFontOptions(i);
        ctx.font = fontString = tickFont.string;
        cache = caches[fontString] = caches[fontString] || {
          data: {},
          gc: []
        };
        lineHeight = tickFont.lineHeight;
        width = height = 0;

        if (!isNullOrUndef(label) && !isArray(label)) {
          width = _measureText(ctx, cache.data, cache.gc, width, label);
          height = lineHeight;
        } else if (isArray(label)) {
          for (j = 0, jlen = label.length; j < jlen; ++j) {
            nestedLabel = label[j];

            if (!isNullOrUndef(nestedLabel) && !isArray(nestedLabel)) {
              width = _measureText(ctx, cache.data, cache.gc, width, nestedLabel);
              height += lineHeight;
            }
          }
        }

        widths.push(width);
        heights.push(height);
        widestLabelSize = Math.max(width, widestLabelSize);
        highestLabelSize = Math.max(height, highestLabelSize);
      }

      garbageCollect(caches, length);
      const widest = widths.indexOf(widestLabelSize);
      const highest = heights.indexOf(highestLabelSize);

      const valueAt = idx => ({
        width: widths[idx] || 0,
        height: heights[idx] || 0
      });

      return {
        first: valueAt(0),
        last: valueAt(length - 1),
        widest: valueAt(widest),
        highest: valueAt(highest),
        widths,
        heights
      };
    }

    getLabelForValue(value) {
      return value;
    }

    getPixelForValue(value, index) {
      return NaN;
    }

    getValueForPixel(pixel) {}

    getPixelForTick(index) {
      const ticks = this.ticks;

      if (index < 0 || index > ticks.length - 1) {
        return null;
      }

      return this.getPixelForValue(ticks[index].value);
    }

    getPixelForDecimal(decimal) {
      const me = this;

      if (me._reversePixels) {
        decimal = 1 - decimal;
      }

      const pixel = me._startPixel + decimal * me._length;
      return _int16Range(me._alignToPixels ? _alignPixel(me.chart, pixel, 0) : pixel);
    }

    getDecimalForPixel(pixel) {
      const decimal = (pixel - this._startPixel) / this._length;
      return this._reversePixels ? 1 - decimal : decimal;
    }

    getBasePixel() {
      return this.getPixelForValue(this.getBaseValue());
    }

    getBaseValue() {
      const {
        min,
        max
      } = this;
      return min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0;
    }

    getContext(index) {
      const me = this;
      const ticks = me.ticks || [];

      if (index >= 0 && index < ticks.length) {
        const tick = ticks[index];
        return tick.$context || (tick.$context = createTickContext(me.getContext(), index, tick));
      }

      return me.$context || (me.$context = createScaleContext(me.chart.getContext(), me));
    }

    _tickSize() {
      const me = this;
      const optionTicks = me.options.ticks;
      const rot = toRadians(me.labelRotation);
      const cos = Math.abs(Math.cos(rot));
      const sin = Math.abs(Math.sin(rot));

      const labelSizes = me._getLabelSizes();

      const padding = optionTicks.autoSkipPadding || 0;
      const w = labelSizes ? labelSizes.widest.width + padding : 0;
      const h = labelSizes ? labelSizes.highest.height + padding : 0;
      return me.isHorizontal() ? h * cos > w * sin ? w / cos : h / sin : h * sin < w * cos ? h / cos : w / sin;
    }

    _isVisible() {
      const display = this.options.display;

      if (display !== 'auto') {
        return !!display;
      }

      return this.getMatchingVisibleMetas().length > 0;
    }

    _computeGridLineItems(chartArea) {
      const me = this;
      const axis = me.axis;
      const chart = me.chart;
      const options = me.options;
      const {
        grid,
        position
      } = options;
      const offset = grid.offset;
      const isHorizontal = me.isHorizontal();
      const ticks = me.ticks;
      const ticksLength = ticks.length + (offset ? 1 : 0);
      const tl = getTickMarkLength(grid);
      const items = [];
      const borderOpts = grid.setContext(me.getContext());
      const axisWidth = borderOpts.drawBorder ? borderOpts.borderWidth : 0;
      const axisHalfWidth = axisWidth / 2;

      const alignBorderValue = function (pixel) {
        return _alignPixel(chart, pixel, axisWidth);
      };

      let borderValue, i, lineValue, alignedLineValue;
      let tx1, ty1, tx2, ty2, x1, y1, x2, y2;

      if (position === 'top') {
        borderValue = alignBorderValue(me.bottom);
        ty1 = me.bottom - tl;
        ty2 = borderValue - axisHalfWidth;
        y1 = alignBorderValue(chartArea.top) + axisHalfWidth;
        y2 = chartArea.bottom;
      } else if (position === 'bottom') {
        borderValue = alignBorderValue(me.top);
        y1 = chartArea.top;
        y2 = alignBorderValue(chartArea.bottom) - axisHalfWidth;
        ty1 = borderValue + axisHalfWidth;
        ty2 = me.top + tl;
      } else if (position === 'left') {
        borderValue = alignBorderValue(me.right);
        tx1 = me.right - tl;
        tx2 = borderValue - axisHalfWidth;
        x1 = alignBorderValue(chartArea.left) + axisHalfWidth;
        x2 = chartArea.right;
      } else if (position === 'right') {
        borderValue = alignBorderValue(me.left);
        x1 = chartArea.left;
        x2 = alignBorderValue(chartArea.right) - axisHalfWidth;
        tx1 = borderValue + axisHalfWidth;
        tx2 = me.left + tl;
      } else if (axis === 'x') {
        if (position === 'center') {
          borderValue = alignBorderValue((chartArea.top + chartArea.bottom) / 2 + 0.5);
        } else if (isObject(position)) {
          const positionAxisID = Object.keys(position)[0];
          const value = position[positionAxisID];
          borderValue = alignBorderValue(me.chart.scales[positionAxisID].getPixelForValue(value));
        }

        y1 = chartArea.top;
        y2 = chartArea.bottom;
        ty1 = borderValue + axisHalfWidth;
        ty2 = ty1 + tl;
      } else if (axis === 'y') {
        if (position === 'center') {
          borderValue = alignBorderValue((chartArea.left + chartArea.right) / 2);
        } else if (isObject(position)) {
          const positionAxisID = Object.keys(position)[0];
          const value = position[positionAxisID];
          borderValue = alignBorderValue(me.chart.scales[positionAxisID].getPixelForValue(value));
        }

        tx1 = borderValue - axisHalfWidth;
        tx2 = tx1 - tl;
        x1 = chartArea.left;
        x2 = chartArea.right;
      }

      const limit = valueOrDefault(options.ticks.maxTicksLimit, ticksLength);
      const step = Math.max(1, Math.ceil(ticksLength / limit));

      for (i = 0; i < ticksLength; i += step) {
        const optsAtIndex = grid.setContext(me.getContext(i));
        const lineWidth = optsAtIndex.lineWidth;
        const lineColor = optsAtIndex.color;
        const borderDash = grid.borderDash || [];
        const borderDashOffset = optsAtIndex.borderDashOffset;
        const tickWidth = optsAtIndex.tickWidth;
        const tickColor = optsAtIndex.tickColor;
        const tickBorderDash = optsAtIndex.tickBorderDash || [];
        const tickBorderDashOffset = optsAtIndex.tickBorderDashOffset;
        lineValue = getPixelForGridLine(me, i, offset);

        if (lineValue === undefined) {
          continue;
        }

        alignedLineValue = _alignPixel(chart, lineValue, lineWidth);

        if (isHorizontal) {
          tx1 = tx2 = x1 = x2 = alignedLineValue;
        } else {
          ty1 = ty2 = y1 = y2 = alignedLineValue;
        }

        items.push({
          tx1,
          ty1,
          tx2,
          ty2,
          x1,
          y1,
          x2,
          y2,
          width: lineWidth,
          color: lineColor,
          borderDash,
          borderDashOffset,
          tickWidth,
          tickColor,
          tickBorderDash,
          tickBorderDashOffset
        });
      }

      me._ticksLength = ticksLength;
      me._borderValue = borderValue;
      return items;
    }

    _computeLabelItems(chartArea) {
      const me = this;
      const axis = me.axis;
      const options = me.options;
      const {
        position,
        ticks: optionTicks
      } = options;
      const isHorizontal = me.isHorizontal();
      const ticks = me.ticks;
      const {
        align,
        crossAlign,
        padding,
        mirror
      } = optionTicks;
      const tl = getTickMarkLength(options.grid);
      const tickAndPadding = tl + padding;
      const hTickAndPadding = mirror ? -padding : tickAndPadding;
      const rotation = -toRadians(me.labelRotation);
      const items = [];
      let i, ilen, tick, label, x, y, textAlign, pixel, font, lineHeight, lineCount, textOffset;
      let textBaseline = 'middle';

      if (position === 'top') {
        y = me.bottom - hTickAndPadding;
        textAlign = me._getXAxisLabelAlignment();
      } else if (position === 'bottom') {
        y = me.top + hTickAndPadding;
        textAlign = me._getXAxisLabelAlignment();
      } else if (position === 'left') {
        const ret = me._getYAxisLabelAlignment(tl);

        textAlign = ret.textAlign;
        x = ret.x;
      } else if (position === 'right') {
        const ret = me._getYAxisLabelAlignment(tl);

        textAlign = ret.textAlign;
        x = ret.x;
      } else if (axis === 'x') {
        if (position === 'center') {
          y = (chartArea.top + chartArea.bottom) / 2 + tickAndPadding;
        } else if (isObject(position)) {
          const positionAxisID = Object.keys(position)[0];
          const value = position[positionAxisID];
          y = me.chart.scales[positionAxisID].getPixelForValue(value) + tickAndPadding;
        }

        textAlign = me._getXAxisLabelAlignment();
      } else if (axis === 'y') {
        if (position === 'center') {
          x = (chartArea.left + chartArea.right) / 2 - tickAndPadding;
        } else if (isObject(position)) {
          const positionAxisID = Object.keys(position)[0];
          const value = position[positionAxisID];
          x = me.chart.scales[positionAxisID].getPixelForValue(value);
        }

        textAlign = me._getYAxisLabelAlignment(tl).textAlign;
      }

      if (axis === 'y') {
        if (align === 'start') {
          textBaseline = 'top';
        } else if (align === 'end') {
          textBaseline = 'bottom';
        }
      }

      const labelSizes = me._getLabelSizes();

      for (i = 0, ilen = ticks.length; i < ilen; ++i) {
        tick = ticks[i];
        label = tick.label;
        const optsAtIndex = optionTicks.setContext(me.getContext(i));
        pixel = me.getPixelForTick(i) + optionTicks.labelOffset;
        font = me._resolveTickFontOptions(i);
        lineHeight = font.lineHeight;
        lineCount = isArray(label) ? label.length : 1;
        const halfCount = lineCount / 2;
        const color = optsAtIndex.color;
        const strokeColor = optsAtIndex.textStrokeColor;
        const strokeWidth = optsAtIndex.textStrokeWidth;

        if (isHorizontal) {
          x = pixel;

          if (position === 'top') {
            if (crossAlign === 'near' || rotation !== 0) {
              textOffset = -lineCount * lineHeight + lineHeight / 2;
            } else if (crossAlign === 'center') {
              textOffset = -labelSizes.highest.height / 2 - halfCount * lineHeight + lineHeight;
            } else {
              textOffset = -labelSizes.highest.height + lineHeight / 2;
            }
          } else {
            if (crossAlign === 'near' || rotation !== 0) {
              textOffset = lineHeight / 2;
            } else if (crossAlign === 'center') {
              textOffset = labelSizes.highest.height / 2 - halfCount * lineHeight;
            } else {
              textOffset = labelSizes.highest.height - lineCount * lineHeight;
            }
          }

          if (mirror) {
            textOffset *= -1;
          }
        } else {
          y = pixel;
          textOffset = (1 - lineCount) * lineHeight / 2;
        }

        let backdrop;

        if (optsAtIndex.showLabelBackdrop) {
          const labelPadding = toPadding(optsAtIndex.backdropPadding);
          const height = labelSizes.heights[i];
          const width = labelSizes.widths[i];
          let top = y + textOffset - labelPadding.top;
          let left = x - labelPadding.left;

          switch (textBaseline) {
            case 'middle':
              top -= height / 2;
              break;

            case 'bottom':
              top -= height;
              break;
          }

          switch (textAlign) {
            case 'center':
              left -= width / 2;
              break;

            case 'right':
              left -= width;
              break;
          }

          backdrop = {
            left,
            top,
            width: width + labelPadding.width,
            height: height + labelPadding.height,
            color: optsAtIndex.backdropColor
          };
        }

        items.push({
          rotation,
          label,
          font,
          color,
          strokeColor,
          strokeWidth,
          textOffset,
          textAlign,
          textBaseline,
          translation: [x, y],
          backdrop
        });
      }

      return items;
    }

    _getXAxisLabelAlignment() {
      const me = this;
      const {
        position,
        ticks
      } = me.options;
      const rotation = -toRadians(me.labelRotation);

      if (rotation) {
        return position === 'top' ? 'left' : 'right';
      }

      let align = 'center';

      if (ticks.align === 'start') {
        align = 'left';
      } else if (ticks.align === 'end') {
        align = 'right';
      }

      return align;
    }

    _getYAxisLabelAlignment(tl) {
      const me = this;
      const {
        position,
        ticks: {
          crossAlign,
          mirror,
          padding
        }
      } = me.options;

      const labelSizes = me._getLabelSizes();

      const tickAndPadding = tl + padding;
      const widest = labelSizes.widest.width;
      let textAlign;
      let x;

      if (position === 'left') {
        if (mirror) {
          textAlign = 'left';
          x = me.right + padding;
        } else {
          x = me.right - tickAndPadding;

          if (crossAlign === 'near') {
            textAlign = 'right';
          } else if (crossAlign === 'center') {
            textAlign = 'center';
            x -= widest / 2;
          } else {
            textAlign = 'left';
            x = me.left;
          }
        }
      } else if (position === 'right') {
        if (mirror) {
          textAlign = 'right';
          x = me.left + padding;
        } else {
          x = me.left + tickAndPadding;

          if (crossAlign === 'near') {
            textAlign = 'left';
          } else if (crossAlign === 'center') {
            textAlign = 'center';
            x += widest / 2;
          } else {
            textAlign = 'right';
            x = me.right;
          }
        }
      } else {
        textAlign = 'right';
      }

      return {
        textAlign,
        x
      };
    }

    _computeLabelArea() {
      const me = this;

      if (me.options.ticks.mirror) {
        return;
      }

      const chart = me.chart;
      const position = me.options.position;

      if (position === 'left' || position === 'right') {
        return {
          top: 0,
          left: me.left,
          bottom: chart.height,
          right: me.right
        };
      }

      if (position === 'top' || position === 'bottom') {
        return {
          top: me.top,
          left: 0,
          bottom: me.bottom,
          right: chart.width
        };
      }
    }

    drawBackground() {
      const {
        ctx,
        options: {
          backgroundColor
        },
        left,
        top,
        width,
        height
      } = this;

      if (backgroundColor) {
        ctx.save();
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(left, top, width, height);
        ctx.restore();
      }
    }

    getLineWidthForValue(value) {
      const me = this;
      const grid = me.options.grid;

      if (!me._isVisible() || !grid.display) {
        return 0;
      }

      const ticks = me.ticks;
      const index = ticks.findIndex(t => t.value === value);

      if (index >= 0) {
        const opts = grid.setContext(me.getContext(index));
        return opts.lineWidth;
      }

      return 0;
    }

    drawGrid(chartArea) {
      const me = this;
      const grid = me.options.grid;
      const ctx = me.ctx;

      const items = me._gridLineItems || (me._gridLineItems = me._computeGridLineItems(chartArea));

      let i, ilen;

      const drawLine = (p1, p2, style) => {
        if (!style.width || !style.color) {
          return;
        }

        ctx.save();
        ctx.lineWidth = style.width;
        ctx.strokeStyle = style.color;
        ctx.setLineDash(style.borderDash || []);
        ctx.lineDashOffset = style.borderDashOffset;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.restore();
      };

      if (grid.display) {
        for (i = 0, ilen = items.length; i < ilen; ++i) {
          const item = items[i];

          if (grid.drawOnChartArea) {
            drawLine({
              x: item.x1,
              y: item.y1
            }, {
              x: item.x2,
              y: item.y2
            }, item);
          }

          if (grid.drawTicks) {
            drawLine({
              x: item.tx1,
              y: item.ty1
            }, {
              x: item.tx2,
              y: item.ty2
            }, {
              color: item.tickColor,
              width: item.tickWidth,
              borderDash: item.tickBorderDash,
              borderDashOffset: item.tickBorderDashOffset
            });
          }
        }
      }
    }

    drawBorder() {
      const me = this;
      const {
        chart,
        ctx,
        options: {
          grid
        }
      } = me;
      const borderOpts = grid.setContext(me.getContext());
      const axisWidth = grid.drawBorder ? borderOpts.borderWidth : 0;

      if (!axisWidth) {
        return;
      }

      const lastLineWidth = grid.setContext(me.getContext(0)).lineWidth;
      const borderValue = me._borderValue;
      let x1, x2, y1, y2;

      if (me.isHorizontal()) {
        x1 = _alignPixel(chart, me.left, axisWidth) - axisWidth / 2;
        x2 = _alignPixel(chart, me.right, lastLineWidth) + lastLineWidth / 2;
        y1 = y2 = borderValue;
      } else {
        y1 = _alignPixel(chart, me.top, axisWidth) - axisWidth / 2;
        y2 = _alignPixel(chart, me.bottom, lastLineWidth) + lastLineWidth / 2;
        x1 = x2 = borderValue;
      }

      ctx.save();
      ctx.lineWidth = borderOpts.borderWidth;
      ctx.strokeStyle = borderOpts.borderColor;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
    }

    drawLabels(chartArea) {
      const me = this;
      const optionTicks = me.options.ticks;

      if (!optionTicks.display) {
        return;
      }

      const ctx = me.ctx;

      const area = me._computeLabelArea();

      if (area) {
        clipArea(ctx, area);
      }

      const items = me._labelItems || (me._labelItems = me._computeLabelItems(chartArea));

      let i, ilen;

      for (i = 0, ilen = items.length; i < ilen; ++i) {
        const item = items[i];
        const tickFont = item.font;
        const label = item.label;

        if (item.backdrop) {
          ctx.fillStyle = item.backdrop.color;
          ctx.fillRect(item.backdrop.left, item.backdrop.top, item.backdrop.width, item.backdrop.height);
        }

        let y = item.textOffset;
        renderText(ctx, label, 0, y, tickFont, item);
      }

      if (area) {
        unclipArea(ctx);
      }
    }

    drawTitle() {
      const {
        ctx,
        options: {
          position,
          title,
          reverse
        }
      } = this;

      if (!title.display) {
        return;
      }

      const font = toFont(title.font);
      const padding = toPadding(title.padding);
      const align = title.align;
      let offset = font.lineHeight / 2;

      if (position === 'bottom') {
        offset += padding.bottom;

        if (isArray(title.text)) {
          offset += font.lineHeight * (title.text.length - 1);
        }
      } else {
        offset += padding.top;
      }

      const {
        titleX,
        titleY,
        maxWidth,
        rotation
      } = titleArgs(this, offset, position, align);
      renderText(ctx, title.text, 0, 0, font, {
        color: title.color,
        maxWidth,
        rotation,
        textAlign: titleAlign(align, position, reverse),
        textBaseline: 'middle',
        translation: [titleX, titleY]
      });
    }

    draw(chartArea) {
      const me = this;

      if (!me._isVisible()) {
        return;
      }

      me.drawBackground();
      me.drawGrid(chartArea);
      me.drawBorder();
      me.drawTitle();
      me.drawLabels(chartArea);
    }

    _layers() {
      const me = this;
      const opts = me.options;
      const tz = opts.ticks && opts.ticks.z || 0;
      const gz = opts.grid && opts.grid.z || 0;

      if (!me._isVisible() || me.draw !== Scale.prototype.draw) {
        return [{
          z: tz,

          draw(chartArea) {
            me.draw(chartArea);
          }

        }];
      }

      return [{
        z: gz,

        draw(chartArea) {
          me.drawBackground();
          me.drawGrid(chartArea);
          me.drawTitle();
        }

      }, {
        z: gz + 1,

        draw() {
          me.drawBorder();
        }

      }, {
        z: tz,

        draw(chartArea) {
          me.drawLabels(chartArea);
        }

      }];
    }

    getMatchingVisibleMetas(type) {
      const me = this;
      const metas = me.chart.getSortedVisibleDatasetMetas();
      const axisID = me.axis + 'AxisID';
      const result = [];
      let i, ilen;

      for (i = 0, ilen = metas.length; i < ilen; ++i) {
        const meta = metas[i];

        if (meta[axisID] === me.id && (!type || meta.type === type)) {
          result.push(meta);
        }
      }

      return result;
    }

    _resolveTickFontOptions(index) {
      const opts = this.options.ticks.setContext(this.getContext(index));
      return toFont(opts.font);
    }

    _maxDigits() {
      const me = this;

      const fontSize = me._resolveTickFontOptions(0).lineHeight;

      return (me.isHorizontal() ? me.width : me.height) / fontSize;
    }

  }

  function _createResolver(scopes, prefixes = [''], rootScopes = scopes, fallback, getTarget = () => scopes[0]) {
    if (!defined(fallback)) {
      fallback = _resolve('_fallback', scopes);
    }

    const cache = {
      [Symbol.toStringTag]: 'Object',
      _cacheable: true,
      _scopes: scopes,
      _rootScopes: rootScopes,
      _fallback: fallback,
      _getTarget: getTarget,
      override: scope => _createResolver([scope, ...scopes], prefixes, rootScopes, fallback)
    };
    return new Proxy(cache, {
      deleteProperty(target, prop) {
        delete target[prop];
        delete target._keys;
        delete scopes[0][prop];
        return true;
      },

      get(target, prop) {
        return _cached(target, prop, () => _resolveWithPrefixes(prop, prefixes, scopes, target));
      },

      getOwnPropertyDescriptor(target, prop) {
        return Reflect.getOwnPropertyDescriptor(target._scopes[0], prop);
      },

      getPrototypeOf() {
        return Reflect.getPrototypeOf(scopes[0]);
      },

      has(target, prop) {
        return getKeysFromAllScopes(target).includes(prop);
      },

      ownKeys(target) {
        return getKeysFromAllScopes(target);
      },

      set(target, prop, value) {
        const storage = target._storage || (target._storage = getTarget());
        storage[prop] = value;
        delete target[prop];
        delete target._keys;
        return true;
      }

    });
  }

  function _attachContext(proxy, context, subProxy, descriptorDefaults) {
    const cache = {
      _cacheable: false,
      _proxy: proxy,
      _context: context,
      _subProxy: subProxy,
      _stack: new Set(),
      _descriptors: _descriptors(proxy, descriptorDefaults),
      setContext: ctx => _attachContext(proxy, ctx, subProxy, descriptorDefaults),
      override: scope => _attachContext(proxy.override(scope), context, subProxy, descriptorDefaults)
    };
    return new Proxy(cache, {
      deleteProperty(target, prop) {
        delete target[prop];
        delete proxy[prop];
        return true;
      },

      get(target, prop, receiver) {
        return _cached(target, prop, () => _resolveWithContext(target, prop, receiver));
      },

      getOwnPropertyDescriptor(target, prop) {
        return target._descriptors.allKeys ? Reflect.has(proxy, prop) ? {
          enumerable: true,
          configurable: true
        } : undefined : Reflect.getOwnPropertyDescriptor(proxy, prop);
      },

      getPrototypeOf() {
        return Reflect.getPrototypeOf(proxy);
      },

      has(target, prop) {
        return Reflect.has(proxy, prop);
      },

      ownKeys() {
        return Reflect.ownKeys(proxy);
      },

      set(target, prop, value) {
        proxy[prop] = value;
        delete target[prop];
        return true;
      }

    });
  }

  function _descriptors(proxy, defaults = {
    scriptable: true,
    indexable: true
  }) {
    const {
      _scriptable = defaults.scriptable,
      _indexable = defaults.indexable,
      _allKeys = defaults.allKeys
    } = proxy;
    return {
      allKeys: _allKeys,
      scriptable: _scriptable,
      indexable: _indexable,
      isScriptable: isFunction(_scriptable) ? _scriptable : () => _scriptable,
      isIndexable: isFunction(_indexable) ? _indexable : () => _indexable
    };
  }

  const readKey = (prefix, name) => prefix ? prefix + _capitalize(name) : name;

  const needsSubResolver = (prop, value) => isObject(value) && prop !== 'adapters';

  function _cached(target, prop, resolve) {
    let value = target[prop];

    if (defined(value)) {
      return value;
    }

    value = resolve();

    if (defined(value)) {
      target[prop] = value;
    }

    return value;
  }

  function _resolveWithContext(target, prop, receiver) {
    const {
      _proxy,
      _context,
      _subProxy,
      _descriptors: descriptors
    } = target;
    let value = _proxy[prop];

    if (isFunction(value) && descriptors.isScriptable(prop)) {
      value = _resolveScriptable(prop, value, target, receiver);
    }

    if (isArray(value) && value.length) {
      value = _resolveArray(prop, value, target, descriptors.isIndexable);
    }

    if (needsSubResolver(prop, value)) {
      value = _attachContext(value, _context, _subProxy && _subProxy[prop], descriptors);
    }

    return value;
  }

  function _resolveScriptable(prop, value, target, receiver) {
    const {
      _proxy,
      _context,
      _subProxy,
      _stack
    } = target;

    if (_stack.has(prop)) {
      throw new Error('Recursion detected: ' + Array.from(_stack).join('->') + '->' + prop);
    }

    _stack.add(prop);

    value = value(_context, _subProxy || receiver);

    _stack.delete(prop);

    if (isObject(value)) {
      value = createSubResolver(_proxy._scopes, _proxy, prop, value);
    }

    return value;
  }

  function _resolveArray(prop, value, target, isIndexable) {
    const {
      _proxy,
      _context,
      _subProxy,
      _descriptors: descriptors
    } = target;

    if (defined(_context.index) && isIndexable(prop)) {
      value = value[_context.index % value.length];
    } else if (isObject(value[0])) {
      const arr = value;

      const scopes = _proxy._scopes.filter(s => s !== arr);

      value = [];

      for (const item of arr) {
        const resolver = createSubResolver(scopes, _proxy, prop, item);
        value.push(_attachContext(resolver, _context, _subProxy && _subProxy[prop], descriptors));
      }
    }

    return value;
  }

  function resolveFallback(fallback, prop, value) {
    return isFunction(fallback) ? fallback(prop, value) : fallback;
  }

  const getScope = (key, parent) => key === true ? parent : typeof key === 'string' ? resolveObjectKey(parent, key) : undefined;

  function addScopes(set, parentScopes, key, parentFallback) {
    for (const parent of parentScopes) {
      const scope = getScope(key, parent);

      if (scope) {
        set.add(scope);
        const fallback = resolveFallback(scope._fallback, key, scope);

        if (defined(fallback) && fallback !== key && fallback !== parentFallback) {
          return fallback;
        }
      } else if (scope === false && defined(parentFallback) && key !== parentFallback) {
        return null;
      }
    }

    return false;
  }

  function createSubResolver(parentScopes, resolver, prop, value) {
    const rootScopes = resolver._rootScopes;
    const fallback = resolveFallback(resolver._fallback, prop, value);
    const allScopes = [...parentScopes, ...rootScopes];
    const set = new Set();
    set.add(value);
    let key = addScopesFromKey(set, allScopes, prop, fallback || prop);

    if (key === null) {
      return false;
    }

    if (defined(fallback) && fallback !== prop) {
      key = addScopesFromKey(set, allScopes, fallback, key);

      if (key === null) {
        return false;
      }
    }

    return _createResolver(Array.from(set), [''], rootScopes, fallback, () => subGetTarget(resolver, prop, value));
  }

  function addScopesFromKey(set, allScopes, key, fallback) {
    while (key) {
      key = addScopes(set, allScopes, key, fallback);
    }

    return key;
  }

  function subGetTarget(resolver, prop, value) {
    const parent = resolver._getTarget();

    if (!(prop in parent)) {
      parent[prop] = {};
    }

    const target = parent[prop];

    if (isArray(target) && isObject(value)) {
      return value;
    }

    return target;
  }

  function _resolveWithPrefixes(prop, prefixes, scopes, proxy) {
    let value;

    for (const prefix of prefixes) {
      value = _resolve(readKey(prefix, prop), scopes);

      if (defined(value)) {
        return needsSubResolver(prop, value) ? createSubResolver(scopes, proxy, prop, value) : value;
      }
    }
  }

  function _resolve(key, scopes) {
    for (const scope of scopes) {
      if (!scope) {
        continue;
      }

      const value = scope[key];

      if (defined(value)) {
        return value;
      }
    }
  }

  function getKeysFromAllScopes(target) {
    let keys = target._keys;

    if (!keys) {
      keys = target._keys = resolveKeysFromAllScopes(target._scopes);
    }

    return keys;
  }

  function resolveKeysFromAllScopes(scopes) {
    const set = new Set();

    for (const scope of scopes) {
      for (const key of Object.keys(scope).filter(k => !k.startsWith('_'))) {
        set.add(key);
      }
    }

    return Array.from(set);
  }

  const EPSILON = Number.EPSILON || 1e-14;

  const getPoint = (points, i) => i < points.length && !points[i].skip && points[i];

  const getValueAxis = indexAxis => indexAxis === 'x' ? 'y' : 'x';

  function splineCurve(firstPoint, middlePoint, afterPoint, t) {
    const previous = firstPoint.skip ? middlePoint : firstPoint;
    const current = middlePoint;
    const next = afterPoint.skip ? middlePoint : afterPoint;
    const d01 = distanceBetweenPoints(current, previous);
    const d12 = distanceBetweenPoints(next, current);
    let s01 = d01 / (d01 + d12);
    let s12 = d12 / (d01 + d12);
    s01 = isNaN(s01) ? 0 : s01;
    s12 = isNaN(s12) ? 0 : s12;
    const fa = t * s01;
    const fb = t * s12;
    return {
      previous: {
        x: current.x - fa * (next.x - previous.x),
        y: current.y - fa * (next.y - previous.y)
      },
      next: {
        x: current.x + fb * (next.x - previous.x),
        y: current.y + fb * (next.y - previous.y)
      }
    };
  }

  function monotoneAdjust(points, deltaK, mK) {
    const pointsLen = points.length;
    let alphaK, betaK, tauK, squaredMagnitude, pointCurrent;
    let pointAfter = getPoint(points, 0);

    for (let i = 0; i < pointsLen - 1; ++i) {
      pointCurrent = pointAfter;
      pointAfter = getPoint(points, i + 1);

      if (!pointCurrent || !pointAfter) {
        continue;
      }

      if (almostEquals(deltaK[i], 0, EPSILON)) {
        mK[i] = mK[i + 1] = 0;
        continue;
      }

      alphaK = mK[i] / deltaK[i];
      betaK = mK[i + 1] / deltaK[i];
      squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);

      if (squaredMagnitude <= 9) {
        continue;
      }

      tauK = 3 / Math.sqrt(squaredMagnitude);
      mK[i] = alphaK * tauK * deltaK[i];
      mK[i + 1] = betaK * tauK * deltaK[i];
    }
  }

  function monotoneCompute(points, mK, indexAxis = 'x') {
    const valueAxis = getValueAxis(indexAxis);
    const pointsLen = points.length;
    let delta, pointBefore, pointCurrent;
    let pointAfter = getPoint(points, 0);

    for (let i = 0; i < pointsLen; ++i) {
      pointBefore = pointCurrent;
      pointCurrent = pointAfter;
      pointAfter = getPoint(points, i + 1);

      if (!pointCurrent) {
        continue;
      }

      const iPixel = pointCurrent[indexAxis];
      const vPixel = pointCurrent[valueAxis];

      if (pointBefore) {
        delta = (iPixel - pointBefore[indexAxis]) / 3;
        pointCurrent[`cp1${indexAxis}`] = iPixel - delta;
        pointCurrent[`cp1${valueAxis}`] = vPixel - delta * mK[i];
      }

      if (pointAfter) {
        delta = (pointAfter[indexAxis] - iPixel) / 3;
        pointCurrent[`cp2${indexAxis}`] = iPixel + delta;
        pointCurrent[`cp2${valueAxis}`] = vPixel + delta * mK[i];
      }
    }
  }

  function splineCurveMonotone(points, indexAxis = 'x') {
    const valueAxis = getValueAxis(indexAxis);
    const pointsLen = points.length;
    const deltaK = Array(pointsLen).fill(0);
    const mK = Array(pointsLen);
    let i, pointBefore, pointCurrent;
    let pointAfter = getPoint(points, 0);

    for (i = 0; i < pointsLen; ++i) {
      pointBefore = pointCurrent;
      pointCurrent = pointAfter;
      pointAfter = getPoint(points, i + 1);

      if (!pointCurrent) {
        continue;
      }

      if (pointAfter) {
        const slopeDelta = pointAfter[indexAxis] - pointCurrent[indexAxis];
        deltaK[i] = slopeDelta !== 0 ? (pointAfter[valueAxis] - pointCurrent[valueAxis]) / slopeDelta : 0;
      }

      mK[i] = !pointBefore ? deltaK[i] : !pointAfter ? deltaK[i - 1] : sign(deltaK[i - 1]) !== sign(deltaK[i]) ? 0 : (deltaK[i - 1] + deltaK[i]) / 2;
    }

    monotoneAdjust(points, deltaK, mK);
    monotoneCompute(points, mK, indexAxis);
  }

  function capControlPoint(pt, min, max) {
    return Math.max(Math.min(pt, max), min);
  }

  function capBezierPoints(points, area) {
    let i, ilen, point, inArea, inAreaPrev;

    let inAreaNext = _isPointInArea(points[0], area);

    for (i = 0, ilen = points.length; i < ilen; ++i) {
      inAreaPrev = inArea;
      inArea = inAreaNext;
      inAreaNext = i < ilen - 1 && _isPointInArea(points[i + 1], area);

      if (!inArea) {
        continue;
      }

      point = points[i];

      if (inAreaPrev) {
        point.cp1x = capControlPoint(point.cp1x, area.left, area.right);
        point.cp1y = capControlPoint(point.cp1y, area.top, area.bottom);
      }

      if (inAreaNext) {
        point.cp2x = capControlPoint(point.cp2x, area.left, area.right);
        point.cp2y = capControlPoint(point.cp2y, area.top, area.bottom);
      }
    }
  }

  function _updateBezierControlPoints(points, options, area, loop, indexAxis) {
    let i, ilen, point, controlPoints;

    if (options.spanGaps) {
      points = points.filter(pt => !pt.skip);
    }

    if (options.cubicInterpolationMode === 'monotone') {
      splineCurveMonotone(points, indexAxis);
    } else {
      let prev = loop ? points[points.length - 1] : points[0];

      for (i = 0, ilen = points.length; i < ilen; ++i) {
        point = points[i];
        controlPoints = splineCurve(prev, point, points[Math.min(i + 1, ilen - (loop ? 0 : 1)) % ilen], options.tension);
        point.cp1x = controlPoints.previous.x;
        point.cp1y = controlPoints.previous.y;
        point.cp2x = controlPoints.next.x;
        point.cp2y = controlPoints.next.y;
        prev = point;
      }
    }

    if (options.capBezierPoints) {
      capBezierPoints(points, area);
    }
  }

  function _pointInLine(p1, p2, t, mode) {
    return {
      x: p1.x + t * (p2.x - p1.x),
      y: p1.y + t * (p2.y - p1.y)
    };
  }

  function _steppedInterpolation(p1, p2, t, mode) {
    return {
      x: p1.x + t * (p2.x - p1.x),
      y: mode === 'middle' ? t < 0.5 ? p1.y : p2.y : mode === 'after' ? t < 1 ? p1.y : p2.y : t > 0 ? p2.y : p1.y
    };
  }

  function _bezierInterpolation(p1, p2, t, mode) {
    const cp1 = {
      x: p1.cp2x,
      y: p1.cp2y
    };
    const cp2 = {
      x: p2.cp1x,
      y: p2.cp1y
    };

    const a = _pointInLine(p1, cp1, t);

    const b = _pointInLine(cp1, cp2, t);

    const c = _pointInLine(cp2, p2, t);

    const d = _pointInLine(a, b, t);

    const e = _pointInLine(b, c, t);

    return _pointInLine(d, e, t);
  }

  const getRightToLeftAdapter = function (rectX, width) {
    return {
      x(x) {
        return rectX + rectX + width - x;
      },

      setWidth(w) {
        width = w;
      },

      textAlign(align) {
        if (align === 'center') {
          return align;
        }

        return align === 'right' ? 'left' : 'right';
      },

      xPlus(x, value) {
        return x - value;
      },

      leftForLtr(x, itemWidth) {
        return x - itemWidth;
      }

    };
  };

  const getLeftToRightAdapter = function () {
    return {
      x(x) {
        return x;
      },

      setWidth(w) {},

      textAlign(align) {
        return align;
      },

      xPlus(x, value) {
        return x + value;
      },

      leftForLtr(x, _itemWidth) {
        return x;
      }

    };
  };

  function getRtlAdapter(rtl, rectX, width) {
    return rtl ? getRightToLeftAdapter(rectX, width) : getLeftToRightAdapter();
  }

  function overrideTextDirection(ctx, direction) {
    let style, original;

    if (direction === 'ltr' || direction === 'rtl') {
      style = ctx.canvas.style;
      original = [style.getPropertyValue('direction'), style.getPropertyPriority('direction')];
      style.setProperty('direction', direction, 'important');
      ctx.prevTextDirection = original;
    }
  }

  function restoreTextDirection(ctx, original) {
    if (original !== undefined) {
      delete ctx.prevTextDirection;
      ctx.canvas.style.setProperty('direction', original[0], original[1]);
    }
  }

  function propertyFn(property) {
    if (property === 'angle') {
      return {
        between: _angleBetween,
        compare: _angleDiff,
        normalize: _normalizeAngle
      };
    }

    return {
      between: (n, s, e) => n >= Math.min(s, e) && n <= Math.max(e, s),
      compare: (a, b) => a - b,
      normalize: x => x
    };
  }

  function normalizeSegment({
    start,
    end,
    count,
    loop,
    style
  }) {
    return {
      start: start % count,
      end: end % count,
      loop: loop && (end - start + 1) % count === 0,
      style
    };
  }

  function getSegment(segment, points, bounds) {
    const {
      property,
      start: startBound,
      end: endBound
    } = bounds;
    const {
      between,
      normalize
    } = propertyFn(property);
    const count = points.length;
    let {
      start,
      end,
      loop
    } = segment;
    let i, ilen;

    if (loop) {
      start += count;
      end += count;

      for (i = 0, ilen = count; i < ilen; ++i) {
        if (!between(normalize(points[start % count][property]), startBound, endBound)) {
          break;
        }

        start--;
        end--;
      }

      start %= count;
      end %= count;
    }

    if (end < start) {
      end += count;
    }

    return {
      start,
      end,
      loop,
      style: segment.style
    };
  }

  function _boundSegment(segment, points, bounds) {
    if (!bounds) {
      return [segment];
    }

    const {
      property,
      start: startBound,
      end: endBound
    } = bounds;
    const count = points.length;
    const {
      compare,
      between,
      normalize
    } = propertyFn(property);
    const {
      start,
      end,
      loop,
      style
    } = getSegment(segment, points, bounds);
    const result = [];
    let inside = false;
    let subStart = null;
    let value, point, prevValue;

    const startIsBefore = () => between(startBound, prevValue, value) && compare(startBound, prevValue) !== 0;

    const endIsBefore = () => compare(endBound, value) === 0 || between(endBound, prevValue, value);

    const shouldStart = () => inside || startIsBefore();

    const shouldStop = () => !inside || endIsBefore();

    for (let i = start, prev = start; i <= end; ++i) {
      point = points[i % count];

      if (point.skip) {
        continue;
      }

      value = normalize(point[property]);

      if (value === prevValue) {
        continue;
      }

      inside = between(value, startBound, endBound);

      if (subStart === null && shouldStart()) {
        subStart = compare(value, startBound) === 0 ? i : prev;
      }

      if (subStart !== null && shouldStop()) {
        result.push(normalizeSegment({
          start: subStart,
          end: i,
          loop,
          count,
          style
        }));
        subStart = null;
      }

      prev = i;
      prevValue = value;
    }

    if (subStart !== null) {
      result.push(normalizeSegment({
        start: subStart,
        end,
        loop,
        count,
        style
      }));
    }

    return result;
  }

  function _boundSegments(line, bounds) {
    const result = [];
    const segments = line.segments;

    for (let i = 0; i < segments.length; i++) {
      const sub = _boundSegment(segments[i], line.points, bounds);

      if (sub.length) {
        result.push(...sub);
      }
    }

    return result;
  }

  function findStartAndEnd(points, count, loop, spanGaps) {
    let start = 0;
    let end = count - 1;

    if (loop && !spanGaps) {
      while (start < count && !points[start].skip) {
        start++;
      }
    }

    while (start < count && points[start].skip) {
      start++;
    }

    start %= count;

    if (loop) {
      end += start;
    }

    while (end > start && points[end % count].skip) {
      end--;
    }

    end %= count;
    return {
      start,
      end
    };
  }

  function solidSegments(points, start, max, loop) {
    const count = points.length;
    const result = [];
    let last = start;
    let prev = points[start];
    let end;

    for (end = start + 1; end <= max; ++end) {
      const cur = points[end % count];

      if (cur.skip || cur.stop) {
        if (!prev.skip) {
          loop = false;
          result.push({
            start: start % count,
            end: (end - 1) % count,
            loop
          });
          start = last = cur.stop ? end : null;
        }
      } else {
        last = end;

        if (prev.skip) {
          start = end;
        }
      }

      prev = cur;
    }

    if (last !== null) {
      result.push({
        start: start % count,
        end: last % count,
        loop
      });
    }

    return result;
  }

  function _computeSegments(line, segmentOptions) {
    const points = line.points;
    const spanGaps = line.options.spanGaps;
    const count = points.length;

    if (!count) {
      return [];
    }

    const loop = !!line._loop;
    const {
      start,
      end
    } = findStartAndEnd(points, count, loop, spanGaps);

    if (spanGaps === true) {
      return splitByStyles([{
        start,
        end,
        loop
      }], points, segmentOptions);
    }

    const max = end < start ? end + count : end;
    const completeLoop = !!line._fullLoop && start === 0 && end === count - 1;
    return splitByStyles(solidSegments(points, start, max, completeLoop), points, segmentOptions);
  }

  function splitByStyles(segments, points, segmentOptions) {
    if (!segmentOptions || !segmentOptions.setContext || !points) {
      return segments;
    }

    return doSplitByStyles(segments, points, segmentOptions);
  }

  function doSplitByStyles(segments, points, segmentOptions) {
    const count = points.length;
    const result = [];
    let start = segments[0].start;
    let i = start;

    for (const segment of segments) {
      let prevStyle, style;
      let prev = points[start % count];

      for (i = start + 1; i <= segment.end; i++) {
        const pt = points[i % count];
        style = readStyle(segmentOptions.setContext({
          type: 'segment',
          p0: prev,
          p1: pt
        }));

        if (styleChanged(style, prevStyle)) {
          result.push({
            start: start,
            end: i - 1,
            loop: segment.loop,
            style: prevStyle
          });
          prevStyle = style;
          start = i - 1;
        }

        prev = pt;
        prevStyle = style;
      }

      if (start < i - 1) {
        result.push({
          start,
          end: i - 1,
          loop: segment.loop,
          style
        });
        start = i - 1;
      }
    }

    return result;
  }

  function readStyle(options) {
    return {
      backgroundColor: options.backgroundColor,
      borderCapStyle: options.borderCapStyle,
      borderDash: options.borderDash,
      borderDashOffset: options.borderDashOffset,
      borderJoinStyle: options.borderJoinStyle,
      borderWidth: options.borderWidth,
      borderColor: options.borderColor
    };
  }

  function styleChanged(style, prevStyle) {
    return prevStyle && JSON.stringify(style) !== JSON.stringify(prevStyle);
  }

  var helpers = /*#__PURE__*/Object.freeze({
    __proto__: null,
    easingEffects: effects,
    color: color,
    getHoverColor: getHoverColor,
    noop: noop,
    uid: uid,
    isNullOrUndef: isNullOrUndef,
    isArray: isArray,
    isObject: isObject,
    isFinite: isNumberFinite,
    finiteOrDefault: finiteOrDefault,
    valueOrDefault: valueOrDefault,
    toPercentage: toPercentage,
    toDimension: toDimension,
    callback: callback,
    each: each,
    _elementsEqual: _elementsEqual,
    clone: clone,
    _merger: _merger,
    merge: merge,
    mergeIf: mergeIf,
    _mergerIf: _mergerIf,
    _deprecated: _deprecated,
    resolveObjectKey: resolveObjectKey,
    _capitalize: _capitalize,
    defined: defined,
    isFunction: isFunction,
    setsEqual: setsEqual,
    toFontString: toFontString,
    _measureText: _measureText,
    _longestText: _longestText,
    _alignPixel: _alignPixel,
    clearCanvas: clearCanvas,
    drawPoint: drawPoint,
    _isPointInArea: _isPointInArea,
    clipArea: clipArea,
    unclipArea: unclipArea,
    _steppedLineTo: _steppedLineTo,
    _bezierCurveTo: _bezierCurveTo,
    renderText: renderText,
    addRoundedRectPath: addRoundedRectPath,
    _lookup: _lookup,
    _lookupByKey: _lookupByKey,
    _rlookupByKey: _rlookupByKey,
    _filterBetween: _filterBetween,
    listenArrayEvents: listenArrayEvents,
    unlistenArrayEvents: unlistenArrayEvents,
    _arrayUnique: _arrayUnique,
    _createResolver: _createResolver,
    _attachContext: _attachContext,
    _descriptors: _descriptors,
    splineCurve: splineCurve,
    splineCurveMonotone: splineCurveMonotone,
    _updateBezierControlPoints: _updateBezierControlPoints,
    _getParentNode: _getParentNode,
    getStyle: getStyle,
    getRelativePosition: getRelativePosition$1,
    getMaximumSize: getMaximumSize,
    retinaScale: retinaScale,
    supportsEventListenerOptions: supportsEventListenerOptions,
    readUsedSize: readUsedSize,
    fontString: fontString,
    requestAnimFrame: requestAnimFrame,
    throttled: throttled,
    debounce: debounce,
    _toLeftRightCenter: _toLeftRightCenter,
    _alignStartEnd: _alignStartEnd,
    _textX: _textX,
    _pointInLine: _pointInLine,
    _steppedInterpolation: _steppedInterpolation,
    _bezierInterpolation: _bezierInterpolation,
    formatNumber: formatNumber,
    toLineHeight: toLineHeight,
    _readValueToProps: _readValueToProps,
    toTRBL: toTRBL,
    toTRBLCorners: toTRBLCorners,
    toPadding: toPadding,
    toFont: toFont,
    resolve: resolve,
    _addGrace: _addGrace,
    PI: PI,
    TAU: TAU,
    PITAU: PITAU,
    INFINITY: INFINITY,
    RAD_PER_DEG: RAD_PER_DEG,
    HALF_PI: HALF_PI,
    QUARTER_PI: QUARTER_PI,
    TWO_THIRDS_PI: TWO_THIRDS_PI,
    log10: log10,
    sign: sign,
    niceNum: niceNum,
    _factorize: _factorize,
    isNumber: isNumber,
    almostEquals: almostEquals,
    almostWhole: almostWhole,
    _setMinAndMaxByKey: _setMinAndMaxByKey,
    toRadians: toRadians,
    toDegrees: toDegrees,
    _decimalPlaces: _decimalPlaces,
    getAngleFromPoint: getAngleFromPoint,
    distanceBetweenPoints: distanceBetweenPoints,
    _angleDiff: _angleDiff,
    _normalizeAngle: _normalizeAngle,
    _angleBetween: _angleBetween,
    _limitValue: _limitValue,
    _int16Range: _int16Range,
    getRtlAdapter: getRtlAdapter,
    overrideTextDirection: overrideTextDirection,
    restoreTextDirection: restoreTextDirection,
    _boundSegment: _boundSegment,
    _boundSegments: _boundSegments,
    _computeSegments: _computeSegments
  });

  class TypedRegistry {
    constructor(type, scope, override) {
      this.type = type;
      this.scope = scope;
      this.override = override;
      this.items = Object.create(null);
    }

    isForType(type) {
      return Object.prototype.isPrototypeOf.call(this.type.prototype, type.prototype);
    }

    register(item) {
      const me = this;
      const proto = Object.getPrototypeOf(item);
      let parentScope;

      if (isIChartComponent(proto)) {
        parentScope = me.register(proto);
      }

      const items = me.items;
      const id = item.id;
      const scope = me.scope + '.' + id;

      if (!id) {
        throw new Error('class does not have id: ' + item);
      }

      if (id in items) {
        return scope;
      }

      items[id] = item;
      registerDefaults(item, scope, parentScope);

      if (me.override) {
        defaults.override(item.id, item.overrides);
      }

      return scope;
    }

    get(id) {
      return this.items[id];
    }

    unregister(item) {
      const items = this.items;
      const id = item.id;
      const scope = this.scope;

      if (id in items) {
        delete items[id];
      }

      if (scope && id in defaults[scope]) {
        delete defaults[scope][id];

        if (this.override) {
          delete overrides[id];
        }
      }
    }

  }

  function registerDefaults(item, scope, parentScope) {
    const itemDefaults = merge(Object.create(null), [parentScope ? defaults.get(parentScope) : {}, defaults.get(scope), item.defaults]);
    defaults.set(scope, itemDefaults);

    if (item.defaultRoutes) {
      routeDefaults(scope, item.defaultRoutes);
    }

    if (item.descriptors) {
      defaults.describe(scope, item.descriptors);
    }
  }

  function routeDefaults(scope, routes) {
    Object.keys(routes).forEach(property => {
      const propertyParts = property.split('.');
      const sourceName = propertyParts.pop();
      const sourceScope = [scope].concat(propertyParts).join('.');
      const parts = routes[property].split('.');
      const targetName = parts.pop();
      const targetScope = parts.join('.');
      defaults.route(sourceScope, sourceName, targetScope, targetName);
    });
  }

  function isIChartComponent(proto) {
    return 'id' in proto && 'defaults' in proto;
  }

  class Registry {
    constructor() {
      this.controllers = new TypedRegistry(DatasetController, 'datasets', true);
      this.elements = new TypedRegistry(Element, 'elements');
      this.plugins = new TypedRegistry(Object, 'plugins');
      this.scales = new TypedRegistry(Scale, 'scales');
      this._typedRegistries = [this.controllers, this.scales, this.elements];
    }

    add(...args) {
      this._each('register', args);
    }

    remove(...args) {
      this._each('unregister', args);
    }

    addControllers(...args) {
      this._each('register', args, this.controllers);
    }

    addElements(...args) {
      this._each('register', args, this.elements);
    }

    addPlugins(...args) {
      this._each('register', args, this.plugins);
    }

    addScales(...args) {
      this._each('register', args, this.scales);
    }

    getController(id) {
      return this._get(id, this.controllers, 'controller');
    }

    getElement(id) {
      return this._get(id, this.elements, 'element');
    }

    getPlugin(id) {
      return this._get(id, this.plugins, 'plugin');
    }

    getScale(id) {
      return this._get(id, this.scales, 'scale');
    }

    removeControllers(...args) {
      this._each('unregister', args, this.controllers);
    }

    removeElements(...args) {
      this._each('unregister', args, this.elements);
    }

    removePlugins(...args) {
      this._each('unregister', args, this.plugins);
    }

    removeScales(...args) {
      this._each('unregister', args, this.scales);
    }

    _each(method, args, typedRegistry) {
      const me = this;
      [...args].forEach(arg => {
        const reg = typedRegistry || me._getRegistryForType(arg);

        if (typedRegistry || reg.isForType(arg) || reg === me.plugins && arg.id) {
          me._exec(method, reg, arg);
        } else {
          each(arg, item => {
            const itemReg = typedRegistry || me._getRegistryForType(item);

            me._exec(method, itemReg, item);
          });
        }
      });
    }

    _exec(method, registry, component) {
      const camelMethod = _capitalize(method);

      callback(component['before' + camelMethod], [], component);
      registry[method](component);
      callback(component['after' + camelMethod], [], component);
    }

    _getRegistryForType(type) {
      for (let i = 0; i < this._typedRegistries.length; i++) {
        const reg = this._typedRegistries[i];

        if (reg.isForType(type)) {
          return reg;
        }
      }

      return this.plugins;
    }

    _get(id, typedRegistry, type) {
      const item = typedRegistry.get(id);

      if (item === undefined) {
        throw new Error('"' + id + '" is not a registered ' + type + '.');
      }

      return item;
    }

  }

  var registry = new Registry();

  class PluginService {
    constructor() {
      this._init = [];
    }

    notify(chart, hook, args, filter) {
      const me = this;

      if (hook === 'beforeInit') {
        me._init = me._createDescriptors(chart, true);

        me._notify(me._init, chart, 'install');
      }

      const descriptors = filter ? me._descriptors(chart).filter(filter) : me._descriptors(chart);

      const result = me._notify(descriptors, chart, hook, args);

      if (hook === 'destroy') {
        me._notify(descriptors, chart, 'stop');

        me._notify(me._init, chart, 'uninstall');
      }

      return result;
    }

    _notify(descriptors, chart, hook, args) {
      args = args || {};

      for (const descriptor of descriptors) {
        const plugin = descriptor.plugin;
        const method = plugin[hook];
        const params = [chart, args, descriptor.options];

        if (callback(method, params, plugin) === false && args.cancelable) {
          return false;
        }
      }

      return true;
    }

    invalidate() {
      if (!isNullOrUndef(this._cache)) {
        this._oldCache = this._cache;
        this._cache = undefined;
      }
    }

    _descriptors(chart) {
      if (this._cache) {
        return this._cache;
      }

      const descriptors = this._cache = this._createDescriptors(chart);

      this._notifyStateChanges(chart);

      return descriptors;
    }

    _createDescriptors(chart, all) {
      const config = chart && chart.config;
      const options = valueOrDefault(config.options && config.options.plugins, {});
      const plugins = allPlugins(config);
      return options === false && !all ? [] : createDescriptors(chart, plugins, options, all);
    }

    _notifyStateChanges(chart) {
      const previousDescriptors = this._oldCache || [];
      const descriptors = this._cache;

      const diff = (a, b) => a.filter(x => !b.some(y => x.plugin.id === y.plugin.id));

      this._notify(diff(previousDescriptors, descriptors), chart, 'stop');

      this._notify(diff(descriptors, previousDescriptors), chart, 'start');
    }

  }

  function allPlugins(config) {
    const plugins = [];
    const keys = Object.keys(registry.plugins.items);

    for (let i = 0; i < keys.length; i++) {
      plugins.push(registry.getPlugin(keys[i]));
    }

    const local = config.plugins || [];

    for (let i = 0; i < local.length; i++) {
      const plugin = local[i];

      if (plugins.indexOf(plugin) === -1) {
        plugins.push(plugin);
      }
    }

    return plugins;
  }

  function getOpts(options, all) {
    if (!all && options === false) {
      return null;
    }

    if (options === true) {
      return {};
    }

    return options;
  }

  function createDescriptors(chart, plugins, options, all) {
    const result = [];
    const context = chart.getContext();

    for (let i = 0; i < plugins.length; i++) {
      const plugin = plugins[i];
      const id = plugin.id;
      const opts = getOpts(options[id], all);

      if (opts === null) {
        continue;
      }

      result.push({
        plugin,
        options: pluginOpts(chart.config, plugin, opts, context)
      });
    }

    return result;
  }

  function pluginOpts(config, plugin, opts, context) {
    const keys = config.pluginScopeKeys(plugin);
    const scopes = config.getOptionScopes(opts, keys);
    return config.createResolver(scopes, context, [''], {
      scriptable: false,
      indexable: false,
      allKeys: true
    });
  }

  function getIndexAxis(type, options) {
    const datasetDefaults = defaults.datasets[type] || {};
    const datasetOptions = (options.datasets || {})[type] || {};
    return datasetOptions.indexAxis || options.indexAxis || datasetDefaults.indexAxis || 'x';
  }

  function getAxisFromDefaultScaleID(id, indexAxis) {
    let axis = id;

    if (id === '_index_') {
      axis = indexAxis;
    } else if (id === '_value_') {
      axis = indexAxis === 'x' ? 'y' : 'x';
    }

    return axis;
  }

  function getDefaultScaleIDFromAxis(axis, indexAxis) {
    return axis === indexAxis ? '_index_' : '_value_';
  }

  function axisFromPosition(position) {
    if (position === 'top' || position === 'bottom') {
      return 'x';
    }

    if (position === 'left' || position === 'right') {
      return 'y';
    }
  }

  function determineAxis(id, scaleOptions) {
    if (id === 'x' || id === 'y') {
      return id;
    }

    return scaleOptions.axis || axisFromPosition(scaleOptions.position) || id.charAt(0).toLowerCase();
  }

  function mergeScaleConfig(config, options) {
    const chartDefaults = overrides[config.type] || {
      scales: {}
    };
    const configScales = options.scales || {};
    const chartIndexAxis = getIndexAxis(config.type, options);
    const firstIDs = Object.create(null);
    const scales = Object.create(null);
    Object.keys(configScales).forEach(id => {
      const scaleConf = configScales[id];
      const axis = determineAxis(id, scaleConf);
      const defaultId = getDefaultScaleIDFromAxis(axis, chartIndexAxis);
      const defaultScaleOptions = chartDefaults.scales || {};
      firstIDs[axis] = firstIDs[axis] || id;
      scales[id] = mergeIf(Object.create(null), [{
        axis
      }, scaleConf, defaultScaleOptions[axis], defaultScaleOptions[defaultId]]);
    });
    config.data.datasets.forEach(dataset => {
      const type = dataset.type || config.type;
      const indexAxis = dataset.indexAxis || getIndexAxis(type, options);
      const datasetDefaults = overrides[type] || {};
      const defaultScaleOptions = datasetDefaults.scales || {};
      Object.keys(defaultScaleOptions).forEach(defaultID => {
        const axis = getAxisFromDefaultScaleID(defaultID, indexAxis);
        const id = dataset[axis + 'AxisID'] || firstIDs[axis] || axis;
        scales[id] = scales[id] || Object.create(null);
        mergeIf(scales[id], [{
          axis
        }, configScales[id], defaultScaleOptions[defaultID]]);
      });
    });
    Object.keys(scales).forEach(key => {
      const scale = scales[key];
      mergeIf(scale, [defaults.scales[scale.type], defaults.scale]);
    });
    return scales;
  }

  function initOptions(config) {
    const options = config.options || (config.options = {});
    options.plugins = valueOrDefault(options.plugins, {});
    options.scales = mergeScaleConfig(config, options);
  }

  function initData(data) {
    data = data || {};
    data.datasets = data.datasets || [];
    data.labels = data.labels || [];
    return data;
  }

  function initConfig(config) {
    config = config || {};
    config.data = initData(config.data);
    initOptions(config);
    return config;
  }

  const keyCache = new Map();
  const keysCached = new Set();

  function cachedKeys(cacheKey, generate) {
    let keys = keyCache.get(cacheKey);

    if (!keys) {
      keys = generate();
      keyCache.set(cacheKey, keys);
      keysCached.add(keys);
    }

    return keys;
  }

  const addIfFound = (set, obj, key) => {
    const opts = resolveObjectKey(obj, key);

    if (opts !== undefined) {
      set.add(opts);
    }
  };

  class Config {
    constructor(config) {
      this._config = initConfig(config);
      this._scopeCache = new Map();
      this._resolverCache = new Map();
    }

    get type() {
      return this._config.type;
    }

    set type(type) {
      this._config.type = type;
    }

    get data() {
      return this._config.data;
    }

    set data(data) {
      this._config.data = initData(data);
    }

    get options() {
      return this._config.options;
    }

    set options(options) {
      this._config.options = options;
    }

    get plugins() {
      return this._config.plugins;
    }

    update() {
      const config = this._config;
      this.clearCache();
      initOptions(config);
    }

    clearCache() {
      this._scopeCache.clear();

      this._resolverCache.clear();
    }

    datasetScopeKeys(datasetType) {
      return cachedKeys(datasetType, () => [[`datasets.${datasetType}`, '']]);
    }

    datasetAnimationScopeKeys(datasetType, transition) {
      return cachedKeys(`${datasetType}.transition.${transition}`, () => [[`datasets.${datasetType}.transitions.${transition}`, `transitions.${transition}`], [`datasets.${datasetType}`, '']]);
    }

    datasetElementScopeKeys(datasetType, elementType) {
      return cachedKeys(`${datasetType}-${elementType}`, () => [[`datasets.${datasetType}.elements.${elementType}`, `datasets.${datasetType}`, `elements.${elementType}`, '']]);
    }

    pluginScopeKeys(plugin) {
      const id = plugin.id;
      const type = this.type;
      return cachedKeys(`${type}-plugin-${id}`, () => [[`plugins.${id}`, ...(plugin.additionalOptionScopes || [])]]);
    }

    _cachedScopes(mainScope, resetCache) {
      const _scopeCache = this._scopeCache;

      let cache = _scopeCache.get(mainScope);

      if (!cache || resetCache) {
        cache = new Map();

        _scopeCache.set(mainScope, cache);
      }

      return cache;
    }

    getOptionScopes(mainScope, keyLists, resetCache) {
      const {
        options,
        type
      } = this;

      const cache = this._cachedScopes(mainScope, resetCache);

      const cached = cache.get(keyLists);

      if (cached) {
        return cached;
      }

      const scopes = new Set();
      keyLists.forEach(keys => {
        if (mainScope) {
          scopes.add(mainScope);
          keys.forEach(key => addIfFound(scopes, mainScope, key));
        }

        keys.forEach(key => addIfFound(scopes, options, key));
        keys.forEach(key => addIfFound(scopes, overrides[type] || {}, key));
        keys.forEach(key => addIfFound(scopes, defaults, key));
        keys.forEach(key => addIfFound(scopes, descriptors, key));
      });
      const array = Array.from(scopes);

      if (keysCached.has(keyLists)) {
        cache.set(keyLists, array);
      }

      return array;
    }

    chartOptionScopes() {
      const {
        options,
        type
      } = this;
      return [options, overrides[type] || {}, defaults.datasets[type] || {}, {
        type
      }, defaults, descriptors];
    }

    resolveNamedOptions(scopes, names, context, prefixes = ['']) {
      const result = {
        $shared: true
      };
      const {
        resolver,
        subPrefixes
      } = getResolver(this._resolverCache, scopes, prefixes);
      let options = resolver;

      if (needContext(resolver, names)) {
        result.$shared = false;
        context = isFunction(context) ? context() : context;
        const subResolver = this.createResolver(scopes, context, subPrefixes);
        options = _attachContext(resolver, context, subResolver);
      }

      for (const prop of names) {
        result[prop] = options[prop];
      }

      return result;
    }

    createResolver(scopes, context, prefixes = [''], descriptorDefaults) {
      const {
        resolver
      } = getResolver(this._resolverCache, scopes, prefixes);
      return isObject(context) ? _attachContext(resolver, context, undefined, descriptorDefaults) : resolver;
    }

  }

  function getResolver(resolverCache, scopes, prefixes) {
    let cache = resolverCache.get(scopes);

    if (!cache) {
      cache = new Map();
      resolverCache.set(scopes, cache);
    }

    const cacheKey = prefixes.join();
    let cached = cache.get(cacheKey);

    if (!cached) {
      const resolver = _createResolver(scopes, prefixes);

      cached = {
        resolver,
        subPrefixes: prefixes.filter(p => !p.toLowerCase().includes('hover'))
      };
      cache.set(cacheKey, cached);
    }

    return cached;
  }

  function needContext(proxy, names) {
    const {
      isScriptable,
      isIndexable
    } = _descriptors(proxy);

    for (const prop of names) {
      if (isScriptable(prop) && isFunction(proxy[prop]) || isIndexable(prop) && isArray(proxy[prop])) {
        return true;
      }
    }

    return false;
  }

  var version = "3.4.1";
  const KNOWN_POSITIONS = ['top', 'bottom', 'left', 'right', 'chartArea'];

  function positionIsHorizontal(position, axis) {
    return position === 'top' || position === 'bottom' || KNOWN_POSITIONS.indexOf(position) === -1 && axis === 'x';
  }

  function compare2Level(l1, l2) {
    return function (a, b) {
      return a[l1] === b[l1] ? a[l2] - b[l2] : a[l1] - b[l1];
    };
  }

  function onAnimationsComplete(context) {
    const chart = context.chart;
    const animationOptions = chart.options.animation;
    chart.notifyPlugins('afterRender');
    callback(animationOptions && animationOptions.onComplete, [context], chart);
  }

  function onAnimationProgress(context) {
    const chart = context.chart;
    const animationOptions = chart.options.animation;
    callback(animationOptions && animationOptions.onProgress, [context], chart);
  }

  function isDomSupported() {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  function getCanvas(item) {
    if (isDomSupported() && typeof item === 'string') {
      item = document.getElementById(item);
    } else if (item && item.length) {
      item = item[0];
    }

    if (item && item.canvas) {
      item = item.canvas;
    }

    return item;
  }

  const instances = {};

  const getChart = key => {
    const canvas = getCanvas(key);
    return Object.values(instances).filter(c => c.canvas === canvas).pop();
  };

  class Chart {
    constructor(item, config) {
      const me = this;
      this.config = config = new Config(config);
      const initialCanvas = getCanvas(item);
      const existingChart = getChart(initialCanvas);

      if (existingChart) {
        throw new Error('Canvas is already in use. Chart with ID \'' + existingChart.id + '\'' + ' must be destroyed before the canvas can be reused.');
      }

      const options = config.createResolver(config.chartOptionScopes(), me.getContext());
      this.platform = me._initializePlatform(initialCanvas, config);
      const context = me.platform.acquireContext(initialCanvas, options.aspectRatio);
      const canvas = context && context.canvas;
      const height = canvas && canvas.height;
      const width = canvas && canvas.width;
      this.id = uid();
      this.ctx = context;
      this.canvas = canvas;
      this.width = width;
      this.height = height;
      this._options = options;
      this._aspectRatio = this.aspectRatio;
      this._layers = [];
      this._metasets = [];
      this._stacks = undefined;
      this.boxes = [];
      this.currentDevicePixelRatio = undefined;
      this.chartArea = undefined;
      this._active = [];
      this._lastEvent = undefined;
      this._listeners = {};
      this._responsiveListeners = undefined;
      this._sortedMetasets = [];
      this.scales = {};
      this.scale = undefined;
      this._plugins = new PluginService();
      this.$proxies = {};
      this._hiddenIndices = {};
      this.attached = false;
      this._animationsDisabled = undefined;
      this.$context = undefined;
      this._doResize = debounce(() => this.update('resize'), options.resizeDelay || 0);
      instances[me.id] = me;

      if (!context || !canvas) {
        console.error("Failed to create chart: can't acquire context from the given item");
        return;
      }

      animator.listen(me, 'complete', onAnimationsComplete);
      animator.listen(me, 'progress', onAnimationProgress);

      me._initialize();

      if (me.attached) {
        me.update();
      }
    }

    get aspectRatio() {
      const {
        options: {
          aspectRatio,
          maintainAspectRatio
        },
        width,
        height,
        _aspectRatio
      } = this;

      if (!isNullOrUndef(aspectRatio)) {
        return aspectRatio;
      }

      if (maintainAspectRatio && _aspectRatio) {
        return _aspectRatio;
      }

      return height ? width / height : null;
    }

    get data() {
      return this.config.data;
    }

    set data(data) {
      this.config.data = data;
    }

    get options() {
      return this._options;
    }

    set options(options) {
      this.config.options = options;
    }

    _initialize() {
      const me = this;
      me.notifyPlugins('beforeInit');

      if (me.options.responsive) {
        me.resize();
      } else {
        retinaScale(me, me.options.devicePixelRatio);
      }

      me.bindEvents();
      me.notifyPlugins('afterInit');
      return me;
    }

    _initializePlatform(canvas, config) {
      if (config.platform) {
        return new config.platform();
      } else if (!isDomSupported() || typeof OffscreenCanvas !== 'undefined' && canvas instanceof OffscreenCanvas) {
        return new BasicPlatform();
      }

      return new DomPlatform();
    }

    clear() {
      clearCanvas(this.canvas, this.ctx);
      return this;
    }

    stop() {
      animator.stop(this);
      return this;
    }

    resize(width, height) {
      if (!animator.running(this)) {
        this._resize(width, height);
      } else {
        this._resizeBeforeDraw = {
          width,
          height
        };
      }
    }

    _resize(width, height) {
      const me = this;
      const options = me.options;
      const canvas = me.canvas;
      const aspectRatio = options.maintainAspectRatio && me.aspectRatio;
      const newSize = me.platform.getMaximumSize(canvas, width, height, aspectRatio);
      const newRatio = options.devicePixelRatio || me.platform.getDevicePixelRatio();
      me.width = newSize.width;
      me.height = newSize.height;
      me._aspectRatio = me.aspectRatio;

      if (!retinaScale(me, newRatio, true)) {
        return;
      }

      me.notifyPlugins('resize', {
        size: newSize
      });
      callback(options.onResize, [me, newSize], me);

      if (me.attached) {
        if (me._doResize()) {
          me.render();
        }
      }
    }

    ensureScalesHaveIDs() {
      const options = this.options;
      const scalesOptions = options.scales || {};
      each(scalesOptions, (axisOptions, axisID) => {
        axisOptions.id = axisID;
      });
    }

    buildOrUpdateScales() {
      const me = this;
      const options = me.options;
      const scaleOpts = options.scales;
      const scales = me.scales;
      const updated = Object.keys(scales).reduce((obj, id) => {
        obj[id] = false;
        return obj;
      }, {});
      let items = [];

      if (scaleOpts) {
        items = items.concat(Object.keys(scaleOpts).map(id => {
          const scaleOptions = scaleOpts[id];
          const axis = determineAxis(id, scaleOptions);
          const isRadial = axis === 'r';
          const isHorizontal = axis === 'x';
          return {
            options: scaleOptions,
            dposition: isRadial ? 'chartArea' : isHorizontal ? 'bottom' : 'left',
            dtype: isRadial ? 'radialLinear' : isHorizontal ? 'category' : 'linear'
          };
        }));
      }

      each(items, item => {
        const scaleOptions = item.options;
        const id = scaleOptions.id;
        const axis = determineAxis(id, scaleOptions);
        const scaleType = valueOrDefault(scaleOptions.type, item.dtype);

        if (scaleOptions.position === undefined || positionIsHorizontal(scaleOptions.position, axis) !== positionIsHorizontal(item.dposition)) {
          scaleOptions.position = item.dposition;
        }

        updated[id] = true;
        let scale = null;

        if (id in scales && scales[id].type === scaleType) {
          scale = scales[id];
        } else {
          const scaleClass = registry.getScale(scaleType);
          scale = new scaleClass({
            id,
            type: scaleType,
            ctx: me.ctx,
            chart: me
          });
          scales[scale.id] = scale;
        }

        scale.init(scaleOptions, options);
      });
      each(updated, (hasUpdated, id) => {
        if (!hasUpdated) {
          delete scales[id];
        }
      });
      each(scales, scale => {
        layouts.configure(me, scale, scale.options);
        layouts.addBox(me, scale);
      });
    }

    _updateMetasets() {
      const me = this;
      const metasets = me._metasets;
      const numData = me.data.datasets.length;
      const numMeta = metasets.length;
      metasets.sort((a, b) => a.index - b.index);

      if (numMeta > numData) {
        for (let i = numData; i < numMeta; ++i) {
          me._destroyDatasetMeta(i);
        }

        metasets.splice(numData, numMeta - numData);
      }

      me._sortedMetasets = metasets.slice(0).sort(compare2Level('order', 'index'));
    }

    _removeUnreferencedMetasets() {
      const me = this;
      const {
        _metasets: metasets,
        data: {
          datasets
        }
      } = me;

      if (metasets.length > datasets.length) {
        delete me._stacks;
      }

      metasets.forEach((meta, index) => {
        if (datasets.filter(x => x === meta._dataset).length === 0) {
          me._destroyDatasetMeta(index);
        }
      });
    }

    buildOrUpdateControllers() {
      const me = this;
      const newControllers = [];
      const datasets = me.data.datasets;
      let i, ilen;

      me._removeUnreferencedMetasets();

      for (i = 0, ilen = datasets.length; i < ilen; i++) {
        const dataset = datasets[i];
        let meta = me.getDatasetMeta(i);
        const type = dataset.type || me.config.type;

        if (meta.type && meta.type !== type) {
          me._destroyDatasetMeta(i);

          meta = me.getDatasetMeta(i);
        }

        meta.type = type;
        meta.indexAxis = dataset.indexAxis || getIndexAxis(type, me.options);
        meta.order = dataset.order || 0;
        meta.index = i;
        meta.label = '' + dataset.label;
        meta.visible = me.isDatasetVisible(i);

        if (meta.controller) {
          meta.controller.updateIndex(i);
          meta.controller.linkScales();
        } else {
          const ControllerClass = registry.getController(type);
          const {
            datasetElementType,
            dataElementType
          } = defaults.datasets[type];
          Object.assign(ControllerClass.prototype, {
            dataElementType: registry.getElement(dataElementType),
            datasetElementType: datasetElementType && registry.getElement(datasetElementType)
          });
          meta.controller = new ControllerClass(me, i);
          newControllers.push(meta.controller);
        }
      }

      me._updateMetasets();

      return newControllers;
    }

    _resetElements() {
      const me = this;
      each(me.data.datasets, (dataset, datasetIndex) => {
        me.getDatasetMeta(datasetIndex).controller.reset();
      }, me);
    }

    reset() {
      this._resetElements();

      this.notifyPlugins('reset');
    }

    update(mode) {
      const me = this;
      const config = me.config;
      config.update();
      me._options = config.createResolver(config.chartOptionScopes(), me.getContext());
      each(me.scales, scale => {
        layouts.removeBox(me, scale);
      });
      const animsDisabled = me._animationsDisabled = !me.options.animation;
      me.ensureScalesHaveIDs();
      me.buildOrUpdateScales();
      const existingEvents = new Set(Object.keys(me._listeners));
      const newEvents = new Set(me.options.events);

      if (!setsEqual(existingEvents, newEvents) || !!this._responsiveListeners !== me.options.responsive) {
        me.unbindEvents();
        me.bindEvents();
      }

      me._plugins.invalidate();

      if (me.notifyPlugins('beforeUpdate', {
        mode,
        cancelable: true
      }) === false) {
        return;
      }

      const newControllers = me.buildOrUpdateControllers();
      me.notifyPlugins('beforeElementsUpdate');
      let minPadding = 0;

      for (let i = 0, ilen = me.data.datasets.length; i < ilen; i++) {
        const {
          controller
        } = me.getDatasetMeta(i);
        const reset = !animsDisabled && newControllers.indexOf(controller) === -1;
        controller.buildOrUpdateElements(reset);
        minPadding = Math.max(+controller.getMaxOverflow(), minPadding);
      }

      me._minPadding = minPadding;

      me._updateLayout(minPadding);

      if (!animsDisabled) {
        each(newControllers, controller => {
          controller.reset();
        });
      }

      me._updateDatasets(mode);

      me.notifyPlugins('afterUpdate', {
        mode
      });

      me._layers.sort(compare2Level('z', '_idx'));

      if (me._lastEvent) {
        me._eventHandler(me._lastEvent, true);
      }

      me.render();
    }

    _updateLayout(minPadding) {
      const me = this;

      if (me.notifyPlugins('beforeLayout', {
        cancelable: true
      }) === false) {
        return;
      }

      layouts.update(me, me.width, me.height, minPadding);
      const area = me.chartArea;
      const noArea = area.width <= 0 || area.height <= 0;
      me._layers = [];
      each(me.boxes, box => {
        if (noArea && box.position === 'chartArea') {
          return;
        }

        if (box.configure) {
          box.configure();
        }

        me._layers.push(...box._layers());
      }, me);

      me._layers.forEach((item, index) => {
        item._idx = index;
      });

      me.notifyPlugins('afterLayout');
    }

    _updateDatasets(mode) {
      const me = this;
      const isFunction = typeof mode === 'function';

      if (me.notifyPlugins('beforeDatasetsUpdate', {
        mode,
        cancelable: true
      }) === false) {
        return;
      }

      for (let i = 0, ilen = me.data.datasets.length; i < ilen; ++i) {
        me._updateDataset(i, isFunction ? mode({
          datasetIndex: i
        }) : mode);
      }

      me.notifyPlugins('afterDatasetsUpdate', {
        mode
      });
    }

    _updateDataset(index, mode) {
      const me = this;
      const meta = me.getDatasetMeta(index);
      const args = {
        meta,
        index,
        mode,
        cancelable: true
      };

      if (me.notifyPlugins('beforeDatasetUpdate', args) === false) {
        return;
      }

      meta.controller._update(mode);

      args.cancelable = false;
      me.notifyPlugins('afterDatasetUpdate', args);
    }

    render() {
      const me = this;

      if (me.notifyPlugins('beforeRender', {
        cancelable: true
      }) === false) {
        return;
      }

      if (animator.has(me)) {
        if (me.attached && !animator.running(me)) {
          animator.start(me);
        }
      } else {
        me.draw();
        onAnimationsComplete({
          chart: me
        });
      }
    }

    draw() {
      const me = this;
      let i;

      if (me._resizeBeforeDraw) {
        const {
          width,
          height
        } = me._resizeBeforeDraw;

        me._resize(width, height);

        me._resizeBeforeDraw = null;
      }

      me.clear();

      if (me.width <= 0 || me.height <= 0) {
        return;
      }

      if (me.notifyPlugins('beforeDraw', {
        cancelable: true
      }) === false) {
        return;
      }

      const layers = me._layers;

      for (i = 0; i < layers.length && layers[i].z <= 0; ++i) {
        layers[i].draw(me.chartArea);
      }

      me._drawDatasets();

      for (; i < layers.length; ++i) {
        layers[i].draw(me.chartArea);
      }

      me.notifyPlugins('afterDraw');
    }

    _getSortedDatasetMetas(filterVisible) {
      const me = this;
      const metasets = me._sortedMetasets;
      const result = [];
      let i, ilen;

      for (i = 0, ilen = metasets.length; i < ilen; ++i) {
        const meta = metasets[i];

        if (!filterVisible || meta.visible) {
          result.push(meta);
        }
      }

      return result;
    }

    getSortedVisibleDatasetMetas() {
      return this._getSortedDatasetMetas(true);
    }

    _drawDatasets() {
      const me = this;

      if (me.notifyPlugins('beforeDatasetsDraw', {
        cancelable: true
      }) === false) {
        return;
      }

      const metasets = me.getSortedVisibleDatasetMetas();

      for (let i = metasets.length - 1; i >= 0; --i) {
        me._drawDataset(metasets[i]);
      }

      me.notifyPlugins('afterDatasetsDraw');
    }

    _drawDataset(meta) {
      const me = this;
      const ctx = me.ctx;
      const clip = meta._clip;
      const useClip = !clip.disabled;
      const area = me.chartArea;
      const args = {
        meta,
        index: meta.index,
        cancelable: true
      };

      if (me.notifyPlugins('beforeDatasetDraw', args) === false) {
        return;
      }

      if (useClip) {
        clipArea(ctx, {
          left: clip.left === false ? 0 : area.left - clip.left,
          right: clip.right === false ? me.width : area.right + clip.right,
          top: clip.top === false ? 0 : area.top - clip.top,
          bottom: clip.bottom === false ? me.height : area.bottom + clip.bottom
        });
      }

      meta.controller.draw();

      if (useClip) {
        unclipArea(ctx);
      }

      args.cancelable = false;
      me.notifyPlugins('afterDatasetDraw', args);
    }

    getElementsAtEventForMode(e, mode, options, useFinalPosition) {
      const method = Interaction.modes[mode];

      if (typeof method === 'function') {
        return method(this, e, options, useFinalPosition);
      }

      return [];
    }

    getDatasetMeta(datasetIndex) {
      const me = this;
      const dataset = me.data.datasets[datasetIndex];
      const metasets = me._metasets;
      let meta = metasets.filter(x => x && x._dataset === dataset).pop();

      if (!meta) {
        meta = {
          type: null,
          data: [],
          dataset: null,
          controller: null,
          hidden: null,
          xAxisID: null,
          yAxisID: null,
          order: dataset && dataset.order || 0,
          index: datasetIndex,
          _dataset: dataset,
          _parsed: [],
          _sorted: false
        };
        metasets.push(meta);
      }

      return meta;
    }

    getContext() {
      return this.$context || (this.$context = {
        chart: this,
        type: 'chart'
      });
    }

    getVisibleDatasetCount() {
      return this.getSortedVisibleDatasetMetas().length;
    }

    isDatasetVisible(datasetIndex) {
      const dataset = this.data.datasets[datasetIndex];

      if (!dataset) {
        return false;
      }

      const meta = this.getDatasetMeta(datasetIndex);
      return typeof meta.hidden === 'boolean' ? !meta.hidden : !dataset.hidden;
    }

    setDatasetVisibility(datasetIndex, visible) {
      const meta = this.getDatasetMeta(datasetIndex);
      meta.hidden = !visible;
    }

    toggleDataVisibility(index) {
      this._hiddenIndices[index] = !this._hiddenIndices[index];
    }

    getDataVisibility(index) {
      return !this._hiddenIndices[index];
    }

    _updateDatasetVisibility(datasetIndex, visible) {
      const me = this;
      const mode = visible ? 'show' : 'hide';
      const meta = me.getDatasetMeta(datasetIndex);

      const anims = meta.controller._resolveAnimations(undefined, mode);

      me.setDatasetVisibility(datasetIndex, visible);
      anims.update(meta, {
        visible
      });
      me.update(ctx => ctx.datasetIndex === datasetIndex ? mode : undefined);
    }

    hide(datasetIndex) {
      this._updateDatasetVisibility(datasetIndex, false);
    }

    show(datasetIndex) {
      this._updateDatasetVisibility(datasetIndex, true);
    }

    _destroyDatasetMeta(datasetIndex) {
      const me = this;
      const meta = me._metasets && me._metasets[datasetIndex];

      if (meta && meta.controller) {
        meta.controller._destroy();

        delete me._metasets[datasetIndex];
      }
    }

    destroy() {
      const me = this;
      const {
        canvas,
        ctx
      } = me;
      let i, ilen;
      me.stop();
      animator.remove(me);

      for (i = 0, ilen = me.data.datasets.length; i < ilen; ++i) {
        me._destroyDatasetMeta(i);
      }

      me.config.clearCache();

      if (canvas) {
        me.unbindEvents();
        clearCanvas(canvas, ctx);
        me.platform.releaseContext(ctx);
        me.canvas = null;
        me.ctx = null;
      }

      me.notifyPlugins('destroy');
      delete instances[me.id];
    }

    toBase64Image(...args) {
      return this.canvas.toDataURL(...args);
    }

    bindEvents() {
      this.bindUserEvents();

      if (this.options.responsive) {
        this.bindResponsiveEvents();
      } else {
        this.attached = true;
      }
    }

    bindUserEvents() {
      const me = this;
      const listeners = me._listeners;
      const platform = me.platform;

      const _add = (type, listener) => {
        platform.addEventListener(me, type, listener);
        listeners[type] = listener;
      };

      const listener = function (e, x, y) {
        e.offsetX = x;
        e.offsetY = y;

        me._eventHandler(e);
      };

      each(me.options.events, type => _add(type, listener));
    }

    bindResponsiveEvents() {
      const me = this;

      if (!me._responsiveListeners) {
        me._responsiveListeners = {};
      }

      const listeners = me._responsiveListeners;
      const platform = me.platform;

      const _add = (type, listener) => {
        platform.addEventListener(me, type, listener);
        listeners[type] = listener;
      };

      const _remove = (type, listener) => {
        if (listeners[type]) {
          platform.removeEventListener(me, type, listener);
          delete listeners[type];
        }
      };

      const listener = (width, height) => {
        if (me.canvas) {
          me.resize(width, height);
        }
      };

      let detached;

      const attached = () => {
        _remove('attach', attached);

        me.attached = true;
        me.resize();

        _add('resize', listener);

        _add('detach', detached);
      };

      detached = () => {
        me.attached = false;

        _remove('resize', listener);

        _add('attach', attached);
      };

      if (platform.isAttached(me.canvas)) {
        attached();
      } else {
        detached();
      }
    }

    unbindEvents() {
      const me = this;
      each(me._listeners, (listener, type) => {
        me.platform.removeEventListener(me, type, listener);
      });
      me._listeners = {};
      each(me._responsiveListeners, (listener, type) => {
        me.platform.removeEventListener(me, type, listener);
      });
      me._responsiveListeners = undefined;
    }

    updateHoverStyle(items, mode, enabled) {
      const prefix = enabled ? 'set' : 'remove';
      let meta, item, i, ilen;

      if (mode === 'dataset') {
        meta = this.getDatasetMeta(items[0].datasetIndex);
        meta.controller['_' + prefix + 'DatasetHoverStyle']();
      }

      for (i = 0, ilen = items.length; i < ilen; ++i) {
        item = items[i];
        const controller = item && this.getDatasetMeta(item.datasetIndex).controller;

        if (controller) {
          controller[prefix + 'HoverStyle'](item.element, item.datasetIndex, item.index);
        }
      }
    }

    getActiveElements() {
      return this._active || [];
    }

    setActiveElements(activeElements) {
      const me = this;
      const lastActive = me._active || [];
      const active = activeElements.map(({
        datasetIndex,
        index
      }) => {
        const meta = me.getDatasetMeta(datasetIndex);

        if (!meta) {
          throw new Error('No dataset found at index ' + datasetIndex);
        }

        return {
          datasetIndex,
          element: meta.data[index],
          index
        };
      });
      const changed = !_elementsEqual(active, lastActive);

      if (changed) {
        me._active = active;

        me._updateHoverStyles(active, lastActive);
      }
    }

    notifyPlugins(hook, args, filter) {
      return this._plugins.notify(this, hook, args, filter);
    }

    _updateHoverStyles(active, lastActive, replay) {
      const me = this;
      const hoverOptions = me.options.hover;

      const diff = (a, b) => a.filter(x => !b.some(y => x.datasetIndex === y.datasetIndex && x.index === y.index));

      const deactivated = diff(lastActive, active);
      const activated = replay ? active : diff(active, lastActive);

      if (deactivated.length) {
        me.updateHoverStyle(deactivated, hoverOptions.mode, false);
      }

      if (activated.length && hoverOptions.mode) {
        me.updateHoverStyle(activated, hoverOptions.mode, true);
      }
    }

    _eventHandler(e, replay) {
      const me = this;
      const args = {
        event: e,
        replay,
        cancelable: true
      };

      const eventFilter = plugin => (plugin.options.events || this.options.events).includes(e.type);

      if (me.notifyPlugins('beforeEvent', args, eventFilter) === false) {
        return;
      }

      const changed = me._handleEvent(e, replay);

      args.cancelable = false;
      me.notifyPlugins('afterEvent', args, eventFilter);

      if (changed || args.changed) {
        me.render();
      }

      return me;
    }

    _handleEvent(e, replay) {
      const me = this;
      const {
        _active: lastActive = [],
        options
      } = me;
      const hoverOptions = options.hover;
      const useFinalPosition = replay;
      let active = [];
      let changed = false;
      let lastEvent = null;

      if (e.type !== 'mouseout') {
        active = me.getElementsAtEventForMode(e, hoverOptions.mode, hoverOptions, useFinalPosition);
        lastEvent = e.type === 'click' ? me._lastEvent : e;
      }

      me._lastEvent = null;

      if (_isPointInArea(e, me.chartArea, me._minPadding)) {
        callback(options.onHover, [e, active, me], me);

        if (e.type === 'mouseup' || e.type === 'click' || e.type === 'contextmenu') {
          callback(options.onClick, [e, active, me], me);
        }
      }

      changed = !_elementsEqual(active, lastActive);

      if (changed || replay) {
        me._active = active;

        me._updateHoverStyles(active, lastActive, replay);
      }

      me._lastEvent = lastEvent;
      return changed;
    }

  }

  const invalidatePlugins = () => each(Chart.instances, chart => chart._plugins.invalidate());

  const enumerable = true;
  Object.defineProperties(Chart, {
    defaults: {
      enumerable,
      value: defaults
    },
    instances: {
      enumerable,
      value: instances
    },
    overrides: {
      enumerable,
      value: overrides
    },
    registry: {
      enumerable,
      value: registry
    },
    version: {
      enumerable,
      value: version
    },
    getChart: {
      enumerable,
      value: getChart
    },
    register: {
      enumerable,
      value: (...items) => {
        registry.add(...items);
        invalidatePlugins();
      }
    },
    unregister: {
      enumerable,
      value: (...items) => {
        registry.remove(...items);
        invalidatePlugins();
      }
    }
  });

  function abstract() {
    throw new Error('This method is not implemented: Check that a complete date adapter is provided.');
  }

  class DateAdapter {
    constructor(options) {
      this.options = options || {};
    }

    formats() {
      return abstract();
    }

    parse(value, format) {
      return abstract();
    }

    format(timestamp, format) {
      return abstract();
    }

    add(timestamp, amount, unit) {
      return abstract();
    }

    diff(a, b, unit) {
      return abstract();
    }

    startOf(timestamp, unit, weekday) {
      return abstract();
    }

    endOf(timestamp, unit) {
      return abstract();
    }

  }

  DateAdapter.override = function (members) {
    Object.assign(DateAdapter.prototype, members);
  };

  var _adapters = {
    _date: DateAdapter
  };

  function getAllScaleValues(scale) {
    if (!scale._cache.$bar) {
      const metas = scale.getMatchingVisibleMetas('bar');
      let values = [];

      for (let i = 0, ilen = metas.length; i < ilen; i++) {
        values = values.concat(metas[i].controller.getAllParsedValues(scale));
      }

      scale._cache.$bar = _arrayUnique(values.sort((a, b) => a - b));
    }

    return scale._cache.$bar;
  }

  function computeMinSampleSize(scale) {
    const values = getAllScaleValues(scale);
    let min = scale._length;
    let i, ilen, curr, prev;

    const updateMinAndPrev = () => {
      if (curr === 32767 || curr === -32768) {
        return;
      }

      if (defined(prev)) {
        min = Math.min(min, Math.abs(curr - prev) || min);
      }

      prev = curr;
    };

    for (i = 0, ilen = values.length; i < ilen; ++i) {
      curr = scale.getPixelForValue(values[i]);
      updateMinAndPrev();
    }

    prev = undefined;

    for (i = 0, ilen = scale.ticks.length; i < ilen; ++i) {
      curr = scale.getPixelForTick(i);
      updateMinAndPrev();
    }

    return min;
  }

  function computeFitCategoryTraits(index, ruler, options, stackCount) {
    const thickness = options.barThickness;
    let size, ratio;

    if (isNullOrUndef(thickness)) {
      size = ruler.min * options.categoryPercentage;
      ratio = options.barPercentage;
    } else {
      size = thickness * stackCount;
      ratio = 1;
    }

    return {
      chunk: size / stackCount,
      ratio,
      start: ruler.pixels[index] - size / 2
    };
  }

  function computeFlexCategoryTraits(index, ruler, options, stackCount) {
    const pixels = ruler.pixels;
    const curr = pixels[index];
    let prev = index > 0 ? pixels[index - 1] : null;
    let next = index < pixels.length - 1 ? pixels[index + 1] : null;
    const percent = options.categoryPercentage;

    if (prev === null) {
      prev = curr - (next === null ? ruler.end - ruler.start : next - curr);
    }

    if (next === null) {
      next = curr + curr - prev;
    }

    const start = curr - (curr - Math.min(prev, next)) / 2 * percent;
    const size = Math.abs(next - prev) / 2 * percent;
    return {
      chunk: size / stackCount,
      ratio: options.barPercentage,
      start
    };
  }

  function parseFloatBar(entry, item, vScale, i) {
    const startValue = vScale.parse(entry[0], i);
    const endValue = vScale.parse(entry[1], i);
    const min = Math.min(startValue, endValue);
    const max = Math.max(startValue, endValue);
    let barStart = min;
    let barEnd = max;

    if (Math.abs(min) > Math.abs(max)) {
      barStart = max;
      barEnd = min;
    }

    item[vScale.axis] = barEnd;
    item._custom = {
      barStart,
      barEnd,
      start: startValue,
      end: endValue,
      min,
      max
    };
  }

  function parseValue(entry, item, vScale, i) {
    if (isArray(entry)) {
      parseFloatBar(entry, item, vScale, i);
    } else {
      item[vScale.axis] = vScale.parse(entry, i);
    }

    return item;
  }

  function parseArrayOrPrimitive(meta, data, start, count) {
    const iScale = meta.iScale;
    const vScale = meta.vScale;
    const labels = iScale.getLabels();
    const singleScale = iScale === vScale;
    const parsed = [];
    let i, ilen, item, entry;

    for (i = start, ilen = start + count; i < ilen; ++i) {
      entry = data[i];
      item = {};
      item[iScale.axis] = singleScale || iScale.parse(labels[i], i);
      parsed.push(parseValue(entry, item, vScale, i));
    }

    return parsed;
  }

  function isFloatBar(custom) {
    return custom && custom.barStart !== undefined && custom.barEnd !== undefined;
  }

  class BarController extends DatasetController {
    parsePrimitiveData(meta, data, start, count) {
      return parseArrayOrPrimitive(meta, data, start, count);
    }

    parseArrayData(meta, data, start, count) {
      return parseArrayOrPrimitive(meta, data, start, count);
    }

    parseObjectData(meta, data, start, count) {
      const {
        iScale,
        vScale
      } = meta;
      const {
        xAxisKey = 'x',
        yAxisKey = 'y'
      } = this._parsing;
      const iAxisKey = iScale.axis === 'x' ? xAxisKey : yAxisKey;
      const vAxisKey = vScale.axis === 'x' ? xAxisKey : yAxisKey;
      const parsed = [];
      let i, ilen, item, obj;

      for (i = start, ilen = start + count; i < ilen; ++i) {
        obj = data[i];
        item = {};
        item[iScale.axis] = iScale.parse(resolveObjectKey(obj, iAxisKey), i);
        parsed.push(parseValue(resolveObjectKey(obj, vAxisKey), item, vScale, i));
      }

      return parsed;
    }

    updateRangeFromParsed(range, scale, parsed, stack) {
      super.updateRangeFromParsed(range, scale, parsed, stack);
      const custom = parsed._custom;

      if (custom && scale === this._cachedMeta.vScale) {
        range.min = Math.min(range.min, custom.min);
        range.max = Math.max(range.max, custom.max);
      }
    }

    getMaxOverflow() {
      return 0;
    }

    getLabelAndValue(index) {
      const me = this;
      const meta = me._cachedMeta;
      const {
        iScale,
        vScale
      } = meta;
      const parsed = me.getParsed(index);
      const custom = parsed._custom;
      const value = isFloatBar(custom) ? '[' + custom.start + ', ' + custom.end + ']' : '' + vScale.getLabelForValue(parsed[vScale.axis]);
      return {
        label: '' + iScale.getLabelForValue(parsed[iScale.axis]),
        value
      };
    }

    initialize() {
      const me = this;
      me.enableOptionSharing = true;
      super.initialize();
      const meta = me._cachedMeta;
      meta.stack = me.getDataset().stack;
    }

    update(mode) {
      const me = this;
      const meta = me._cachedMeta;
      me.updateElements(meta.data, 0, meta.data.length, mode);
    }

    updateElements(bars, start, count, mode) {
      const me = this;
      const reset = mode === 'reset';
      const vScale = me._cachedMeta.vScale;
      const base = vScale.getBasePixel();
      const horizontal = vScale.isHorizontal();

      const ruler = me._getRuler();

      const firstOpts = me.resolveDataElementOptions(start, mode);
      const sharedOptions = me.getSharedOptions(firstOpts);
      const includeOptions = me.includeOptions(mode, sharedOptions);
      me.updateSharedOptions(sharedOptions, mode, firstOpts);

      for (let i = start; i < start + count; i++) {
        const parsed = me.getParsed(i);
        const vpixels = reset || isNullOrUndef(parsed[vScale.axis]) ? {
          base,
          head: base
        } : me._calculateBarValuePixels(i);

        const ipixels = me._calculateBarIndexPixels(i, ruler);

        const stack = (parsed._stacks || {})[vScale.axis];
        const properties = {
          horizontal,
          base: vpixels.base,
          enableBorderRadius: !stack || isFloatBar(parsed._custom) || me.index === stack._top || me.index === stack._bottom,
          x: horizontal ? vpixels.head : ipixels.center,
          y: horizontal ? ipixels.center : vpixels.head,
          height: horizontal ? ipixels.size : Math.abs(vpixels.size),
          width: horizontal ? Math.abs(vpixels.size) : ipixels.size
        };

        if (includeOptions) {
          properties.options = sharedOptions || me.resolveDataElementOptions(i, bars[i].active ? 'active' : mode);
        }

        me.updateElement(bars[i], i, properties, mode);
      }
    }

    _getStacks(last, dataIndex) {
      const me = this;
      const meta = me._cachedMeta;
      const iScale = meta.iScale;
      const metasets = iScale.getMatchingVisibleMetas(me._type);
      const stacked = iScale.options.stacked;
      const ilen = metasets.length;
      const stacks = [];
      let i, item;

      for (i = 0; i < ilen; ++i) {
        item = metasets[i];

        if (!item.controller.options.grouped) {
          continue;
        }

        if (typeof dataIndex !== 'undefined') {
          const val = item.controller.getParsed(dataIndex)[item.controller._cachedMeta.vScale.axis];

          if (isNullOrUndef(val) || isNaN(val)) {
            continue;
          }
        }

        if (stacked === false || stacks.indexOf(item.stack) === -1 || stacked === undefined && item.stack === undefined) {
          stacks.push(item.stack);
        }

        if (item.index === last) {
          break;
        }
      }

      if (!stacks.length) {
        stacks.push(undefined);
      }

      return stacks;
    }

    _getStackCount(index) {
      return this._getStacks(undefined, index).length;
    }

    _getStackIndex(datasetIndex, name, dataIndex) {
      const stacks = this._getStacks(datasetIndex, dataIndex);

      const index = name !== undefined ? stacks.indexOf(name) : -1;
      return index === -1 ? stacks.length - 1 : index;
    }

    _getRuler() {
      const me = this;
      const opts = me.options;
      const meta = me._cachedMeta;
      const iScale = meta.iScale;
      const pixels = [];
      let i, ilen;

      for (i = 0, ilen = meta.data.length; i < ilen; ++i) {
        pixels.push(iScale.getPixelForValue(me.getParsed(i)[iScale.axis], i));
      }

      const barThickness = opts.barThickness;
      const min = barThickness || computeMinSampleSize(iScale);
      return {
        min,
        pixels,
        start: iScale._startPixel,
        end: iScale._endPixel,
        stackCount: me._getStackCount(),
        scale: iScale,
        grouped: opts.grouped,
        ratio: barThickness ? 1 : opts.categoryPercentage * opts.barPercentage
      };
    }

    _calculateBarValuePixels(index) {
      const me = this;
      const {
        vScale,
        _stacked
      } = me._cachedMeta;
      const {
        base: baseValue,
        minBarLength
      } = me.options;
      const parsed = me.getParsed(index);
      const custom = parsed._custom;
      const floating = isFloatBar(custom);
      let value = parsed[vScale.axis];
      let start = 0;
      let length = _stacked ? me.applyStack(vScale, parsed, _stacked) : value;
      let head, size;

      if (length !== value) {
        start = length - value;
        length = value;
      }

      if (floating) {
        value = custom.barStart;
        length = custom.barEnd - custom.barStart;

        if (value !== 0 && sign(value) !== sign(custom.barEnd)) {
          start = 0;
        }

        start += value;
      }

      const startValue = !isNullOrUndef(baseValue) && !floating ? baseValue : start;
      let base = vScale.getPixelForValue(startValue);

      if (this.chart.getDataVisibility(index)) {
        head = vScale.getPixelForValue(start + length);
      } else {
        head = base;
      }

      size = head - base;

      if (minBarLength !== undefined && Math.abs(size) < minBarLength) {
        size = size < 0 ? -minBarLength : minBarLength;

        if (value === 0) {
          base -= size / 2;
        }

        head = base + size;
      }

      const actualBase = baseValue || 0;

      if (base === vScale.getPixelForValue(actualBase)) {
        const halfGrid = vScale.getLineWidthForValue(actualBase) / 2;

        if (size > 0) {
          base += halfGrid;
          size -= halfGrid;
        } else if (size < 0) {
          base -= halfGrid;
          size += halfGrid;
        }
      }

      return {
        size,
        base,
        head,
        center: head + size / 2
      };
    }

    _calculateBarIndexPixels(index, ruler) {
      const me = this;
      const scale = ruler.scale;
      const options = me.options;
      const skipNull = options.skipNull;
      const maxBarThickness = valueOrDefault(options.maxBarThickness, Infinity);
      let center, size;

      if (ruler.grouped) {
        const stackCount = skipNull ? me._getStackCount(index) : ruler.stackCount;
        const range = options.barThickness === 'flex' ? computeFlexCategoryTraits(index, ruler, options, stackCount) : computeFitCategoryTraits(index, ruler, options, stackCount);

        const stackIndex = me._getStackIndex(me.index, me._cachedMeta.stack, skipNull ? index : undefined);

        center = range.start + range.chunk * stackIndex + range.chunk / 2;
        size = Math.min(maxBarThickness, range.chunk * range.ratio);
      } else {
        center = scale.getPixelForValue(me.getParsed(index)[scale.axis], index);
        size = Math.min(maxBarThickness, ruler.min * ruler.ratio);
      }

      return {
        base: center - size / 2,
        head: center + size / 2,
        center,
        size
      };
    }

    draw() {
      const me = this;
      const meta = me._cachedMeta;
      const vScale = meta.vScale;
      const rects = meta.data;
      const ilen = rects.length;
      let i = 0;

      for (; i < ilen; ++i) {
        if (me.getParsed(i)[vScale.axis] !== null) {
          rects[i].draw(me._ctx);
        }
      }
    }

  }

  BarController.id = 'bar';
  BarController.defaults = {
    datasetElementType: false,
    dataElementType: 'bar',
    categoryPercentage: 0.8,
    barPercentage: 0.9,
    grouped: true,
    animations: {
      numbers: {
        type: 'number',
        properties: ['x', 'y', 'base', 'width', 'height']
      }
    }
  };
  BarController.overrides = {
    interaction: {
      mode: 'index'
    },
    scales: {
      _index_: {
        type: 'category',
        offset: true,
        grid: {
          offset: true
        }
      },
      _value_: {
        type: 'linear',
        beginAtZero: true
      }
    }
  };

  class BubbleController extends DatasetController {
    initialize() {
      this.enableOptionSharing = true;
      super.initialize();
    }

    parseObjectData(meta, data, start, count) {
      const {
        xScale,
        yScale
      } = meta;
      const {
        xAxisKey = 'x',
        yAxisKey = 'y'
      } = this._parsing;
      const parsed = [];
      let i, ilen, item;

      for (i = start, ilen = start + count; i < ilen; ++i) {
        item = data[i];
        parsed.push({
          x: xScale.parse(resolveObjectKey(item, xAxisKey), i),
          y: yScale.parse(resolveObjectKey(item, yAxisKey), i),
          _custom: item && item.r && +item.r
        });
      }

      return parsed;
    }

    getMaxOverflow() {
      const {
        data,
        _parsed
      } = this._cachedMeta;
      let max = 0;

      for (let i = data.length - 1; i >= 0; --i) {
        max = Math.max(max, data[i].size() / 2, _parsed[i]._custom);
      }

      return max > 0 && max;
    }

    getLabelAndValue(index) {
      const me = this;
      const meta = me._cachedMeta;
      const {
        xScale,
        yScale
      } = meta;
      const parsed = me.getParsed(index);
      const x = xScale.getLabelForValue(parsed.x);
      const y = yScale.getLabelForValue(parsed.y);
      const r = parsed._custom;
      return {
        label: meta.label,
        value: '(' + x + ', ' + y + (r ? ', ' + r : '') + ')'
      };
    }

    update(mode) {
      const me = this;
      const points = me._cachedMeta.data;
      me.updateElements(points, 0, points.length, mode);
    }

    updateElements(points, start, count, mode) {
      const me = this;
      const reset = mode === 'reset';
      const {
        iScale,
        vScale
      } = me._cachedMeta;
      const firstOpts = me.resolveDataElementOptions(start, mode);
      const sharedOptions = me.getSharedOptions(firstOpts);
      const includeOptions = me.includeOptions(mode, sharedOptions);
      const iAxis = iScale.axis;
      const vAxis = vScale.axis;

      for (let i = start; i < start + count; i++) {
        const point = points[i];
        const parsed = !reset && me.getParsed(i);
        const properties = {};
        const iPixel = properties[iAxis] = reset ? iScale.getPixelForDecimal(0.5) : iScale.getPixelForValue(parsed[iAxis]);
        const vPixel = properties[vAxis] = reset ? vScale.getBasePixel() : vScale.getPixelForValue(parsed[vAxis]);
        properties.skip = isNaN(iPixel) || isNaN(vPixel);

        if (includeOptions) {
          properties.options = me.resolveDataElementOptions(i, point.active ? 'active' : mode);

          if (reset) {
            properties.options.radius = 0;
          }
        }

        me.updateElement(point, i, properties, mode);
      }

      me.updateSharedOptions(sharedOptions, mode, firstOpts);
    }

    resolveDataElementOptions(index, mode) {
      const parsed = this.getParsed(index);
      let values = super.resolveDataElementOptions(index, mode);

      if (values.$shared) {
        values = Object.assign({}, values, {
          $shared: false
        });
      }

      const radius = values.radius;

      if (mode !== 'active') {
        values.radius = 0;
      }

      values.radius += valueOrDefault(parsed && parsed._custom, radius);
      return values;
    }

  }

  BubbleController.id = 'bubble';
  BubbleController.defaults = {
    datasetElementType: false,
    dataElementType: 'point',
    animations: {
      numbers: {
        type: 'number',
        properties: ['x', 'y', 'borderWidth', 'radius']
      }
    }
  };
  BubbleController.overrides = {
    scales: {
      x: {
        type: 'linear'
      },
      y: {
        type: 'linear'
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          title() {
            return '';
          }

        }
      }
    }
  };

  function getRatioAndOffset(rotation, circumference, cutout) {
    let ratioX = 1;
    let ratioY = 1;
    let offsetX = 0;
    let offsetY = 0;

    if (circumference < TAU) {
      const startAngle = rotation;
      const endAngle = startAngle + circumference;
      const startX = Math.cos(startAngle);
      const startY = Math.sin(startAngle);
      const endX = Math.cos(endAngle);
      const endY = Math.sin(endAngle);

      const calcMax = (angle, a, b) => _angleBetween(angle, startAngle, endAngle, true) ? 1 : Math.max(a, a * cutout, b, b * cutout);

      const calcMin = (angle, a, b) => _angleBetween(angle, startAngle, endAngle, true) ? -1 : Math.min(a, a * cutout, b, b * cutout);

      const maxX = calcMax(0, startX, endX);
      const maxY = calcMax(HALF_PI, startY, endY);
      const minX = calcMin(PI, startX, endX);
      const minY = calcMin(PI + HALF_PI, startY, endY);
      ratioX = (maxX - minX) / 2;
      ratioY = (maxY - minY) / 2;
      offsetX = -(maxX + minX) / 2;
      offsetY = -(maxY + minY) / 2;
    }

    return {
      ratioX,
      ratioY,
      offsetX,
      offsetY
    };
  }

  class DoughnutController extends DatasetController {
    constructor(chart, datasetIndex) {
      super(chart, datasetIndex);
      this.enableOptionSharing = true;
      this.innerRadius = undefined;
      this.outerRadius = undefined;
      this.offsetX = undefined;
      this.offsetY = undefined;
    }

    linkScales() {}

    parse(start, count) {
      const data = this.getDataset().data;
      const meta = this._cachedMeta;
      let i, ilen;

      for (i = start, ilen = start + count; i < ilen; ++i) {
        meta._parsed[i] = +data[i];
      }
    }

    _getRotation() {
      return toRadians(this.options.rotation - 90);
    }

    _getCircumference() {
      return toRadians(this.options.circumference);
    }

    _getRotationExtents() {
      let min = TAU;
      let max = -TAU;
      const me = this;

      for (let i = 0; i < me.chart.data.datasets.length; ++i) {
        if (me.chart.isDatasetVisible(i)) {
          const controller = me.chart.getDatasetMeta(i).controller;

          const rotation = controller._getRotation();

          const circumference = controller._getCircumference();

          min = Math.min(min, rotation);
          max = Math.max(max, rotation + circumference);
        }
      }

      return {
        rotation: min,
        circumference: max - min
      };
    }

    update(mode) {
      const me = this;
      const chart = me.chart;
      const {
        chartArea
      } = chart;
      const meta = me._cachedMeta;
      const arcs = meta.data;
      const spacing = me.getMaxBorderWidth() + me.getMaxOffset(arcs) + me.options.spacing;
      const maxSize = Math.max((Math.min(chartArea.width, chartArea.height) - spacing) / 2, 0);
      const cutout = Math.min(toPercentage(me.options.cutout, maxSize), 1);

      const chartWeight = me._getRingWeight(me.index);

      const {
        circumference,
        rotation
      } = me._getRotationExtents();

      const {
        ratioX,
        ratioY,
        offsetX,
        offsetY
      } = getRatioAndOffset(rotation, circumference, cutout);
      const maxWidth = (chartArea.width - spacing) / ratioX;
      const maxHeight = (chartArea.height - spacing) / ratioY;
      const maxRadius = Math.max(Math.min(maxWidth, maxHeight) / 2, 0);
      const outerRadius = toDimension(me.options.radius, maxRadius);
      const innerRadius = Math.max(outerRadius * cutout, 0);

      const radiusLength = (outerRadius - innerRadius) / me._getVisibleDatasetWeightTotal();

      me.offsetX = offsetX * outerRadius;
      me.offsetY = offsetY * outerRadius;
      meta.total = me.calculateTotal();
      me.outerRadius = outerRadius - radiusLength * me._getRingWeightOffset(me.index);
      me.innerRadius = Math.max(me.outerRadius - radiusLength * chartWeight, 0);
      me.updateElements(arcs, 0, arcs.length, mode);
    }

    _circumference(i, reset) {
      const me = this;
      const opts = me.options;
      const meta = me._cachedMeta;

      const circumference = me._getCircumference();

      if (reset && opts.animation.animateRotate || !this.chart.getDataVisibility(i) || meta._parsed[i] === null) {
        return 0;
      }

      return me.calculateCircumference(meta._parsed[i] * circumference / TAU);
    }

    updateElements(arcs, start, count, mode) {
      const me = this;
      const reset = mode === 'reset';
      const chart = me.chart;
      const chartArea = chart.chartArea;
      const opts = chart.options;
      const animationOpts = opts.animation;
      const centerX = (chartArea.left + chartArea.right) / 2;
      const centerY = (chartArea.top + chartArea.bottom) / 2;
      const animateScale = reset && animationOpts.animateScale;
      const innerRadius = animateScale ? 0 : me.innerRadius;
      const outerRadius = animateScale ? 0 : me.outerRadius;
      const firstOpts = me.resolveDataElementOptions(start, mode);
      const sharedOptions = me.getSharedOptions(firstOpts);
      const includeOptions = me.includeOptions(mode, sharedOptions);

      let startAngle = me._getRotation();

      let i;

      for (i = 0; i < start; ++i) {
        startAngle += me._circumference(i, reset);
      }

      for (i = start; i < start + count; ++i) {
        const circumference = me._circumference(i, reset);

        const arc = arcs[i];
        const properties = {
          x: centerX + me.offsetX,
          y: centerY + me.offsetY,
          startAngle,
          endAngle: startAngle + circumference,
          circumference,
          outerRadius,
          innerRadius
        };

        if (includeOptions) {
          properties.options = sharedOptions || me.resolveDataElementOptions(i, arc.active ? 'active' : mode);
        }

        startAngle += circumference;
        me.updateElement(arc, i, properties, mode);
      }

      me.updateSharedOptions(sharedOptions, mode, firstOpts);
    }

    calculateTotal() {
      const meta = this._cachedMeta;
      const metaData = meta.data;
      let total = 0;
      let i;

      for (i = 0; i < metaData.length; i++) {
        const value = meta._parsed[i];

        if (value !== null && !isNaN(value) && this.chart.getDataVisibility(i)) {
          total += Math.abs(value);
        }
      }

      return total;
    }

    calculateCircumference(value) {
      const total = this._cachedMeta.total;

      if (total > 0 && !isNaN(value)) {
        return TAU * (Math.abs(value) / total);
      }

      return 0;
    }

    getLabelAndValue(index) {
      const me = this;
      const meta = me._cachedMeta;
      const chart = me.chart;
      const labels = chart.data.labels || [];
      const value = formatNumber(meta._parsed[index], chart.options.locale);
      return {
        label: labels[index] || '',
        value
      };
    }

    getMaxBorderWidth(arcs) {
      const me = this;
      let max = 0;
      const chart = me.chart;
      let i, ilen, meta, controller, options;

      if (!arcs) {
        for (i = 0, ilen = chart.data.datasets.length; i < ilen; ++i) {
          if (chart.isDatasetVisible(i)) {
            meta = chart.getDatasetMeta(i);
            arcs = meta.data;
            controller = meta.controller;

            if (controller !== me) {
              controller.configure();
            }

            break;
          }
        }
      }

      if (!arcs) {
        return 0;
      }

      for (i = 0, ilen = arcs.length; i < ilen; ++i) {
        options = controller.resolveDataElementOptions(i);

        if (options.borderAlign !== 'inner') {
          max = Math.max(max, options.borderWidth || 0, options.hoverBorderWidth || 0);
        }
      }

      return max;
    }

    getMaxOffset(arcs) {
      let max = 0;

      for (let i = 0, ilen = arcs.length; i < ilen; ++i) {
        const options = this.resolveDataElementOptions(i);
        max = Math.max(max, options.offset || 0, options.hoverOffset || 0);
      }

      return max;
    }

    _getRingWeightOffset(datasetIndex) {
      let ringWeightOffset = 0;

      for (let i = 0; i < datasetIndex; ++i) {
        if (this.chart.isDatasetVisible(i)) {
          ringWeightOffset += this._getRingWeight(i);
        }
      }

      return ringWeightOffset;
    }

    _getRingWeight(datasetIndex) {
      return Math.max(valueOrDefault(this.chart.data.datasets[datasetIndex].weight, 1), 0);
    }

    _getVisibleDatasetWeightTotal() {
      return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
    }

  }

  DoughnutController.id = 'doughnut';
  DoughnutController.defaults = {
    datasetElementType: false,
    dataElementType: 'arc',
    animation: {
      animateRotate: true,
      animateScale: false
    },
    animations: {
      numbers: {
        type: 'number',
        properties: ['circumference', 'endAngle', 'innerRadius', 'outerRadius', 'startAngle', 'x', 'y', 'offset', 'borderWidth', 'spacing']
      }
    },
    cutout: '50%',
    rotation: 0,
    circumference: 360,
    radius: '100%',
    spacing: 0,
    indexAxis: 'r'
  };
  DoughnutController.descriptors = {
    _scriptable: name => name !== 'spacing',
    _indexable: name => name !== 'spacing'
  };
  DoughnutController.overrides = {
    aspectRatio: 1,
    plugins: {
      legend: {
        labels: {
          generateLabels(chart) {
            const data = chart.data;

            if (data.labels.length && data.datasets.length) {
              const {
                labels: {
                  pointStyle
                }
              } = chart.legend.options;
              return data.labels.map((label, i) => {
                const meta = chart.getDatasetMeta(0);
                const style = meta.controller.getStyle(i);
                return {
                  text: label,
                  fillStyle: style.backgroundColor,
                  strokeStyle: style.borderColor,
                  lineWidth: style.borderWidth,
                  pointStyle: pointStyle,
                  hidden: !chart.getDataVisibility(i),
                  index: i
                };
              });
            }

            return [];
          }

        },

        onClick(e, legendItem, legend) {
          legend.chart.toggleDataVisibility(legendItem.index);
          legend.chart.update();
        }

      },
      tooltip: {
        callbacks: {
          title() {
            return '';
          },

          label(tooltipItem) {
            let dataLabel = tooltipItem.label;
            const value = ': ' + tooltipItem.formattedValue;

            if (isArray(dataLabel)) {
              dataLabel = dataLabel.slice();
              dataLabel[0] += value;
            } else {
              dataLabel += value;
            }

            return dataLabel;
          }

        }
      }
    }
  };

  class LineController extends DatasetController {
    initialize() {
      this.enableOptionSharing = true;
      super.initialize();
    }

    update(mode) {
      const me = this;
      const meta = me._cachedMeta;
      const {
        dataset: line,
        data: points = [],
        _dataset
      } = meta;
      const animationsDisabled = me.chart._animationsDisabled;
      let {
        start,
        count
      } = getStartAndCountOfVisiblePoints(meta, points, animationsDisabled);
      me._drawStart = start;
      me._drawCount = count;

      if (scaleRangesChanged(meta)) {
        start = 0;
        count = points.length;
      }

      line._decimated = !!_dataset._decimated;
      line.points = points;
      const options = me.resolveDatasetElementOptions(mode);

      if (!me.options.showLine) {
        options.borderWidth = 0;
      }

      options.segment = me.options.segment;
      me.updateElement(line, undefined, {
        animated: !animationsDisabled,
        options
      }, mode);
      me.updateElements(points, start, count, mode);
    }

    updateElements(points, start, count, mode) {
      const me = this;
      const reset = mode === 'reset';
      const {
        iScale,
        vScale,
        _stacked
      } = me._cachedMeta;
      const firstOpts = me.resolveDataElementOptions(start, mode);
      const sharedOptions = me.getSharedOptions(firstOpts);
      const includeOptions = me.includeOptions(mode, sharedOptions);
      const iAxis = iScale.axis;
      const vAxis = vScale.axis;
      const spanGaps = me.options.spanGaps;
      const maxGapLength = isNumber(spanGaps) ? spanGaps : Number.POSITIVE_INFINITY;
      const directUpdate = me.chart._animationsDisabled || reset || mode === 'none';
      let prevParsed = start > 0 && me.getParsed(start - 1);

      for (let i = start; i < start + count; ++i) {
        const point = points[i];
        const parsed = me.getParsed(i);
        const properties = directUpdate ? point : {};
        const nullData = isNullOrUndef(parsed[vAxis]);
        const iPixel = properties[iAxis] = iScale.getPixelForValue(parsed[iAxis], i);
        const vPixel = properties[vAxis] = reset || nullData ? vScale.getBasePixel() : vScale.getPixelForValue(_stacked ? me.applyStack(vScale, parsed, _stacked) : parsed[vAxis], i);
        properties.skip = isNaN(iPixel) || isNaN(vPixel) || nullData;
        properties.stop = i > 0 && parsed[iAxis] - prevParsed[iAxis] > maxGapLength;
        properties.parsed = parsed;

        if (includeOptions) {
          properties.options = sharedOptions || me.resolveDataElementOptions(i, point.active ? 'active' : mode);
        }

        if (!directUpdate) {
          me.updateElement(point, i, properties, mode);
        }

        prevParsed = parsed;
      }

      me.updateSharedOptions(sharedOptions, mode, firstOpts);
    }

    getMaxOverflow() {
      const me = this;
      const meta = me._cachedMeta;
      const dataset = meta.dataset;
      const border = dataset.options && dataset.options.borderWidth || 0;
      const data = meta.data || [];

      if (!data.length) {
        return border;
      }

      const firstPoint = data[0].size(me.resolveDataElementOptions(0));
      const lastPoint = data[data.length - 1].size(me.resolveDataElementOptions(data.length - 1));
      return Math.max(border, firstPoint, lastPoint) / 2;
    }

    draw() {
      const meta = this._cachedMeta;
      meta.dataset.updateControlPoints(this.chart.chartArea, meta.iScale.axis);
      super.draw();
    }

  }

  LineController.id = 'line';
  LineController.defaults = {
    datasetElementType: 'line',
    dataElementType: 'point',
    showLine: true,
    spanGaps: false
  };
  LineController.overrides = {
    scales: {
      _index_: {
        type: 'category'
      },
      _value_: {
        type: 'linear'
      }
    }
  };

  function getStartAndCountOfVisiblePoints(meta, points, animationsDisabled) {
    const pointCount = points.length;
    let start = 0;
    let count = pointCount;

    if (meta._sorted) {
      const {
        iScale,
        _parsed
      } = meta;
      const axis = iScale.axis;
      const {
        min,
        max,
        minDefined,
        maxDefined
      } = iScale.getUserBounds();

      if (minDefined) {
        start = _limitValue(Math.min(_lookupByKey(_parsed, iScale.axis, min).lo, animationsDisabled ? pointCount : _lookupByKey(points, axis, iScale.getPixelForValue(min)).lo), 0, pointCount - 1);
      }

      if (maxDefined) {
        count = _limitValue(Math.max(_lookupByKey(_parsed, iScale.axis, max).hi + 1, animationsDisabled ? 0 : _lookupByKey(points, axis, iScale.getPixelForValue(max)).hi + 1), start, pointCount) - start;
      } else {
        count = pointCount - start;
      }
    }

    return {
      start,
      count
    };
  }

  function scaleRangesChanged(meta) {
    const {
      xScale,
      yScale,
      _scaleRanges
    } = meta;
    const newRanges = {
      xmin: xScale.min,
      xmax: xScale.max,
      ymin: yScale.min,
      ymax: yScale.max
    };

    if (!_scaleRanges) {
      meta._scaleRanges = newRanges;
      return true;
    }

    const changed = _scaleRanges.xmin !== xScale.min || _scaleRanges.xmax !== xScale.max || _scaleRanges.ymin !== yScale.min || _scaleRanges.ymax !== yScale.max;
    Object.assign(_scaleRanges, newRanges);
    return changed;
  }

  class PolarAreaController extends DatasetController {
    constructor(chart, datasetIndex) {
      super(chart, datasetIndex);
      this.innerRadius = undefined;
      this.outerRadius = undefined;
    }

    getLabelAndValue(index) {
      const me = this;
      const meta = me._cachedMeta;
      const chart = me.chart;
      const labels = chart.data.labels || [];
      const value = formatNumber(meta._parsed[index].r, chart.options.locale);
      return {
        label: labels[index] || '',
        value
      };
    }

    update(mode) {
      const arcs = this._cachedMeta.data;

      this._updateRadius();

      this.updateElements(arcs, 0, arcs.length, mode);
    }

    _updateRadius() {
      const me = this;
      const chart = me.chart;
      const chartArea = chart.chartArea;
      const opts = chart.options;
      const minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
      const outerRadius = Math.max(minSize / 2, 0);
      const innerRadius = Math.max(opts.cutoutPercentage ? outerRadius / 100 * opts.cutoutPercentage : 1, 0);
      const radiusLength = (outerRadius - innerRadius) / chart.getVisibleDatasetCount();
      me.outerRadius = outerRadius - radiusLength * me.index;
      me.innerRadius = me.outerRadius - radiusLength;
    }

    updateElements(arcs, start, count, mode) {
      const me = this;
      const reset = mode === 'reset';
      const chart = me.chart;
      const dataset = me.getDataset();
      const opts = chart.options;
      const animationOpts = opts.animation;
      const scale = me._cachedMeta.rScale;
      const centerX = scale.xCenter;
      const centerY = scale.yCenter;
      const datasetStartAngle = scale.getIndexAngle(0) - 0.5 * PI;
      let angle = datasetStartAngle;
      let i;
      const defaultAngle = 360 / me.countVisibleElements();

      for (i = 0; i < start; ++i) {
        angle += me._computeAngle(i, mode, defaultAngle);
      }

      for (i = start; i < start + count; i++) {
        const arc = arcs[i];
        let startAngle = angle;

        let endAngle = angle + me._computeAngle(i, mode, defaultAngle);

        let outerRadius = chart.getDataVisibility(i) ? scale.getDistanceFromCenterForValue(dataset.data[i]) : 0;
        angle = endAngle;

        if (reset) {
          if (animationOpts.animateScale) {
            outerRadius = 0;
          }

          if (animationOpts.animateRotate) {
            startAngle = endAngle = datasetStartAngle;
          }
        }

        const properties = {
          x: centerX,
          y: centerY,
          innerRadius: 0,
          outerRadius,
          startAngle,
          endAngle,
          options: me.resolveDataElementOptions(i, arc.active ? 'active' : mode)
        };
        me.updateElement(arc, i, properties, mode);
      }
    }

    countVisibleElements() {
      const dataset = this.getDataset();
      const meta = this._cachedMeta;
      let count = 0;
      meta.data.forEach((element, index) => {
        if (!isNaN(dataset.data[index]) && this.chart.getDataVisibility(index)) {
          count++;
        }
      });
      return count;
    }

    _computeAngle(index, mode, defaultAngle) {
      return this.chart.getDataVisibility(index) ? toRadians(this.resolveDataElementOptions(index, mode).angle || defaultAngle) : 0;
    }

  }

  PolarAreaController.id = 'polarArea';
  PolarAreaController.defaults = {
    dataElementType: 'arc',
    animation: {
      animateRotate: true,
      animateScale: true
    },
    animations: {
      numbers: {
        type: 'number',
        properties: ['x', 'y', 'startAngle', 'endAngle', 'innerRadius', 'outerRadius']
      }
    },
    indexAxis: 'r',
    startAngle: 0
  };
  PolarAreaController.overrides = {
    aspectRatio: 1,
    plugins: {
      legend: {
        labels: {
          generateLabels(chart) {
            const data = chart.data;

            if (data.labels.length && data.datasets.length) {
              const {
                labels: {
                  pointStyle
                }
              } = chart.legend.options;
              return data.labels.map((label, i) => {
                const meta = chart.getDatasetMeta(0);
                const style = meta.controller.getStyle(i);
                return {
                  text: label,
                  fillStyle: style.backgroundColor,
                  strokeStyle: style.borderColor,
                  lineWidth: style.borderWidth,
                  pointStyle: pointStyle,
                  hidden: !chart.getDataVisibility(i),
                  index: i
                };
              });
            }

            return [];
          }

        },

        onClick(e, legendItem, legend) {
          legend.chart.toggleDataVisibility(legendItem.index);
          legend.chart.update();
        }

      },
      tooltip: {
        callbacks: {
          title() {
            return '';
          },

          label(context) {
            return context.chart.data.labels[context.dataIndex] + ': ' + context.formattedValue;
          }

        }
      }
    },
    scales: {
      r: {
        type: 'radialLinear',
        angleLines: {
          display: false
        },
        beginAtZero: true,
        grid: {
          circular: true
        },
        pointLabels: {
          display: false
        },
        startAngle: 0
      }
    }
  };

  class PieController extends DoughnutController {}

  PieController.id = 'pie';
  PieController.defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: '100%'
  };

  class RadarController extends DatasetController {
    getLabelAndValue(index) {
      const me = this;
      const vScale = me._cachedMeta.vScale;
      const parsed = me.getParsed(index);
      return {
        label: vScale.getLabels()[index],
        value: '' + vScale.getLabelForValue(parsed[vScale.axis])
      };
    }

    update(mode) {
      const me = this;
      const meta = me._cachedMeta;
      const line = meta.dataset;
      const points = meta.data || [];
      const labels = meta.iScale.getLabels();
      line.points = points;

      if (mode !== 'resize') {
        const options = me.resolveDatasetElementOptions(mode);

        if (!me.options.showLine) {
          options.borderWidth = 0;
        }

        const properties = {
          _loop: true,
          _fullLoop: labels.length === points.length,
          options
        };
        me.updateElement(line, undefined, properties, mode);
      }

      me.updateElements(points, 0, points.length, mode);
    }

    updateElements(points, start, count, mode) {
      const me = this;
      const dataset = me.getDataset();
      const scale = me._cachedMeta.rScale;
      const reset = mode === 'reset';

      for (let i = start; i < start + count; i++) {
        const point = points[i];
        const options = me.resolveDataElementOptions(i, point.active ? 'active' : mode);
        const pointPosition = scale.getPointPositionForValue(i, dataset.data[i]);
        const x = reset ? scale.xCenter : pointPosition.x;
        const y = reset ? scale.yCenter : pointPosition.y;
        const properties = {
          x,
          y,
          angle: pointPosition.angle,
          skip: isNaN(x) || isNaN(y),
          options
        };
        me.updateElement(point, i, properties, mode);
      }
    }

  }

  RadarController.id = 'radar';
  RadarController.defaults = {
    datasetElementType: 'line',
    dataElementType: 'point',
    indexAxis: 'r',
    showLine: true,
    elements: {
      line: {
        fill: 'start'
      }
    }
  };
  RadarController.overrides = {
    aspectRatio: 1,
    scales: {
      r: {
        type: 'radialLinear'
      }
    }
  };

  class ScatterController extends LineController {}

  ScatterController.id = 'scatter';
  ScatterController.defaults = {
    showLine: false,
    fill: false
  };
  ScatterController.overrides = {
    interaction: {
      mode: 'point'
    },
    plugins: {
      tooltip: {
        callbacks: {
          title() {
            return '';
          },

          label(item) {
            return '(' + item.label + ', ' + item.formattedValue + ')';
          }

        }
      }
    },
    scales: {
      x: {
        type: 'linear'
      },
      y: {
        type: 'linear'
      }
    }
  };
  var controllers = /*#__PURE__*/Object.freeze({
    __proto__: null,
    BarController: BarController,
    BubbleController: BubbleController,
    DoughnutController: DoughnutController,
    LineController: LineController,
    PolarAreaController: PolarAreaController,
    PieController: PieController,
    RadarController: RadarController,
    ScatterController: ScatterController
  });

  function clipArc(ctx, element, endAngle) {
    const {
      startAngle,
      pixelMargin,
      x,
      y,
      outerRadius,
      innerRadius
    } = element;
    let angleMargin = pixelMargin / outerRadius;
    ctx.beginPath();
    ctx.arc(x, y, outerRadius, startAngle - angleMargin, endAngle + angleMargin);

    if (innerRadius > pixelMargin) {
      angleMargin = pixelMargin / innerRadius;
      ctx.arc(x, y, innerRadius, endAngle + angleMargin, startAngle - angleMargin, true);
    } else {
      ctx.arc(x, y, pixelMargin, endAngle + HALF_PI, startAngle - HALF_PI);
    }

    ctx.closePath();
    ctx.clip();
  }

  function toRadiusCorners(value) {
    return _readValueToProps(value, ['outerStart', 'outerEnd', 'innerStart', 'innerEnd']);
  }

  function parseBorderRadius$1(arc, innerRadius, outerRadius, angleDelta) {
    const o = toRadiusCorners(arc.options.borderRadius);
    const halfThickness = (outerRadius - innerRadius) / 2;
    const innerLimit = Math.min(halfThickness, angleDelta * innerRadius / 2);

    const computeOuterLimit = val => {
      const outerArcLimit = (outerRadius - Math.min(halfThickness, val)) * angleDelta / 2;
      return _limitValue(val, 0, Math.min(halfThickness, outerArcLimit));
    };

    return {
      outerStart: computeOuterLimit(o.outerStart),
      outerEnd: computeOuterLimit(o.outerEnd),
      innerStart: _limitValue(o.innerStart, 0, innerLimit),
      innerEnd: _limitValue(o.innerEnd, 0, innerLimit)
    };
  }

  function rThetaToXY(r, theta, x, y) {
    return {
      x: x + r * Math.cos(theta),
      y: y + r * Math.sin(theta)
    };
  }

  function pathArc(ctx, element, offset, spacing, end) {
    const {
      x,
      y,
      startAngle: start,
      pixelMargin,
      innerRadius: innerR
    } = element;
    const outerRadius = Math.max(element.outerRadius + spacing + offset - pixelMargin, 0);
    const innerRadius = innerR > 0 ? innerR + spacing + offset + pixelMargin : 0;
    let spacingOffset = 0;
    const alpha = end - start;

    if (spacing) {
      const noSpacingInnerRadius = innerR > 0 ? innerR - spacing : 0;
      const noSpacingOuterRadius = outerRadius > 0 ? outerRadius - spacing : 0;
      const avNogSpacingRadius = (noSpacingInnerRadius + noSpacingOuterRadius) / 2;
      const adjustedAngle = avNogSpacingRadius !== 0 ? alpha * avNogSpacingRadius / (avNogSpacingRadius + spacing) : alpha;
      spacingOffset = (alpha - adjustedAngle) / 2;
    }

    const beta = Math.max(0.001, alpha * outerRadius - offset / PI) / outerRadius;
    const angleOffset = (alpha - beta) / 2;
    const startAngle = start + angleOffset + spacingOffset;
    const endAngle = end - angleOffset - spacingOffset;
    const {
      outerStart,
      outerEnd,
      innerStart,
      innerEnd
    } = parseBorderRadius$1(element, innerRadius, outerRadius, endAngle - startAngle);
    const outerStartAdjustedRadius = outerRadius - outerStart;
    const outerEndAdjustedRadius = outerRadius - outerEnd;
    const outerStartAdjustedAngle = startAngle + outerStart / outerStartAdjustedRadius;
    const outerEndAdjustedAngle = endAngle - outerEnd / outerEndAdjustedRadius;
    const innerStartAdjustedRadius = innerRadius + innerStart;
    const innerEndAdjustedRadius = innerRadius + innerEnd;
    const innerStartAdjustedAngle = startAngle + innerStart / innerStartAdjustedRadius;
    const innerEndAdjustedAngle = endAngle - innerEnd / innerEndAdjustedRadius;
    ctx.beginPath();
    ctx.arc(x, y, outerRadius, outerStartAdjustedAngle, outerEndAdjustedAngle);

    if (outerEnd > 0) {
      const pCenter = rThetaToXY(outerEndAdjustedRadius, outerEndAdjustedAngle, x, y);
      ctx.arc(pCenter.x, pCenter.y, outerEnd, outerEndAdjustedAngle, endAngle + HALF_PI);
    }

    const p4 = rThetaToXY(innerEndAdjustedRadius, endAngle, x, y);
    ctx.lineTo(p4.x, p4.y);

    if (innerEnd > 0) {
      const pCenter = rThetaToXY(innerEndAdjustedRadius, innerEndAdjustedAngle, x, y);
      ctx.arc(pCenter.x, pCenter.y, innerEnd, endAngle + HALF_PI, innerEndAdjustedAngle + Math.PI);
    }

    ctx.arc(x, y, innerRadius, endAngle - innerEnd / innerRadius, startAngle + innerStart / innerRadius, true);

    if (innerStart > 0) {
      const pCenter = rThetaToXY(innerStartAdjustedRadius, innerStartAdjustedAngle, x, y);
      ctx.arc(pCenter.x, pCenter.y, innerStart, innerStartAdjustedAngle + Math.PI, startAngle - HALF_PI);
    }

    const p8 = rThetaToXY(outerStartAdjustedRadius, startAngle, x, y);
    ctx.lineTo(p8.x, p8.y);

    if (outerStart > 0) {
      const pCenter = rThetaToXY(outerStartAdjustedRadius, outerStartAdjustedAngle, x, y);
      ctx.arc(pCenter.x, pCenter.y, outerStart, startAngle - HALF_PI, outerStartAdjustedAngle);
    }

    ctx.closePath();
  }

  function drawArc(ctx, element, offset, spacing) {
    const {
      fullCircles,
      startAngle,
      circumference
    } = element;
    let endAngle = element.endAngle;

    if (fullCircles) {
      pathArc(ctx, element, offset, spacing, startAngle + TAU);

      for (let i = 0; i < fullCircles; ++i) {
        ctx.fill();
      }

      if (!isNaN(circumference)) {
        endAngle = startAngle + circumference % TAU;

        if (circumference % TAU === 0) {
          endAngle += TAU;
        }
      }
    }

    pathArc(ctx, element, offset, spacing, endAngle);
    ctx.fill();
    return endAngle;
  }

  function drawFullCircleBorders(ctx, element, inner) {
    const {
      x,
      y,
      startAngle,
      pixelMargin,
      fullCircles
    } = element;
    const outerRadius = Math.max(element.outerRadius - pixelMargin, 0);
    const innerRadius = element.innerRadius + pixelMargin;
    let i;

    if (inner) {
      clipArc(ctx, element, startAngle + TAU);
    }

    ctx.beginPath();
    ctx.arc(x, y, innerRadius, startAngle + TAU, startAngle, true);

    for (i = 0; i < fullCircles; ++i) {
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(x, y, outerRadius, startAngle, startAngle + TAU);

    for (i = 0; i < fullCircles; ++i) {
      ctx.stroke();
    }
  }

  function drawBorder(ctx, element, offset, spacing, endAngle) {
    const {
      options
    } = element;
    const inner = options.borderAlign === 'inner';

    if (!options.borderWidth) {
      return;
    }

    if (inner) {
      ctx.lineWidth = options.borderWidth * 2;
      ctx.lineJoin = 'round';
    } else {
      ctx.lineWidth = options.borderWidth;
      ctx.lineJoin = 'bevel';
    }

    if (element.fullCircles) {
      drawFullCircleBorders(ctx, element, inner);
    }

    if (inner) {
      clipArc(ctx, element, endAngle);
    }

    pathArc(ctx, element, offset, spacing, endAngle);
    ctx.stroke();
  }

  class ArcElement extends Element {
    constructor(cfg) {
      super();
      this.options = undefined;
      this.circumference = undefined;
      this.startAngle = undefined;
      this.endAngle = undefined;
      this.innerRadius = undefined;
      this.outerRadius = undefined;
      this.pixelMargin = 0;
      this.fullCircles = 0;

      if (cfg) {
        Object.assign(this, cfg);
      }
    }

    inRange(chartX, chartY, useFinalPosition) {
      const point = this.getProps(['x', 'y'], useFinalPosition);
      const {
        angle,
        distance
      } = getAngleFromPoint(point, {
        x: chartX,
        y: chartY
      });
      const {
        startAngle,
        endAngle,
        innerRadius,
        outerRadius,
        circumference
      } = this.getProps(['startAngle', 'endAngle', 'innerRadius', 'outerRadius', 'circumference'], useFinalPosition);
      const rAdjust = this.options.spacing / 2;

      const betweenAngles = circumference >= TAU || _angleBetween(angle, startAngle, endAngle);

      const withinRadius = distance >= innerRadius + rAdjust && distance <= outerRadius + rAdjust;
      return betweenAngles && withinRadius;
    }

    getCenterPoint(useFinalPosition) {
      const {
        x,
        y,
        startAngle,
        endAngle,
        innerRadius,
        outerRadius
      } = this.getProps(['x', 'y', 'startAngle', 'endAngle', 'innerRadius', 'outerRadius', 'circumference'], useFinalPosition);
      const {
        offset,
        spacing
      } = this.options;
      const halfAngle = (startAngle + endAngle) / 2;
      const halfRadius = (innerRadius + outerRadius + spacing + offset) / 2;
      return {
        x: x + Math.cos(halfAngle) * halfRadius,
        y: y + Math.sin(halfAngle) * halfRadius
      };
    }

    tooltipPosition(useFinalPosition) {
      return this.getCenterPoint(useFinalPosition);
    }

    draw(ctx) {
      const me = this;
      const {
        options,
        circumference
      } = me;
      const offset = (options.offset || 0) / 2;
      const spacing = (options.spacing || 0) / 2;
      me.pixelMargin = options.borderAlign === 'inner' ? 0.33 : 0;
      me.fullCircles = circumference > TAU ? Math.floor(circumference / TAU) : 0;

      if (circumference === 0 || me.innerRadius < 0 || me.outerRadius < 0) {
        return;
      }

      ctx.save();
      let radiusOffset = 0;

      if (offset) {
        radiusOffset = offset / 2;
        const halfAngle = (me.startAngle + me.endAngle) / 2;
        ctx.translate(Math.cos(halfAngle) * radiusOffset, Math.sin(halfAngle) * radiusOffset);

        if (me.circumference >= PI) {
          radiusOffset = offset;
        }
      }

      ctx.fillStyle = options.backgroundColor;
      ctx.strokeStyle = options.borderColor;
      const endAngle = drawArc(ctx, me, radiusOffset, spacing);
      drawBorder(ctx, me, radiusOffset, spacing, endAngle);
      ctx.restore();
    }

  }

  ArcElement.id = 'arc';
  ArcElement.defaults = {
    borderAlign: 'center',
    borderColor: '#fff',
    borderRadius: 0,
    borderWidth: 2,
    offset: 0,
    spacing: 0,
    angle: undefined
  };
  ArcElement.defaultRoutes = {
    backgroundColor: 'backgroundColor'
  };

  function setStyle(ctx, options, style = options) {
    ctx.lineCap = valueOrDefault(style.borderCapStyle, options.borderCapStyle);
    ctx.setLineDash(valueOrDefault(style.borderDash, options.borderDash));
    ctx.lineDashOffset = valueOrDefault(style.borderDashOffset, options.borderDashOffset);
    ctx.lineJoin = valueOrDefault(style.borderJoinStyle, options.borderJoinStyle);
    ctx.lineWidth = valueOrDefault(style.borderWidth, options.borderWidth);
    ctx.strokeStyle = valueOrDefault(style.borderColor, options.borderColor);
  }

  function lineTo(ctx, previous, target) {
    ctx.lineTo(target.x, target.y);
  }

  function getLineMethod(options) {
    if (options.stepped) {
      return _steppedLineTo;
    }

    if (options.tension || options.cubicInterpolationMode === 'monotone') {
      return _bezierCurveTo;
    }

    return lineTo;
  }

  function pathVars(points, segment, params = {}) {
    const count = points.length;
    const {
      start: paramsStart = 0,
      end: paramsEnd = count - 1
    } = params;
    const {
      start: segmentStart,
      end: segmentEnd
    } = segment;
    const start = Math.max(paramsStart, segmentStart);
    const end = Math.min(paramsEnd, segmentEnd);
    const outside = paramsStart < segmentStart && paramsEnd < segmentStart || paramsStart > segmentEnd && paramsEnd > segmentEnd;
    return {
      count,
      start,
      loop: segment.loop,
      ilen: end < start && !outside ? count + end - start : end - start
    };
  }

  function pathSegment(ctx, line, segment, params) {
    const {
      points,
      options
    } = line;
    const {
      count,
      start,
      loop,
      ilen
    } = pathVars(points, segment, params);
    const lineMethod = getLineMethod(options);
    let {
      move = true,
      reverse
    } = params || {};
    let i, point, prev;

    for (i = 0; i <= ilen; ++i) {
      point = points[(start + (reverse ? ilen - i : i)) % count];

      if (point.skip) {
        continue;
      } else if (move) {
        ctx.moveTo(point.x, point.y);
        move = false;
      } else {
        lineMethod(ctx, prev, point, reverse, options.stepped);
      }

      prev = point;
    }

    if (loop) {
      point = points[(start + (reverse ? ilen : 0)) % count];
      lineMethod(ctx, prev, point, reverse, options.stepped);
    }

    return !!loop;
  }

  function fastPathSegment(ctx, line, segment, params) {
    const points = line.points;
    const {
      count,
      start,
      ilen
    } = pathVars(points, segment, params);
    const {
      move = true,
      reverse
    } = params || {};
    let avgX = 0;
    let countX = 0;
    let i, point, prevX, minY, maxY, lastY;

    const pointIndex = index => (start + (reverse ? ilen - index : index)) % count;

    const drawX = () => {
      if (minY !== maxY) {
        ctx.lineTo(avgX, maxY);
        ctx.lineTo(avgX, minY);
        ctx.lineTo(avgX, lastY);
      }
    };

    if (move) {
      point = points[pointIndex(0)];
      ctx.moveTo(point.x, point.y);
    }

    for (i = 0; i <= ilen; ++i) {
      point = points[pointIndex(i)];

      if (point.skip) {
        continue;
      }

      const x = point.x;
      const y = point.y;
      const truncX = x | 0;

      if (truncX === prevX) {
        if (y < minY) {
          minY = y;
        } else if (y > maxY) {
          maxY = y;
        }

        avgX = (countX * avgX + x) / ++countX;
      } else {
        drawX();
        ctx.lineTo(x, y);
        prevX = truncX;
        countX = 0;
        minY = maxY = y;
      }

      lastY = y;
    }

    drawX();
  }

  function _getSegmentMethod(line) {
    const opts = line.options;
    const borderDash = opts.borderDash && opts.borderDash.length;
    const useFastPath = !line._decimated && !line._loop && !opts.tension && opts.cubicInterpolationMode !== 'monotone' && !opts.stepped && !borderDash;
    return useFastPath ? fastPathSegment : pathSegment;
  }

  function _getInterpolationMethod(options) {
    if (options.stepped) {
      return _steppedInterpolation;
    }

    if (options.tension || options.cubicInterpolationMode === 'monotone') {
      return _bezierInterpolation;
    }

    return _pointInLine;
  }

  function strokePathWithCache(ctx, line, start, count) {
    let path = line._path;

    if (!path) {
      path = line._path = new Path2D();

      if (line.path(path, start, count)) {
        path.closePath();
      }
    }

    setStyle(ctx, line.options);
    ctx.stroke(path);
  }

  function strokePathDirect(ctx, line, start, count) {
    const {
      segments,
      options
    } = line;

    const segmentMethod = _getSegmentMethod(line);

    for (const segment of segments) {
      setStyle(ctx, options, segment.style);
      ctx.beginPath();

      if (segmentMethod(ctx, line, segment, {
        start,
        end: start + count - 1
      })) {
        ctx.closePath();
      }

      ctx.stroke();
    }
  }

  const usePath2D = typeof Path2D === 'function';

  function draw(ctx, line, start, count) {
    if (usePath2D && line.segments.length === 1) {
      strokePathWithCache(ctx, line, start, count);
    } else {
      strokePathDirect(ctx, line, start, count);
    }
  }

  class LineElement extends Element {
    constructor(cfg) {
      super();
      this.animated = true;
      this.options = undefined;
      this._loop = undefined;
      this._fullLoop = undefined;
      this._path = undefined;
      this._points = undefined;
      this._segments = undefined;
      this._decimated = false;
      this._pointsUpdated = false;

      if (cfg) {
        Object.assign(this, cfg);
      }
    }

    updateControlPoints(chartArea, indexAxis) {
      const me = this;
      const options = me.options;

      if ((options.tension || options.cubicInterpolationMode === 'monotone') && !options.stepped && !me._pointsUpdated) {
        const loop = options.spanGaps ? me._loop : me._fullLoop;

        _updateBezierControlPoints(me._points, options, chartArea, loop, indexAxis);

        me._pointsUpdated = true;
      }
    }

    set points(points) {
      const me = this;
      me._points = points;
      delete me._segments;
      delete me._path;
      me._pointsUpdated = false;
    }

    get points() {
      return this._points;
    }

    get segments() {
      return this._segments || (this._segments = _computeSegments(this, this.options.segment));
    }

    first() {
      const segments = this.segments;
      const points = this.points;
      return segments.length && points[segments[0].start];
    }

    last() {
      const segments = this.segments;
      const points = this.points;
      const count = segments.length;
      return count && points[segments[count - 1].end];
    }

    interpolate(point, property) {
      const me = this;
      const options = me.options;
      const value = point[property];
      const points = me.points;

      const segments = _boundSegments(me, {
        property,
        start: value,
        end: value
      });

      if (!segments.length) {
        return;
      }

      const result = [];

      const _interpolate = _getInterpolationMethod(options);

      let i, ilen;

      for (i = 0, ilen = segments.length; i < ilen; ++i) {
        const {
          start,
          end
        } = segments[i];
        const p1 = points[start];
        const p2 = points[end];

        if (p1 === p2) {
          result.push(p1);
          continue;
        }

        const t = Math.abs((value - p1[property]) / (p2[property] - p1[property]));

        const interpolated = _interpolate(p1, p2, t, options.stepped);

        interpolated[property] = point[property];
        result.push(interpolated);
      }

      return result.length === 1 ? result[0] : result;
    }

    pathSegment(ctx, segment, params) {
      const segmentMethod = _getSegmentMethod(this);

      return segmentMethod(ctx, this, segment, params);
    }

    path(ctx, start, count) {
      const me = this;
      const segments = me.segments;

      const segmentMethod = _getSegmentMethod(me);

      let loop = me._loop;
      start = start || 0;
      count = count || me.points.length - start;

      for (const segment of segments) {
        loop &= segmentMethod(ctx, me, segment, {
          start,
          end: start + count - 1
        });
      }

      return !!loop;
    }

    draw(ctx, chartArea, start, count) {
      const me = this;
      const options = me.options || {};
      const points = me.points || [];

      if (!points.length || !options.borderWidth) {
        return;
      }

      ctx.save();
      draw(ctx, me, start, count);
      ctx.restore();

      if (me.animated) {
        me._pointsUpdated = false;
        me._path = undefined;
      }
    }

  }

  LineElement.id = 'line';
  LineElement.defaults = {
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: 'miter',
    borderWidth: 3,
    capBezierPoints: true,
    cubicInterpolationMode: 'default',
    fill: false,
    spanGaps: false,
    stepped: false,
    tension: 0
  };
  LineElement.defaultRoutes = {
    backgroundColor: 'backgroundColor',
    borderColor: 'borderColor'
  };
  LineElement.descriptors = {
    _scriptable: true,
    _indexable: name => name !== 'borderDash' && name !== 'fill'
  };

  function inRange$1(el, pos, axis, useFinalPosition) {
    const options = el.options;
    const {
      [axis]: value
    } = el.getProps([axis], useFinalPosition);
    return Math.abs(pos - value) < options.radius + options.hitRadius;
  }

  class PointElement extends Element {
    constructor(cfg) {
      super();
      this.options = undefined;
      this.parsed = undefined;
      this.skip = undefined;
      this.stop = undefined;

      if (cfg) {
        Object.assign(this, cfg);
      }
    }

    inRange(mouseX, mouseY, useFinalPosition) {
      const options = this.options;
      const {
        x,
        y
      } = this.getProps(['x', 'y'], useFinalPosition);
      return Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2) < Math.pow(options.hitRadius + options.radius, 2);
    }

    inXRange(mouseX, useFinalPosition) {
      return inRange$1(this, mouseX, 'x', useFinalPosition);
    }

    inYRange(mouseY, useFinalPosition) {
      return inRange$1(this, mouseY, 'y', useFinalPosition);
    }

    getCenterPoint(useFinalPosition) {
      const {
        x,
        y
      } = this.getProps(['x', 'y'], useFinalPosition);
      return {
        x,
        y
      };
    }

    size(options) {
      options = options || this.options || {};
      let radius = options.radius || 0;
      radius = Math.max(radius, radius && options.hoverRadius || 0);
      const borderWidth = radius && options.borderWidth || 0;
      return (radius + borderWidth) * 2;
    }

    draw(ctx) {
      const me = this;
      const options = me.options;

      if (me.skip || options.radius < 0.1) {
        return;
      }

      ctx.strokeStyle = options.borderColor;
      ctx.lineWidth = options.borderWidth;
      ctx.fillStyle = options.backgroundColor;
      drawPoint(ctx, options, me.x, me.y);
    }

    getRange() {
      const options = this.options || {};
      return options.radius + options.hitRadius;
    }

  }

  PointElement.id = 'point';
  PointElement.defaults = {
    borderWidth: 1,
    hitRadius: 1,
    hoverBorderWidth: 1,
    hoverRadius: 4,
    pointStyle: 'circle',
    radius: 3,
    rotation: 0
  };
  PointElement.defaultRoutes = {
    backgroundColor: 'backgroundColor',
    borderColor: 'borderColor'
  };

  function getBarBounds(bar, useFinalPosition) {
    const {
      x,
      y,
      base,
      width,
      height
    } = bar.getProps(['x', 'y', 'base', 'width', 'height'], useFinalPosition);
    let left, right, top, bottom, half;

    if (bar.horizontal) {
      half = height / 2;
      left = Math.min(x, base);
      right = Math.max(x, base);
      top = y - half;
      bottom = y + half;
    } else {
      half = width / 2;
      left = x - half;
      right = x + half;
      top = Math.min(y, base);
      bottom = Math.max(y, base);
    }

    return {
      left,
      top,
      right,
      bottom
    };
  }

  function parseBorderSkipped(bar) {
    let edge = bar.options.borderSkipped;
    const res = {};

    if (!edge) {
      return res;
    }

    edge = bar.horizontal ? parseEdge(edge, 'left', 'right', bar.base > bar.x) : parseEdge(edge, 'bottom', 'top', bar.base < bar.y);
    res[edge] = true;
    return res;
  }

  function parseEdge(edge, a, b, reverse) {
    if (reverse) {
      edge = swap(edge, a, b);
      edge = startEnd(edge, b, a);
    } else {
      edge = startEnd(edge, a, b);
    }

    return edge;
  }

  function swap(orig, v1, v2) {
    return orig === v1 ? v2 : orig === v2 ? v1 : orig;
  }

  function startEnd(v, start, end) {
    return v === 'start' ? start : v === 'end' ? end : v;
  }

  function skipOrLimit(skip, value, min, max) {
    return skip ? 0 : Math.max(Math.min(value, max), min);
  }

  function parseBorderWidth(bar, maxW, maxH) {
    const value = bar.options.borderWidth;
    const skip = parseBorderSkipped(bar);
    const o = toTRBL(value);
    return {
      t: skipOrLimit(skip.top, o.top, 0, maxH),
      r: skipOrLimit(skip.right, o.right, 0, maxW),
      b: skipOrLimit(skip.bottom, o.bottom, 0, maxH),
      l: skipOrLimit(skip.left, o.left, 0, maxW)
    };
  }

  function parseBorderRadius(bar, maxW, maxH) {
    const {
      enableBorderRadius
    } = bar.getProps(['enableBorderRadius']);
    const value = bar.options.borderRadius;
    const o = toTRBLCorners(value);
    const maxR = Math.min(maxW, maxH);
    const skip = parseBorderSkipped(bar);
    const enableBorder = enableBorderRadius || isObject(value);
    return {
      topLeft: skipOrLimit(!enableBorder || skip.top || skip.left, o.topLeft, 0, maxR),
      topRight: skipOrLimit(!enableBorder || skip.top || skip.right, o.topRight, 0, maxR),
      bottomLeft: skipOrLimit(!enableBorder || skip.bottom || skip.left, o.bottomLeft, 0, maxR),
      bottomRight: skipOrLimit(!enableBorder || skip.bottom || skip.right, o.bottomRight, 0, maxR)
    };
  }

  function boundingRects(bar) {
    const bounds = getBarBounds(bar);
    const width = bounds.right - bounds.left;
    const height = bounds.bottom - bounds.top;
    const border = parseBorderWidth(bar, width / 2, height / 2);
    const radius = parseBorderRadius(bar, width / 2, height / 2);
    return {
      outer: {
        x: bounds.left,
        y: bounds.top,
        w: width,
        h: height,
        radius
      },
      inner: {
        x: bounds.left + border.l,
        y: bounds.top + border.t,
        w: width - border.l - border.r,
        h: height - border.t - border.b,
        radius: {
          topLeft: Math.max(0, radius.topLeft - Math.max(border.t, border.l)),
          topRight: Math.max(0, radius.topRight - Math.max(border.t, border.r)),
          bottomLeft: Math.max(0, radius.bottomLeft - Math.max(border.b, border.l)),
          bottomRight: Math.max(0, radius.bottomRight - Math.max(border.b, border.r))
        }
      }
    };
  }

  function inRange(bar, x, y, useFinalPosition) {
    const skipX = x === null;
    const skipY = y === null;
    const skipBoth = skipX && skipY;
    const bounds = bar && !skipBoth && getBarBounds(bar, useFinalPosition);
    return bounds && (skipX || x >= bounds.left && x <= bounds.right) && (skipY || y >= bounds.top && y <= bounds.bottom);
  }

  function hasRadius(radius) {
    return radius.topLeft || radius.topRight || radius.bottomLeft || radius.bottomRight;
  }

  function addNormalRectPath(ctx, rect) {
    ctx.rect(rect.x, rect.y, rect.w, rect.h);
  }

  class BarElement extends Element {
    constructor(cfg) {
      super();
      this.options = undefined;
      this.horizontal = undefined;
      this.base = undefined;
      this.width = undefined;
      this.height = undefined;

      if (cfg) {
        Object.assign(this, cfg);
      }
    }

    draw(ctx) {
      const options = this.options;
      const {
        inner,
        outer
      } = boundingRects(this);
      const addRectPath = hasRadius(outer.radius) ? addRoundedRectPath : addNormalRectPath;
      ctx.save();

      if (outer.w !== inner.w || outer.h !== inner.h) {
        ctx.beginPath();
        addRectPath(ctx, outer);
        ctx.clip();
        addRectPath(ctx, inner);
        ctx.fillStyle = options.borderColor;
        ctx.fill('evenodd');
      }

      ctx.beginPath();
      addRectPath(ctx, inner);
      ctx.fillStyle = options.backgroundColor;
      ctx.fill();
      ctx.restore();
    }

    inRange(mouseX, mouseY, useFinalPosition) {
      return inRange(this, mouseX, mouseY, useFinalPosition);
    }

    inXRange(mouseX, useFinalPosition) {
      return inRange(this, mouseX, null, useFinalPosition);
    }

    inYRange(mouseY, useFinalPosition) {
      return inRange(this, null, mouseY, useFinalPosition);
    }

    getCenterPoint(useFinalPosition) {
      const {
        x,
        y,
        base,
        horizontal
      } = this.getProps(['x', 'y', 'base', 'horizontal'], useFinalPosition);
      return {
        x: horizontal ? (x + base) / 2 : x,
        y: horizontal ? y : (y + base) / 2
      };
    }

    getRange(axis) {
      return axis === 'x' ? this.width / 2 : this.height / 2;
    }

  }

  BarElement.id = 'bar';
  BarElement.defaults = {
    borderSkipped: 'start',
    borderWidth: 0,
    borderRadius: 0,
    enableBorderRadius: true,
    pointStyle: undefined
  };
  BarElement.defaultRoutes = {
    backgroundColor: 'backgroundColor',
    borderColor: 'borderColor'
  };
  var elements = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ArcElement: ArcElement,
    LineElement: LineElement,
    PointElement: PointElement,
    BarElement: BarElement
  });

  function lttbDecimation(data, start, count, availableWidth, options) {
    const samples = options.samples || availableWidth;

    if (samples >= count) {
      return data.slice(start, start + count);
    }

    const decimated = [];
    const bucketWidth = (count - 2) / (samples - 2);
    let sampledIndex = 0;
    const endIndex = start + count - 1;
    let a = start;
    let i, maxAreaPoint, maxArea, area, nextA;
    decimated[sampledIndex++] = data[a];

    for (i = 0; i < samples - 2; i++) {
      let avgX = 0;
      let avgY = 0;
      let j;
      const avgRangeStart = Math.floor((i + 1) * bucketWidth) + 1 + start;
      const avgRangeEnd = Math.min(Math.floor((i + 2) * bucketWidth) + 1, count) + start;
      const avgRangeLength = avgRangeEnd - avgRangeStart;

      for (j = avgRangeStart; j < avgRangeEnd; j++) {
        avgX += data[j].x;
        avgY += data[j].y;
      }

      avgX /= avgRangeLength;
      avgY /= avgRangeLength;
      const rangeOffs = Math.floor(i * bucketWidth) + 1 + start;
      const rangeTo = Math.floor((i + 1) * bucketWidth) + 1 + start;
      const {
        x: pointAx,
        y: pointAy
      } = data[a];
      maxArea = area = -1;

      for (j = rangeOffs; j < rangeTo; j++) {
        area = 0.5 * Math.abs((pointAx - avgX) * (data[j].y - pointAy) - (pointAx - data[j].x) * (avgY - pointAy));

        if (area > maxArea) {
          maxArea = area;
          maxAreaPoint = data[j];
          nextA = j;
        }
      }

      decimated[sampledIndex++] = maxAreaPoint;
      a = nextA;
    }

    decimated[sampledIndex++] = data[endIndex];
    return decimated;
  }

  function minMaxDecimation(data, start, count, availableWidth) {
    let avgX = 0;
    let countX = 0;
    let i, point, x, y, prevX, minIndex, maxIndex, startIndex, minY, maxY;
    const decimated = [];
    const endIndex = start + count - 1;
    const xMin = data[start].x;
    const xMax = data[endIndex].x;
    const dx = xMax - xMin;

    for (i = start; i < start + count; ++i) {
      point = data[i];
      x = (point.x - xMin) / dx * availableWidth;
      y = point.y;
      const truncX = x | 0;

      if (truncX === prevX) {
        if (y < minY) {
          minY = y;
          minIndex = i;
        } else if (y > maxY) {
          maxY = y;
          maxIndex = i;
        }

        avgX = (countX * avgX + point.x) / ++countX;
      } else {
        const lastIndex = i - 1;

        if (!isNullOrUndef(minIndex) && !isNullOrUndef(maxIndex)) {
          const intermediateIndex1 = Math.min(minIndex, maxIndex);
          const intermediateIndex2 = Math.max(minIndex, maxIndex);

          if (intermediateIndex1 !== startIndex && intermediateIndex1 !== lastIndex) {
            decimated.push({ ...data[intermediateIndex1],
              x: avgX
            });
          }

          if (intermediateIndex2 !== startIndex && intermediateIndex2 !== lastIndex) {
            decimated.push({ ...data[intermediateIndex2],
              x: avgX
            });
          }
        }

        if (i > 0 && lastIndex !== startIndex) {
          decimated.push(data[lastIndex]);
        }

        decimated.push(point);
        prevX = truncX;
        countX = 0;
        minY = maxY = y;
        minIndex = maxIndex = startIndex = i;
      }
    }

    return decimated;
  }

  function cleanDecimatedDataset(dataset) {
    if (dataset._decimated) {
      const data = dataset._data;
      delete dataset._decimated;
      delete dataset._data;
      Object.defineProperty(dataset, 'data', {
        value: data
      });
    }
  }

  function cleanDecimatedData(chart) {
    chart.data.datasets.forEach(dataset => {
      cleanDecimatedDataset(dataset);
    });
  }

  function getStartAndCountOfVisiblePointsSimplified(meta, points) {
    const pointCount = points.length;
    let start = 0;
    let count;
    const {
      iScale
    } = meta;
    const {
      min,
      max,
      minDefined,
      maxDefined
    } = iScale.getUserBounds();

    if (minDefined) {
      start = _limitValue(_lookupByKey(points, iScale.axis, min).lo, 0, pointCount - 1);
    }

    if (maxDefined) {
      count = _limitValue(_lookupByKey(points, iScale.axis, max).hi + 1, start, pointCount) - start;
    } else {
      count = pointCount - start;
    }

    return {
      start,
      count
    };
  }

  var plugin_decimation = {
    id: 'decimation',
    defaults: {
      algorithm: 'min-max',
      enabled: false
    },
    beforeElementsUpdate: (chart, args, options) => {
      if (!options.enabled) {
        cleanDecimatedData(chart);
        return;
      }

      const availableWidth = chart.width;
      chart.data.datasets.forEach((dataset, datasetIndex) => {
        const {
          _data,
          indexAxis
        } = dataset;
        const meta = chart.getDatasetMeta(datasetIndex);
        const data = _data || dataset.data;

        if (resolve([indexAxis, chart.options.indexAxis]) === 'y') {
          return;
        }

        if (meta.type !== 'line') {
          return;
        }

        const xAxis = chart.scales[meta.xAxisID];

        if (xAxis.type !== 'linear' && xAxis.type !== 'time') {
          return;
        }

        if (chart.options.parsing) {
          return;
        }

        let {
          start,
          count
        } = getStartAndCountOfVisiblePointsSimplified(meta, data);

        if (count <= 4 * availableWidth) {
          cleanDecimatedDataset(dataset);
          return;
        }

        if (isNullOrUndef(_data)) {
          dataset._data = data;
          delete dataset.data;
          Object.defineProperty(dataset, 'data', {
            configurable: true,
            enumerable: true,
            get: function () {
              return this._decimated;
            },
            set: function (d) {
              this._data = d;
            }
          });
        }

        let decimated;

        switch (options.algorithm) {
          case 'lttb':
            decimated = lttbDecimation(data, start, count, availableWidth, options);
            break;

          case 'min-max':
            decimated = minMaxDecimation(data, start, count, availableWidth);
            break;

          default:
            throw new Error(`Unsupported decimation algorithm '${options.algorithm}'`);
        }

        dataset._decimated = decimated;
      });
    },

    destroy(chart) {
      cleanDecimatedData(chart);
    }

  };

  function getLineByIndex(chart, index) {
    const meta = chart.getDatasetMeta(index);
    const visible = meta && chart.isDatasetVisible(index);
    return visible ? meta.dataset : null;
  }

  function parseFillOption(line) {
    const options = line.options;
    const fillOption = options.fill;
    let fill = valueOrDefault(fillOption && fillOption.target, fillOption);

    if (fill === undefined) {
      fill = !!options.backgroundColor;
    }

    if (fill === false || fill === null) {
      return false;
    }

    if (fill === true) {
      return 'origin';
    }

    return fill;
  }

  function decodeFill(line, index, count) {
    const fill = parseFillOption(line);

    if (isObject(fill)) {
      return isNaN(fill.value) ? false : fill;
    }

    let target = parseFloat(fill);

    if (isNumberFinite(target) && Math.floor(target) === target) {
      if (fill[0] === '-' || fill[0] === '+') {
        target = index + target;
      }

      if (target === index || target < 0 || target >= count) {
        return false;
      }

      return target;
    }

    return ['origin', 'start', 'end', 'stack'].indexOf(fill) >= 0 && fill;
  }

  function computeLinearBoundary(source) {
    const {
      scale = {},
      fill
    } = source;
    let target = null;
    let horizontal;

    if (fill === 'start') {
      target = scale.bottom;
    } else if (fill === 'end') {
      target = scale.top;
    } else if (isObject(fill)) {
      target = scale.getPixelForValue(fill.value);
    } else if (scale.getBasePixel) {
      target = scale.getBasePixel();
    }

    if (isNumberFinite(target)) {
      horizontal = scale.isHorizontal();
      return {
        x: horizontal ? target : null,
        y: horizontal ? null : target
      };
    }

    return null;
  }

  class simpleArc {
    constructor(opts) {
      this.x = opts.x;
      this.y = opts.y;
      this.radius = opts.radius;
    }

    pathSegment(ctx, bounds, opts) {
      const {
        x,
        y,
        radius
      } = this;
      bounds = bounds || {
        start: 0,
        end: TAU
      };
      ctx.arc(x, y, radius, bounds.end, bounds.start, true);
      return !opts.bounds;
    }

    interpolate(point) {
      const {
        x,
        y,
        radius
      } = this;
      const angle = point.angle;
      return {
        x: x + Math.cos(angle) * radius,
        y: y + Math.sin(angle) * radius,
        angle
      };
    }

  }

  function computeCircularBoundary(source) {
    const {
      scale,
      fill
    } = source;
    const options = scale.options;
    const length = scale.getLabels().length;
    const target = [];
    const start = options.reverse ? scale.max : scale.min;
    const end = options.reverse ? scale.min : scale.max;
    let i, center, value;

    if (fill === 'start') {
      value = start;
    } else if (fill === 'end') {
      value = end;
    } else if (isObject(fill)) {
      value = fill.value;
    } else {
      value = scale.getBaseValue();
    }

    if (options.grid.circular) {
      center = scale.getPointPositionForValue(0, start);
      return new simpleArc({
        x: center.x,
        y: center.y,
        radius: scale.getDistanceFromCenterForValue(value)
      });
    }

    for (i = 0; i < length; ++i) {
      target.push(scale.getPointPositionForValue(i, value));
    }

    return target;
  }

  function computeBoundary(source) {
    const scale = source.scale || {};

    if (scale.getPointPositionForValue) {
      return computeCircularBoundary(source);
    }

    return computeLinearBoundary(source);
  }

  function findSegmentEnd(start, end, points) {
    for (; end > start; end--) {
      const point = points[end];

      if (!isNaN(point.x) && !isNaN(point.y)) {
        break;
      }
    }

    return end;
  }

  function pointsFromSegments(boundary, line) {
    const {
      x = null,
      y = null
    } = boundary || {};
    const linePoints = line.points;
    const points = [];
    line.segments.forEach(({
      start,
      end
    }) => {
      end = findSegmentEnd(start, end, linePoints);
      const first = linePoints[start];
      const last = linePoints[end];

      if (y !== null) {
        points.push({
          x: first.x,
          y
        });
        points.push({
          x: last.x,
          y
        });
      } else if (x !== null) {
        points.push({
          x,
          y: first.y
        });
        points.push({
          x,
          y: last.y
        });
      }
    });
    return points;
  }

  function buildStackLine(source) {
    const {
      chart,
      scale,
      index,
      line
    } = source;
    const points = [];
    const segments = line.segments;
    const sourcePoints = line.points;
    const linesBelow = getLinesBelow(chart, index);
    linesBelow.push(createBoundaryLine({
      x: null,
      y: scale.bottom
    }, line));

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];

      for (let j = segment.start; j <= segment.end; j++) {
        addPointsBelow(points, sourcePoints[j], linesBelow);
      }
    }

    return new LineElement({
      points,
      options: {}
    });
  }

  const isLineAndNotInHideAnimation = meta => meta.type === 'line' && !meta.hidden;

  function getLinesBelow(chart, index) {
    const below = [];
    const metas = chart.getSortedVisibleDatasetMetas();

    for (let i = 0; i < metas.length; i++) {
      const meta = metas[i];

      if (meta.index === index) {
        break;
      }

      if (isLineAndNotInHideAnimation(meta)) {
        below.unshift(meta.dataset);
      }
    }

    return below;
  }

  function addPointsBelow(points, sourcePoint, linesBelow) {
    const postponed = [];

    for (let j = 0; j < linesBelow.length; j++) {
      const line = linesBelow[j];
      const {
        first,
        last,
        point
      } = findPoint(line, sourcePoint, 'x');

      if (!point || first && last) {
        continue;
      }

      if (first) {
        postponed.unshift(point);
      } else {
        points.push(point);

        if (!last) {
          break;
        }
      }
    }

    points.push(...postponed);
  }

  function findPoint(line, sourcePoint, property) {
    const point = line.interpolate(sourcePoint, property);

    if (!point) {
      return {};
    }

    const pointValue = point[property];
    const segments = line.segments;
    const linePoints = line.points;
    let first = false;
    let last = false;

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const firstValue = linePoints[segment.start][property];
      const lastValue = linePoints[segment.end][property];

      if (pointValue >= firstValue && pointValue <= lastValue) {
        first = pointValue === firstValue;
        last = pointValue === lastValue;
        break;
      }
    }

    return {
      first,
      last,
      point
    };
  }

  function getTarget(source) {
    const {
      chart,
      fill,
      line
    } = source;

    if (isNumberFinite(fill)) {
      return getLineByIndex(chart, fill);
    }

    if (fill === 'stack') {
      return buildStackLine(source);
    }

    const boundary = computeBoundary(source);

    if (boundary instanceof simpleArc) {
      return boundary;
    }

    return createBoundaryLine(boundary, line);
  }

  function createBoundaryLine(boundary, line) {
    let points = [];
    let _loop = false;

    if (isArray(boundary)) {
      _loop = true;
      points = boundary;
    } else {
      points = pointsFromSegments(boundary, line);
    }

    return points.length ? new LineElement({
      points,
      options: {
        tension: 0
      },
      _loop,
      _fullLoop: _loop
    }) : null;
  }

  function resolveTarget(sources, index, propagate) {
    const source = sources[index];
    let fill = source.fill;
    const visited = [index];
    let target;

    if (!propagate) {
      return fill;
    }

    while (fill !== false && visited.indexOf(fill) === -1) {
      if (!isNumberFinite(fill)) {
        return fill;
      }

      target = sources[fill];

      if (!target) {
        return false;
      }

      if (target.visible) {
        return fill;
      }

      visited.push(fill);
      fill = target.fill;
    }

    return false;
  }

  function _clip(ctx, target, clipY) {
    ctx.beginPath();
    target.path(ctx);
    ctx.lineTo(target.last().x, clipY);
    ctx.lineTo(target.first().x, clipY);
    ctx.closePath();
    ctx.clip();
  }

  function getBounds(property, first, last, loop) {
    if (loop) {
      return;
    }

    let start = first[property];
    let end = last[property];

    if (property === 'angle') {
      start = _normalizeAngle(start);
      end = _normalizeAngle(end);
    }

    return {
      property,
      start,
      end
    };
  }

  function _getEdge(a, b, prop, fn) {
    if (a && b) {
      return fn(a[prop], b[prop]);
    }

    return a ? a[prop] : b ? b[prop] : 0;
  }

  function _segments(line, target, property) {
    const segments = line.segments;
    const points = line.points;
    const tpoints = target.points;
    const parts = [];

    for (const segment of segments) {
      let {
        start,
        end
      } = segment;
      end = findSegmentEnd(start, end, points);
      const bounds = getBounds(property, points[start], points[end], segment.loop);

      if (!target.segments) {
        parts.push({
          source: segment,
          target: bounds,
          start: points[start],
          end: points[end]
        });
        continue;
      }

      const targetSegments = _boundSegments(target, bounds);

      for (const tgt of targetSegments) {
        const subBounds = getBounds(property, tpoints[tgt.start], tpoints[tgt.end], tgt.loop);

        const fillSources = _boundSegment(segment, points, subBounds);

        for (const fillSource of fillSources) {
          parts.push({
            source: fillSource,
            target: tgt,
            start: {
              [property]: _getEdge(bounds, subBounds, 'start', Math.max)
            },
            end: {
              [property]: _getEdge(bounds, subBounds, 'end', Math.min)
            }
          });
        }
      }
    }

    return parts;
  }

  function clipBounds(ctx, scale, bounds) {
    const {
      top,
      bottom
    } = scale.chart.chartArea;
    const {
      property,
      start,
      end
    } = bounds || {};

    if (property === 'x') {
      ctx.beginPath();
      ctx.rect(start, top, end - start, bottom - top);
      ctx.clip();
    }
  }

  function interpolatedLineTo(ctx, target, point, property) {
    const interpolatedPoint = target.interpolate(point, property);

    if (interpolatedPoint) {
      ctx.lineTo(interpolatedPoint.x, interpolatedPoint.y);
    }
  }

  function _fill(ctx, cfg) {
    const {
      line,
      target,
      property,
      color,
      scale
    } = cfg;

    const segments = _segments(line, target, property);

    for (const {
      source: src,
      target: tgt,
      start,
      end
    } of segments) {
      const {
        style: {
          backgroundColor = color
        } = {}
      } = src;
      ctx.save();
      ctx.fillStyle = backgroundColor;
      clipBounds(ctx, scale, getBounds(property, start, end));
      ctx.beginPath();
      const lineLoop = !!line.pathSegment(ctx, src);

      if (lineLoop) {
        ctx.closePath();
      } else {
        interpolatedLineTo(ctx, target, end, property);
      }

      const targetLoop = !!target.pathSegment(ctx, tgt, {
        move: lineLoop,
        reverse: true
      });
      const loop = lineLoop && targetLoop;

      if (!loop) {
        interpolatedLineTo(ctx, target, start, property);
      }

      ctx.closePath();
      ctx.fill(loop ? 'evenodd' : 'nonzero');
      ctx.restore();
    }
  }

  function doFill(ctx, cfg) {
    const {
      line,
      target,
      above,
      below,
      area,
      scale
    } = cfg;
    const property = line._loop ? 'angle' : cfg.axis;
    ctx.save();

    if (property === 'x' && below !== above) {
      _clip(ctx, target, area.top);

      _fill(ctx, {
        line,
        target,
        color: above,
        scale,
        property
      });

      ctx.restore();
      ctx.save();

      _clip(ctx, target, area.bottom);
    }

    _fill(ctx, {
      line,
      target,
      color: below,
      scale,
      property
    });

    ctx.restore();
  }

  function drawfill(ctx, source, area) {
    const target = getTarget(source);
    const {
      line,
      scale,
      axis
    } = source;
    const lineOpts = line.options;
    const fillOption = lineOpts.fill;
    const color = lineOpts.backgroundColor;
    const {
      above = color,
      below = color
    } = fillOption || {};

    if (target && line.points.length) {
      clipArea(ctx, area);
      doFill(ctx, {
        line,
        target,
        above,
        below,
        area,
        scale,
        axis
      });
      unclipArea(ctx);
    }
  }

  var plugin_filler = {
    id: 'filler',

    afterDatasetsUpdate(chart, _args, options) {
      const count = (chart.data.datasets || []).length;
      const sources = [];
      let meta, i, line, source;

      for (i = 0; i < count; ++i) {
        meta = chart.getDatasetMeta(i);
        line = meta.dataset;
        source = null;

        if (line && line.options && line instanceof LineElement) {
          source = {
            visible: chart.isDatasetVisible(i),
            index: i,
            fill: decodeFill(line, i, count),
            chart,
            axis: meta.controller.options.indexAxis,
            scale: meta.vScale,
            line
          };
        }

        meta.$filler = source;
        sources.push(source);
      }

      for (i = 0; i < count; ++i) {
        source = sources[i];

        if (!source || source.fill === false) {
          continue;
        }

        source.fill = resolveTarget(sources, i, options.propagate);
      }
    },

    beforeDraw(chart, _args, options) {
      const draw = options.drawTime === 'beforeDraw';
      const metasets = chart.getSortedVisibleDatasetMetas();
      const area = chart.chartArea;

      for (let i = metasets.length - 1; i >= 0; --i) {
        const source = metasets[i].$filler;

        if (!source) {
          continue;
        }

        source.line.updateControlPoints(area, source.axis);

        if (draw) {
          drawfill(chart.ctx, source, area);
        }
      }
    },

    beforeDatasetsDraw(chart, _args, options) {
      if (options.drawTime !== 'beforeDatasetsDraw') {
        return;
      }

      const metasets = chart.getSortedVisibleDatasetMetas();

      for (let i = metasets.length - 1; i >= 0; --i) {
        const source = metasets[i].$filler;

        if (source) {
          drawfill(chart.ctx, source, chart.chartArea);
        }
      }
    },

    beforeDatasetDraw(chart, args, options) {
      const source = args.meta.$filler;

      if (!source || source.fill === false || options.drawTime !== 'beforeDatasetDraw') {
        return;
      }

      drawfill(chart.ctx, source, chart.chartArea);
    },

    defaults: {
      propagate: true,
      drawTime: 'beforeDatasetDraw'
    }
  };

  const getBoxSize = (labelOpts, fontSize) => {
    let {
      boxHeight = fontSize,
      boxWidth = fontSize
    } = labelOpts;

    if (labelOpts.usePointStyle) {
      boxHeight = Math.min(boxHeight, fontSize);
      boxWidth = Math.min(boxWidth, fontSize);
    }

    return {
      boxWidth,
      boxHeight,
      itemHeight: Math.max(fontSize, boxHeight)
    };
  };

  const itemsEqual = (a, b) => a !== null && b !== null && a.datasetIndex === b.datasetIndex && a.index === b.index;

  class Legend extends Element {
    constructor(config) {
      super();
      this._added = false;
      this.legendHitBoxes = [];
      this._hoveredItem = null;
      this.doughnutMode = false;
      this.chart = config.chart;
      this.options = config.options;
      this.ctx = config.ctx;
      this.legendItems = undefined;
      this.columnSizes = undefined;
      this.lineWidths = undefined;
      this.maxHeight = undefined;
      this.maxWidth = undefined;
      this.top = undefined;
      this.bottom = undefined;
      this.left = undefined;
      this.right = undefined;
      this.height = undefined;
      this.width = undefined;
      this._margins = undefined;
      this.position = undefined;
      this.weight = undefined;
      this.fullSize = undefined;
    }

    update(maxWidth, maxHeight, margins) {
      const me = this;
      me.maxWidth = maxWidth;
      me.maxHeight = maxHeight;
      me._margins = margins;
      me.setDimensions();
      me.buildLabels();
      me.fit();
    }

    setDimensions() {
      const me = this;

      if (me.isHorizontal()) {
        me.width = me.maxWidth;
        me.left = me._margins.left;
        me.right = me.width;
      } else {
        me.height = me.maxHeight;
        me.top = me._margins.top;
        me.bottom = me.height;
      }
    }

    buildLabels() {
      const me = this;
      const labelOpts = me.options.labels || {};
      let legendItems = callback(labelOpts.generateLabels, [me.chart], me) || [];

      if (labelOpts.filter) {
        legendItems = legendItems.filter(item => labelOpts.filter(item, me.chart.data));
      }

      if (labelOpts.sort) {
        legendItems = legendItems.sort((a, b) => labelOpts.sort(a, b, me.chart.data));
      }

      if (me.options.reverse) {
        legendItems.reverse();
      }

      me.legendItems = legendItems;
    }

    fit() {
      const me = this;
      const {
        options,
        ctx
      } = me;

      if (!options.display) {
        me.width = me.height = 0;
        return;
      }

      const labelOpts = options.labels;
      const labelFont = toFont(labelOpts.font);
      const fontSize = labelFont.size;

      const titleHeight = me._computeTitleHeight();

      const {
        boxWidth,
        itemHeight
      } = getBoxSize(labelOpts, fontSize);
      let width, height;
      ctx.font = labelFont.string;

      if (me.isHorizontal()) {
        width = me.maxWidth;
        height = me._fitRows(titleHeight, fontSize, boxWidth, itemHeight) + 10;
      } else {
        height = me.maxHeight;
        width = me._fitCols(titleHeight, fontSize, boxWidth, itemHeight) + 10;
      }

      me.width = Math.min(width, options.maxWidth || me.maxWidth);
      me.height = Math.min(height, options.maxHeight || me.maxHeight);
    }

    _fitRows(titleHeight, fontSize, boxWidth, itemHeight) {
      const me = this;
      const {
        ctx,
        maxWidth,
        options: {
          labels: {
            padding
          }
        }
      } = me;
      const hitboxes = me.legendHitBoxes = [];
      const lineWidths = me.lineWidths = [0];
      const lineHeight = itemHeight + padding;
      let totalHeight = titleHeight;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      let row = -1;
      let top = -lineHeight;
      me.legendItems.forEach((legendItem, i) => {
        const itemWidth = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;

        if (i === 0 || lineWidths[lineWidths.length - 1] + itemWidth + 2 * padding > maxWidth) {
          totalHeight += lineHeight;
          lineWidths[lineWidths.length - (i > 0 ? 0 : 1)] = 0;
          top += lineHeight;
          row++;
        }

        hitboxes[i] = {
          left: 0,
          top,
          row,
          width: itemWidth,
          height: itemHeight
        };
        lineWidths[lineWidths.length - 1] += itemWidth + padding;
      });
      return totalHeight;
    }

    _fitCols(titleHeight, fontSize, boxWidth, itemHeight) {
      const me = this;
      const {
        ctx,
        maxHeight,
        options: {
          labels: {
            padding
          }
        }
      } = me;
      const hitboxes = me.legendHitBoxes = [];
      const columnSizes = me.columnSizes = [];
      const heightLimit = maxHeight - titleHeight;
      let totalWidth = padding;
      let currentColWidth = 0;
      let currentColHeight = 0;
      let left = 0;
      let col = 0;
      me.legendItems.forEach((legendItem, i) => {
        const itemWidth = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;

        if (i > 0 && currentColHeight + itemHeight + 2 * padding > heightLimit) {
          totalWidth += currentColWidth + padding;
          columnSizes.push({
            width: currentColWidth,
            height: currentColHeight
          });
          left += currentColWidth + padding;
          col++;
          currentColWidth = currentColHeight = 0;
        }

        hitboxes[i] = {
          left,
          top: currentColHeight,
          col,
          width: itemWidth,
          height: itemHeight
        };
        currentColWidth = Math.max(currentColWidth, itemWidth);
        currentColHeight += itemHeight + padding;
      });
      totalWidth += currentColWidth;
      columnSizes.push({
        width: currentColWidth,
        height: currentColHeight
      });
      return totalWidth;
    }

    adjustHitBoxes() {
      const me = this;

      if (!me.options.display) {
        return;
      }

      const titleHeight = me._computeTitleHeight();

      const {
        legendHitBoxes: hitboxes,
        options: {
          align,
          labels: {
            padding
          },
          rtl
        }
      } = me;

      if (this.isHorizontal()) {
        let row = 0;

        let left = _alignStartEnd(align, me.left + padding, me.right - me.lineWidths[row]);

        for (const hitbox of hitboxes) {
          if (row !== hitbox.row) {
            row = hitbox.row;
            left = _alignStartEnd(align, me.left + padding, me.right - me.lineWidths[row]);
          }

          hitbox.top += me.top + titleHeight + padding;
          hitbox.left = left;
          left += hitbox.width + padding;
        }

        if (rtl) {
          const boxMap = hitboxes.reduce((map, box) => {
            map[box.row] = map[box.row] || [];
            map[box.row].push(box);
            return map;
          }, {});
          const newBoxes = [];
          Object.keys(boxMap).forEach(key => {
            boxMap[key].reverse();
            newBoxes.push(...boxMap[key]);
          });
          me.legendHitBoxes = newBoxes;
        }
      } else {
        let col = 0;

        let top = _alignStartEnd(align, me.top + titleHeight + padding, me.bottom - me.columnSizes[col].height);

        for (const hitbox of hitboxes) {
          if (hitbox.col !== col) {
            col = hitbox.col;
            top = _alignStartEnd(align, me.top + titleHeight + padding, me.bottom - me.columnSizes[col].height);
          }

          hitbox.top = top;
          hitbox.left += me.left + padding;
          top += hitbox.height + padding;
        }
      }
    }

    isHorizontal() {
      return this.options.position === 'top' || this.options.position === 'bottom';
    }

    draw() {
      const me = this;

      if (me.options.display) {
        const ctx = me.ctx;
        clipArea(ctx, me);

        me._draw();

        unclipArea(ctx);
      }
    }

    _draw() {
      const me = this;
      const {
        options: opts,
        columnSizes,
        lineWidths,
        ctx
      } = me;
      const {
        align,
        labels: labelOpts
      } = opts;
      const defaultColor = defaults.color;
      const rtlHelper = getRtlAdapter(opts.rtl, me.left, me.width);
      const labelFont = toFont(labelOpts.font);
      const {
        color: fontColor,
        padding
      } = labelOpts;
      const fontSize = labelFont.size;
      const halfFontSize = fontSize / 2;
      let cursor;
      me.drawTitle();
      ctx.textAlign = rtlHelper.textAlign('left');
      ctx.textBaseline = 'middle';
      ctx.lineWidth = 0.5;
      ctx.font = labelFont.string;
      const {
        boxWidth,
        boxHeight,
        itemHeight
      } = getBoxSize(labelOpts, fontSize);

      const drawLegendBox = function (x, y, legendItem) {
        if (isNaN(boxWidth) || boxWidth <= 0 || isNaN(boxHeight) || boxHeight < 0) {
          return;
        }

        ctx.save();
        const lineWidth = valueOrDefault(legendItem.lineWidth, 1);
        ctx.fillStyle = valueOrDefault(legendItem.fillStyle, defaultColor);
        ctx.lineCap = valueOrDefault(legendItem.lineCap, 'butt');
        ctx.lineDashOffset = valueOrDefault(legendItem.lineDashOffset, 0);
        ctx.lineJoin = valueOrDefault(legendItem.lineJoin, 'miter');
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = valueOrDefault(legendItem.strokeStyle, defaultColor);
        ctx.setLineDash(valueOrDefault(legendItem.lineDash, []));

        if (labelOpts.usePointStyle) {
          const drawOptions = {
            radius: boxWidth * Math.SQRT2 / 2,
            pointStyle: legendItem.pointStyle,
            rotation: legendItem.rotation,
            borderWidth: lineWidth
          };
          const centerX = rtlHelper.xPlus(x, boxWidth / 2);
          const centerY = y + halfFontSize;
          drawPoint(ctx, drawOptions, centerX, centerY);
        } else {
          const yBoxTop = y + Math.max((fontSize - boxHeight) / 2, 0);
          const xBoxLeft = rtlHelper.leftForLtr(x, boxWidth);
          const borderRadius = toTRBLCorners(legendItem.borderRadius);
          ctx.beginPath();

          if (Object.values(borderRadius).some(v => v !== 0)) {
            addRoundedRectPath(ctx, {
              x: xBoxLeft,
              y: yBoxTop,
              w: boxWidth,
              h: boxHeight,
              radius: borderRadius
            });
          } else {
            ctx.rect(xBoxLeft, yBoxTop, boxWidth, boxHeight);
          }

          ctx.fill();

          if (lineWidth !== 0) {
            ctx.stroke();
          }
        }

        ctx.restore();
      };

      const fillText = function (x, y, legendItem) {
        renderText(ctx, legendItem.text, x, y + itemHeight / 2, labelFont, {
          strikethrough: legendItem.hidden,
          textAlign: rtlHelper.textAlign(legendItem.textAlign)
        });
      };

      const isHorizontal = me.isHorizontal();

      const titleHeight = this._computeTitleHeight();

      if (isHorizontal) {
        cursor = {
          x: _alignStartEnd(align, me.left + padding, me.right - lineWidths[0]),
          y: me.top + padding + titleHeight,
          line: 0
        };
      } else {
        cursor = {
          x: me.left + padding,
          y: _alignStartEnd(align, me.top + titleHeight + padding, me.bottom - columnSizes[0].height),
          line: 0
        };
      }

      overrideTextDirection(me.ctx, opts.textDirection);
      const lineHeight = itemHeight + padding;
      me.legendItems.forEach((legendItem, i) => {
        ctx.strokeStyle = legendItem.fontColor || fontColor;
        ctx.fillStyle = legendItem.fontColor || fontColor;
        const textWidth = ctx.measureText(legendItem.text).width;
        const textAlign = rtlHelper.textAlign(legendItem.textAlign || (legendItem.textAlign = labelOpts.textAlign));
        const width = boxWidth + halfFontSize + textWidth;
        let x = cursor.x;
        let y = cursor.y;
        rtlHelper.setWidth(me.width);

        if (isHorizontal) {
          if (i > 0 && x + width + padding > me.right) {
            y = cursor.y += lineHeight;
            cursor.line++;
            x = cursor.x = _alignStartEnd(align, me.left + padding, me.right - lineWidths[cursor.line]);
          }
        } else if (i > 0 && y + lineHeight > me.bottom) {
          x = cursor.x = x + columnSizes[cursor.line].width + padding;
          cursor.line++;
          y = cursor.y = _alignStartEnd(align, me.top + titleHeight + padding, me.bottom - columnSizes[cursor.line].height);
        }

        const realX = rtlHelper.x(x);
        drawLegendBox(realX, y, legendItem);
        x = _textX(textAlign, x + boxWidth + halfFontSize, isHorizontal ? x + width : me.right, opts.rtl);
        fillText(rtlHelper.x(x), y, legendItem);

        if (isHorizontal) {
          cursor.x += width + padding;
        } else {
          cursor.y += lineHeight;
        }
      });
      restoreTextDirection(me.ctx, opts.textDirection);
    }

    drawTitle() {
      const me = this;
      const opts = me.options;
      const titleOpts = opts.title;
      const titleFont = toFont(titleOpts.font);
      const titlePadding = toPadding(titleOpts.padding);

      if (!titleOpts.display) {
        return;
      }

      const rtlHelper = getRtlAdapter(opts.rtl, me.left, me.width);
      const ctx = me.ctx;
      const position = titleOpts.position;
      const halfFontSize = titleFont.size / 2;
      const topPaddingPlusHalfFontSize = titlePadding.top + halfFontSize;
      let y;
      let left = me.left;
      let maxWidth = me.width;

      if (this.isHorizontal()) {
        maxWidth = Math.max(...me.lineWidths);
        y = me.top + topPaddingPlusHalfFontSize;
        left = _alignStartEnd(opts.align, left, me.right - maxWidth);
      } else {
        const maxHeight = me.columnSizes.reduce((acc, size) => Math.max(acc, size.height), 0);
        y = topPaddingPlusHalfFontSize + _alignStartEnd(opts.align, me.top, me.bottom - maxHeight - opts.labels.padding - me._computeTitleHeight());
      }

      const x = _alignStartEnd(position, left, left + maxWidth);

      ctx.textAlign = rtlHelper.textAlign(_toLeftRightCenter(position));
      ctx.textBaseline = 'middle';
      ctx.strokeStyle = titleOpts.color;
      ctx.fillStyle = titleOpts.color;
      ctx.font = titleFont.string;
      renderText(ctx, titleOpts.text, x, y, titleFont);
    }

    _computeTitleHeight() {
      const titleOpts = this.options.title;
      const titleFont = toFont(titleOpts.font);
      const titlePadding = toPadding(titleOpts.padding);
      return titleOpts.display ? titleFont.lineHeight + titlePadding.height : 0;
    }

    _getLegendItemAt(x, y) {
      const me = this;
      let i, hitBox, lh;

      if (x >= me.left && x <= me.right && y >= me.top && y <= me.bottom) {
        lh = me.legendHitBoxes;

        for (i = 0; i < lh.length; ++i) {
          hitBox = lh[i];

          if (x >= hitBox.left && x <= hitBox.left + hitBox.width && y >= hitBox.top && y <= hitBox.top + hitBox.height) {
            return me.legendItems[i];
          }
        }
      }

      return null;
    }

    handleEvent(e) {
      const me = this;
      const opts = me.options;

      if (!isListened(e.type, opts)) {
        return;
      }

      const hoveredItem = me._getLegendItemAt(e.x, e.y);

      if (e.type === 'mousemove') {
        const previous = me._hoveredItem;
        const sameItem = itemsEqual(previous, hoveredItem);

        if (previous && !sameItem) {
          callback(opts.onLeave, [e, previous, me], me);
        }

        me._hoveredItem = hoveredItem;

        if (hoveredItem && !sameItem) {
          callback(opts.onHover, [e, hoveredItem, me], me);
        }
      } else if (hoveredItem) {
        callback(opts.onClick, [e, hoveredItem, me], me);
      }
    }

  }

  function isListened(type, opts) {
    if (type === 'mousemove' && (opts.onHover || opts.onLeave)) {
      return true;
    }

    if (opts.onClick && (type === 'click' || type === 'mouseup')) {
      return true;
    }

    return false;
  }

  var plugin_legend = {
    id: 'legend',
    _element: Legend,

    start(chart, _args, options) {
      const legend = chart.legend = new Legend({
        ctx: chart.ctx,
        options,
        chart
      });
      layouts.configure(chart, legend, options);
      layouts.addBox(chart, legend);
    },

    stop(chart) {
      layouts.removeBox(chart, chart.legend);
      delete chart.legend;
    },

    beforeUpdate(chart, _args, options) {
      const legend = chart.legend;
      layouts.configure(chart, legend, options);
      legend.options = options;
    },

    afterUpdate(chart) {
      const legend = chart.legend;
      legend.buildLabels();
      legend.adjustHitBoxes();
    },

    afterEvent(chart, args) {
      if (!args.replay) {
        chart.legend.handleEvent(args.event);
      }
    },

    defaults: {
      display: true,
      position: 'top',
      align: 'center',
      fullSize: true,
      reverse: false,
      weight: 1000,

      onClick(e, legendItem, legend) {
        const index = legendItem.datasetIndex;
        const ci = legend.chart;

        if (ci.isDatasetVisible(index)) {
          ci.hide(index);
          legendItem.hidden = true;
        } else {
          ci.show(index);
          legendItem.hidden = false;
        }
      },

      onHover: null,
      onLeave: null,
      labels: {
        color: ctx => ctx.chart.options.color,
        boxWidth: 40,
        padding: 10,

        generateLabels(chart) {
          const datasets = chart.data.datasets;
          const {
            labels: {
              usePointStyle,
              pointStyle,
              textAlign,
              color
            }
          } = chart.legend.options;
          return chart._getSortedDatasetMetas().map(meta => {
            const style = meta.controller.getStyle(usePointStyle ? 0 : undefined);
            const borderWidth = toPadding(style.borderWidth);
            return {
              text: datasets[meta.index].label,
              fillStyle: style.backgroundColor,
              fontColor: color,
              hidden: !meta.visible,
              lineCap: style.borderCapStyle,
              lineDash: style.borderDash,
              lineDashOffset: style.borderDashOffset,
              lineJoin: style.borderJoinStyle,
              lineWidth: (borderWidth.width + borderWidth.height) / 4,
              strokeStyle: style.borderColor,
              pointStyle: pointStyle || style.pointStyle,
              rotation: style.rotation,
              textAlign: textAlign || style.textAlign,
              borderRadius: 0,
              datasetIndex: meta.index
            };
          }, this);
        }

      },
      title: {
        color: ctx => ctx.chart.options.color,
        display: false,
        position: 'center',
        text: ''
      }
    },
    descriptors: {
      _scriptable: name => !name.startsWith('on'),
      labels: {
        _scriptable: name => !['generateLabels', 'filter', 'sort'].includes(name)
      }
    }
  };

  class Title extends Element {
    constructor(config) {
      super();
      this.chart = config.chart;
      this.options = config.options;
      this.ctx = config.ctx;
      this._padding = undefined;
      this.top = undefined;
      this.bottom = undefined;
      this.left = undefined;
      this.right = undefined;
      this.width = undefined;
      this.height = undefined;
      this.position = undefined;
      this.weight = undefined;
      this.fullSize = undefined;
    }

    update(maxWidth, maxHeight) {
      const me = this;
      const opts = me.options;
      me.left = 0;
      me.top = 0;

      if (!opts.display) {
        me.width = me.height = me.right = me.bottom = 0;
        return;
      }

      me.width = me.right = maxWidth;
      me.height = me.bottom = maxHeight;
      const lineCount = isArray(opts.text) ? opts.text.length : 1;
      me._padding = toPadding(opts.padding);

      const textSize = lineCount * toFont(opts.font).lineHeight + me._padding.height;

      if (me.isHorizontal()) {
        me.height = textSize;
      } else {
        me.width = textSize;
      }
    }

    isHorizontal() {
      const pos = this.options.position;
      return pos === 'top' || pos === 'bottom';
    }

    _drawArgs(offset) {
      const {
        top,
        left,
        bottom,
        right,
        options
      } = this;
      const align = options.align;
      let rotation = 0;
      let maxWidth, titleX, titleY;

      if (this.isHorizontal()) {
        titleX = _alignStartEnd(align, left, right);
        titleY = top + offset;
        maxWidth = right - left;
      } else {
        if (options.position === 'left') {
          titleX = left + offset;
          titleY = _alignStartEnd(align, bottom, top);
          rotation = PI * -0.5;
        } else {
          titleX = right - offset;
          titleY = _alignStartEnd(align, top, bottom);
          rotation = PI * 0.5;
        }

        maxWidth = bottom - top;
      }

      return {
        titleX,
        titleY,
        maxWidth,
        rotation
      };
    }

    draw() {
      const me = this;
      const ctx = me.ctx;
      const opts = me.options;

      if (!opts.display) {
        return;
      }

      const fontOpts = toFont(opts.font);
      const lineHeight = fontOpts.lineHeight;
      const offset = lineHeight / 2 + me._padding.top;

      const {
        titleX,
        titleY,
        maxWidth,
        rotation
      } = me._drawArgs(offset);

      renderText(ctx, opts.text, 0, 0, fontOpts, {
        color: opts.color,
        maxWidth,
        rotation,
        textAlign: _toLeftRightCenter(opts.align),
        textBaseline: 'middle',
        translation: [titleX, titleY]
      });
    }

  }

  function createTitle(chart, titleOpts) {
    const title = new Title({
      ctx: chart.ctx,
      options: titleOpts,
      chart
    });
    layouts.configure(chart, title, titleOpts);
    layouts.addBox(chart, title);
    chart.titleBlock = title;
  }

  var plugin_title = {
    id: 'title',
    _element: Title,

    start(chart, _args, options) {
      createTitle(chart, options);
    },

    stop(chart) {
      const titleBlock = chart.titleBlock;
      layouts.removeBox(chart, titleBlock);
      delete chart.titleBlock;
    },

    beforeUpdate(chart, _args, options) {
      const title = chart.titleBlock;
      layouts.configure(chart, title, options);
      title.options = options;
    },

    defaults: {
      align: 'center',
      display: false,
      font: {
        weight: 'bold'
      },
      fullSize: true,
      padding: 10,
      position: 'top',
      text: '',
      weight: 2000
    },
    defaultRoutes: {
      color: 'color'
    },
    descriptors: {
      _scriptable: true,
      _indexable: false
    }
  };
  const map = new WeakMap();
  var plugin_subtitle = {
    id: 'subtitle',

    start(chart, _args, options) {
      const title = new Title({
        ctx: chart.ctx,
        options,
        chart
      });
      layouts.configure(chart, title, options);
      layouts.addBox(chart, title);
      map.set(chart, title);
    },

    stop(chart) {
      layouts.removeBox(chart, map.get(chart));
      map.delete(chart);
    },

    beforeUpdate(chart, _args, options) {
      const title = map.get(chart);
      layouts.configure(chart, title, options);
      title.options = options;
    },

    defaults: {
      align: 'center',
      display: false,
      font: {
        weight: 'normal'
      },
      fullSize: true,
      padding: 0,
      position: 'top',
      text: '',
      weight: 1500
    },
    defaultRoutes: {
      color: 'color'
    },
    descriptors: {
      _scriptable: true,
      _indexable: false
    }
  };
  const positioners = {
    average(items) {
      if (!items.length) {
        return false;
      }

      let i, len;
      let x = 0;
      let y = 0;
      let count = 0;

      for (i = 0, len = items.length; i < len; ++i) {
        const el = items[i].element;

        if (el && el.hasValue()) {
          const pos = el.tooltipPosition();
          x += pos.x;
          y += pos.y;
          ++count;
        }
      }

      return {
        x: x / count,
        y: y / count
      };
    },

    nearest(items, eventPosition) {
      if (!items.length) {
        return false;
      }

      let x = eventPosition.x;
      let y = eventPosition.y;
      let minDistance = Number.POSITIVE_INFINITY;
      let i, len, nearestElement;

      for (i = 0, len = items.length; i < len; ++i) {
        const el = items[i].element;

        if (el && el.hasValue()) {
          const center = el.getCenterPoint();
          const d = distanceBetweenPoints(eventPosition, center);

          if (d < minDistance) {
            minDistance = d;
            nearestElement = el;
          }
        }
      }

      if (nearestElement) {
        const tp = nearestElement.tooltipPosition();
        x = tp.x;
        y = tp.y;
      }

      return {
        x,
        y
      };
    }

  };

  function pushOrConcat(base, toPush) {
    if (toPush) {
      if (isArray(toPush)) {
        Array.prototype.push.apply(base, toPush);
      } else {
        base.push(toPush);
      }
    }

    return base;
  }

  function splitNewlines(str) {
    if ((typeof str === 'string' || str instanceof String) && str.indexOf('\n') > -1) {
      return str.split('\n');
    }

    return str;
  }

  function createTooltipItem(chart, item) {
    const {
      element,
      datasetIndex,
      index
    } = item;
    const controller = chart.getDatasetMeta(datasetIndex).controller;
    const {
      label,
      value
    } = controller.getLabelAndValue(index);
    return {
      chart,
      label,
      parsed: controller.getParsed(index),
      raw: chart.data.datasets[datasetIndex].data[index],
      formattedValue: value,
      dataset: controller.getDataset(),
      dataIndex: index,
      datasetIndex,
      element
    };
  }

  function getTooltipSize(tooltip, options) {
    const ctx = tooltip._chart.ctx;
    const {
      body,
      footer,
      title
    } = tooltip;
    const {
      boxWidth,
      boxHeight
    } = options;
    const bodyFont = toFont(options.bodyFont);
    const titleFont = toFont(options.titleFont);
    const footerFont = toFont(options.footerFont);
    const titleLineCount = title.length;
    const footerLineCount = footer.length;
    const bodyLineItemCount = body.length;
    const padding = toPadding(options.padding);
    let height = padding.height;
    let width = 0;
    let combinedBodyLength = body.reduce((count, bodyItem) => count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length, 0);
    combinedBodyLength += tooltip.beforeBody.length + tooltip.afterBody.length;

    if (titleLineCount) {
      height += titleLineCount * titleFont.lineHeight + (titleLineCount - 1) * options.titleSpacing + options.titleMarginBottom;
    }

    if (combinedBodyLength) {
      const bodyLineHeight = options.displayColors ? Math.max(boxHeight, bodyFont.lineHeight) : bodyFont.lineHeight;
      height += bodyLineItemCount * bodyLineHeight + (combinedBodyLength - bodyLineItemCount) * bodyFont.lineHeight + (combinedBodyLength - 1) * options.bodySpacing;
    }

    if (footerLineCount) {
      height += options.footerMarginTop + footerLineCount * footerFont.lineHeight + (footerLineCount - 1) * options.footerSpacing;
    }

    let widthPadding = 0;

    const maxLineWidth = function (line) {
      width = Math.max(width, ctx.measureText(line).width + widthPadding);
    };

    ctx.save();
    ctx.font = titleFont.string;
    each(tooltip.title, maxLineWidth);
    ctx.font = bodyFont.string;
    each(tooltip.beforeBody.concat(tooltip.afterBody), maxLineWidth);
    widthPadding = options.displayColors ? boxWidth + 2 : 0;
    each(body, bodyItem => {
      each(bodyItem.before, maxLineWidth);
      each(bodyItem.lines, maxLineWidth);
      each(bodyItem.after, maxLineWidth);
    });
    widthPadding = 0;
    ctx.font = footerFont.string;
    each(tooltip.footer, maxLineWidth);
    ctx.restore();
    width += padding.width;
    return {
      width,
      height
    };
  }

  function determineYAlign(chart, size) {
    const {
      y,
      height
    } = size;

    if (y < height / 2) {
      return 'top';
    } else if (y > chart.height - height / 2) {
      return 'bottom';
    }

    return 'center';
  }

  function doesNotFitWithAlign(xAlign, chart, options, size) {
    const {
      x,
      width
    } = size;
    const caret = options.caretSize + options.caretPadding;

    if (xAlign === 'left' && x + width + caret > chart.width) {
      return true;
    }

    if (xAlign === 'right' && x - width - caret < 0) {
      return true;
    }
  }

  function determineXAlign(chart, options, size, yAlign) {
    const {
      x,
      width
    } = size;
    const {
      width: chartWidth,
      chartArea: {
        left,
        right
      }
    } = chart;
    let xAlign = 'center';

    if (yAlign === 'center') {
      xAlign = x <= (left + right) / 2 ? 'left' : 'right';
    } else if (x <= width / 2) {
      xAlign = 'left';
    } else if (x >= chartWidth - width / 2) {
      xAlign = 'right';
    }

    if (doesNotFitWithAlign(xAlign, chart, options, size)) {
      xAlign = 'center';
    }

    return xAlign;
  }

  function determineAlignment(chart, options, size) {
    const yAlign = options.yAlign || determineYAlign(chart, size);
    return {
      xAlign: options.xAlign || determineXAlign(chart, options, size, yAlign),
      yAlign
    };
  }

  function alignX(size, xAlign) {
    let {
      x,
      width
    } = size;

    if (xAlign === 'right') {
      x -= width;
    } else if (xAlign === 'center') {
      x -= width / 2;
    }

    return x;
  }

  function alignY(size, yAlign, paddingAndSize) {
    let {
      y,
      height
    } = size;

    if (yAlign === 'top') {
      y += paddingAndSize;
    } else if (yAlign === 'bottom') {
      y -= height + paddingAndSize;
    } else {
      y -= height / 2;
    }

    return y;
  }

  function getBackgroundPoint(options, size, alignment, chart) {
    const {
      caretSize,
      caretPadding,
      cornerRadius
    } = options;
    const {
      xAlign,
      yAlign
    } = alignment;
    const paddingAndSize = caretSize + caretPadding;
    const radiusAndPadding = cornerRadius + caretPadding;
    let x = alignX(size, xAlign);
    const y = alignY(size, yAlign, paddingAndSize);

    if (yAlign === 'center') {
      if (xAlign === 'left') {
        x += paddingAndSize;
      } else if (xAlign === 'right') {
        x -= paddingAndSize;
      }
    } else if (xAlign === 'left') {
      x -= radiusAndPadding;
    } else if (xAlign === 'right') {
      x += radiusAndPadding;
    }

    return {
      x: _limitValue(x, 0, chart.width - size.width),
      y: _limitValue(y, 0, chart.height - size.height)
    };
  }

  function getAlignedX(tooltip, align, options) {
    const padding = toPadding(options.padding);
    return align === 'center' ? tooltip.x + tooltip.width / 2 : align === 'right' ? tooltip.x + tooltip.width - padding.right : tooltip.x + padding.left;
  }

  function getBeforeAfterBodyLines(callback) {
    return pushOrConcat([], splitNewlines(callback));
  }

  function createTooltipContext(parent, tooltip, tooltipItems) {
    return Object.assign(Object.create(parent), {
      tooltip,
      tooltipItems,
      type: 'tooltip'
    });
  }

  function overrideCallbacks(callbacks, context) {
    const override = context && context.dataset && context.dataset.tooltip && context.dataset.tooltip.callbacks;
    return override ? callbacks.override(override) : callbacks;
  }

  class Tooltip extends Element {
    constructor(config) {
      super();
      this.opacity = 0;
      this._active = [];
      this._chart = config._chart;
      this._eventPosition = undefined;
      this._size = undefined;
      this._cachedAnimations = undefined;
      this._tooltipItems = [];
      this.$animations = undefined;
      this.$context = undefined;
      this.options = config.options;
      this.dataPoints = undefined;
      this.title = undefined;
      this.beforeBody = undefined;
      this.body = undefined;
      this.afterBody = undefined;
      this.footer = undefined;
      this.xAlign = undefined;
      this.yAlign = undefined;
      this.x = undefined;
      this.y = undefined;
      this.height = undefined;
      this.width = undefined;
      this.caretX = undefined;
      this.caretY = undefined;
      this.labelColors = undefined;
      this.labelPointStyles = undefined;
      this.labelTextColors = undefined;
    }

    initialize(options) {
      this.options = options;
      this._cachedAnimations = undefined;
      this.$context = undefined;
    }

    _resolveAnimations() {
      const me = this;
      const cached = me._cachedAnimations;

      if (cached) {
        return cached;
      }

      const chart = me._chart;
      const options = me.options.setContext(me.getContext());
      const opts = options.enabled && chart.options.animation && options.animations;
      const animations = new Animations(me._chart, opts);

      if (opts._cacheable) {
        me._cachedAnimations = Object.freeze(animations);
      }

      return animations;
    }

    getContext() {
      const me = this;
      return me.$context || (me.$context = createTooltipContext(me._chart.getContext(), me, me._tooltipItems));
    }

    getTitle(context, options) {
      const me = this;
      const {
        callbacks
      } = options;
      const beforeTitle = callbacks.beforeTitle.apply(me, [context]);
      const title = callbacks.title.apply(me, [context]);
      const afterTitle = callbacks.afterTitle.apply(me, [context]);
      let lines = [];
      lines = pushOrConcat(lines, splitNewlines(beforeTitle));
      lines = pushOrConcat(lines, splitNewlines(title));
      lines = pushOrConcat(lines, splitNewlines(afterTitle));
      return lines;
    }

    getBeforeBody(tooltipItems, options) {
      return getBeforeAfterBodyLines(options.callbacks.beforeBody.apply(this, [tooltipItems]));
    }

    getBody(tooltipItems, options) {
      const me = this;
      const {
        callbacks
      } = options;
      const bodyItems = [];
      each(tooltipItems, context => {
        const bodyItem = {
          before: [],
          lines: [],
          after: []
        };
        const scoped = overrideCallbacks(callbacks, context);
        pushOrConcat(bodyItem.before, splitNewlines(scoped.beforeLabel.call(me, context)));
        pushOrConcat(bodyItem.lines, scoped.label.call(me, context));
        pushOrConcat(bodyItem.after, splitNewlines(scoped.afterLabel.call(me, context)));
        bodyItems.push(bodyItem);
      });
      return bodyItems;
    }

    getAfterBody(tooltipItems, options) {
      return getBeforeAfterBodyLines(options.callbacks.afterBody.apply(this, [tooltipItems]));
    }

    getFooter(tooltipItems, options) {
      const me = this;
      const {
        callbacks
      } = options;
      const beforeFooter = callbacks.beforeFooter.apply(me, [tooltipItems]);
      const footer = callbacks.footer.apply(me, [tooltipItems]);
      const afterFooter = callbacks.afterFooter.apply(me, [tooltipItems]);
      let lines = [];
      lines = pushOrConcat(lines, splitNewlines(beforeFooter));
      lines = pushOrConcat(lines, splitNewlines(footer));
      lines = pushOrConcat(lines, splitNewlines(afterFooter));
      return lines;
    }

    _createItems(options) {
      const me = this;
      const active = me._active;
      const data = me._chart.data;
      const labelColors = [];
      const labelPointStyles = [];
      const labelTextColors = [];
      let tooltipItems = [];
      let i, len;

      for (i = 0, len = active.length; i < len; ++i) {
        tooltipItems.push(createTooltipItem(me._chart, active[i]));
      }

      if (options.filter) {
        tooltipItems = tooltipItems.filter((element, index, array) => options.filter(element, index, array, data));
      }

      if (options.itemSort) {
        tooltipItems = tooltipItems.sort((a, b) => options.itemSort(a, b, data));
      }

      each(tooltipItems, context => {
        const scoped = overrideCallbacks(options.callbacks, context);
        labelColors.push(scoped.labelColor.call(me, context));
        labelPointStyles.push(scoped.labelPointStyle.call(me, context));
        labelTextColors.push(scoped.labelTextColor.call(me, context));
      });
      me.labelColors = labelColors;
      me.labelPointStyles = labelPointStyles;
      me.labelTextColors = labelTextColors;
      me.dataPoints = tooltipItems;
      return tooltipItems;
    }

    update(changed, replay) {
      const me = this;
      const options = me.options.setContext(me.getContext());
      const active = me._active;
      let properties;
      let tooltipItems = [];

      if (!active.length) {
        if (me.opacity !== 0) {
          properties = {
            opacity: 0
          };
        }
      } else {
        const position = positioners[options.position].call(me, active, me._eventPosition);
        tooltipItems = me._createItems(options);
        me.title = me.getTitle(tooltipItems, options);
        me.beforeBody = me.getBeforeBody(tooltipItems, options);
        me.body = me.getBody(tooltipItems, options);
        me.afterBody = me.getAfterBody(tooltipItems, options);
        me.footer = me.getFooter(tooltipItems, options);
        const size = me._size = getTooltipSize(me, options);
        const positionAndSize = Object.assign({}, position, size);
        const alignment = determineAlignment(me._chart, options, positionAndSize);
        const backgroundPoint = getBackgroundPoint(options, positionAndSize, alignment, me._chart);
        me.xAlign = alignment.xAlign;
        me.yAlign = alignment.yAlign;
        properties = {
          opacity: 1,
          x: backgroundPoint.x,
          y: backgroundPoint.y,
          width: size.width,
          height: size.height,
          caretX: position.x,
          caretY: position.y
        };
      }

      me._tooltipItems = tooltipItems;
      me.$context = undefined;

      if (properties) {
        me._resolveAnimations().update(me, properties);
      }

      if (changed && options.external) {
        options.external.call(me, {
          chart: me._chart,
          tooltip: me,
          replay
        });
      }
    }

    drawCaret(tooltipPoint, ctx, size, options) {
      const caretPosition = this.getCaretPosition(tooltipPoint, size, options);
      ctx.lineTo(caretPosition.x1, caretPosition.y1);
      ctx.lineTo(caretPosition.x2, caretPosition.y2);
      ctx.lineTo(caretPosition.x3, caretPosition.y3);
    }

    getCaretPosition(tooltipPoint, size, options) {
      const {
        xAlign,
        yAlign
      } = this;
      const {
        cornerRadius,
        caretSize
      } = options;
      const {
        x: ptX,
        y: ptY
      } = tooltipPoint;
      const {
        width,
        height
      } = size;
      let x1, x2, x3, y1, y2, y3;

      if (yAlign === 'center') {
        y2 = ptY + height / 2;

        if (xAlign === 'left') {
          x1 = ptX;
          x2 = x1 - caretSize;
          y1 = y2 + caretSize;
          y3 = y2 - caretSize;
        } else {
          x1 = ptX + width;
          x2 = x1 + caretSize;
          y1 = y2 - caretSize;
          y3 = y2 + caretSize;
        }

        x3 = x1;
      } else {
        if (xAlign === 'left') {
          x2 = ptX + cornerRadius + caretSize;
        } else if (xAlign === 'right') {
          x2 = ptX + width - cornerRadius - caretSize;
        } else {
          x2 = this.caretX;
        }

        if (yAlign === 'top') {
          y1 = ptY;
          y2 = y1 - caretSize;
          x1 = x2 - caretSize;
          x3 = x2 + caretSize;
        } else {
          y1 = ptY + height;
          y2 = y1 + caretSize;
          x1 = x2 + caretSize;
          x3 = x2 - caretSize;
        }

        y3 = y1;
      }

      return {
        x1,
        x2,
        x3,
        y1,
        y2,
        y3
      };
    }

    drawTitle(pt, ctx, options) {
      const me = this;
      const title = me.title;
      const length = title.length;
      let titleFont, titleSpacing, i;

      if (length) {
        const rtlHelper = getRtlAdapter(options.rtl, me.x, me.width);
        pt.x = getAlignedX(me, options.titleAlign, options);
        ctx.textAlign = rtlHelper.textAlign(options.titleAlign);
        ctx.textBaseline = 'middle';
        titleFont = toFont(options.titleFont);
        titleSpacing = options.titleSpacing;
        ctx.fillStyle = options.titleColor;
        ctx.font = titleFont.string;

        for (i = 0; i < length; ++i) {
          ctx.fillText(title[i], rtlHelper.x(pt.x), pt.y + titleFont.lineHeight / 2);
          pt.y += titleFont.lineHeight + titleSpacing;

          if (i + 1 === length) {
            pt.y += options.titleMarginBottom - titleSpacing;
          }
        }
      }
    }

    _drawColorBox(ctx, pt, i, rtlHelper, options) {
      const me = this;
      const labelColors = me.labelColors[i];
      const labelPointStyle = me.labelPointStyles[i];
      const {
        boxHeight,
        boxWidth
      } = options;
      const bodyFont = toFont(options.bodyFont);
      const colorX = getAlignedX(me, 'left', options);
      const rtlColorX = rtlHelper.x(colorX);
      const yOffSet = boxHeight < bodyFont.lineHeight ? (bodyFont.lineHeight - boxHeight) / 2 : 0;
      const colorY = pt.y + yOffSet;

      if (options.usePointStyle) {
        const drawOptions = {
          radius: Math.min(boxWidth, boxHeight) / 2,
          pointStyle: labelPointStyle.pointStyle,
          rotation: labelPointStyle.rotation,
          borderWidth: 1
        };
        const centerX = rtlHelper.leftForLtr(rtlColorX, boxWidth) + boxWidth / 2;
        const centerY = colorY + boxHeight / 2;
        ctx.strokeStyle = options.multiKeyBackground;
        ctx.fillStyle = options.multiKeyBackground;
        drawPoint(ctx, drawOptions, centerX, centerY);
        ctx.strokeStyle = labelColors.borderColor;
        ctx.fillStyle = labelColors.backgroundColor;
        drawPoint(ctx, drawOptions, centerX, centerY);
      } else {
        ctx.lineWidth = labelColors.borderWidth || 1;
        ctx.strokeStyle = labelColors.borderColor;
        ctx.setLineDash(labelColors.borderDash || []);
        ctx.lineDashOffset = labelColors.borderDashOffset || 0;
        const outerX = rtlHelper.leftForLtr(rtlColorX, boxWidth);
        const innerX = rtlHelper.leftForLtr(rtlHelper.xPlus(rtlColorX, 1), boxWidth - 2);
        const borderRadius = toTRBLCorners(labelColors.borderRadius);

        if (Object.values(borderRadius).some(v => v !== 0)) {
          ctx.beginPath();
          ctx.fillStyle = options.multiKeyBackground;
          addRoundedRectPath(ctx, {
            x: outerX,
            y: colorY,
            w: boxWidth,
            h: boxHeight,
            radius: borderRadius
          });
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = labelColors.backgroundColor;
          ctx.beginPath();
          addRoundedRectPath(ctx, {
            x: innerX,
            y: colorY + 1,
            w: boxWidth - 2,
            h: boxHeight - 2,
            radius: borderRadius
          });
          ctx.fill();
        } else {
          ctx.fillStyle = options.multiKeyBackground;
          ctx.fillRect(outerX, colorY, boxWidth, boxHeight);
          ctx.strokeRect(outerX, colorY, boxWidth, boxHeight);
          ctx.fillStyle = labelColors.backgroundColor;
          ctx.fillRect(innerX, colorY + 1, boxWidth - 2, boxHeight - 2);
        }
      }

      ctx.fillStyle = me.labelTextColors[i];
    }

    drawBody(pt, ctx, options) {
      const me = this;
      const {
        body
      } = me;
      const {
        bodySpacing,
        bodyAlign,
        displayColors,
        boxHeight,
        boxWidth
      } = options;
      const bodyFont = toFont(options.bodyFont);
      let bodyLineHeight = bodyFont.lineHeight;
      let xLinePadding = 0;
      const rtlHelper = getRtlAdapter(options.rtl, me.x, me.width);

      const fillLineOfText = function (line) {
        ctx.fillText(line, rtlHelper.x(pt.x + xLinePadding), pt.y + bodyLineHeight / 2);
        pt.y += bodyLineHeight + bodySpacing;
      };

      const bodyAlignForCalculation = rtlHelper.textAlign(bodyAlign);
      let bodyItem, textColor, lines, i, j, ilen, jlen;
      ctx.textAlign = bodyAlign;
      ctx.textBaseline = 'middle';
      ctx.font = bodyFont.string;
      pt.x = getAlignedX(me, bodyAlignForCalculation, options);
      ctx.fillStyle = options.bodyColor;
      each(me.beforeBody, fillLineOfText);
      xLinePadding = displayColors && bodyAlignForCalculation !== 'right' ? bodyAlign === 'center' ? boxWidth / 2 + 1 : boxWidth + 2 : 0;

      for (i = 0, ilen = body.length; i < ilen; ++i) {
        bodyItem = body[i];
        textColor = me.labelTextColors[i];
        ctx.fillStyle = textColor;
        each(bodyItem.before, fillLineOfText);
        lines = bodyItem.lines;

        if (displayColors && lines.length) {
          me._drawColorBox(ctx, pt, i, rtlHelper, options);

          bodyLineHeight = Math.max(bodyFont.lineHeight, boxHeight);
        }

        for (j = 0, jlen = lines.length; j < jlen; ++j) {
          fillLineOfText(lines[j]);
          bodyLineHeight = bodyFont.lineHeight;
        }

        each(bodyItem.after, fillLineOfText);
      }

      xLinePadding = 0;
      bodyLineHeight = bodyFont.lineHeight;
      each(me.afterBody, fillLineOfText);
      pt.y -= bodySpacing;
    }

    drawFooter(pt, ctx, options) {
      const me = this;
      const footer = me.footer;
      const length = footer.length;
      let footerFont, i;

      if (length) {
        const rtlHelper = getRtlAdapter(options.rtl, me.x, me.width);
        pt.x = getAlignedX(me, options.footerAlign, options);
        pt.y += options.footerMarginTop;
        ctx.textAlign = rtlHelper.textAlign(options.footerAlign);
        ctx.textBaseline = 'middle';
        footerFont = toFont(options.footerFont);
        ctx.fillStyle = options.footerColor;
        ctx.font = footerFont.string;

        for (i = 0; i < length; ++i) {
          ctx.fillText(footer[i], rtlHelper.x(pt.x), pt.y + footerFont.lineHeight / 2);
          pt.y += footerFont.lineHeight + options.footerSpacing;
        }
      }
    }

    drawBackground(pt, ctx, tooltipSize, options) {
      const {
        xAlign,
        yAlign
      } = this;
      const {
        x,
        y
      } = pt;
      const {
        width,
        height
      } = tooltipSize;
      const radius = options.cornerRadius;
      ctx.fillStyle = options.backgroundColor;
      ctx.strokeStyle = options.borderColor;
      ctx.lineWidth = options.borderWidth;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);

      if (yAlign === 'top') {
        this.drawCaret(pt, ctx, tooltipSize, options);
      }

      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);

      if (yAlign === 'center' && xAlign === 'right') {
        this.drawCaret(pt, ctx, tooltipSize, options);
      }

      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);

      if (yAlign === 'bottom') {
        this.drawCaret(pt, ctx, tooltipSize, options);
      }

      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);

      if (yAlign === 'center' && xAlign === 'left') {
        this.drawCaret(pt, ctx, tooltipSize, options);
      }

      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();

      if (options.borderWidth > 0) {
        ctx.stroke();
      }
    }

    _updateAnimationTarget(options) {
      const me = this;
      const chart = me._chart;
      const anims = me.$animations;
      const animX = anims && anims.x;
      const animY = anims && anims.y;

      if (animX || animY) {
        const position = positioners[options.position].call(me, me._active, me._eventPosition);

        if (!position) {
          return;
        }

        const size = me._size = getTooltipSize(me, options);
        const positionAndSize = Object.assign({}, position, me._size);
        const alignment = determineAlignment(chart, options, positionAndSize);
        const point = getBackgroundPoint(options, positionAndSize, alignment, chart);

        if (animX._to !== point.x || animY._to !== point.y) {
          me.xAlign = alignment.xAlign;
          me.yAlign = alignment.yAlign;
          me.width = size.width;
          me.height = size.height;
          me.caretX = position.x;
          me.caretY = position.y;

          me._resolveAnimations().update(me, point);
        }
      }
    }

    draw(ctx) {
      const me = this;
      const options = me.options.setContext(me.getContext());
      let opacity = me.opacity;

      if (!opacity) {
        return;
      }

      me._updateAnimationTarget(options);

      const tooltipSize = {
        width: me.width,
        height: me.height
      };
      const pt = {
        x: me.x,
        y: me.y
      };
      opacity = Math.abs(opacity) < 1e-3 ? 0 : opacity;
      const padding = toPadding(options.padding);
      const hasTooltipContent = me.title.length || me.beforeBody.length || me.body.length || me.afterBody.length || me.footer.length;

      if (options.enabled && hasTooltipContent) {
        ctx.save();
        ctx.globalAlpha = opacity;
        me.drawBackground(pt, ctx, tooltipSize, options);
        overrideTextDirection(ctx, options.textDirection);
        pt.y += padding.top;
        me.drawTitle(pt, ctx, options);
        me.drawBody(pt, ctx, options);
        me.drawFooter(pt, ctx, options);
        restoreTextDirection(ctx, options.textDirection);
        ctx.restore();
      }
    }

    getActiveElements() {
      return this._active || [];
    }

    setActiveElements(activeElements, eventPosition) {
      const me = this;
      const lastActive = me._active;
      const active = activeElements.map(({
        datasetIndex,
        index
      }) => {
        const meta = me._chart.getDatasetMeta(datasetIndex);

        if (!meta) {
          throw new Error('Cannot find a dataset at index ' + datasetIndex);
        }

        return {
          datasetIndex,
          element: meta.data[index],
          index
        };
      });
      const changed = !_elementsEqual(lastActive, active);

      const positionChanged = me._positionChanged(active, eventPosition);

      if (changed || positionChanged) {
        me._active = active;
        me._eventPosition = eventPosition;
        me.update(true);
      }
    }

    handleEvent(e, replay) {
      const me = this;
      const options = me.options;
      const lastActive = me._active || [];
      let changed = false;
      let active = [];

      if (e.type !== 'mouseout') {
        active = me._chart.getElementsAtEventForMode(e, options.mode, options, replay);

        if (options.reverse) {
          active.reverse();
        }
      }

      const positionChanged = me._positionChanged(active, e);

      changed = replay || !_elementsEqual(active, lastActive) || positionChanged;

      if (changed) {
        me._active = active;

        if (options.enabled || options.external) {
          me._eventPosition = {
            x: e.x,
            y: e.y
          };
          me.update(true, replay);
        }
      }

      return changed;
    }

    _positionChanged(active, e) {
      const {
        caretX,
        caretY,
        options
      } = this;
      const position = positioners[options.position].call(this, active, e);
      return position !== false && (caretX !== position.x || caretY !== position.y);
    }

  }

  Tooltip.positioners = positioners;
  var plugin_tooltip = {
    id: 'tooltip',
    _element: Tooltip,
    positioners,

    afterInit(chart, _args, options) {
      if (options) {
        chart.tooltip = new Tooltip({
          _chart: chart,
          options
        });
      }
    },

    beforeUpdate(chart, _args, options) {
      if (chart.tooltip) {
        chart.tooltip.initialize(options);
      }
    },

    reset(chart, _args, options) {
      if (chart.tooltip) {
        chart.tooltip.initialize(options);
      }
    },

    afterDraw(chart) {
      const tooltip = chart.tooltip;
      const args = {
        tooltip
      };

      if (chart.notifyPlugins('beforeTooltipDraw', args) === false) {
        return;
      }

      if (tooltip) {
        tooltip.draw(chart.ctx);
      }

      chart.notifyPlugins('afterTooltipDraw', args);
    },

    afterEvent(chart, args) {
      if (chart.tooltip) {
        const useFinalPosition = args.replay;

        if (chart.tooltip.handleEvent(args.event, useFinalPosition)) {
          args.changed = true;
        }
      }
    },

    defaults: {
      enabled: true,
      external: null,
      position: 'average',
      backgroundColor: 'rgba(0,0,0,0.8)',
      titleColor: '#fff',
      titleFont: {
        weight: 'bold'
      },
      titleSpacing: 2,
      titleMarginBottom: 6,
      titleAlign: 'left',
      bodyColor: '#fff',
      bodySpacing: 2,
      bodyFont: {},
      bodyAlign: 'left',
      footerColor: '#fff',
      footerSpacing: 2,
      footerMarginTop: 6,
      footerFont: {
        weight: 'bold'
      },
      footerAlign: 'left',
      padding: 6,
      caretPadding: 2,
      caretSize: 5,
      cornerRadius: 6,
      boxHeight: (ctx, opts) => opts.bodyFont.size,
      boxWidth: (ctx, opts) => opts.bodyFont.size,
      multiKeyBackground: '#fff',
      displayColors: true,
      borderColor: 'rgba(0,0,0,0)',
      borderWidth: 0,
      animation: {
        duration: 400,
        easing: 'easeOutQuart'
      },
      animations: {
        numbers: {
          type: 'number',
          properties: ['x', 'y', 'width', 'height', 'caretX', 'caretY']
        },
        opacity: {
          easing: 'linear',
          duration: 200
        }
      },
      callbacks: {
        beforeTitle: noop,

        title(tooltipItems) {
          if (tooltipItems.length > 0) {
            const item = tooltipItems[0];
            const labels = item.chart.data.labels;
            const labelCount = labels ? labels.length : 0;

            if (this && this.options && this.options.mode === 'dataset') {
              return item.dataset.label || '';
            } else if (item.label) {
              return item.label;
            } else if (labelCount > 0 && item.dataIndex < labelCount) {
              return labels[item.dataIndex];
            }
          }

          return '';
        },

        afterTitle: noop,
        beforeBody: noop,
        beforeLabel: noop,

        label(tooltipItem) {
          if (this && this.options && this.options.mode === 'dataset') {
            return tooltipItem.label + ': ' + tooltipItem.formattedValue || tooltipItem.formattedValue;
          }

          let label = tooltipItem.dataset.label || '';

          if (label) {
            label += ': ';
          }

          const value = tooltipItem.formattedValue;

          if (!isNullOrUndef(value)) {
            label += value;
          }

          return label;
        },

        labelColor(tooltipItem) {
          const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
          const options = meta.controller.getStyle(tooltipItem.dataIndex);
          return {
            borderColor: options.borderColor,
            backgroundColor: options.backgroundColor,
            borderWidth: options.borderWidth,
            borderDash: options.borderDash,
            borderDashOffset: options.borderDashOffset,
            borderRadius: 0
          };
        },

        labelTextColor() {
          return this.options.bodyColor;
        },

        labelPointStyle(tooltipItem) {
          const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
          const options = meta.controller.getStyle(tooltipItem.dataIndex);
          return {
            pointStyle: options.pointStyle,
            rotation: options.rotation
          };
        },

        afterLabel: noop,
        afterBody: noop,
        beforeFooter: noop,
        footer: noop,
        afterFooter: noop
      }
    },
    defaultRoutes: {
      bodyFont: 'font',
      footerFont: 'font',
      titleFont: 'font'
    },
    descriptors: {
      _scriptable: name => name !== 'filter' && name !== 'itemSort' && name !== 'external',
      _indexable: false,
      callbacks: {
        _scriptable: false,
        _indexable: false
      },
      animation: {
        _fallback: false
      },
      animations: {
        _fallback: 'animation'
      }
    },
    additionalOptionScopes: ['interaction']
  };
  var plugins = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Decimation: plugin_decimation,
    Filler: plugin_filler,
    Legend: plugin_legend,
    SubTitle: plugin_subtitle,
    Title: plugin_title,
    Tooltip: plugin_tooltip
  });

  const addIfString = (labels, raw, index) => typeof raw === 'string' ? labels.push(raw) - 1 : isNaN(raw) ? null : index;

  function findOrAddLabel(labels, raw, index) {
    const first = labels.indexOf(raw);

    if (first === -1) {
      return addIfString(labels, raw, index);
    }

    const last = labels.lastIndexOf(raw);
    return first !== last ? index : first;
  }

  const validIndex = (index, max) => index === null ? null : _limitValue(Math.round(index), 0, max);

  class CategoryScale extends Scale {
    constructor(cfg) {
      super(cfg);
      this._startValue = undefined;
      this._valueRange = 0;
    }

    parse(raw, index) {
      if (isNullOrUndef(raw)) {
        return null;
      }

      const labels = this.getLabels();
      index = isFinite(index) && labels[index] === raw ? index : findOrAddLabel(labels, raw, valueOrDefault(index, raw));
      return validIndex(index, labels.length - 1);
    }

    determineDataLimits() {
      const me = this;
      const {
        minDefined,
        maxDefined
      } = me.getUserBounds();
      let {
        min,
        max
      } = me.getMinMax(true);

      if (me.options.bounds === 'ticks') {
        if (!minDefined) {
          min = 0;
        }

        if (!maxDefined) {
          max = me.getLabels().length - 1;
        }
      }

      me.min = min;
      me.max = max;
    }

    buildTicks() {
      const me = this;
      const min = me.min;
      const max = me.max;
      const offset = me.options.offset;
      const ticks = [];
      let labels = me.getLabels();
      labels = min === 0 && max === labels.length - 1 ? labels : labels.slice(min, max + 1);
      me._valueRange = Math.max(labels.length - (offset ? 0 : 1), 1);
      me._startValue = me.min - (offset ? 0.5 : 0);

      for (let value = min; value <= max; value++) {
        ticks.push({
          value
        });
      }

      return ticks;
    }

    getLabelForValue(value) {
      const me = this;
      const labels = me.getLabels();

      if (value >= 0 && value < labels.length) {
        return labels[value];
      }

      return value;
    }

    configure() {
      const me = this;
      super.configure();

      if (!me.isHorizontal()) {
        me._reversePixels = !me._reversePixels;
      }
    }

    getPixelForValue(value) {
      const me = this;

      if (typeof value !== 'number') {
        value = me.parse(value);
      }

      return value === null ? NaN : me.getPixelForDecimal((value - me._startValue) / me._valueRange);
    }

    getPixelForTick(index) {
      const me = this;
      const ticks = me.ticks;

      if (index < 0 || index > ticks.length - 1) {
        return null;
      }

      return me.getPixelForValue(ticks[index].value);
    }

    getValueForPixel(pixel) {
      const me = this;
      return Math.round(me._startValue + me.getDecimalForPixel(pixel) * me._valueRange);
    }

    getBasePixel() {
      return this.bottom;
    }

  }

  CategoryScale.id = 'category';
  CategoryScale.defaults = {
    ticks: {
      callback: CategoryScale.prototype.getLabelForValue
    }
  };

  function generateTicks$1(generationOptions, dataRange) {
    const ticks = [];
    const MIN_SPACING = 1e-14;
    const {
      bounds,
      step,
      min,
      max,
      precision,
      count,
      maxTicks,
      maxDigits,
      includeBounds
    } = generationOptions;
    const unit = step || 1;
    const maxSpaces = maxTicks - 1;
    const {
      min: rmin,
      max: rmax
    } = dataRange;
    const minDefined = !isNullOrUndef(min);
    const maxDefined = !isNullOrUndef(max);
    const countDefined = !isNullOrUndef(count);
    const minSpacing = (rmax - rmin) / (maxDigits + 1);
    let spacing = niceNum((rmax - rmin) / maxSpaces / unit) * unit;
    let factor, niceMin, niceMax, numSpaces;

    if (spacing < MIN_SPACING && !minDefined && !maxDefined) {
      return [{
        value: rmin
      }, {
        value: rmax
      }];
    }

    numSpaces = Math.ceil(rmax / spacing) - Math.floor(rmin / spacing);

    if (numSpaces > maxSpaces) {
      spacing = niceNum(numSpaces * spacing / maxSpaces / unit) * unit;
    }

    if (!isNullOrUndef(precision)) {
      factor = Math.pow(10, precision);
      spacing = Math.ceil(spacing * factor) / factor;
    }

    if (bounds === 'ticks') {
      niceMin = Math.floor(rmin / spacing) * spacing;
      niceMax = Math.ceil(rmax / spacing) * spacing;
    } else {
      niceMin = rmin;
      niceMax = rmax;
    }

    if (minDefined && maxDefined && step && almostWhole((max - min) / step, spacing / 1000)) {
      numSpaces = Math.round(Math.min((max - min) / spacing, maxTicks));
      spacing = (max - min) / numSpaces;
      niceMin = min;
      niceMax = max;
    } else if (countDefined) {
      niceMin = minDefined ? min : niceMin;
      niceMax = maxDefined ? max : niceMax;
      numSpaces = count - 1;
      spacing = (niceMax - niceMin) / numSpaces;
    } else {
      numSpaces = (niceMax - niceMin) / spacing;

      if (almostEquals(numSpaces, Math.round(numSpaces), spacing / 1000)) {
        numSpaces = Math.round(numSpaces);
      } else {
        numSpaces = Math.ceil(numSpaces);
      }
    }

    const decimalPlaces = Math.max(_decimalPlaces(spacing), _decimalPlaces(niceMin));
    factor = Math.pow(10, isNullOrUndef(precision) ? decimalPlaces : precision);
    niceMin = Math.round(niceMin * factor) / factor;
    niceMax = Math.round(niceMax * factor) / factor;
    let j = 0;

    if (minDefined) {
      if (includeBounds && niceMin !== min) {
        ticks.push({
          value: min
        });

        if (niceMin < min) {
          j++;
        }

        if (almostEquals(Math.round((niceMin + j * spacing) * factor) / factor, min, relativeLabelSize(min, minSpacing, generationOptions))) {
          j++;
        }
      } else if (niceMin < min) {
        j++;
      }
    }

    for (; j < numSpaces; ++j) {
      ticks.push({
        value: Math.round((niceMin + j * spacing) * factor) / factor
      });
    }

    if (maxDefined && includeBounds && niceMax !== max) {
      if (almostEquals(ticks[ticks.length - 1].value, max, relativeLabelSize(max, minSpacing, generationOptions))) {
        ticks[ticks.length - 1].value = max;
      } else {
        ticks.push({
          value: max
        });
      }
    } else if (!maxDefined || niceMax === max) {
      ticks.push({
        value: niceMax
      });
    }

    return ticks;
  }

  function relativeLabelSize(value, minSpacing, {
    horizontal,
    minRotation
  }) {
    const rad = toRadians(minRotation);
    const ratio = (horizontal ? Math.sin(rad) : Math.cos(rad)) || 0.001;
    const length = 0.75 * minSpacing * ('' + value).length;
    return Math.min(minSpacing / ratio, length);
  }

  class LinearScaleBase extends Scale {
    constructor(cfg) {
      super(cfg);
      this.start = undefined;
      this.end = undefined;
      this._startValue = undefined;
      this._endValue = undefined;
      this._valueRange = 0;
    }

    parse(raw, index) {
      if (isNullOrUndef(raw)) {
        return null;
      }

      if ((typeof raw === 'number' || raw instanceof Number) && !isFinite(+raw)) {
        return null;
      }

      return +raw;
    }

    handleTickRangeOptions() {
      const me = this;
      const {
        beginAtZero
      } = me.options;
      const {
        minDefined,
        maxDefined
      } = me.getUserBounds();
      let {
        min,
        max
      } = me;

      const setMin = v => min = minDefined ? min : v;

      const setMax = v => max = maxDefined ? max : v;

      if (beginAtZero) {
        const minSign = sign(min);
        const maxSign = sign(max);

        if (minSign < 0 && maxSign < 0) {
          setMax(0);
        } else if (minSign > 0 && maxSign > 0) {
          setMin(0);
        }
      }

      if (min === max) {
        setMax(max + 1);

        if (!beginAtZero) {
          setMin(min - 1);
        }
      }

      me.min = min;
      me.max = max;
    }

    getTickLimit() {
      const me = this;
      const tickOpts = me.options.ticks;
      let {
        maxTicksLimit,
        stepSize
      } = tickOpts;
      let maxTicks;

      if (stepSize) {
        maxTicks = Math.ceil(me.max / stepSize) - Math.floor(me.min / stepSize) + 1;
      } else {
        maxTicks = me.computeTickLimit();
        maxTicksLimit = maxTicksLimit || 11;
      }

      if (maxTicksLimit) {
        maxTicks = Math.min(maxTicksLimit, maxTicks);
      }

      return maxTicks;
    }

    computeTickLimit() {
      return Number.POSITIVE_INFINITY;
    }

    buildTicks() {
      const me = this;
      const opts = me.options;
      const tickOpts = opts.ticks;
      let maxTicks = me.getTickLimit();
      maxTicks = Math.max(2, maxTicks);
      const numericGeneratorOptions = {
        maxTicks,
        bounds: opts.bounds,
        min: opts.min,
        max: opts.max,
        precision: tickOpts.precision,
        step: tickOpts.stepSize,
        count: tickOpts.count,
        maxDigits: me._maxDigits(),
        horizontal: me.isHorizontal(),
        minRotation: tickOpts.minRotation || 0,
        includeBounds: tickOpts.includeBounds !== false
      };
      const dataRange = me._range || me;
      const ticks = generateTicks$1(numericGeneratorOptions, dataRange);

      if (opts.bounds === 'ticks') {
        _setMinAndMaxByKey(ticks, me, 'value');
      }

      if (opts.reverse) {
        ticks.reverse();
        me.start = me.max;
        me.end = me.min;
      } else {
        me.start = me.min;
        me.end = me.max;
      }

      return ticks;
    }

    configure() {
      const me = this;
      const ticks = me.ticks;
      let start = me.min;
      let end = me.max;
      super.configure();

      if (me.options.offset && ticks.length) {
        const offset = (end - start) / Math.max(ticks.length - 1, 1) / 2;
        start -= offset;
        end += offset;
      }

      me._startValue = start;
      me._endValue = end;
      me._valueRange = end - start;
    }

    getLabelForValue(value) {
      return formatNumber(value, this.chart.options.locale);
    }

  }

  class LinearScale extends LinearScaleBase {
    determineDataLimits() {
      const me = this;
      const {
        min,
        max
      } = me.getMinMax(true);
      me.min = isNumberFinite(min) ? min : 0;
      me.max = isNumberFinite(max) ? max : 1;
      me.handleTickRangeOptions();
    }

    computeTickLimit() {
      const me = this;
      const horizontal = me.isHorizontal();
      const length = horizontal ? me.width : me.height;
      const minRotation = toRadians(me.options.ticks.minRotation);
      const ratio = (horizontal ? Math.sin(minRotation) : Math.cos(minRotation)) || 0.001;

      const tickFont = me._resolveTickFontOptions(0);

      return Math.ceil(length / Math.min(40, tickFont.lineHeight / ratio));
    }

    getPixelForValue(value) {
      return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
    }

    getValueForPixel(pixel) {
      return this._startValue + this.getDecimalForPixel(pixel) * this._valueRange;
    }

  }

  LinearScale.id = 'linear';
  LinearScale.defaults = {
    ticks: {
      callback: Ticks.formatters.numeric
    }
  };

  function isMajor(tickVal) {
    const remain = tickVal / Math.pow(10, Math.floor(log10(tickVal)));
    return remain === 1;
  }

  function generateTicks(generationOptions, dataRange) {
    const endExp = Math.floor(log10(dataRange.max));
    const endSignificand = Math.ceil(dataRange.max / Math.pow(10, endExp));
    const ticks = [];
    let tickVal = finiteOrDefault(generationOptions.min, Math.pow(10, Math.floor(log10(dataRange.min))));
    let exp = Math.floor(log10(tickVal));
    let significand = Math.floor(tickVal / Math.pow(10, exp));
    let precision = exp < 0 ? Math.pow(10, Math.abs(exp)) : 1;

    do {
      ticks.push({
        value: tickVal,
        major: isMajor(tickVal)
      });
      ++significand;

      if (significand === 10) {
        significand = 1;
        ++exp;
        precision = exp >= 0 ? 1 : precision;
      }

      tickVal = Math.round(significand * Math.pow(10, exp) * precision) / precision;
    } while (exp < endExp || exp === endExp && significand < endSignificand);

    const lastTick = finiteOrDefault(generationOptions.max, tickVal);
    ticks.push({
      value: lastTick,
      major: isMajor(tickVal)
    });
    return ticks;
  }

  class LogarithmicScale extends Scale {
    constructor(cfg) {
      super(cfg);
      this.start = undefined;
      this.end = undefined;
      this._startValue = undefined;
      this._valueRange = 0;
    }

    parse(raw, index) {
      const value = LinearScaleBase.prototype.parse.apply(this, [raw, index]);

      if (value === 0) {
        this._zero = true;
        return undefined;
      }

      return isNumberFinite(value) && value > 0 ? value : null;
    }

    determineDataLimits() {
      const me = this;
      const {
        min,
        max
      } = me.getMinMax(true);
      me.min = isNumberFinite(min) ? Math.max(0, min) : null;
      me.max = isNumberFinite(max) ? Math.max(0, max) : null;

      if (me.options.beginAtZero) {
        me._zero = true;
      }

      me.handleTickRangeOptions();
    }

    handleTickRangeOptions() {
      const me = this;
      const {
        minDefined,
        maxDefined
      } = me.getUserBounds();
      let min = me.min;
      let max = me.max;

      const setMin = v => min = minDefined ? min : v;

      const setMax = v => max = maxDefined ? max : v;

      const exp = (v, m) => Math.pow(10, Math.floor(log10(v)) + m);

      if (min === max) {
        if (min <= 0) {
          setMin(1);
          setMax(10);
        } else {
          setMin(exp(min, -1));
          setMax(exp(max, +1));
        }
      }

      if (min <= 0) {
        setMin(exp(max, -1));
      }

      if (max <= 0) {
        setMax(exp(min, +1));
      }

      if (me._zero && me.min !== me._suggestedMin && min === exp(me.min, 0)) {
        setMin(exp(min, -1));
      }

      me.min = min;
      me.max = max;
    }

    buildTicks() {
      const me = this;
      const opts = me.options;
      const generationOptions = {
        min: me._userMin,
        max: me._userMax
      };
      const ticks = generateTicks(generationOptions, me);

      if (opts.bounds === 'ticks') {
        _setMinAndMaxByKey(ticks, me, 'value');
      }

      if (opts.reverse) {
        ticks.reverse();
        me.start = me.max;
        me.end = me.min;
      } else {
        me.start = me.min;
        me.end = me.max;
      }

      return ticks;
    }

    getLabelForValue(value) {
      return value === undefined ? '0' : formatNumber(value, this.chart.options.locale);
    }

    configure() {
      const me = this;
      const start = me.min;
      super.configure();
      me._startValue = log10(start);
      me._valueRange = log10(me.max) - log10(start);
    }

    getPixelForValue(value) {
      const me = this;

      if (value === undefined || value === 0) {
        value = me.min;
      }

      if (value === null || isNaN(value)) {
        return NaN;
      }

      return me.getPixelForDecimal(value === me.min ? 0 : (log10(value) - me._startValue) / me._valueRange);
    }

    getValueForPixel(pixel) {
      const me = this;
      const decimal = me.getDecimalForPixel(pixel);
      return Math.pow(10, me._startValue + decimal * me._valueRange);
    }

  }

  LogarithmicScale.id = 'logarithmic';
  LogarithmicScale.defaults = {
    ticks: {
      callback: Ticks.formatters.logarithmic,
      major: {
        enabled: true
      }
    }
  };

  function getTickBackdropHeight(opts) {
    const tickOpts = opts.ticks;

    if (tickOpts.display && opts.display) {
      const padding = toPadding(tickOpts.backdropPadding);
      return valueOrDefault(tickOpts.font && tickOpts.font.size, defaults.font.size) + padding.height;
    }

    return 0;
  }

  function measureLabelSize(ctx, font, label) {
    label = isArray(label) ? label : [label];
    return {
      w: _longestText(ctx, font.string, label),
      h: label.length * font.lineHeight
    };
  }

  function determineLimits(angle, pos, size, min, max) {
    if (angle === min || angle === max) {
      return {
        start: pos - size / 2,
        end: pos + size / 2
      };
    } else if (angle < min || angle > max) {
      return {
        start: pos - size,
        end: pos
      };
    }

    return {
      start: pos,
      end: pos + size
    };
  }

  function fitWithPointLabels(scale) {
    const furthestLimits = {
      l: 0,
      r: scale.width,
      t: 0,
      b: scale.height - scale.paddingTop
    };
    const furthestAngles = {};
    const labelSizes = [];
    const padding = [];
    const valueCount = scale.getLabels().length;

    for (let i = 0; i < valueCount; i++) {
      const opts = scale.options.pointLabels.setContext(scale.getContext(i));
      padding[i] = opts.padding;
      const pointPosition = scale.getPointPosition(i, scale.drawingArea + padding[i]);
      const plFont = toFont(opts.font);
      const textSize = measureLabelSize(scale.ctx, plFont, scale._pointLabels[i]);
      labelSizes[i] = textSize;
      const angleRadians = scale.getIndexAngle(i);
      const angle = toDegrees(angleRadians);
      const hLimits = determineLimits(angle, pointPosition.x, textSize.w, 0, 180);
      const vLimits = determineLimits(angle, pointPosition.y, textSize.h, 90, 270);

      if (hLimits.start < furthestLimits.l) {
        furthestLimits.l = hLimits.start;
        furthestAngles.l = angleRadians;
      }

      if (hLimits.end > furthestLimits.r) {
        furthestLimits.r = hLimits.end;
        furthestAngles.r = angleRadians;
      }

      if (vLimits.start < furthestLimits.t) {
        furthestLimits.t = vLimits.start;
        furthestAngles.t = angleRadians;
      }

      if (vLimits.end > furthestLimits.b) {
        furthestLimits.b = vLimits.end;
        furthestAngles.b = angleRadians;
      }
    }

    scale._setReductions(scale.drawingArea, furthestLimits, furthestAngles);

    scale._pointLabelItems = buildPointLabelItems(scale, labelSizes, padding);
  }

  function buildPointLabelItems(scale, labelSizes, padding) {
    const items = [];
    const valueCount = scale.getLabels().length;
    const opts = scale.options;
    const tickBackdropHeight = getTickBackdropHeight(opts);
    const outerDistance = scale.getDistanceFromCenterForValue(opts.ticks.reverse ? scale.min : scale.max);

    for (let i = 0; i < valueCount; i++) {
      const extra = i === 0 ? tickBackdropHeight / 2 : 0;
      const pointLabelPosition = scale.getPointPosition(i, outerDistance + extra + padding[i]);
      const angle = toDegrees(scale.getIndexAngle(i));
      const size = labelSizes[i];
      const y = yForAngle(pointLabelPosition.y, size.h, angle);
      const textAlign = getTextAlignForAngle(angle);
      const left = leftForTextAlign(pointLabelPosition.x, size.w, textAlign);
      items.push({
        x: pointLabelPosition.x,
        y,
        textAlign,
        left,
        top: y,
        right: left + size.w,
        bottom: y + size.h
      });
    }

    return items;
  }

  function getTextAlignForAngle(angle) {
    if (angle === 0 || angle === 180) {
      return 'center';
    } else if (angle < 180) {
      return 'left';
    }

    return 'right';
  }

  function leftForTextAlign(x, w, align) {
    if (align === 'right') {
      x -= w;
    } else if (align === 'center') {
      x -= w / 2;
    }

    return x;
  }

  function yForAngle(y, h, angle) {
    if (angle === 90 || angle === 270) {
      y -= h / 2;
    } else if (angle > 270 || angle < 90) {
      y -= h;
    }

    return y;
  }

  function drawPointLabels(scale, labelCount) {
    const {
      ctx,
      options: {
        pointLabels
      }
    } = scale;

    for (let i = labelCount - 1; i >= 0; i--) {
      const optsAtIndex = pointLabels.setContext(scale.getContext(i));
      const plFont = toFont(optsAtIndex.font);
      const {
        x,
        y,
        textAlign,
        left,
        top,
        right,
        bottom
      } = scale._pointLabelItems[i];
      const {
        backdropColor
      } = optsAtIndex;

      if (!isNullOrUndef(backdropColor)) {
        const padding = toPadding(optsAtIndex.backdropPadding);
        ctx.fillStyle = backdropColor;
        ctx.fillRect(left - padding.left, top - padding.top, right - left + padding.width, bottom - top + padding.height);
      }

      renderText(ctx, scale._pointLabels[i], x, y + plFont.lineHeight / 2, plFont, {
        color: optsAtIndex.color,
        textAlign: textAlign,
        textBaseline: 'middle'
      });
    }
  }

  function pathRadiusLine(scale, radius, circular, labelCount) {
    const {
      ctx
    } = scale;

    if (circular) {
      ctx.arc(scale.xCenter, scale.yCenter, radius, 0, TAU);
    } else {
      let pointPosition = scale.getPointPosition(0, radius);
      ctx.moveTo(pointPosition.x, pointPosition.y);

      for (let i = 1; i < labelCount; i++) {
        pointPosition = scale.getPointPosition(i, radius);
        ctx.lineTo(pointPosition.x, pointPosition.y);
      }
    }
  }

  function drawRadiusLine(scale, gridLineOpts, radius, labelCount) {
    const ctx = scale.ctx;
    const circular = gridLineOpts.circular;
    const {
      color,
      lineWidth
    } = gridLineOpts;

    if (!circular && !labelCount || !color || !lineWidth || radius < 0) {
      return;
    }

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.setLineDash(gridLineOpts.borderDash);
    ctx.lineDashOffset = gridLineOpts.borderDashOffset;
    ctx.beginPath();
    pathRadiusLine(scale, radius, circular, labelCount);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  function numberOrZero(param) {
    return isNumber(param) ? param : 0;
  }

  class RadialLinearScale extends LinearScaleBase {
    constructor(cfg) {
      super(cfg);
      this.xCenter = undefined;
      this.yCenter = undefined;
      this.drawingArea = undefined;
      this._pointLabels = [];
      this._pointLabelItems = [];
    }

    setDimensions() {
      const me = this;
      me.width = me.maxWidth;
      me.height = me.maxHeight;
      me.paddingTop = getTickBackdropHeight(me.options) / 2;
      me.xCenter = Math.floor(me.width / 2);
      me.yCenter = Math.floor((me.height - me.paddingTop) / 2);
      me.drawingArea = Math.min(me.height - me.paddingTop, me.width) / 2;
    }

    determineDataLimits() {
      const me = this;
      const {
        min,
        max
      } = me.getMinMax(false);
      me.min = isNumberFinite(min) && !isNaN(min) ? min : 0;
      me.max = isNumberFinite(max) && !isNaN(max) ? max : 0;
      me.handleTickRangeOptions();
    }

    computeTickLimit() {
      return Math.ceil(this.drawingArea / getTickBackdropHeight(this.options));
    }

    generateTickLabels(ticks) {
      const me = this;
      LinearScaleBase.prototype.generateTickLabels.call(me, ticks);
      me._pointLabels = me.getLabels().map((value, index) => {
        const label = callback(me.options.pointLabels.callback, [value, index], me);
        return label || label === 0 ? label : '';
      });
    }

    fit() {
      const me = this;
      const opts = me.options;

      if (opts.display && opts.pointLabels.display) {
        fitWithPointLabels(me);
      } else {
        me.setCenterPoint(0, 0, 0, 0);
      }
    }

    _setReductions(largestPossibleRadius, furthestLimits, furthestAngles) {
      const me = this;
      let radiusReductionLeft = furthestLimits.l / Math.sin(furthestAngles.l);
      let radiusReductionRight = Math.max(furthestLimits.r - me.width, 0) / Math.sin(furthestAngles.r);
      let radiusReductionTop = -furthestLimits.t / Math.cos(furthestAngles.t);
      let radiusReductionBottom = -Math.max(furthestLimits.b - (me.height - me.paddingTop), 0) / Math.cos(furthestAngles.b);
      radiusReductionLeft = numberOrZero(radiusReductionLeft);
      radiusReductionRight = numberOrZero(radiusReductionRight);
      radiusReductionTop = numberOrZero(radiusReductionTop);
      radiusReductionBottom = numberOrZero(radiusReductionBottom);
      me.drawingArea = Math.max(largestPossibleRadius / 2, Math.min(Math.floor(largestPossibleRadius - (radiusReductionLeft + radiusReductionRight) / 2), Math.floor(largestPossibleRadius - (radiusReductionTop + radiusReductionBottom) / 2)));
      me.setCenterPoint(radiusReductionLeft, radiusReductionRight, radiusReductionTop, radiusReductionBottom);
    }

    setCenterPoint(leftMovement, rightMovement, topMovement, bottomMovement) {
      const me = this;
      const maxRight = me.width - rightMovement - me.drawingArea;
      const maxLeft = leftMovement + me.drawingArea;
      const maxTop = topMovement + me.drawingArea;
      const maxBottom = me.height - me.paddingTop - bottomMovement - me.drawingArea;
      me.xCenter = Math.floor((maxLeft + maxRight) / 2 + me.left);
      me.yCenter = Math.floor((maxTop + maxBottom) / 2 + me.top + me.paddingTop);
    }

    getIndexAngle(index) {
      const angleMultiplier = TAU / this.getLabels().length;
      const startAngle = this.options.startAngle || 0;
      return _normalizeAngle(index * angleMultiplier + toRadians(startAngle));
    }

    getDistanceFromCenterForValue(value) {
      const me = this;

      if (isNullOrUndef(value)) {
        return NaN;
      }

      const scalingFactor = me.drawingArea / (me.max - me.min);

      if (me.options.reverse) {
        return (me.max - value) * scalingFactor;
      }

      return (value - me.min) * scalingFactor;
    }

    getValueForDistanceFromCenter(distance) {
      if (isNullOrUndef(distance)) {
        return NaN;
      }

      const me = this;
      const scaledDistance = distance / (me.drawingArea / (me.max - me.min));
      return me.options.reverse ? me.max - scaledDistance : me.min + scaledDistance;
    }

    getPointPosition(index, distanceFromCenter) {
      const me = this;
      const angle = me.getIndexAngle(index) - HALF_PI;
      return {
        x: Math.cos(angle) * distanceFromCenter + me.xCenter,
        y: Math.sin(angle) * distanceFromCenter + me.yCenter,
        angle
      };
    }

    getPointPositionForValue(index, value) {
      return this.getPointPosition(index, this.getDistanceFromCenterForValue(value));
    }

    getBasePosition(index) {
      return this.getPointPositionForValue(index || 0, this.getBaseValue());
    }

    getPointLabelPosition(index) {
      const {
        left,
        top,
        right,
        bottom
      } = this._pointLabelItems[index];
      return {
        left,
        top,
        right,
        bottom
      };
    }

    drawBackground() {
      const me = this;
      const {
        backgroundColor,
        grid: {
          circular
        }
      } = me.options;

      if (backgroundColor) {
        const ctx = me.ctx;
        ctx.save();
        ctx.beginPath();
        pathRadiusLine(me, me.getDistanceFromCenterForValue(me._endValue), circular, me.getLabels().length);
        ctx.closePath();
        ctx.fillStyle = backgroundColor;
        ctx.fill();
        ctx.restore();
      }
    }

    drawGrid() {
      const me = this;
      const ctx = me.ctx;
      const opts = me.options;
      const {
        angleLines,
        grid
      } = opts;
      const labelCount = me.getLabels().length;
      let i, offset, position;

      if (opts.pointLabels.display) {
        drawPointLabels(me, labelCount);
      }

      if (grid.display) {
        me.ticks.forEach((tick, index) => {
          if (index !== 0) {
            offset = me.getDistanceFromCenterForValue(tick.value);
            const optsAtIndex = grid.setContext(me.getContext(index - 1));
            drawRadiusLine(me, optsAtIndex, offset, labelCount);
          }
        });
      }

      if (angleLines.display) {
        ctx.save();

        for (i = me.getLabels().length - 1; i >= 0; i--) {
          const optsAtIndex = angleLines.setContext(me.getContext(i));
          const {
            color,
            lineWidth
          } = optsAtIndex;

          if (!lineWidth || !color) {
            continue;
          }

          ctx.lineWidth = lineWidth;
          ctx.strokeStyle = color;
          ctx.setLineDash(optsAtIndex.borderDash);
          ctx.lineDashOffset = optsAtIndex.borderDashOffset;
          offset = me.getDistanceFromCenterForValue(opts.ticks.reverse ? me.min : me.max);
          position = me.getPointPosition(i, offset);
          ctx.beginPath();
          ctx.moveTo(me.xCenter, me.yCenter);
          ctx.lineTo(position.x, position.y);
          ctx.stroke();
        }

        ctx.restore();
      }
    }

    drawBorder() {}

    drawLabels() {
      const me = this;
      const ctx = me.ctx;
      const opts = me.options;
      const tickOpts = opts.ticks;

      if (!tickOpts.display) {
        return;
      }

      const startAngle = me.getIndexAngle(0);
      let offset, width;
      ctx.save();
      ctx.translate(me.xCenter, me.yCenter);
      ctx.rotate(startAngle);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      me.ticks.forEach((tick, index) => {
        if (index === 0 && !opts.reverse) {
          return;
        }

        const optsAtIndex = tickOpts.setContext(me.getContext(index));
        const tickFont = toFont(optsAtIndex.font);
        offset = me.getDistanceFromCenterForValue(me.ticks[index].value);

        if (optsAtIndex.showLabelBackdrop) {
          ctx.font = tickFont.string;
          width = ctx.measureText(tick.label).width;
          ctx.fillStyle = optsAtIndex.backdropColor;
          const padding = toPadding(optsAtIndex.backdropPadding);
          ctx.fillRect(-width / 2 - padding.left, -offset - tickFont.size / 2 - padding.top, width + padding.width, tickFont.size + padding.height);
        }

        renderText(ctx, tick.label, 0, -offset, tickFont, {
          color: optsAtIndex.color
        });
      });
      ctx.restore();
    }

    drawTitle() {}

  }

  RadialLinearScale.id = 'radialLinear';
  RadialLinearScale.defaults = {
    display: true,
    animate: true,
    position: 'chartArea',
    angleLines: {
      display: true,
      lineWidth: 1,
      borderDash: [],
      borderDashOffset: 0.0
    },
    grid: {
      circular: false
    },
    startAngle: 0,
    ticks: {
      showLabelBackdrop: true,
      callback: Ticks.formatters.numeric
    },
    pointLabels: {
      backdropColor: undefined,
      backdropPadding: 2,
      display: true,
      font: {
        size: 10
      },

      callback(label) {
        return label;
      },

      padding: 5
    }
  };
  RadialLinearScale.defaultRoutes = {
    'angleLines.color': 'borderColor',
    'pointLabels.color': 'color',
    'ticks.color': 'color'
  };
  RadialLinearScale.descriptors = {
    angleLines: {
      _fallback: 'grid'
    }
  };
  const INTERVALS = {
    millisecond: {
      common: true,
      size: 1,
      steps: 1000
    },
    second: {
      common: true,
      size: 1000,
      steps: 60
    },
    minute: {
      common: true,
      size: 60000,
      steps: 60
    },
    hour: {
      common: true,
      size: 3600000,
      steps: 24
    },
    day: {
      common: true,
      size: 86400000,
      steps: 30
    },
    week: {
      common: false,
      size: 604800000,
      steps: 4
    },
    month: {
      common: true,
      size: 2.628e9,
      steps: 12
    },
    quarter: {
      common: false,
      size: 7.884e9,
      steps: 4
    },
    year: {
      common: true,
      size: 3.154e10
    }
  };
  const UNITS = Object.keys(INTERVALS);

  function sorter(a, b) {
    return a - b;
  }

  function parse(scale, input) {
    if (isNullOrUndef(input)) {
      return null;
    }

    const adapter = scale._adapter;
    const {
      parser,
      round,
      isoWeekday
    } = scale._parseOpts;
    let value = input;

    if (typeof parser === 'function') {
      value = parser(value);
    }

    if (!isNumberFinite(value)) {
      value = typeof parser === 'string' ? adapter.parse(value, parser) : adapter.parse(value);
    }

    if (value === null) {
      return null;
    }

    if (round) {
      value = round === 'week' && (isNumber(isoWeekday) || isoWeekday === true) ? adapter.startOf(value, 'isoWeek', isoWeekday) : adapter.startOf(value, round);
    }

    return +value;
  }

  function determineUnitForAutoTicks(minUnit, min, max, capacity) {
    const ilen = UNITS.length;

    for (let i = UNITS.indexOf(minUnit); i < ilen - 1; ++i) {
      const interval = INTERVALS[UNITS[i]];
      const factor = interval.steps ? interval.steps : Number.MAX_SAFE_INTEGER;

      if (interval.common && Math.ceil((max - min) / (factor * interval.size)) <= capacity) {
        return UNITS[i];
      }
    }

    return UNITS[ilen - 1];
  }

  function determineUnitForFormatting(scale, numTicks, minUnit, min, max) {
    for (let i = UNITS.length - 1; i >= UNITS.indexOf(minUnit); i--) {
      const unit = UNITS[i];

      if (INTERVALS[unit].common && scale._adapter.diff(max, min, unit) >= numTicks - 1) {
        return unit;
      }
    }

    return UNITS[minUnit ? UNITS.indexOf(minUnit) : 0];
  }

  function determineMajorUnit(unit) {
    for (let i = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i < ilen; ++i) {
      if (INTERVALS[UNITS[i]].common) {
        return UNITS[i];
      }
    }
  }

  function addTick(ticks, time, timestamps) {
    if (!timestamps) {
      ticks[time] = true;
    } else if (timestamps.length) {
      const {
        lo,
        hi
      } = _lookup(timestamps, time);

      const timestamp = timestamps[lo] >= time ? timestamps[lo] : timestamps[hi];
      ticks[timestamp] = true;
    }
  }

  function setMajorTicks(scale, ticks, map, majorUnit) {
    const adapter = scale._adapter;
    const first = +adapter.startOf(ticks[0].value, majorUnit);
    const last = ticks[ticks.length - 1].value;
    let major, index;

    for (major = first; major <= last; major = +adapter.add(major, 1, majorUnit)) {
      index = map[major];

      if (index >= 0) {
        ticks[index].major = true;
      }
    }

    return ticks;
  }

  function ticksFromTimestamps(scale, values, majorUnit) {
    const ticks = [];
    const map = {};
    const ilen = values.length;
    let i, value;

    for (i = 0; i < ilen; ++i) {
      value = values[i];
      map[value] = i;
      ticks.push({
        value,
        major: false
      });
    }

    return ilen === 0 || !majorUnit ? ticks : setMajorTicks(scale, ticks, map, majorUnit);
  }

  class TimeScale extends Scale {
    constructor(props) {
      super(props);
      this._cache = {
        data: [],
        labels: [],
        all: []
      };
      this._unit = 'day';
      this._majorUnit = undefined;
      this._offsets = {};
      this._normalized = false;
      this._parseOpts = undefined;
    }

    init(scaleOpts, opts) {
      const time = scaleOpts.time || (scaleOpts.time = {});
      const adapter = this._adapter = new _adapters._date(scaleOpts.adapters.date);
      mergeIf(time.displayFormats, adapter.formats());
      this._parseOpts = {
        parser: time.parser,
        round: time.round,
        isoWeekday: time.isoWeekday
      };
      super.init(scaleOpts);
      this._normalized = opts.normalized;
    }

    parse(raw, index) {
      if (raw === undefined) {
        return null;
      }

      return parse(this, raw);
    }

    beforeLayout() {
      super.beforeLayout();
      this._cache = {
        data: [],
        labels: [],
        all: []
      };
    }

    determineDataLimits() {
      const me = this;
      const options = me.options;
      const adapter = me._adapter;
      const unit = options.time.unit || 'day';
      let {
        min,
        max,
        minDefined,
        maxDefined
      } = me.getUserBounds();

      function _applyBounds(bounds) {
        if (!minDefined && !isNaN(bounds.min)) {
          min = Math.min(min, bounds.min);
        }

        if (!maxDefined && !isNaN(bounds.max)) {
          max = Math.max(max, bounds.max);
        }
      }

      if (!minDefined || !maxDefined) {
        _applyBounds(me._getLabelBounds());

        if (options.bounds !== 'ticks' || options.ticks.source !== 'labels') {
          _applyBounds(me.getMinMax(false));
        }
      }

      min = isNumberFinite(min) && !isNaN(min) ? min : +adapter.startOf(Date.now(), unit);
      max = isNumberFinite(max) && !isNaN(max) ? max : +adapter.endOf(Date.now(), unit) + 1;
      me.min = Math.min(min, max - 1);
      me.max = Math.max(min + 1, max);
    }

    _getLabelBounds() {
      const arr = this.getLabelTimestamps();
      let min = Number.POSITIVE_INFINITY;
      let max = Number.NEGATIVE_INFINITY;

      if (arr.length) {
        min = arr[0];
        max = arr[arr.length - 1];
      }

      return {
        min,
        max
      };
    }

    buildTicks() {
      const me = this;
      const options = me.options;
      const timeOpts = options.time;
      const tickOpts = options.ticks;
      const timestamps = tickOpts.source === 'labels' ? me.getLabelTimestamps() : me._generate();

      if (options.bounds === 'ticks' && timestamps.length) {
        me.min = me._userMin || timestamps[0];
        me.max = me._userMax || timestamps[timestamps.length - 1];
      }

      const min = me.min;
      const max = me.max;

      const ticks = _filterBetween(timestamps, min, max);

      me._unit = timeOpts.unit || (tickOpts.autoSkip ? determineUnitForAutoTicks(timeOpts.minUnit, me.min, me.max, me._getLabelCapacity(min)) : determineUnitForFormatting(me, ticks.length, timeOpts.minUnit, me.min, me.max));
      me._majorUnit = !tickOpts.major.enabled || me._unit === 'year' ? undefined : determineMajorUnit(me._unit);
      me.initOffsets(timestamps);

      if (options.reverse) {
        ticks.reverse();
      }

      return ticksFromTimestamps(me, ticks, me._majorUnit);
    }

    initOffsets(timestamps) {
      const me = this;
      let start = 0;
      let end = 0;
      let first, last;

      if (me.options.offset && timestamps.length) {
        first = me.getDecimalForValue(timestamps[0]);

        if (timestamps.length === 1) {
          start = 1 - first;
        } else {
          start = (me.getDecimalForValue(timestamps[1]) - first) / 2;
        }

        last = me.getDecimalForValue(timestamps[timestamps.length - 1]);

        if (timestamps.length === 1) {
          end = last;
        } else {
          end = (last - me.getDecimalForValue(timestamps[timestamps.length - 2])) / 2;
        }
      }

      const limit = timestamps.length < 3 ? 0.5 : 0.25;
      start = _limitValue(start, 0, limit);
      end = _limitValue(end, 0, limit);
      me._offsets = {
        start,
        end,
        factor: 1 / (start + 1 + end)
      };
    }

    _generate() {
      const me = this;
      const adapter = me._adapter;
      const min = me.min;
      const max = me.max;
      const options = me.options;
      const timeOpts = options.time;
      const minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min, max, me._getLabelCapacity(min));
      const stepSize = valueOrDefault(timeOpts.stepSize, 1);
      const weekday = minor === 'week' ? timeOpts.isoWeekday : false;
      const hasWeekday = isNumber(weekday) || weekday === true;
      const ticks = {};
      let first = min;
      let time, count;

      if (hasWeekday) {
        first = +adapter.startOf(first, 'isoWeek', weekday);
      }

      first = +adapter.startOf(first, hasWeekday ? 'day' : minor);

      if (adapter.diff(max, min, minor) > 100000 * stepSize) {
        throw new Error(min + ' and ' + max + ' are too far apart with stepSize of ' + stepSize + ' ' + minor);
      }

      const timestamps = options.ticks.source === 'data' && me.getDataTimestamps();

      for (time = first, count = 0; time < max; time = +adapter.add(time, stepSize, minor), count++) {
        addTick(ticks, time, timestamps);
      }

      if (time === max || options.bounds === 'ticks' || count === 1) {
        addTick(ticks, time, timestamps);
      }

      return Object.keys(ticks).sort((a, b) => a - b).map(x => +x);
    }

    getLabelForValue(value) {
      const me = this;
      const adapter = me._adapter;
      const timeOpts = me.options.time;

      if (timeOpts.tooltipFormat) {
        return adapter.format(value, timeOpts.tooltipFormat);
      }

      return adapter.format(value, timeOpts.displayFormats.datetime);
    }

    _tickFormatFunction(time, index, ticks, format) {
      const me = this;
      const options = me.options;
      const formats = options.time.displayFormats;
      const unit = me._unit;
      const majorUnit = me._majorUnit;
      const minorFormat = unit && formats[unit];
      const majorFormat = majorUnit && formats[majorUnit];
      const tick = ticks[index];
      const major = majorUnit && majorFormat && tick && tick.major;

      const label = me._adapter.format(time, format || (major ? majorFormat : minorFormat));

      const formatter = options.ticks.callback;
      return formatter ? callback(formatter, [label, index, ticks], me) : label;
    }

    generateTickLabels(ticks) {
      let i, ilen, tick;

      for (i = 0, ilen = ticks.length; i < ilen; ++i) {
        tick = ticks[i];
        tick.label = this._tickFormatFunction(tick.value, i, ticks);
      }
    }

    getDecimalForValue(value) {
      const me = this;
      return value === null ? NaN : (value - me.min) / (me.max - me.min);
    }

    getPixelForValue(value) {
      const me = this;
      const offsets = me._offsets;
      const pos = me.getDecimalForValue(value);
      return me.getPixelForDecimal((offsets.start + pos) * offsets.factor);
    }

    getValueForPixel(pixel) {
      const me = this;
      const offsets = me._offsets;
      const pos = me.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
      return me.min + pos * (me.max - me.min);
    }

    _getLabelSize(label) {
      const me = this;
      const ticksOpts = me.options.ticks;
      const tickLabelWidth = me.ctx.measureText(label).width;
      const angle = toRadians(me.isHorizontal() ? ticksOpts.maxRotation : ticksOpts.minRotation);
      const cosRotation = Math.cos(angle);
      const sinRotation = Math.sin(angle);

      const tickFontSize = me._resolveTickFontOptions(0).size;

      return {
        w: tickLabelWidth * cosRotation + tickFontSize * sinRotation,
        h: tickLabelWidth * sinRotation + tickFontSize * cosRotation
      };
    }

    _getLabelCapacity(exampleTime) {
      const me = this;
      const timeOpts = me.options.time;
      const displayFormats = timeOpts.displayFormats;
      const format = displayFormats[timeOpts.unit] || displayFormats.millisecond;

      const exampleLabel = me._tickFormatFunction(exampleTime, 0, ticksFromTimestamps(me, [exampleTime], me._majorUnit), format);

      const size = me._getLabelSize(exampleLabel);

      const capacity = Math.floor(me.isHorizontal() ? me.width / size.w : me.height / size.h) - 1;
      return capacity > 0 ? capacity : 1;
    }

    getDataTimestamps() {
      const me = this;
      let timestamps = me._cache.data || [];
      let i, ilen;

      if (timestamps.length) {
        return timestamps;
      }

      const metas = me.getMatchingVisibleMetas();

      if (me._normalized && metas.length) {
        return me._cache.data = metas[0].controller.getAllParsedValues(me);
      }

      for (i = 0, ilen = metas.length; i < ilen; ++i) {
        timestamps = timestamps.concat(metas[i].controller.getAllParsedValues(me));
      }

      return me._cache.data = me.normalize(timestamps);
    }

    getLabelTimestamps() {
      const me = this;
      const timestamps = me._cache.labels || [];
      let i, ilen;

      if (timestamps.length) {
        return timestamps;
      }

      const labels = me.getLabels();

      for (i = 0, ilen = labels.length; i < ilen; ++i) {
        timestamps.push(parse(me, labels[i]));
      }

      return me._cache.labels = me._normalized ? timestamps : me.normalize(timestamps);
    }

    normalize(values) {
      return _arrayUnique(values.sort(sorter));
    }

  }

  TimeScale.id = 'time';
  TimeScale.defaults = {
    bounds: 'data',
    adapters: {},
    time: {
      parser: false,
      unit: false,
      round: false,
      isoWeekday: false,
      minUnit: 'millisecond',
      displayFormats: {}
    },
    ticks: {
      source: 'auto',
      major: {
        enabled: false
      }
    }
  };

  function interpolate(table, val, reverse) {
    let lo = 0;
    let hi = table.length - 1;
    let prevSource, nextSource, prevTarget, nextTarget;

    if (reverse) {
      if (val >= table[lo].pos && val <= table[hi].pos) {
        ({
          lo,
          hi
        } = _lookupByKey(table, 'pos', val));
      }

      ({
        pos: prevSource,
        time: prevTarget
      } = table[lo]);
      ({
        pos: nextSource,
        time: nextTarget
      } = table[hi]);
    } else {
      if (val >= table[lo].time && val <= table[hi].time) {
        ({
          lo,
          hi
        } = _lookupByKey(table, 'time', val));
      }

      ({
        time: prevSource,
        pos: prevTarget
      } = table[lo]);
      ({
        time: nextSource,
        pos: nextTarget
      } = table[hi]);
    }

    const span = nextSource - prevSource;
    return span ? prevTarget + (nextTarget - prevTarget) * (val - prevSource) / span : prevTarget;
  }

  class TimeSeriesScale extends TimeScale {
    constructor(props) {
      super(props);
      this._table = [];
      this._minPos = undefined;
      this._tableRange = undefined;
    }

    initOffsets() {
      const me = this;

      const timestamps = me._getTimestampsForTable();

      const table = me._table = me.buildLookupTable(timestamps);
      me._minPos = interpolate(table, me.min);
      me._tableRange = interpolate(table, me.max) - me._minPos;
      super.initOffsets(timestamps);
    }

    buildLookupTable(timestamps) {
      const {
        min,
        max
      } = this;
      const items = [];
      const table = [];
      let i, ilen, prev, curr, next;

      for (i = 0, ilen = timestamps.length; i < ilen; ++i) {
        curr = timestamps[i];

        if (curr >= min && curr <= max) {
          items.push(curr);
        }
      }

      if (items.length < 2) {
        return [{
          time: min,
          pos: 0
        }, {
          time: max,
          pos: 1
        }];
      }

      for (i = 0, ilen = items.length; i < ilen; ++i) {
        next = items[i + 1];
        prev = items[i - 1];
        curr = items[i];

        if (Math.round((next + prev) / 2) !== curr) {
          table.push({
            time: curr,
            pos: i / (ilen - 1)
          });
        }
      }

      return table;
    }

    _getTimestampsForTable() {
      const me = this;
      let timestamps = me._cache.all || [];

      if (timestamps.length) {
        return timestamps;
      }

      const data = me.getDataTimestamps();
      const label = me.getLabelTimestamps();

      if (data.length && label.length) {
        timestamps = me.normalize(data.concat(label));
      } else {
        timestamps = data.length ? data : label;
      }

      timestamps = me._cache.all = timestamps;
      return timestamps;
    }

    getDecimalForValue(value) {
      return (interpolate(this._table, value) - this._minPos) / this._tableRange;
    }

    getValueForPixel(pixel) {
      const me = this;
      const offsets = me._offsets;
      const decimal = me.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
      return interpolate(me._table, decimal * me._tableRange + me._minPos, true);
    }

  }

  TimeSeriesScale.id = 'timeseries';
  TimeSeriesScale.defaults = TimeScale.defaults;
  var scales = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CategoryScale: CategoryScale,
    LinearScale: LinearScale,
    LogarithmicScale: LogarithmicScale,
    RadialLinearScale: RadialLinearScale,
    TimeScale: TimeScale,
    TimeSeriesScale: TimeSeriesScale
  });
  Chart.register(controllers, scales, elements, plugins);
  Chart.helpers = { ...helpers
  };
  Chart._adapters = _adapters;
  Chart.Animation = Animation;
  Chart.Animations = Animations;
  Chart.animator = animator;
  Chart.controllers = registry.controllers.items;
  Chart.DatasetController = DatasetController;
  Chart.Element = Element;
  Chart.elements = elements;
  Chart.Interaction = Interaction;
  Chart.layouts = layouts;
  Chart.platforms = platforms;
  Chart.Scale = Scale;
  Chart.Ticks = Ticks;
  Object.assign(Chart, controllers, scales, elements, plugins, platforms);
  Chart.Chart = Chart;

  if (typeof window !== 'undefined') {
    window.Chart = Chart;
  }

  return Chart;
});
},{}],"ddb3dc54ac3a604c18c302314a865c0c":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view.js"));

var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Parcel 2
class ChartView extends _view.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_parentElement", document.querySelector(".graph__chart-box"));

    _defineProperty(this, "_menuElement", document.querySelector(".graph__menu"));

    _defineProperty(this, "_errorMessage", "We could not get the current weather report!");

    _defineProperty(this, "_message", "");

    _defineProperty(this, "_activeTabElement", document.querySelector(".graph__day--today"));

    _defineProperty(this, "_graphTempElement", document.getElementById("graph-temp"));

    _defineProperty(this, "_activeTempUnit", "C");

    _defineProperty(this, "_labels", []);

    _defineProperty(this, "_dataPoints", []);

    _defineProperty(this, "_myChart", void 0);
  }

  addHandlerClickOpt(handler) {
    this._menuElement.addEventListener("click", e => {
      if (e.target.classList.contains("graph__day")) {
        const optBtn = e.target;
        if (this._activeTabElement === optBtn) return;

        this._activeTabElement.classList.remove("graph__day--active");

        optBtn.classList.add("graph__day--active");
        this._activeTabElement = optBtn;
        handler();
      }
    });
  }

  changeTempUnit() {
    if (this._activeTempUnit === "C") {
      //F to C
      this._dataPoints = this._dataPoints.map(temp => {
        return ((temp - 32) * (5 / 9)).toFixed(1);
      });
    } else {
      // C to F
      this._dataPoints = this._dataPoints.map(temp => {
        return (temp * (9 / 5) + 32).toFixed(1);
      });
    }
  }

  addHandlerChangeUnit(handler) {
    this._graphTempElement.addEventListener("change", e => {
      if (e.target.value === "celcius") {
        //Celius current
        this._activeTempUnit = "C";
      } else {
        this._activeTempUnit = "F";
      }

      console.log(this._activeTempUnit);
      handler();
    });
  }

  createChartData(dataForChart) {
    const activeTabElement = this._activeTabElement;
    let labels, dataPoints;
    this._graphTempElement.value = "celcius";
    this._activeTempUnit = "C";

    if (activeTabElement.getAttribute("data-day") === "week") {
      const dailyData = dataForChart.daily;
      labels = dailyData.map(d => d.date);
      dataPoints = dailyData.map(d => d.temp);
    } else {
      const hourlyData = dataForChart.hourly;
      labels = hourlyData.map(d => d.time).slice(0, 24);
      dataPoints = hourlyData.map(d => d.temp).slice(0, 24);
    }

    this._labels = labels;
    this._dataPoints = dataPoints;
  }

  chartRender() {
    ///////////////////////////////////////////////////////
    const ctx = document.getElementById("myChart").getContext("2d");
    let labels = this._labels;
    let dataPoints = this._dataPoints;
    let tooltipUl;
    const plugin = {
      id: "custom_canvas_background_color",
      beforeDraw: chart => {
        const ctx = chart.canvas.getContext("2d");
        var chartArea = chart.chartArea;
        ctx.save();
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
        ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
        ctx.restore();
      }
    };
    const borderColors = dataPoints.map(temp => {
      if (temp > 0) {
        return "#6467e5";
      } else {
        return "#C93636";
      }
    });
    const colors = {
      purple: {
        default: "rgba(100, 103, 229,.1)",
        half: "rgba(156, 166, 207,.5)",
        quarter: "rgba(187, 195, 218,.25)",
        zero: "rgba(100, 103, 229,0)"
      },
      indigo: {
        default: "rgba(80, 102, 120, 1)",
        quarter: "rgba(80, 102, 120, 0.25)"
      }
    };
    const gradient = ctx.createLinearGradient(0, 25, 0, 300);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.35, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);
    const data = {
      labels: labels,
      datasets: [{
        label: `Temperature in C`,
        data: dataPoints,
        fill: false,
        tension: 0.15,
        fill: true,
        borderWidth: 2,
        pointRadius: 5,
        borderColor: borderColors,
        pointBorderColor: "#f1f7fd",
        pointBackgroundColor: borderColors,
        backgroundColor: gradient,
        fill: "start",
        pointHoverBackgroundColor: "#ffae47",
        pointHoverBorderColor: "#ffae47",
        pointHoverRadius: 5
      }]
    }; // Custom Tooltip Handler

    const getOrCreateTooltip = chart => {
      let tooltipEle = chart.canvas.parentNode.querySelector("div");

      if (!tooltipEle) {
        tooltipEle = document.createElement("DIV");
        tooltipEle.classList.add("tooltip");
        tooltipUl = document.createElement("UL");
        tooltipUl.classList.add("tooltip__list"); //append ul tooltip element to parent

        tooltipEle.appendChild(tooltipUl); //append tooltipEl to canvas

        chart.canvas.parentNode.appendChild(tooltipEle);
        console.log(chart.canvas.parentNode);
      }

      return tooltipEle;
    };

    const externalTooltipHandler = function (context) {
      const {
        chart,
        tooltip
      } = context;
      const tooltipEle = getOrCreateTooltip(chart); // Hide if no tooltip

      if (tooltip.opacity === 0) {
        tooltipEle.style.opacity = 0;
        return;
      } //Tooltip text


      if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map(b => b.lines);
        const tooltipLi = document.createElement("LI");
        titleLines.forEach(title => {
          tooltipUl.appendChild(tooltipLi); //create the span

          const tooltipSpan = document.createElement("SPAN");
          tooltipLi.appendChild(tooltipSpan); //Create a text node with title

          const tooltipTitle = document.createTextNode(title);
          tooltipSpan.appendChild(tooltipTitle);
        });
      }
    }; //Chart Instance


    this._myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.labels,
        datasets: data.datasets
      },
      plugins: [plugin],
      options: {
        responsive: true,
        legend: {
          display: false
        },
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              padding: 10,
              autoSkip: false
            },
            grid: {
              display: false
            }
          },
          y: {
            ticks: {
              beginAtZero: true
            }
          }
        },
        chartArea: {
          backgroundColor: "#fff"
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {// enabled: false,
            // external: externalTooltipHandler
          }
        }
      }
    });
  }

  updateChart() {
    this._myChart.data.labels = this._labels;
    this._myChart.data.datasets[0].data = this._dataPoints;
    this._myChart.data.datasets[0].label = `Temperature in ${this._activeTempUnit === "C" ? "C" : "F"}`;

    this._myChart.update();
  }

}

var _default = new ChartView();

exports.default = _default;
},{"./view.js":"6a3957d8744bf1d70b2b44f3726dda59","url:../../img/icons.svg":"b03a103b798a8aab4c0c56ff31cee7f9"}],"6a3957d8744bf1d70b2b44f3726dda59":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Parcel 2
class View {
  constructor() {
    _defineProperty(this, "_data", void 0);
  }

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Jonas Schmedtmann
   * @todo Finish implementation
   */
  render(data, render = true) {
    if (!data || Array.isArray(data) && data.length === 0) return this.renderError();
    this._data = data;

    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;

    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));
    newElements.forEach((newEl, i) => {
      var _newEl$firstChild;

      const curEl = curElements[i]; // console.log(curEl, newEl.isEqualNode(curEl));
      // Updates changed TEXT

      if (!newEl.isEqualNode(curEl) && ((_newEl$firstChild = newEl.firstChild) === null || _newEl$firstChild === void 0 ? void 0 : _newEl$firstChild.nodeValue.trim()) !== "") {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      } // Updates changed ATTRIBUES


      if (!newEl.isEqualNode(curEl)) Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
            <div class="loadingio-spinner-ripple-6rno6gsyx56"><div class="ldio-nvbdm15blb">
            <div></div><div></div>
            </div></div>
        `;

    this._clear();

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${_icons.default}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clear();

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${_icons.default}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clear();

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

}

exports.default = View;
},{"url:../../img/icons.svg":"b03a103b798a8aab4c0c56ff31cee7f9"}],"b03a103b798a8aab4c0c56ff31cee7f9":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + require('./relative-path')("90cb859263b48920", "4099aefe9d0dc1ed");
},{"./bundle-url":"2146da1905b95151ed14d455c784e7b7","./relative-path":"1b9943ef25c7bbdf0dd1b9fa91880a6c"}],"2146da1905b95151ed14d455c784e7b7":[function(require,module,exports) {
"use strict";

/* globals document:readonly */
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.


function getOrigin(url) {
  let matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);

  if (!matches) {
    throw new Error('Origin not found');
  }

  return matches[0];
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;
},{}],"1b9943ef25c7bbdf0dd1b9fa91880a6c":[function(require,module,exports) {
"use strict";

var resolve = require('./bundle-manifest').resolve;

module.exports = function (fromId, toId) {
  return relative(dirname(resolve(fromId)), resolve(toId));
};

function dirname(_filePath) {
  if (_filePath === '') {
    return '.';
  }

  var filePath = _filePath[_filePath.length - 1] === '/' ? _filePath.slice(0, _filePath.length - 1) : _filePath;
  var slashIndex = filePath.lastIndexOf('/');
  return slashIndex === -1 ? '.' : filePath.slice(0, slashIndex);
}

function relative(from, to) {
  if (from === to) {
    return '';
  }

  var fromParts = from.split('/');

  if (fromParts[0] === '.') {
    fromParts.shift();
  }

  var toParts = to.split('/');

  if (toParts[0] === '.') {
    toParts.shift();
  } // Find where path segments diverge.


  var i;
  var divergeIndex;

  for (i = 0; (i < toParts.length || i < fromParts.length) && divergeIndex == null; i++) {
    if (fromParts[i] !== toParts[i]) {
      divergeIndex = i;
    }
  } // If there are segments from "from" beyond the point of divergence,
  // return back up the path to that point using "..".


  var parts = [];

  for (i = 0; i < fromParts.length - divergeIndex; i++) {
    parts.push('..');
  } // If there are segments from "to" beyond the point of divergence,
  // continue using the remaining segments.


  if (toParts.length > divergeIndex) {
    parts.push.apply(parts, toParts.slice(divergeIndex));
  }

  return parts.join('/');
}

module.exports._dirname = dirname;
module.exports._relative = relative;
},{"./bundle-manifest":"ba8df6b71e73837c465d69bebde6e64d"}],"aabf248f40f7693ef84a0cb99f385d1f":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveCurrentWeatherData = exports.loadWeatherData = exports.getPlaceName = exports.getPosition = exports.state = void 0;

var _config = require("./config.js");

var _helper = require("./helper.js");

var moment = _interopRequireWildcard(require("moment-timezone"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//State object
const state = {
  location: {
    //setting default location of paris
    lat: 48.8566969,
    lng: 2.3514616
  },
  tz: "Europe/Paris",
  current: {},
  daily: {},
  hourly: {},
  city: "Paris",
  country: "France"
};
exports.state = state;
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

const setLocationCoords = function (lat, lng) {
  state.location.lat = lat;
  state.location.lng = lng;
}; // Getting location using geolocation API


const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(position => {
      const {
        latitude,
        longitude
      } = position.coords;
      setLocationCoords(latitude, longitude);
      resolve();
    }, err => {
      alert("Unable to access your location, make sure you allow location access.");
      resolve();
    }, options);
  });
};

exports.getPosition = getPosition;

const getPlaceName = async function (query) {
  try {
    const placeNameData = await (0, _helper.AJAX)(`${_config.FORWARD_GEOCODING_API_URL}q=${query}&key=${_config.GEOCODING_API_KEY}`);
    const {
      lat,
      lng
    } = placeNameData.results[0].geometry;
    state.location.lat = lat;
    state.location.lng = lng;
    state.city = placeNameData.results[0].components.city;

    if (!state.city) {
      state.city = placeNameData.results[0].components.state_district;
    }

    state.country = placeNameData.results[0].components.country;
  } catch (err) {
    console.error(err);
  }
};

exports.getPlaceName = getPlaceName;

const loadWeatherData = async function (locationDetails = true) {
  try {
    const lat = state.location.lat;
    const lng = state.location.lng; // Get weather data

    const dataWeather = await (0, _helper.AJAX)(`${_config.WEATHER_API_URL}lat=${lat}&lon=${lng}&units=metric&appid=${_config.WEATHER_API_KEY}`);
    const tz = dataWeather.timezone;
    state.tz = tz;
    saveCurrentWeatherData(dataWeather);
    saveDailyWeatherData(dataWeather.daily);
    saveHourlyWeatherData(dataWeather.hourly); // Get Location details

    if (locationDetails) {
      const locationData = await (0, _helper.AJAX)(`${_config.GEOCODING_API_URL}q=${lat}+${lng}&key=${_config.GEOCODING_API_KEY}`);
      state.city = locationData.results[0].components.city;

      if (!state.city) {
        state.city = locationData.results[0].components.state_district;
      }

      state.country = locationData.results[0].components.country;
    }
  } catch (err) {
    throw err;
  }
};

exports.loadWeatherData = loadWeatherData;

const getDateTime = function (dt) {
  const dateObj = moment.tz(dt * 1000, state.tz); //date time datas

  const day = _helper.dayNames[dateObj.day()].slice(0, 3);

  const hour = dateObj.hours().toString().padStart(2, 0);
  const min = dateObj.minutes().toString().padStart(2, 0);
  const date = dateObj.date();

  const month = _helper.monthNames[dateObj.month()];

  const timeStr = `${hour}:${min}`;
  return {
    date,
    month,
    day,
    time: timeStr
  };
};

const saveCurrentWeatherData = function (data) {
  const current = data.current;
  const dt = current.dt; //weather report current

  const dtData = getDateTime(dt);
  const dateStr = `${dtData.day}, ${dtData.date} ${dtData.month}`;
  state.current = {
    date: dateStr,
    time: dtData.time,
    temp: `${current.temp > 0 ? "+" + current.temp : current.temp}`,
    humidity: current.humidity,
    precipitation: data.hourly[0].pop,
    windSpeed: (current.wind_speed / 3.6).toFixed(2),
    icon: _helper.weatherIcons[current.weather[current.weather.length - 1].icon]
  };
};

exports.saveCurrentWeatherData = saveCurrentWeatherData;

const saveDailyWeatherData = function (data) {
  const daily = data.map(element => {
    return {
      date: `${getDateTime(element.dt).date} ${getDateTime(element.dt).day}`,
      temp: element.temp.day,
      windSpeed: (element.wind_speed / 3.6).toFixed(2),
      precipitation: element.pop,
      rain: (element === null || element === void 0 ? void 0 : element.rain) ?? 0,
      sunrise: getDateTime(element.sunrise).time,
      sunset: getDateTime(element.sunset).time,
      humidity: element.humidity,
      min: Math.trunc(element.temp.min),
      max: Math.trunc(element.temp.max),
      icon: _helper.weatherIcons[element.weather[element.weather.length - 1].icon]
    };
  });
  state.daily = daily;
};

const saveHourlyWeatherData = function (data) {
  const hourly = data.map(element => {
    return {
      time: getDateTime(element.dt).time,
      temp: element.temp,
      windSpeed: (element.wind_speed / 3.6).toFixed(2),
      precipitation: element.pop,
      humidity: element.humidity,
      icon: element.weather[0].icon
    };
  });
  state.hourly = hourly;
};
},{"./config.js":"09212d541c5c40ff2bd93475a904f8de","./helper.js":"ca5e72bede557533b2de19db21a2a688","moment-timezone":"6c9ca462b8314d26ea45c5d57f36bf5d"}],"09212d541c5c40ff2bd93475a904f8de":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UNSPLASH_API_URL = exports.CLIENT_ID = exports.TOP_CITIES_API_URL = exports.FORWARD_GEOCODING_API_URL = exports.GEOCODING_API_URL = exports.GEOCODING_API_KEY = exports.TIMEOUT_SEC = exports.WEATHER_API_URL = exports.WEATHER_API_KEY = void 0;
// Weather Api
const WEATHER_API_KEY = "f19d6e315954bfb123e794ab55aa28c4";
exports.WEATHER_API_KEY = WEATHER_API_KEY;
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/onecall?"; //Time out sec

exports.WEATHER_API_URL = WEATHER_API_URL;
const TIMEOUT_SEC = 10; //Reverse Geo coding api

exports.TIMEOUT_SEC = TIMEOUT_SEC;
const GEOCODING_API_KEY = "aae818fd5d614230867fe6c0f6ecebfd";
exports.GEOCODING_API_KEY = GEOCODING_API_KEY;
const GEOCODING_API_URL = "https://api.opencagedata.com/geocode/v1/json?"; //Forward Geo coding api

exports.GEOCODING_API_URL = GEOCODING_API_URL;
const FORWARD_GEOCODING_API_URL = "https://api.opencagedata.com/geocode/v1/json?no_annotations=1&limit=1&"; //top cities api

exports.FORWARD_GEOCODING_API_URL = FORWARD_GEOCODING_API_URL;
const TOP_CITIES_API_URL = "https://public.opendatasoft.com/api/records/1.0/search/?"; //unsplash

exports.TOP_CITIES_API_URL = TOP_CITIES_API_URL;
const CLIENT_ID = "0j5OZNeBwqxefshO-zkuVsZ3HOGZhvp4ldzLWwFx25Y";
exports.CLIENT_ID = CLIENT_ID;
const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos?";
exports.UNSPLASH_API_URL = UNSPLASH_API_URL;
},{}],"ca5e72bede557533b2de19db21a2a688":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.weatherIcons = exports.dayNames = exports.monthNames = exports.AJAX = void 0;

var _config = require("./config.js");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
}; //get json data from api


const AJAX = async function (url, method = undefined) {
  try {
    const fetchPro = method ? fetch(url, {
      method: "get"
    }) : fetch(url);
    const res = await Promise.race([fetchPro, timeout(_config.TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

exports.AJAX = AJAX;
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
exports.monthNames = monthNames;
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
exports.dayNames = dayNames;
const weatherIcons = {
  "11d": "thunderstorm",
  "01d": "sun",
  "01n": "moon",
  "02d": "cloudy-sun",
  "02n": "cloudy-moon",
  "50d": "haze",
  "50n": "haze",
  "10d": "rainy",
  "09d": "rainy-light",
  "03d": "cloud",
  "03n": "cloud",
  "04n": "cloudy",
  "04d": "cloudy",
  "13d": "snowy"
};
exports.weatherIcons = weatherIcons;
},{"./config.js":"09212d541c5c40ff2bd93475a904f8de"}],"6c9ca462b8314d26ea45c5d57f36bf5d":[function(require,module,exports) {
var moment = module.exports = require("./moment-timezone");
moment.tz.load(require('./data/packed/latest.json'));

},{"./moment-timezone":"cfe3caf17d25515966f3234173539744","./data/packed/latest.json":"ca901d8a619e1b7a2fdcf6085009960a"}],"cfe3caf17d25515966f3234173539744":[function(require,module,exports) {
var define;

//! moment-timezone.js
//! version : 0.5.33
//! Copyright (c) JS Foundation and other contributors
//! license : MIT
//! github.com/moment/moment-timezone
(function (root, factory) {
  "use strict";
  /*global define*/

  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('moment')); // Node
  } else if (typeof define === 'function' && define.amd) {
    define(['moment'], factory); // AMD
  } else {
    factory(root.moment); // Browser
  }
})(this, function (moment) {
  "use strict"; // Resolves es6 module loading issue

  if (moment.version === undefined && moment.default) {
    moment = moment.default;
  } // Do not load moment-timezone a second time.
  // if (moment.tz !== undefined) {
  // 	logError('Moment Timezone ' + moment.tz.version + ' was already loaded ' + (moment.tz.dataVersion ? 'with data from ' : 'without any data') + moment.tz.dataVersion);
  // 	return moment;
  // }


  var VERSION = "0.5.33",
      zones = {},
      links = {},
      countries = {},
      names = {},
      guesses = {},
      cachedGuess;

  if (!moment || typeof moment.version !== 'string') {
    logError('Moment Timezone requires Moment.js. See https://momentjs.com/timezone/docs/#/use-it/browser/');
  }

  var momentVersion = moment.version.split('.'),
      major = +momentVersion[0],
      minor = +momentVersion[1]; // Moment.js version check

  if (major < 2 || major === 2 && minor < 6) {
    logError('Moment Timezone requires Moment.js >= 2.6.0. You are using Moment.js ' + moment.version + '. See momentjs.com');
  }
  /************************************
  	Unpacking
  ************************************/


  function charCodeToInt(charCode) {
    if (charCode > 96) {
      return charCode - 87;
    } else if (charCode > 64) {
      return charCode - 29;
    }

    return charCode - 48;
  }

  function unpackBase60(string) {
    var i = 0,
        parts = string.split('.'),
        whole = parts[0],
        fractional = parts[1] || '',
        multiplier = 1,
        num,
        out = 0,
        sign = 1; // handle negative numbers

    if (string.charCodeAt(0) === 45) {
      i = 1;
      sign = -1;
    } // handle digits before the decimal


    for (i; i < whole.length; i++) {
      num = charCodeToInt(whole.charCodeAt(i));
      out = 60 * out + num;
    } // handle digits after the decimal


    for (i = 0; i < fractional.length; i++) {
      multiplier = multiplier / 60;
      num = charCodeToInt(fractional.charCodeAt(i));
      out += num * multiplier;
    }

    return out * sign;
  }

  function arrayToInt(array) {
    for (var i = 0; i < array.length; i++) {
      array[i] = unpackBase60(array[i]);
    }
  }

  function intToUntil(array, length) {
    for (var i = 0; i < length; i++) {
      array[i] = Math.round((array[i - 1] || 0) + array[i] * 60000); // minutes to milliseconds
    }

    array[length - 1] = Infinity;
  }

  function mapIndices(source, indices) {
    var out = [],
        i;

    for (i = 0; i < indices.length; i++) {
      out[i] = source[indices[i]];
    }

    return out;
  }

  function unpack(string) {
    var data = string.split('|'),
        offsets = data[2].split(' '),
        indices = data[3].split(''),
        untils = data[4].split(' ');
    arrayToInt(offsets);
    arrayToInt(indices);
    arrayToInt(untils);
    intToUntil(untils, indices.length);
    return {
      name: data[0],
      abbrs: mapIndices(data[1].split(' '), indices),
      offsets: mapIndices(offsets, indices),
      untils: untils,
      population: data[5] | 0
    };
  }
  /************************************
  	Zone object
  ************************************/


  function Zone(packedString) {
    if (packedString) {
      this._set(unpack(packedString));
    }
  }

  Zone.prototype = {
    _set: function (unpacked) {
      this.name = unpacked.name;
      this.abbrs = unpacked.abbrs;
      this.untils = unpacked.untils;
      this.offsets = unpacked.offsets;
      this.population = unpacked.population;
    },
    _index: function (timestamp) {
      var target = +timestamp,
          untils = this.untils,
          i;

      for (i = 0; i < untils.length; i++) {
        if (target < untils[i]) {
          return i;
        }
      }
    },
    countries: function () {
      var zone_name = this.name;
      return Object.keys(countries).filter(function (country_code) {
        return countries[country_code].zones.indexOf(zone_name) !== -1;
      });
    },
    parse: function (timestamp) {
      var target = +timestamp,
          offsets = this.offsets,
          untils = this.untils,
          max = untils.length - 1,
          offset,
          offsetNext,
          offsetPrev,
          i;

      for (i = 0; i < max; i++) {
        offset = offsets[i];
        offsetNext = offsets[i + 1];
        offsetPrev = offsets[i ? i - 1 : i];

        if (offset < offsetNext && tz.moveAmbiguousForward) {
          offset = offsetNext;
        } else if (offset > offsetPrev && tz.moveInvalidForward) {
          offset = offsetPrev;
        }

        if (target < untils[i] - offset * 60000) {
          return offsets[i];
        }
      }

      return offsets[max];
    },
    abbr: function (mom) {
      return this.abbrs[this._index(mom)];
    },
    offset: function (mom) {
      logError("zone.offset has been deprecated in favor of zone.utcOffset");
      return this.offsets[this._index(mom)];
    },
    utcOffset: function (mom) {
      return this.offsets[this._index(mom)];
    }
  };
  /************************************
  	Country object
  ************************************/

  function Country(country_name, zone_names) {
    this.name = country_name;
    this.zones = zone_names;
  }
  /************************************
  	Current Timezone
  ************************************/


  function OffsetAt(at) {
    var timeString = at.toTimeString();
    var abbr = timeString.match(/\([a-z ]+\)/i);

    if (abbr && abbr[0]) {
      // 17:56:31 GMT-0600 (CST)
      // 17:56:31 GMT-0600 (Central Standard Time)
      abbr = abbr[0].match(/[A-Z]/g);
      abbr = abbr ? abbr.join('') : undefined;
    } else {
      // 17:56:31 CST
      // 17:56:31 GMT+0800 (台北標準時間)
      abbr = timeString.match(/[A-Z]{3,5}/g);
      abbr = abbr ? abbr[0] : undefined;
    }

    if (abbr === 'GMT') {
      abbr = undefined;
    }

    this.at = +at;
    this.abbr = abbr;
    this.offset = at.getTimezoneOffset();
  }

  function ZoneScore(zone) {
    this.zone = zone;
    this.offsetScore = 0;
    this.abbrScore = 0;
  }

  ZoneScore.prototype.scoreOffsetAt = function (offsetAt) {
    this.offsetScore += Math.abs(this.zone.utcOffset(offsetAt.at) - offsetAt.offset);

    if (this.zone.abbr(offsetAt.at).replace(/[^A-Z]/g, '') !== offsetAt.abbr) {
      this.abbrScore++;
    }
  };

  function findChange(low, high) {
    var mid, diff;

    while (diff = ((high.at - low.at) / 12e4 | 0) * 6e4) {
      mid = new OffsetAt(new Date(low.at + diff));

      if (mid.offset === low.offset) {
        low = mid;
      } else {
        high = mid;
      }
    }

    return low;
  }

  function userOffsets() {
    var startYear = new Date().getFullYear() - 2,
        last = new OffsetAt(new Date(startYear, 0, 1)),
        offsets = [last],
        change,
        next,
        i;

    for (i = 1; i < 48; i++) {
      next = new OffsetAt(new Date(startYear, i, 1));

      if (next.offset !== last.offset) {
        change = findChange(last, next);
        offsets.push(change);
        offsets.push(new OffsetAt(new Date(change.at + 6e4)));
      }

      last = next;
    }

    for (i = 0; i < 4; i++) {
      offsets.push(new OffsetAt(new Date(startYear + i, 0, 1)));
      offsets.push(new OffsetAt(new Date(startYear + i, 6, 1)));
    }

    return offsets;
  }

  function sortZoneScores(a, b) {
    if (a.offsetScore !== b.offsetScore) {
      return a.offsetScore - b.offsetScore;
    }

    if (a.abbrScore !== b.abbrScore) {
      return a.abbrScore - b.abbrScore;
    }

    if (a.zone.population !== b.zone.population) {
      return b.zone.population - a.zone.population;
    }

    return b.zone.name.localeCompare(a.zone.name);
  }

  function addToGuesses(name, offsets) {
    var i, offset;
    arrayToInt(offsets);

    for (i = 0; i < offsets.length; i++) {
      offset = offsets[i];
      guesses[offset] = guesses[offset] || {};
      guesses[offset][name] = true;
    }
  }

  function guessesForUserOffsets(offsets) {
    var offsetsLength = offsets.length,
        filteredGuesses = {},
        out = [],
        i,
        j,
        guessesOffset;

    for (i = 0; i < offsetsLength; i++) {
      guessesOffset = guesses[offsets[i].offset] || {};

      for (j in guessesOffset) {
        if (guessesOffset.hasOwnProperty(j)) {
          filteredGuesses[j] = true;
        }
      }
    }

    for (i in filteredGuesses) {
      if (filteredGuesses.hasOwnProperty(i)) {
        out.push(names[i]);
      }
    }

    return out;
  }

  function rebuildGuess() {
    // use Intl API when available and returning valid time zone
    try {
      var intlName = Intl.DateTimeFormat().resolvedOptions().timeZone;

      if (intlName && intlName.length > 3) {
        var name = names[normalizeName(intlName)];

        if (name) {
          return name;
        }

        logError("Moment Timezone found " + intlName + " from the Intl api, but did not have that data loaded.");
      }
    } catch (e) {// Intl unavailable, fall back to manual guessing.
    }

    var offsets = userOffsets(),
        offsetsLength = offsets.length,
        guesses = guessesForUserOffsets(offsets),
        zoneScores = [],
        zoneScore,
        i,
        j;

    for (i = 0; i < guesses.length; i++) {
      zoneScore = new ZoneScore(getZone(guesses[i]), offsetsLength);

      for (j = 0; j < offsetsLength; j++) {
        zoneScore.scoreOffsetAt(offsets[j]);
      }

      zoneScores.push(zoneScore);
    }

    zoneScores.sort(sortZoneScores);
    return zoneScores.length > 0 ? zoneScores[0].zone.name : undefined;
  }

  function guess(ignoreCache) {
    if (!cachedGuess || ignoreCache) {
      cachedGuess = rebuildGuess();
    }

    return cachedGuess;
  }
  /************************************
  	Global Methods
  ************************************/


  function normalizeName(name) {
    return (name || '').toLowerCase().replace(/\//g, '_');
  }

  function addZone(packed) {
    var i, name, split, normalized;

    if (typeof packed === "string") {
      packed = [packed];
    }

    for (i = 0; i < packed.length; i++) {
      split = packed[i].split('|');
      name = split[0];
      normalized = normalizeName(name);
      zones[normalized] = packed[i];
      names[normalized] = name;
      addToGuesses(normalized, split[2].split(' '));
    }
  }

  function getZone(name, caller) {
    name = normalizeName(name);
    var zone = zones[name];
    var link;

    if (zone instanceof Zone) {
      return zone;
    }

    if (typeof zone === 'string') {
      zone = new Zone(zone);
      zones[name] = zone;
      return zone;
    } // Pass getZone to prevent recursion more than 1 level deep


    if (links[name] && caller !== getZone && (link = getZone(links[name], getZone))) {
      zone = zones[name] = new Zone();

      zone._set(link);

      zone.name = names[name];
      return zone;
    }

    return null;
  }

  function getNames() {
    var i,
        out = [];

    for (i in names) {
      if (names.hasOwnProperty(i) && (zones[i] || zones[links[i]]) && names[i]) {
        out.push(names[i]);
      }
    }

    return out.sort();
  }

  function getCountryNames() {
    return Object.keys(countries);
  }

  function addLink(aliases) {
    var i, alias, normal0, normal1;

    if (typeof aliases === "string") {
      aliases = [aliases];
    }

    for (i = 0; i < aliases.length; i++) {
      alias = aliases[i].split('|');
      normal0 = normalizeName(alias[0]);
      normal1 = normalizeName(alias[1]);
      links[normal0] = normal1;
      names[normal0] = alias[0];
      links[normal1] = normal0;
      names[normal1] = alias[1];
    }
  }

  function addCountries(data) {
    var i, country_code, country_zones, split;
    if (!data || !data.length) return;

    for (i = 0; i < data.length; i++) {
      split = data[i].split('|');
      country_code = split[0].toUpperCase();
      country_zones = split[1].split(' ');
      countries[country_code] = new Country(country_code, country_zones);
    }
  }

  function getCountry(name) {
    name = name.toUpperCase();
    return countries[name] || null;
  }

  function zonesForCountry(country, with_offset) {
    country = getCountry(country);
    if (!country) return null;
    var zones = country.zones.sort();

    if (with_offset) {
      return zones.map(function (zone_name) {
        var zone = getZone(zone_name);
        return {
          name: zone_name,
          offset: zone.utcOffset(new Date())
        };
      });
    }

    return zones;
  }

  function loadData(data) {
    addZone(data.zones);
    addLink(data.links);
    addCountries(data.countries);
    tz.dataVersion = data.version;
  }

  function zoneExists(name) {
    if (!zoneExists.didShowError) {
      zoneExists.didShowError = true;
      logError("moment.tz.zoneExists('" + name + "') has been deprecated in favor of !moment.tz.zone('" + name + "')");
    }

    return !!getZone(name);
  }

  function needsOffset(m) {
    var isUnixTimestamp = m._f === 'X' || m._f === 'x';
    return !!(m._a && m._tzm === undefined && !isUnixTimestamp);
  }

  function logError(message) {
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(message);
    }
  }
  /************************************
  	moment.tz namespace
  ************************************/


  function tz(input) {
    var args = Array.prototype.slice.call(arguments, 0, -1),
        name = arguments[arguments.length - 1],
        zone = getZone(name),
        out = moment.utc.apply(null, args);

    if (zone && !moment.isMoment(input) && needsOffset(out)) {
      out.add(zone.parse(out), 'minutes');
    }

    out.tz(name);
    return out;
  }

  tz.version = VERSION;
  tz.dataVersion = '';
  tz._zones = zones;
  tz._links = links;
  tz._names = names;
  tz._countries = countries;
  tz.add = addZone;
  tz.link = addLink;
  tz.load = loadData;
  tz.zone = getZone;
  tz.zoneExists = zoneExists; // deprecated in 0.1.0

  tz.guess = guess;
  tz.names = getNames;
  tz.Zone = Zone;
  tz.unpack = unpack;
  tz.unpackBase60 = unpackBase60;
  tz.needsOffset = needsOffset;
  tz.moveInvalidForward = true;
  tz.moveAmbiguousForward = false;
  tz.countries = getCountryNames;
  tz.zonesForCountry = zonesForCountry;
  /************************************
  	Interface with Moment.js
  ************************************/

  var fn = moment.fn;
  moment.tz = tz;
  moment.defaultZone = null;

  moment.updateOffset = function (mom, keepTime) {
    var zone = moment.defaultZone,
        offset;

    if (mom._z === undefined) {
      if (zone && needsOffset(mom) && !mom._isUTC) {
        mom._d = moment.utc(mom._a)._d;
        mom.utc().add(zone.parse(mom), 'minutes');
      }

      mom._z = zone;
    }

    if (mom._z) {
      offset = mom._z.utcOffset(mom);

      if (Math.abs(offset) < 16) {
        offset = offset / 60;
      }

      if (mom.utcOffset !== undefined) {
        var z = mom._z;
        mom.utcOffset(-offset, keepTime);
        mom._z = z;
      } else {
        mom.zone(offset, keepTime);
      }
    }
  };

  fn.tz = function (name, keepTime) {
    if (name) {
      if (typeof name !== 'string') {
        throw new Error('Time zone name must be a string, got ' + name + ' [' + typeof name + ']');
      }

      this._z = getZone(name);

      if (this._z) {
        moment.updateOffset(this, keepTime);
      } else {
        logError("Moment Timezone has no data for " + name + ". See http://momentjs.com/timezone/docs/#/data-loading/.");
      }

      return this;
    }

    if (this._z) {
      return this._z.name;
    }
  };

  function abbrWrap(old) {
    return function () {
      if (this._z) {
        return this._z.abbr(this);
      }

      return old.call(this);
    };
  }

  function resetZoneWrap(old) {
    return function () {
      this._z = null;
      return old.apply(this, arguments);
    };
  }

  function resetZoneWrap2(old) {
    return function () {
      if (arguments.length > 0) this._z = null;
      return old.apply(this, arguments);
    };
  }

  fn.zoneName = abbrWrap(fn.zoneName);
  fn.zoneAbbr = abbrWrap(fn.zoneAbbr);
  fn.utc = resetZoneWrap(fn.utc);
  fn.local = resetZoneWrap(fn.local);
  fn.utcOffset = resetZoneWrap2(fn.utcOffset);

  moment.tz.setDefault = function (name) {
    if (major < 2 || major === 2 && minor < 9) {
      logError('Moment Timezone setDefault() requires Moment.js >= 2.9.0. You are using Moment.js ' + moment.version + '.');
    }

    moment.defaultZone = name ? getZone(name) : null;
    return moment;
  }; // Cloning a moment should include the _z property.


  var momentProperties = moment.momentProperties;

  if (Object.prototype.toString.call(momentProperties) === '[object Array]') {
    // moment 2.8.1+
    momentProperties.push('_z');
    momentProperties.push('_a');
  } else if (momentProperties) {
    // moment 2.7.0
    momentProperties._z = null;
  } // INJECT DATA


  return moment;
});
},{"moment":"4819f1cde324c5f3d40da340b7faf328"}],"4819f1cde324c5f3d40da340b7faf328":[function(require,module,exports) {
var define;
//! moment.js
//! version : 2.29.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
;

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.moment = factory();
})(this, function () {
  'use strict';

  var hookCallback;

  function hooks() {
    return hookCallback.apply(null, arguments);
  } // This is done to register the method called with moment()
  // without creating circular dependencies.


  function setHookCallback(callback) {
    hookCallback = callback;
  }

  function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
  }

  function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
  }

  function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }

  function isObjectEmpty(obj) {
    if (Object.getOwnPropertyNames) {
      return Object.getOwnPropertyNames(obj).length === 0;
    } else {
      var k;

      for (k in obj) {
        if (hasOwnProp(obj, k)) {
          return false;
        }
      }

      return true;
    }
  }

  function isUndefined(input) {
    return input === void 0;
  }

  function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
  }

  function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
  }

  function map(arr, fn) {
    var res = [],
        i;

    for (i = 0; i < arr.length; ++i) {
      res.push(fn(arr[i], i));
    }

    return res;
  }

  function extend(a, b) {
    for (var i in b) {
      if (hasOwnProp(b, i)) {
        a[i] = b[i];
      }
    }

    if (hasOwnProp(b, 'toString')) {
      a.toString = b.toString;
    }

    if (hasOwnProp(b, 'valueOf')) {
      a.valueOf = b.valueOf;
    }

    return a;
  }

  function createUTC(input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
  }

  function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
      empty: false,
      unusedTokens: [],
      unusedInput: [],
      overflow: -2,
      charsLeftOver: 0,
      nullInput: false,
      invalidEra: null,
      invalidMonth: null,
      invalidFormat: false,
      userInvalidated: false,
      iso: false,
      parsedDateParts: [],
      era: null,
      meridiem: null,
      rfc2822: false,
      weekdayMismatch: false
    };
  }

  function getParsingFlags(m) {
    if (m._pf == null) {
      m._pf = defaultParsingFlags();
    }

    return m._pf;
  }

  var some;

  if (Array.prototype.some) {
    some = Array.prototype.some;
  } else {
    some = function (fun) {
      var t = Object(this),
          len = t.length >>> 0,
          i;

      for (i = 0; i < len; i++) {
        if (i in t && fun.call(this, t[i], i, t)) {
          return true;
        }
      }

      return false;
    };
  }

  function isValid(m) {
    if (m._isValid == null) {
      var flags = getParsingFlags(m),
          parsedParts = some.call(flags.parsedDateParts, function (i) {
        return i != null;
      }),
          isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);

      if (m._strict) {
        isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === undefined;
      }

      if (Object.isFrozen == null || !Object.isFrozen(m)) {
        m._isValid = isNowValid;
      } else {
        return isNowValid;
      }
    }

    return m._isValid;
  }

  function createInvalid(flags) {
    var m = createUTC(NaN);

    if (flags != null) {
      extend(getParsingFlags(m), flags);
    } else {
      getParsingFlags(m).userInvalidated = true;
    }

    return m;
  } // Plugins that add properties should also add the key here (null value),
  // so we can properly clone ourselves.


  var momentProperties = hooks.momentProperties = [],
      updateInProgress = false;

  function copyConfig(to, from) {
    var i, prop, val;

    if (!isUndefined(from._isAMomentObject)) {
      to._isAMomentObject = from._isAMomentObject;
    }

    if (!isUndefined(from._i)) {
      to._i = from._i;
    }

    if (!isUndefined(from._f)) {
      to._f = from._f;
    }

    if (!isUndefined(from._l)) {
      to._l = from._l;
    }

    if (!isUndefined(from._strict)) {
      to._strict = from._strict;
    }

    if (!isUndefined(from._tzm)) {
      to._tzm = from._tzm;
    }

    if (!isUndefined(from._isUTC)) {
      to._isUTC = from._isUTC;
    }

    if (!isUndefined(from._offset)) {
      to._offset = from._offset;
    }

    if (!isUndefined(from._pf)) {
      to._pf = getParsingFlags(from);
    }

    if (!isUndefined(from._locale)) {
      to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
      for (i = 0; i < momentProperties.length; i++) {
        prop = momentProperties[i];
        val = from[prop];

        if (!isUndefined(val)) {
          to[prop] = val;
        }
      }
    }

    return to;
  } // Moment prototype object


  function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);

    if (!this.isValid()) {
      this._d = new Date(NaN);
    } // Prevent infinite loop in case updateOffset creates new moment
    // objects.


    if (updateInProgress === false) {
      updateInProgress = true;
      hooks.updateOffset(this);
      updateInProgress = false;
    }
  }

  function isMoment(obj) {
    return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
  }

  function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
      console.warn('Deprecation warning: ' + msg);
    }
  }

  function deprecate(msg, fn) {
    var firstTime = true;
    return extend(function () {
      if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(null, msg);
      }

      if (firstTime) {
        var args = [],
            arg,
            i,
            key;

        for (i = 0; i < arguments.length; i++) {
          arg = '';

          if (typeof arguments[i] === 'object') {
            arg += '\n[' + i + '] ';

            for (key in arguments[0]) {
              if (hasOwnProp(arguments[0], key)) {
                arg += key + ': ' + arguments[0][key] + ', ';
              }
            }

            arg = arg.slice(0, -2); // Remove trailing comma and space
          } else {
            arg = arguments[i];
          }

          args.push(arg);
        }

        warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + new Error().stack);
        firstTime = false;
      }

      return fn.apply(this, arguments);
    }, fn);
  }

  var deprecations = {};

  function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
      hooks.deprecationHandler(name, msg);
    }

    if (!deprecations[name]) {
      warn(msg);
      deprecations[name] = true;
    }
  }

  hooks.suppressDeprecationWarnings = false;
  hooks.deprecationHandler = null;

  function isFunction(input) {
    return typeof Function !== 'undefined' && input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
  }

  function set(config) {
    var prop, i;

    for (i in config) {
      if (hasOwnProp(config, i)) {
        prop = config[i];

        if (isFunction(prop)) {
          this[i] = prop;
        } else {
          this['_' + i] = prop;
        }
      }
    }

    this._config = config; // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.

    this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + '|' + /\d{1,2}/.source);
  }

  function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig),
        prop;

    for (prop in childConfig) {
      if (hasOwnProp(childConfig, prop)) {
        if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
          res[prop] = {};
          extend(res[prop], parentConfig[prop]);
          extend(res[prop], childConfig[prop]);
        } else if (childConfig[prop] != null) {
          res[prop] = childConfig[prop];
        } else {
          delete res[prop];
        }
      }
    }

    for (prop in parentConfig) {
      if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
        // make sure changes to properties don't modify parent config
        res[prop] = extend({}, res[prop]);
      }
    }

    return res;
  }

  function Locale(config) {
    if (config != null) {
      this.set(config);
    }
  }

  var keys;

  if (Object.keys) {
    keys = Object.keys;
  } else {
    keys = function (obj) {
      var i,
          res = [];

      for (i in obj) {
        if (hasOwnProp(obj, i)) {
          res.push(i);
        }
      }

      return res;
    };
  }

  var defaultCalendar = {
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    nextWeek: 'dddd [at] LT',
    lastDay: '[Yesterday at] LT',
    lastWeek: '[Last] dddd [at] LT',
    sameElse: 'L'
  };

  function calendar(key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return isFunction(output) ? output.call(mom, now) : output;
  }

  function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
    return (sign ? forceSign ? '+' : '' : '-') + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
  }

  var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
      localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
      formatFunctions = {},
      formatTokenFunctions = {}; // token:    'M'
  // padded:   ['MM', 2]
  // ordinal:  'Mo'
  // callback: function () { this.month() + 1 }

  function addFormatToken(token, padded, ordinal, callback) {
    var func = callback;

    if (typeof callback === 'string') {
      func = function () {
        return this[callback]();
      };
    }

    if (token) {
      formatTokenFunctions[token] = func;
    }

    if (padded) {
      formatTokenFunctions[padded[0]] = function () {
        return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
      };
    }

    if (ordinal) {
      formatTokenFunctions[ordinal] = function () {
        return this.localeData().ordinal(func.apply(this, arguments), token);
      };
    }
  }

  function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
      return input.replace(/^\[|\]$/g, '');
    }

    return input.replace(/\\/g, '');
  }

  function makeFormatFunction(format) {
    var array = format.match(formattingTokens),
        i,
        length;

    for (i = 0, length = array.length; i < length; i++) {
      if (formatTokenFunctions[array[i]]) {
        array[i] = formatTokenFunctions[array[i]];
      } else {
        array[i] = removeFormattingTokens(array[i]);
      }
    }

    return function (mom) {
      var output = '',
          i;

      for (i = 0; i < length; i++) {
        output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
      }

      return output;
    };
  } // format date using native date object


  function formatMoment(m, format) {
    if (!m.isValid()) {
      return m.localeData().invalidDate();
    }

    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
    return formatFunctions[format](m);
  }

  function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
      return locale.longDateFormat(input) || input;
    }

    localFormattingTokens.lastIndex = 0;

    while (i >= 0 && localFormattingTokens.test(format)) {
      format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
      localFormattingTokens.lastIndex = 0;
      i -= 1;
    }

    return format;
  }

  var defaultLongDateFormat = {
    LTS: 'h:mm:ss A',
    LT: 'h:mm A',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY h:mm A',
    LLLL: 'dddd, MMMM D, YYYY h:mm A'
  };

  function longDateFormat(key) {
    var format = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
      return format;
    }

    this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function (tok) {
      if (tok === 'MMMM' || tok === 'MM' || tok === 'DD' || tok === 'dddd') {
        return tok.slice(1);
      }

      return tok;
    }).join('');
    return this._longDateFormat[key];
  }

  var defaultInvalidDate = 'Invalid date';

  function invalidDate() {
    return this._invalidDate;
  }

  var defaultOrdinal = '%d',
      defaultDayOfMonthOrdinalParse = /\d{1,2}/;

  function ordinal(number) {
    return this._ordinal.replace('%d', number);
  }

  var defaultRelativeTime = {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    ss: '%d seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    w: 'a week',
    ww: '%d weeks',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  };

  function relativeTime(number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
  }

  function pastFuture(diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
  }

  var aliases = {};

  function addUnitAlias(unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
  }

  function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
  }

  function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
        normalizedProp,
        prop;

    for (prop in inputObject) {
      if (hasOwnProp(inputObject, prop)) {
        normalizedProp = normalizeUnits(prop);

        if (normalizedProp) {
          normalizedInput[normalizedProp] = inputObject[prop];
        }
      }
    }

    return normalizedInput;
  }

  var priorities = {};

  function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
  }

  function getPrioritizedUnits(unitsObj) {
    var units = [],
        u;

    for (u in unitsObj) {
      if (hasOwnProp(unitsObj, u)) {
        units.push({
          unit: u,
          priority: priorities[u]
        });
      }
    }

    units.sort(function (a, b) {
      return a.priority - b.priority;
    });
    return units;
  }

  function isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  }

  function absFloor(number) {
    if (number < 0) {
      // -0 -> 0
      return Math.ceil(number) || 0;
    } else {
      return Math.floor(number);
    }
  }

  function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
      value = absFloor(coercedNumber);
    }

    return value;
  }

  function makeGetSet(unit, keepTime) {
    return function (value) {
      if (value != null) {
        set$1(this, unit, value);
        hooks.updateOffset(this, keepTime);
        return this;
      } else {
        return get(this, unit);
      }
    };
  }

  function get(mom, unit) {
    return mom.isValid() ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
  }

  function set$1(mom, unit, value) {
    if (mom.isValid() && !isNaN(value)) {
      if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
        value = toInt(value);

        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
      } else {
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
      }
    }
  } // MOMENTS


  function stringGet(units) {
    units = normalizeUnits(units);

    if (isFunction(this[units])) {
      return this[units]();
    }

    return this;
  }

  function stringSet(units, value) {
    if (typeof units === 'object') {
      units = normalizeObjectUnits(units);
      var prioritized = getPrioritizedUnits(units),
          i;

      for (i = 0; i < prioritized.length; i++) {
        this[prioritized[i].unit](units[prioritized[i].unit]);
      }
    } else {
      units = normalizeUnits(units);

      if (isFunction(this[units])) {
        return this[units](value);
      }
    }

    return this;
  }

  var match1 = /\d/,
      //       0 - 9
  match2 = /\d\d/,
      //      00 - 99
  match3 = /\d{3}/,
      //     000 - 999
  match4 = /\d{4}/,
      //    0000 - 9999
  match6 = /[+-]?\d{6}/,
      // -999999 - 999999
  match1to2 = /\d\d?/,
      //       0 - 99
  match3to4 = /\d\d\d\d?/,
      //     999 - 9999
  match5to6 = /\d\d\d\d\d\d?/,
      //   99999 - 999999
  match1to3 = /\d{1,3}/,
      //       0 - 999
  match1to4 = /\d{1,4}/,
      //       0 - 9999
  match1to6 = /[+-]?\d{1,6}/,
      // -999999 - 999999
  matchUnsigned = /\d+/,
      //       0 - inf
  matchSigned = /[+-]?\d+/,
      //    -inf - inf
  matchOffset = /Z|[+-]\d\d:?\d\d/gi,
      // +00:00 -00:00 +0000 -0000 or Z
  matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi,
      // +00 -00 +00:00 -00:00 +0000 -0000 or Z
  matchTimestamp = /[+-]?\d+(\.\d{1,3})?/,
      // 123456789 123456789.123
  // any word (or two) characters or numbers including two/three word month in arabic.
  // includes scottish gaelic two word and hyphenated months
  matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
      regexes;
  regexes = {};

  function addRegexToken(token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
      return isStrict && strictRegex ? strictRegex : regex;
    };
  }

  function getParseRegexForToken(token, config) {
    if (!hasOwnProp(regexes, token)) {
      return new RegExp(unescapeFormat(token));
    }

    return regexes[token](config._strict, config._locale);
  } // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript


  function unescapeFormat(s) {
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
      return p1 || p2 || p3 || p4;
    }));
  }

  function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  var tokens = {};

  function addParseToken(token, callback) {
    var i,
        func = callback;

    if (typeof token === 'string') {
      token = [token];
    }

    if (isNumber(callback)) {
      func = function (input, array) {
        array[callback] = toInt(input);
      };
    }

    for (i = 0; i < token.length; i++) {
      tokens[token[i]] = func;
    }
  }

  function addWeekParseToken(token, callback) {
    addParseToken(token, function (input, array, config, token) {
      config._w = config._w || {};
      callback(input, config._w, config, token);
    });
  }

  function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
      tokens[token](input, config._a, config, token);
    }
  }

  var YEAR = 0,
      MONTH = 1,
      DATE = 2,
      HOUR = 3,
      MINUTE = 4,
      SECOND = 5,
      MILLISECOND = 6,
      WEEK = 7,
      WEEKDAY = 8;

  function mod(n, x) {
    return (n % x + x) % x;
  }

  var indexOf;

  if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
  } else {
    indexOf = function (o) {
      // I know
      var i;

      for (i = 0; i < this.length; ++i) {
        if (this[i] === o) {
          return i;
        }
      }

      return -1;
    };
  }

  function daysInMonth(year, month) {
    if (isNaN(year) || isNaN(month)) {
      return NaN;
    }

    var modMonth = mod(month, 12);
    year += (month - modMonth) / 12;
    return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
  } // FORMATTING


  addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
  });
  addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
  });
  addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
  }); // ALIASES

  addUnitAlias('month', 'M'); // PRIORITY

  addUnitPriority('month', 8); // PARSING

  addRegexToken('M', match1to2);
  addRegexToken('MM', match1to2, match2);
  addRegexToken('MMM', function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
  });
  addRegexToken('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
  });
  addParseToken(['M', 'MM'], function (input, array) {
    array[MONTH] = toInt(input) - 1;
  });
  addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict); // if we didn't find a month name, mark the date as invalid.


    if (month != null) {
      array[MONTH] = month;
    } else {
      getParsingFlags(config).invalidMonth = input;
    }
  }); // LOCALES

  var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
      defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
      MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
      defaultMonthsShortRegex = matchWord,
      defaultMonthsRegex = matchWord;

  function localeMonths(m, format) {
    if (!m) {
      return isArray(this._months) ? this._months : this._months['standalone'];
    }

    return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
  }

  function localeMonthsShort(m, format) {
    if (!m) {
      return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort['standalone'];
    }

    return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
  }

  function handleStrictParse(monthName, format, strict) {
    var i,
        ii,
        mom,
        llc = monthName.toLocaleLowerCase();

    if (!this._monthsParse) {
      // this is not used
      this._monthsParse = [];
      this._longMonthsParse = [];
      this._shortMonthsParse = [];

      for (i = 0; i < 12; ++i) {
        mom = createUTC([2000, i]);
        this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
        this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
      }
    }

    if (strict) {
      if (format === 'MMM') {
        ii = indexOf.call(this._shortMonthsParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._longMonthsParse, llc);
        return ii !== -1 ? ii : null;
      }
    } else {
      if (format === 'MMM') {
        ii = indexOf.call(this._shortMonthsParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._longMonthsParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._longMonthsParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._shortMonthsParse, llc);
        return ii !== -1 ? ii : null;
      }
    }
  }

  function localeMonthsParse(monthName, format, strict) {
    var i, mom, regex;

    if (this._monthsParseExact) {
      return handleStrictParse.call(this, monthName, format, strict);
    }

    if (!this._monthsParse) {
      this._monthsParse = [];
      this._longMonthsParse = [];
      this._shortMonthsParse = [];
    } // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse


    for (i = 0; i < 12; i++) {
      // make the regex if we don't have it already
      mom = createUTC([2000, i]);

      if (strict && !this._longMonthsParse[i]) {
        this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
        this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
      }

      if (!strict && !this._monthsParse[i]) {
        regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
        this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
      } // test the regex


      if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
        return i;
      } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
        return i;
      } else if (!strict && this._monthsParse[i].test(monthName)) {
        return i;
      }
    }
  } // MOMENTS


  function setMonth(mom, value) {
    var dayOfMonth;

    if (!mom.isValid()) {
      // No op
      return mom;
    }

    if (typeof value === 'string') {
      if (/^\d+$/.test(value)) {
        value = toInt(value);
      } else {
        value = mom.localeData().monthsParse(value); // TODO: Another silent failure?

        if (!isNumber(value)) {
          return mom;
        }
      }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));

    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);

    return mom;
  }

  function getSetMonth(value) {
    if (value != null) {
      setMonth(this, value);
      hooks.updateOffset(this, true);
      return this;
    } else {
      return get(this, 'Month');
    }
  }

  function getDaysInMonth() {
    return daysInMonth(this.year(), this.month());
  }

  function monthsShortRegex(isStrict) {
    if (this._monthsParseExact) {
      if (!hasOwnProp(this, '_monthsRegex')) {
        computeMonthsParse.call(this);
      }

      if (isStrict) {
        return this._monthsShortStrictRegex;
      } else {
        return this._monthsShortRegex;
      }
    } else {
      if (!hasOwnProp(this, '_monthsShortRegex')) {
        this._monthsShortRegex = defaultMonthsShortRegex;
      }

      return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
    }
  }

  function monthsRegex(isStrict) {
    if (this._monthsParseExact) {
      if (!hasOwnProp(this, '_monthsRegex')) {
        computeMonthsParse.call(this);
      }

      if (isStrict) {
        return this._monthsStrictRegex;
      } else {
        return this._monthsRegex;
      }
    } else {
      if (!hasOwnProp(this, '_monthsRegex')) {
        this._monthsRegex = defaultMonthsRegex;
      }

      return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
    }
  }

  function computeMonthsParse() {
    function cmpLenRev(a, b) {
      return b.length - a.length;
    }

    var shortPieces = [],
        longPieces = [],
        mixedPieces = [],
        i,
        mom;

    for (i = 0; i < 12; i++) {
      // make the regex if we don't have it already
      mom = createUTC([2000, i]);
      shortPieces.push(this.monthsShort(mom, ''));
      longPieces.push(this.months(mom, ''));
      mixedPieces.push(this.months(mom, ''));
      mixedPieces.push(this.monthsShort(mom, ''));
    } // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.


    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);

    for (i = 0; i < 12; i++) {
      shortPieces[i] = regexEscape(shortPieces[i]);
      longPieces[i] = regexEscape(longPieces[i]);
    }

    for (i = 0; i < 24; i++) {
      mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
  } // FORMATTING


  addFormatToken('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? zeroFill(y, 4) : '+' + y;
  });
  addFormatToken(0, ['YY', 2], 0, function () {
    return this.year() % 100;
  });
  addFormatToken(0, ['YYYY', 4], 0, 'year');
  addFormatToken(0, ['YYYYY', 5], 0, 'year');
  addFormatToken(0, ['YYYYYY', 6, true], 0, 'year'); // ALIASES

  addUnitAlias('year', 'y'); // PRIORITIES

  addUnitPriority('year', 1); // PARSING

  addRegexToken('Y', matchSigned);
  addRegexToken('YY', match1to2, match2);
  addRegexToken('YYYY', match1to4, match4);
  addRegexToken('YYYYY', match1to6, match6);
  addRegexToken('YYYYYY', match1to6, match6);
  addParseToken(['YYYYY', 'YYYYYY'], YEAR);
  addParseToken('YYYY', function (input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
  });
  addParseToken('YY', function (input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
  });
  addParseToken('Y', function (input, array) {
    array[YEAR] = parseInt(input, 10);
  }); // HELPERS

  function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
  } // HOOKS


  hooks.parseTwoDigitYear = function (input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
  }; // MOMENTS


  var getSetYear = makeGetSet('FullYear', true);

  function getIsLeapYear() {
    return isLeapYear(this.year());
  }

  function createDate(y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date; // the date constructor remaps years 0-99 to 1900-1999

    if (y < 100 && y >= 0) {
      // preserve leap years using a full 400 year cycle, then reset
      date = new Date(y + 400, m, d, h, M, s, ms);

      if (isFinite(date.getFullYear())) {
        date.setFullYear(y);
      }
    } else {
      date = new Date(y, m, d, h, M, s, ms);
    }

    return date;
  }

  function createUTCDate(y) {
    var date, args; // the Date.UTC function remaps years 0-99 to 1900-1999

    if (y < 100 && y >= 0) {
      args = Array.prototype.slice.call(arguments); // preserve leap years using a full 400 year cycle, then reset

      args[0] = y + 400;
      date = new Date(Date.UTC.apply(null, args));

      if (isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
      }
    } else {
      date = new Date(Date.UTC.apply(null, arguments));
    }

    return date;
  } // start-of-first-week - start-of-year


  function firstWeekOffset(year, dow, doy) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
    fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
    fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
    return -fwdlw + fwd - 1;
  } // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday


  function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear,
        resDayOfYear;

    if (dayOfYear <= 0) {
      resYear = year - 1;
      resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
      resYear = year + 1;
      resDayOfYear = dayOfYear - daysInYear(year);
    } else {
      resYear = year;
      resDayOfYear = dayOfYear;
    }

    return {
      year: resYear,
      dayOfYear: resDayOfYear
    };
  }

  function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek,
        resYear;

    if (week < 1) {
      resYear = mom.year() - 1;
      resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
      resWeek = week - weeksInYear(mom.year(), dow, doy);
      resYear = mom.year() + 1;
    } else {
      resYear = mom.year();
      resWeek = week;
    }

    return {
      week: resWeek,
      year: resYear
    };
  }

  function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
  } // FORMATTING


  addFormatToken('w', ['ww', 2], 'wo', 'week');
  addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek'); // ALIASES

  addUnitAlias('week', 'w');
  addUnitAlias('isoWeek', 'W'); // PRIORITIES

  addUnitPriority('week', 5);
  addUnitPriority('isoWeek', 5); // PARSING

  addRegexToken('w', match1to2);
  addRegexToken('ww', match1to2, match2);
  addRegexToken('W', match1to2);
  addRegexToken('WW', match1to2, match2);
  addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
  }); // HELPERS
  // LOCALES

  function localeWeek(mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
  }

  var defaultLocaleWeek = {
    dow: 0,
    // Sunday is the first day of the week.
    doy: 6 // The week that contains Jan 6th is the first week of the year.

  };

  function localeFirstDayOfWeek() {
    return this._week.dow;
  }

  function localeFirstDayOfYear() {
    return this._week.doy;
  } // MOMENTS


  function getSetWeek(input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
  }

  function getSetISOWeek(input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
  } // FORMATTING


  addFormatToken('d', 0, 'do', 'day');
  addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
  });
  addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
  });
  addFormatToken('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
  });
  addFormatToken('e', 0, 0, 'weekday');
  addFormatToken('E', 0, 0, 'isoWeekday'); // ALIASES

  addUnitAlias('day', 'd');
  addUnitAlias('weekday', 'e');
  addUnitAlias('isoWeekday', 'E'); // PRIORITY

  addUnitPriority('day', 11);
  addUnitPriority('weekday', 11);
  addUnitPriority('isoWeekday', 11); // PARSING

  addRegexToken('d', match1to2);
  addRegexToken('e', match1to2);
  addRegexToken('E', match1to2);
  addRegexToken('dd', function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
  });
  addRegexToken('ddd', function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
  });
  addRegexToken('dddd', function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
  });
  addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict); // if we didn't get a weekday name, mark the date as invalid


    if (weekday != null) {
      week.d = weekday;
    } else {
      getParsingFlags(config).invalidWeekday = input;
    }
  });
  addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = toInt(input);
  }); // HELPERS

  function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
      return input;
    }

    if (!isNaN(input)) {
      return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);

    if (typeof input === 'number') {
      return input;
    }

    return null;
  }

  function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
      return locale.weekdaysParse(input) % 7 || 7;
    }

    return isNaN(input) ? null : input;
  } // LOCALES


  function shiftWeekdays(ws, n) {
    return ws.slice(n, 7).concat(ws.slice(0, n));
  }

  var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
      defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
      defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
      defaultWeekdaysRegex = matchWord,
      defaultWeekdaysShortRegex = matchWord,
      defaultWeekdaysMinRegex = matchWord;

  function localeWeekdays(m, format) {
    var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format) ? 'format' : 'standalone'];
    return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
  }

  function localeWeekdaysShort(m) {
    return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
  }

  function localeWeekdaysMin(m) {
    return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
  }

  function handleStrictParse$1(weekdayName, format, strict) {
    var i,
        ii,
        mom,
        llc = weekdayName.toLocaleLowerCase();

    if (!this._weekdaysParse) {
      this._weekdaysParse = [];
      this._shortWeekdaysParse = [];
      this._minWeekdaysParse = [];

      for (i = 0; i < 7; ++i) {
        mom = createUTC([2000, 1]).day(i);
        this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
        this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
        this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
      }
    }

    if (strict) {
      if (format === 'dddd') {
        ii = indexOf.call(this._weekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else if (format === 'ddd') {
        ii = indexOf.call(this._shortWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      }
    } else {
      if (format === 'dddd') {
        ii = indexOf.call(this._weekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._shortWeekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else if (format === 'ddd') {
        ii = indexOf.call(this._shortWeekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._weekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._minWeekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._weekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._shortWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      }
    }
  }

  function localeWeekdaysParse(weekdayName, format, strict) {
    var i, mom, regex;

    if (this._weekdaysParseExact) {
      return handleStrictParse$1.call(this, weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
      this._weekdaysParse = [];
      this._minWeekdaysParse = [];
      this._shortWeekdaysParse = [];
      this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
      // make the regex if we don't have it already
      mom = createUTC([2000, 1]).day(i);

      if (strict && !this._fullWeekdaysParse[i]) {
        this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
        this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
        this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
      }

      if (!this._weekdaysParse[i]) {
        regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
        this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
      } // test the regex


      if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
        return i;
      }
    }
  } // MOMENTS


  function getSetDayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }

    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();

    if (input != null) {
      input = parseWeekday(input, this.localeData());
      return this.add(input - day, 'd');
    } else {
      return day;
    }
  }

  function getSetLocaleDayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }

    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
  }

  function getSetISODayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    } // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.


    if (input != null) {
      var weekday = parseIsoWeekday(input, this.localeData());
      return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
      return this.day() || 7;
    }
  }

  function weekdaysRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, '_weekdaysRegex')) {
        computeWeekdaysParse.call(this);
      }

      if (isStrict) {
        return this._weekdaysStrictRegex;
      } else {
        return this._weekdaysRegex;
      }
    } else {
      if (!hasOwnProp(this, '_weekdaysRegex')) {
        this._weekdaysRegex = defaultWeekdaysRegex;
      }

      return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
    }
  }

  function weekdaysShortRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, '_weekdaysRegex')) {
        computeWeekdaysParse.call(this);
      }

      if (isStrict) {
        return this._weekdaysShortStrictRegex;
      } else {
        return this._weekdaysShortRegex;
      }
    } else {
      if (!hasOwnProp(this, '_weekdaysShortRegex')) {
        this._weekdaysShortRegex = defaultWeekdaysShortRegex;
      }

      return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
  }

  function weekdaysMinRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, '_weekdaysRegex')) {
        computeWeekdaysParse.call(this);
      }

      if (isStrict) {
        return this._weekdaysMinStrictRegex;
      } else {
        return this._weekdaysMinRegex;
      }
    } else {
      if (!hasOwnProp(this, '_weekdaysMinRegex')) {
        this._weekdaysMinRegex = defaultWeekdaysMinRegex;
      }

      return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
  }

  function computeWeekdaysParse() {
    function cmpLenRev(a, b) {
      return b.length - a.length;
    }

    var minPieces = [],
        shortPieces = [],
        longPieces = [],
        mixedPieces = [],
        i,
        mom,
        minp,
        shortp,
        longp;

    for (i = 0; i < 7; i++) {
      // make the regex if we don't have it already
      mom = createUTC([2000, 1]).day(i);
      minp = regexEscape(this.weekdaysMin(mom, ''));
      shortp = regexEscape(this.weekdaysShort(mom, ''));
      longp = regexEscape(this.weekdays(mom, ''));
      minPieces.push(minp);
      shortPieces.push(shortp);
      longPieces.push(longp);
      mixedPieces.push(minp);
      mixedPieces.push(shortp);
      mixedPieces.push(longp);
    } // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.


    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;
    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
  } // FORMATTING


  function hFormat() {
    return this.hours() % 12 || 12;
  }

  function kFormat() {
    return this.hours() || 24;
  }

  addFormatToken('H', ['HH', 2], 0, 'hour');
  addFormatToken('h', ['hh', 2], 0, hFormat);
  addFormatToken('k', ['kk', 2], 0, kFormat);
  addFormatToken('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
  });
  addFormatToken('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
  });
  addFormatToken('Hmm', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2);
  });
  addFormatToken('Hmmss', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
  });

  function meridiem(token, lowercase) {
    addFormatToken(token, 0, 0, function () {
      return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
  }

  meridiem('a', true);
  meridiem('A', false); // ALIASES

  addUnitAlias('hour', 'h'); // PRIORITY

  addUnitPriority('hour', 13); // PARSING

  function matchMeridiem(isStrict, locale) {
    return locale._meridiemParse;
  }

  addRegexToken('a', matchMeridiem);
  addRegexToken('A', matchMeridiem);
  addRegexToken('H', match1to2);
  addRegexToken('h', match1to2);
  addRegexToken('k', match1to2);
  addRegexToken('HH', match1to2, match2);
  addRegexToken('hh', match1to2, match2);
  addRegexToken('kk', match1to2, match2);
  addRegexToken('hmm', match3to4);
  addRegexToken('hmmss', match5to6);
  addRegexToken('Hmm', match3to4);
  addRegexToken('Hmmss', match5to6);
  addParseToken(['H', 'HH'], HOUR);
  addParseToken(['k', 'kk'], function (input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
  });
  addParseToken(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
  });
  addParseToken(['h', 'hh'], function (input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
  });
  addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
  });
  addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4,
        pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
  });
  addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
  });
  addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4,
        pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
  }); // LOCALES

  function localeIsPM(input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return (input + '').toLowerCase().charAt(0) === 'p';
  }

  var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
      // Setting the hour should keep the time, because the user explicitly
  // specified which hour they want. So trying to maintain the same hour (in
  // a new timezone) makes sense. Adding/subtracting hours does not follow
  // this rule.
  getSetHour = makeGetSet('Hours', true);

  function localeMeridiem(hours, minutes, isLower) {
    if (hours > 11) {
      return isLower ? 'pm' : 'PM';
    } else {
      return isLower ? 'am' : 'AM';
    }
  }

  var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,
    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,
    week: defaultLocaleWeek,
    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,
    meridiemParse: defaultLocaleMeridiemParse
  }; // internal storage for locale config files

  var locales = {},
      localeFamilies = {},
      globalLocale;

  function commonPrefix(arr1, arr2) {
    var i,
        minl = Math.min(arr1.length, arr2.length);

    for (i = 0; i < minl; i += 1) {
      if (arr1[i] !== arr2[i]) {
        return i;
      }
    }

    return minl;
  }

  function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
  } // pick the locale from the array
  // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
  // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root


  function chooseLocale(names) {
    var i = 0,
        j,
        next,
        locale,
        split;

    while (i < names.length) {
      split = normalizeLocale(names[i]).split('-');
      j = split.length;
      next = normalizeLocale(names[i + 1]);
      next = next ? next.split('-') : null;

      while (j > 0) {
        locale = loadLocale(split.slice(0, j).join('-'));

        if (locale) {
          return locale;
        }

        if (next && next.length >= j && commonPrefix(split, next) >= j - 1) {
          //the next array item is better than a shallower substring of this one
          break;
        }

        j--;
      }

      i++;
    }

    return globalLocale;
  }

  function loadLocale(name) {
    var oldLocale = null,
        aliasedRequire; // TODO: Find a better way to register and load all the locales in Node

    if (locales[name] === undefined && typeof module !== 'undefined' && module && module.exports) {
      try {
        oldLocale = globalLocale._abbr;
        aliasedRequire = require;
        aliasedRequire('./locale/' + name);
        getSetGlobalLocale(oldLocale);
      } catch (e) {
        // mark as not found to avoid repeating expensive file require call causing high CPU
        // when trying to find en-US, en_US, en-us for every format call
        locales[name] = null; // null means not found
      }
    }

    return locales[name];
  } // This function will load locale and then set the global locale.  If
  // no arguments are passed in, it will simply return the current global
  // locale key.


  function getSetGlobalLocale(key, values) {
    var data;

    if (key) {
      if (isUndefined(values)) {
        data = getLocale(key);
      } else {
        data = defineLocale(key, values);
      }

      if (data) {
        // moment.duration._locale = moment._locale = data;
        globalLocale = data;
      } else {
        if (typeof console !== 'undefined' && console.warn) {
          //warn user if arguments are passed but the locale could not be set
          console.warn('Locale ' + key + ' not found. Did you forget to load it?');
        }
      }
    }

    return globalLocale._abbr;
  }

  function defineLocale(name, config) {
    if (config !== null) {
      var locale,
          parentConfig = baseConfig;
      config.abbr = name;

      if (locales[name] != null) {
        deprecateSimple('defineLocaleOverride', 'use moment.updateLocale(localeName, config) to change ' + 'an existing locale. moment.defineLocale(localeName, ' + 'config) should only be used for creating a new locale ' + 'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
        parentConfig = locales[name]._config;
      } else if (config.parentLocale != null) {
        if (locales[config.parentLocale] != null) {
          parentConfig = locales[config.parentLocale]._config;
        } else {
          locale = loadLocale(config.parentLocale);

          if (locale != null) {
            parentConfig = locale._config;
          } else {
            if (!localeFamilies[config.parentLocale]) {
              localeFamilies[config.parentLocale] = [];
            }

            localeFamilies[config.parentLocale].push({
              name: name,
              config: config
            });
            return null;
          }
        }
      }

      locales[name] = new Locale(mergeConfigs(parentConfig, config));

      if (localeFamilies[name]) {
        localeFamilies[name].forEach(function (x) {
          defineLocale(x.name, x.config);
        });
      } // backwards compat for now: also set the locale
      // make sure we set the locale AFTER all child locales have been
      // created, so we won't end up with the child locale set.


      getSetGlobalLocale(name);
      return locales[name];
    } else {
      // useful for testing
      delete locales[name];
      return null;
    }
  }

  function updateLocale(name, config) {
    if (config != null) {
      var locale,
          tmpLocale,
          parentConfig = baseConfig;

      if (locales[name] != null && locales[name].parentLocale != null) {
        // Update existing child locale in-place to avoid memory-leaks
        locales[name].set(mergeConfigs(locales[name]._config, config));
      } else {
        // MERGE
        tmpLocale = loadLocale(name);

        if (tmpLocale != null) {
          parentConfig = tmpLocale._config;
        }

        config = mergeConfigs(parentConfig, config);

        if (tmpLocale == null) {
          // updateLocale is called for creating a new locale
          // Set abbr so it will have a name (getters return
          // undefined otherwise).
          config.abbr = name;
        }

        locale = new Locale(config);
        locale.parentLocale = locales[name];
        locales[name] = locale;
      } // backwards compat for now: also set the locale


      getSetGlobalLocale(name);
    } else {
      // pass null for config to unupdate, useful for tests
      if (locales[name] != null) {
        if (locales[name].parentLocale != null) {
          locales[name] = locales[name].parentLocale;

          if (name === getSetGlobalLocale()) {
            getSetGlobalLocale(name);
          }
        } else if (locales[name] != null) {
          delete locales[name];
        }
      }
    }

    return locales[name];
  } // returns locale data


  function getLocale(key) {
    var locale;

    if (key && key._locale && key._locale._abbr) {
      key = key._locale._abbr;
    }

    if (!key) {
      return globalLocale;
    }

    if (!isArray(key)) {
      //short-circuit everything else
      locale = loadLocale(key);

      if (locale) {
        return locale;
      }

      key = [key];
    }

    return chooseLocale(key);
  }

  function listLocales() {
    return keys(locales);
  }

  function checkOverflow(m) {
    var overflow,
        a = m._a;

    if (a && getParsingFlags(m).overflow === -2) {
      overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;

      if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
        overflow = DATE;
      }

      if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
        overflow = WEEK;
      }

      if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
        overflow = WEEKDAY;
      }

      getParsingFlags(m).overflow = overflow;
    }

    return m;
  } // iso 8601 regex
  // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)


  var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
      basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
      tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
      isoDates = [['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/], ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/], ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/], ['GGGG-[W]WW', /\d{4}-W\d\d/, false], ['YYYY-DDD', /\d{4}-\d{3}/], ['YYYY-MM', /\d{4}-\d\d/, false], ['YYYYYYMMDD', /[+-]\d{10}/], ['YYYYMMDD', /\d{8}/], ['GGGG[W]WWE', /\d{4}W\d{3}/], ['GGGG[W]WW', /\d{4}W\d{2}/, false], ['YYYYDDD', /\d{7}/], ['YYYYMM', /\d{6}/, false], ['YYYY', /\d{4}/, false]],
      // iso time formats and regexes
  isoTimes = [['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/], ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/], ['HH:mm:ss', /\d\d:\d\d:\d\d/], ['HH:mm', /\d\d:\d\d/], ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/], ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/], ['HHmmss', /\d\d\d\d\d\d/], ['HHmm', /\d\d\d\d/], ['HH', /\d\d/]],
      aspNetJsonRegex = /^\/?Date\((-?\d+)/i,
      // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
  rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
      obsOffsets = {
    UT: 0,
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60
  }; // date from iso format

  function configFromISO(config) {
    var i,
        l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime,
        dateFormat,
        timeFormat,
        tzFormat;

    if (match) {
      getParsingFlags(config).iso = true;

      for (i = 0, l = isoDates.length; i < l; i++) {
        if (isoDates[i][1].exec(match[1])) {
          dateFormat = isoDates[i][0];
          allowTime = isoDates[i][2] !== false;
          break;
        }
      }

      if (dateFormat == null) {
        config._isValid = false;
        return;
      }

      if (match[3]) {
        for (i = 0, l = isoTimes.length; i < l; i++) {
          if (isoTimes[i][1].exec(match[3])) {
            // match[2] should be 'T' or space
            timeFormat = (match[2] || ' ') + isoTimes[i][0];
            break;
          }
        }

        if (timeFormat == null) {
          config._isValid = false;
          return;
        }
      }

      if (!allowTime && timeFormat != null) {
        config._isValid = false;
        return;
      }

      if (match[4]) {
        if (tzRegex.exec(match[4])) {
          tzFormat = 'Z';
        } else {
          config._isValid = false;
          return;
        }
      }

      config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
      configFromStringAndFormat(config);
    } else {
      config._isValid = false;
    }
  }

  function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    var result = [untruncateYear(yearStr), defaultLocaleMonthsShort.indexOf(monthStr), parseInt(dayStr, 10), parseInt(hourStr, 10), parseInt(minuteStr, 10)];

    if (secondStr) {
      result.push(parseInt(secondStr, 10));
    }

    return result;
  }

  function untruncateYear(yearStr) {
    var year = parseInt(yearStr, 10);

    if (year <= 49) {
      return 2000 + year;
    } else if (year <= 999) {
      return 1900 + year;
    }

    return year;
  }

  function preprocessRFC2822(s) {
    // Remove comments and folding whitespace and replace multiple-spaces with a single space
    return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }

  function checkWeekday(weekdayStr, parsedInput, config) {
    if (weekdayStr) {
      // TODO: Replace the vanilla JS Date object with an independent day-of-week check.
      var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
          weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();

      if (weekdayProvided !== weekdayActual) {
        getParsingFlags(config).weekdayMismatch = true;
        config._isValid = false;
        return false;
      }
    }

    return true;
  }

  function calculateOffset(obsOffset, militaryOffset, numOffset) {
    if (obsOffset) {
      return obsOffsets[obsOffset];
    } else if (militaryOffset) {
      // the only allowed military tz is Z
      return 0;
    } else {
      var hm = parseInt(numOffset, 10),
          m = hm % 100,
          h = (hm - m) / 100;
      return h * 60 + m;
    }
  } // date and time from ref 2822 format


  function configFromRFC2822(config) {
    var match = rfc2822.exec(preprocessRFC2822(config._i)),
        parsedArray;

    if (match) {
      parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);

      if (!checkWeekday(match[1], parsedArray, config)) {
        return;
      }

      config._a = parsedArray;
      config._tzm = calculateOffset(match[8], match[9], match[10]);
      config._d = createUTCDate.apply(null, config._a);

      config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

      getParsingFlags(config).rfc2822 = true;
    } else {
      config._isValid = false;
    }
  } // date from 1) ASP.NET, 2) ISO, 3) RFC 2822 formats, or 4) optional fallback if parsing isn't strict


  function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);

    if (matched !== null) {
      config._d = new Date(+matched[1]);
      return;
    }

    configFromISO(config);

    if (config._isValid === false) {
      delete config._isValid;
    } else {
      return;
    }

    configFromRFC2822(config);

    if (config._isValid === false) {
      delete config._isValid;
    } else {
      return;
    }

    if (config._strict) {
      config._isValid = false;
    } else {
      // Final attempt, use Input Fallback
      hooks.createFromInputFallback(config);
    }
  }

  hooks.createFromInputFallback = deprecate('value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' + 'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' + 'discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.', function (config) {
    config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
  }); // Pick the first defined of two or three arguments.

  function defaults(a, b, c) {
    if (a != null) {
      return a;
    }

    if (b != null) {
      return b;
    }

    return c;
  }

  function currentDateArray(config) {
    // hooks is actually the exported moment object
    var nowValue = new Date(hooks.now());

    if (config._useUTC) {
      return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }

    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
  } // convert an array to a date.
  // the array should mirror the parameters below
  // note: all values past the year are optional and will default to the lowest possible value.
  // [year, month, day , hour, minute, second, millisecond]


  function configFromArray(config) {
    var i,
        date,
        input = [],
        currentDate,
        expectedWeekday,
        yearToUse;

    if (config._d) {
      return;
    }

    currentDate = currentDateArray(config); //compute day of the year from weeks and weekdays

    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
      dayOfYearFromWeekInfo(config);
    } //if the day of the year is set, figure out what it is


    if (config._dayOfYear != null) {
      yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

      if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
        getParsingFlags(config)._overflowDayOfYear = true;
      }

      date = createUTCDate(yearToUse, 0, config._dayOfYear);
      config._a[MONTH] = date.getUTCMonth();
      config._a[DATE] = date.getUTCDate();
    } // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything


    for (i = 0; i < 3 && config._a[i] == null; ++i) {
      config._a[i] = input[i] = currentDate[i];
    } // Zero out whatever was not defaulted, including time


    for (; i < 7; i++) {
      config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
    } // Check for 24:00:00.000


    if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
      config._nextDay = true;
      config._a[HOUR] = 0;
    }

    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay(); // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.

    if (config._tzm != null) {
      config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }

    if (config._nextDay) {
      config._a[HOUR] = 24;
    } // check for mismatching day of week


    if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
      getParsingFlags(config).weekdayMismatch = true;
    }
  }

  function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
    w = config._w;

    if (w.GG != null || w.W != null || w.E != null) {
      dow = 1;
      doy = 4; // TODO: We need to take the current isoWeekYear, but that depends on
      // how we interpret now (local, utc, fixed offset). So create
      // a now version of current config (take local/utc/offset flags, and
      // create now).

      weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
      week = defaults(w.W, 1);
      weekday = defaults(w.E, 1);

      if (weekday < 1 || weekday > 7) {
        weekdayOverflow = true;
      }
    } else {
      dow = config._locale._week.dow;
      doy = config._locale._week.doy;
      curWeek = weekOfYear(createLocal(), dow, doy);
      weekYear = defaults(w.gg, config._a[YEAR], curWeek.year); // Default to current week.

      week = defaults(w.w, curWeek.week);

      if (w.d != null) {
        // weekday -- low day numbers are considered next week
        weekday = w.d;

        if (weekday < 0 || weekday > 6) {
          weekdayOverflow = true;
        }
      } else if (w.e != null) {
        // local weekday -- counting starts from beginning of week
        weekday = w.e + dow;

        if (w.e < 0 || w.e > 6) {
          weekdayOverflow = true;
        }
      } else {
        // default to beginning of week
        weekday = dow;
      }
    }

    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
      getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
      getParsingFlags(config)._overflowWeekday = true;
    } else {
      temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
      config._a[YEAR] = temp.year;
      config._dayOfYear = temp.dayOfYear;
    }
  } // constant that refers to the ISO standard


  hooks.ISO_8601 = function () {}; // constant that refers to the RFC 2822 form


  hooks.RFC_2822 = function () {}; // date from string and format string


  function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks.ISO_8601) {
      configFromISO(config);
      return;
    }

    if (config._f === hooks.RFC_2822) {
      configFromRFC2822(config);
      return;
    }

    config._a = [];
    getParsingFlags(config).empty = true; // This array is used to make a Date, either with `new Date` or `Date.UTC`

    var string = '' + config._i,
        i,
        parsedInput,
        tokens,
        token,
        skipped,
        stringLength = string.length,
        totalParsedInputLength = 0,
        era;
    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

    for (i = 0; i < tokens.length; i++) {
      token = tokens[i];
      parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];

      if (parsedInput) {
        skipped = string.substr(0, string.indexOf(parsedInput));

        if (skipped.length > 0) {
          getParsingFlags(config).unusedInput.push(skipped);
        }

        string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
        totalParsedInputLength += parsedInput.length;
      } // don't parse if it's not a known token


      if (formatTokenFunctions[token]) {
        if (parsedInput) {
          getParsingFlags(config).empty = false;
        } else {
          getParsingFlags(config).unusedTokens.push(token);
        }

        addTimeToArrayFromToken(token, parsedInput, config);
      } else if (config._strict && !parsedInput) {
        getParsingFlags(config).unusedTokens.push(token);
      }
    } // add remaining unparsed input length to the string


    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;

    if (string.length > 0) {
      getParsingFlags(config).unusedInput.push(string);
    } // clear _12h flag if hour is <= 12


    if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
      getParsingFlags(config).bigHour = undefined;
    }

    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem; // handle meridiem

    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem); // handle era

    era = getParsingFlags(config).era;

    if (era !== null) {
      config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
    }

    configFromArray(config);
    checkOverflow(config);
  }

  function meridiemFixWrap(locale, hour, meridiem) {
    var isPm;

    if (meridiem == null) {
      // nothing to do
      return hour;
    }

    if (locale.meridiemHour != null) {
      return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
      // Fallback
      isPm = locale.isPM(meridiem);

      if (isPm && hour < 12) {
        hour += 12;
      }

      if (!isPm && hour === 12) {
        hour = 0;
      }

      return hour;
    } else {
      // this is not supposed to happen
      return hour;
    }
  } // date from string and array of format strings


  function configFromStringAndArray(config) {
    var tempConfig,
        bestMoment,
        scoreToBeat,
        i,
        currentScore,
        validFormatFound,
        bestFormatIsValid = false;

    if (config._f.length === 0) {
      getParsingFlags(config).invalidFormat = true;
      config._d = new Date(NaN);
      return;
    }

    for (i = 0; i < config._f.length; i++) {
      currentScore = 0;
      validFormatFound = false;
      tempConfig = copyConfig({}, config);

      if (config._useUTC != null) {
        tempConfig._useUTC = config._useUTC;
      }

      tempConfig._f = config._f[i];
      configFromStringAndFormat(tempConfig);

      if (isValid(tempConfig)) {
        validFormatFound = true;
      } // if there is any input that was not parsed add a penalty for that format


      currentScore += getParsingFlags(tempConfig).charsLeftOver; //or tokens

      currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
      getParsingFlags(tempConfig).score = currentScore;

      if (!bestFormatIsValid) {
        if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
          scoreToBeat = currentScore;
          bestMoment = tempConfig;

          if (validFormatFound) {
            bestFormatIsValid = true;
          }
        }
      } else {
        if (currentScore < scoreToBeat) {
          scoreToBeat = currentScore;
          bestMoment = tempConfig;
        }
      }
    }

    extend(config, bestMoment || tempConfig);
  }

  function configFromObject(config) {
    if (config._d) {
      return;
    }

    var i = normalizeObjectUnits(config._i),
        dayOrDate = i.day === undefined ? i.date : i.day;
    config._a = map([i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond], function (obj) {
      return obj && parseInt(obj, 10);
    });
    configFromArray(config);
  }

  function createFromConfig(config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));

    if (res._nextDay) {
      // Adding is smart enough around DST
      res.add(1, 'd');
      res._nextDay = undefined;
    }

    return res;
  }

  function prepareConfig(config) {
    var input = config._i,
        format = config._f;
    config._locale = config._locale || getLocale(config._l);

    if (input === null || format === undefined && input === '') {
      return createInvalid({
        nullInput: true
      });
    }

    if (typeof input === 'string') {
      config._i = input = config._locale.preparse(input);
    }

    if (isMoment(input)) {
      return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
      config._d = input;
    } else if (isArray(format)) {
      configFromStringAndArray(config);
    } else if (format) {
      configFromStringAndFormat(config);
    } else {
      configFromInput(config);
    }

    if (!isValid(config)) {
      config._d = null;
    }

    return config;
  }

  function configFromInput(config) {
    var input = config._i;

    if (isUndefined(input)) {
      config._d = new Date(hooks.now());
    } else if (isDate(input)) {
      config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
      configFromString(config);
    } else if (isArray(input)) {
      config._a = map(input.slice(0), function (obj) {
        return parseInt(obj, 10);
      });
      configFromArray(config);
    } else if (isObject(input)) {
      configFromObject(config);
    } else if (isNumber(input)) {
      // from milliseconds
      config._d = new Date(input);
    } else {
      hooks.createFromInputFallback(config);
    }
  }

  function createLocalOrUTC(input, format, locale, strict, isUTC) {
    var c = {};

    if (format === true || format === false) {
      strict = format;
      format = undefined;
    }

    if (locale === true || locale === false) {
      strict = locale;
      locale = undefined;
    }

    if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
      input = undefined;
    } // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423


    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;
    return createFromConfig(c);
  }

  function createLocal(input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
  }

  var prototypeMin = deprecate('moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
    var other = createLocal.apply(null, arguments);

    if (this.isValid() && other.isValid()) {
      return other < this ? this : other;
    } else {
      return createInvalid();
    }
  }),
      prototypeMax = deprecate('moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
    var other = createLocal.apply(null, arguments);

    if (this.isValid() && other.isValid()) {
      return other > this ? this : other;
    } else {
      return createInvalid();
    }
  }); // Pick a moment m from moments so that m[fn](other) is true for all
  // other. This relies on the function fn to be transitive.
  //
  // moments should either be an array of moment objects or an array, whose
  // first element is an array of moment objects.

  function pickBy(fn, moments) {
    var res, i;

    if (moments.length === 1 && isArray(moments[0])) {
      moments = moments[0];
    }

    if (!moments.length) {
      return createLocal();
    }

    res = moments[0];

    for (i = 1; i < moments.length; ++i) {
      if (!moments[i].isValid() || moments[i][fn](res)) {
        res = moments[i];
      }
    }

    return res;
  } // TODO: Use [].sort instead?


  function min() {
    var args = [].slice.call(arguments, 0);
    return pickBy('isBefore', args);
  }

  function max() {
    var args = [].slice.call(arguments, 0);
    return pickBy('isAfter', args);
  }

  var now = function () {
    return Date.now ? Date.now() : +new Date();
  };

  var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

  function isDurationValid(m) {
    var key,
        unitHasDecimal = false,
        i;

    for (key in m) {
      if (hasOwnProp(m, key) && !(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
        return false;
      }
    }

    for (i = 0; i < ordering.length; ++i) {
      if (m[ordering[i]]) {
        if (unitHasDecimal) {
          return false; // only allow non-integers for smallest unit
        }

        if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
          unitHasDecimal = true;
        }
      }
    }

    return true;
  }

  function isValid$1() {
    return this._isValid;
  }

  function createInvalid$1() {
    return createDuration(NaN);
  }

  function Duration(duration) {
    var normalizedInput = normalizeObjectUnits(duration),
        years = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months = normalizedInput.month || 0,
        weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
        days = normalizedInput.day || 0,
        hours = normalizedInput.hour || 0,
        minutes = normalizedInput.minute || 0,
        seconds = normalizedInput.second || 0,
        milliseconds = normalizedInput.millisecond || 0;
    this._isValid = isDurationValid(normalizedInput); // representation for dateAddRemove

    this._milliseconds = +milliseconds + seconds * 1e3 + // 1000
    minutes * 6e4 + // 1000 * 60
    hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately

    this._days = +days + weeks * 7; // It is impossible to translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.

    this._months = +months + quarters * 3 + years * 12;
    this._data = {};
    this._locale = getLocale();

    this._bubble();
  }

  function isDuration(obj) {
    return obj instanceof Duration;
  }

  function absRound(number) {
    if (number < 0) {
      return Math.round(-1 * number) * -1;
    } else {
      return Math.round(number);
    }
  } // compare two arrays, return the number of differences


  function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
        lengthDiff = Math.abs(array1.length - array2.length),
        diffs = 0,
        i;

    for (i = 0; i < len; i++) {
      if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
        diffs++;
      }
    }

    return diffs + lengthDiff;
  } // FORMATTING


  function offset(token, separator) {
    addFormatToken(token, 0, 0, function () {
      var offset = this.utcOffset(),
          sign = '+';

      if (offset < 0) {
        offset = -offset;
        sign = '-';
      }

      return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~offset % 60, 2);
    });
  }

  offset('Z', ':');
  offset('ZZ', ''); // PARSING

  addRegexToken('Z', matchShortOffset);
  addRegexToken('ZZ', matchShortOffset);
  addParseToken(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
  }); // HELPERS
  // timezone chunker
  // '+10:00' > ['10',  '00']
  // '-1530'  > ['-15', '30']

  var chunkOffset = /([\+\-]|\d\d)/gi;

  function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher),
        chunk,
        parts,
        minutes;

    if (matches === null) {
      return null;
    }

    chunk = matches[matches.length - 1] || [];
    parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    minutes = +(parts[1] * 60) + toInt(parts[2]);
    return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
  } // Return a moment from input, that is local/utc/zone equivalent to model.


  function cloneWithOffset(input, model) {
    var res, diff;

    if (model._isUTC) {
      res = model.clone();
      diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf(); // Use low-level api, because this fn is low-level api.

      res._d.setTime(res._d.valueOf() + diff);

      hooks.updateOffset(res, false);
      return res;
    } else {
      return createLocal(input).local();
    }
  }

  function getDateOffset(m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset());
  } // HOOKS
  // This function will be called whenever a moment is mutated.
  // It is intended to keep the offset in sync with the timezone.


  hooks.updateOffset = function () {}; // MOMENTS
  // keepLocalTime = true means only change the timezone, without
  // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
  // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
  // +0200, so we adjust the time as needed, to be valid.
  //
  // Keeping the time actually adds/subtracts (one hour)
  // from the actual represented time. That is why we call updateOffset
  // a second time. In case it wants us to change the offset again
  // _changeInProgress == true case, then we have to adjust, because
  // there is no such time in the given timezone.


  function getSetOffset(input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
        localAdjust;

    if (!this.isValid()) {
      return input != null ? this : NaN;
    }

    if (input != null) {
      if (typeof input === 'string') {
        input = offsetFromString(matchShortOffset, input);

        if (input === null) {
          return this;
        }
      } else if (Math.abs(input) < 16 && !keepMinutes) {
        input = input * 60;
      }

      if (!this._isUTC && keepLocalTime) {
        localAdjust = getDateOffset(this);
      }

      this._offset = input;
      this._isUTC = true;

      if (localAdjust != null) {
        this.add(localAdjust, 'm');
      }

      if (offset !== input) {
        if (!keepLocalTime || this._changeInProgress) {
          addSubtract(this, createDuration(input - offset, 'm'), 1, false);
        } else if (!this._changeInProgress) {
          this._changeInProgress = true;
          hooks.updateOffset(this, true);
          this._changeInProgress = null;
        }
      }

      return this;
    } else {
      return this._isUTC ? offset : getDateOffset(this);
    }
  }

  function getSetZone(input, keepLocalTime) {
    if (input != null) {
      if (typeof input !== 'string') {
        input = -input;
      }

      this.utcOffset(input, keepLocalTime);
      return this;
    } else {
      return -this.utcOffset();
    }
  }

  function setOffsetToUTC(keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
  }

  function setOffsetToLocal(keepLocalTime) {
    if (this._isUTC) {
      this.utcOffset(0, keepLocalTime);
      this._isUTC = false;

      if (keepLocalTime) {
        this.subtract(getDateOffset(this), 'm');
      }
    }

    return this;
  }

  function setOffsetToParsedOffset() {
    if (this._tzm != null) {
      this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
      var tZone = offsetFromString(matchOffset, this._i);

      if (tZone != null) {
        this.utcOffset(tZone);
      } else {
        this.utcOffset(0, true);
      }
    }

    return this;
  }

  function hasAlignedHourOffset(input) {
    if (!this.isValid()) {
      return false;
    }

    input = input ? createLocal(input).utcOffset() : 0;
    return (this.utcOffset() - input) % 60 === 0;
  }

  function isDaylightSavingTime() {
    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
  }

  function isDaylightSavingTimeShifted() {
    if (!isUndefined(this._isDSTShifted)) {
      return this._isDSTShifted;
    }

    var c = {},
        other;
    copyConfig(c, this);
    c = prepareConfig(c);

    if (c._a) {
      other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
      this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
    } else {
      this._isDSTShifted = false;
    }

    return this._isDSTShifted;
  }

  function isLocal() {
    return this.isValid() ? !this._isUTC : false;
  }

  function isUtcOffset() {
    return this.isValid() ? this._isUTC : false;
  }

  function isUtc() {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
  } // ASP.NET json date format regex


  var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
      // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
  // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
  // and further modified to allow for strings containing both week and day
  isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

  function createDuration(input, key) {
    var duration = input,
        // matching against regexp is expensive, do it on demand
    match = null,
        sign,
        ret,
        diffRes;

    if (isDuration(input)) {
      duration = {
        ms: input._milliseconds,
        d: input._days,
        M: input._months
      };
    } else if (isNumber(input) || !isNaN(+input)) {
      duration = {};

      if (key) {
        duration[key] = +input;
      } else {
        duration.milliseconds = +input;
      }
    } else if (match = aspNetRegex.exec(input)) {
      sign = match[1] === '-' ? -1 : 1;
      duration = {
        y: 0,
        d: toInt(match[DATE]) * sign,
        h: toInt(match[HOUR]) * sign,
        m: toInt(match[MINUTE]) * sign,
        s: toInt(match[SECOND]) * sign,
        ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match

      };
    } else if (match = isoRegex.exec(input)) {
      sign = match[1] === '-' ? -1 : 1;
      duration = {
        y: parseIso(match[2], sign),
        M: parseIso(match[3], sign),
        w: parseIso(match[4], sign),
        d: parseIso(match[5], sign),
        h: parseIso(match[6], sign),
        m: parseIso(match[7], sign),
        s: parseIso(match[8], sign)
      };
    } else if (duration == null) {
      // checks for null or undefined
      duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
      diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));
      duration = {};
      duration.ms = diffRes.milliseconds;
      duration.M = diffRes.months;
    }

    ret = new Duration(duration);

    if (isDuration(input) && hasOwnProp(input, '_locale')) {
      ret._locale = input._locale;
    }

    if (isDuration(input) && hasOwnProp(input, '_isValid')) {
      ret._isValid = input._isValid;
    }

    return ret;
  }

  createDuration.fn = Duration.prototype;
  createDuration.invalid = createInvalid$1;

  function parseIso(inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res = inp && parseFloat(inp.replace(',', '.')); // apply sign while we're at it

    return (isNaN(res) ? 0 : res) * sign;
  }

  function positiveMomentsDifference(base, other) {
    var res = {};
    res.months = other.month() - base.month() + (other.year() - base.year()) * 12;

    if (base.clone().add(res.months, 'M').isAfter(other)) {
      --res.months;
    }

    res.milliseconds = +other - +base.clone().add(res.months, 'M');
    return res;
  }

  function momentsDifference(base, other) {
    var res;

    if (!(base.isValid() && other.isValid())) {
      return {
        milliseconds: 0,
        months: 0
      };
    }

    other = cloneWithOffset(other, base);

    if (base.isBefore(other)) {
      res = positiveMomentsDifference(base, other);
    } else {
      res = positiveMomentsDifference(other, base);
      res.milliseconds = -res.milliseconds;
      res.months = -res.months;
    }

    return res;
  } // TODO: remove 'name' arg after deprecation is removed


  function createAdder(direction, name) {
    return function (val, period) {
      var dur, tmp; //invert the arguments, but complain about it

      if (period !== null && !isNaN(+period)) {
        deprecateSimple(name, 'moment().' + name + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' + 'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
        tmp = val;
        val = period;
        period = tmp;
      }

      dur = createDuration(val, period);
      addSubtract(this, dur, direction);
      return this;
    };
  }

  function addSubtract(mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months);

    if (!mom.isValid()) {
      // No op
      return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (months) {
      setMonth(mom, get(mom, 'Month') + months * isAdding);
    }

    if (days) {
      set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
    }

    if (milliseconds) {
      mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }

    if (updateOffset) {
      hooks.updateOffset(mom, days || months);
    }
  }

  var add = createAdder(1, 'add'),
      subtract = createAdder(-1, 'subtract');

  function isString(input) {
    return typeof input === 'string' || input instanceof String;
  } // type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject | void; // null | undefined


  function isMomentInput(input) {
    return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === undefined;
  }

  function isMomentInputObject(input) {
    var objectTest = isObject(input) && !isObjectEmpty(input),
        propertyTest = false,
        properties = ['years', 'year', 'y', 'months', 'month', 'M', 'days', 'day', 'd', 'dates', 'date', 'D', 'hours', 'hour', 'h', 'minutes', 'minute', 'm', 'seconds', 'second', 's', 'milliseconds', 'millisecond', 'ms'],
        i,
        property;

    for (i = 0; i < properties.length; i += 1) {
      property = properties[i];
      propertyTest = propertyTest || hasOwnProp(input, property);
    }

    return objectTest && propertyTest;
  }

  function isNumberOrStringArray(input) {
    var arrayTest = isArray(input),
        dataTypeTest = false;

    if (arrayTest) {
      dataTypeTest = input.filter(function (item) {
        return !isNumber(item) && isString(input);
      }).length === 0;
    }

    return arrayTest && dataTypeTest;
  }

  function isCalendarSpec(input) {
    var objectTest = isObject(input) && !isObjectEmpty(input),
        propertyTest = false,
        properties = ['sameDay', 'nextDay', 'lastDay', 'nextWeek', 'lastWeek', 'sameElse'],
        i,
        property;

    for (i = 0; i < properties.length; i += 1) {
      property = properties[i];
      propertyTest = propertyTest || hasOwnProp(input, property);
    }

    return objectTest && propertyTest;
  }

  function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' : diff < -1 ? 'lastWeek' : diff < 0 ? 'lastDay' : diff < 1 ? 'sameDay' : diff < 2 ? 'nextDay' : diff < 7 ? 'nextWeek' : 'sameElse';
  }

  function calendar$1(time, formats) {
    // Support for single parameter, formats only overload to the calendar function
    if (arguments.length === 1) {
      if (!arguments[0]) {
        time = undefined;
        formats = undefined;
      } else if (isMomentInput(arguments[0])) {
        time = arguments[0];
        formats = undefined;
      } else if (isCalendarSpec(arguments[0])) {
        formats = arguments[0];
        time = undefined;
      }
    } // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.


    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        format = hooks.calendarFormat(this, sod) || 'sameElse',
        output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);
    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
  }

  function clone() {
    return new Moment(this);
  }

  function isAfter(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);

    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }

    units = normalizeUnits(units) || 'millisecond';

    if (units === 'millisecond') {
      return this.valueOf() > localInput.valueOf();
    } else {
      return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
  }

  function isBefore(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);

    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }

    units = normalizeUnits(units) || 'millisecond';

    if (units === 'millisecond') {
      return this.valueOf() < localInput.valueOf();
    } else {
      return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
  }

  function isBetween(from, to, units, inclusivity) {
    var localFrom = isMoment(from) ? from : createLocal(from),
        localTo = isMoment(to) ? to : createLocal(to);

    if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
      return false;
    }

    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ')' ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
  }

  function isSame(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;

    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }

    units = normalizeUnits(units) || 'millisecond';

    if (units === 'millisecond') {
      return this.valueOf() === localInput.valueOf();
    } else {
      inputMs = localInput.valueOf();
      return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
  }

  function isSameOrAfter(input, units) {
    return this.isSame(input, units) || this.isAfter(input, units);
  }

  function isSameOrBefore(input, units) {
    return this.isSame(input, units) || this.isBefore(input, units);
  }

  function diff(input, units, asFloat) {
    var that, zoneDelta, output;

    if (!this.isValid()) {
      return NaN;
    }

    that = cloneWithOffset(input, this);

    if (!that.isValid()) {
      return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
    units = normalizeUnits(units);

    switch (units) {
      case 'year':
        output = monthDiff(this, that) / 12;
        break;

      case 'month':
        output = monthDiff(this, that);
        break;

      case 'quarter':
        output = monthDiff(this, that) / 3;
        break;

      case 'second':
        output = (this - that) / 1e3;
        break;
      // 1000

      case 'minute':
        output = (this - that) / 6e4;
        break;
      // 1000 * 60

      case 'hour':
        output = (this - that) / 36e5;
        break;
      // 1000 * 60 * 60

      case 'day':
        output = (this - that - zoneDelta) / 864e5;
        break;
      // 1000 * 60 * 60 * 24, negate dst

      case 'week':
        output = (this - that - zoneDelta) / 6048e5;
        break;
      // 1000 * 60 * 60 * 24 * 7, negate dst

      default:
        output = this - that;
    }

    return asFloat ? output : absFloor(output);
  }

  function monthDiff(a, b) {
    if (a.date() < b.date()) {
      // end-of-month calculations work correct when the start month has more
      // days than the end month.
      return -monthDiff(b, a);
    } // difference in months


    var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
    anchor = a.clone().add(wholeMonthDiff, 'months'),
        anchor2,
        adjust;

    if (b - anchor < 0) {
      anchor2 = a.clone().add(wholeMonthDiff - 1, 'months'); // linear across the month

      adjust = (b - anchor) / (anchor - anchor2);
    } else {
      anchor2 = a.clone().add(wholeMonthDiff + 1, 'months'); // linear across the month

      adjust = (b - anchor) / (anchor2 - anchor);
    } //check for negative zero, return zero if negative zero


    return -(wholeMonthDiff + adjust) || 0;
  }

  hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
  hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

  function toString() {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
  }

  function toISOString(keepOffset) {
    if (!this.isValid()) {
      return null;
    }

    var utc = keepOffset !== true,
        m = utc ? this.clone().utc() : this;

    if (m.year() < 0 || m.year() > 9999) {
      return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }

    if (isFunction(Date.prototype.toISOString)) {
      // native implementation is ~50x faster, use it when we can
      if (utc) {
        return this.toDate().toISOString();
      } else {
        return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
      }
    }

    return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
  }
  /**
   * Return a human readable representation of a moment that can
   * also be evaluated to get a new moment which is the same
   *
   * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
   */


  function inspect() {
    if (!this.isValid()) {
      return 'moment.invalid(/* ' + this._i + ' */)';
    }

    var func = 'moment',
        zone = '',
        prefix,
        year,
        datetime,
        suffix;

    if (!this.isLocal()) {
      func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
      zone = 'Z';
    }

    prefix = '[' + func + '("]';
    year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
    datetime = '-MM-DD[T]HH:mm:ss.SSS';
    suffix = zone + '[")]';
    return this.format(prefix + year + datetime + suffix);
  }

  function format(inputString) {
    if (!inputString) {
      inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }

    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
  }

  function from(time, withoutSuffix) {
    if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
      return createDuration({
        to: this,
        from: time
      }).locale(this.locale()).humanize(!withoutSuffix);
    } else {
      return this.localeData().invalidDate();
    }
  }

  function fromNow(withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
  }

  function to(time, withoutSuffix) {
    if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
      return createDuration({
        from: this,
        to: time
      }).locale(this.locale()).humanize(!withoutSuffix);
    } else {
      return this.localeData().invalidDate();
    }
  }

  function toNow(withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
  } // If passed a locale key, it will set the locale for this
  // instance.  Otherwise, it will return the locale configuration
  // variables for this instance.


  function locale(key) {
    var newLocaleData;

    if (key === undefined) {
      return this._locale._abbr;
    } else {
      newLocaleData = getLocale(key);

      if (newLocaleData != null) {
        this._locale = newLocaleData;
      }

      return this;
    }
  }

  var lang = deprecate('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.', function (key) {
    if (key === undefined) {
      return this.localeData();
    } else {
      return this.locale(key);
    }
  });

  function localeData() {
    return this._locale;
  }

  var MS_PER_SECOND = 1000,
      MS_PER_MINUTE = 60 * MS_PER_SECOND,
      MS_PER_HOUR = 60 * MS_PER_MINUTE,
      MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR; // actual modulo - handles negative numbers (for dates before 1970):

  function mod$1(dividend, divisor) {
    return (dividend % divisor + divisor) % divisor;
  }

  function localStartOfDate(y, m, d) {
    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0) {
      // preserve leap years using a full 400 year cycle, then reset
      return new Date(y + 400, m, d) - MS_PER_400_YEARS;
    } else {
      return new Date(y, m, d).valueOf();
    }
  }

  function utcStartOfDate(y, m, d) {
    // Date.UTC remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0) {
      // preserve leap years using a full 400 year cycle, then reset
      return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
    } else {
      return Date.UTC(y, m, d);
    }
  }

  function startOf(units) {
    var time, startOfDate;
    units = normalizeUnits(units);

    if (units === undefined || units === 'millisecond' || !this.isValid()) {
      return this;
    }

    startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

    switch (units) {
      case 'year':
        time = startOfDate(this.year(), 0, 1);
        break;

      case 'quarter':
        time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
        break;

      case 'month':
        time = startOfDate(this.year(), this.month(), 1);
        break;

      case 'week':
        time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
        break;

      case 'isoWeek':
        time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
        break;

      case 'day':
      case 'date':
        time = startOfDate(this.year(), this.month(), this.date());
        break;

      case 'hour':
        time = this._d.valueOf();
        time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
        break;

      case 'minute':
        time = this._d.valueOf();
        time -= mod$1(time, MS_PER_MINUTE);
        break;

      case 'second':
        time = this._d.valueOf();
        time -= mod$1(time, MS_PER_SECOND);
        break;
    }

    this._d.setTime(time);

    hooks.updateOffset(this, true);
    return this;
  }

  function endOf(units) {
    var time, startOfDate;
    units = normalizeUnits(units);

    if (units === undefined || units === 'millisecond' || !this.isValid()) {
      return this;
    }

    startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

    switch (units) {
      case 'year':
        time = startOfDate(this.year() + 1, 0, 1) - 1;
        break;

      case 'quarter':
        time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
        break;

      case 'month':
        time = startOfDate(this.year(), this.month() + 1, 1) - 1;
        break;

      case 'week':
        time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
        break;

      case 'isoWeek':
        time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
        break;

      case 'day':
      case 'date':
        time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
        break;

      case 'hour':
        time = this._d.valueOf();
        time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
        break;

      case 'minute':
        time = this._d.valueOf();
        time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
        break;

      case 'second':
        time = this._d.valueOf();
        time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
        break;
    }

    this._d.setTime(time);

    hooks.updateOffset(this, true);
    return this;
  }

  function valueOf() {
    return this._d.valueOf() - (this._offset || 0) * 60000;
  }

  function unix() {
    return Math.floor(this.valueOf() / 1000);
  }

  function toDate() {
    return new Date(this.valueOf());
  }

  function toArray() {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
  }

  function toObject() {
    var m = this;
    return {
      years: m.year(),
      months: m.month(),
      date: m.date(),
      hours: m.hours(),
      minutes: m.minutes(),
      seconds: m.seconds(),
      milliseconds: m.milliseconds()
    };
  }

  function toJSON() {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
  }

  function isValid$2() {
    return isValid(this);
  }

  function parsingFlags() {
    return extend({}, getParsingFlags(this));
  }

  function invalidAt() {
    return getParsingFlags(this).overflow;
  }

  function creationData() {
    return {
      input: this._i,
      format: this._f,
      locale: this._locale,
      isUTC: this._isUTC,
      strict: this._strict
    };
  }

  addFormatToken('N', 0, 0, 'eraAbbr');
  addFormatToken('NN', 0, 0, 'eraAbbr');
  addFormatToken('NNN', 0, 0, 'eraAbbr');
  addFormatToken('NNNN', 0, 0, 'eraName');
  addFormatToken('NNNNN', 0, 0, 'eraNarrow');
  addFormatToken('y', ['y', 1], 'yo', 'eraYear');
  addFormatToken('y', ['yy', 2], 0, 'eraYear');
  addFormatToken('y', ['yyy', 3], 0, 'eraYear');
  addFormatToken('y', ['yyyy', 4], 0, 'eraYear');
  addRegexToken('N', matchEraAbbr);
  addRegexToken('NN', matchEraAbbr);
  addRegexToken('NNN', matchEraAbbr);
  addRegexToken('NNNN', matchEraName);
  addRegexToken('NNNNN', matchEraNarrow);
  addParseToken(['N', 'NN', 'NNN', 'NNNN', 'NNNNN'], function (input, array, config, token) {
    var era = config._locale.erasParse(input, token, config._strict);

    if (era) {
      getParsingFlags(config).era = era;
    } else {
      getParsingFlags(config).invalidEra = input;
    }
  });
  addRegexToken('y', matchUnsigned);
  addRegexToken('yy', matchUnsigned);
  addRegexToken('yyy', matchUnsigned);
  addRegexToken('yyyy', matchUnsigned);
  addRegexToken('yo', matchEraYearOrdinal);
  addParseToken(['y', 'yy', 'yyy', 'yyyy'], YEAR);
  addParseToken(['yo'], function (input, array, config, token) {
    var match;

    if (config._locale._eraYearOrdinalRegex) {
      match = input.match(config._locale._eraYearOrdinalRegex);
    }

    if (config._locale.eraYearOrdinalParse) {
      array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
    } else {
      array[YEAR] = parseInt(input, 10);
    }
  });

  function localeEras(m, format) {
    var i,
        l,
        date,
        eras = this._eras || getLocale('en')._eras;

    for (i = 0, l = eras.length; i < l; ++i) {
      switch (typeof eras[i].since) {
        case 'string':
          // truncate time
          date = hooks(eras[i].since).startOf('day');
          eras[i].since = date.valueOf();
          break;
      }

      switch (typeof eras[i].until) {
        case 'undefined':
          eras[i].until = +Infinity;
          break;

        case 'string':
          // truncate time
          date = hooks(eras[i].until).startOf('day').valueOf();
          eras[i].until = date.valueOf();
          break;
      }
    }

    return eras;
  }

  function localeErasParse(eraName, format, strict) {
    var i,
        l,
        eras = this.eras(),
        name,
        abbr,
        narrow;
    eraName = eraName.toUpperCase();

    for (i = 0, l = eras.length; i < l; ++i) {
      name = eras[i].name.toUpperCase();
      abbr = eras[i].abbr.toUpperCase();
      narrow = eras[i].narrow.toUpperCase();

      if (strict) {
        switch (format) {
          case 'N':
          case 'NN':
          case 'NNN':
            if (abbr === eraName) {
              return eras[i];
            }

            break;

          case 'NNNN':
            if (name === eraName) {
              return eras[i];
            }

            break;

          case 'NNNNN':
            if (narrow === eraName) {
              return eras[i];
            }

            break;
        }
      } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
        return eras[i];
      }
    }
  }

  function localeErasConvertYear(era, year) {
    var dir = era.since <= era.until ? +1 : -1;

    if (year === undefined) {
      return hooks(era.since).year();
    } else {
      return hooks(era.since).year() + (year - era.offset) * dir;
    }
  }

  function getEraName() {
    var i,
        l,
        val,
        eras = this.localeData().eras();

    for (i = 0, l = eras.length; i < l; ++i) {
      // truncate time
      val = this.clone().startOf('day').valueOf();

      if (eras[i].since <= val && val <= eras[i].until) {
        return eras[i].name;
      }

      if (eras[i].until <= val && val <= eras[i].since) {
        return eras[i].name;
      }
    }

    return '';
  }

  function getEraNarrow() {
    var i,
        l,
        val,
        eras = this.localeData().eras();

    for (i = 0, l = eras.length; i < l; ++i) {
      // truncate time
      val = this.clone().startOf('day').valueOf();

      if (eras[i].since <= val && val <= eras[i].until) {
        return eras[i].narrow;
      }

      if (eras[i].until <= val && val <= eras[i].since) {
        return eras[i].narrow;
      }
    }

    return '';
  }

  function getEraAbbr() {
    var i,
        l,
        val,
        eras = this.localeData().eras();

    for (i = 0, l = eras.length; i < l; ++i) {
      // truncate time
      val = this.clone().startOf('day').valueOf();

      if (eras[i].since <= val && val <= eras[i].until) {
        return eras[i].abbr;
      }

      if (eras[i].until <= val && val <= eras[i].since) {
        return eras[i].abbr;
      }
    }

    return '';
  }

  function getEraYear() {
    var i,
        l,
        dir,
        val,
        eras = this.localeData().eras();

    for (i = 0, l = eras.length; i < l; ++i) {
      dir = eras[i].since <= eras[i].until ? +1 : -1; // truncate time

      val = this.clone().startOf('day').valueOf();

      if (eras[i].since <= val && val <= eras[i].until || eras[i].until <= val && val <= eras[i].since) {
        return (this.year() - hooks(eras[i].since).year()) * dir + eras[i].offset;
      }
    }

    return this.year();
  }

  function erasNameRegex(isStrict) {
    if (!hasOwnProp(this, '_erasNameRegex')) {
      computeErasParse.call(this);
    }

    return isStrict ? this._erasNameRegex : this._erasRegex;
  }

  function erasAbbrRegex(isStrict) {
    if (!hasOwnProp(this, '_erasAbbrRegex')) {
      computeErasParse.call(this);
    }

    return isStrict ? this._erasAbbrRegex : this._erasRegex;
  }

  function erasNarrowRegex(isStrict) {
    if (!hasOwnProp(this, '_erasNarrowRegex')) {
      computeErasParse.call(this);
    }

    return isStrict ? this._erasNarrowRegex : this._erasRegex;
  }

  function matchEraAbbr(isStrict, locale) {
    return locale.erasAbbrRegex(isStrict);
  }

  function matchEraName(isStrict, locale) {
    return locale.erasNameRegex(isStrict);
  }

  function matchEraNarrow(isStrict, locale) {
    return locale.erasNarrowRegex(isStrict);
  }

  function matchEraYearOrdinal(isStrict, locale) {
    return locale._eraYearOrdinalRegex || matchUnsigned;
  }

  function computeErasParse() {
    var abbrPieces = [],
        namePieces = [],
        narrowPieces = [],
        mixedPieces = [],
        i,
        l,
        eras = this.eras();

    for (i = 0, l = eras.length; i < l; ++i) {
      namePieces.push(regexEscape(eras[i].name));
      abbrPieces.push(regexEscape(eras[i].abbr));
      narrowPieces.push(regexEscape(eras[i].narrow));
      mixedPieces.push(regexEscape(eras[i].name));
      mixedPieces.push(regexEscape(eras[i].abbr));
      mixedPieces.push(regexEscape(eras[i].narrow));
    }

    this._erasRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._erasNameRegex = new RegExp('^(' + namePieces.join('|') + ')', 'i');
    this._erasAbbrRegex = new RegExp('^(' + abbrPieces.join('|') + ')', 'i');
    this._erasNarrowRegex = new RegExp('^(' + narrowPieces.join('|') + ')', 'i');
  } // FORMATTING


  addFormatToken(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
  });
  addFormatToken(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
  });

  function addWeekYearFormatToken(token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
  }

  addWeekYearFormatToken('gggg', 'weekYear');
  addWeekYearFormatToken('ggggg', 'weekYear');
  addWeekYearFormatToken('GGGG', 'isoWeekYear');
  addWeekYearFormatToken('GGGGG', 'isoWeekYear'); // ALIASES

  addUnitAlias('weekYear', 'gg');
  addUnitAlias('isoWeekYear', 'GG'); // PRIORITY

  addUnitPriority('weekYear', 1);
  addUnitPriority('isoWeekYear', 1); // PARSING

  addRegexToken('G', matchSigned);
  addRegexToken('g', matchSigned);
  addRegexToken('GG', match1to2, match2);
  addRegexToken('gg', match1to2, match2);
  addRegexToken('GGGG', match1to4, match4);
  addRegexToken('gggg', match1to4, match4);
  addRegexToken('GGGGG', match1to6, match6);
  addRegexToken('ggggg', match1to6, match6);
  addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input);
  });
  addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input);
  }); // MOMENTS

  function getSetWeekYear(input) {
    return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
  }

  function getSetISOWeekYear(input) {
    return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
  }

  function getISOWeeksInYear() {
    return weeksInYear(this.year(), 1, 4);
  }

  function getISOWeeksInISOWeekYear() {
    return weeksInYear(this.isoWeekYear(), 1, 4);
  }

  function getWeeksInYear() {
    var weekInfo = this.localeData()._week;

    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
  }

  function getWeeksInWeekYear() {
    var weekInfo = this.localeData()._week;

    return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
  }

  function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;

    if (input == null) {
      return weekOfYear(this, dow, doy).year;
    } else {
      weeksTarget = weeksInYear(input, dow, doy);

      if (week > weeksTarget) {
        week = weeksTarget;
      }

      return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
  }

  function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
  } // FORMATTING


  addFormatToken('Q', 0, 'Qo', 'quarter'); // ALIASES

  addUnitAlias('quarter', 'Q'); // PRIORITY

  addUnitPriority('quarter', 7); // PARSING

  addRegexToken('Q', match1);
  addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
  }); // MOMENTS

  function getSetQuarter(input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
  } // FORMATTING


  addFormatToken('D', ['DD', 2], 'Do', 'date'); // ALIASES

  addUnitAlias('date', 'D'); // PRIORITY

  addUnitPriority('date', 9); // PARSING

  addRegexToken('D', match1to2);
  addRegexToken('DD', match1to2, match2);
  addRegexToken('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ? locale._dayOfMonthOrdinalParse || locale._ordinalParse : locale._dayOfMonthOrdinalParseLenient;
  });
  addParseToken(['D', 'DD'], DATE);
  addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0]);
  }); // MOMENTS

  var getSetDayOfMonth = makeGetSet('Date', true); // FORMATTING

  addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear'); // ALIASES

  addUnitAlias('dayOfYear', 'DDD'); // PRIORITY

  addUnitPriority('dayOfYear', 4); // PARSING

  addRegexToken('DDD', match1to3);
  addRegexToken('DDDD', match3);
  addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
  }); // HELPERS
  // MOMENTS

  function getSetDayOfYear(input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
  } // FORMATTING


  addFormatToken('m', ['mm', 2], 0, 'minute'); // ALIASES

  addUnitAlias('minute', 'm'); // PRIORITY

  addUnitPriority('minute', 14); // PARSING

  addRegexToken('m', match1to2);
  addRegexToken('mm', match1to2, match2);
  addParseToken(['m', 'mm'], MINUTE); // MOMENTS

  var getSetMinute = makeGetSet('Minutes', false); // FORMATTING

  addFormatToken('s', ['ss', 2], 0, 'second'); // ALIASES

  addUnitAlias('second', 's'); // PRIORITY

  addUnitPriority('second', 15); // PARSING

  addRegexToken('s', match1to2);
  addRegexToken('ss', match1to2, match2);
  addParseToken(['s', 'ss'], SECOND); // MOMENTS

  var getSetSecond = makeGetSet('Seconds', false); // FORMATTING

  addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
  });
  addFormatToken(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
  });
  addFormatToken(0, ['SSS', 3], 0, 'millisecond');
  addFormatToken(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
  });
  addFormatToken(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
  });
  addFormatToken(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
  });
  addFormatToken(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
  });
  addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
  });
  addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
  }); // ALIASES

  addUnitAlias('millisecond', 'ms'); // PRIORITY

  addUnitPriority('millisecond', 16); // PARSING

  addRegexToken('S', match1to3, match1);
  addRegexToken('SS', match1to3, match2);
  addRegexToken('SSS', match1to3, match3);
  var token, getSetMillisecond;

  for (token = 'SSSS'; token.length <= 9; token += 'S') {
    addRegexToken(token, matchUnsigned);
  }

  function parseMs(input, array) {
    array[MILLISECOND] = toInt(('0.' + input) * 1000);
  }

  for (token = 'S'; token.length <= 9; token += 'S') {
    addParseToken(token, parseMs);
  }

  getSetMillisecond = makeGetSet('Milliseconds', false); // FORMATTING

  addFormatToken('z', 0, 0, 'zoneAbbr');
  addFormatToken('zz', 0, 0, 'zoneName'); // MOMENTS

  function getZoneAbbr() {
    return this._isUTC ? 'UTC' : '';
  }

  function getZoneName() {
    return this._isUTC ? 'Coordinated Universal Time' : '';
  }

  var proto = Moment.prototype;
  proto.add = add;
  proto.calendar = calendar$1;
  proto.clone = clone;
  proto.diff = diff;
  proto.endOf = endOf;
  proto.format = format;
  proto.from = from;
  proto.fromNow = fromNow;
  proto.to = to;
  proto.toNow = toNow;
  proto.get = stringGet;
  proto.invalidAt = invalidAt;
  proto.isAfter = isAfter;
  proto.isBefore = isBefore;
  proto.isBetween = isBetween;
  proto.isSame = isSame;
  proto.isSameOrAfter = isSameOrAfter;
  proto.isSameOrBefore = isSameOrBefore;
  proto.isValid = isValid$2;
  proto.lang = lang;
  proto.locale = locale;
  proto.localeData = localeData;
  proto.max = prototypeMax;
  proto.min = prototypeMin;
  proto.parsingFlags = parsingFlags;
  proto.set = stringSet;
  proto.startOf = startOf;
  proto.subtract = subtract;
  proto.toArray = toArray;
  proto.toObject = toObject;
  proto.toDate = toDate;
  proto.toISOString = toISOString;
  proto.inspect = inspect;

  if (typeof Symbol !== 'undefined' && Symbol.for != null) {
    proto[Symbol.for('nodejs.util.inspect.custom')] = function () {
      return 'Moment<' + this.format() + '>';
    };
  }

  proto.toJSON = toJSON;
  proto.toString = toString;
  proto.unix = unix;
  proto.valueOf = valueOf;
  proto.creationData = creationData;
  proto.eraName = getEraName;
  proto.eraNarrow = getEraNarrow;
  proto.eraAbbr = getEraAbbr;
  proto.eraYear = getEraYear;
  proto.year = getSetYear;
  proto.isLeapYear = getIsLeapYear;
  proto.weekYear = getSetWeekYear;
  proto.isoWeekYear = getSetISOWeekYear;
  proto.quarter = proto.quarters = getSetQuarter;
  proto.month = getSetMonth;
  proto.daysInMonth = getDaysInMonth;
  proto.week = proto.weeks = getSetWeek;
  proto.isoWeek = proto.isoWeeks = getSetISOWeek;
  proto.weeksInYear = getWeeksInYear;
  proto.weeksInWeekYear = getWeeksInWeekYear;
  proto.isoWeeksInYear = getISOWeeksInYear;
  proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
  proto.date = getSetDayOfMonth;
  proto.day = proto.days = getSetDayOfWeek;
  proto.weekday = getSetLocaleDayOfWeek;
  proto.isoWeekday = getSetISODayOfWeek;
  proto.dayOfYear = getSetDayOfYear;
  proto.hour = proto.hours = getSetHour;
  proto.minute = proto.minutes = getSetMinute;
  proto.second = proto.seconds = getSetSecond;
  proto.millisecond = proto.milliseconds = getSetMillisecond;
  proto.utcOffset = getSetOffset;
  proto.utc = setOffsetToUTC;
  proto.local = setOffsetToLocal;
  proto.parseZone = setOffsetToParsedOffset;
  proto.hasAlignedHourOffset = hasAlignedHourOffset;
  proto.isDST = isDaylightSavingTime;
  proto.isLocal = isLocal;
  proto.isUtcOffset = isUtcOffset;
  proto.isUtc = isUtc;
  proto.isUTC = isUtc;
  proto.zoneAbbr = getZoneAbbr;
  proto.zoneName = getZoneName;
  proto.dates = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
  proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
  proto.years = deprecate('years accessor is deprecated. Use year instead', getSetYear);
  proto.zone = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
  proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

  function createUnix(input) {
    return createLocal(input * 1000);
  }

  function createInZone() {
    return createLocal.apply(null, arguments).parseZone();
  }

  function preParsePostFormat(string) {
    return string;
  }

  var proto$1 = Locale.prototype;
  proto$1.calendar = calendar;
  proto$1.longDateFormat = longDateFormat;
  proto$1.invalidDate = invalidDate;
  proto$1.ordinal = ordinal;
  proto$1.preparse = preParsePostFormat;
  proto$1.postformat = preParsePostFormat;
  proto$1.relativeTime = relativeTime;
  proto$1.pastFuture = pastFuture;
  proto$1.set = set;
  proto$1.eras = localeEras;
  proto$1.erasParse = localeErasParse;
  proto$1.erasConvertYear = localeErasConvertYear;
  proto$1.erasAbbrRegex = erasAbbrRegex;
  proto$1.erasNameRegex = erasNameRegex;
  proto$1.erasNarrowRegex = erasNarrowRegex;
  proto$1.months = localeMonths;
  proto$1.monthsShort = localeMonthsShort;
  proto$1.monthsParse = localeMonthsParse;
  proto$1.monthsRegex = monthsRegex;
  proto$1.monthsShortRegex = monthsShortRegex;
  proto$1.week = localeWeek;
  proto$1.firstDayOfYear = localeFirstDayOfYear;
  proto$1.firstDayOfWeek = localeFirstDayOfWeek;
  proto$1.weekdays = localeWeekdays;
  proto$1.weekdaysMin = localeWeekdaysMin;
  proto$1.weekdaysShort = localeWeekdaysShort;
  proto$1.weekdaysParse = localeWeekdaysParse;
  proto$1.weekdaysRegex = weekdaysRegex;
  proto$1.weekdaysShortRegex = weekdaysShortRegex;
  proto$1.weekdaysMinRegex = weekdaysMinRegex;
  proto$1.isPM = localeIsPM;
  proto$1.meridiem = localeMeridiem;

  function get$1(format, index, field, setter) {
    var locale = getLocale(),
        utc = createUTC().set(setter, index);
    return locale[field](utc, format);
  }

  function listMonthsImpl(format, index, field) {
    if (isNumber(format)) {
      index = format;
      format = undefined;
    }

    format = format || '';

    if (index != null) {
      return get$1(format, index, field, 'month');
    }

    var i,
        out = [];

    for (i = 0; i < 12; i++) {
      out[i] = get$1(format, i, field, 'month');
    }

    return out;
  } // ()
  // (5)
  // (fmt, 5)
  // (fmt)
  // (true)
  // (true, 5)
  // (true, fmt, 5)
  // (true, fmt)


  function listWeekdaysImpl(localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
      if (isNumber(format)) {
        index = format;
        format = undefined;
      }

      format = format || '';
    } else {
      format = localeSorted;
      index = format;
      localeSorted = false;

      if (isNumber(format)) {
        index = format;
        format = undefined;
      }

      format = format || '';
    }

    var locale = getLocale(),
        shift = localeSorted ? locale._week.dow : 0,
        i,
        out = [];

    if (index != null) {
      return get$1(format, (index + shift) % 7, field, 'day');
    }

    for (i = 0; i < 7; i++) {
      out[i] = get$1(format, (i + shift) % 7, field, 'day');
    }

    return out;
  }

  function listMonths(format, index) {
    return listMonthsImpl(format, index, 'months');
  }

  function listMonthsShort(format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
  }

  function listWeekdays(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
  }

  function listWeekdaysShort(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
  }

  function listWeekdaysMin(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
  }

  getSetGlobalLocale('en', {
    eras: [{
      since: '0001-01-01',
      until: +Infinity,
      offset: 1,
      name: 'Anno Domini',
      narrow: 'AD',
      abbr: 'AD'
    }, {
      since: '0000-12-31',
      until: -Infinity,
      offset: 1,
      name: 'Before Christ',
      narrow: 'BC',
      abbr: 'BC'
    }],
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal: function (number) {
      var b = number % 10,
          output = toInt(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
      return number + output;
    }
  }); // Side effect imports

  hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
  hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);
  var mathAbs = Math.abs;

  function abs() {
    var data = this._data;
    this._milliseconds = mathAbs(this._milliseconds);
    this._days = mathAbs(this._days);
    this._months = mathAbs(this._months);
    data.milliseconds = mathAbs(data.milliseconds);
    data.seconds = mathAbs(data.seconds);
    data.minutes = mathAbs(data.minutes);
    data.hours = mathAbs(data.hours);
    data.months = mathAbs(data.months);
    data.years = mathAbs(data.years);
    return this;
  }

  function addSubtract$1(duration, input, value, direction) {
    var other = createDuration(input, value);
    duration._milliseconds += direction * other._milliseconds;
    duration._days += direction * other._days;
    duration._months += direction * other._months;
    return duration._bubble();
  } // supports only 2.0-style add(1, 's') or add(duration)


  function add$1(input, value) {
    return addSubtract$1(this, input, value, 1);
  } // supports only 2.0-style subtract(1, 's') or subtract(duration)


  function subtract$1(input, value) {
    return addSubtract$1(this, input, value, -1);
  }

  function absCeil(number) {
    if (number < 0) {
      return Math.floor(number);
    } else {
      return Math.ceil(number);
    }
  }

  function bubble() {
    var milliseconds = this._milliseconds,
        days = this._days,
        months = this._months,
        data = this._data,
        seconds,
        minutes,
        hours,
        years,
        monthsFromDays; // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166

    if (!(milliseconds >= 0 && days >= 0 && months >= 0 || milliseconds <= 0 && days <= 0 && months <= 0)) {
      milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
      days = 0;
      months = 0;
    } // The following code bubbles up values, see the tests for
    // examples of what that means.


    data.milliseconds = milliseconds % 1000;
    seconds = absFloor(milliseconds / 1000);
    data.seconds = seconds % 60;
    minutes = absFloor(seconds / 60);
    data.minutes = minutes % 60;
    hours = absFloor(minutes / 60);
    data.hours = hours % 24;
    days += absFloor(hours / 24); // convert days to months

    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays)); // 12 months -> 1 year

    years = absFloor(months / 12);
    months %= 12;
    data.days = days;
    data.months = months;
    data.years = years;
    return this;
  }

  function daysToMonths(days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
  }

  function monthsToDays(months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
  }

  function as(units) {
    if (!this.isValid()) {
      return NaN;
    }

    var days,
        months,
        milliseconds = this._milliseconds;
    units = normalizeUnits(units);

    if (units === 'month' || units === 'quarter' || units === 'year') {
      days = this._days + milliseconds / 864e5;
      months = this._months + daysToMonths(days);

      switch (units) {
        case 'month':
          return months;

        case 'quarter':
          return months / 3;

        case 'year':
          return months / 12;
      }
    } else {
      // handle milliseconds separately because of floating point math errors (issue #1867)
      days = this._days + Math.round(monthsToDays(this._months));

      switch (units) {
        case 'week':
          return days / 7 + milliseconds / 6048e5;

        case 'day':
          return days + milliseconds / 864e5;

        case 'hour':
          return days * 24 + milliseconds / 36e5;

        case 'minute':
          return days * 1440 + milliseconds / 6e4;

        case 'second':
          return days * 86400 + milliseconds / 1000;
        // Math.floor prevents floating point math errors here

        case 'millisecond':
          return Math.floor(days * 864e5) + milliseconds;

        default:
          throw new Error('Unknown unit ' + units);
      }
    }
  } // TODO: Use this.as('ms')?


  function valueOf$1() {
    if (!this.isValid()) {
      return NaN;
    }

    return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
  }

  function makeAs(alias) {
    return function () {
      return this.as(alias);
    };
  }

  var asMilliseconds = makeAs('ms'),
      asSeconds = makeAs('s'),
      asMinutes = makeAs('m'),
      asHours = makeAs('h'),
      asDays = makeAs('d'),
      asWeeks = makeAs('w'),
      asMonths = makeAs('M'),
      asQuarters = makeAs('Q'),
      asYears = makeAs('y');

  function clone$1() {
    return createDuration(this);
  }

  function get$2(units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + 's']() : NaN;
  }

  function makeGetter(name) {
    return function () {
      return this.isValid() ? this._data[name] : NaN;
    };
  }

  var milliseconds = makeGetter('milliseconds'),
      seconds = makeGetter('seconds'),
      minutes = makeGetter('minutes'),
      hours = makeGetter('hours'),
      days = makeGetter('days'),
      months = makeGetter('months'),
      years = makeGetter('years');

  function weeks() {
    return absFloor(this.days() / 7);
  }

  var round = Math.round,
      thresholds = {
    ss: 44,
    // a few seconds to seconds
    s: 45,
    // seconds to minute
    m: 45,
    // minutes to hour
    h: 22,
    // hours to day
    d: 26,
    // days to month/week
    w: null,
    // weeks to month
    M: 11 // months to year

  }; // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize

  function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
  }

  function relativeTime$1(posNegDuration, withoutSuffix, thresholds, locale) {
    var duration = createDuration(posNegDuration).abs(),
        seconds = round(duration.as('s')),
        minutes = round(duration.as('m')),
        hours = round(duration.as('h')),
        days = round(duration.as('d')),
        months = round(duration.as('M')),
        weeks = round(duration.as('w')),
        years = round(duration.as('y')),
        a = seconds <= thresholds.ss && ['s', seconds] || seconds < thresholds.s && ['ss', seconds] || minutes <= 1 && ['m'] || minutes < thresholds.m && ['mm', minutes] || hours <= 1 && ['h'] || hours < thresholds.h && ['hh', hours] || days <= 1 && ['d'] || days < thresholds.d && ['dd', days];

    if (thresholds.w != null) {
      a = a || weeks <= 1 && ['w'] || weeks < thresholds.w && ['ww', weeks];
    }

    a = a || months <= 1 && ['M'] || months < thresholds.M && ['MM', months] || years <= 1 && ['y'] || ['yy', years];
    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
  } // This function allows you to set the rounding function for relative time strings


  function getSetRelativeTimeRounding(roundingFunction) {
    if (roundingFunction === undefined) {
      return round;
    }

    if (typeof roundingFunction === 'function') {
      round = roundingFunction;
      return true;
    }

    return false;
  } // This function allows you to set a threshold for relative time strings


  function getSetRelativeTimeThreshold(threshold, limit) {
    if (thresholds[threshold] === undefined) {
      return false;
    }

    if (limit === undefined) {
      return thresholds[threshold];
    }

    thresholds[threshold] = limit;

    if (threshold === 's') {
      thresholds.ss = limit - 1;
    }

    return true;
  }

  function humanize(argWithSuffix, argThresholds) {
    if (!this.isValid()) {
      return this.localeData().invalidDate();
    }

    var withSuffix = false,
        th = thresholds,
        locale,
        output;

    if (typeof argWithSuffix === 'object') {
      argThresholds = argWithSuffix;
      argWithSuffix = false;
    }

    if (typeof argWithSuffix === 'boolean') {
      withSuffix = argWithSuffix;
    }

    if (typeof argThresholds === 'object') {
      th = Object.assign({}, thresholds, argThresholds);

      if (argThresholds.s != null && argThresholds.ss == null) {
        th.ss = argThresholds.s - 1;
      }
    }

    locale = this.localeData();
    output = relativeTime$1(this, !withSuffix, th, locale);

    if (withSuffix) {
      output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
  }

  var abs$1 = Math.abs;

  function sign(x) {
    return (x > 0) - (x < 0) || +x;
  }

  function toISOString$1() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
      return this.localeData().invalidDate();
    }

    var seconds = abs$1(this._milliseconds) / 1000,
        days = abs$1(this._days),
        months = abs$1(this._months),
        minutes,
        hours,
        years,
        s,
        total = this.asSeconds(),
        totalSign,
        ymSign,
        daysSign,
        hmsSign;

    if (!total) {
      // this is the same as C#'s (Noda) and python (isodate)...
      // but not other JS (goog.date)
      return 'P0D';
    } // 3600 seconds -> 60 minutes -> 1 hour


    minutes = absFloor(seconds / 60);
    hours = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60; // 12 months -> 1 year

    years = absFloor(months / 12);
    months %= 12; // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js

    s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
    totalSign = total < 0 ? '-' : '';
    ymSign = sign(this._months) !== sign(total) ? '-' : '';
    daysSign = sign(this._days) !== sign(total) ? '-' : '';
    hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';
    return totalSign + 'P' + (years ? ymSign + years + 'Y' : '') + (months ? ymSign + months + 'M' : '') + (days ? daysSign + days + 'D' : '') + (hours || minutes || seconds ? 'T' : '') + (hours ? hmsSign + hours + 'H' : '') + (minutes ? hmsSign + minutes + 'M' : '') + (seconds ? hmsSign + s + 'S' : '');
  }

  var proto$2 = Duration.prototype;
  proto$2.isValid = isValid$1;
  proto$2.abs = abs;
  proto$2.add = add$1;
  proto$2.subtract = subtract$1;
  proto$2.as = as;
  proto$2.asMilliseconds = asMilliseconds;
  proto$2.asSeconds = asSeconds;
  proto$2.asMinutes = asMinutes;
  proto$2.asHours = asHours;
  proto$2.asDays = asDays;
  proto$2.asWeeks = asWeeks;
  proto$2.asMonths = asMonths;
  proto$2.asQuarters = asQuarters;
  proto$2.asYears = asYears;
  proto$2.valueOf = valueOf$1;
  proto$2._bubble = bubble;
  proto$2.clone = clone$1;
  proto$2.get = get$2;
  proto$2.milliseconds = milliseconds;
  proto$2.seconds = seconds;
  proto$2.minutes = minutes;
  proto$2.hours = hours;
  proto$2.days = days;
  proto$2.weeks = weeks;
  proto$2.months = months;
  proto$2.years = years;
  proto$2.humanize = humanize;
  proto$2.toISOString = toISOString$1;
  proto$2.toString = toISOString$1;
  proto$2.toJSON = toISOString$1;
  proto$2.locale = locale;
  proto$2.localeData = localeData;
  proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
  proto$2.lang = lang; // FORMATTING

  addFormatToken('X', 0, 0, 'unix');
  addFormatToken('x', 0, 0, 'valueOf'); // PARSING

  addRegexToken('x', matchSigned);
  addRegexToken('X', matchTimestamp);
  addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input) * 1000);
  });
  addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
  }); //! moment.js

  hooks.version = '2.29.1';
  setHookCallback(createLocal);
  hooks.fn = proto;
  hooks.min = min;
  hooks.max = max;
  hooks.now = now;
  hooks.utc = createUTC;
  hooks.unix = createUnix;
  hooks.months = listMonths;
  hooks.isDate = isDate;
  hooks.locale = getSetGlobalLocale;
  hooks.invalid = createInvalid;
  hooks.duration = createDuration;
  hooks.isMoment = isMoment;
  hooks.weekdays = listWeekdays;
  hooks.parseZone = createInZone;
  hooks.localeData = getLocale;
  hooks.isDuration = isDuration;
  hooks.monthsShort = listMonthsShort;
  hooks.weekdaysMin = listWeekdaysMin;
  hooks.defineLocale = defineLocale;
  hooks.updateLocale = updateLocale;
  hooks.locales = listLocales;
  hooks.weekdaysShort = listWeekdaysShort;
  hooks.normalizeUnits = normalizeUnits;
  hooks.relativeTimeRounding = getSetRelativeTimeRounding;
  hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
  hooks.calendarFormat = getCalendarFormat;
  hooks.prototype = proto; // currently HTML5 input type only supports 24-hour formats

  hooks.HTML5_FMT = {
    DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',
    // <input type="datetime-local" />
    DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',
    // <input type="datetime-local" step="1" />
    DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',
    // <input type="datetime-local" step="0.001" />
    DATE: 'YYYY-MM-DD',
    // <input type="date" />
    TIME: 'HH:mm',
    // <input type="time" />
    TIME_SECONDS: 'HH:mm:ss',
    // <input type="time" step="1" />
    TIME_MS: 'HH:mm:ss.SSS',
    // <input type="time" step="0.001" />
    WEEK: 'GGGG-[W]WW',
    // <input type="week" />
    MONTH: 'YYYY-MM' // <input type="month" />

  };
  return hooks;
});
},{}],"ca901d8a619e1b7a2fdcf6085009960a":[function(require,module,exports) {
module.exports = JSON.parse("{\"version\":\"2021a\",\"zones\":[\"Africa/Abidjan|LMT GMT|g.8 0|01|-2ldXH.Q|48e5\",\"Africa/Accra|LMT GMT +0020 +0030|.Q 0 -k -u|01212121212121212121212121212121212121212121212131313131313131|-2bRzX.8 9RbX.8 fdE 1BAk MLE 1Bck MLE 1Bck MLE 1Bck MLE 1BAk MLE 1Bck MLE 1Bck MLE 1Bck MLE 1BAk MLE 1Bck MLE 1Bck MLE 1Bck MLE 1BAk MLE 1Bck MLE 1Bck MLE 1Bck MLE 1BAk MLE 1Bck MLE 1Bck MLE 1Bck MLE Mok 1BXE M0k 1BXE fak 9vbu bjCu MLu 1Bcu MLu 1BAu MLu 1Bcu MLu 1Bcu MLu 1Bcu MLu|41e5\",\"Africa/Nairobi|LMT +0230 EAT +0245|-2r.g -2u -30 -2J|012132|-2ua2r.g N6nV.g 3Fbu h1cu dzbJ|47e5\",\"Africa/Algiers|PMT WET WEST CET CEST|-9.l 0 -10 -10 -20|0121212121212121343431312123431213|-2nco9.l cNb9.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 DA0 Imo0 rd0 De0 9Xz0 1fb0 1ap0 16K0 2yo0 mEp0 hwL0 jxA0 11A0 dDd0 17b0 11B0 1cN0 2Dy0 1cN0 1fB0 1cL0|26e5\",\"Africa/Lagos|LMT GMT +0030 WAT|-d.z 0 -u -10|01023|-2B40d.z 7iod.z dnXK.p dLzH.z|17e6\",\"Africa/Bissau|LMT -01 GMT|12.k 10 0|012|-2ldX0 2xoo0|39e4\",\"Africa/Maputo|LMT CAT|-2a.k -20|01|-2GJea.k|26e5\",\"Africa/Cairo|EET EEST|-20 -30|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-1bIO0 vb0 1ip0 11z0 1iN0 1nz0 12p0 1pz0 10N0 1pz0 16p0 1jz0 s3d0 Vz0 1oN0 11b0 1oO0 10N0 1pz0 10N0 1pb0 10N0 1pb0 10N0 1pb0 10N0 1pz0 10N0 1pb0 10N0 1pb0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1WL0 rd0 1Rz0 wp0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1qL0 Xd0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1ny0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 WL0 1qN0 Rb0 1wp0 On0 1zd0 Lz0 1EN0 Fb0 c10 8n0 8Nd0 gL0 e10 mn0|15e6\",\"Africa/Casablanca|LMT +00 +01|u.k 0 -10|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-2gMnt.E 130Lt.E rb0 Dd0 dVb0 b6p0 TX0 EoB0 LL0 gnd0 rz0 43d0 AL0 1Nd0 XX0 1Cp0 pz0 dEp0 4mn0 SyN0 AL0 1Nd0 wn0 1FB0 Db0 1zd0 Lz0 1Nf0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uM0 e00 Dc0 11A0 s00 e00 IM0 WM0 mo0 gM0 LA0 WM0 jA0 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 gM0 2600 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 gM0 2600 e00 2600 gM0 2600 e00 2600 gM0 2600 gM0 2600 e00 2600 gM0|32e5\",\"Africa/Ceuta|WET WEST CET CEST|0 -10 -10 -20|010101010101010101010232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-25KN0 11z0 drd0 18p0 3HX0 17d0 1fz0 1a10 1io0 1a00 1y7o0 LL0 gnd0 rz0 43d0 AL0 1Nd0 XX0 1Cp0 pz0 dEp0 4VB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|85e3\",\"Africa/El_Aaiun|LMT -01 +00 +01|Q.M 10 0 -10|012323232323232323232323232323232323232323232323232323232323232323232323232323232323|-1rDz7.c 1GVA7.c 6L0 AL0 1Nd0 XX0 1Cp0 pz0 1cBB0 AL0 1Nd0 wn0 1FB0 Db0 1zd0 Lz0 1Nf0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uM0 e00 Dc0 11A0 s00 e00 IM0 WM0 mo0 gM0 LA0 WM0 jA0 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 gM0 2600 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 gM0 2600 e00 2600 gM0 2600 e00 2600 gM0 2600 gM0 2600 e00 2600 gM0|20e4\",\"Africa/Johannesburg|SAST SAST SAST|-1u -20 -30|012121|-2GJdu 1Ajdu 1cL0 1cN0 1cL0|84e5\",\"Africa/Juba|LMT CAT CAST EAT|-26.s -20 -30 -30|012121212121212121212121212121212131|-1yW26.s 1zK06.s 16L0 1iN0 17b0 1jd0 17b0 1ip0 17z0 1i10 17X0 1hB0 18n0 1hd0 19b0 1gp0 19z0 1iN0 17b0 1ip0 17z0 1i10 18n0 1hd0 18L0 1gN0 19b0 1gp0 19z0 1iN0 17z0 1i10 17X0 yGd0 PeX0|\",\"Africa/Khartoum|LMT CAT CAST EAT|-2a.8 -20 -30 -30|012121212121212121212121212121212131|-1yW2a.8 1zK0a.8 16L0 1iN0 17b0 1jd0 17b0 1ip0 17z0 1i10 17X0 1hB0 18n0 1hd0 19b0 1gp0 19z0 1iN0 17b0 1ip0 17z0 1i10 18n0 1hd0 18L0 1gN0 19b0 1gp0 19z0 1iN0 17z0 1i10 17X0 yGd0 HjL0|51e5\",\"Africa/Monrovia|MMT MMT GMT|H.8 I.u 0|012|-23Lzg.Q 28G01.m|11e5\",\"Africa/Ndjamena|LMT WAT WAST|-10.c -10 -20|0121|-2le10.c 2J3c0.c Wn0|13e5\",\"Africa/Sao_Tome|LMT GMT WAT|A.J 0 -10|0121|-2le00 4i6N0 2q00|\",\"Africa/Tripoli|LMT CET CEST EET|-Q.I -10 -20 -20|012121213121212121212121213123123|-21JcQ.I 1hnBQ.I vx0 4iP0 xx0 4eN0 Bb0 7ip0 U0n0 A10 1db0 1cN0 1db0 1dd0 1db0 1eN0 1bb0 1e10 1cL0 1c10 1db0 1dd0 1db0 1cN0 1db0 1q10 fAn0 1ep0 1db0 AKq0 TA0 1o00|11e5\",\"Africa/Tunis|PMT CET CEST|-9.l -10 -20|0121212121212121212121212121212121|-2nco9.l 18pa9.l 1qM0 DA0 3Tc0 11B0 1ze0 WM0 7z0 3d0 14L0 1cN0 1f90 1ar0 16J0 1gXB0 WM0 1rA0 11c0 nwo0 Ko0 1cM0 1cM0 1rA0 10M0 zuM0 10N0 1aN0 1qM0 WM0 1qM0 11A0 1o00|20e5\",\"Africa/Windhoek|+0130 SAST SAST CAT WAT|-1u -20 -30 -20 -10|01213434343434343434343434343434343434343434343434343|-2GJdu 1Ajdu 1cL0 1SqL0 9Io0 16P0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0|32e4\",\"America/Adak|NST NWT NPT BST BDT AHST HST HDT|b0 a0 a0 b0 a0 a0 a0 90|012034343434343434343434343434343456767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17SX0 8wW0 iB0 Qlb0 52O0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cm0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|326\",\"America/Anchorage|AST AWT APT AHST AHDT YST AKST AKDT|a0 90 90 a0 90 90 90 80|012034343434343434343434343434343456767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17T00 8wX0 iA0 Qlb0 52O0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cm0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|30e4\",\"America/Port_of_Spain|LMT AST|46.4 40|01|-2kNvR.U|43e3\",\"America/Araguaina|LMT -03 -02|3c.M 30 20|0121212121212121212121212121212121212121212121212121|-2glwL.c HdKL.c 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 dMN0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 ny10 Lz0|14e4\",\"America/Argentina/Buenos_Aires|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323232323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 A4p0 uL0 1qN0 WL0|\",\"America/Argentina/Catamarca|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323132321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 rlB0 7B0 8zb0 uL0|\",\"America/Argentina/Cordoba|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323132323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 A4p0 uL0 1qN0 WL0|\",\"America/Argentina/Jujuy|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323121323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1ze0 TX0 1ld0 WK0 1wp0 TX0 A4p0 uL0|\",\"America/Argentina/La_Rioja|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323231232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Qn0 qO0 16n0 Rb0 1wp0 TX0 rlB0 7B0 8zb0 uL0|\",\"America/Argentina/Mendoza|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232312121321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1u20 SL0 1vd0 Tb0 1wp0 TW0 ri10 Op0 7TX0 uL0|\",\"America/Argentina/Rio_Gallegos|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 rlB0 7B0 8zb0 uL0|\",\"America/Argentina/Salta|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323231323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 A4p0 uL0|\",\"America/Argentina/San_Juan|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323231232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Qn0 qO0 16n0 Rb0 1wp0 TX0 rld0 m10 8lb0 uL0|\",\"America/Argentina/San_Luis|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323121212321212|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 XX0 1q20 SL0 AN0 vDb0 m10 8lb0 8L0 jd0 1qN0 WL0 1qN0|\",\"America/Argentina/Tucuman|CMT -04 -03 -02|4g.M 40 30 20|0121212121212121212121212121212121212121212323232313232123232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 rlB0 4N0 8BX0 uL0 1qN0 WL0|\",\"America/Argentina/Ushuaia|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 rkN0 8p0 8zb0 uL0|\",\"America/Curacao|LMT -0430 AST|4z.L 4u 40|012|-2kV7o.d 28KLS.d|15e4\",\"America/Asuncion|AMT -04 -03|3O.E 40 30|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-1x589.k 1DKM9.k 3CL0 3Dd0 10L0 1pB0 10n0 1pB0 10n0 1pB0 1cL0 1dd0 1db0 1dd0 1cL0 1dd0 1cL0 1dd0 1cL0 1dd0 1db0 1dd0 1cL0 1dd0 1cL0 1dd0 1cL0 1dd0 1db0 1dd0 1cL0 1lB0 14n0 1dd0 1cL0 1fd0 WL0 1rd0 1aL0 1dB0 Xz0 1qp0 Xb0 1qN0 10L0 1rB0 TX0 1tB0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 WN0 1qL0 11B0 1nX0 1ip0 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 TX0 1tB0 19X0 1a10 1fz0 1a10 1fz0 1cN0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0|28e5\",\"America/Atikokan|CST CDT CWT CPT EST|60 50 50 50 50|0101234|-25TQ0 1in0 Rnb0 3je0 8x30 iw0|28e2\",\"America/Bahia_Banderas|LMT MST CST PST MDT CDT|71 70 60 80 60 50|0121212131414141414141414141414141414152525252525252525252525252525252525252525252525252525252|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 otX0 gmN0 P2N0 13Vd0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nW0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|84e3\",\"America/Bahia|LMT -03 -02|2y.4 30 20|01212121212121212121212121212121212121212121212121212121212121|-2glxp.U HdLp.U 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 l5B0 Rb0|27e5\",\"America/Barbados|LMT BMT AST ADT|3W.t 3W.t 40 30|01232323232|-1Q0I1.v jsM0 1ODC1.v IL0 1ip0 17b0 1ip0 17b0 1ld0 13b0|28e4\",\"America/Belem|LMT -03 -02|3d.U 30 20|012121212121212121212121212121|-2glwK.4 HdKK.4 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0|20e5\",\"America/Belize|LMT CST -0530 CWT CPT CDT|5Q.M 60 5u 50 50 50|012121212121212121212121212121212121212121212121213412121212121212121212121212121212121212121215151|-2kBu7.c fPA7.c Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu Rcu 7Bt0 Ni0 4nd0 Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu e9Au qn0 lxB0 mn0|57e3\",\"America/Blanc-Sablon|AST ADT AWT APT|40 30 30 30|010230|-25TS0 1in0 UGp0 8x50 iu0|11e2\",\"America/Boa_Vista|LMT -04 -03|42.E 40 30|0121212121212121212121212121212121|-2glvV.k HdKV.k 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 smp0 WL0 1tB0 2L0|62e2\",\"America/Bogota|BMT -05 -04|4U.g 50 40|0121|-2eb73.I 38yo3.I 2en0|90e5\",\"America/Boise|PST PDT MST MWT MPT MDT|80 70 70 60 60 60|0101023425252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252|-261q0 1nX0 11B0 1nX0 8C10 JCL0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 Dd0 1Kn0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e4\",\"America/Cambridge_Bay|-00 MST MWT MPT MDDT MDT CST CDT EST|0 70 60 60 50 60 60 50 50|0123141515151515151515151515151515151515151515678651515151515151515151515151515151515151515151515151515151515151515151515151|-21Jc0 RO90 8x20 ix0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11A0 1nX0 2K0 WQ0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e2\",\"America/Campo_Grande|LMT -04 -03|3C.s 40 30|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glwl.w HdLl.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 1C10 Lz0 1Ip0 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0|77e4\",\"America/Cancun|LMT CST EST EDT CDT|5L.4 60 50 40 50|0123232341414141414141414141414141414141412|-1UQG0 2q2o0 yLB0 1lb0 14p0 1lb0 14p0 Lz0 xB0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 Dd0|63e4\",\"America/Caracas|CMT -0430 -04|4r.E 4u 40|01212|-2kV7w.k 28KM2.k 1IwOu kqo0|29e5\",\"America/Cayenne|LMT -04 -03|3t.k 40 30|012|-2mrwu.E 2gWou.E|58e3\",\"America/Panama|CMT EST|5j.A 50|01|-2uduE.o|15e5\",\"America/Chicago|CST CDT EST CWT CPT|60 50 50 50 50|01010101010101010101010101010101010102010101010103401010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 1wp0 TX0 WN0 1qL0 1cN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 11B0 1Hz0 14p0 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 RB0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|92e5\",\"America/Chihuahua|LMT MST CST CDT MDT|74.k 70 60 50 60|0121212323241414141414141414141414141414141414141414141414141414141414141414141414141414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 2zQN0 1lb0 14p0 1lb0 14q0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|81e4\",\"America/Costa_Rica|SJMT CST CDT|5A.d 60 50|0121212121|-1Xd6n.L 2lu0n.L Db0 1Kp0 Db0 pRB0 15b0 1kp0 mL0|12e5\",\"America/Creston|MST PST|70 80|010|-29DR0 43B0|53e2\",\"America/Cuiaba|LMT -04 -03|3I.k 40 30|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glwf.E HdLf.E 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 4a10 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0|54e4\",\"America/Danmarkshavn|LMT -03 -02 GMT|1e.E 30 20 0|01212121212121212121212121212121213|-2a5WJ.k 2z5fJ.k 19U0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 DC0|8\",\"America/Dawson_Creek|PST PDT PWT PPT MST|80 70 70 70 70|0102301010101010101010101010101010101010101010101010101014|-25TO0 1in0 UGp0 8x10 iy0 3NB0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 ML0|12e3\",\"America/Dawson|YST YDT YWT YPT YDDT PST PDT MST|90 80 80 80 70 80 70 70|010102304056565656565656565656565656565656565656565656565656565656565656565656565656565656567|-25TN0 1in0 1o10 13V0 Ser0 8x00 iz0 LCL0 1fA0 jrA0 fNd0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1z90|13e2\",\"America/Denver|MST MDT MWT MPT|70 60 60 60|01010101023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261r0 1nX0 11B0 1nX0 11B0 1qL0 WN0 mn0 Ord0 8x20 ix0 LCN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e5\",\"America/Detroit|LMT CST EST EWT EPT EDT|5w.b 60 50 40 40 40|0123425252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252|-2Cgir.N peqr.N 156L0 8x40 iv0 6fd0 11z0 JxX1 SMX 1cN0 1cL0 aW10 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|37e5\",\"America/Edmonton|LMT MST MDT MWT MPT|7x.Q 70 60 60 60|0121212121212134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2yd4q.8 shdq.8 1in0 17d0 hz0 2dB0 1fz0 1a10 11z0 1qN0 WL0 1qN0 11z0 IGN0 8x20 ix0 3NB0 11z0 XQp0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|10e5\",\"America/Eirunepe|LMT -05 -04|4D.s 50 40|0121212121212121212121212121212121|-2glvk.w HdLk.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 dPB0 On0 yTd0 d5X0|31e3\",\"America/El_Salvador|LMT CST CDT|5U.M 60 50|012121|-1XiG3.c 2Fvc3.c WL0 1qN0 WL0|11e5\",\"America/Tijuana|LMT MST PST PDT PWT PPT|7M.4 70 80 70 70 70|012123245232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UQE0 4PX0 8mM0 8lc0 SN0 1cL0 pHB0 83r0 zI0 5O10 1Rz0 cOO0 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 BUp0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|20e5\",\"America/Fort_Nelson|PST PDT PWT PPT MST|80 70 70 70 70|01023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010104|-25TO0 1in0 UGp0 8x10 iy0 3NB0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0|39e2\",\"America/Fort_Wayne|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|010101023010101010101010101040454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 QI10 Db0 RB0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 5Tz0 1o10 qLb0 1cL0 1cN0 1cL0 1qhd0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|\",\"America/Fortaleza|LMT -03 -02|2y 30 20|0121212121212121212121212121212121212121|-2glxq HdLq 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 5z0 2mN0 On0|34e5\",\"America/Glace_Bay|LMT AST ADT AWT APT|3X.M 40 30 30 30|012134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2IsI0.c CwO0.c 1in0 UGp0 8x50 iu0 iq10 11z0 Jg10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|19e3\",\"America/Godthab|LMT -03 -02|3q.U 30 20|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2a5Ux.4 2z5dx.4 19U0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e3\",\"America/Goose_Bay|NST NDT NST NDT NWT NPT AST ADT ADDT|3u.Q 2u.Q 3u 2u 2u 2u 40 30 20|010232323232323245232323232323232323232323232323232323232326767676767676767676767676767676767676767676768676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-25TSt.8 1in0 DXb0 2HbX.8 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 WL0 1qN0 WL0 1qN0 7UHu itu 1tB0 WL0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1tB0 WL0 1ld0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 S10 g0u 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14n1 1lb0 14p0 1nW0 11C0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|76e2\",\"America/Grand_Turk|KMT EST EDT AST|57.a 50 40 40|0121212121212121212121212121212121212121212121212121212121212121212121212132121212121212121212121212121212121212121|-2l1uQ.O 2HHBQ.O 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 7jA0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|37e2\",\"America/Guatemala|LMT CST CDT|62.4 60 50|0121212121|-24KhV.U 2efXV.U An0 mtd0 Nz0 ifB0 17b0 zDB0 11z0|13e5\",\"America/Guayaquil|QMT -05 -04|5e 50 40|0121|-1yVSK 2uILK rz0|27e5\",\"America/Guyana|LMT -0345 -03 -04|3Q.E 3J 30 40|0123|-2dvU7.k 2r6LQ.k Bxbf|80e4\",\"America/Halifax|LMT AST ADT AWT APT|4e.o 40 30 30 30|0121212121212121212121212121212121212121212121212134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2IsHJ.A xzzJ.A 1db0 3I30 1in0 3HX0 IL0 1E10 ML0 1yN0 Pb0 1Bd0 Mn0 1Bd0 Rz0 1w10 Xb0 1w10 LX0 1w10 Xb0 1w10 Lz0 1C10 Jz0 1E10 OL0 1yN0 Un0 1qp0 Xb0 1qp0 11X0 1w10 Lz0 1HB0 LX0 1C10 FX0 1w10 Xb0 1qp0 Xb0 1BB0 LX0 1td0 Xb0 1qp0 Xb0 Rf0 8x50 iu0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 3Qp0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 3Qp0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 6i10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|39e4\",\"America/Havana|HMT CST CDT|5t.A 50 40|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1Meuu.o 72zu.o ML0 sld0 An0 1Nd0 Db0 1Nd0 An0 6Ep0 An0 1Nd0 An0 JDd0 Mn0 1Ap0 On0 1fd0 11X0 1qN0 WL0 1wp0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 14n0 1ld0 14L0 1kN0 15b0 1kp0 1cL0 1cN0 1fz0 1a10 1fz0 1fB0 11z0 14p0 1nX0 11B0 1nX0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 14n0 1ld0 14n0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 1a10 1in0 1a10 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 17c0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 11A0 6i00 Rc0 1wo0 U00 1tA0 Rc0 1wo0 U00 1wo0 U00 1zc0 U00 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0|21e5\",\"America/Hermosillo|LMT MST CST PST MDT|7n.Q 70 60 80 60|0121212131414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 otX0 gmN0 P2N0 13Vd0 1lb0 14p0 1lb0 14p0 1lb0|64e4\",\"America/Indiana/Knox|CST CDT CWT CPT EST|60 50 50 50 50|0101023010101010101010101010101010101040101010101010101010101010101010101010101010101010141010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 3NB0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 11z0 1o10 11z0 1o10 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 3Cn0 8wp0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 z8o0 1o00 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|\",\"America/Indiana/Marengo|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101023010101010101010104545454545414545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 dyN0 11z0 6fd0 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 jrz0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1VA0 LA0 1BX0 1e6p0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|\",\"America/Indiana/Petersburg|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010104010101010101010101010141014545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 njX0 WN0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 3Fb0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 19co0 1o00 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|\",\"America/Indiana/Tell_City|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010401054541010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 njX0 WN0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 8wn0 1cN0 1cL0 1cN0 1cK0 1cN0 1cL0 1qhd0 1o00 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|\",\"America/Indiana/Vevay|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|010102304545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 kPB0 Awn0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1lnd0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|\",\"America/Indiana/Vincennes|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010101010454541014545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 g0p0 11z0 1o10 11z0 1qL0 WN0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 caL0 1cL0 1cN0 1cL0 1qhd0 1o00 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|\",\"America/Indiana/Winamac|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010101010101010454541054545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 jrz0 1cL0 1cN0 1cL0 1qhd0 1o00 Rd0 1za0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|\",\"America/Inuvik|-00 PST PDDT MST MDT|0 80 60 70 60|0121343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|-FnA0 tWU0 1fA0 wPe0 2pz0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|35e2\",\"America/Iqaluit|-00 EWT EPT EST EDDT EDT CST CDT|0 40 40 50 30 40 60 50|01234353535353535353535353535353535353535353567353535353535353535353535353535353535353535353535353535353535353535353535353|-16K00 7nX0 iv0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11C0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|67e2\",\"America/Jamaica|KMT EST EDT|57.a 50 40|0121212121212121212121|-2l1uQ.O 2uM1Q.O 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0|94e4\",\"America/Juneau|PST PWT PPT PDT YDT YST AKST AKDT|80 70 70 70 80 90 90 80|01203030303030303030303030403030356767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17T20 8x10 iy0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cM0 1cM0 1cL0 1cN0 1fz0 1a10 1fz0 co0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|33e3\",\"America/Kentucky/Louisville|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101010102301010101010101010101010101454545454545414545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 3Fd0 Nb0 LPd0 11z0 RB0 8x30 iw0 1nX1 e0X 9vd0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 xz0 gso0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1VA0 LA0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|\",\"America/Kentucky/Monticello|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101023010101010101010101010101010101010101010101010101010101010101010101454545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 SWp0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|\",\"America/La_Paz|CMT BST -04|4w.A 3w.A 40|012|-1x37r.o 13b0|19e5\",\"America/Lima|LMT -05 -04|58.A 50 40|0121212121212121|-2tyGP.o 1bDzP.o zX0 1aN0 1cL0 1cN0 1cL0 1PrB0 zX0 1O10 zX0 6Gp0 zX0 98p0 zX0|11e6\",\"America/Los_Angeles|PST PDT PWT PPT|80 70 70 70|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261q0 1nX0 11B0 1nX0 SgN0 8x10 iy0 5Wp1 1VaX 3dA0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e6\",\"America/Maceio|LMT -03 -02|2m.Q 30 20|012121212121212121212121212121212121212121|-2glxB.8 HdLB.8 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 dMN0 Lz0 8Q10 WL0 1tB0 5z0 2mN0 On0|93e4\",\"America/Managua|MMT CST EST CDT|5J.c 60 50 50|0121313121213131|-1quie.M 1yAMe.M 4mn0 9Up0 Dz0 1K10 Dz0 s3F0 1KH0 DB0 9In0 k8p0 19X0 1o30 11y0|22e5\",\"America/Manaus|LMT -04 -03|40.4 40 30|01212121212121212121212121212121|-2glvX.U HdKX.U 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 dPB0 On0|19e5\",\"America/Martinique|FFMT AST ADT|44.k 40 30|0121|-2mPTT.E 2LPbT.E 19X0|39e4\",\"America/Matamoros|LMT CST CDT|6E 60 50|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1UQG0 2FjC0 1nX0 i6p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|45e4\",\"America/Mazatlan|LMT MST CST PST MDT|75.E 70 60 80 60|0121212131414141414141414141414141414141414141414141414141414141414141414141414141414141414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 otX0 gmN0 P2N0 13Vd0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|44e4\",\"America/Menominee|CST CDT CWT CPT EST|60 50 50 50 50|01010230101041010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 LCN0 1fz0 6410 9Jb0 1cM0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|85e2\",\"America/Merida|LMT CST EST CDT|5W.s 60 50 50|0121313131313131313131313131313131313131313131313131313131313131313131313131313131313131|-1UQG0 2q2o0 2hz0 wu30 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|11e5\",\"America/Metlakatla|PST PWT PPT PDT AKST AKDT|80 70 70 70 90 80|01203030303030303030303030303030304545450454545454545454545454545454545454545454|-17T20 8x10 iy0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1hU10 Rd0 1zb0 Op0 1zb0 Op0 1zb0 uM0 jB0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|14e2\",\"America/Mexico_City|LMT MST CST CDT CWT|6A.A 70 60 50 50|012121232324232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 gEn0 TX0 3xd0 Jb0 6zB0 SL0 e5d0 17b0 1Pff0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|20e6\",\"America/Miquelon|LMT AST -03 -02|3I.E 40 30 20|012323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-2mKkf.k 2LTAf.k gQ10 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|61e2\",\"America/Moncton|EST AST ADT AWT APT|50 40 30 30 30|012121212121212121212134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2IsH0 CwN0 1in0 zAo0 An0 1Nd0 An0 1Nd0 An0 1Nd0 An0 1Nd0 An0 1Nd0 An0 1K10 Lz0 1zB0 NX0 1u10 Wn0 S20 8x50 iu0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 3Cp0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14n1 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 ReX 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|64e3\",\"America/Monterrey|LMT CST CDT|6F.g 60 50|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1UQG0 2FjC0 1nX0 i6p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|41e5\",\"America/Montevideo|LMT MMT -04 -03 -0330 -0230 -02 -0130|3I.P 3I.P 40 30 3u 2u 20 1u|012343434343434343434343435353636353636375363636363636363636363636363636363636363636363|-2tRUf.9 sVc0 8jcf.9 1db0 1dcu 1cLu 1dcu 1cLu ircu 11zu 1o0u 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 1qMu WLu 1fAu 1cLu 1o0u 11zu NAu 3jXu zXu Dq0u 19Xu pcu jz0 cm10 19X0 6tB0 1fbu 3o0u jX0 4vB0 xz0 3Cp0 mmu 1a10 IMu Db0 4c10 uL0 1Nd0 An0 1SN0 uL0 mp0 28L0 iPB0 un0 1SN0 xz0 1zd0 Lz0 1zd0 Rb0 1zd0 On0 1wp0 Rb0 s8p0 1fB0 1ip0 11z0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10 14n0 1ld0 14n0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10 11z0|17e5\",\"America/Toronto|EST EDT EWT EPT|50 40 40 40|01010101010101010101010101010101010101010101012301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TR0 1in0 11Wu 1nzu 1fD0 WJ0 1wr0 Nb0 1Ap0 On0 1zd0 On0 1wp0 TX0 1tB0 TX0 1tB0 TX0 1tB0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 4kM0 8x40 iv0 1o10 11z0 1nX0 11z0 1o10 11z0 1o10 1qL0 11D0 1nX0 11B0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|65e5\",\"America/Nassau|LMT EST EWT EPT EDT|59.u 50 40 40 40|01212314141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141|-2kNuO.u 1drbO.u 6tX0 cp0 1hS0 pF0 J630 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|24e4\",\"America/New_York|EST EDT EWT EPT|50 40 40 40|01010101010101010101010101010101010101010101010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261t0 1nX0 11B0 1nX0 11B0 1qL0 1a10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 RB0 8x40 iv0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e6\",\"America/Nipigon|EST EDT EWT EPT|50 40 40 40|010123010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TR0 1in0 Rnb0 3je0 8x40 iv0 19yN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|16e2\",\"America/Nome|NST NWT NPT BST BDT YST AKST AKDT|b0 a0 a0 b0 a0 90 90 80|012034343434343434343434343434343456767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17SX0 8wW0 iB0 Qlb0 52O0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cl0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|38e2\",\"America/Noronha|LMT -02 -01|29.E 20 10|0121212121212121212121212121212121212121|-2glxO.k HdKO.k 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 2L0 2pB0 On0|30e2\",\"America/North_Dakota/Beulah|MST MDT MWT MPT CST CDT|70 60 60 60 60 50|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101014545454545454545454545454545454545454545454545454545454|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|\",\"America/North_Dakota/Center|MST MDT MWT MPT CST CDT|70 60 60 60 60 50|010102301010101010101010101010101010101010101010101010101014545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14o0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|\",\"America/North_Dakota/New_Salem|MST MDT MWT MPT CST CDT|70 60 60 60 60 50|010102301010101010101010101010101010101010101010101010101010101010101010101010101454545454545454545454545454545454545454545454545454545454545454545454|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14o0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|\",\"America/Ojinaga|LMT MST CST CDT MDT|6V.E 70 60 50 60|0121212323241414141414141414141414141414141414141414141414141414141414141414141414141414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 2zQN0 1lb0 14p0 1lb0 14q0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e3\",\"America/Pangnirtung|-00 AST AWT APT ADDT ADT EDT EST CST CDT|0 40 30 30 20 30 40 50 60 50|012314151515151515151515151515151515167676767689767676767676767676767676767676767676767676767676767676767676767676767676767|-1XiM0 PnG0 8x50 iu0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1o00 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11C0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|14e2\",\"America/Paramaribo|LMT PMT PMT -0330 -03|3E.E 3E.Q 3E.A 3u 30|01234|-2nDUj.k Wqo0.c qanX.I 1yVXN.o|24e4\",\"America/Phoenix|MST MDT MWT|70 60 60|01010202010|-261r0 1nX0 11B0 1nX0 SgN0 4Al1 Ap0 1db0 SWqX 1cL0|42e5\",\"America/Port-au-Prince|PPMT EST EDT|4N 50 40|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-28RHb 2FnMb 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14q0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 i6n0 1nX0 11B0 1nX0 d430 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 3iN0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e5\",\"America/Rio_Branco|LMT -05 -04|4v.c 50 40|01212121212121212121212121212121|-2glvs.M HdLs.M 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 NBd0 d5X0|31e4\",\"America/Porto_Velho|LMT -04 -03|4f.A 40 30|012121212121212121212121212121|-2glvI.o HdKI.o 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0|37e4\",\"America/Puerto_Rico|AST AWT APT|40 30 30|0120|-17lU0 7XT0 iu0|24e5\",\"America/Punta_Arenas|SMT -05 -04 -03|4G.K 50 40 30|0102021212121212121232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-2q2jh.e fJAh.e 5knG.K 1Vzh.e jRAG.K 1pbh.e 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 nHX0 op0 blz0 ko0 Qeo0 WL0 1zd0 On0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0|\",\"America/Rainy_River|CST CDT CWT CPT|60 50 50 50|010123010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TQ0 1in0 Rnb0 3je0 8x30 iw0 19yN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|842\",\"America/Rankin_Inlet|-00 CST CDDT CDT EST|0 60 40 50 50|012131313131313131313131313131313131313131313431313131313131313131313131313131313131313131313131313131313131313131313131|-vDc0 keu0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e2\",\"America/Recife|LMT -03 -02|2j.A 30 20|0121212121212121212121212121212121212121|-2glxE.o HdLE.o 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 2L0 2pB0 On0|33e5\",\"America/Regina|LMT MST MDT MWT MPT CST|6W.A 70 60 60 60 60|012121212121212121212121341212121212121212121212121215|-2AD51.o uHe1.o 1in0 s2L0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 66N0 1cL0 1cN0 19X0 1fB0 1cL0 1fB0 1cL0 1cN0 1cL0 M30 8x20 ix0 1ip0 1cL0 1ip0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 3NB0 1cL0 1cN0|19e4\",\"America/Resolute|-00 CST CDDT CDT EST|0 60 40 50 50|012131313131313131313131313131313131313131313431313131313431313131313131313131313131313131313131313131313131313131313131|-SnA0 GWS0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|229\",\"America/Santarem|LMT -04 -03|3C.M 40 30|0121212121212121212121212121212|-2glwl.c HdLl.c 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 NBd0|21e4\",\"America/Santiago|SMT -05 -04 -03|4G.K 50 40 30|010202121212121212321232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-2q2jh.e fJAh.e 5knG.K 1Vzh.e jRAG.K 1pbh.e 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 nHX0 op0 9Bz0 jb0 1oN0 ko0 Qeo0 WL0 1zd0 On0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1zb0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0|62e5\",\"America/Santo_Domingo|SDMT EST EDT -0430 AST|4E 50 40 4u 40|01213131313131414|-1ttjk 1lJMk Mn0 6sp0 Lbu 1Cou yLu 1RAu wLu 1QMu xzu 1Q0u xXu 1PAu 13jB0 e00|29e5\",\"America/Sao_Paulo|LMT -03 -02|36.s 30 20|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glwR.w HdKR.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 pTd0 PX0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 1C10 Lz0 1Ip0 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0|20e6\",\"America/Scoresbysund|LMT -02 -01 +00|1r.Q 20 10 0|0121323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-2a5Ww.8 2z5ew.8 1a00 1cK0 1cL0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|452\",\"America/Sitka|PST PWT PPT PDT YST AKST AKDT|80 70 70 70 90 90 80|01203030303030303030303030303030345656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565|-17T20 8x10 iy0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 co0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|90e2\",\"America/St_Johns|NST NDT NST NDT NWT NPT NDDT|3u.Q 2u.Q 3u 2u 2u 2u 1u|01010101010101010101010101010101010102323232323232324523232323232323232323232323232323232323232323232323232323232323232323232323232323232326232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-28oit.8 14L0 1nB0 1in0 1gm0 Dz0 1JB0 1cL0 1cN0 1cL0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 1cL0 1cN0 1cL0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 1cL0 1fB0 19X0 1fB0 19X0 10O0 eKX.8 19X0 1iq0 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 WL0 1qN0 WL0 1qN0 7UHu itu 1tB0 WL0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1tB0 WL0 1ld0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14n1 1lb0 14p0 1nW0 11C0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|11e4\",\"America/Swift_Current|LMT MST MDT MWT MPT CST|7b.k 70 60 60 60 60|012134121212121212121215|-2AD4M.E uHdM.E 1in0 UGp0 8x20 ix0 1o10 17b0 1ip0 11z0 1o10 11z0 1o10 11z0 isN0 1cL0 3Cp0 1cL0 1cN0 11z0 1qN0 WL0 pMp0|16e3\",\"America/Tegucigalpa|LMT CST CDT|5M.Q 60 50|01212121|-1WGGb.8 2ETcb.8 WL0 1qN0 WL0 GRd0 AL0|11e5\",\"America/Thule|LMT AST ADT|4z.8 40 30|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2a5To.Q 31NBo.Q 1cL0 1cN0 1cL0 1fB0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|656\",\"America/Thunder_Bay|CST EST EWT EPT EDT|60 50 40 40 40|0123141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141|-2q5S0 1iaN0 8x40 iv0 XNB0 1cL0 1cN0 1fz0 1cN0 1cL0 3Cp0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|11e4\",\"America/Vancouver|PST PDT PWT PPT|80 70 70 70|0102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TO0 1in0 UGp0 8x10 iy0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e5\",\"America/Whitehorse|YST YDT YWT YPT YDDT PST PDT MST|90 80 80 80 70 80 70 70|010102304056565656565656565656565656565656565656565656565656565656565656565656565656565656567|-25TN0 1in0 1o10 13V0 Ser0 8x00 iz0 LCL0 1fA0 3NA0 vrd0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1z90|23e3\",\"America/Winnipeg|CST CDT CWT CPT|60 50 50 50|010101023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aIi0 WL0 3ND0 1in0 Jap0 Rb0 aCN0 8x30 iw0 1tB0 11z0 1ip0 11z0 1o10 11z0 1o10 11z0 1rd0 10L0 1op0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 1cL0 1cN0 11z0 6i10 WL0 6i10 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|66e4\",\"America/Yakutat|YST YWT YPT YDT AKST AKDT|90 80 80 80 90 80|01203030303030303030303030303030304545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-17T10 8x00 iz0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cn0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|642\",\"America/Yellowknife|-00 MST MWT MPT MDDT MDT|0 70 60 60 50 60|012314151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151|-1pdA0 hix0 8x20 ix0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|19e3\",\"Antarctica/Casey|-00 +08 +11|0 -80 -b0|0121212121212|-2q00 1DjS0 T90 40P0 KL0 blz0 3m10 1o30 14k0 1kr0 12l0 1o01|10\",\"Antarctica/Davis|-00 +07 +05|0 -70 -50|01012121|-vyo0 iXt0 alj0 1D7v0 VB0 3Wn0 KN0|70\",\"Antarctica/DumontDUrville|-00 +10|0 -a0|0101|-U0o0 cfq0 bFm0|80\",\"Antarctica/Macquarie|AEST AEDT -00|-a0 -b0 0|010201010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-29E80 1a00 4SK0 1ayy0 Lvs0 1cM0 1o00 Rc0 1wo0 Rc0 1wo0 U00 1wo0 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 3Co0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|1\",\"Antarctica/Mawson|-00 +06 +05|0 -60 -50|012|-CEo0 2fyk0|60\",\"Pacific/Auckland|NZMT NZST NZST NZDT|-bu -cu -c0 -d0|01020202020202020202020202023232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-1GCVu Lz0 1tB0 11zu 1o0u 11zu 1o0u 11zu 1o0u 14nu 1lcu 14nu 1lcu 1lbu 11Au 1nXu 11Au 1nXu 11Au 1nXu 11Au 1nXu 11Au 1qLu WMu 1qLu 11Au 1n1bu IM0 1C00 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1qM0 14o0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1io0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|14e5\",\"Antarctica/Palmer|-00 -03 -04 -02|0 30 40 20|0121212121213121212121212121212121212121212121212121212121212121212121212121212121|-cao0 nD0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 jsN0 14N0 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0|40\",\"Antarctica/Rothera|-00 -03|0 30|01|gOo0|130\",\"Antarctica/Syowa|-00 +03|0 -30|01|-vs00|20\",\"Antarctica/Troll|-00 +00 +02|0 0 -20|01212121212121212121212121212121212121212121212121212121212121212121|1puo0 hd0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|40\",\"Antarctica/Vostok|-00 +06|0 -60|01|-tjA0|25\",\"Europe/Oslo|CET CEST|-10 -20|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2awM0 Qm0 W6o0 5pf0 WM0 1fA0 1cM0 1cM0 1cM0 1cM0 wJc0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1qM0 WM0 zpc0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|62e4\",\"Asia/Riyadh|LMT +03|-36.Q -30|01|-TvD6.Q|57e5\",\"Asia/Almaty|LMT +05 +06 +07|-57.M -50 -60 -70|012323232323232323232321232323232323232323232323232|-1Pc57.M eUo7.M 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0|15e5\",\"Asia/Amman|LMT EET EEST|-2n.I -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1yW2n.I 1HiMn.I KL0 1oN0 11b0 1oN0 11b0 1pd0 1dz0 1cp0 11b0 1op0 11b0 fO10 1db0 1e10 1cL0 1cN0 1cL0 1cN0 1fz0 1pd0 10n0 1ld0 14n0 1hB0 15b0 1ip0 19X0 1cN0 1cL0 1cN0 17b0 1ld0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1So0 y00 1fc0 1dc0 1co0 1dc0 1cM0 1cM0 1cM0 1o00 11A0 1lc0 17c0 1cM0 1cM0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 4bX0 Dd0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|25e5\",\"Asia/Anadyr|LMT +12 +13 +14 +11|-bN.U -c0 -d0 -e0 -b0|01232121212121212121214121212121212121212121212121212121212141|-1PcbN.U eUnN.U 23CL0 1db0 2q10 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|13e3\",\"Asia/Aqtau|LMT +04 +05 +06|-3l.4 -40 -50 -60|012323232323232323232123232312121212121212121212|-1Pc3l.4 eUnl.4 24PX0 2pX0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|15e4\",\"Asia/Aqtobe|LMT +04 +05 +06|-3M.E -40 -50 -60|0123232323232323232321232323232323232323232323232|-1Pc3M.E eUnM.E 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0|27e4\",\"Asia/Ashgabat|LMT +04 +05 +06|-3R.w -40 -50 -60|0123232323232323232323212|-1Pc3R.w eUnR.w 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0|41e4\",\"Asia/Atyrau|LMT +03 +05 +06 +04|-3r.I -30 -50 -60 -40|01232323232323232323242323232323232324242424242|-1Pc3r.I eUor.I 24PW0 2pX0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 2sp0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|\",\"Asia/Baghdad|BMT +03 +04|-2V.A -30 -40|012121212121212121212121212121212121212121212121212121|-26BeV.A 2ACnV.A 11b0 1cp0 1dz0 1dd0 1db0 1cN0 1cp0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1de0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0|66e5\",\"Asia/Qatar|LMT +04 +03|-3q.8 -40 -30|012|-21Jfq.8 27BXq.8|96e4\",\"Asia/Baku|LMT +03 +04 +05|-3j.o -30 -40 -50|01232323232323232323232123232323232323232323232323232323232323232|-1Pc3j.o 1jUoj.o WCL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 1cM0 9Je0 1o00 11z0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00|27e5\",\"Asia/Bangkok|BMT +07|-6G.4 -70|01|-218SG.4|15e6\",\"Asia/Barnaul|LMT +06 +07 +08|-5z -60 -70 -80|0123232323232323232323212323232321212121212121212121212121212121212|-21S5z pCnz 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 p90 LE0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|\",\"Asia/Beirut|EET EEST|-20 -30|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-21aq0 1on0 1410 1db0 19B0 1in0 1ip0 WL0 1lQp0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 q6N0 En0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1op0 11b0 dA10 17b0 1iN0 17b0 1iN0 17b0 1iN0 17b0 1vB0 SL0 1mp0 13z0 1iN0 17b0 1iN0 17b0 1jd0 12n0 1a10 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0|22e5\",\"Asia/Bishkek|LMT +05 +06 +07|-4W.o -50 -60 -70|012323232323232323232321212121212121212121212121212|-1Pc4W.o eUnW.o 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2e00 1tX0 17b0 1ip0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1cPu 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0|87e4\",\"Asia/Brunei|LMT +0730 +08|-7D.E -7u -80|012|-1KITD.E gDc9.E|42e4\",\"Asia/Kolkata|MMT IST +0630|-5l.a -5u -6u|012121|-2zOtl.a 1r2LP.a 1un0 HB0 7zX0|15e6\",\"Asia/Chita|LMT +08 +09 +10|-7x.Q -80 -90 -a0|012323232323232323232321232323232323232323232323232323232323232312|-21Q7x.Q pAnx.Q 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3re0|33e4\",\"Asia/Choibalsan|LMT +07 +08 +10 +09|-7C -70 -80 -a0 -90|0123434343434343434343434343434343434343434343424242|-2APHC 2UkoC cKn0 1da0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 3Db0 h1f0 1cJ0 1cP0 1cJ0|38e3\",\"Asia/Shanghai|CST CDT|-80 -90|01010101010101010101010101010|-23uw0 18n0 OjB0 Rz0 11d0 1wL0 A10 8HX0 1G10 Tz0 1ip0 1jX0 1cN0 11b0 1oN0 aL0 1tU30 Rb0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0|23e6\",\"Asia/Colombo|MMT +0530 +06 +0630|-5j.w -5u -60 -6u|01231321|-2zOtj.w 1rFbN.w 1zzu 7Apu 23dz0 11zu n3cu|22e5\",\"Asia/Dhaka|HMT +0630 +0530 +06 +07|-5R.k -6u -5u -60 -70|0121343|-18LFR.k 1unn.k HB0 m6n0 2kxbu 1i00|16e6\",\"Asia/Damascus|LMT EET EEST|-2p.c -20 -30|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-21Jep.c Hep.c 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1xRB0 11X0 1oN0 10L0 1pB0 11b0 1oN0 10L0 1mp0 13X0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 Nb0 1AN0 Nb0 bcp0 19X0 1gp0 19X0 3ld0 1xX0 Vd0 1Bz0 Sp0 1vX0 10p0 1dz0 1cN0 1cL0 1db0 1db0 1g10 1an0 1ap0 1db0 1fd0 1db0 1cN0 1db0 1dd0 1db0 1cp0 1dz0 1c10 1dX0 1cN0 1db0 1dd0 1db0 1cN0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1db0 1cN0 1db0 1cN0 19z0 1fB0 1qL0 11B0 1on0 Wp0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0|26e5\",\"Asia/Dili|LMT +08 +09|-8m.k -80 -90|01212|-2le8m.k 1dnXm.k 1nfA0 Xld0|19e4\",\"Asia/Dubai|LMT +04|-3F.c -40|01|-21JfF.c|39e5\",\"Asia/Dushanbe|LMT +05 +06 +07|-4z.c -50 -60 -70|012323232323232323232321|-1Pc4z.c eUnz.c 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2hB0|76e4\",\"Asia/Famagusta|LMT EET EEST +03|-2f.M -20 -30 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212312121212121212121212121212121212121212121|-1Vc2f.M 2a3cf.M 1cL0 1qp0 Xz0 19B0 19X0 1fB0 1db0 1cp0 1cL0 1fB0 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1o30 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 15U0 2Ks0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|\",\"Asia/Gaza|EET EEST IST IDT|-20 -30 -20 -30|010101010101010101010101010101010123232323232323232323232323232320101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-1c2o0 MM0 iM0 4JA0 10o0 1pA0 10M0 1pA0 16o0 1jA0 16o0 1jA0 pBa0 Vz0 1oN0 11b0 1oO0 10N0 1pz0 10N0 1pb0 10N0 1pb0 10N0 1pb0 10N0 1pz0 10N0 1pb0 10N0 1pb0 11d0 1oL0 dW0 hfB0 Db0 1fB0 Rb0 bXB0 gM0 8Q00 IM0 1wo0 TX0 1HB0 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 M10 C00 17c0 1io0 17c0 1io0 17c0 1o00 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 17c0 1io0 18N0 1bz0 19z0 1gp0 1610 1iL0 11z0 1o10 14o0 1lA1 SKX 1xd1 MKX 1AN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nA0 1210 1qL0 WN0 1qL0 WN0 1qL0 11c0 1on0 11B0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|18e5\",\"Asia/Hebron|EET EEST IST IDT|-20 -30 -20 -30|01010101010101010101010101010101012323232323232323232323232323232010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-1c2o0 MM0 iM0 4JA0 10o0 1pA0 10M0 1pA0 16o0 1jA0 16o0 1jA0 pBa0 Vz0 1oN0 11b0 1oO0 10N0 1pz0 10N0 1pb0 10N0 1pb0 10N0 1pb0 10N0 1pz0 10N0 1pb0 10N0 1pb0 11d0 1oL0 dW0 hfB0 Db0 1fB0 Rb0 bXB0 gM0 8Q00 IM0 1wo0 TX0 1HB0 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 M10 C00 17c0 1io0 17c0 1io0 17c0 1o00 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 17c0 1io0 18N0 1bz0 19z0 1gp0 1610 1iL0 12L0 1mN0 14o0 1lc0 Tb0 1xd1 MKX bB0 cn0 1cN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nA0 1210 1qL0 WN0 1qL0 WN0 1qL0 11c0 1on0 11B0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|25e4\",\"Asia/Ho_Chi_Minh|LMT PLMT +07 +08 +09|-76.E -76.u -70 -80 -90|0123423232|-2yC76.E bK00.a 1h7b6.u 5lz0 18o0 3Oq0 k5b0 aW00 BAM0|90e5\",\"Asia/Hong_Kong|LMT HKT HKST HKWT JST|-7A.G -80 -90 -8u -90|0123412121212121212121212121212121212121212121212121212121212121212121|-2CFH0 1taO0 Hc0 xUu 9tBu 11z0 1tDu Rc0 1wo0 11A0 1cM0 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1nX0 U10 1tz0 U10 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 Rd0 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 17d0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1cL0 6fd0 14n0|73e5\",\"Asia/Hovd|LMT +06 +07 +08|-66.A -60 -70 -80|012323232323232323232323232323232323232323232323232|-2APG6.A 2Uko6.A cKn0 1db0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 kEp0 1cJ0 1cP0 1cJ0|81e3\",\"Asia/Irkutsk|IMT +07 +08 +09|-6V.5 -70 -80 -90|01232323232323232323232123232323232323232323232323232323232323232|-21zGV.5 pjXV.5 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|60e4\",\"Europe/Istanbul|IMT EET EEST +03 +04|-1U.U -20 -30 -30 -40|0121212121212121212121212121212121212121212121234312121212121212121212121212121212121212121212121212121212121212123|-2ogNU.U dzzU.U 11b0 8tB0 1on0 1410 1db0 19B0 1in0 3Rd0 Un0 1oN0 11b0 zSN0 CL0 mp0 1Vz0 1gN0 8yn0 1yp0 ML0 1kp0 17b0 1ip0 17b0 1fB0 19X0 1ip0 19X0 1ip0 17b0 qdB0 38L0 1jd0 Tz0 l6O0 11A0 WN0 1qL0 TB0 1tX0 U10 1tz0 11B0 1in0 17d0 z90 cne0 pb0 2Cp0 1800 14o0 1dc0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1a00 1fA0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WO0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 Xc0 1qo0 WM0 1qM0 11A0 1o00 1200 1nA0 11A0 1tA0 U00 15w0|13e6\",\"Asia/Jakarta|BMT +0720 +0730 +09 +08 WIB|-77.c -7k -7u -90 -80 -70|01232425|-1Q0Tk luM0 mPzO 8vWu 6kpu 4PXu xhcu|31e6\",\"Asia/Jayapura|LMT +09 +0930 WIT|-9m.M -90 -9u -90|0123|-1uu9m.M sMMm.M L4nu|26e4\",\"Asia/Jerusalem|JMT IST IDT IDDT|-2k.E -20 -30 -40|01212121212121321212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-26Bek.E SyOk.E MM0 iM0 4JA0 10o0 1pA0 10M0 1pA0 16o0 1jA0 16o0 1jA0 3LA0 Eo0 oo0 1co0 1dA0 16o0 10M0 1jc0 1tA0 14o0 1cM0 1a00 11A0 1Nc0 Ao0 1Nc0 Ao0 1Ko0 LA0 1o00 WM0 EQK0 Db0 1fB0 Rb0 bXB0 gM0 8Q00 IM0 1wo0 TX0 1HB0 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 1hB0 1dX0 1ep0 1aL0 1eN0 17X0 1nf0 11z0 1tB0 19W0 1e10 17b0 1ep0 1gL0 18N0 1fz0 1eN0 17b0 1gq0 1gn0 19d0 1dz0 1c10 17X0 1hB0 1gn0 19d0 1dz0 1c10 17X0 1kp0 1dz0 1c10 1aL0 1eN0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0|81e4\",\"Asia/Kabul|+04 +0430|-40 -4u|01|-10Qs0|46e5\",\"Asia/Kamchatka|LMT +11 +12 +13|-ay.A -b0 -c0 -d0|012323232323232323232321232323232323232323232323232323232323212|-1SLKy.A ivXy.A 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|18e4\",\"Asia/Karachi|LMT +0530 +0630 +05 PKT PKST|-4s.c -5u -6u -50 -50 -60|012134545454|-2xoss.c 1qOKW.c 7zX0 eup0 LqMu 1fy00 1cL0 dK10 11b0 1610 1jX0|24e6\",\"Asia/Urumqi|LMT +06|-5O.k -60|01|-1GgtO.k|32e5\",\"Asia/Kathmandu|LMT +0530 +0545|-5F.g -5u -5J|012|-21JhF.g 2EGMb.g|12e5\",\"Asia/Khandyga|LMT +08 +09 +10 +11|-92.d -80 -90 -a0 -b0|0123232323232323232323212323232323232323232323232343434343434343432|-21Q92.d pAp2.d 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 qK0 yN0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 17V0 7zD0|66e2\",\"Asia/Krasnoyarsk|LMT +06 +07 +08|-6b.q -60 -70 -80|01232323232323232323232123232323232323232323232323232323232323232|-21Hib.q prAb.q 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|10e5\",\"Asia/Kuala_Lumpur|SMT +07 +0720 +0730 +09 +08|-6T.p -70 -7k -7u -90 -80|0123435|-2Bg6T.p 17anT.p l5XE 17bO 8Fyu 1so1u|71e5\",\"Asia/Kuching|LMT +0730 +08 +0820 +09|-7l.k -7u -80 -8k -90|0123232323232323242|-1KITl.k gDbP.k 6ynu AnE 1O0k AnE 1NAk AnE 1NAk AnE 1NAk AnE 1O0k AnE 1NAk AnE pAk 8Fz0|13e4\",\"Asia/Macau|LMT CST +09 +10 CDT|-7y.a -80 -90 -a0 -90|012323214141414141414141414141414141414141414141414141414141414141414141|-2CFHy.a 1uqKy.a PX0 1kn0 15B0 11b0 4Qq0 1oM0 11c0 1ko0 1u00 11A0 1cM0 11c0 1o00 11A0 1o00 11A0 1oo0 1400 1o00 11A0 1o00 U00 1tA0 U00 1wo0 Rc0 1wru U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 Rd0 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 17d0 1cK0 1cO0 1cK0 1cO0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1cL0 6fd0 14n0|57e4\",\"Asia/Magadan|LMT +10 +11 +12|-a3.c -a0 -b0 -c0|012323232323232323232321232323232323232323232323232323232323232312|-1Pca3.c eUo3.c 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3Cq0|95e3\",\"Asia/Makassar|LMT MMT +08 +09 WITA|-7V.A -7V.A -80 -90 -80|01234|-21JjV.A vfc0 myLV.A 8ML0|15e5\",\"Asia/Manila|PST PDT JST|-80 -90 -90|010201010|-1kJI0 AL0 cK10 65X0 mXB0 vX0 VK10 1db0|24e6\",\"Asia/Nicosia|LMT EET EEST|-2d.s -20 -30|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1Vc2d.s 2a3cd.s 1cL0 1qp0 Xz0 19B0 19X0 1fB0 1db0 1cp0 1cL0 1fB0 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1o30 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|32e4\",\"Asia/Novokuznetsk|LMT +06 +07 +08|-5M.M -60 -70 -80|012323232323232323232321232323232323232323232323232323232323212|-1PctM.M eULM.M 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|55e4\",\"Asia/Novosibirsk|LMT +06 +07 +08|-5v.E -60 -70 -80|0123232323232323232323212323212121212121212121212121212121212121212|-21Qnv.E pAFv.E 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 ml0 Os0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 4eN0|15e5\",\"Asia/Omsk|LMT +05 +06 +07|-4R.u -50 -60 -70|01232323232323232323232123232323232323232323232323232323232323232|-224sR.u pMLR.u 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|12e5\",\"Asia/Oral|LMT +03 +05 +06 +04|-3p.o -30 -50 -60 -40|01232323232323232424242424242424242424242424242|-1Pc3p.o eUop.o 23CK0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 1cM0 1cM0 IM0 1EM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|27e4\",\"Asia/Pontianak|LMT PMT +0730 +09 +08 WITA WIB|-7h.k -7h.k -7u -90 -80 -80 -70|012324256|-2ua7h.k XE00 munL.k 8Rau 6kpu 4PXu xhcu Wqnu|23e4\",\"Asia/Pyongyang|LMT KST JST KST|-8n -8u -90 -90|012313|-2um8n 97XR 1lTzu 2Onc0 6BA0|29e5\",\"Asia/Qostanay|LMT +04 +05 +06|-4e.s -40 -50 -60|012323232323232323232123232323232323232323232323|-1Pc4e.s eUoe.s 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|\",\"Asia/Qyzylorda|LMT +04 +05 +06|-4l.Q -40 -50 -60|01232323232323232323232323232323232323232323232|-1Pc4l.Q eUol.Q 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 3ao0 1EM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 zQl0|73e4\",\"Asia/Rangoon|RMT +0630 +09|-6o.L -6u -90|0121|-21Jio.L SmnS.L 7j9u|48e5\",\"Asia/Sakhalin|LMT +09 +11 +12 +10|-9u.M -90 -b0 -c0 -a0|01232323232323232323232423232323232424242424242424242424242424242|-2AGVu.M 1BoMu.M 1qFa0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 2pB0 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|58e4\",\"Asia/Samarkand|LMT +04 +05 +06|-4r.R -40 -50 -60|01232323232323232323232|-1Pc4r.R eUor.R 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0|36e4\",\"Asia/Seoul|LMT KST JST KST KDT KDT|-8r.Q -8u -90 -90 -a0 -9u|012343434343151515151515134343|-2um8r.Q 97XV.Q 1m1zu 6CM0 Fz0 1kN0 14n0 1kN0 14L0 1zd0 On0 69B0 2I0u OL0 1FB0 Rb0 1qN0 TX0 1tB0 TX0 1tB0 TX0 1tB0 TX0 2ap0 12FBu 11A0 1o00 11A0|23e6\",\"Asia/Srednekolymsk|LMT +10 +11 +12|-ae.Q -a0 -b0 -c0|01232323232323232323232123232323232323232323232323232323232323232|-1Pcae.Q eUoe.Q 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|35e2\",\"Asia/Taipei|CST JST CDT|-80 -90 -90|01020202020202020202020202020202020202020|-1iw80 joM0 1yo0 Tz0 1ip0 1jX0 1cN0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 10N0 1BX0 10p0 1pz0 10p0 1pz0 10p0 1db0 1dd0 1db0 1cN0 1db0 1cN0 1db0 1cN0 1db0 1BB0 ML0 1Bd0 ML0 uq10 1db0 1cN0 1db0 97B0 AL0|74e5\",\"Asia/Tashkent|LMT +05 +06 +07|-4B.b -50 -60 -70|012323232323232323232321|-1Pc4B.b eUnB.b 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0|23e5\",\"Asia/Tbilisi|TBMT +03 +04 +05|-2X.b -30 -40 -50|0123232323232323232323212121232323232323232323212|-1Pc2X.b 1jUnX.b WCL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 1cK0 1cL0 1cN0 1cL0 1cN0 2pz0 1cL0 1fB0 3Nz0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 An0 Os0 WM0|11e5\",\"Asia/Tehran|LMT TMT +0330 +04 +05 +0430|-3p.I -3p.I -3u -40 -50 -4u|01234325252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252|-2btDp.I 1d3c0 1huLT.I TXu 1pz0 sN0 vAu 1cL0 1dB0 1en0 pNB0 UL0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 64p0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0|14e6\",\"Asia/Thimphu|LMT +0530 +06|-5W.A -5u -60|012|-Su5W.A 1BGMs.A|79e3\",\"Asia/Tokyo|JST JDT|-90 -a0|010101010|-QJJ0 Rc0 1lc0 14o0 1zc0 Oo0 1zc0 Oo0|38e6\",\"Asia/Tomsk|LMT +06 +07 +08|-5D.P -60 -70 -80|0123232323232323232323212323232323232323232323212121212121212121212|-21NhD.P pxzD.P 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 co0 1bB0 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3Qp0|10e5\",\"Asia/Ulaanbaatar|LMT +07 +08 +09|-77.w -70 -80 -90|012323232323232323232323232323232323232323232323232|-2APH7.w 2Uko7.w cKn0 1db0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 kEp0 1cJ0 1cP0 1cJ0|12e5\",\"Asia/Ust-Nera|LMT +08 +09 +12 +11 +10|-9w.S -80 -90 -c0 -b0 -a0|012343434343434343434345434343434343434343434343434343434343434345|-21Q9w.S pApw.S 23CL0 1d90 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 17V0 7zD0|65e2\",\"Asia/Vladivostok|LMT +09 +10 +11|-8L.v -90 -a0 -b0|01232323232323232323232123232323232323232323232323232323232323232|-1SJIL.v itXL.v 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|60e4\",\"Asia/Yakutsk|LMT +08 +09 +10|-8C.W -80 -90 -a0|01232323232323232323232123232323232323232323232323232323232323232|-21Q8C.W pAoC.W 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|28e4\",\"Asia/Yekaterinburg|LMT PMT +04 +05 +06|-42.x -3J.5 -40 -50 -60|012343434343434343434343234343434343434343434343434343434343434343|-2ag42.x 7mQh.s qBvJ.5 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|14e5\",\"Asia/Yerevan|LMT +03 +04 +05|-2W -30 -40 -50|0123232323232323232323212121212323232323232323232323232323232|-1Pc2W 1jUnW WCL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 4RX0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|13e5\",\"Atlantic/Azores|HMT -02 -01 +00 WET|1S.w 20 10 0 0|01212121212121212121212121212121212121212121232123212321232121212121212121212121212121212121212121232323232323232323232323232323234323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-2ldW0 aPX0 Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 3Co0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 qIl0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cL0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|25e4\",\"Atlantic/Bermuda|BMT BST AST ADT|4j.i 3j.i 40 30|010102323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-28p7E.G 1bb0 1i10 11X0 ru30 thbE.G 1PX0 11B0 1tz0 Rd0 1zb0 Op0 1zb0 3I10 Lz0 1EN0 FX0 1HB0 FX0 1Kp0 Db0 1Kp0 Db0 1Kp0 FX0 93d0 11z0 GAp0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|65e3\",\"Atlantic/Canary|LMT -01 WET WEST|11.A 10 0 -10|01232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UtaW.o XPAW.o 1lAK0 1a10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|54e4\",\"Atlantic/Cape_Verde|LMT -02 -01|1y.4 20 10|01212|-2ldW0 1eEo0 7zX0 1djf0|50e4\",\"Atlantic/Faroe|LMT WET WEST|r.4 0 -10|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2uSnw.U 2Wgow.U 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|49e3\",\"Atlantic/Madeira|FMT -01 +00 +01 WET WEST|17.A 10 0 -10 0 -10|01212121212121212121212121212121212121212121232123212321232121212121212121212121212121212121212121454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-2ldX0 aPX0 Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 3Co0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 qIl0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|27e4\",\"Atlantic/Reykjavik|LMT -01 +00 GMT|1s 10 0 0|012121212121212121212121212121212121212121212121212121212121212121213|-2uWmw mfaw 1Bd0 ML0 1LB0 Cn0 1LB0 3fX0 C10 HrX0 1cO0 LB0 1EL0 LA0 1C00 Oo0 1wo0 Rc0 1wo0 Rc0 1wo0 Rc0 1zc0 Oo0 1zc0 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1lc0 14o0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 14o0|12e4\",\"Atlantic/South_Georgia|-02|20|0||30\",\"Atlantic/Stanley|SMT -04 -03 -02|3P.o 40 30 20|012121212121212323212121212121212121212121212121212121212121212121212|-2kJw8.A 12bA8.A 19X0 1fB0 19X0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 Cn0 1Cc10 WL0 1qL0 U10 1tz0 2mN0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1tz0 U10 1tz0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1tz0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qN0 U10 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 U10 1tz0 U10 1tz0 U10|21e2\",\"Australia/Sydney|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293k0 xc0 10jc0 yM0 1cM0 1cM0 1fA0 1a00 17c00 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 14o0 1o00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 11A0 1o00 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|40e5\",\"Australia/Adelaide|ACST ACDT|-9u -au|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293ju xc0 10jc0 yM0 1cM0 1cM0 1fA0 1a00 17c00 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 Oo0 1zc0 WM0 1qM0 Rc0 1zc0 U00 1tA0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|11e5\",\"Australia/Brisbane|AEST AEDT|-a0 -b0|01010101010101010|-293k0 xc0 10jc0 yM0 1cM0 1cM0 1fA0 1a00 17c00 LA0 H1A0 Oo0 1zc0 Oo0 1zc0 Oo0|20e5\",\"Australia/Broken_Hill|ACST ACDT|-9u -au|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293ju xc0 10jc0 yM0 1cM0 1cM0 1fA0 1a00 17c00 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 14o0 1o00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|18e3\",\"Australia/Hobart|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-29E80 1a00 1qM0 Oo0 1zc0 Oo0 TAo0 yM0 1cM0 1cM0 1fA0 1a00 VfA0 1cM0 1o00 Rc0 1wo0 Rc0 1wo0 U00 1wo0 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|21e4\",\"Australia/Darwin|ACST ACDT|-9u -au|010101010|-293ju xc0 10jc0 yM0 1cM0 1cM0 1fA0 1a00|12e4\",\"Australia/Eucla|+0845 +0945|-8J -9J|0101010101010101010|-293iJ xc0 10jc0 yM0 1cM0 1cM0 1gSo0 Oo0 l5A0 Oo0 iJA0 G00 zU00 IM0 1qM0 11A0 1o00 11A0|368\",\"Australia/Lord_Howe|AEST +1030 +1130 +11|-a0 -au -bu -b0|0121212121313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313|raC0 1zdu Rb0 1zd0 On0 1zd0 On0 1zd0 On0 1zd0 TXu 1qMu WLu 1tAu WLu 1tAu TXu 1tAu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu 11zu 1o0u 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 11Au 1nXu 1qMu 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 1qMu 11zu 1o0u WLu 1qMu 14nu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1fzu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu|347\",\"Australia/Lindeman|AEST AEDT|-a0 -b0|010101010101010101010|-293k0 xc0 10jc0 yM0 1cM0 1cM0 1fA0 1a00 17c00 LA0 H1A0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0|10\",\"Australia/Melbourne|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293k0 xc0 10jc0 yM0 1cM0 1cM0 1fA0 1a00 17c00 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1qM0 11A0 1tA0 U00 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 11A0 1o00 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|39e5\",\"Australia/Perth|AWST AWDT|-80 -90|0101010101010101010|-293i0 xc0 10jc0 yM0 1cM0 1cM0 1gSo0 Oo0 l5A0 Oo0 iJA0 G00 zU00 IM0 1qM0 11A0 1o00 11A0|18e5\",\"CET|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|\",\"Pacific/Easter|EMT -07 -06 -05|7h.s 70 60 50|012121212121212121212121212123232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-1uSgG.w 1s4IG.w WL0 1zd0 On0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 2pA0 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1zb0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0|30e2\",\"CST6CDT|CST CDT CWT CPT|60 50 50 50|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|\",\"EET|EET EEST|-20 -30|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|hDB0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|\",\"Europe/Dublin|DMT IST GMT BST IST|p.l -y.D 0 -10 -10|01232323232324242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242|-2ax9y.D Rc0 1fzy.D 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 g600 14o0 1wo0 17c0 1io0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1a00 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1tA0 IM0 90o0 U00 1tA0 U00 1tA0 U00 1tA0 U00 1tA0 WM0 1qM0 WM0 1qM0 WM0 1tA0 U00 1tA0 U00 1tA0 11z0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5\",\"EST|EST|50|0||\",\"EST5EDT|EST EDT EWT EPT|50 40 40 40|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261t0 1nX0 11B0 1nX0 SgN0 8x40 iv0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|\",\"Etc/GMT-0|GMT|0|0||\",\"Etc/GMT-1|+01|-10|0||\",\"Pacific/Port_Moresby|+10|-a0|0||25e4\",\"Etc/GMT-11|+11|-b0|0||\",\"Pacific/Tarawa|+12|-c0|0||29e3\",\"Etc/GMT-13|+13|-d0|0||\",\"Etc/GMT-14|+14|-e0|0||\",\"Etc/GMT-2|+02|-20|0||\",\"Etc/GMT-3|+03|-30|0||\",\"Etc/GMT-4|+04|-40|0||\",\"Etc/GMT-5|+05|-50|0||\",\"Etc/GMT-6|+06|-60|0||\",\"Indian/Christmas|+07|-70|0||21e2\",\"Etc/GMT-8|+08|-80|0||\",\"Pacific/Palau|+09|-90|0||21e3\",\"Etc/GMT+1|-01|10|0||\",\"Etc/GMT+10|-10|a0|0||\",\"Etc/GMT+11|-11|b0|0||\",\"Etc/GMT+12|-12|c0|0||\",\"Etc/GMT+3|-03|30|0||\",\"Etc/GMT+4|-04|40|0||\",\"Etc/GMT+5|-05|50|0||\",\"Etc/GMT+6|-06|60|0||\",\"Etc/GMT+7|-07|70|0||\",\"Etc/GMT+8|-08|80|0||\",\"Etc/GMT+9|-09|90|0||\",\"Etc/UTC|UTC|0|0||\",\"Europe/Amsterdam|AMT NST +0120 +0020 CEST CET|-j.w -1j.w -1k -k -20 -10|010101010101010101010101010101010101010101012323234545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545|-2aFcj.w 11b0 1iP0 11A0 1io0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1co0 1io0 1yo0 Pc0 1a00 1fA0 1Bc0 Mo0 1tc0 Uo0 1tA0 U00 1uo0 W00 1s00 VA0 1so0 Vc0 1sM0 UM0 1wo0 Rc0 1u00 Wo0 1rA0 W00 1s00 VA0 1sM0 UM0 1w00 fV0 BCX.w 1tA0 U00 1u00 Wo0 1sm0 601k WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|16e5\",\"Europe/Andorra|WET CET CEST|0 -10 -20|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-UBA0 1xIN0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|79e3\",\"Europe/Astrakhan|LMT +03 +04 +05|-3c.c -30 -40 -50|012323232323232323212121212121212121212121212121212121212121212|-1Pcrc.c eUMc.c 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|10e5\",\"Europe/Athens|AMT EET EEST CEST CET|-1y.Q -20 -30 -20 -10|012123434121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2a61x.Q CNbx.Q mn0 kU10 9b0 3Es0 Xa0 1fb0 1dd0 k3X0 Nz0 SCp0 1vc0 SO0 1cM0 1a00 1ao0 1fc0 1a10 1fG0 1cg0 1dX0 1bX0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|35e5\",\"Europe/London|GMT BST BDST|0 -10 -20|0101010101010101010101010101010101010101010101010121212121210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2axa0 Rc0 1fA0 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 2Rz0 Dc0 1zc0 Oo0 1zc0 Rc0 1wo0 17c0 1iM0 FA0 xB0 1fA0 1a00 14o0 bb0 LA0 xB0 Rc0 1wo0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1a00 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1tA0 IM0 90o0 U00 1tA0 U00 1tA0 U00 1tA0 U00 1tA0 WM0 1qM0 WM0 1qM0 WM0 1tA0 U00 1tA0 U00 1tA0 11z0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|10e6\",\"Europe/Belgrade|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-19RC0 3IP0 WM0 1fA0 1cM0 1cM0 1rc0 Qo0 1vmo0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5\",\"Europe/Berlin|CET CEST CEMT|-10 -20 -30|01010101010101210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 kL0 Nc0 m10 WM0 1ao0 1cp0 dX0 jz0 Dd0 1io0 17c0 1fA0 1a00 1ehA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e5\",\"Europe/Prague|CET CEST GMT|-10 -20 0|01010101010101010201010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 1cM0 1qM0 11c0 mp0 xA0 mn0 17c0 1io0 17c0 1fc0 1ao0 1bNc0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|13e5\",\"Europe/Brussels|WET CET CEST WEST|0 -10 -20 -10|0121212103030303030303030303030303030303030303030303212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2ehc0 3zX0 11c0 1iO0 11A0 1o00 11A0 my0 Ic0 1qM0 Rc0 1EM0 UM0 1u00 10o0 1io0 1io0 17c0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a30 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 y00 5Wn0 WM0 1fA0 1cM0 16M0 1iM0 16M0 1C00 Uo0 1eeo0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|21e5\",\"Europe/Bucharest|BMT EET EEST|-1I.o -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1xApI.o 20LI.o RA0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Axc0 On0 1fA0 1a10 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cK0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cL0 1cN0 1cL0 1fB0 1nX0 11E0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|19e5\",\"Europe/Budapest|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 1oo0 11c0 1lc0 17c0 O1V0 3Nf0 WM0 1fA0 1cM0 1cM0 1oJ0 1dd0 1020 1fX0 1cp0 1cM0 1cM0 1cM0 1fA0 1a00 bhy0 Rb0 1wr0 Rc0 1C00 LA0 1C00 LA0 SNW0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cO0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e5\",\"Europe/Zurich|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-19Lc0 11A0 1o00 11A0 1xG10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|38e4\",\"Europe/Chisinau|CMT BMT EET EEST CEST CET MSK MSD|-1T -1I.o -20 -30 -20 -10 -30 -40|012323232323232323234545467676767676767676767323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-26jdT wGMa.A 20LI.o RA0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 27A0 2en0 39g0 WM0 1fA0 1cM0 V90 1t7z0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 gL0 WO0 1cM0 1cM0 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1nX0 11D0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|67e4\",\"Europe/Copenhagen|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2azC0 Tz0 VuO0 60q0 WM0 1fA0 1cM0 1cM0 1cM0 S00 1HA0 Nc0 1C00 Dc0 1Nc0 Ao0 1h5A0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5\",\"Europe/Gibraltar|GMT BST BDST CET CEST|0 -10 -20 -10 -20|010101010101010101010101010101010101010101010101012121212121010121010101010101010101034343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|-2axa0 Rc0 1fA0 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 2Rz0 Dc0 1zc0 Oo0 1zc0 Rc0 1wo0 17c0 1iM0 FA0 xB0 1fA0 1a00 14o0 bb0 LA0 xB0 Rc0 1wo0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 10Jz0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|30e3\",\"Europe/Helsinki|HMT EET EEST|-1D.N -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1WuND.N OULD.N 1dA0 1xGq0 1cM0 1cM0 1cM0 1cN0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5\",\"Europe/Kaliningrad|CET CEST EET EEST MSK MSD +03|-10 -20 -20 -30 -30 -40 -30|01010101010101232454545454545454543232323232323232323232323232323232323232323262|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 390 7A0 1en0 12N0 1pbb0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|44e4\",\"Europe/Kiev|KMT EET MSK CEST CET MSD EEST|-22.4 -20 -30 -20 -10 -40 -30|0123434252525252525252525256161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161|-1Pc22.4 eUo2.4 rnz0 2Hg0 WM0 1fA0 da0 1v4m0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 Db0 3220 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|34e5\",\"Europe/Kirov|LMT +03 +04 +05|-3i.M -30 -40 -50|01232323232323232321212121212121212121212121212121212121212121|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|48e4\",\"Europe/Lisbon|LMT WET WEST WEMT CET CEST|A.J 0 -10 -20 -10 -20|012121212121212121212121212121212121212121212321232123212321212121212121212121212121212121212121214121212121212121212121212121212124545454212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2le00 aPX0 Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 3Co0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 pvy0 1cM0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|27e5\",\"Europe/Luxembourg|LMT CET CEST WET WEST WEST WET|-o.A -10 -20 0 -10 -20 -10|0121212134343434343434343434343434343434343434343434565651212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2DG0o.A t6mo.A TB0 1nX0 Up0 1o20 11A0 rW0 CM0 1qP0 R90 1EO0 UK0 1u20 10m0 1ip0 1in0 17e0 19W0 1fB0 1db0 1cp0 1in0 17d0 1fz0 1a10 1in0 1a10 1in0 17f0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 vA0 60L0 WM0 1fA0 1cM0 17c0 1io0 16M0 1C00 Uo0 1eeo0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|54e4\",\"Europe/Madrid|WET WEST WEMT CET CEST|0 -10 -20 -10 -20|010101010101010101210343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|-25Td0 19B0 1cL0 1dd0 b1z0 18p0 3HX0 17d0 1fz0 1a10 1io0 1a00 1in0 17d0 iIn0 Hd0 1cL0 bb0 1200 2s20 14n0 5aL0 Mp0 1vz0 17d0 1in0 17d0 1in0 17d0 1in0 17d0 6hX0 11B0 XHX0 1a10 1fz0 1a10 19X0 1cN0 1fz0 1a10 1fC0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|62e5\",\"Europe/Malta|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2arB0 Lz0 1cN0 1db0 1410 1on0 Wp0 1qL0 17d0 1cL0 M3B0 5M20 WM0 1fA0 1co0 17c0 1iM0 16m0 1de0 1lc0 14m0 1lc0 WO0 1qM0 GTW0 On0 1C10 LA0 1C00 LA0 1EM0 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1co0 1cM0 1lA0 Xc0 1qq0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1iN0 19z0 1fB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|42e4\",\"Europe/Minsk|MMT EET MSK CEST CET MSD EEST +03|-1O -20 -30 -20 -10 -40 -30 -30|01234343252525252525252525261616161616161616161616161616161616161617|-1Pc1O eUnO qNX0 3gQ0 WM0 1fA0 1cM0 Al0 1tsn0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 3Fc0 1cN0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0|19e5\",\"Europe/Monaco|PMT WET WEST WEMT CET CEST|-9.l 0 -10 -20 -10 -20|01212121212121212121212121212121212121212121212121232323232345454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-2n5c9.l cFX9.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 1u00 10o0 1io0 1wo0 Rc0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Df0 2RV0 11z0 11B0 1ze0 WM0 1fA0 1cM0 1fa0 1aq0 16M0 1ekn0 1cL0 1fC0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|38e3\",\"Europe/Moscow|MMT MMT MST MDST MSD MSK +05 EET EEST MSK|-2u.h -2v.j -3v.j -4v.j -40 -30 -50 -20 -30 -40|012132345464575454545454545454545458754545454545454545454545454545454545454595|-2ag2u.h 2pyW.W 1bA0 11X0 GN0 1Hb0 c4v.j ik0 3DA0 dz0 15A0 c10 2q10 iM10 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|16e6\",\"Europe/Paris|PMT WET WEST CEST CET WEMT|-9.l 0 -10 -20 -10 -20|0121212121212121212121212121212121212121212121212123434352543434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434|-2nco9.l cNb9.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 1u00 10o0 1io0 1wo0 Rc0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Df0 Ik0 5M30 WM0 1fA0 1cM0 Vx0 hB0 1aq0 16M0 1ekn0 1cL0 1fC0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e6\",\"Europe/Riga|RMT LST EET MSK CEST CET MSD EEST|-1A.y -2A.y -20 -30 -20 -10 -40 -30|010102345454536363636363636363727272727272727272727272727272727272727272727272727272727272727272727272727272727272727272727272|-25TzA.y 11A0 1iM0 ko0 gWm0 yDXA.y 2bX0 3fE0 WM0 1fA0 1cM0 1cM0 4m0 1sLy0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 1o00 11A0 1o00 11A0 1qM0 3oo0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|64e4\",\"Europe/Rome|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2arB0 Lz0 1cN0 1db0 1410 1on0 Wp0 1qL0 17d0 1cL0 M3B0 5M20 WM0 1fA0 1cM0 16M0 1iM0 16m0 1de0 1lc0 14m0 1lc0 WO0 1qM0 GTW0 On0 1C10 LA0 1C00 LA0 1EM0 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1C00 LA0 1zc0 Oo0 1C00 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1zc0 Oo0 1fC0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|39e5\",\"Europe/Samara|LMT +03 +04 +05|-3k.k -30 -40 -50|0123232323232323232121232323232323232323232323232323232323212|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 2y10 14m0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|12e5\",\"Europe/Saratov|LMT +03 +04 +05|-34.i -30 -40 -50|012323232323232321212121212121212121212121212121212121212121212|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1cM0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 5810|\",\"Europe/Simferopol|SMT EET MSK CEST CET MSD EEST MSK|-2g -20 -30 -20 -10 -40 -30 -40|012343432525252525252525252161616525252616161616161616161616161616161616172|-1Pc2g eUog rEn0 2qs0 WM0 1fA0 1cM0 3V0 1u0L0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Q00 4eL0 1cL0 1cN0 1cL0 1cN0 dX0 WL0 1cN0 1cL0 1fB0 1o30 11B0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11z0 1nW0|33e4\",\"Europe/Sofia|EET CET CEST EEST|-20 -10 -20 -30|01212103030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030|-168L0 WM0 1fA0 1cM0 1cM0 1cN0 1mKH0 1dd0 1fb0 1ap0 1fb0 1a20 1fy0 1a30 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1nX0 11E0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5\",\"Europe/Stockholm|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2azC0 TB0 2yDe0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|15e5\",\"Europe/Tallinn|TMT CET CEST EET MSK MSD EEST|-1D -10 -20 -20 -30 -40 -30|012103421212454545454545454546363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363|-26oND teD 11A0 1Ta0 4rXl KSLD 2FX0 2Jg0 WM0 1fA0 1cM0 18J0 1sTX0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o10 11A0 1qM0 5QM0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e4\",\"Europe/Tirane|LMT CET CEST|-1j.k -10 -20|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glBj.k 14pcj.k 5LC0 WM0 4M0 1fCK0 10n0 1op0 11z0 1pd0 11z0 1qN0 WL0 1qp0 Xb0 1qp0 Xb0 1qp0 11z0 1lB0 11z0 1qN0 11z0 1iN0 16n0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|42e4\",\"Europe/Ulyanovsk|LMT +03 +04 +05 +02|-3d.A -30 -40 -50 -20|01232323232323232321214121212121212121212121212121212121212121212|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|13e5\",\"Europe/Uzhgorod|CET CEST MSK MSD EET EEST|-10 -20 -30 -40 -20 -30|010101023232323232323232320454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-1cqL0 6i00 WM0 1fA0 1cM0 1ml0 1Cp0 1r3W0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Q00 1Nf0 2pw0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e4\",\"Europe/Vienna|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 3KM0 14o0 LA00 6i00 WM0 1fA0 1cM0 1cM0 1cM0 400 2qM0 1ao0 1co0 1cM0 1io0 17c0 1gHa0 19X0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|18e5\",\"Europe/Vilnius|WMT KMT CET EET MSK CEST MSD EEST|-1o -1z.A -10 -20 -30 -20 -40 -30|012324525254646464646464646473737373737373737352537373737373737373737373737373737373737373737373737373737373737373737373|-293do 6ILM.o 1Ooz.A zz0 Mfd0 29W0 3is0 WM0 1fA0 1cM0 LV0 1tgL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11B0 1o00 11A0 1qM0 8io0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|54e4\",\"Europe/Volgograd|LMT +03 +04 +05|-2V.E -30 -40 -50|0123232323232323212121212121212121212121212121212121212121212121|-21IqV.E psLV.E 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1cM0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 9Jd0 5gn0|10e5\",\"Europe/Warsaw|WMT CET CEST EET EEST|-1o -10 -20 -20 -30|012121234312121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2ctdo 1LXo 11d0 1iO0 11A0 1o00 11A0 1on0 11A0 6zy0 HWP0 5IM0 WM0 1fA0 1cM0 1dz0 1mL0 1en0 15B0 1aq0 1nA0 11A0 1io0 17c0 1fA0 1a00 iDX0 LA0 1cM0 1cM0 1C00 Oo0 1cM0 1cM0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1C00 LA0 uso0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e5\",\"Europe/Zaporozhye|+0220 EET MSK CEST CET MSD EEST|-2k -20 -30 -20 -10 -40 -30|01234342525252525252525252526161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161|-1Pc2k eUok rdb0 2RE0 WM0 1fA0 8m0 1v9a0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cK0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|77e4\",\"HST|HST|a0|0||\",\"Indian/Chagos|LMT +05 +06|-4N.E -50 -60|012|-2xosN.E 3AGLN.E|30e2\",\"Indian/Cocos|+0630|-6u|0||596\",\"Indian/Kerguelen|-00 +05|0 -50|01|-MG00|130\",\"Indian/Mahe|LMT +04|-3F.M -40|01|-2xorF.M|79e3\",\"Indian/Maldives|MMT +05|-4S -50|01|-olgS|35e4\",\"Indian/Mauritius|LMT +04 +05|-3O -40 -50|012121|-2xorO 34unO 14L0 12kr0 11z0|15e4\",\"Indian/Reunion|LMT +04|-3F.Q -40|01|-2mDDF.Q|84e4\",\"Pacific/Kwajalein|+11 +10 +09 -12 +12|-b0 -a0 -90 c0 -c0|012034|-1kln0 akp0 6Up0 12ry0 Wan0|14e3\",\"MET|MET MEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|\",\"MST|MST|70|0||\",\"MST7MDT|MST MDT MWT MPT|70 60 60 60|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|\",\"Pacific/Chatham|+1215 +1245 +1345|-cf -cJ -dJ|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-WqAf 1adef IM0 1C00 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1qM0 14o0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1io0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|600\",\"Pacific/Apia|LMT -1130 -11 -10 +14 +13|bq.U bu b0 a0 -e0 -d0|01232345454545454545454545454545454545454545454545454545454|-2nDMx.4 1yW03.4 2rRbu 1ff0 1a00 CI0 AQ0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|37e3\",\"Pacific/Bougainville|+10 +09 +11|-a0 -90 -b0|0102|-16Wy0 7CN0 2MQp0|18e4\",\"Pacific/Chuuk|+10 +09|-a0 -90|01010|-2ewy0 axB0 RVX0 axd0|49e3\",\"Pacific/Efate|LMT +11 +12|-bd.g -b0 -c0|012121212121212121212121|-2l9nd.g 2uNXd.g Dc0 n610 1cL0 1cN0 1cL0 1fB0 19X0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 Lz0 1Nd0 An0|66e3\",\"Pacific/Enderbury|-12 -11 +13|c0 b0 -d0|012|nIc0 B7X0|1\",\"Pacific/Fakaofo|-11 +13|b0 -d0|01|1Gfn0|483\",\"Pacific/Fiji|LMT +12 +13|-bT.I -c0 -d0|0121212121212121212121212121212121212121212121212121212121212121|-2bUzT.I 3m8NT.I LA0 1EM0 IM0 nJc0 LA0 1o00 Rc0 1wo0 Ao0 1Nc0 Ao0 1Q00 xz0 1SN0 uM0 1SM0 uM0 1VA0 s00 1VA0 s00 1VA0 s00 20o0 pc0 2hc0 bc0 20o0 pc0 20o0 pc0 20o0 pc0 20o0 pc0 20o0 s00 1VA0 s00 20o0 pc0 20o0 pc0 20o0 pc0 20o0 pc0 20o0 s00 20o0 pc0 20o0 pc0 20o0 pc0 20o0 pc0 20o0 s00 1VA0 s00|88e4\",\"Pacific/Galapagos|LMT -05 -06|5W.o 50 60|01212|-1yVS1.A 2dTz1.A gNd0 rz0|25e3\",\"Pacific/Gambier|LMT -09|8X.M 90|01|-2jof0.c|125\",\"Pacific/Guadalcanal|LMT +11|-aD.M -b0|01|-2joyD.M|11e4\",\"Pacific/Guam|GST +09 GDT ChST|-a0 -90 -b0 -a0|01020202020202020203|-18jK0 6pB0 AhB0 3QL0 g2p0 3p91 WOX rX0 1zd0 Rb0 1wp0 Rb0 5xd0 rX0 5sN0 zb1 1C0X On0 ULb0|17e4\",\"Pacific/Honolulu|HST HDT HWT HPT HST|au 9u 9u 9u a0|0102304|-1thLu 8x0 lef0 8wWu iAu 46p0|37e4\",\"Pacific/Kiritimati|-1040 -10 +14|aE a0 -e0|012|nIaE B7Xk|51e2\",\"Pacific/Kosrae|+11 +09 +10 +12|-b0 -90 -a0 -c0|01021030|-2ewz0 axC0 HBy0 akp0 axd0 WOK0 1bdz0|66e2\",\"Pacific/Majuro|+11 +09 +10 +12|-b0 -90 -a0 -c0|0102103|-2ewz0 axC0 HBy0 akp0 6RB0 12um0|28e3\",\"Pacific/Marquesas|LMT -0930|9i 9u|01|-2joeG|86e2\",\"Pacific/Pago_Pago|LMT SST|bm.M b0|01|-2nDMB.c|37e2\",\"Pacific/Nauru|LMT +1130 +09 +12|-b7.E -bu -90 -c0|01213|-1Xdn7.E QCnB.E 7mqu 1lnbu|10e3\",\"Pacific/Niue|-1120 -1130 -11|bk bu b0|012|-KfME 17y0a|12e2\",\"Pacific/Norfolk|+1112 +1130 +1230 +11 +12|-bc -bu -cu -b0 -c0|012134343434343434343434343434343434343434|-Kgbc W01G Oo0 1COo0 9Jcu 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|25e4\",\"Pacific/Noumea|LMT +11 +12|-b5.M -b0 -c0|01212121|-2l9n5.M 2EqM5.M xX0 1PB0 yn0 HeP0 Ao0|98e3\",\"Pacific/Pitcairn|-0830 -08|8u 80|01|18Vku|56\",\"Pacific/Pohnpei|+11 +09 +10|-b0 -90 -a0|010210|-2ewz0 axC0 HBy0 akp0 axd0|34e3\",\"Pacific/Rarotonga|-1030 -0930 -10|au 9u a0|012121212121212121212121212|lyWu IL0 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu Onu|13e3\",\"Pacific/Tahiti|LMT -10|9W.g a0|01|-2joe1.I|18e4\",\"Pacific/Tongatapu|+1220 +13 +14|-ck -d0 -e0|0121212121|-1aB0k 2n5dk 15A0 1wo0 xz0 1Q10 xz0 zWN0 s00|75e3\",\"PST8PDT|PST PDT PWT PPT|80 70 70 70|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261q0 1nX0 11B0 1nX0 SgN0 8x10 iy0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|\",\"WET|WET WEST|0 -10|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|hDB0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|\"],\"links\":[\"Africa/Abidjan|Africa/Bamako\",\"Africa/Abidjan|Africa/Banjul\",\"Africa/Abidjan|Africa/Conakry\",\"Africa/Abidjan|Africa/Dakar\",\"Africa/Abidjan|Africa/Freetown\",\"Africa/Abidjan|Africa/Lome\",\"Africa/Abidjan|Africa/Nouakchott\",\"Africa/Abidjan|Africa/Ouagadougou\",\"Africa/Abidjan|Africa/Timbuktu\",\"Africa/Abidjan|Atlantic/St_Helena\",\"Africa/Cairo|Egypt\",\"Africa/Johannesburg|Africa/Maseru\",\"Africa/Johannesburg|Africa/Mbabane\",\"Africa/Lagos|Africa/Bangui\",\"Africa/Lagos|Africa/Brazzaville\",\"Africa/Lagos|Africa/Douala\",\"Africa/Lagos|Africa/Kinshasa\",\"Africa/Lagos|Africa/Libreville\",\"Africa/Lagos|Africa/Luanda\",\"Africa/Lagos|Africa/Malabo\",\"Africa/Lagos|Africa/Niamey\",\"Africa/Lagos|Africa/Porto-Novo\",\"Africa/Maputo|Africa/Blantyre\",\"Africa/Maputo|Africa/Bujumbura\",\"Africa/Maputo|Africa/Gaborone\",\"Africa/Maputo|Africa/Harare\",\"Africa/Maputo|Africa/Kigali\",\"Africa/Maputo|Africa/Lubumbashi\",\"Africa/Maputo|Africa/Lusaka\",\"Africa/Nairobi|Africa/Addis_Ababa\",\"Africa/Nairobi|Africa/Asmara\",\"Africa/Nairobi|Africa/Asmera\",\"Africa/Nairobi|Africa/Dar_es_Salaam\",\"Africa/Nairobi|Africa/Djibouti\",\"Africa/Nairobi|Africa/Kampala\",\"Africa/Nairobi|Africa/Mogadishu\",\"Africa/Nairobi|Indian/Antananarivo\",\"Africa/Nairobi|Indian/Comoro\",\"Africa/Nairobi|Indian/Mayotte\",\"Africa/Tripoli|Libya\",\"America/Adak|America/Atka\",\"America/Adak|US/Aleutian\",\"America/Anchorage|US/Alaska\",\"America/Argentina/Buenos_Aires|America/Buenos_Aires\",\"America/Argentina/Catamarca|America/Argentina/ComodRivadavia\",\"America/Argentina/Catamarca|America/Catamarca\",\"America/Argentina/Cordoba|America/Cordoba\",\"America/Argentina/Cordoba|America/Rosario\",\"America/Argentina/Jujuy|America/Jujuy\",\"America/Argentina/Mendoza|America/Mendoza\",\"America/Atikokan|America/Coral_Harbour\",\"America/Chicago|US/Central\",\"America/Curacao|America/Aruba\",\"America/Curacao|America/Kralendijk\",\"America/Curacao|America/Lower_Princes\",\"America/Denver|America/Shiprock\",\"America/Denver|Navajo\",\"America/Denver|US/Mountain\",\"America/Detroit|US/Michigan\",\"America/Edmonton|Canada/Mountain\",\"America/Fort_Wayne|America/Indiana/Indianapolis\",\"America/Fort_Wayne|America/Indianapolis\",\"America/Fort_Wayne|US/East-Indiana\",\"America/Godthab|America/Nuuk\",\"America/Halifax|Canada/Atlantic\",\"America/Havana|Cuba\",\"America/Indiana/Knox|America/Knox_IN\",\"America/Indiana/Knox|US/Indiana-Starke\",\"America/Jamaica|Jamaica\",\"America/Kentucky/Louisville|America/Louisville\",\"America/Los_Angeles|US/Pacific\",\"America/Manaus|Brazil/West\",\"America/Mazatlan|Mexico/BajaSur\",\"America/Mexico_City|Mexico/General\",\"America/New_York|US/Eastern\",\"America/Noronha|Brazil/DeNoronha\",\"America/Panama|America/Cayman\",\"America/Phoenix|US/Arizona\",\"America/Port_of_Spain|America/Anguilla\",\"America/Port_of_Spain|America/Antigua\",\"America/Port_of_Spain|America/Dominica\",\"America/Port_of_Spain|America/Grenada\",\"America/Port_of_Spain|America/Guadeloupe\",\"America/Port_of_Spain|America/Marigot\",\"America/Port_of_Spain|America/Montserrat\",\"America/Port_of_Spain|America/St_Barthelemy\",\"America/Port_of_Spain|America/St_Kitts\",\"America/Port_of_Spain|America/St_Lucia\",\"America/Port_of_Spain|America/St_Thomas\",\"America/Port_of_Spain|America/St_Vincent\",\"America/Port_of_Spain|America/Tortola\",\"America/Port_of_Spain|America/Virgin\",\"America/Regina|Canada/Saskatchewan\",\"America/Rio_Branco|America/Porto_Acre\",\"America/Rio_Branco|Brazil/Acre\",\"America/Santiago|Chile/Continental\",\"America/Sao_Paulo|Brazil/East\",\"America/St_Johns|Canada/Newfoundland\",\"America/Tijuana|America/Ensenada\",\"America/Tijuana|America/Santa_Isabel\",\"America/Tijuana|Mexico/BajaNorte\",\"America/Toronto|America/Montreal\",\"America/Toronto|Canada/Eastern\",\"America/Vancouver|Canada/Pacific\",\"America/Whitehorse|Canada/Yukon\",\"America/Winnipeg|Canada/Central\",\"Asia/Ashgabat|Asia/Ashkhabad\",\"Asia/Bangkok|Asia/Phnom_Penh\",\"Asia/Bangkok|Asia/Vientiane\",\"Asia/Dhaka|Asia/Dacca\",\"Asia/Dubai|Asia/Muscat\",\"Asia/Ho_Chi_Minh|Asia/Saigon\",\"Asia/Hong_Kong|Hongkong\",\"Asia/Jerusalem|Asia/Tel_Aviv\",\"Asia/Jerusalem|Israel\",\"Asia/Kathmandu|Asia/Katmandu\",\"Asia/Kolkata|Asia/Calcutta\",\"Asia/Kuala_Lumpur|Asia/Singapore\",\"Asia/Kuala_Lumpur|Singapore\",\"Asia/Macau|Asia/Macao\",\"Asia/Makassar|Asia/Ujung_Pandang\",\"Asia/Nicosia|Europe/Nicosia\",\"Asia/Qatar|Asia/Bahrain\",\"Asia/Rangoon|Asia/Yangon\",\"Asia/Riyadh|Asia/Aden\",\"Asia/Riyadh|Asia/Kuwait\",\"Asia/Seoul|ROK\",\"Asia/Shanghai|Asia/Chongqing\",\"Asia/Shanghai|Asia/Chungking\",\"Asia/Shanghai|Asia/Harbin\",\"Asia/Shanghai|PRC\",\"Asia/Taipei|ROC\",\"Asia/Tehran|Iran\",\"Asia/Thimphu|Asia/Thimbu\",\"Asia/Tokyo|Japan\",\"Asia/Ulaanbaatar|Asia/Ulan_Bator\",\"Asia/Urumqi|Asia/Kashgar\",\"Atlantic/Faroe|Atlantic/Faeroe\",\"Atlantic/Reykjavik|Iceland\",\"Atlantic/South_Georgia|Etc/GMT+2\",\"Australia/Adelaide|Australia/South\",\"Australia/Brisbane|Australia/Queensland\",\"Australia/Broken_Hill|Australia/Yancowinna\",\"Australia/Darwin|Australia/North\",\"Australia/Hobart|Australia/Currie\",\"Australia/Hobart|Australia/Tasmania\",\"Australia/Lord_Howe|Australia/LHI\",\"Australia/Melbourne|Australia/Victoria\",\"Australia/Perth|Australia/West\",\"Australia/Sydney|Australia/ACT\",\"Australia/Sydney|Australia/Canberra\",\"Australia/Sydney|Australia/NSW\",\"Etc/GMT-0|Etc/GMT\",\"Etc/GMT-0|Etc/GMT+0\",\"Etc/GMT-0|Etc/GMT0\",\"Etc/GMT-0|Etc/Greenwich\",\"Etc/GMT-0|GMT\",\"Etc/GMT-0|GMT+0\",\"Etc/GMT-0|GMT-0\",\"Etc/GMT-0|GMT0\",\"Etc/GMT-0|Greenwich\",\"Etc/UTC|Etc/UCT\",\"Etc/UTC|Etc/Universal\",\"Etc/UTC|Etc/Zulu\",\"Etc/UTC|UCT\",\"Etc/UTC|UTC\",\"Etc/UTC|Universal\",\"Etc/UTC|Zulu\",\"Europe/Belgrade|Europe/Ljubljana\",\"Europe/Belgrade|Europe/Podgorica\",\"Europe/Belgrade|Europe/Sarajevo\",\"Europe/Belgrade|Europe/Skopje\",\"Europe/Belgrade|Europe/Zagreb\",\"Europe/Chisinau|Europe/Tiraspol\",\"Europe/Dublin|Eire\",\"Europe/Helsinki|Europe/Mariehamn\",\"Europe/Istanbul|Asia/Istanbul\",\"Europe/Istanbul|Turkey\",\"Europe/Lisbon|Portugal\",\"Europe/London|Europe/Belfast\",\"Europe/London|Europe/Guernsey\",\"Europe/London|Europe/Isle_of_Man\",\"Europe/London|Europe/Jersey\",\"Europe/London|GB\",\"Europe/London|GB-Eire\",\"Europe/Moscow|W-SU\",\"Europe/Oslo|Arctic/Longyearbyen\",\"Europe/Oslo|Atlantic/Jan_Mayen\",\"Europe/Prague|Europe/Bratislava\",\"Europe/Rome|Europe/San_Marino\",\"Europe/Rome|Europe/Vatican\",\"Europe/Warsaw|Poland\",\"Europe/Zurich|Europe/Busingen\",\"Europe/Zurich|Europe/Vaduz\",\"Indian/Christmas|Etc/GMT-7\",\"Pacific/Auckland|Antarctica/McMurdo\",\"Pacific/Auckland|Antarctica/South_Pole\",\"Pacific/Auckland|NZ\",\"Pacific/Chatham|NZ-CHAT\",\"Pacific/Chuuk|Pacific/Truk\",\"Pacific/Chuuk|Pacific/Yap\",\"Pacific/Easter|Chile/EasterIsland\",\"Pacific/Guam|Pacific/Saipan\",\"Pacific/Honolulu|Pacific/Johnston\",\"Pacific/Honolulu|US/Hawaii\",\"Pacific/Kwajalein|Kwajalein\",\"Pacific/Pago_Pago|Pacific/Midway\",\"Pacific/Pago_Pago|Pacific/Samoa\",\"Pacific/Pago_Pago|US/Samoa\",\"Pacific/Palau|Etc/GMT-9\",\"Pacific/Pohnpei|Pacific/Ponape\",\"Pacific/Port_Moresby|Etc/GMT-10\",\"Pacific/Tarawa|Etc/GMT-12\",\"Pacific/Tarawa|Pacific/Funafuti\",\"Pacific/Tarawa|Pacific/Wake\",\"Pacific/Tarawa|Pacific/Wallis\"],\"countries\":[\"AD|Europe/Andorra\",\"AE|Asia/Dubai\",\"AF|Asia/Kabul\",\"AG|America/Port_of_Spain America/Antigua\",\"AI|America/Port_of_Spain America/Anguilla\",\"AL|Europe/Tirane\",\"AM|Asia/Yerevan\",\"AO|Africa/Lagos Africa/Luanda\",\"AQ|Antarctica/Casey Antarctica/Davis Antarctica/DumontDUrville Antarctica/Mawson Antarctica/Palmer Antarctica/Rothera Antarctica/Syowa Antarctica/Troll Antarctica/Vostok Pacific/Auckland Antarctica/McMurdo\",\"AR|America/Argentina/Buenos_Aires America/Argentina/Cordoba America/Argentina/Salta America/Argentina/Jujuy America/Argentina/Tucuman America/Argentina/Catamarca America/Argentina/La_Rioja America/Argentina/San_Juan America/Argentina/Mendoza America/Argentina/San_Luis America/Argentina/Rio_Gallegos America/Argentina/Ushuaia\",\"AS|Pacific/Pago_Pago\",\"AT|Europe/Vienna\",\"AU|Australia/Lord_Howe Antarctica/Macquarie Australia/Hobart Australia/Currie Australia/Melbourne Australia/Sydney Australia/Broken_Hill Australia/Brisbane Australia/Lindeman Australia/Adelaide Australia/Darwin Australia/Perth Australia/Eucla\",\"AW|America/Curacao America/Aruba\",\"AX|Europe/Helsinki Europe/Mariehamn\",\"AZ|Asia/Baku\",\"BA|Europe/Belgrade Europe/Sarajevo\",\"BB|America/Barbados\",\"BD|Asia/Dhaka\",\"BE|Europe/Brussels\",\"BF|Africa/Abidjan Africa/Ouagadougou\",\"BG|Europe/Sofia\",\"BH|Asia/Qatar Asia/Bahrain\",\"BI|Africa/Maputo Africa/Bujumbura\",\"BJ|Africa/Lagos Africa/Porto-Novo\",\"BL|America/Port_of_Spain America/St_Barthelemy\",\"BM|Atlantic/Bermuda\",\"BN|Asia/Brunei\",\"BO|America/La_Paz\",\"BQ|America/Curacao America/Kralendijk\",\"BR|America/Noronha America/Belem America/Fortaleza America/Recife America/Araguaina America/Maceio America/Bahia America/Sao_Paulo America/Campo_Grande America/Cuiaba America/Santarem America/Porto_Velho America/Boa_Vista America/Manaus America/Eirunepe America/Rio_Branco\",\"BS|America/Nassau\",\"BT|Asia/Thimphu\",\"BW|Africa/Maputo Africa/Gaborone\",\"BY|Europe/Minsk\",\"BZ|America/Belize\",\"CA|America/St_Johns America/Halifax America/Glace_Bay America/Moncton America/Goose_Bay America/Blanc-Sablon America/Toronto America/Nipigon America/Thunder_Bay America/Iqaluit America/Pangnirtung America/Atikokan America/Winnipeg America/Rainy_River America/Resolute America/Rankin_Inlet America/Regina America/Swift_Current America/Edmonton America/Cambridge_Bay America/Yellowknife America/Inuvik America/Creston America/Dawson_Creek America/Fort_Nelson America/Vancouver America/Whitehorse America/Dawson\",\"CC|Indian/Cocos\",\"CD|Africa/Maputo Africa/Lagos Africa/Kinshasa Africa/Lubumbashi\",\"CF|Africa/Lagos Africa/Bangui\",\"CG|Africa/Lagos Africa/Brazzaville\",\"CH|Europe/Zurich\",\"CI|Africa/Abidjan\",\"CK|Pacific/Rarotonga\",\"CL|America/Santiago America/Punta_Arenas Pacific/Easter\",\"CM|Africa/Lagos Africa/Douala\",\"CN|Asia/Shanghai Asia/Urumqi\",\"CO|America/Bogota\",\"CR|America/Costa_Rica\",\"CU|America/Havana\",\"CV|Atlantic/Cape_Verde\",\"CW|America/Curacao\",\"CX|Indian/Christmas\",\"CY|Asia/Nicosia Asia/Famagusta\",\"CZ|Europe/Prague\",\"DE|Europe/Zurich Europe/Berlin Europe/Busingen\",\"DJ|Africa/Nairobi Africa/Djibouti\",\"DK|Europe/Copenhagen\",\"DM|America/Port_of_Spain America/Dominica\",\"DO|America/Santo_Domingo\",\"DZ|Africa/Algiers\",\"EC|America/Guayaquil Pacific/Galapagos\",\"EE|Europe/Tallinn\",\"EG|Africa/Cairo\",\"EH|Africa/El_Aaiun\",\"ER|Africa/Nairobi Africa/Asmara\",\"ES|Europe/Madrid Africa/Ceuta Atlantic/Canary\",\"ET|Africa/Nairobi Africa/Addis_Ababa\",\"FI|Europe/Helsinki\",\"FJ|Pacific/Fiji\",\"FK|Atlantic/Stanley\",\"FM|Pacific/Chuuk Pacific/Pohnpei Pacific/Kosrae\",\"FO|Atlantic/Faroe\",\"FR|Europe/Paris\",\"GA|Africa/Lagos Africa/Libreville\",\"GB|Europe/London\",\"GD|America/Port_of_Spain America/Grenada\",\"GE|Asia/Tbilisi\",\"GF|America/Cayenne\",\"GG|Europe/London Europe/Guernsey\",\"GH|Africa/Accra\",\"GI|Europe/Gibraltar\",\"GL|America/Nuuk America/Danmarkshavn America/Scoresbysund America/Thule\",\"GM|Africa/Abidjan Africa/Banjul\",\"GN|Africa/Abidjan Africa/Conakry\",\"GP|America/Port_of_Spain America/Guadeloupe\",\"GQ|Africa/Lagos Africa/Malabo\",\"GR|Europe/Athens\",\"GS|Atlantic/South_Georgia\",\"GT|America/Guatemala\",\"GU|Pacific/Guam\",\"GW|Africa/Bissau\",\"GY|America/Guyana\",\"HK|Asia/Hong_Kong\",\"HN|America/Tegucigalpa\",\"HR|Europe/Belgrade Europe/Zagreb\",\"HT|America/Port-au-Prince\",\"HU|Europe/Budapest\",\"ID|Asia/Jakarta Asia/Pontianak Asia/Makassar Asia/Jayapura\",\"IE|Europe/Dublin\",\"IL|Asia/Jerusalem\",\"IM|Europe/London Europe/Isle_of_Man\",\"IN|Asia/Kolkata\",\"IO|Indian/Chagos\",\"IQ|Asia/Baghdad\",\"IR|Asia/Tehran\",\"IS|Atlantic/Reykjavik\",\"IT|Europe/Rome\",\"JE|Europe/London Europe/Jersey\",\"JM|America/Jamaica\",\"JO|Asia/Amman\",\"JP|Asia/Tokyo\",\"KE|Africa/Nairobi\",\"KG|Asia/Bishkek\",\"KH|Asia/Bangkok Asia/Phnom_Penh\",\"KI|Pacific/Tarawa Pacific/Enderbury Pacific/Kiritimati\",\"KM|Africa/Nairobi Indian/Comoro\",\"KN|America/Port_of_Spain America/St_Kitts\",\"KP|Asia/Pyongyang\",\"KR|Asia/Seoul\",\"KW|Asia/Riyadh Asia/Kuwait\",\"KY|America/Panama America/Cayman\",\"KZ|Asia/Almaty Asia/Qyzylorda Asia/Qostanay Asia/Aqtobe Asia/Aqtau Asia/Atyrau Asia/Oral\",\"LA|Asia/Bangkok Asia/Vientiane\",\"LB|Asia/Beirut\",\"LC|America/Port_of_Spain America/St_Lucia\",\"LI|Europe/Zurich Europe/Vaduz\",\"LK|Asia/Colombo\",\"LR|Africa/Monrovia\",\"LS|Africa/Johannesburg Africa/Maseru\",\"LT|Europe/Vilnius\",\"LU|Europe/Luxembourg\",\"LV|Europe/Riga\",\"LY|Africa/Tripoli\",\"MA|Africa/Casablanca\",\"MC|Europe/Monaco\",\"MD|Europe/Chisinau\",\"ME|Europe/Belgrade Europe/Podgorica\",\"MF|America/Port_of_Spain America/Marigot\",\"MG|Africa/Nairobi Indian/Antananarivo\",\"MH|Pacific/Majuro Pacific/Kwajalein\",\"MK|Europe/Belgrade Europe/Skopje\",\"ML|Africa/Abidjan Africa/Bamako\",\"MM|Asia/Yangon\",\"MN|Asia/Ulaanbaatar Asia/Hovd Asia/Choibalsan\",\"MO|Asia/Macau\",\"MP|Pacific/Guam Pacific/Saipan\",\"MQ|America/Martinique\",\"MR|Africa/Abidjan Africa/Nouakchott\",\"MS|America/Port_of_Spain America/Montserrat\",\"MT|Europe/Malta\",\"MU|Indian/Mauritius\",\"MV|Indian/Maldives\",\"MW|Africa/Maputo Africa/Blantyre\",\"MX|America/Mexico_City America/Cancun America/Merida America/Monterrey America/Matamoros America/Mazatlan America/Chihuahua America/Ojinaga America/Hermosillo America/Tijuana America/Bahia_Banderas\",\"MY|Asia/Kuala_Lumpur Asia/Kuching\",\"MZ|Africa/Maputo\",\"NA|Africa/Windhoek\",\"NC|Pacific/Noumea\",\"NE|Africa/Lagos Africa/Niamey\",\"NF|Pacific/Norfolk\",\"NG|Africa/Lagos\",\"NI|America/Managua\",\"NL|Europe/Amsterdam\",\"NO|Europe/Oslo\",\"NP|Asia/Kathmandu\",\"NR|Pacific/Nauru\",\"NU|Pacific/Niue\",\"NZ|Pacific/Auckland Pacific/Chatham\",\"OM|Asia/Dubai Asia/Muscat\",\"PA|America/Panama\",\"PE|America/Lima\",\"PF|Pacific/Tahiti Pacific/Marquesas Pacific/Gambier\",\"PG|Pacific/Port_Moresby Pacific/Bougainville\",\"PH|Asia/Manila\",\"PK|Asia/Karachi\",\"PL|Europe/Warsaw\",\"PM|America/Miquelon\",\"PN|Pacific/Pitcairn\",\"PR|America/Puerto_Rico\",\"PS|Asia/Gaza Asia/Hebron\",\"PT|Europe/Lisbon Atlantic/Madeira Atlantic/Azores\",\"PW|Pacific/Palau\",\"PY|America/Asuncion\",\"QA|Asia/Qatar\",\"RE|Indian/Reunion\",\"RO|Europe/Bucharest\",\"RS|Europe/Belgrade\",\"RU|Europe/Kaliningrad Europe/Moscow Europe/Simferopol Europe/Kirov Europe/Astrakhan Europe/Volgograd Europe/Saratov Europe/Ulyanovsk Europe/Samara Asia/Yekaterinburg Asia/Omsk Asia/Novosibirsk Asia/Barnaul Asia/Tomsk Asia/Novokuznetsk Asia/Krasnoyarsk Asia/Irkutsk Asia/Chita Asia/Yakutsk Asia/Khandyga Asia/Vladivostok Asia/Ust-Nera Asia/Magadan Asia/Sakhalin Asia/Srednekolymsk Asia/Kamchatka Asia/Anadyr\",\"RW|Africa/Maputo Africa/Kigali\",\"SA|Asia/Riyadh\",\"SB|Pacific/Guadalcanal\",\"SC|Indian/Mahe\",\"SD|Africa/Khartoum\",\"SE|Europe/Stockholm\",\"SG|Asia/Singapore\",\"SH|Africa/Abidjan Atlantic/St_Helena\",\"SI|Europe/Belgrade Europe/Ljubljana\",\"SJ|Europe/Oslo Arctic/Longyearbyen\",\"SK|Europe/Prague Europe/Bratislava\",\"SL|Africa/Abidjan Africa/Freetown\",\"SM|Europe/Rome Europe/San_Marino\",\"SN|Africa/Abidjan Africa/Dakar\",\"SO|Africa/Nairobi Africa/Mogadishu\",\"SR|America/Paramaribo\",\"SS|Africa/Juba\",\"ST|Africa/Sao_Tome\",\"SV|America/El_Salvador\",\"SX|America/Curacao America/Lower_Princes\",\"SY|Asia/Damascus\",\"SZ|Africa/Johannesburg Africa/Mbabane\",\"TC|America/Grand_Turk\",\"TD|Africa/Ndjamena\",\"TF|Indian/Reunion Indian/Kerguelen\",\"TG|Africa/Abidjan Africa/Lome\",\"TH|Asia/Bangkok\",\"TJ|Asia/Dushanbe\",\"TK|Pacific/Fakaofo\",\"TL|Asia/Dili\",\"TM|Asia/Ashgabat\",\"TN|Africa/Tunis\",\"TO|Pacific/Tongatapu\",\"TR|Europe/Istanbul\",\"TT|America/Port_of_Spain\",\"TV|Pacific/Funafuti\",\"TW|Asia/Taipei\",\"TZ|Africa/Nairobi Africa/Dar_es_Salaam\",\"UA|Europe/Simferopol Europe/Kiev Europe/Uzhgorod Europe/Zaporozhye\",\"UG|Africa/Nairobi Africa/Kampala\",\"UM|Pacific/Pago_Pago Pacific/Wake Pacific/Honolulu Pacific/Midway\",\"US|America/New_York America/Detroit America/Kentucky/Louisville America/Kentucky/Monticello America/Indiana/Indianapolis America/Indiana/Vincennes America/Indiana/Winamac America/Indiana/Marengo America/Indiana/Petersburg America/Indiana/Vevay America/Chicago America/Indiana/Tell_City America/Indiana/Knox America/Menominee America/North_Dakota/Center America/North_Dakota/New_Salem America/North_Dakota/Beulah America/Denver America/Boise America/Phoenix America/Los_Angeles America/Anchorage America/Juneau America/Sitka America/Metlakatla America/Yakutat America/Nome America/Adak Pacific/Honolulu\",\"UY|America/Montevideo\",\"UZ|Asia/Samarkand Asia/Tashkent\",\"VA|Europe/Rome Europe/Vatican\",\"VC|America/Port_of_Spain America/St_Vincent\",\"VE|America/Caracas\",\"VG|America/Port_of_Spain America/Tortola\",\"VI|America/Port_of_Spain America/St_Thomas\",\"VN|Asia/Bangkok Asia/Ho_Chi_Minh\",\"VU|Pacific/Efate\",\"WF|Pacific/Wallis\",\"WS|Pacific/Apia\",\"YE|Asia/Riyadh Asia/Aden\",\"YT|Africa/Nairobi Indian/Mayotte\",\"ZA|Africa/Johannesburg\",\"ZM|Africa/Maputo Africa/Lusaka\",\"ZW|Africa/Maputo Africa/Harare\"]}");
},{}],"9bdacaa3dd400962d700caddac76d41f":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view.js"));

var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Parcel 2
class CitiesView extends _view.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_parentElement", document.querySelector(".section-cities"));

    _defineProperty(this, "_errorMessage", "We could not get the top cities info currently try again!");

    _defineProperty(this, "_message", "");
  }

  _generateMarkup() {
    return `
        <div class="city city--1">
            <figcaption class="city__display">
                <img src="/img/cities/Amsterdam.jpg" alt="Amsterdam" class="city__img" />
                <div class="city__weather">
                    <svg class="city__weather--icon">
                        <use href="./img/icons.svg#icon-cloudy-sun"></use>
                    </svg>
                    <div class="city__weather--time">11:28</div>
                </div>
            </figcaption>
            <div class="city__header">
                <h6 class="city__title">Amsterdam</h6>
            </div>
        </div>

        <div class="city city--2">
            <figcaption class="city__display">
                <img src="./img/cities/NewYork.jpg" alt="New York" class="city__img" />
                <div class="city__weather">
                    <svg class="city__weather--icon">
                        <use href="./img/icons.svg#icon-sun"></use>
                    </svg>
                    <div class="city__weather--time">16:28</div>
                </div>
            </figcaption>
            <div class="city__header">
                <h6 class="city__title">New York</h6>
            </div>
        </div>

        <div class="city city--3">
            <figcaption class="city__display">
                <img src="./img/cities/Jaipur.jpg" alt="Jaipur" class="city__img" />
                <div class="city__weather">
                    <svg class="city__weather--icon">
                        <use href="./img/icons.svg#icon-moon"></use>
                    </svg>
                    <div class="city__weather--time">22:28</div>
                </div>
            </figcaption>
            <div class="city__header">
                <h6 class="city__title">Jaipur</h6>
            </div>
        </div>

        <div class="city city--4">
            <figcaption class="city__display">
                <img src="./img/cities/London.jpg" alt="London" class="city__img" />
                <div class="city__weather">
                    <svg class="city__weather--icon">
                        <use href="./img/icons.svg#icon-snowy"></use>
                    </svg>
                    <div class="city__weather--time">16:08</div>
                </div>
            </figcaption>
            <div class="city__header">
                <h6 class="city__title">London</h6>
            </div>
        </div>

        <div class="city city--5">
            <figcaption class="city__display">
                <img src="./img/cities/Paris.jpg" alt="Paris" class="city__img" />
                <div class="city__weather">
                    <svg class="city__weather--icon">
                        <use href="./img/icons.svg#icon-rainy"></use>
                    </svg>
                    <div class="city__weather--time">09:13</div>
                </div>
            </figcaption>
            <div class="city__header">
                <h6 class="city__title">Paris</h6>
            </div>
        </div>
        `;
  }

  updateUI(data) {}

}

var _default = new CitiesView();

exports.default = _default;
},{"./view.js":"6a3957d8744bf1d70b2b44f3726dda59","url:../../img/icons.svg":"b03a103b798a8aab4c0c56ff31cee7f9"}],"6313d141f311799352124137c4d0b697":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view.js"));

var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Parcel 2
class ReportView extends _view.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_parentElement", document.querySelector(".weather-forecast"));

    _defineProperty(this, "_errorMessage", "We could not get the current weather report!");

    _defineProperty(this, "_message", "");
  }

  _generateMarkup() {
    const data = this._data.daily;
    const city = this._data.city;
    return `
      <div class="weather-forecast__header">
        <h2 class="heading--2 city-main">${city}</h2>
        <button class="btn btn--detail">Details more
          &rarr;</button>
      </div>

      <div class="glider weather-forecast__track">
        ${data.map(day => {
      return `
          <div class="glider__item forecast">
            <svg class="forecast__icon">
              <use xlink:href="${_icons.default}#icon-${day.icon}">
            </svg>
            <h6 class="forecast__temperature">${day.min}/${day.max}</h6>
            <div class="forecast__day">${day.date}</div>
          </div>
        `;
    }).join("")}
      </div>
      `;
  }

}

var _default = new ReportView();

exports.default = _default;
},{"./view.js":"6a3957d8744bf1d70b2b44f3726dda59","url:../../img/icons.svg":"b03a103b798a8aab4c0c56ff31cee7f9"}],"ff8d0b5abc33481142ff72d5db7c4a23":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view.js"));

var _gauge = _interopRequireDefault(require("svg-gauge/dist/gauge.js"));

var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Parcel 2
class ReportView extends _view.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_getLocationBtnEle", document.querySelector("#btn-get-location"));

    _defineProperty(this, "_parentElement", document.querySelector(".report__data"));

    _defineProperty(this, "_errorMessage", "We could not get the current weather report!");

    _defineProperty(this, "_message", "");
  }

  _generateMarkup() {
    const data = this._data.current;
    const city = this._data.city;
    const country = this._data.country;
    return `
        <div class="date-time">
            <svg class="date-time__icon">
                <use xlink:href="${_icons.default}#icon-${data.icon}">
                </use>
            </svg>

            <div class="date-time__content">
                <div class="date-time__day">Today</div>
                <div class="date-time__time">${data.time}</div>
                <div class="date-time__date">${data.date}</div>
            </div>
        </div>

        <div class="temperature">${data.temp} &deg;C</div>

        <div class="location">
            <div class="location__city">${city}</div>
            <div class="location__country">${country}</div>
        </div>

        <div class="stats">
            <div class="stats__item stats__item--humidity">
                <h6 class="stats__label">Humidity:</h6>
                <h6 class="stats__value">${data.humidity}%</h6>
                <div class="stats__progress-bar">
                    <div class="stats__bar"></div>
                </div>
            </div>
            <div class="stats__item stats__item--precipation">
                <h6 class="stats__label">Precipation:</h6>
                <h6 class="stats__value">${data.precipitation * 100}%</h6>
                <div class="stats__progress-bar">
                    <div class="stats__bar"></div>
                </div>
            </div>
            <div class="stats__item stats__item--wind">
                <h6 class="stats__label">Wind:</h6>
                <div id="cpuSpeed" class="gauge-container"></div>
                <h6 class="stats__value">${data.windSpeed}Km/h</h6>
            </div>
        </div>
        `;
  }

  updateUI(data) {
    const humidity = data.humidity;
    const precipitation = data.precipitation * 100;
    const windSpeed = +data.windSpeed;
    const progressBars = document.querySelectorAll(".stats__bar");
    progressBars[0].style.width = `${humidity}%`;
    progressBars[1].style.width = `${precipitation}%`; // Create a new Gauge

    var cpuGauge = (0, _gauge.default)(document.getElementById("cpuSpeed"), {
      max: 10,
      showValue: false,
      value: 0,
      // Custom dial colors (Optional)
      color: function () {
        return "#ffae47";
      }
    }); // Set value and animate (value, animation duration in seconds)

    cpuGauge.setValueAnimated(windSpeed, 2);
  }

  addHandlerGetLocation(handler) {
    this._getLocationBtnEle.addEventListener("click", function () {
      handler();
    });
  }

}

var _default = new ReportView();

exports.default = _default;
},{"./view.js":"6a3957d8744bf1d70b2b44f3726dda59","svg-gauge/dist/gauge.js":"e4759f283c63848d80afef6426312726","url:../../img/icons.svg":"b03a103b798a8aab4c0c56ff31cee7f9"}],"e4759f283c63848d80afef6426312726":[function(require,module,exports) {
var define;

/* global window, define, module */
(function (global, factory) {
  var Gauge = factory(global);

  if (typeof define === "function" && define.amd) {
    // AMD support
    define(function () {
      return Gauge;
    });
  } else if (typeof module === "object" && module.exports) {
    // CommonJS support
    module.exports = Gauge;
  } else {
    // We are probably running in the browser
    global.Gauge = Gauge;
  }
})(typeof window === "undefined" ? this : window, function (global, undefined) {
  var document = global.document,
      slice = Array.prototype.slice,
      requestAnimationFrame = global.requestAnimationFrame || global.mozRequestAnimationFrame || global.webkitRequestAnimationFrame || global.msRequestAnimationFrame || function (cb) {
    return setTimeout(cb, 1000 / 60);
  }; // EXPERIMENTAL!!

  /**
   * Simplistic animation function for animating the gauge. That's all!
   * Options are:
   * {
   *  duration: 1,    // In seconds
   *  start: 0,       // The start value
   *  end: 100,       // The end value
   *  step: function, // REQUIRED! The step function that will be passed the value and does something
   *  easing: function // The easing function. Default is easeInOutCubic
   * }
   */


  function Animation(options) {
    var duration = options.duration,
        currentIteration = 1,
        iterations = 60 * duration,
        start = options.start || 0,
        end = options.end,
        change = end - start,
        step = options.step,
        easing = options.easing || function easeInOutCubic(pos) {
      // https://github.com/danro/easing-js/blob/master/easing.js
      if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3);
      return 0.5 * (Math.pow(pos - 2, 3) + 2);
    };

    function animate() {
      var progress = currentIteration / iterations,
          value = change * easing(progress) + start; // console.log(progress + ", " + value);

      step(value, currentIteration);
      currentIteration += 1;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    } // start!


    requestAnimationFrame(animate);
  }

  var Gauge = function () {
    var SVG_NS = "http://www.w3.org/2000/svg";
    var GaugeDefaults = {
      centerX: 50,
      centerY: 50
    };
    var defaultOptions = {
      dialRadius: 40,
      dialStartAngle: 135,
      dialEndAngle: 45,
      value: 0,
      max: 100,
      min: 0,
      valueDialClass: "value",
      valueClass: "value-text",
      dialClass: "dial",
      gaugeClass: "gauge",
      showValue: true,
      gaugeColor: null,
      label: function (val) {
        return Math.round(val);
      }
    };

    function shallowCopy() {
      var target = arguments[0],
          sources = slice.call(arguments, 1);
      sources.forEach(function (s) {
        for (var k in s) {
          if (s.hasOwnProperty(k)) {
            target[k] = s[k];
          }
        }
      });
      return target;
    }
    /**
     * A utility function to create SVG dom tree
     * @param {String} name The SVG element name
     * @param {Object} attrs The attributes as they appear in DOM e.g. stroke-width and not strokeWidth
     * @param {Array} children An array of children (can be created by this same function)
     * @return The SVG element
     */


    function svg(name, attrs, children) {
      var elem = document.createElementNS(SVG_NS, name);

      for (var attrName in attrs) {
        elem.setAttribute(attrName, attrs[attrName]);
      }

      if (children) {
        children.forEach(function (c) {
          elem.appendChild(c);
        });
      }

      return elem;
    }
    /**
     * Translates percentage value to angle. e.g. If gauge span angle is 180deg, then 50%
     * will be 90deg
     */


    function getAngle(percentage, gaugeSpanAngle) {
      return percentage * gaugeSpanAngle / 100;
    }

    function normalize(value, min, limit) {
      var val = Number(value);
      if (val > limit) return limit;
      if (val < min) return min;
      return val;
    }

    function getValueInPercentage(value, min, max) {
      var newMax = max - min,
          newVal = value - min;
      return 100 * newVal / newMax; // var absMin = Math.abs(min);
      // return 100 * (absMin + value) / (max + absMin);
    }
    /**
     * Gets cartesian co-ordinates for a specified radius and angle (in degrees)
     * @param cx {Number} The center x co-oriinate
     * @param cy {Number} The center y co-ordinate
     * @param radius {Number} The radius of the circle
     * @param angle {Number} The angle in degrees
     * @return An object with x,y co-ordinates
     */


    function getCartesian(cx, cy, radius, angle) {
      var rad = angle * Math.PI / 180;
      return {
        x: Math.round((cx + radius * Math.cos(rad)) * 1000) / 1000,
        y: Math.round((cy + radius * Math.sin(rad)) * 1000) / 1000
      };
    } // Returns start and end points for dial
    // i.e. starts at 135deg ends at 45deg with large arc flag
    // REMEMBER!! angle=0 starts on X axis and then increases clockwise


    function getDialCoords(radius, startAngle, endAngle) {
      var cx = GaugeDefaults.centerX,
          cy = GaugeDefaults.centerY;
      return {
        end: getCartesian(cx, cy, radius, endAngle),
        start: getCartesian(cx, cy, radius, startAngle)
      };
    }
    /**
     * Creates a Gauge object. This should be called without the 'new' operator. Various options
     * can be passed for the gauge:
     * {
     *    dialStartAngle: The angle to start the dial. MUST be greater than dialEndAngle. Default 135deg
     *    dialEndAngle: The angle to end the dial. Default 45deg
     *    radius: The gauge's radius. Default 400
     *    max: The maximum value of the gauge. Default 100
     *    value: The starting value of the gauge. Default 0
     *    label: The function on how to render the center label (Should return a value)
     * }
     * @param {Element} elem The DOM into which to render the gauge
     * @param {Object} opts The gauge options
     * @return a Gauge object
     */


    return function Gauge(elem, opts) {
      opts = shallowCopy({}, defaultOptions, opts);
      var gaugeContainer = elem,
          limit = opts.max,
          min = opts.min,
          value = normalize(opts.value, min, limit),
          radius = opts.dialRadius,
          displayValue = opts.showValue,
          startAngle = opts.dialStartAngle,
          endAngle = opts.dialEndAngle,
          valueDialClass = opts.valueDialClass,
          valueTextClass = opts.valueClass,
          valueLabelClass = opts.valueLabelClass,
          dialClass = opts.dialClass,
          gaugeClass = opts.gaugeClass,
          gaugeColor = opts.color,
          gaugeValueElem,
          gaugeValuePath,
          label = opts.label,
          viewBox = opts.viewBox,
          instance;

      if (startAngle < endAngle) {
        console.log("WARN! startAngle < endAngle, Swapping");
        var tmp = startAngle;
        startAngle = endAngle;
        endAngle = tmp;
      }

      function pathString(radius, startAngle, endAngle, largeArc) {
        var coords = getDialCoords(radius, startAngle, endAngle),
            start = coords.start,
            end = coords.end,
            largeArcFlag = typeof largeArc === "undefined" ? 1 : largeArc;
        return ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y].join(" ");
      }

      function initializeGauge(elem) {
        gaugeValueElem = svg("text", {
          x: 50,
          y: 50,
          fill: "#999",
          "class": valueTextClass,
          "font-size": "100%",
          "font-family": "sans-serif",
          "font-weight": "normal",
          "text-anchor": "middle",
          "alignment-baseline": "middle",
          "dominant-baseline": "central"
        });
        gaugeValuePath = svg("path", {
          "class": valueDialClass,
          fill: "none",
          stroke: "#666",
          "stroke-width": 2.5,
          d: pathString(radius, startAngle, startAngle) // value of 0

        });
        var angle = getAngle(100, 360 - Math.abs(startAngle - endAngle));
        var flag = angle <= 180 ? 0 : 1;
        var gaugeElement = svg("svg", {
          "viewBox": viewBox || "0 0 100 100",
          "class": gaugeClass
        }, [svg("path", {
          "class": dialClass,
          fill: "none",
          stroke: "#eee",
          "stroke-width": 2,
          d: pathString(radius, startAngle, endAngle, flag)
        }), gaugeValueElem, gaugeValuePath]);
        elem.appendChild(gaugeElement);
      }

      function updateGauge(theValue, frame) {
        var val = getValueInPercentage(theValue, min, limit),
            // angle = getAngle(val, 360 - Math.abs(endAngle - startAngle)),
        angle = getAngle(val, 360 - Math.abs(startAngle - endAngle)),
            // this is because we are using arc greater than 180deg
        flag = angle <= 180 ? 0 : 1;

        if (displayValue) {
          gaugeValueElem.textContent = label.call(opts, theValue);
        }

        gaugeValuePath.setAttribute("d", pathString(radius, startAngle, angle + startAngle, flag));
      }

      function setGaugeColor(value, duration) {
        var c = gaugeColor(value),
            dur = duration * 1000,
            pathTransition = "stroke " + dur + "ms ease"; // textTransition = "fill " + dur + "ms ease";

        gaugeValuePath.style = ["stroke: " + c, "-webkit-transition: " + pathTransition, "-moz-transition: " + pathTransition, "transition: " + pathTransition].join(";");
        /*
        gaugeValueElem.style = [
          "fill: " + c,
          "-webkit-transition: " + textTransition,
          "-moz-transition: " + textTransition,
          "transition: " + textTransition,
        ].join(";");
        */
      }

      instance = {
        setMaxValue: function (max) {
          limit = max;
        },
        setValue: function (val) {
          value = normalize(val, min, limit);

          if (gaugeColor) {
            setGaugeColor(value, 0);
          }

          updateGauge(value);
        },
        setValueAnimated: function (val, duration) {
          var oldVal = value;
          value = normalize(val, min, limit);

          if (oldVal === value) {
            return;
          }

          if (gaugeColor) {
            setGaugeColor(value, duration);
          }

          Animation({
            start: oldVal || 0,
            end: value,
            duration: duration || 1,
            step: function (val, frame) {
              updateGauge(val, frame);
            }
          });
        },
        getValue: function () {
          return value;
        }
      };
      initializeGauge(gaugeContainer);
      instance.setValue(value);
      return instance;
    };
  }();

  return Gauge;
});
},{}],"c5d792f7cac03ef65de30cc0fbb2cae7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SearchView extends _view.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_parentEl", document.querySelector(".search"));
  }

  getQuery() {
    const query = this._parentEl.querySelector(".search__field").value;

    this._clearInput();

    return query;
  }

  _clearInput() {
    this._parentEl.querySelector(".search__field").value = "";
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

}

var _default = new SearchView();

exports.default = _default;
},{"./view.js":"6a3957d8744bf1d70b2b44f3726dda59"}],"6a99379ebb973230e3a06e0ffca5a1df":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SidenavView extends _view.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_parentElement", document.querySelector(".side-nav"));

    _defineProperty(this, "_activeMenuElement", this._parentElement.querySelector(".side-nav__item--active"));
  }

  getActiveMenu() {
    const activeMenu = this._activeMenuElement.dataset.menu;
    return activeMenu;
  }

  _updateActiveMenu(element) {
    this._activeMenuElement.classList.remove("side-nav__item--active");

    element.classList.add("side-nav__item--active");
    this._activeMenuElement = element;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", e => {
      if (e.target.closest(".side-nav__item")) {
        const targetEle = e.target.closest(".side-nav__item");

        this._updateActiveMenu(targetEle);
      }

      handler();
    });
  }

}

var _default = new SidenavView();

exports.default = _default;
},{"./view.js":"6a3957d8744bf1d70b2b44f3726dda59"}],"9e1d07cb25d7e22cbff545c01da9197b":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view.js"));

var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _map = /*#__PURE__*/new WeakMap();

var _mapZoomLevel = /*#__PURE__*/new WeakMap();

// Parcel 2
class MapView extends _view.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_parentElement", document.getElementById("map"));

    _map.set(this, {
      writable: true,
      value: void 0
    });

    _mapZoomLevel.set(this, {
      writable: true,
      value: 10
    });
  }

  _destroyMap() {
    if (_classPrivateFieldGet(this, _map)) {
      _classPrivateFieldGet(this, _map).remove();
    }
  }

  renderMap(data) {
    this._destroyMap();

    const {
      lat,
      lng
    } = data.location;
    const coords = [lat, lng];

    _classPrivateFieldSet(this, _map, L.map("map").setView(coords, _classPrivateFieldGet(this, _mapZoomLevel)));

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(_classPrivateFieldGet(this, _map));

    this._renderMapMarker(coords, data.city, data.country, data.current.icon);
  }

  hideMap() {
    this._parentElement.style.opacity = 0;
    this._parentElement.style.zIndex = -30;
  }

  showMap() {
    this._parentElement.style.opacity = 1;
    this._parentElement.style.zIndex = 30;
  }

  _renderMapMarker(coords, city, country, icon) {
    const popup = `
      <svg class="popup_icon">
        <use href="${_icons.default}#icon-${icon}"></use>
      </svg>
      <div class="popup_location">${city}, ${country}</div>
    `;
    L.marker(coords).addTo(_classPrivateFieldGet(this, _map)).bindPopup(L.popup({
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false
    })).setPopupContent(popup).openPopup();
  }

}

var _default = new MapView();

exports.default = _default;
},{"./view.js":"6a3957d8744bf1d70b2b44f3726dda59","url:../../img/icons.svg":"b03a103b798a8aab4c0c56ff31cee7f9"}]},{},["1af3afb847b173c466651e24124cd8a8","684bda6a4d515a4b12d20f73f5ac084a","175e469a7ea7db1c8c0744d04372621f"], null)

//# sourceMappingURL=controller.3e852e71.js.map
