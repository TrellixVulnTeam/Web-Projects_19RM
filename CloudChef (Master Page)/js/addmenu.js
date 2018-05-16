var specific_dish = document.getElementById('specific');
var regular_dish = document.getElementById('regular');
var dish_days = document.getElementsByClassName('dish-days');
var dish_date = document.getElementById('dish-specific');
var dish_availability = document.getElementsByName('dish-availability');

dish_date.disabled = true;
dish_date.style.backgroundColor = '#ebebe4';
for (let temp = 0; temp < dish_days.length; temp++) {
    dish_days[temp].disabled = true;
}

document.addEventListener('change', function () {
    for (let index = 0; index < dish_availability.length; index++) {
        if (specific_dish.checked === true) {
            dish_date.disabled = false;
            dish_date.style.backgroundColor = 'white';
            for (let temp = 0; temp < dish_days.length; temp++) {
                dish_days[temp].disabled = true;
            }
        }
        if (regular_dish.checked === true) {
            dish_date.disabled = true;
            dish_date.style.backgroundColor = '#ebebe4';
            for (let temp = 0; temp < dish_days.length; temp++) {
                dish_days[temp].disabled = false;
            }
        }
    }
})