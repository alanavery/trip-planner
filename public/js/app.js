// Select div
const divPopup = document.querySelector('.div-popup');
const divFade = document.querySelector('.div-fade');
const divEditTrip = document.querySelector('.div-edit-trip');
const divDeleteTrip = document.querySelector('.div-delete-trip');

// Select form
const formAddEditSegment = document.querySelector('.form-add-edit-segment');

// Select input
const formSegmentDate = document.getElementById('form-segment-date');
const formSegmentSubcategory = document.getElementById('form-segment-subcategory');
const formSegmentBookedYes = document.getElementById('form-segment-booked-yes');
const formSegmentBookedNo = document.getElementById('form-segment-booked-no');

// Select link
const linkTripEdit = document.querySelector('.link-trip-edit');
const linkTripDelete = document.querySelector('.link-trip-delete');
const linkAddSegmentAll = document.querySelectorAll('.link-add-segment');
const linkEditSegmentAll = document.querySelectorAll('.link-edit-segment');
const cancel = document.querySelector('.cancel');
const save = document.querySelector('.save');

// Functions

const reset = () => {
  divPopup.hidden = true;
  divEditTrip.hidden = true;
  divDeleteTrip.hidden = true;
  formAddEditSegment.action = window.location.pathname;
  formAddEditSegment.reset();
};

const toggleForm = (div) => {
  if (div.hidden) {
    reset();
    div.hidden = false;
  } else {
    reset();
  }
};

const checkForSegmentInfo = (segment, infoType) => {
  const segmentInfo = segment.querySelector(`.segment-${infoType}`);
  if (segmentInfo) {
    const input = document.getElementById(`form-segment-${infoType}`);
    if (infoType === 'url') {
      input.value = segmentInfo.href;
    } else {
      input.value = segmentInfo.textContent;
    }
  }
};

// Add event listeners

cancel.addEventListener('click', reset);
divFade.addEventListener('click', reset);
linkTripEdit.addEventListener('click', () => toggleForm(divEditTrip));
linkTripDelete.addEventListener('click', () => toggleForm(divDeleteTrip));

linkAddSegmentAll.forEach((link) => {
  link.addEventListener('click', () => {
    toggleForm(divPopup);
    const day = link.parentElement.parentElement.parentElement;
    const dayDate = day.id.substring(link.id.length - 10);

    //Update form date
    formSegmentDate.value = dayDate;
  });
});

linkEditSegmentAll.forEach((link) => {
  link.addEventListener('click', () => {
    toggleForm(divPopup);
    const segment = link.parentElement.parentElement.parentElement;
    const segmentDate = segment.querySelector('.segment-date').textContent;
    const segmentId = segment.querySelector('.segment-id').textContent;

    // Update form date
    formSegmentDate.value = segmentDate;

    // Update form action attribute
    formAddEditSegment.action = `${window.location.pathname}/${segmentDate}/${segmentId}/?_method=put`;

    // Autofill form with segment info
    checkForSegmentInfo(segment, 'name');
    checkForSegmentInfo(segment, 'address');
    checkForSegmentInfo(segment, 'phone');
    checkForSegmentInfo(segment, 'url');
    checkForSegmentInfo(segment, 'notes');
    const subcategory = segment.querySelector('.segment-subcategory').textContent;
    const options = formSegmentSubcategory.querySelectorAll('option');
    options.forEach((option) => {
      if (option.textContent === subcategory) {
        option.selected = true;
      }
    });
    const booked = segment.querySelector('.segment-booked').textContent;
    if (booked === 'Yes') {
      formSegmentBookedYes.checked = true;
    } else {
      formSegmentBookedNo.checked = true;
    }
  });
});
