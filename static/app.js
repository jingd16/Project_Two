//==============================country=====================
var c_data="/country";

d3.json(c_data, country_data=> {
    console.log("country data")
    console.log(country_data);
});

//=============================hotel===========================
var h_data="/hotel_reviews_cleaned";

d3.json(h_data, hotel_data=> {
    console.log("hotel reviews_cleaned")
    console.log(hotel_data);
});

//============================restaurants=======================
var r_data="/restaurants";

d3.json(r_data, rests_data=> {
    console.log("restaurants")
    console.log(rests_data);
});


//==========================trains===============================
var trains_data="/trains";

d3.json(trains_data, t_data=> {
    console.log("train stations")
    console.log(t_data);
});

//============================cities=============================
var cities_data="/cities";

var myMap = L.map("map", {
    center: [48.8566, 16.3522],
    zoom: 4
  });

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: "pk.eyJ1IjoiamluZ2QxNiIsImEiOiJja3Azc2dzbmEwMGl6Mm9yN2Jya2JnMnM1In0.IhXkxlhkjKEqwuhE-EI5cw"
}).addTo(myMap);


d3.json(cities_data, cities_data=> {
    console.log("cities")
    console.log(cities_data);
    
    var cityIcon = L.icon({
    iconUrl: "static/images/city5.png",
    iconSize: [50,50]
    });
   
    for (var i=0; i<cities_data.length; i++) {
        //var c=generateRandomColor();
        if (cities_data[i].lat) {
            var location = [cities_data[i].lat, cities_data[i].lng];
            var popup_content = `<h3><strong>${cities_data[i].city_name}<strong></h3>
                                <hr>
                                <h4>${cities_data[i].city_country}</h4>
                                <hr>
                                <img src=${cities_data[i].city_url} alt="${cities_data[i].city_name} width="300" height="240"></img>`
            L.marker(location, {icon: cityIcon, draggable: false})
            .bindPopup(popup_content, {maxWidth: "auto"})
            .addTo(myMap);
        }
    }
});