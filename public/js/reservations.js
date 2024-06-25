document.addEventListener('DOMContentLoaded', function() {
    const adultSelection = document.getElementById('adults');
    const ticketSelection = document.getElementById('ticket-selection');
    const startDateInput = document.getElementById('start-date');
    const endDateDisplay = document.getElementById('end-date-display');
    const hotelYesRadio = document.getElementById('hotel-yes');
    const hotelNoRadio = document.getElementById('hotel-no');
    const priceSpan = document.querySelector('.price');
    const daySpan = document.querySelector('.span-jour');
    const hotelSpan = document.querySelector('.span-hotel');
    const adultSpan = document.querySelector('.span-adult');

    let numberOfAdults = parseInt(adultSelection.value, 10);
    let numberOfDays = parseInt(ticketSelection.value, 10);
    let hotelIncluded = hotelYesRadio.checked;

    function updateHotelAvailability() {
        if (numberOfDays === 1) {
            hotelYesRadio.disabled = true;
            hotelNoRadio.checked = true;
            hotelIncluded = false;
        } else {
            hotelYesRadio.disabled = false;
        }
        updateDynamicContent();
    }

    function calculatePrice() {
        if (hotelIncluded && numberOfDays === 1) {
            priceSpan.textContent = 'Sélection invalide';
        } else {
            let basePrices = { '1': 65, '2': 110, '3': 150, '4': 185 };
            let hotelPrices = { '2': 210, '3': 385, '4': 560 };
            let price = hotelIncluded ? hotelPrices[numberOfDays] : basePrices[numberOfDays];
            price *= numberOfAdults;
            priceSpan.textContent = `${price} €`;
        }
        updateDynamicContent();
    }

    function updateEndDate() {
        if (startDateInput.value && numberOfDays > 1) {
            const startDate = new Date(startDateInput.value);
            const numberOfDays = parseInt(ticketSelection.value, 10);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + numberOfDays);

            const formattedEndDate = endDate.toISOString().split('T')[0];
            endDateDisplay.textContent = `Du ${startDateInput.value} Au ${formattedEndDate}`;
        } else {
            endDateDisplay.textContent = `Le ${startDateInput.value}`;
        }
    }

    function updateDynamicContent() {
        daySpan.textContent = `Vous avez opté pour ${numberOfDays} jour(s)`;
        hotelSpan.textContent = `Avec hôtel: ${hotelIncluded ? 'Oui' : 'Non'}`;
        adultSpan.textContent = `Vous avez choisi pour ${numberOfAdults} personne(s)`;
    }

    adultSelection.addEventListener('change', (event) => {
        numberOfAdults = parseInt(event.target.value, 10);
        calculatePrice();
    });

    ticketSelection.addEventListener('change', (event) => {
        numberOfDays = parseInt(event.target.value, 10);
        updateHotelAvailability();
        calculatePrice();
    });

    [hotelYesRadio, hotelNoRadio].forEach(radio => {
        radio.addEventListener('change', () => {
            hotelIncluded = hotelYesRadio.checked;
            calculatePrice();
        });
    });

    updateHotelAvailability();
    calculatePrice();
    startDateInput.addEventListener('change', updateEndDate);
    ticketSelection.addEventListener('change', updateEndDate);
});


// export default calculatePrice;