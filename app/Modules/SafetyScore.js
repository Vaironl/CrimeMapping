

angular.module('SafetyScoreData',[])
    .factory('SafetyScoreData',function($http){

    var SafetyScoreData = {};
    var crimes = [];
    var heatMapData = [];

    //variables for user preference selections
    var cat1Factor = 1.0;
    var cat2Factor = 1.0;
    var cat3Factor = 1.0;
    var cat4Factor = 1.0;

    // start and end dates of the period of observation should include all crimes.
    var startDate = "2017-01-01";
    var endDate = "2018-01-01";

    const CRITICAL_RADIUS = 150;

    SafetyScoreData.loadData = function(data){
        crimes= data;
        heatMapData = createCrimePoints();
    }

    SafetyScoreData.getCrimePoints = function(filter = null){
            return heatMapData;
    }

    function createCrimePoints ()
    {
        var googleMapsPoints = [];
        //console.log(crimes);
        //console.log(crimes.length);
        for (var i = 0; i < crimes.length; i++)
        {
            //console.log("crime number: " + i );
            var weight = scaleCrime(crimes[i]);
            if (weight > 0.0 )
            {
                var loc = {
                    location: new google.maps.LatLng(crimes[i].lat, crimes[i].lng),
                    weight: weight
                };
                googleMapsPoints.push(loc);
            }
        }
        console.log("number of crime points in heatmap is: " + googleMapsPoints.length);
        return googleMapsPoints;
    }

    SafetyScoreData.getLocSafetyScore = function(originPoint)
    {
        var cat1CrimeCount = 0;
        var cat2CrimeCount = 0;
        var cat3CrimeCount = 0;
        var cat4CrimeCount = 0;
        var totalInRadius = 0;
        var SafetyScore = 0.0;
        //console.log("origin: " + originPoint.toString());
        for (var i = 0 ; i < this.crimes.length; i++){
            let toPoint = new google.maps.LatLng(this.crimes[i].lat, arrayOfCrimes[i].lng);
            // console.log("toPoint: " + toPoint.toString());
            if (isInRadius(originPoint, toPoint))
            {
                var scaledScore = scaleCrime(this.crimes[i]);
                SafetyScore += scaledScore;
                if (scaledScore > 0.00) {
                    totalInRadius++;
                    switch (this.crimes[i].crimeCat) {
                        case 1:
                            cat1CrimeCount++;
                            break;
                        case 2:
                            cat3CrimeCount++;
                            break;
                        case 3:
                            cat3CrimeCount++;
                            break;
                        case 4:
                            cat4CrimeCount++;
                            break;
                    }
                }
            }
        }
        let avg =  0;
        if (totalInRadius != 0)
            avg = (SafetyScore/totalInRadius).toFixed(2);

        return {SafetyScore: (SafetyScore*0.1).toFixed(2), avgCrime: avg, count1: cat1CrimeCount, count2: cat2CrimeCount,
            count3: cat3CrimeCount, count4: cat4CrimeCount};
    }



    function isInRadius(originPoint, targetPoint){
        var distance = google.maps.geometry.spherical.computeDistanceBetween(originPoint, targetPoint);
        return distance <= CRITICAL_RADIUS;
    }

    function scaleCrime(crime)
    {
        var scaledScore = crime.severity * getUserPreferenc(crime.crimeCat) * getAgeMultiple(crime.date);
        if (scaledScore <= 10.00){
            return scaledScore;
        }
        else {
            return 10.00;
        }
    }

        function getAgeMultiple(crimeDate)
        {
            var dateOfCrime = new Date(crimeDate);
            var endDateOfIntrest = new Date(endDate);
            var startDateOfIntrest = new Date(startDate);
            //console.log("crime date: " + dateOfCrime + " end : " + endDateOfIntrest +" start: " + startDateOfIntrest);

            if (dateOfCrime === endDateOfIntrest)
            {
                return 1;
            }
            else
            {
                if ((startDateOfIntrest > dateOfCrime)  || (endDateOfIntrest < dateOfCrime))
                {
                    return 0;
                }
                else
                {
                    var crimeDaysTillEndOfIntrest = endDateOfIntrest-dateOfCrime;
                    var spanOfIntrest = endDateOfIntrest-startDateOfIntrest;
                    return (1 - (crimeDaysTillEndOfIntrest / spanOfIntrest));
                }
            }
        }

        function getUserPreferenc(crimeCat)
        {
            var userMultiple = 1;
            switch(crimeCat)
            {
                case 1:
                {
                    userMultiple = cat1Factor;
                    break;
                }
                case 2:
                {
                    userMultiple = cat2Factor;
                    break;
                }
                case 3:
                {
                    userMultiple = cat3Factor;
                    break;
                }
                case 4:
                {
                    userMultiple = cat4Factor;
                    break;
                }
                default:
                {
                    userMultiple = 0.0;
                }

            }
            return userMultiple;
        }

    function pullCrimeData(){
        // Perform an AJAX call to get all of the records in the db.

    }

    console.log('Creating SafetyScoreData Factory');
    return SafetyScoreData;
});
/*

    Private getDistanceFactor(crime){ need a good mathematical function for this}
    Private getTimeFactor(crime){see above}


        getFilteredResults(filter){
            Let filteredResults = [];
            for(each crime in query){
                if(crime.category === filter){
                    filteredResults.push(crime);
                }
            }
            Return filteredResults;
        }


*/