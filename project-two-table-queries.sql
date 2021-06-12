DROP TABLE cities;

CREATE TABLE cities (
	index VARCHAR(3),
	city_url VARCHAR(500),
	city_name VARCHAR(50),
	city_country VARCHAR(50)
);

SELECT * from cities;

ALTER TABLE cities 
DROP COLUMN index;

SELECT * from country;

DROP TABLE restaurants;

CREATE TABLE restaurants (
	index INT,
	restaurant_name VARCHAR (255),
	country VARCHAR (255),
	city VARCHAR (255),
	address VARCHAR (382),
	latitude float,
	longitude float,
	top_tags VARCHAR (255),
	price_range VARCHAR (255),
	meals VARCHAR (255),
	cuisines VARCHAR (255),special_diets VARCHAR (255),
	features VARCHAR (500),
	vegetarian_friendly VARCHAR (255),
	vegan_options VARCHAR (255),
	gluten_free VARCHAR (255),
	avg_rating float,
	total_reviews_count float,
	excellent float,
	very_good float,
	average float,
	poor float,
	terrible float,
	food float,
	service float,
	value float,
	atmosphere float
);

ALTER TABLE restaurants 
DROP COLUMN index;

SELECT * from restaurants;

SET datestyle = 'ISO,DMY';

DROP TABLE hotel_reviews_cleaned;

CREATE TABLE hotel_reviews_cleaned (
	Index VARCHAR (8),
	Hotel_Address VARCHAR (255),
	Average_Score float,
	Hotel_Name VARCHAR (255),
	Negative_Review VARCHAR,
	Positive_Review VARCHAR,
	Reviewer_Score float,
	Tags VARCHAR,
	lat float,
	lng float
);

SELECT * from  hotel_reviews_cleaned;
SELECT * from  hotel_reviews;

DROP TABLE main_trains;

CREATE TABLE main_trains (
	id VARCHAR (8),
	name VARCHAR (255),
	name_norm VARCHAR (255),
	uic float,
	latitude float,
	longitude float,
	parent_station_id float,
	country VARCHAR (255),
	time_zone VARCHAR (255),
	is_city Boolean,
	is_main_station Boolean,
	is_airport Boolean
);

SELECT * from  main_trains;