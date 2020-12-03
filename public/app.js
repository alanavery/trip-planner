document.addEventListener('DOMContentLoaded', () => {
  let tripEdit = document.querySelector('.trip-edit');
  let tripDelete = document.querySelector('.trip-delete');
  let secTripEdit = document.querySelector('.sec-trip-edit');
  let secTripDelete = document.querySelector('.sec-trip-delete');
  let allAddSegmentButtons = document.querySelectorAll('.add-segment-button');
  let divSegmentAll = document.querySelectorAll('.div-segment');
  let divSegmentInfoSecondaryAll = document.querySelectorAll('.div-segment-info-secondary');
  let segmentEditAll = document.querySelectorAll('.segment-edit');
  let formSegmentEditAll = document.querySelectorAll('.form-segment-edit');
  let divSegmentInfoAll = document.querySelectorAll('.div-segment-info');
  let segmentEditCancelAll = document.querySelectorAll('.segment-edit-cancel');
  let addSegmentSec = document.querySelector('.add-segment');
  let addSegmentDate = document.getElementById('add-segment-date');

  let visualReset = () => {
    secTripDelete.hidden = true;
    secTripEdit.hidden = true;
    addSegmentSec.hidden = true;
    formSegmentEditAll.forEach(form => form.hidden = true);
    divSegmentInfoAll.forEach(div => div.hidden = false);
    divSegmentInfoSecondaryAll.forEach(div => div.hidden = true);
  };

  tripEdit.addEventListener('click', () => {
    if (secTripEdit.hidden) {
      visualReset();
      secTripEdit.hidden = false;
    } else {
      visualReset();
      secTripEdit.hidden = true;
    }
  });

  tripDelete.addEventListener('click', () => {
    if (secTripDelete.hidden) {
      visualReset();
      secTripDelete.hidden = false;
    } else {
      visualReset();
      secTripDelete.hidden = true;
    }
  });

  allAddSegmentButtons.forEach(button => {
    button.addEventListener('click', event => {
      visualReset();
      addSegmentSec.hidden = false;
      let selDay = event.target.parentNode.parentNode;
      addSegmentDate.value = selDay.id.substring(4);
      // let selectedForm = event.target.parentNode.nextElementSibling;
      // if (selectedForm.hidden) {
      //   selectedForm.hidden = false;
      //   event.target.textContent = '-';
      // } else {
      //   visualReset();
      // }
    });
  });

  divSegmentAll.forEach(div => {
    div.addEventListener('click', event => {
      let selectedInfoSecondary = event.currentTarget.firstElementChild.lastElementChild;
      let selectedFormSegmentEdit = event.currentTarget.lastElementChild;
      if (selectedInfoSecondary.hidden) {
        visualReset();
        selectedInfoSecondary.hidden = false;
      } else if (selectedFormSegmentEdit.hidden) {
        visualReset();
      }
    });
  });

  segmentEditAll.forEach(button => {
    button.addEventListener('click', event => {
      let selectedSegmentInfo = event.target.parentNode.parentNode;
      let selectedFormSegmentEdit = selectedSegmentInfo.nextElementSibling;
      console.log(selectedFormSegmentEdit);
      selectedSegmentInfo.hidden = true;
      selectedFormSegmentEdit.hidden = false;
    });
  });

  segmentEditCancelAll.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      visualReset();
    });
  });
})