/**
 * Class CrimeFilter
 *
 * Filtering - to remove items that do not match a certain criteria.
 *
 * Used for filtering crimes from a list based on:
 *      - Date          ex: filter out crimes not in the range [(June 1, 2016), (September 1, 2018)]
 *      - Day of Week   ex: filter out crimes that did not occur on [Friday, Saturday, Sunday]
 *      - Day of Year   ex: filter out crimes that did not occur on [(June 1), (September 1)]   <-- Notice it does not include the year
 *      - Time of Day   ex: filter out crimes that did not occur on [5:00pm, 11:00pm]
 *
 * Filters can be combined by applying multiple filters to the same set or list one after another.
 *
 * How to use:
 *  Start with a list of Crime objects. List might come straight from the database.
 *  Pass the list to a filter function (one of the functions below) and specify the filter criteria in the parameters
 *  The function removes "filtered" items from the list and returns them in another list
 *
 *  Remember: lists are passed by reference, so the crimes list that is passed to the function will have elements
 *      removed from it by the time the function is finished.
 *
 *  Note: The returned list is most likely useless in our project, so you can probably just forget about it.
 *
 *  Warning: The array passed in is not guaranteed to remain in the same order after the function returns.
 *
 *  It may be a good idea to make a copy of your crimes array and then pass that copy in to the function in case you
 *      still need all your crime objects for some reason.
 */
import Crime from "../Classes/Crime.js";
//import DistanceFactor from "./DistanceFactor.js"

export default class CrimeFilter {
    /**
     * Takes a list of Crime objects and removes all the crimes that either occurred
     * before startDate or after endDate.
     *
     * ex:
     *      let crimes = [ list of Crime objects ];
     *      let startDate = new Date("December 4 2016");
     *      let endDate = new Date("January 4 2017");
     *
     *      let excludedCrimes = CrimeFilter.filterByDateRange(crimes, startDate, endDate);
     *
     *      Now crimes only contains crimes that occurred after Dec 4 2016 and before January 4 2017
     *      And excludedCrimes contains all the filtered out Crimes
     *
     * @param {Crime[]} crimes  - list of Crime objects that are to be filtered
     * @param {Date} startDate  - Date object specifying the first day (Day, Month and Year) you want to start filtering from
     * @param {Date} endDate    - Date object specifying the last day (Day, Month and Year) you want to stop filtering from
     * @returns {Array}         - A list of Crime objects that contains all the Crimes that were taken out of the crimes list.
     */
    static filterByDateRange(crimes, startDate, endDate) {
        let start = startDate.getTime();
        let end = endDate.getTime();

        let excluded = [];

        // Remove Crimes that do not fall between startDate and endDate
        for (let i = 0; i < crimes.length; ) {
            let date = crimes[i].date.getTime();

            // Does c fall between startDate and endDate?
            if (date - start >= 0 && end - date >= 0) {
            //if (date >= startDate && date <= endDate) {
                // Yes it does so we can keep it
                i++;
            }
            else {
                // No it doesn't, remove it
                this.moveCrimeToExcluded(crimes, excluded, i);
            }
        }

        return excluded;
    }

    /**
     * Takes a list of Crime objects and
     *      REMOVES all the crimes that occurred on the week days that are set to FALSE and
     *      KEEPS the crimes that occurred on the week days set to TRUE.
     *
     * @param {Crime[]} crimes      - list of Crime objects that are to be filtered
     * @param {boolean} sunday      - set to true if you want to keep crimes that occurred on Sunday
     * @param {boolean} monday      - set to true if you want to keep crimes that occurred on Monday
     * @param {boolean} tuesday     - set to true if you want to keep crimes that occurred on Tuesday
     * @param {boolean} wednesday   - set to true if you want to keep crimes that occurred on Wednesday
     * @param {boolean} thursday    - set to true if you want to keep crimes that occurred on Thursday
     * @param {boolean} friday      - set to true if you want to keep crimes that occurred on Friday
     * @param {boolean} saturday    - set to true if you want to keep crimes that occurred on Saturday
     * @returns {Array}             - A list of Crime objects that contains all the Crimes that were
     *                                  taken out of the crimes list.
     */
    static filterByDayOfWeek(crimes, sunday, monday, tuesday, wednesday, thursday, friday, saturday) {
        let excluded = [];

        // Remove Crimes that do not occur on the filtered days
        // For all days {Sunday, ..., Saturday} set to false, remove crimes that occurred on those days
        // For all days {Sunday, ..., Saturday} set to true, keep those crimes.
        // ex: if Monday and Tuesday are true and other days are false,
        //      then remove crimes that do not occur on Mondays or Tuesdays
        for (let i = 0; i < crimes.length; ) {
            let date = crimes[i].date;

            let dayOfWeek = date.getDay();

            // Sunday
            if (dayOfWeek == 0) {
                if (sunday == false) {
                    this.moveCrimeToExcluded(crimes, excluded, i);
                }
            }
            // Monday
            else if (dayOfWeek == 1) {
                if (monday == false) {
                    this.moveCrimeToExcluded(crimes, excluded, i);
                }
            }
            // Tuesday
            else if (dayOfWeek == 2) {
                if (tuesday == false) {
                    this.moveCrimeToExcluded(crimes, excluded, i);
                }
            }
            // Wednesday
            else if (dayOfWeek == 3) {
                if (wednesday == false) {
                    this.moveCrimeToExcluded(crimes, excluded, i);
                }
            }
            // Thursday
            else if (dayOfWeek == 4) {
                if (thursday == false) {
                    this.moveCrimeToExcluded(crimes, excluded, i);
                }
            }
            // Friday
            else if (dayOfWeek == 5) {
                if (friday == false) {
                    this.moveCrimeToExcluded(crimes, excluded, i);
                }
            }
            // Saturday
            else if (dayOfWeek == 6) {
                if (saturday == false) {
                    this.moveCrimeToExcluded(crimes, excluded, i);
                }
            }
            // Error - Day of week somehow does not match an actual day of the week.
            else {
                console.log("error: CrimeFilter.filterByDayOfWeek() dayOfWeek = " + dayOfWeek);
            }
        }

        return excluded;
    }

    /**
     * Takes a list of Crime objects and removes all the crimes that either occurred before
     *  startDay or after endDay and keeps the crimes within the range.
     *
     *  ex:
     *      crimes = [ A bunch of crime objects ];
     *      filterByDayOfYear(crimes, Date('February 4, 0 0:0:0'), Date('March 4, 0, 0:0:0'));
     *
     *      This will remove all Crime objects from the crimes list that occurred
     *      after New Years Day (Jan 1) and before Feb 4 and
     *      remove all Crime objects from the crimes list that occurred
     *      after March 4 and before the next New Years Eve (Dec 31)
     *
     * To keep crimes that occurred between [Jan 1, Feb 4] and [Mar 4, Dec 31], then you can
     *      simply keep the returned list of the function.
     *
     * ex:
     *      let crimesToKeep =
     *          filterByDayOfYear(crimes, Date('February 4, 0 0:0:0'), Date('March 4, 0, 0:0:0'));
     *
     * @param {Crime[]} crimes      - list of Crime objects that are to be filtered
     * @param {Date} startDay       - Date object specifying the FIRST day of the year
     *                                  (Day, Month and !NOT YEAR!) you want to start
     *                                  filtering from. The year can be set to anything,
     *                                  its value will be ignored
     * @param {Date} endDay         - Date object specifying the LAST day of the year
     *                                  (Day, Month and !NOT YEAR!) you want to start
     *                                  filtering from. The year can be set to anything,
     *                                  its value will be ignored
     * @returns {Array}             - A list of Crime objects that contains all the Crimes that were
     *                                  taken out of the crimes list.
     */
    static filterByDayOfYear(crimes, startDay, endDay) {
        let start = Object.assign({}, startDay);
        let end = Object.assign({}, endDay);

        // Error Checking: Make sure startDay and endDay don't have years only
        // days and months and maybe hours, min, sec
        startDay.setFullYear(0);
        endDay.setFullYear(0);

        let excluded = [];

        for (let i = 0; i < crimes.length; i++) {
            let date = crimes[i].getDate();
            date.setFullYear(0);

            // Does date fall between start and end?
            if (date > start && date < end) {
                // Yes it does so we can keep it
                i++;
            }
            else {
                // No it doesn't, remove it
                this.moveCrimeToExcluded(crimes, excluded, i);
            }
        }

        return excluded;
    }

    /**
     *
     *
     * @param {Crime[]} crimes  - list of Crime objects that are to be filtered
     * @param {Date} startTime  - Time object specifying the start time of the day
     *                              (Hour, Minute, Sec) you want to start
     *                              filtering from. The Day, Month and Year can be set to
     *                              anything, their values will be ignored.
     * @param {Date} endTime    - Time object specifying the end time of the day
     *                              (Hour, Minute, Sec) you want to stop
     *                              filtering from. The Day, Month and Year can be set to
     *                              anything, their values will be ignored.
     * @returns {Array}          - A list of Crime objects that contains all the Crimes that were
     *                              taken out of the crimes list.
     */
    static filterByTimeOfDay(crimes, startTime, endTime) {
        let start = Object.assign({}, startTime);
        let end = Object.assign({}, endTime);

        // Error Checking: Make sure startDay and endDay don't have years days and months
        //      but only hours, min, sec
        startDay.setFullYear(0);
        startDay.setMonth(0);
        startDay.setDate(0);

        endDay.setFullYear(0);
        endDay.setMonth(0);
        endDay.setDate(0);

        let excluded = [];

        for (let i = 0; i < crimes.length; i++) {
            let date = crimes[i].getDate();
            time.setFullYear(0);
            time.setMonth(0);
            time.setDate(0);

            // Does time fall between start and end?
            if (time > start && time < end) {
                // Yes it does so we can keep it
                i++;
            }
            else {
                // No it doesn't, remove it
                this.moveCrimeToExcluded(crimes, excluded, i);
            }
        }

        return excluded;
    }

    /**
     * Removes Crimes that are not of a category listed in the categoriesToKeep list
     *
     * @param {Crime[]} crimes          - list of Crime objects that are to be filtered
     * @param {Array} categoriesToKeep  - A list of crime categories that we want to keep
     *                                      (data type unknown)
     * @returns {Array}                 - A list of Crime objects that contains all the Crimes that were
     *                                      taken out of the crimes list.
     */
    static filterByCrimeCategory(crimes, categoriesToKeep) {
        let excluded = [];

        // Remove Crimes that are not of the categories listed
        //  in the categoriesToKeep parameter
        for (let i = 0; i < crimes.length; ) {
            // Get the crimes category
            let category = crimes[i].crimeCat();

            // Is category one of the ones listed?
            let keep = false;
            for (let j = 0; j < categoriesToKeep.length; j++) {
                // So is it categoriesToKeep[j]?
                if (category == categoriesToKeep[j]) {
                    // Yes it is a keeper.
                    keep = true;
                    break;
                }
            }

            // So I can't remember, was it a keeper?
            if (keep == false) {
                // Nope. Get rid of it.
                this.moveCrimeToExcluded(crimes, excluded, i);
            }
        }

        return excluded;
    }

    /**
     * Private Function
     * no need to call this function.
     */
    static moveCrimeToExcluded(crimes, excluded, index) {
        // 0.) push value of crimes[index]
        // 1.) swapping it with the last element
        // 2.) Then popping off the last element
        excluded.push(crimes[index]);
        crimes[index] = crimes[crimes.length - 1];
        crimes.pop();
    }

}
