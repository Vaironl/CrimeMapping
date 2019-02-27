/**
 *
 */
class DistanceFactor {
    /**
     * @description
     *
     * @param {Crime} crime     - crime we are calculating the weight of
     * @param {Point} point     - point that we want to calculate the SafetyScore of
     * @returns {Number}        - range [0, 1]
     *
     * See link for a graphical representation of the distance factor
     * @see https://www.desmos.com/calculator/qosbo4ty35
     */
    static calcDistanceFactor(crime, point) {
        let distanceFromCrime = calcDistanceBetween(crime.lat, crime.lng, point.x, point.y);

        calcBellCurveDistanceFactor(distanceFromCrime);
    }

    /**
     * @description Calculates the angle between two points on the surface of a sphere (~Earth~)
     * Assumes that the radius of the sphere is one unit.
     *
     *
     * @param {Number} lat1 - latitude coordinate of point 1 in units of (degrees)
     * @param {Number} lng1 - longitude coordinate of point 1 in units of (degrees)
     * @param {Number} lat2
     * @param {Number} lng2
     * @returns {number} - angle between two points
     */
    static calcDistanceBetween(lat1, lng1, lat2, lng2) {
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
     * Crimes with a distance of distanceFromCrime or greater have a factor of 0
     * Crimes in between have a factor of -distanceFromCrime / cutoffDistance + 1
     *
     * @param {Number} distanceFromCrime -  Distance that a point is from a crime. (Make sure this is >= 0)
     *                                      Unit can be in angle or distance.
     * @param {Number} cutoffDistance -     Max distance that is relevance. Distances greater than
     *                                      cutoffDistance have a factor of 0
     *                                      Unit must be same as @param distanceFromCrime
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

    /**
     * @discription Calculates the distance factor of a crime based on the inverse of the distance.
     * Crimes with a distance of 0 have a factor of 1
     * Crimes with a distance of distanceFromCrime or greater have a factor of 0
     * Crimes in between have a factor of 1 / (distanceFromCrime + 1)
     *
     * @param {number} distanceFromCrime    Distance that a point is from a crime. (Make sure this is >= 0)
     *                                      Unit can be in angle or distance.
     * @returns {number}                    distance factor : range is [0, 1]
     * @see https://www.desmos.com/calculator/qosbo4ty35
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
     *                                      Unit can be in angle or distance.
     * @returns {Number} distanceFactor     distance factor : range is [0, 1]
     *
     * @see https://www.desmos.com/calculator/qosbo4ty35
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
}