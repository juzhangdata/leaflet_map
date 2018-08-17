// Creating map object
var map = L.map("map", {
center: [50, -115],
zoom: 3
});

// 1st layer: boundaries
// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery ÔøΩ <a href=\"https://www.mapbox.com/\">Mapbox</a>",
maxZoom: 18,
id: "mapbox.streets",
accessToken: API_KEY
}).addTo(map);

var link = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// Grabbing our GeoJSON data..
d3.json(link).then(successHandle, errorHandle);

function errorHandle(error){
console.log("Error occurred! ", error)
}

function successHandle(data) {
// Creating a GeoJSON layer with the retrieved data
L.geoJson(data).addTo(map);
}
    