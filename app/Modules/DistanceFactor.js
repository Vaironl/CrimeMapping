/** Class rep
 * */
class DistanceFactor {
    /**
     * @description Calculates the distance factor between a single Crime and the any single point on the map.
     *              Generally the further the crime from the point, the lower the distance factor.
     *              Crimes infinitely far from the point will always have a distance factor of 0
     *              Crimes located at the point will always have a distance factor of 1
     *
     *              Crimes in between will be between 0 and 1 with a trend of either linear, inverse or bell curve
     *                  depending on the calculation used in the calcDistanceFactor() function. See below functions.
     *
     *              This function is used to calculate the Crime SafteyScore of a point on the map
     *
     * @param {Crime} crime     - crime we are calculating the weight of
     * @param {Point} point     - point that we want to calculate the SafetyScore of
     * @returns {*}             - range [0, 1]
     *
     * See link for a graphical representation of the distance factor
     * @see https://www.desmos.com/calculator/qosbo4ty35
     */
    static calcDistanceFactor(crime, point) {
        let angleFromCrime = this.calcAngleBetween(crime.lat, crime.lng, point.x, point.y);

        return calcBellCurveDistanceFactor(distanceFromCrime);
    }

    /**
     * @description Calculates the angle between two points on the surface of a sphere (~Earth~)
     * Assumes that the radius of the sphere is one unit.
     *
     * @param {Number} lat1 - latitude coordinate of point 1 in units of (degrees)
     * @param {Number} lng1 - longitude coordinate of point 1 in units of (degrees)
     * @param {Number} lat2
     * @param {Number} lng2
     * @returns {number} - angle between two points
     */
    static calcAngleBetween(lat1, lng1, lat2, lng2) {
        let cosA = Math.cos(lng1);
        let cosB = Math.cos(lat1);
        let cosC = Math.cos(lng2);
        let cosD = Math.cos(lat2);

        let sinA = Math.sin(lng1);
        let sinB = Math.sin(lat1);
        let sinC = Math.sin(lng2);
        let sinD = Math.sin(lat2);

        let x1 = cosB * cosA;
        let y1 = cosB * sinA;
        let z1 = sinB;

        let x2 = cosD * cosC;
        let y2 = cosD * sinC;
        let z2 = sinD;

        let dotProduct = x1 * x2 + y1 * y2 + z1 * z2;

        return Math.acos(dotProduct);
    }

    /**
     * @description Calculates the distance factor of a crime based on the linear distance.
     * Crimes with a distance of 0 have a factor of 1
     * Crimes with a distance of cutoffDistance or greater have a factor of 0
     * Crimes in between have a factor of -distanceFromCrime / cutoffDistance + 1
     *
     * @private
     *
     * @param {Number} distanceFromCrime -  Distance that a point is from a crime. (Make sure this is >= 0)
     *                                      Should be in units of angles (ex: deg).
     * @param {Number} cutoffDistance -     Max distance that is relevant. Distances greater than
     *                                      cutoffDistance have a factor of 0
     *                                      Should be in units of angles (ex: deg).
     * @returns {Number}                    distance factor : range is [0, 1]
     * @see https://www.desmos.com/calculator/qosbo4ty35
     */
    static calcLinearDistanceFactor(distanceFromCrime, cutoffDistance) {
        if (distanceFromCrime < cutoffDistance) {
            return -distanceFromCrime / cutoffDistance + 1
        }
        else {
            return 0;
        }
    }

}