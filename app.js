// main variables
const shows = document.getElementById('selections');
const seatsWrapper = document.querySelector('.seats-wrapper');
const seats = document.querySelectorAll('.seats-wrapper .row .seat:not(.occupied)');
const totalSeats = document.getElementById('total-seats');
const totalPrice = document.getElementById('total-price');
let choosenShowPrice =  +document.getElementById('selections').value;
let choosenShow = document.getElementById('selections');

getLocalData();

// event listener for the shows
shows.addEventListener('change', e => {
  choosenShowPrice = +e.target.value;
  choosenShow = e.target;
  updateSelected();
})

// event listener for the seats
seatsWrapper.addEventListener('click', selected);

// get the selected seats
function selected(e) {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelected();
  }
} 

function updateSelected() {
  // get the selected seats nodelist
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // get the index of the selected seats
  const seatsIndex = [...selectedSeats].map(seat => {
    return [...seats].indexOf(seat)
  })

  totalSeats.innerHTML = selectedSeats.length;
  totalPrice.innerHTML = selectedSeats.length * choosenShowPrice;
  setLocalData(seatsIndex);
}

function setLocalData(seatsIndex) {
  localStorage.setItem('choosenShowIndex', choosenShow.selectedIndex);
  localStorage.setItem('choosenShowPrice', choosenShowPrice);
  localStorage.setItem('choosenSeatsIndex', JSON.stringify(seatsIndex));
}

function getLocalData() {
  const choosenSeats =  JSON.parse(localStorage.getItem('choosenSeatsIndex'));
  if(choosenSeats != null && choosenSeats.length > 0) {
    seats.forEach((seat, index) => {
      if(choosenSeats.indexOf(index) > -1){
        seat.classList.add('selected');
      }
    });
  }

  const choosenShowIndex = localStorage.getItem('choosenShowIndex');
  if(choosenShowIndex !== null) {
    choosenShow.selectedIndex = choosenShowIndex;
    totalSeats.innerHTML = choosenSeats.length;
    totalPrice.innerHTML = choosenSeats.length * localStorage.getItem('choosenShowPrice');
  }
}

