

var streets = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "️ < a href=' '>Mapbox</ a> ️ < a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</ a> <strong>< a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</ a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: 'pk.eyJ1IjoiamluZ2QxNiIsImEiOiJja3Azc2dzbmEwMGl6Mm9yN2Jya2JnMnM1In0.IhXkxlhkjKEqwuhE-EI5cw'
})

var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "️ < a href=' '>Mapbox</ a> ️ < a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</ a> <strong>< a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</ a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: 'pk.eyJ1IjoiamluZ2QxNiIsImEiOiJja3Azc2dzbmEwMGl6Mm9yN2Jya2JnMnM1In0.IhXkxlhkjKEqwuhE-EI5cw'
})

cities = "/cities"
hotel = "/hotel_reviews_cleaned"
trains = "/trains"
rests_data = "/restaurants";

var cityIcon = L.icon({
  iconUrl: "static/images/city3.png",
  iconSize: [70,70]
});

var hotelIcon = L.icon({
  iconUrl: "static/images/hotel4.png",
  iconSize: [70,70]
});

var restaurantIcon = L.icon({
  iconUrl: "static/images/restaurant2.png",
  iconSize: [60,60]
});

var trainIcon = L.icon({
  iconUrl: "static/images/train4.png",
  iconSize: [70,70]
});

d3.json(hotel, function(hotels) {
  console.log(hotels);
  d3.json(cities,function(city){
    console.log(city);
    d3.json(rests_data,function(food){
      console.log(food);
      d3.json(trains,function(train){
        console.log(train);

  var hotelMarkers = L.markerClusterGroup();
  var cityMarkers =L.markerClusterGroup();
  var restMarkers = L.markerClusterGroup();
  var trainMarkers = L.markerClusterGroup();
 
  for (var i = 0; i < hotels.length; i++) {
   
 var hotel_coordinates = [hotels[i].Lat,hotels[i].Lng]
 //console.log(hotel_coordinates)
 var hotel_popup_content = `<h3><strong>${hotels[i].Hotel_Name}<strong></h3>
                            <hr>
                            <p>Positives: ${hotels[i].Positive_Review}</p>
                            <hr>
                            <p>Average Review: ${hotels[i].Average_Score}</p>
                            <hr>
                            <p>Address: ${hotels[i].Hotel_Address}</p>`
      
  hotelMarkers.addLayer(L.marker(hotel_coordinates, {icon: hotelIcon, draggable: false})
      .bindPopup(hotel_popup_content, {maxWidth: "350"}));
    }
    for (var i = 0; i < city.length; i++) {
      if(city[i].lat!=null && city[i].lng!=null){
    var city_coordinates = [city[i].lat,city[i].lng]
    //console.log(city_coordinates)
    var city_popup_content = `<h3><strong>${city[i].city_name}<strong></h3>
                            <hr>
                            <h4>${city[i].city_country}</h4>`
                            //<hr>
                            //Population: ${city[i].population}`
        
    cityMarkers.addLayer(L.marker(city_coordinates, {icon: cityIcon, draggable: false})
          .bindPopup(city_popup_content, {maxWidth: "250"}));
      }
    }
        for (var i = 0; i < food.length; i++) {
      
          var food_coordinates = [food[i].lat,food[i].lng]
          //console.log(food_coordinates)
      
          var rest_popup_content = `<h2><strong>${food[i].restaurant_name}<strong></h2>
                                    <hr>
                                    <strong>Cuisine: </strong>${food[i].cuisines}
                                    <hr>
                                    Price range:  ${food[i].price_range}
                                    <hr>
                                    Gluten free options available: ${food[i].gluten_free}
                                    <hr>
                                    Vegan friendly: ${food[i].vegan_option}
                                    <hr>
                                    Vegetarian friendly: ${food[i].vegetarian_friendly}
                                    <hr>
                                    In summary, reviewers have given ${food[i].restaurant_name} an value for money rating of ${food[i].value}.</p>`
                
            restMarkers.addLayer(L.marker(food_coordinates, {icon: restaurantIcon, draggable: false})
                  .bindPopup(rest_popup_content, {maxWidth: "250"}));
              }
            for (var i = 0; i < train.length; i++) {
      
              var train_coordinates = [train[i].lat,train[i].lng]
              //console.log(train_coordinates)
            
              var train_popup_content = `<h3><strong>${train[i].name} (${train[i].country})<strong></h3>`
                    
                trainMarkers.addLayer(L.marker(train_coordinates, {icon: trainIcon, draggable: false})
                      .bindPopup(train_popup_content, {maxWidth: "250"}));
                  }

  var baseMaps = {
    "Street Map": streets,
    "Light": light
  }

    var overlayMaps = {
      "Hotels": hotelMarkers,
      "Cities": cityMarkers,
      "Restaurants": restMarkers,
      "Trains": trainMarkers
    }

    var myMap = L.map("map", {
      center: [52.8566, 2.3522],
      zoom: 4,
      layers: [light, cityMarkers]
    });

    L.control.layers(baseMaps, overlayMaps).addTo(myMap)
    
    });
  })
})
})