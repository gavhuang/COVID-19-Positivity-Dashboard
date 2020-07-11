// Get total positive cases

getTotalPositiveCase()
    .then (data => document.getElementById('totalPositive').innerHTML = data[0].positive);

// Get current date

console.log(getCurrentDate());


// Function declarations

async function getTotalPositiveCase() {
    const response = await fetch ('https://covidtracking.com/api/v1/us/current.json');
    const data = await response.json();
    return data;
}

async function getCurrentDate() {
    const response = await fetch ('https://covidtracking.com/api/v1/us/current.json');
    const data = await response.json();
    
    let today = data[0].date;
    return today; // Returns a number
}