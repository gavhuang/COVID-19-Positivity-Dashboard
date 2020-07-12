/* 
    Get current date
    Get state coronavirus data, returns as array
    Loop through data to find match with current date
*/
getCurrentDate().then(date => {
    let currentDate = date;

    getTotalStatePositiveCase().then(stateData => {
        stateData.forEach(dataPoint => {
            if (date === dataPoint.date) {
                // Create buttons for each state
                const divState = document.getElementById('states');
                const stateNameButton = document.createElement('button');
                stateNameButton.innerHTML = `${dataPoint.state}`;
                divState.appendChild(stateNameButton);

                // Add event listener, display total state positives, and percentage of US total
                stateNameButton.addEventListener('click', () => {
                    const divPercentage = document.getElementById('stateTotal');
                    divPercentage.innerHTML = `${dataPoint.state} has ` + dataPoint.positive.toLocaleString('en') + ` total cases.`;
                    
                    getTotalUSPositiveCase().then(positiveNumber => {
                        const division = ((dataPoint.positive / positiveNumber) * 100).toFixed(5);
                        document.getElementById('percentage').innerHTML = `This is ${division}% of the US total cases.`;
                    });
                });
            }
        });
    });
});

                        /* Function declarations */

// Get total positive cases
async function getTotalStatePositiveCase() {
    try {
        const response = await fetch ('https://covidtracking.com/api/v1/states/daily.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

// Get the date of the most recent data
async function getCurrentDate() {
    try {
        const response = await fetch ('https://covidtracking.com/api/v1/us/current.json');
        const data = await response.json();
        return data[0].date;
    } catch (error) {
        console.log(error);
    }
}

// Get total US positive cases
async function getTotalUSPositiveCase() {
    try {
        const response = await fetch ('https://covidtracking.com/api/v1/us/current.json');
        const data = await response.json();
        return data[0].positive;
    } catch (error) {
        console.log(error);
    }
}