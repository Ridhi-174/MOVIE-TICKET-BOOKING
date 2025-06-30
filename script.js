const filmSelector = document.getElementById('film');
const slots = document.querySelectorAll('.seating-row .slot:not(.taken)');
const countDisplay = document.getElementById('seatCount');
const costDisplay = document.getElementById('cost');
const container = document.querySelector('.theater');

initializeBooking();

let currentPrice = +filmSelector.value;

filmSelector.addEventListener('change', (e) => {
  currentPrice = +e.target.value;
  saveMovieDetails(e.target.selectedIndex, e.target.value);
  updateSummary();
});

container.addEventListener('click', (e) => {
  if (e.target.classList.contains('slot') && !e.target.classList.contains('taken')) {
    e.target.classList.toggle('selected');
    updateSummary();
  }
});

function updateSummary() {
  const selected = document.querySelectorAll('.slot.selected');
  const selectedIndices = [...selected].map(slot => [...slots].indexOf(slot));
  localStorage.setItem('chosenSlots', JSON.stringify(selectedIndices));

  countDisplay.innerText = selected.length;
  costDisplay.innerText = selected.length * currentPrice;
}

function saveMovieDetails(index, price) {
  localStorage.setItem('movieIndex', index);
  localStorage.setItem('moviePrice', price);
}

function initializeBooking() {
  const savedSlots = JSON.parse(localStorage.getItem('chosenSlots'));

  if (savedSlots && savedSlots.length > 0) {
    slots.forEach((slot, idx) => {
      if (savedSlots.includes(idx)) {
        slot.classList.add('selected');
      }
    });
  }

  const savedMovieIndex = localStorage.getItem('movieIndex');
  if (savedMovieIndex !== null) {
    filmSelector.selectedIndex = savedMovieIndex;
    currentPrice = +localStorage.getItem('moviePrice');
  }

  updateSummary();
}
