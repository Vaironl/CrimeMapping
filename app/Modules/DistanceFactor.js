/**
 */

function calcDistanceFactor(crime, point) {

}

/**
 * Calculates the distance factor of a crime based on the linear distance.
 * Crimes with a distance of 0 have a factor of 1
 * Crimes with a distance of distanceFromCrime or greater have a factor of 0
 * Crimes in between have a factor of -distanceFromCrime / cutoffDistance + 1
 *
 * See link for a graphical representation of the distance factor https://www.desmos.com/calculator/qosbo4ty35
 *
 * @param distanceFromCrime -           Distance that a point is from a crime. (Make sure this is >= 0)
 * @param {number} cutoffDistance -     Max distance that is relevance. Distances greater than
 *                                      cutoffDistance have a factor of 0
 * @returns {number}                    distance factor : range is [0, 1]
 */
function calcLinearDistanceFactor(distanceFromCrime, cutoffDistance) {
    if (distanceFromCrime < cutoffDistance) {
        return - distanceFromCrime / cutoffDistance + 1
    }
    else {
        return 0;
    }
}

/**
 * Calculates the distance factor of a crime based on the inverse of the distance.
 * Crimes with a distance of 0 have a factor of 1
 * Crimes with a distance of distanceFromCrime or greater have a factor of 0
 * Crimes in between have a factor of 1 / (distanceFromCrime + 1)
 *
 * @param {number} distanceFromCrime    Distance that a point is from a crime. (Make sure this is >= 0)
 * @returns {number}                    distance factor : range is [0, 1]
 */
function calcInverseDistanceFactor(distanceFromCrime) {
    return 1 / (distanceFromCrime + 1);
}

function calcBellCurveDistanceFactor(distanceFromCrime) {
    //let peakOfBellCurve =
}