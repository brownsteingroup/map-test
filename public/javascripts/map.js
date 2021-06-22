//Global variables for submiti function
let geocoder, map, marker;
// Initialize and add the map
function initMap() {
  //Latitude/longitude of map starting point
  const mapStart = {
    lat: 37.090240,
    lng: -95.712891
  };
  //Generate he map
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: mapStart,
    styles: mapStyles,
  });
  //Generate a starting marker
  marker = new google.maps.Marker({
    position: mapStart,
    map: map,
    icon: 'images/pin-test.png',
  });
  geocoder = new google.maps.Geocoder();
}

// Geocode function
const address = document.getElementById("address").value;

function geocodeAddress(geocoder, resultsMap, address) {
  geocoder.geocode({
    address: address
  }, (results, status) => {
    if (status === "OK") {
      resultsMap.setCenter(results[0].geometry.location);
      new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
        icon: 'images/pin-test.png',
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

// Animate map zoom after submitting address
function smoothZoom(map, max, cnt) {
  if (cnt >= max) {
    return;
  } else {
    z = google.maps.event.addListener(map, 'zoom_changed', function(event) {
      google.maps.event.removeListener(z);
      smoothZoom(map, max, cnt + 1);
    });
    setTimeout(function() {
      map.setZoom(cnt)
    }, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
  }
}

//Handle form data on submit
$('form').submit(function(e) {
  e.preventDefault();
  //Get form data as array, uses numeric keys so need to convert to object
  var myData = $(this).serializeArray();
  //Convert array to object
  var addressParts = {};
  $(myData).each(function(index, obj) {
    addressParts[obj.name] = obj.value;
  });
  //Take address object and output standard formatted address string for geocoding
  var addressString;
  addressString = addressParts.address + ", " + addressParts.city + ", " + addressParts.state + ", " + addressParts.country;
  console.log(addressString);
  //TODO: Do geocoding here
  geocodeAddress(geocoder, map, addressString);
  smoothZoom(map, 15, map.getZoom());
});
