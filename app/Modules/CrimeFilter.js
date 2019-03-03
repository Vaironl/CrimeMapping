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
 */
class CrimeFilter {
    static filterByDateRange(crimes, startDate, endDate) {
    }

    static filterByDayOfWeek(crimes, sunday, monday, tuesday, wednesday, thursday, friday, saturday) {
    }

    static filterByDayOfYear(crimes, startDay, endDay) {
    }

    static filterByTimeOfDay(crime, startTime, endTime) {
    }
}


