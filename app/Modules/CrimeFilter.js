/**
 * Class CrimeFilter
 *
 * Filtering - to remove items that do not match a certain criteria.
 *
 * Used for filtering crimes from a list based on:
 *      - Date          ex: filter out crimes not in the range [(June 1, 2016), (September 1, 2018)]
 *      - Day of Week   ex: filter out crimes that are not [Friday, Saturday, Sunday]
 *      - Day of Year   ex: filter out crimes that are not [(June 1), (September 1)]    <-- Notice it does not include the year
 *      - Time of Day   ex: filter out crimes that are not [5:00pm, 11:00pm]
 *
 * Filters can be combined by applying multiple filters to the same set or list
 *
 * How to use:
 *  Start with an list of Crime objects.
 *  Pass the list to the filter function and specify the filter criteria
 *  The function removes "filtered" items from the list and returns them in another list
 *
 *  Warning: The array passed in is not guarenteed to remain in the same order after the function call
 *
 *  It is recommended to make a copy of your array and then pass that copy in to the function
 */
class CrimeFilter {
    static filterByDateRange(crimes, startDate, endDate) {
        let excluded = [];

        // Remove Crimes that do not fall between startDate and endDate
        for (let i = 0; i < crimes.size(); ) {
            let date = crimes[i].getDate();

            // Does c fall between startDate and endDate?
            if (date > startDate && date < endDate) {
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

    static filterByDayOfWeek(crimes, sunday, monday, tuesday, wednesday, thursday, friday, saturday) {
        let excluded = [];

        // Remove Crimes that do not occur on the filtered days
        // ex: if Mondays and Tuesdays were true, then remove crimes that do not occur on Mondays or Tuesdays
        for (let i = 0; i < crimes.size(); ) {
            let date = crimes[i].getDate();

            let dayOfWeek = date.getDay();

            if (dayOfWeek == 0) {   // Sunday
                if (sunday == true) {
                    this.moveCrimeToExcluded(crimes, excluded, i);
                }
            }
            else if (dayOfWeek == 1) {  // Monday
                if (monday == true) {
                    this.moveCrimeToExcluded(crimes, excluded, i);
                }
            }
            else if (dayOfWeek == 2) {
                if (tuesday == true) {
                    this.moveCrimeToExcluded(crimes, excluded, i);
                }
            }
            else if (dayOfWeek == 3) {
                if (wednesday == true) {
                    this.moveCrimeToExcluded(crimes, excluded, i);
                }
            }
            else if (dayOfWeek == 4) {
                if (thursday == true) {
                    this.moveCrimeToExcluded(crimes, excluded, i);
                }
            }
            else if (dayOfWeek == 5) {
                if (friday == true) {
                    this.moveCrimeToExcluded(crimes, excluded, i);
                }
            }
            else if (dayOfWeek == 6) {
                if (saturday == true) {
                    this.moveCrimeToExcluded(crimes, excluded, i);
                }
            }
            else {
                console.log("error: CrimeFilter.filterByDayOfWeek() dayOfWeek = " + dayOfWeek);
            }
        }
    }

    static filterByDayOfYear(crimes, startDay, endDay) {
        let start = Object.assign({}, startDay);
        let end = Object.assign({}, endDay);

        // Error Checking: Make sure startDay and endDay don't have years only days and months and maybe hours, min, sec
        startDay.setFullYear(0);
        endDay.setFullYear(0);

        let excluded = [];

        for (let i = 0; i < crimes.size(); i++) {
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

    static filterByTimeOfDay(crimes, startTime, endTime) {
        let start = Object.assign({}, startTime);
        let end = Object.assign({}, endTime);

        // Error Checking: Make sure startDay and endDay don't have years only days and months and maybe hours, min, sec
        startDay.setFullYear(0);
        startDay.setMonth(0);
        startDay.setDate(0);

        endDay.setFullYear(0);
        endDay.setMonth(0);
        endDay.setDate(0);

        let excluded = [];

        for (let i = 0; i < crimes.size(); i++) {
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

    // Private Function
    static moveCrimeToExcluded(crimes, excluded, index) {
        // 1.) By swapping it with the last element
        // 2.) Then popping off the last element
        excluded.push(crimes[index]);
        crimes[index] = crimes[crimes.size() - 1];
        crimes.pop();
    }

}


