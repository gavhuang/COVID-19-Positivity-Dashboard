// Get current date
getCurrentDate()
    .then(data => document.getElementById('currentDate').innerHTML = formatDate(data));

// Get total positive cases
getTotalUSPositiveCase()
    .then(data => document.getElementById('totalPositive').innerHTML = data.toLocaleString('en'));

/* Function declarations */

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

// Format date to MM-DD-YYYY
function formatDate(data) {
    const number = data;
    const d = number.toString();
    const date = `${d[4]}${d[5]}-${d[6]}${d[7]}-${d[0]}${d[1]}${d[2]}${d[3]}`;
    return date;
}