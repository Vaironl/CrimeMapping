"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.storedCrimes = void 0;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var storedCrimes = [];
exports.storedCrimes = storedCrimes;

var Crime =
/*#__PURE__*/
function () {
  _createClass(Crime, [{
    key: "id",
    get: function get() {
      return this._id;
    }
  }, {
    key: "crimeCat",
    get: function get() {
      return this._crimeCat;
    }
  }, {
    key: "desc",
    get: function get() {
      return this._desc;
    }
  }, {
    key: "date",
    get: function get() {
      return this._date;
    }
  }, {
    key: "time",
    get: function get() {
      return this._time;
    }
  }, {
    key: "offenses",
    get: function get() {
      return this._offenses;
    }
  }, {
    key: "severity",
    get: function get() {
      return this._severity;
    }
  }, {
    key: "lat",
    get: function get() {
      return this._lat;
    }
  }, {
    key: "lng",
    get: function get() {
      return this._lng;
    }
  }]);

  function Crime(_id, crimeCat, desc, date, time, offenses, severity, lat, lng) {
    _classCallCheck(this, Crime);

    this._id = _id;
    this._crimeCat = crimeCat;
    this._desc = desc;
    this._date = date;
    this._time = time;
    this._offenses = offenses;
    this._severity = severity;
    this._lat = lat;
    this._lng = lng;
  }

  return Crime;
}();

exports.default = Crime;
//# sourceMappingURL=Crime.js.map