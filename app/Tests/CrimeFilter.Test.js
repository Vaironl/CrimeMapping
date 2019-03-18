/*
Purpose:
    This script is intended to be run by CrimeFilter.Test.html and is used to test the CrimeFilter class.
    All outputs of this script are made by console.log()

    To run this test script, open CrimeFilter.Test.html in a web browser and open the console.
    ex: Open 'CrimeFilter.Test.html' in Google Chrome and press ctrl+shift+i to open the console.

    !!!!!!!!!!!!!!!!! NOT FINISHED IMPLEMENTING THIS SCRIPT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */

function generateCrimeArray() {

}

function test_filterByDateRange() {
    let crimes = generateCrimeArray();
}

function test_filterByDayOfWeek() {
    let crimes = generateCrimeArray();
}

function test_filterByDayOfYear() {
    let crimes = generateCrimeArray();
}

function test_filterByTimeOfDay() {
    let crimes = generateCrimeArray();
}

function test_filterByCrimeCategory() {
    let crimes = generateCrimeArray();
}

function test_combination() {
    let crimes = generateCrimeArray();
}

function runAllCrimeTests() {
    console.log("Here are the tests for the CrimeFilter class.");

    let result;

    result = test_filterByDateRange();
    console.log("test_filterByDateRange " + showResult(result));

    result = test_filterByDayOfWeek();
    console.log("test_filterByDayOfWeek " + showResult(result));

    result = test_filterByDayOfYear();
    console.log("test_filterByDayOfYear " + showResult(result));

    result = test_filterByTimeOfDay();
    console.log("test_filterByTimeOfDay " + showResult(result));

    result = test_filterByCrimeCategory();
    console.log("test_filterByCrimeCategory " + showResult(result));

    result = test_combination();
    console.log("test_combination " + showResult(result));

}

function showResult(result) {
    return (result == true ? "successfull" : "failed");
}

// ---------------- Function call -------------------------
runAllCrimeTests();