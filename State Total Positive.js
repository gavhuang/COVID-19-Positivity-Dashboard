/* 
    Get current date
    Get state coronavirus data, returns as array
    Loop through data to find match with current date
*/
getCurrentDate().then(date => {
    let currentDate = date;

    getTotalStatePositiveCase().then(stateData => {

        let nationalData = [];

        stateData.forEach(state => {
            if (date === state.date) {
                // Create buttons for each state
                const divState = document.getElementById('states');
                const stateNameButton = document.createElement('button');
                
                stateNameButton.innerHTML = acronymToFullName(`${state.state}`);
                divState.appendChild(stateNameButton);

                // Add click event listener, display total state positives, and percentage of US total
                stateNameButton.addEventListener('click', () => {
                    const divPercentage = document.getElementById('stateTotal');
                    divPercentage.innerHTML = acronymToFullName(`${state.state}`) + ` has ` + state.positive.toLocaleString('en') + ` total cases.`;

                    getTotalUSPositiveCase().then(positiveNumber => {
                        const percentage = ((state.positive / positiveNumber) * 100).toFixed(5);
                        document.getElementById('percentage').innerHTML = `This is ${percentage}% of the US total cases.`;
                    });
                });
                
                // Create new array of objects [{State: Positivity}...]
                let data = {};
                data[acronymToFullName(`${state.state}`)] = Number(state.positive);
                if (gps(`${state.state}`) != undefined) {
                    data.coordinates = gps(`${state.state}`);
                }
                nationalData.push(data);
            }
        });

        // Delete THIS LATER
        console.log(nationalData);

        // Bring in Google Map API TODO
    });
});

/* Function declarations */

// Get total positive cases
async function getTotalStatePositiveCase() {
    try {
        const response = await fetch('https://covidtracking.com/api/v1/states/daily.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

// Change state acronyms to full name
function acronymToFullName(acronym) {
    const states = {
        AZ: 'Arizona',
        AL: 'Alabama',
        AK: 'Alaska',
        AR: 'Arkansas',
        CA: 'California',
        CO: 'Colorado',
        CT: 'Connecticut',
        DC: 'District of Columbia',
        DE: 'Delaware',
        FL: 'Florida',
        GA: 'Georgia',
        HI: 'Hawaii',
        ID: 'Idaho',
        IL: 'Illinois',
        IN: 'Indiana',
        IA: 'Iowa',
        KS: 'Kansas',
        KY: 'Kentucky',
        LA: 'Louisiana',
        ME: 'Maine',
        MD: 'Maryland',
        MA: 'Massachusetts',
        MI: 'Michigan',
        MN: 'Minnesota',
        MS: 'Mississippi',
        MO: 'Missouri',
        MT: 'Montana',
        NE: 'Nebraska',
        NV: 'Nevada',
        NH: 'New Hampshire',
        NJ: 'New Jersey',
        NM: 'New Mexico',
        NY: 'New York',
        NC: 'North Carolina',
        ND: 'North Dakota',
        OH: 'Ohio',
        OK: 'Oklahoma',
        OR: 'Oregon',
        PA: 'Pennsylvania',
        RI: 'Rhode Island',
        SC: 'South Carolina',
        SD: 'South Dakota',
        TN: 'Tennessee',
        TX: 'Texas',
        UT: 'Utah',
        VT: 'Vermont',
        VA: 'Virginia',
        WA: 'Washington',
        WV: 'West Virginia',
        WI: 'Wisconsin',
        WY: 'Wyoming',
        AS: "American Samoa",
        GU: "Guam",
        MP: "Northern Mariana Islands",
        PR: "Puerto Rico",
        VI: "U.S. Virgin Islands",
        UM: "U.S. Minor Outlying Islands"
    }

    // When passing variables use the [] notation
    if (states[acronym] != null) {
        return states[acronym];
    }

    return acronym;
}


// GPS coordinations of states from https://www.census.gov/geographies/reference-files/2010/geo/state-area.html
function gps(acronym) {
    const coords = {
      AZ: {lat: 32.7396323, long: -86.8434593}
    }
  
    if (coords[acronym] != null) {
        return coords[acronym];
    }
}