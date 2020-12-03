let placeSearch;
let autocomplete;

let componentForm = {
  street_number: 'short_name',
  administrative_area_level_1: 'short_name',
  postal_code: 'short_name'
};

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('search-term')
  );
  autocomplete.addListener('place_changed', logResults);
}

function logResults() {
  let place = autocomplete.getPlace();
  console.log(place);
};