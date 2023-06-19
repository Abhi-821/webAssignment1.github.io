function start() {
    document.getElementById('header').innerHTML = `Summer 2023 Assignment #1 for Abhi Sharma from India`
    document.getElementById('footer').innerHTML = `My Login: shar1025 / My ID: 991661414 / My Program:
    Software development and network engineering`
}

class TotalAmount {
    constructor(basePrice) {
        this.basePrice = basePrice;
    }

    calculate(ticketQuantity) {
        return this.basePrice * ticketQuantity;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("booking-form");
    const formElements = form.elements; 
    const ticketQuantityInput = document.getElementById("ticket-quantity");
    const ageInput = document.getElementById("age");
    const totalAmountInput = document.getElementById("total-amount");
    const submitButton = document.getElementById("submit-button");
    const busTimes = document.getElementsByClassName("bus-time"); 
    const selectedBusTimeInput = document.getElementById("selected-bus-time");
    const amountCalculator = new TotalAmount(100); 

    ticketQuantityInput.addEventListener("change", function() {
        const ticketQuantity = parseInt(this.value);

        if (ticketQuantity > 10 || ticketQuantity < 0) {
            this.style.backgroundColor = "red";
            submitButton.disabled = true;
        } else {
            this.style.backgroundColor = "";
            submitButton.disabled = false;
            totalAmountInput.value = amountCalculator.calculate(ticketQuantity);
        }
    });

    for(let i = 0; i < busTimes.length; i++) {
        busTimes[i].addEventListener("click", function() {
            for(let j = 0; j < busTimes.length; j++) {
                busTimes[j].classList.remove("abhi");
            }
            this.style.backgroundColor="purp[le"
            this.classList.add("abhi");
            selectedBusTimeInput.value = this.innerText;
        });
    }

    form.addEventListener("input", function() {
        let isValid = true;
    
        let busServiceIsValid = false;
        let genderIsValid = false;
        let busTimeIsValid = false;
    
        // New validity checks
        let travelDateIsValid = false;
        let ageIsValid = false;
    
        for(let i = 0; i < busTimes.length; i++) {
            if(busTimes[i].classList.contains("abhi")) {
                busTimeIsValid = true;
                break;
            }
        }
    
        for(let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
    
            if (element.type === "radio") {
                if(element.name === "bus-service" && element.checked) {
                    busServiceIsValid = true;
                }
                if(element.name === "gender" && element.checked) {
                    genderIsValid = true;
                }
            } else if (element.type !== "submit" && element.type !== "hidden" && (!element.value || element.value.trim() === "")) {
                isValid = false;
                break;
            }
    
            if (element.type === "date") {
                if (element.valueAsDate) {
                    travelDateIsValid = true;
                } else {
                    isValid = false;
                    break;
                }
            }
    
            if (element.type === "number" && element.id === "age") {
                if (element.value && parseInt(element.value) > 0) {
                    ageIsValid = true;
                } else {
                    isValid = false;
                    break;
                }
            }
        }
    
        if (parseInt(ticketQuantityInput.value) > 10 || parseInt(ticketQuantityInput.value) < 1) {
            isValid = false;
        }
    
        isValid = isValid && busServiceIsValid && genderIsValid && busTimeIsValid && travelDateIsValid && ageIsValid;
    
        submitButton.disabled = !isValid;
    });
    
    

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        if (parseInt(ageInput.value) < 20) {
            ageInput.style.backgroundColor = "red";
            return;
        }

        let data = {};

        for(let i = 0; i < formElements.length; i++) {
            if (formElements[i].type !== "submit") {
                if(formElements[i].type === "radio") {
                    if(formElements[i].checked) {
                        data[formElements[i].id] = formElements[i].value;
                    }
                } else {
                    data[formElements[i].id] = formElements[i].value;
                }
            }
        }

        localStorage.setItem("bookingData", JSON.stringify(data)); //Storing data in Local Storage

        window.location.href = "pages/success.html";
    });
});
