var c_data="/country";

d3.json(c_data, country_data=> {
    console.log("country data")
    console.log(country_data);
});

// d3.json("/country").then(function(data) {
//     console.log(data);
// });

var h_data="/hotel_reviews";

d3.json(h_data, hotel_data=> {
    console.log("hotel reviews")
    console.log(hotel_data);
});