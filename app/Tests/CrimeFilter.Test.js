/**
Purpose:
    This script is intended to be run by CrimeFilter.Test.html and is used to test the CrimeFilter class.
    All outputs of this script are made by console.log()

    To run this test script, open CrimeFilter.Test.html in a web browser and open the developer console.

    ex:
        Open 'CrimeFilter.Test.html' in Google Chrome and press ctrl+shift+i to open the console.

 <script type="module" src="../Classes/Crime.js"></script>
 <script src="CrimeFilter.Test.js" defer></script>

 !!!!!!!!!!!!!!!!! NOT FINISHED IMPLEMENTING THIS SCRIPT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */

import Crime from "../Classes/Crime.js";
import CrimeFilter from "../Modules/CrimeFilter.js";

export default class Test_CrimeFilter {
    /**
     * Creates a list of Crime objects and returns that list
     *
     * @returns {Crime[]} - A list of Crime objects
     */
    static generateCrimeArray() {
        /*  _id,
            crimeCat,
            desc,
            date,
            time,
            offenses,       // <-- Not implemented in CrimeFilter class
            severity,       // <-- Not implemented in CrimeFilter class
            lat,
            lng,
            */
        let crimes = [
            /*          _id,      crimeCat, desc,                    date,                         [offenses],                       severity,   lat,           lng)          */
            new Crime("17-ODU-00001", 2, "2 offense(s)",      new Date(2017, 0, 1, 0,  3 ), ["Trespassing", "Curfew Violation"], 2.25, 36.8812993, -76.3008585),
            new Crime("17-ODU-00002", 3, "1 offense(s)Ave",   new Date(2017, 0, 1, 2,  0 ), ["Assault"], 4, 36.8838047, -76.2944879),
            new Crime("17-ODU-00006", 2, "1 offense(s)Blvd",  new Date(2017, 0, 3, 7,  30), ["Trespassing"], 2, 36.8843062, -76.3053596),
            new Crime("17-ODU-00007", 2, "1 offense(s)40th ", new Date(2017, 0, 3, 18, 22), ["Larceny", "Electronics"], 2, 36.8812993, -76.3008585),
            new Crime("17-ODU-00008", 4, "1 offense(s)Ave, ", new Date(2017, 0, 2, 18, 0 ), ["Motor Vehicle Crash", "Hit and Run"], 8, 36.8872553, -76.2978136),
            new Crime("17-ODU-00009", 2, "1 offense(s)Ave ",  new Date(2016, 11, 23, 11, 30), ["Auto Theft"], 2, 36.8823516, -76.3124169),
            new Crime("17-ODU-00010", 2, "1 offense(s) at ",  new Date(2017, 0, 3, 7,  30), ["Destruction of Property"], 2, 36.8886532, -76.2951269),
            new Crime("17-ODU-00011", 0, "1 offense(s) at ",  new Date(2017, 0, 5, 4,  4 ), ["Served", "Warrant"], 0, 36.8869571, -76.3076877),
            new Crime("17-ODU-00012", 4, "1 offense(s)Ave,",  new Date(2017, 0, 4, 22, 30), ["Motor Vehicle Crash", "Hit and Run"], 8, 36.8851293, -76.298213),
            new Crime("17-ODU-00013", 2, "1 offense(s)49th ", new Date(2016, 11, 16, 16, 0 ), ["Burglary", "Residence"], 2, 36.8875494, -76.3131157),
            new Crime("17-ODU-00015", 2, "1 offense(s) at ",  new Date(2016, 11, 16, 15, 0 ), ["Larceny"], 2, 36.8863122, -76.3092258),
            new Crime("17-ODU-00016", 2, "1 offense(s) at ",  new Date(2016, 10, 18, 14, 1 ), ["Larceny", "Bicycle"], 2, 36.8856057, -76.3074162),
            new Crime("17-ODU-00018", 3, "1 offense(s)Blvd",  new Date(2017, 0, 8, 21, 45), ["Assault"], 4, 36.882349, -76.301913),
            new Crime("17-ODU-00022", 2, "1 offense(s)BlvdA", new Date(2017, 0, 9, 23, 52), ["Larceny"], 2, 36.886622, -76.302137),
            new Crime("17-ODU-00025", 2, "1 offense(s)43rd",  new Date(2017, 0, 9, 19, 0 ), ["Larceny From Auto"], 2, 36.8832195, -76.307967),
            new Crime("17-ODU-00026", 2, "3 offense(s)Ave ",  new Date(2017, 0, 4, 18, 30), ["Larceny", "Fraud", "Lost Property"], 2.0, 36.8802977, -76.2944769),
            new Crime("17-ODU-00029", 2, "1 offense(s)39th",  new Date(2017, 0, 11, 14, 0 ), ["Larceny From Auto"], 2, 36.88044, -76.3102324),
            new Crime("17-ODU-00035", 2, "1 offense(s)Way,",  new Date(2017, 0, 12, 19, 58), ["Larceny", "Bicycle"], 2, 36.8843478, -76.3000178),
            new Crime("17-ODU-00036", 2, "1 offense(s)Blvd",  new Date(2017, 0, 13, 2,  11), ["Larceny"], 2, 36.886622, -76.302137),
            new Crime("17-ODU-00038", 2, "1 offense(s) at ",  new Date(2017, 0, 12, 9,  0 ), ["Larceny"], 2, 40.7612166, -73.9977237),
            new Crime("17-ODU-00040", 3, "1 offense(s)Ave,",  new Date(2017, 0, 13, 12, 32), ["Harassment"], 4, 36.8851815, -76.3000502),
            new Crime("17-ODU-00041", 1, "1 offense(s)49th",  new Date(2017, 0, 13, 20, 30), ["Liquor Law", "Underage"], 1, 36.8864739, -76.3061248),
            new Crime("17-ODU-00048", 2, "1 offense(s) at ",  new Date(2017, 0, 14, 23, 0 ), ["Destruction of Property"], 2, 36.8863462, -76.3102211),
            new Crime("17-ODU-00049", 2, "1 offense(s)Ave ",  new Date(2017, 0, 14, 19, 0 ), ["Destruction of Property"], 2, 36.8903912, -76.3050225),
            new Crime("17-ODU-00050", 2, "1 offense(s)49th",  new Date(2017, 0, 14, 19, 0 ), ["Larceny", "Bicycle"], 2, 36.8864739, -76.3061248),
            new Crime("17-ODU-00055", 2, "1 offense(s)Blvd",  new Date(2017, 0, 16, 11, 59), ["Trespassing"], 2, 36.8843062, -76.3053596),
            new Crime("17-ODU-00056", 2, "3 offense(s)43rd",  new Date(2017, 0, 16, 13, 0 ), ["Larceny", "Electronics", "Larceny From Auto", "Larceny"], 2.5, 36.8834361, -76.3024859),
            new Crime("17-ODU-00057", 2, "1 offense(s)38th",  new Date(2017, 0, 16, 2,  30), ["Auto Theft"], 2, 36.87998, -76.303113),
            new Crime("17-ODU-00058", 0, "1 offense(s) at ",  new Date(2016, 10, 29, 17, 21), ["Fraud"], 0, 36.8856057, -76.3074162),
            new Crime("17-ODU-00060", 2, "1 offense(s)Ave,",  new Date(2017, 0, 17, 14, 10), ["Larceny"], 2, 36.8851815, -76.3000502),
        ];

        return crimes;
    };

    static crimeArrayToString(crimeArr) {
        let str = "";

        for (let i = 0; i < crimeArr.length; i++) {
            let c = crimeArr[i];

            str += c._id + '\t' + c._date + c._time + '\n';
        }

        return str;
    };

    static crimeArrayToString_Offenses(crimeArr) {
        let str = "";

        for (let i = 0; i < crimeArr.length; i++) {
            let c = crimeArr[i];

            str += c._id + '\t' + c._offenses + '\n';
        }

        return str;
    }

    static test_filterByDateRange() {
        let startDate = new Date("December 31, 2016");
        let endDate = new Date("January 4, 2017");

        console.log("filterByDateRange() Keep crimes that occurred between\n" +
            startDate + "\nand " + endDate);

        let crimes = Test_CrimeFilter.generateCrimeArray();

        console.log("Crimes before filter\n" +
            Test_CrimeFilter.crimeArrayToString(crimes) +
            "Length = " + crimes.length + "\n");

        let excludedCrimes = CrimeFilter.filterByDateRange(crimes, startDate, endDate);

        console.log("Crimes after filter\n" +
            Test_CrimeFilter.crimeArrayToString(crimes) +
            "Length = " + crimes.length + "\n");

        console.log("Crimes that were filtered out\n" +
            Test_CrimeFilter.crimeArrayToString(excludedCrimes) +
            "Length = " + excludedCrimes.length + "\n");
    };

    static test_filterByDayOfWeek() {
        console.log("Keep Crimes occurring on Mon, Tues, Wed, Thu");

        let crimes = Test_CrimeFilter.generateCrimeArray();

        console.log("Crimes before filter\n" +
             Test_CrimeFilter.crimeArrayToString(crimes) +
             "Length = " + crimes.length + "\n");

        // Remove Crimes that occurred on Sunday, Friday and Saturday
        let excludedCrimes =
            CrimeFilter.filterByDayOfWeek(crimes, false, true, true, true, true, false, false);

        console.log("Crimes after filter\n" +
             Test_CrimeFilter.crimeArrayToString(crimes) +
             "Length = " + crimes.length + "\n");

        console.log("Crimes that were filtered out\n" +
             Test_CrimeFilter.crimeArrayToString(excludedCrimes) +
             "Length = " + excludedCrimes.length + "\n");
    };

    static test_filterByDayOfYear() {
        let startDayOfYear = new Date("December 1");
        let endDayOfYear = new Date("December 31");

        console.log("Keep Crimes that occurred after " +
            startDayOfYear.toDateString() +
            " and before " + endDayOfYear.toDateString() +
            " (Note: Year does not matter)");

        let crimes = Test_CrimeFilter.generateCrimeArray();

        console.log("Crimes before filter\n" +
            Test_CrimeFilter.crimeArrayToString(crimes) +
            "Length = " + crimes.length + "\n");

        let excludedCrimes =
            CrimeFilter.filterByDayOfYear(crimes, startDayOfYear, endDayOfYear);

        console.log("Crimes after filter\n" +
            Test_CrimeFilter.crimeArrayToString(crimes) +
            "Length = " + crimes.length + "\n");

        console.log("Crimes that were filtered out\n" +
            Test_CrimeFilter.crimeArrayToString(excludedCrimes) +
            "Length = " + excludedCrimes.length + "\n");
    };

    static test_filterByTimeOfDay() {
        // Keep crimes that occurred between 9pm and midnight
        let startingTimeOfDay = new Date(0, 0, 1, 21);          // 09:00:00 pm or 21 hr
        let endingTimeOfDay = new Date(0, 0, 1, 23, 59, 59);    // 11:59:59 pm or 23:59:59 hr

        console.log("Keep Crimes that occurred after " +
            startingTimeOfDay.toTimeString() +
            "\nand before " +
            endingTimeOfDay.toTimeString()
            + "\nOf any day " +
            "(Only Hours Minutes and Sec matter) ");

        let crimes = Test_CrimeFilter.generateCrimeArray();

        console.log("Crimes before filter\n" +
            Test_CrimeFilter.crimeArrayToString(crimes) +
            "Length = " + crimes.length + "\n");

        let excludedCrimes =
            CrimeFilter.filterByTimeOfDay(crimes, startingTimeOfDay, endingTimeOfDay);

        console.log("Crimes kept\n" +
            Test_CrimeFilter.crimeArrayToString(crimes) +
            "Length = " + crimes.length + "\n");

        console.log("Crimes that were filtered out\n" +
            Test_CrimeFilter.crimeArrayToString(excludedCrimes) +
            "Length = " + excludedCrimes.length + "\n");
    }

    static test_filterByCrimeOffenses() {
        // Keep crimes with these categories
        let offenses = ["Larceny", "Assault"];

        console.log("Keep Crimes that have these offenses [" +
            offenses.toString() + "]");

        let crimes = Test_CrimeFilter.generateCrimeArray();

        console.log("Crimes before filter\n" +
            Test_CrimeFilter.crimeArrayToString_Offenses(crimes) +
            "Length = " + crimes.length + "\n");

        let excludedCrimes =
            CrimeFilter.filterByCrimeOffenses(crimes, offenses);

        console.log("Crimes kept\n" +
            Test_CrimeFilter.crimeArrayToString_Offenses(crimes) +
            "Length = " + crimes.length + "\n");

        console.log("Crimes that were filtered out\n" +
            Test_CrimeFilter.crimeArrayToString_Offenses(excludedCrimes) +
            "Length = " + excludedCrimes.length + "\n");
    }

    static test_moveCrimeToExcluded() {
        let crimes = [0, 1, 2, 3, 4, 5, 6, 7];

        let excluded = [];

        CrimeFilter.moveCrimeToExcluded(crimes, excluded, 1);
        CrimeFilter.moveCrimeToExcluded(crimes, excluded, 2);

        console.log("crimes = " + crimes);
        console.log("excluded = " + excluded);
    }
}

// ---------------- Function calls -------------------------

//Test_CrimeFilter.test_filterByDateRange();        // Passed

//Test_CrimeFilter.test_filterByDayOfWeek();        // Passed

//Test_CrimeFilter.test_filterByDayOfYear();        // Passed

//Test_CrimeFilter.test_filterByTimeOfDay();        // Passed

//Test_CrimeFilter.test_filterByCrimeOffenses();    // Passed

//Test_CrimeFilter.test_moveCrimeToExcluded();      // Passed

