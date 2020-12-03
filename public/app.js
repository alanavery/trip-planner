document.addEventListener('DOMContentLoaded', () => {
  let tripEdit = document.querySelector('.trip-edit');
  let tripDelete = document.querySelector('.trip-delete');
  let secTripEdit = document.querySelector('.sec-trip-edit');
  let secTripDelete = document.querySelector('.sec-trip-delete');
  let divDay = document.querySelector('.div-day');
  let buttonAddSegmentAll = document.querySelectorAll('.button-add-segment');
  let formSegmentAll = document.querySelectorAll('.form-segment');

  tripEdit.addEventListener('click', () => {
    secTripDelete.hidden = true;
    if (secTripEdit.hidden) {
      secTripEdit.hidden = false;
    } else {
      secTripEdit.hidden = true;
    }
  });

  tripDelete.addEventListener('click', () => {
    secTripEdit.hidden = true;
    if (secTripDelete.hidden) {
      secTripDelete.hidden = false;
    } else {
      secTripDelete.hidden = true;
    }
  });

  buttonAddSegmentAll.forEach(button => {
    button.addEventListener('click', event => {
      let selectedForm = event.target.parentNode.nextElementSibling;
      if (selectedForm.hidden) {
        formSegmentAll.forEach(form => form.hidden = true);
        buttonAddSegmentAll.forEach(button => button.textContent = '+');
        selectedForm.hidden = false;
        event.target.textContent = '-';
      } else {
        formSegmentAll.forEach(form => form.hidden = true);
        buttonAddSegmentAll.forEach(button => button.textContent = '+');
      }
    });
  });
})