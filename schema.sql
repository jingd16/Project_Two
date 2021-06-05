 --==================================hotel_reviews table==============
 --Drop table if exist
 DROP TABLE hotel_reviews;
 
 --Create table
  --dept_no and emp_no combined as composite key
 CREATE TABLE hotel_reviews (
	ID VARCHAR(255),
 	Hotel_Name VARCHAR(255),
	Additional_Number_of_Scoring INT,
	Review_Date VARCHAR(255),
	Average_Score FLOAT,
	Reviewer_Nationality VARCHAR(255),
	Negative_Review VARCHAR(5000),
	Review_Total_Negative_Word_Counts INT,
	Total_Number_of_Reviews INT,
	Positive_Review VARCHAR(5000),
	Review_Total_Positive_Word_Counts INT,
	Total_Number_of_Reviews_Reviewer_Has_Given INT,
	Reviewer_Score VARCHAR(255),
	Tags VARCHAR(255),
	 days_since_review VARCHAR(255),
	 lat FLOAT,
	 lng FLOAT	
 );