let autocomplete;
let addSegmentName = document.getElementById('add-segment-name');
let addSegmentAddress = document.getElementById('add-segment-address');
let addSegmentPhone = document.getElementById('add-segment-phone');
let addSegmentUrl = document.getElementById('add-segment-url');

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('add-segment-search')
  );
  autocomplete.setFields(['name', 'formatted_address', 'formatted_phone_number', 'website']);
  autocomplete.addListener('place_changed', fillInInfo);
}

function fillInInfo() {
  addSegmentAddress.value = '';
  addSegmentPhone.value = '';
  addSegmentUrl.value = '';
  let info = autocomplete.getPlace();
  addSegmentName.value = info.name;
  if (info.formatted_address) {
    addSegmentAddress.value = info.formatted_address;
  }
  if (info.formatted_phone_number) {
    addSegmentPhone.value = info.formatted_phone_number;
  }
  if (info.website) {
    addSegmentUrl.value = info.website;
  }
};