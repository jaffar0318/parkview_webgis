var map = L.map('map').setView([33.7179, 73.2153], 17); // Park View City coordinates

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a marker for the Main Entrance of Park View City
L.marker([33.7179, 73.2153]).addTo(map)
  .bindPopup("Main Entrance - Park View City")
  .openPopup();

// Drawing layer
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
  edit: {
    featureGroup: drawnItems
  }
});
map.addControl(drawControl);

map.on('draw:created', function (e) {
  var layer = e.layer;
  drawnItems.addLayer(layer);
});
fetch("data/parkview_sample.geojson")
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup("Name: " + feature.properties.name);
        }
      }
    }).addTo(map);
  });
