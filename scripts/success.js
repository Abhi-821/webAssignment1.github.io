document.addEventListener("DOMContentLoaded", function() {
    const bookingDetails = document.getElementById("booking-details");
    const bookingData = JSON.parse(localStorage.getItem("bookingData")); //Retrieving Data Stored in Local Storage

    const labelsMap = {
        'departure': 'Departure',
        'destination': 'Destination',
        'bus-service': 'Bus Service',
        'travel-date': 'Travel Date',
        'ticket-quantity': 'Ticket Quantity',
        'age': 'Age',
        'first-name': 'First Name',
        'last-name': 'Last Name',
        'email': 'Email',
        'gender': 'Gender',
        'total-amount': 'Total Amount',
        'bus-time': 'Bus Timing',
        'selected-bus-time': 'Selected Bus Time',
        'gender1':'Gender',
        'gender2':'Gender',
        'bus-service1':'Bus Service',
        'bus-service2':'Bus Service',
    };

    for(let key in bookingData) {
        const label = labelsMap[key] || key; // Default key just in case no key is found , this part done using references
        bookingDetails.innerHTML += `
            <div class="row mb-3">
                <div class="col-sm-6 font-weight-bold">${label}:</div>
                <div class="col-sm-6">${bookingData[key]}</div>
            </div>
        `;
    }
});

function goBack() {
    window.location.href = "../index.html"; 
}
