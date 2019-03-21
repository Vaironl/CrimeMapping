/**
 * Test code for class DistanceFactor
 *
 *
 */
class Test_DistanceFactor {
    static calcDistanceFactor() {
        // coordinate of a Crime in units of degrees
        let crime = new Point(37.09194444, -75.58388889);
        // coordinate of a point in units of degrees
        let point = new Point(39.30055556, -75.37166667);

        let angleFromCrime = DistanceFactor.calcAngleBetween(crime.lat, crime.lng, point.x, point.y);

        let experimental = DistanceFactor.calcBellCurveDistanceFactor(angleFromCrime);
        let theoretical = 0.8;
        let percentError = Math.abs(experimental - theoretical) / theoretical;
        let maxAcceptableError = theoretical * 1.01;
        let minAcceptableError = theoretical * 0.99;
        let passed = percentError < maxAcceptableError && percentError > minAcceptableError;

        return passed
    }

    /**
     * @description Tests the function DistanceFactor.calcAngleBetween()
     *
     * @returns {boolean} - returns true if DistanceFactor.calcAngleBetween() is within 1% of the true distance
     *                      between the two points
     */
    static calcAngleBetween() {
        // coordinate of a Crime in units of degrees
        let crime = new Point(37.09194444, -75.58388889);
        // coordinate of a point in units of degrees
        let point = new Point(39.30055556, -75.37166667);

        // calculate the angle between crime and point
        let experimental = DistanceFactor.calcAngleBetween(crime.x, crime.y, point.y, point.y);
        let theoretical = 2.2017354387721393;

        // Is this approximation accurate enough? (iow: (in other words) is it less than 1% of the true value
        let percentError = Math.abs(experimental - theoretical) / theoretical;
        let maxAcceptableError = theoretical * 1.01;
        let minAcceptableError = theoretical * 0.99;

        return dist < maxAcceptableError && dist > minAcceptableError;
    }

    static calcLinearDistanceFactor() {
        // Calculate the Bell Curve Distance Factor (should return 1 for a distance of 0)
        let experimental0 = DistanceFactor.calcLinearDistanceFactor(2, 10);
        let theoretical0 = 0.8;
        let percentError0 = Math.abs(experimental0 - theoretical0) / theoretical0;
        let maxAcceptableError0 = theoretical0 * 1.01;
        let minAcceptableError0 = theoretical0 * 0.99;
        let passed0 = percentError0 < maxAcceptableError0 && percentError0 > minAcceptableError0;

        // Calculate the Bell Curve Distance Factor (should return 0.60653065971 for a distance of 1)
        let experimental1 = DistanceFactor.calcLinearDistanceFactor(11, 10);
        let theoretical1 = 0;
        let percentError1 = Math.abs(experimental1 - theoretical1) / theoretical1;
        let maxAcceptableError1 = theoretical1 * 1.01;
        let minAcceptableError1 = theoretical1 * 0.99;
        let passed1 = percentError1 < maxAcceptableError1 && percentError1 > minAcceptableError1;

        return passed0 && passed1;
    }

    static calcInverseDistanceFactor() {
        // Calculate the Bell Curve Distance Factor (should return 1 for a distance of 0)
        let experimental0 = DistanceFactor.calcInverseDistanceFactor(5);
        let theoretical0 = 1.0 / 6.0;
        let percentError0 = Math.abs(experimental0 - theoretical0) / theoretical0;
        let maxAcceptableError0 = theoretical0 * 1.01;
        let minAcceptableError0 = theoretical0 * 0.99;
        let passed0 = percentError0 < maxAcceptableError0 && percentError0 > minAcceptableError0;

        // Calculate the Bell Curve Distance Factor (should return 0.60653065971 for a distance of 1)
        let experimental1 = DistanceFactor.calcInverseDistanceFactor(0);
        let theoretical1 = 1;
        let percentError1 = Math.abs(experimental1 - theoretical1) / theoretical1;
        let maxAcceptableError1 = theoretical1 * 1.01;
        let minAcceptableError1 = theoretical1 * 0.99;
        let passed1 = percentError1 < maxAcceptableError1 && percentError1 > minAcceptableError1;

        return passed0 && passed1;
    }

    static calcBellCurveDistanceFactor() {
        // Calculate the Bell Curve Distance Factor (should return 1 for a distance of 0)
        let experimental0 = DistanceFactor.calcBellCurveDistanceFactor(0);
        let theoretical0 = 1;
        let percentError0 = Math.abs(experimental0 - theoretical0) / theoretical0;
        let maxAcceptableError0 = theoretical0 * 1.01;
        let minAcceptableError0 = theoretical0 * 0.99;
        let passed0 = percentError0 < maxAcceptableError0 && percentError0 > minAcceptableError0;

        // Calculate the Bell Curve Distance Factor (should return 0.60653065971 for a distance of 1)
        let experimental1 = DistanceFactor.calcBellCurveDistanceFactor(1);
        let theoretical1 = 0.60653065971
        let percentError1 = Math.abs(experimental1 - theoretical1) / theoretical1;
        let maxAcceptableError1 = theoretical1 * 1.01;
        let minAcceptableError1 = theoretical1 * 0.99;
        let passed1 = percentError1 < maxAcceptableError1 && percentError1 > minAcceptableError1;

        return passed0 && passed1;
    }
}

