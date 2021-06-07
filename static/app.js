var c_data="/country";

d3.json(c_data, country_data=> {
    console.log("country data")
    console.log(country_data);
});

var h_data="/hotel_reviews_cleaned";

d3.json(h_data, hotel_data=> {
    console.log("hotel reviews_cleaned")
    console.log(hotel_data);
});

var r_data="/restaurants";

d3.json(r_data, rests_data=> {
    console.log("restaurants")
    console.log(rests_data);
});

var cities_data="/cities";

d3.json(cities_data, cities_data=> {
    console.log("cities")
    console.log(cities_data);
});

var trains_data="/trains";

d3.json(trains_data, t_data=> {
    console.log("train stations")
    console.log(t_data);
});