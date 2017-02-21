'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = throttleByAnimationFrame;
exports.throttleByAnimationFrameDecorator = throttleByAnimationFrameDecorator;

var _getRequestAnimationFrame = require('../_util/getRequestAnimationFrame');

var _getRequestAnimationFrame2 = _interopRequireDefault(_getRequestAnimationFrame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var reqAnimFrame = (0, _getRequestAnimationFrame2["default"])();
function throttleByAnimationFrame(fn) {
    var threshhold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;

    var last = void 0;
    return function () {
        var self = this;
        var args = arguments;
        reqAnimFrame(function (timestamp) {
            if (!last || timestamp - last > threshhold) {
                last = timestamp;
                fn.apply(self, args);
            }
        });
    };
}
function throttleByAnimationFrameDecorator() {
    var threshhold = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 250;

    return function (target, key, descriptor) {
        var fn = descriptor.value;
        var definingProperty = false;
        return {
            configurable: true,
            get: function get() {
                if (definingProperty || this === target.prototype || this.hasOwnProperty(key)) {
                    return fn;
                }
                var boundFn = throttleByAnimationFrame(fn.bind(this), threshhold);
                definingProperty = true;
                Object.defineProperty(this, key, {
                    value: boundFn,
                    configurable: true,
                    writable: true
                });
                definingProperty = false;
                return boundFn;
            }
        };
    };
}