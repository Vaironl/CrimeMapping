/**
 * Test code for class DistanceFactor
 *
 * To run test code: open DistanceFactor.Test.html in Google Chrome and
 * open developer tools (ctrl + shift + i).
 * Comment or uncomment the function calls the the bottom of this file to
 * determine which tests you want to run. See bottom of this file.
 */

import DistanceFactor from "../Modules/DistanceFactor.js"

class Test_DistanceFactor {
    static calcDistanceFactor() {
        // coordinate of a Crime in units of degrees
        let crime = {lat: 37.09194444, lng: -75.58388889};
        // coordinate of a point in units of degrees
        let point = {lat: 39.30055556, lng: -75.37166667};

        let angleFromCrime = DistanceFactor.calcAngleBetween(crime.lat, crime.lng, point.lat, point.lng);

        console.log("Distance between " + this.pointToString(crime)
            + " and " + this.pointToString(point)
            + " equals " + angleFromCrime
            + " deg");

        let experimental = DistanceFactor.calcBellCurveDistanceFactor(angleFromCrime);
        let theoretical = 0.0860449701199;
        let percentError = Math.abs(experimental - theoretical) / theoretical;
        let maxAcceptableError = 0.000001;
        let passed = percentError < maxAcceptableError;

        console.log("experimental = " + experimental
            + "\n theoretical = " + theoretical
            + "\n Percent error = " + percentError
            + "\n maxAcceptableError = " + maxAcceptableError
            + "\n passed = " + passed);

        return passed;
    }

    /**
     * @description Tests the function DistanceFactor.calcAngleBetween()
     *
     * @returns {boolean} - returns true if DistanceFactor.calcAngleBetween() is within 1% of the true distance
     *                      between the two points
     */
    static calcAngleBetween() {
        // coordinate of a Crime in units of degrees
        let crime = {lat: 37.09194444, lng: -75.58388889};
        // coordinate of a point in units of degrees
        let point = {lat: 39.30055556, lng: -75.37166667};

        // calculate the angle between crime and point
        let experimental = DistanceFactor.calcAngleBetween(crime.lat, crime.lng, point.lat, point.lng);
        let theoretical = 2.212551466;

        // Is this approximation accurate enough?
        let percentError = Math.abs(experimental - theoretical) / theoretical;
        let maxAcceptableError = 0.01;

        let passed = percentError < maxAcceptableError;

        console.log("Test calcAngleBetween \n" +
            "experimental = " + experimental + "\n" +
            "theoretical  = " + theoretical + "\n" +
            "percent Error = " + percentError + "\n" +
            "passed = " + passed);

        return passed;
    }

    static calcLinearDistanceFactor() {
        let str = "Calculate Linear Distance Factor\n";

        // Calculate the Linear Distance Factor (should return 1 for a distance of 0)
        let experimental0 = DistanceFactor.calcLinearDistanceFactor(2, 10);
        let theoretical0 = 0.8;
        let percentError0 = Math.abs(experimental0 - theoretical0) / theoretical0;
        let maxAcceptableError0 = 0.01;
        let passed0 = percentError0 < maxAcceptableError0;

        str += "experimental0 = " + experimental0 + "\n"
            + "theoretical0 = " + theoretical0 + "\n"
            + "percentError0 = " + percentError0 + "\n"
            + "passed0 = " + passed0 + "\n\n";

        // Calculate the Linear Distance Factor (should return 0.60653065971 for a distance of 1)
        let experimental1 = DistanceFactor.calcLinearDistanceFactor(11, 10);
        let theoretical1 = 0.0;
        let percentError1 = Math.abs(experimental1 - theoretical1);
        let maxAcceptableError1 = 0.01;
        let passed1 = percentError1 < maxAcceptableError1;

        str += "experimental1 = " + experimental1 + "\n"
            + "theoretical1 = " + theoretical1 + "\n"
            + "percentError1 = " + percentError1 + "\n"
            + "passed1 = " + passed1 + "\n\n";

        console.log(str);
        
        return passed0 && passed1;
    }

    static calcInverseDistanceFactor() {
        let str = "Calculate Inverse Distance Factor\n";
        
        // Calculate the Bell Curve Distance Factor (should return 1 for a distance of 0)
        let experimental0 = DistanceFactor.calcInverseDistanceFactor(5);
        let theoretical0 = 1.0 / 6.0;
        let percentError0 = Math.abs(experimental0 - theoretical0) / theoretical0;
        let maxAcceptableError0 = 0.01;
        let passed0 = percentError0 < maxAcceptableError0;

        str += "experimental0 = " + experimental0 + "\n"
            + "theoretical0 = " + theoretical0 + "\n"
            + "percentError0 = " + percentError0 + "\n"
            + "passed0 = " + passed0 + "\n\n";

        // Calculate the Bell Curve Distance Factor (should return 0.60653065971 for a distance of 1)
        let experimental1 = DistanceFactor.calcInverseDistanceFactor(0);
        let theoretical1 = 1;
        let percentError1 = Math.abs(experimental1 - theoretical1) / theoretical1;
        let maxAcceptableError1 = theoretical1 * 1.01;
        let passed1 = percentError1 < maxAcceptableError1;

        str += "experimental1 = " + experimental1 + "\n"
            + "theoretical1 = " + theoretical1 + "\n"
            + "percentError1 = " + percentError1 + "\n"
            + "passed1 = " + passed1 + "\n\n";

        console.log(str);
        
        return passed0 && passed1;
    }

    static calcBellCurveDistanceFactor() {
        let str = "Calculate Bell Curve Distance Factor\n";

        // Calculate the Bell Curve Distance Factor (should return 1 for a distance of 0)
        let experimental0 = DistanceFactor.calcBellCurveDistanceFactor(0);
        let theoretical0 = 1;
        let percentError0 = Math.abs(experimental0 - theoretical0) / theoretical0;
        let maxAcceptableError0 = theoretical0 * 1.01;
        let passed0 = percentError0 < maxAcceptableError0;

        str += "experimental0 = " + experimental0 + "\n"
            + "theoretical0 = " + theoretical0 + "\n"
            + "percentError0 = " + percentError0 + "\n"
            + "passed0 = " + passed0 + "\n\n";
        
        // Calculate the Bell Curve Distance Factor (should return 0.60653065971 for a distance of 1)
        let experimental1 = DistanceFactor.calcBellCurveDistanceFactor(1);
        let theoretical1 = 0.60653065971
        let percentError1 = Math.abs(experimental1 - theoretical1) / theoretical1;
        let maxAcceptableError1 = theoretical1 * 1.01;
        let passed1 = percentError1 < maxAcceptableError1;

        str += "experimental1 = " + experimental1 + "\n"
            + "theoretical1 = " + theoretical1 + "\n"
            + "percentError1 = " + percentError1 + "\n"
            + "passed1 = " + passed1 + "\n\n";

        console.log(str);

        return passed0 && passed1;
    }

    static pointToString(point) {
        return "(" + point.lat + ", " + point.lng + ")";
    }
}

// ========================== Test Function Calls =============================

console.log("Test Distance Factor");

//Test_DistanceFactor.calcDistanceFactor();             // Passed

//Test_DistanceFactor.calcAngleBetween();               // Passed

//Test_DistanceFactor.calcLinearDistanceFactor();       // Passed

//Test_DistanceFactor.calcInverseDistanceFactor();      // Passed

//Test_DistanceFactor.calcBellCurveDistanceFactor();    // Passed

