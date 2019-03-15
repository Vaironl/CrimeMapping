/** Class rep
 * */
class DistanceFactor {
    /**
     * @description Calculates the distance factor between a single Crime and the any single point on the map.
     *              Generally the further the crime from the point, the lower the distance factor.
     *              Crimes infinitely far from the point will always have a distance factor of 0 or an extremely small number.
     *              Crimes located at the point will always have a distance factor of 1
     *
     *              Crimes in between will be between 0 and 1 with a trend of either linear, inverse or bell curve
     *                  depending on the calculation used in function. See below functions.
     *
     *              This function is used to calculate the Crime SafteyScore of a point on the map
     *
     * @param {Crime} crime     - crime we are calculating the weight of
     * @param {Point} point     - point that we want to calculate the SafetyScore of
     * @returns {Number}        - result will be between 0 and 1
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
     * This calculation is independent of the radius of the sphere (as long as it is > 0).
     *
     * @param {Number} lat1 - latitude coordinate of point 1 in units of degrees (NOT radians)
     * @param {Number} lng1 - longitude coordinate of point 1 in units of degrees (NOT radians)
     * @param {Number} lat2 - latitude coordinate of point 2 in units of degrees (NOT radians)
     * @param {Number} lng2 - longitude coordinate of point 2 in units of degrees (NOT radians)
     * @returns {number} - angle between two points (in degrees)
     */
    static calcAngleBetween(lat1, lng1, lat2, lng2) {
        // 1.) convert to units of radians
        lat1 = this.degToRad(lat1);
        lng1 = this.degToRad(lng1);
        lat2 = this.degToRad(lat2);
        lng2 = this.degToRad(lng2);

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

        // Convert result back to degrees and return
        return this.radToDeg(Math.acos(dotProduct));
    }

    /**
     * @description Calculates the distance factor of a crime based on the linear distance
     * Crimes with a distance of 0 have a factor of 1.
     * Crimes with a distance of cutoffDistance or greater have a factor of 0.
     * Crimes in between have a factor of -distanceFromCrime / cutoffDistance + 1.
     *
     * @param {Number} distanceFromCrime -  Distance that a point is from a crime. (Make sure this is >= 0)
     *                                      Should be in units of degrees.
     * @param {Number} cutoffDistance -     Max distance that is relevant. Distances greater than
     *                                      cutoffDistance have a factor of 0
     *                                      Should be in units of degrees.
     * @returns {Number}                    distance factor : result will be between 0 and 1 degrees
     * @see https://www.desmos.com/calculator/swjdvtkohs
     */
    static calcLinearDistanceFactor(distanceFromCrime, cutoffDistance) {
        if (distanceFromCrime < cutoffDistance) {
            return -distanceFromCrime / cutoffDistance + 1
        }
        else {
            return 0;
        }
    }

    /**
     * @discription Calculates the distance factor of a crime based on the inverse of the distance.
     * Crimes with a distance of 0 have a factor of 1
     * Crimes >= 0 have a factor of 1 / (distanceFromCrime + 1)
     *
     * @param {number} distanceFromCrime    Distance that a point is from a crime. (Make sure this is >= 0)
     *                                      Should be in units of degrees.
     * @returns {number}                    distance factor : result will be between 0 and 1
     * @see https://www.desmos.com/calculator/f6ob5hmn3w
     */
    static calcInverseDistanceFactor(distanceFromCrime) {
        return 1 / (distanceFromCrime + 1);
    }

    /**
     * @description Calculates the distance factor of a crime based on the bell curve of the distance.
     * Crimes with a distance of 0 have a factor of 1
     * Crimes with a greater distance have a factor in the shape of a bell curve
     *
     * @param {Number} distanceFromCrime    Distance that a point is from a crime. (Make sure this is >= 0)
     *                                      Should be in units of degrees.
     * @returns {Number} distanceFactor     distance factor : result will be between 0 and 1
     *
     * @see https://www.desmos.com/calculator/c3atr11svh
     */
    static calcBellCurveDistanceFactor(distanceFromCrime) {
        let sigma = 1.0;    // The larger sigma the flatter the curve

        let power = -(distanceFromCrime ** 2) / (2 * sigma * sigma);

        let coefficient = 1 / (sigma * Math.sqrt(2 * Math.PI));

        let distanceFactor = coefficient * Math.E ** power;

        // Now the peak of the bell curve will probably not be at 1
        // So we need to scale the curve so that it will equal 1 at the peak (when distance equals 0)
        let scalingFactorPower = 0;

        let scalingFactorCoefficient = 1 / (sigma * Math.sqrt(2 * Math.PI));

        let scalingFactor = scalingFactorCoefficient * Math.E ** scalingFactorPower;
        scalingFactor = 1 / scalingFactor;

        return scalingFactor * distanceFactor;
    }

    /**
     *
     * @param {number} angleInDegrees
     * @returns {number}
     */
    static degToRad(angleInDegrees) {
        return angleInDegrees * Math.PI / 180;
    }

    /**
     *
     * @param {number} angleInRadians
     * @returns {number}
     */
    static radToDeg(angleInRadians) {
        return angleInRadians * 180 / Math.PI;
    }
}