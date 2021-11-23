// This example adds a user-editable rectangle to the map.
// When the user changes the bounds of the rectangle,
// an info window pops up displaying the new bounds.
let rectangle;
let map;
let infoWindow;


let lat, lon

function getLocale() {
    if(!navigator.geolocation)
        return null

    navigator.geolocation.getCurrentPosition(pos => {
        lat = pos.coords.latitude
        lon = pos.coords.longitude
        initMap()
    })
}

function initMap() {
    console.log(lat, lon)
    map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: lat, lng: lon },
    zoom: 9,
  });

  const marker = new google.maps.Marker({
      position: {lat: lat, lng: lon},
      map: map
  })

  const bounds = {
    north: -16.6477186,
    south: -16.6577186,
    east: -49.2150848,
    west: -49.2350848,
  };

  // Define the rectangle and set its editable property to true.
  rectangle = new google.maps.Rectangle({
    bounds: bounds,
    editable: true,
    draggable: true,
  });
  rectangle.setMap(map);
  // Add an event listener on the rectangle.
  rectangle.addListener("bounds_changed", showNewRect);
  // Define an info window on the map.
  infoWindow = new google.maps.InfoWindow();
}



/** Show the new coordinates for the rectangle in an info window. */
function showNewRect() {
  const ne = rectangle.getBounds().getNorthEast();
  const sw = rectangle.getBounds().getSouthWest();
  const contentString =
    "<b>Rectangle moved.</b><br>" +
    "New north-east corner: " +
    ne.lat() +
    ", " +
    ne.lng() +
    "<br>" +
    "New south-west corner: " +
    sw.lat() +
    ", " +
    sw.lng();

  // Set the info window's content and position.
  infoWindow.setContent(contentString);
  infoWindow.setPosition(ne);
  infoWindow.open(map);
} getLocale()
