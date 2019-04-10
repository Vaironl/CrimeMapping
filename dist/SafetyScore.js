"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAgeMltiple = getAgeMultiple;
exports.ageCrime = ageCrime;
exports.getSafetyScore = getSafetyScore;

var _Crime = _interopRequireDefault(require("/../Classes/Crime.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function getAgeMultiple(crimeDate, startDate, endDate) {
  var d = new Date(crimeDate);
  var e = new Date(endDate);
  var s = new Date(startDate);

  if (d === e) {
    return 1;
  } else {
    if (s - d >= 0 || e - d <= 0) {
      return 0;
    } else {
      return 1 - (e - d) / (e - s);
    }
  }
}

function ageCrime(score, crimeDate, startDate, endDate) {
  return score * getAgeMultiple(crimeDate, startDate, endDate);
}

function getSafetyScore(arrayOfCrimes, startDate, endDate) {
  var SafetyScore = 0;

  for (var i = 0; i < arrayOfCrimes.size(); i++) {
    SafetyScore += arrayOfCrimes[i].severity * getAgeMultiple(arrayOfCrimes[i].date, startDate, endDate);
  }
}
//# sourceMappingURL=SafetyScore.js.map