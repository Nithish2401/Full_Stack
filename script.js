const seatsData = [
    { name: "A1", price: 250, booked: false },
    { name: "A2", price: 250, booked: false },
    { name: "A3", price: 250, booked: false},  // Booked
    { name: "A4", price: 250, booked: false },
    { name: "B1", price: 200, booked: false },
    { name: "B2", price: 200, booked: false},  // Booked
    { name: "B3", price: 200, booked: false },
    { name: "B4", price: 200, booked: false },
    { name: "C1", price: 180, booked: false },
    { name: "C2", price: 180, booked: false },  // Booked
    { name: "C3", price: 180, booked: false },
    { name: "C4", price: 180, booked: false },
    { name: "D1", price: 150, booked: false },
    { name: "D2", price: 150, booked: false },
    { name: "D3", price: 150, booked: false },
    { name: "D4", price: 150, bookeed:false },
    { name: "E1", price: 120, booked: false },
    { name: "E2", price: 120, booked: false },
    { name: "E3", price: 120, booked: false },
    { name: "E4", price: 120, booked: false },
];

const seatsContainer = document.getElementById('seats');
const selectedSeatsContainer = document.getElementById('selected-seats');
const totalPriceElement = document.getElementById('total-price');
const bookButton = document.getElementById('book-button');
const availableCountElement = document.getElementById('available-count');
const bookedCountElement = document.getElementById('booked-count');

let selectedSeats = [];
let totalPrice = 0;

function renderSeats() {
    seatsContainer.innerHTML = '';  // Clear previous seats
    let availableCount = 0;
    let bookedCount = 0;

    seatsData.forEach(seat => {
        const seatDiv = document.createElement('div');
        seatDiv.classList.add('seat', seat.booked ? 'booked' : 'available');
        seatDiv.innerHTML = `${seat.name}<br>`;
        seatDiv.dataset.name = seat.name;
        seatDiv.dataset.price = seat.price;

        if (seat.booked) {
            bookedCount++;
        } else {
            availableCount++;
            seatDiv.addEventListener('click', () => {
                toggleSeat(seatDiv);
            });
        }

        seatsContainer.appendChild(seatDiv);
    });

    availableCountElement.textContent = availableCount;
    bookedCountElement.textContent = bookedCount;
}

function toggleSeat(seatDiv) {
    const seatName = seatDiv.dataset.name;
    const seatPrice = Number(seatDiv.dataset.price);

    if (seatDiv.classList.contains('selected')) {
        seatDiv.classList.remove('selected');
        selectedSeats = selectedSeats.filter(seat => seat.name !== seatName);
        totalPrice -= seatPrice;
    } else {
        seatDiv.classList.add('selected');
        selectedSeats.push({ name: seatName, price: seatPrice });
        totalPrice += seatPrice;
    }

    updateSummary();
}

function updateSummary() {
    selectedSeatsContainer.innerHTML = '';
    selectedSeats.forEach(seat => {
        const listItem = document.createElement('li');
        listItem.textContent = `${seat.name} - $${seat.price}`;
        selectedSeatsContainer.appendChild(listItem);
    });

    totalPriceElement.textContent = totalPrice;
    bookButton.disabled = selectedSeats.length === 0;  // Enable/disable the booking button
}

function bookSeats() {
    selectedSeats.forEach(seat => {
        const seatData = seatsData.find(s => s.name === seat.name);
        if (seatData) {
            seatData.booked = true;  // Mark as booked
        }
    });
    
    selectedSeats = [];  // Clear selected seats
    totalPrice = 0;      // Reset total price
    updateSummary();
    renderSeats();       // Re-render seats
}

// Attach event listener to the booking button
bookButton.addEventListener('click', bookSeats);

// Initial render of seats
renderSeats();
