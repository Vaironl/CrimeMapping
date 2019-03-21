
export function getAgeMultiple(crimeDate, startDate, endDate){
    var d = new Date(crimeDate);
    var e = new Date(endDate);
    var s = new Date(startDate);

    if (d === e)
    {
        return 1;
    }
    else
    {
        if (((s - d) >= 0) || ((e-d)<=0))
        {
            return 0;
        }
        else
        {
            return (1 - Math.round((e-d)/(e-s)));
        }
    }
}

export function ageCrime(score, crimeDate, startDate, endDate) {
    return score * getAgeMultiple(crimeDate, startDate, endDate);
}

export function getSafetyScore(arrayOfCrimes, startDate, endDate)
{
    var i;
    var SafetyScore = 0;
    for (i = 0 ; i < arrayOfCrimes.size(); i++){
     SafetyScore += ageCrime(arrayOfCrimes[i].severity, startDate, endDate);
     }
}