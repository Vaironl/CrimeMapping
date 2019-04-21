//import * as crimes2 from "express";

let safetyScore = angular.module('SafetyScoreData',[])
    .factory('SafetyScoreData',function($http){

    let SafetyScoreData = {};
    let crimes = [];
    let heatMapData = [];

    //Constant variables used to choose dataset.
    const crimesCollection ="Crimes";
    const crimesDemoCollection = "crimesDemo";

    // Currently selected Collection - default is Crimes.
    let collectionChoice ='Crimes';

    //variables for user preference selections
    let cat1Factor = 1.0;
    let cat2Factor = 1.0;
    let cat3Factor = 1.0;
    let cat4Factor = 1.0;
    let cat5Factor = 1.0;

    // start and end dates of the period of observation
        // should include all crimes.
    let startDate = "2017-01-01";
    let endDate = "2018-01-01";

    const CRITICAL_RADIUS = 150;

        function setEasterEgg(demoBool) {
            if (demoBool === true) {
                collectionChoice = crimesDemoCollection;
                $http.get(collectionChoice).then(function (response) {
                    crimes = response.data;
                    startDate = "2019-12-01";
                    endDate = "2020-01-02";
                }, function (error) {
                    console.log("This is an error: ", error);

                });


            } else{
                startDate = "2017-01-01";
                endDate = "2018-01-01";
                collectionChoice =crimesCollection;
                $http.get(collectionChoice).then(function (response) {
                    crimes = response.data;
                }, function (error) {
                    console.log("This is an error: ", error);

                });

            }
        }

    SafetyScoreData.getCollection =  function getCollection(){
        return collectionChoice;
    }

    //Public Functions
    SafetyScoreData.loadData = function (data) {
        crimes = data;
        heatMapData = createCrimePoints();
    }

    SafetyScoreData.getStartDate = function (){
        return startDate;
    }

    SafetyScoreData.getEndDate = function (){
        return endDate;
    }

    // enter dates as strings yyyy-mm-dd
    SafetyScoreData.setDateRange = function (newStart, newEnd){
        setStartDate(newStart);
        setEndDate(newEnd);
        heatMapData = createCrimePoints();
    }

    SafetyScoreData.getCrimePoints = function(filter = null){
        return heatMapData;
    }

    SafetyScoreData.setCrimeFilter = function filterCrime(c){
        setFilter(c);
        heatMapData = createCrimePoints();
    }

    SafetyScoreData.getLocSafetyScore =  function(originPoint)
    {
        let cat1CrimeCount = 0;
        let cat2CrimeCount = 0;
        let cat3CrimeCount = 0;
        let cat4CrimeCount = 0;
        let totalInRadius = 0;
        let SafetyScore = 0.0;
        //console.log("origin: " + originPoint.toString());
        for (let i = 0 ; i < crimes.length; i++){
            let toPoint = new google.maps.LatLng(crimes[i].lat, crimes[i].lng);
            // console.log("toPoint: " + toPoint.toString());
            if (isInRadius(originPoint, toPoint))
            {
                let scaledScore = scaleCrime(crimes[i]) * getDistancescalar(originPoint, toPoint);
                SafetyScore += scaledScore;
                if (scaledScore > 0.00) {
                    totalInRadius++;
                    switch (crimes[i].crimeCat) {
                        case 1:
                            cat1CrimeCount++;
                            break;
                        case 2:
                            cat2CrimeCount++;
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
        if (totalInRadius !== 0) {
            avg = (SafetyScore / totalInRadius).toFixed(2);
        }

        return {SafetyScore: (SafetyScore*0.1).toFixed(2),
            avgCrime: avg,
            count1: cat1CrimeCount,
            count2: cat2CrimeCount,
            count3: cat3CrimeCount, count4: cat4CrimeCount};
    }

    //Private Functions
    function createCrimePoints ()
    {
        let googleMapsPoints = [];

        for (let i = 0; i < crimes.length; i++)
        {
            let weight = scaleCrime(crimes[i]);
            if (weight > 0.0 )
            {
                let loc = {
                    location: new google.maps.LatLng(crimes[i].lat, crimes[i].lng),
                    weight: weight
                };
                googleMapsPoints.push(loc);
            }
        }
        console.log("number of crime points in heatmap is: " + googleMapsPoints.length);
        return googleMapsPoints;
    }

    function isInRadius(originPoint, targetPoint){
        let distance = google.maps.geometry.spherical.computeDistanceBetween(originPoint, targetPoint);
        return distance <= CRITICAL_RADIUS;
    }

    function scaleCrime(crime)
    {
        let scaledScore = crime.severity * getUserPreferenc(crime.crimeCat) * getAgeMultiple(crime.date);
        if (scaledScore <= 10.00){
            return scaledScore;
        }
        else {
            return 10.00;
        }
    }

    function getAgeMultiple(crimeDate)
    {
        let dateOfCrime = new Date(crimeDate);
        let endDateOfIntrest = new Date(endDate);
        let startDateOfIntrest = new Date(startDate);

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
                let crimeDaysTillEndOfIntrest = endDateOfIntrest-dateOfCrime;
                let spanOfIntrest = endDateOfIntrest-startDateOfIntrest;
                return (1 - (crimeDaysTillEndOfIntrest / spanOfIntrest));
            }
        }
    }

    function getUserPreferenc(crimeCat)
    {
        let userMultiple = 1;
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

    function setFilter(categoryNumber){
        switch(categoryNumber)
        {
            case 1:
            {
                if(cat1Factor == 0)
                    cat1Factor = 1.0;
                else cat1Factor = 0;
                break;
            }
            case 2:
            {
                if(cat2Factor == 0)
                    cat2Factor = 1.0;
                else cat2Factor = 0;
                break;
            }
            case 3:
            {
                if(cat3Factor == 0)
                    cat3Factor = 1.0;
                else cat3Factor = 0;
                break;
            }
            case 4:
            {
                if(cat4Factor == 0)
                    cat4Factor = 1.0;
                else cat4Factor = 0;
                break;
            }
            //case 5 is demo data
            case 5: {
                if(cat5Factor == 0) {
                    cat5Factor = 1.0;
                    setEasterEgg(true);
                    heatMapData = createCrimePoints();
                    break;
                }
                else {
                    cat5Factor = 0.0;
                    setEasterEgg(true);
                    break;
                }
             }
            default:
            {}
        }
    }

    function setStartDate(newStart){
        startDate = newStart;
    }

    function setEndDate(newEnd){
        endDate = newEnd;
    }

    function getDistancescalar(from, to){
        return 1 - google.maps.geometry.spherical.computeDistanceBetween(from, to) / CRITICAL_RADIUS;
    }





    return SafetyScoreData;
});
