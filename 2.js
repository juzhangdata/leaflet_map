//2nd layer
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

var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

// // Grabbing our GeoJSON data..
// d3.json(link).then(successHandle, errorHandle);

// function errorHandle(error){
// console.log("Error occurred! ", error)
// }

// function successHandle(data) {
// // Creating a GeoJSON layer with the retrieved data
// L.geoJson(data).addTo(map);
// }

d3.json(link).then(function(data){
    var cities = data.features
    for (var i = 0; i < cities.length; i++) {
        L.circle(cities[i].geometries.coordinates, {
            fillOpacity: 0.75,
            color: "white",
            fillColor: "purple",
            // Setting our circle's radius equal to the output of our markerSize function
            // This will make our marker's size proportionate to its population
            radius: markerSize(cities[i].properties.mag)
        }).bindPopup("<h1>" + cities[i].properties.place + "</h1> <hr> <h3>Magnitude: " + cities[i].properties.mag + "</h3>").addTo(myMap);
    }
})

    