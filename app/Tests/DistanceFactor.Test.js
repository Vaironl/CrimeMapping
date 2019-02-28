/**
 * Test code for class DistanceFactor
 *
 *
 */
class Test_DistanceFactor {
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
        let percentError = abs(experimental - theoretical) / theoretical;
        let maxAcceptableError = theoretical * 1.01;
        let minAcceptableError = theoretical * 0.99;

        return dist < maxAcceptableError && dist > minAcceptableError;
    }
}