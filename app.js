// Get total positive cases
getTotalPositiveCase()
    .then(data => document.getElementById('totalPositive').innerHTML = data.toLocaleString('en'));

// Get current date
getCurrentDate()
    .then(data => document.getElementById('currentDate').innerHTML = formatDate(data));

/* Function declarations */

// Get total positive cases
async function getTotalPositiveCase() {
    try {
        const response = await fetch ('https://covidtracking.com/api/v1/us/current.json');
        const data = await response.json();
        return data[0].positive;
    } catch (error) {
        console.log(error);
    }
}

// Get the date of the most recent data
async function getCurrentDate() {
    try{
        const response = await fetch ('https://covidtracking.com/api/v1/us/current.json');
        const data = await response.json();
        return data[0].date;
    } catch (error) {
        console.log(error);
    }
}

// Format date to MM-DD-YYYY
function formatDate(data) {
    let number = data;
    let d = number.toString();
    let date = `${d[4]}${d[5]}-${d[6]}${d[7]}-${d[0]}${d[1]}${d[2]}${d[3]}`;
    return date;
}