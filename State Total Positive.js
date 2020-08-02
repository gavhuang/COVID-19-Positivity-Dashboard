/* 
    Get current date
    Get state coronavirus data, returns as array
    Loop through data to find match with current date
*/
getCurrentDate().then(date => {
    let currentDate = date;

    getTotalStatePositiveCase().then(stateData => {
        stateData.forEach(state => {
            if (date === state.date) {
                // Create buttons for each state
                const divState = document.getElementById('states');
                const stateNameButton = document.createElement('button');
                
                stateNameButton.innerHTML = `${state.state}`;
                divState.appendChild(stateNameButton);

                // Add click event listener, display total state positives, and percentage of US total
                stateNameButton.addEventListener('click', () => {
                    const divPercentage = document.getElementById('stateTotal');
                    divPercentage.innerHTML = `${state.state} has ` + state.positive.toLocaleString('en') + ` total cases.`;

                    getTotalUSPositiveCase().then(positiveNumber => {
                        const division = ((state.positive / positiveNumber) * 100).toFixed(5);
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
        const response = await fetch('https://covidtracking.com/api/v1/states/daily.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}