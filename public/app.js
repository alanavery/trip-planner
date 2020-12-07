let tripEdit = document.querySelector('.trip-edit');
let tripDelete = document.querySelector('.trip-delete');
let secTripEdit = document.querySelector('.sec-trip-edit');
let secTripDelete = document.querySelector('.sec-trip-delete');
let allAddSegmentButtons = document.querySelectorAll('.add-segment-button');
let divMoreInfoAll = document.querySelectorAll('.div-more-info');
let divSegmentInfoSecondaryAll = document.querySelectorAll('.div-segment-info-secondary');
let buttonSegEdit = document.querySelectorAll('.button-seg-edit');
let secEditSegment = document.querySelector('.sec-edit-segment');
let divSegmentInfoAll = document.querySelectorAll('.div-segment-info');
let segmentEditCancelAll = document.querySelectorAll('.segment-edit-cancel');
let addSegmentSec = document.querySelector('.add-segment');
let addSegmentDate = document.getElementById('add-segment-date');

let visualReset = () => {
  secTripDelete.hidden = true;
  secTripEdit.hidden = true;
  addSegmentSec.hidden = true;
  secEditSegment.hidden = true;
  divSegmentInfoAll.forEach(div => div.hidden = false);
  divSegmentInfoSecondaryAll.forEach(div => div.hidden = true);
};

if (tripEdit) {
  tripEdit.addEventListener('click', () => {
    if (secTripEdit.hidden) {
      visualReset();
      secTripEdit.hidden = false;
    } else {
      visualReset();
      // secTripEdit.hidden = true;
    }
  });
}

if (tripDelete) {
  tripDelete.addEventListener('click', () => {
    if (secTripDelete.hidden) {
      visualReset();
      secTripDelete.hidden = false;
    } else {
      visualReset();
      // secTripDelete.hidden = true;
    }
  });
}

allAddSegmentButtons.forEach(button => {
  button.addEventListener('click', event => {
    if (addSegmentSec.hidden) {
      visualReset();
      addSegmentSec.hidden = false;
      let divday = event.target.parentElement.parentElement.parentElement;
      let dayId = divday.id.substring(4);
      console.log(dayId);
      addSegmentDate.value = dayId;
    } else {
      visualReset();
    }
  });
});

buttonSegEdit.forEach(button => {
  button.addEventListener('click', event => {
    if (secEditSegment.hidden) {
      visualReset();
      secEditSegment.hidden = false;
      let secondaryInfo = event.target.parentElement.parentElement;
      let primaryInfo = secondaryInfo.previousElementSibling;
      let editform = document.querySelector('.form-segment-edit');
      let divday = primaryInfo.parentElement.parentElement.parentElement.parentElement.parentElement;
      let dayId = divday.id.substring(4);
      let segId = primaryInfo.querySelector('.segment-id').textContent;
      editform.action = editform.action + dayId + '/' + segId + '/?_method=put';
      console.log(editform.action);
      let subcategory = primaryInfo.querySelector('.seg-subcategory').textContent;
      console.log(subcategory);
      let options = document.getElementById('segment-subcategory').querySelectorAll('option');
      options.forEach(option => {
        if (option.innerText = subcategory) {
          option.selected = true;
        }
      });
      let name = primaryInfo.querySelector('.seg-name').textContent;
      document.getElementById('segment-name').value = name;
      if (secondaryInfo.querySelector('.seg-address')) {
        let address = secondaryInfo.querySelector('.seg-address').textContent;
        document.getElementById('segment-address').value = address;
      }
      if (secondaryInfo.querySelector('.seg-phone')) {
        let phone = secondaryInfo.querySelector('.seg-phone').textContent;
        document.getElementById('segment-phone').value = phone;
      }
      if (secondaryInfo.querySelector('.seg-url')) {
        let url = secondaryInfo.querySelector('.seg-url').href;
        document.getElementById('segment-url').value = url;
      }
      if (secondaryInfo.querySelector('.seg-notes')) {
        let notes = secondaryInfo.querySelector('.seg-notes').textContent;
        document.getElementById('segment-notes').value = notes;
      }
      let booked = secondaryInfo.querySelector('.seg-booked').textContent;
      if (booked === 'Yes') {
        document.getElementById('segment-booked-yes').checked = true;
      } else {
        document.getElementById('segment-booked-no').checked = true;
      }
    } else {
      visualReset();
    }
  });
});

segmentEditCancelAll.forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    visualReset();
  });
});