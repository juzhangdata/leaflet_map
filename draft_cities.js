function markerSize(population) {
    return population * 30000;
}


function getColor(d) {
    return d > 6  ? '#BD0026' :
        d > 5  ? '#E31A1C' :
        d > 4  ? '#FC4E2A' :
        d > 3   ? '#FD8D3C' :
        d > 2   ? '#FEB24C' :
        d > 1   ? '#FED976' :
                    '#FFEDA0';
}

// Create a map object
var map = L.map("map", {
center: [37, -95],
zoom: 4
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery ÔøΩ <a href=\"https://www.mapbox.com/\">Mapbox</a>",
maxZoom: 18,
id: "mapbox.streets-basic",
accessToken: API_KEY
}).addTo(map);

var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(link).then(function(data){
    var cities = data.features
    for (var i = 0; i < cities.length; i++) {

        L.circle(cities[i].geometry.coordinates.slice(0,2).reverse(), {
        fillOpacity: 0.5,
        color: "white",
        fillColor: getColor(cities[i].properties.mag),
        // Setting our circle's radius equal to the output of our markerSize function
        // This will make our marker's size proportionate to its population
        radius: markerSize(cities[i].properties.mag)
    }
    )
    .bindPopup("<h1>" + cities[i].properties.place + "</h1> <hr> <h3>Magnitude: " + cities[i].properties.mag + "</h3>")
    .addTo(map);
    }
})


// legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

var div = L.DomUtil.create('div', 'info legend'),
grades = [0, 1, 2, 3, 4, 5],
labels = [];

// loop through our density intervals and generate a label with a colored square for each interval
for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
        '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
}

return div;
};

legend.addTo(map);