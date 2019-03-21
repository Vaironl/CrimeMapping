
export default class Crime
{
    get id() {
        return this._id;
    }

    get crimeCat() {
        return this._crimeCat;
    }

    get desc() {
        return this._desc;
    }

    get date() {
        return this._date;
    }

    get offenses() {
        return this._offenses;
    }

    get severity() {
        return this._severity;
    }

    get lat() {
        return this._lat;
    }

    get lng() {
        return this._lng;
    }
    constructor (
        _id,
        crimeCat,
        desc,
        date,
        offenses,
        severity,
        lat,
        lng,
    ) {
        this._id = _id;
        this._crimeCat = crimeCat;
        this._desc = desc;
        this._date = date;
        this._offenses = offenses;
        this._severity = severity;
        this._lat = lat;
        this._lng = lng;
    }

}