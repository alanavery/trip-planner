document.addEventListener('DOMContentLoaded', () => {
  let tripEdit = document.querySelector('.trip-edit');
  let tripDelete = document.querySelector('.trip-delete');
  let secTripEdit = document.querySelector('.sec-trip-edit');
  let secTripDelete = document.querySelector('.sec-trip-delete');

  tripEdit.addEventListener('click', () => {
    if (!secTripDelete.hidden) {
      secTripDelete.hidden = true;
    }
    if (secTripEdit.hidden) {
      secTripEdit.hidden = false;
    } else {
      secTripEdit.hidden = true;
    }
  });

  tripDelete.addEventListener('click', () => {
    if (!secTripEdit.hidden) {
      secTripEdit.hidden = true;
    }
    if (secTripDelete.hidden) {
      secTripDelete.hidden = false;
    } else {
      secTripDelete.hidden = true;
    }
  });
})