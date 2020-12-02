document.addEventListener('DOMContentLoaded', () => {

  let tripEdit = document.querySelector('.trip-edit');
  let secTripEdit = document.querySelector('.section-trip-edit');

  tripEdit.addEventListener('click', () => {
    if (secTripEdit.hidden) {
      secTripEdit.hidden = false;
    } else {
      secTripEdit.hidden = true;
    }
  });

})