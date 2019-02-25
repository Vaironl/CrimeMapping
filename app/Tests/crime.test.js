
const { Crime } = require( "../Classes/Crime.js");

test ('Should create a crime an store date for retrival', ()=>{
    const crime = new Crime('17-ODU-00826',
        2,
        '2 offense(s) at 4100 Parker Ave, Norfolk, VA 23508, USA',
        '08/26/17',
        '2200',
        ['Larceny', 'Fraud'],
        2,
        '36.8819628',
        '-76.3100281');

    expect(crime.severity).toBe(2);

    }
)