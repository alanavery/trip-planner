let autocomplete;
let formSegmentSearch = document.getElementById('form-segment-search');
let formSegmentName = document.getElementById('form-segment-name');
let formSegmentAddress = document.getElementById('form-segment-address');
let formSegmentPhone = document.getElementById('form-segment-phone');
let formSegmentUrl = document.getElementById('form-segment-url');

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(formSegmentSearch);
  autocomplete.setFields(['name', 'formatted_address', 'formatted_phone_number', 'website']);
  autocomplete.addListener('place_changed', fillInInfo);
}

function fillInInfo() {
  formSegmentAddress.value = '';
  formSegmentPhone.value = '';
  formSegmentUrl.value = '';
  let info = autocomplete.getPlace();
  formSegmentName.value = info.name;
  if (info.formatted_address) {
    formSegmentAddress.value = info.formatted_address;
  }
  if (info.formatted_phone_number) {
    formSegmentPhone.value = info.formatted_phone_number;
  }
  if (info.website) {
    formSegmentUrl.value = info.website;
  }
}

formSegmentSearch.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
});
