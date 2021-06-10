import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
from sqlalchemy import create_engine

from flask import Response,json

from flask import Flask, jsonify

from flask import Flask, render_template

##############################
# Database Setup
##############################
engine = create_engine("postgresql://qrzencvolteygr:dd6be5a3860dbbd0736b9b3ca2ebfcb0074849a16041ddc135d276dbfcc8956e@ec2-54-220-35-19.eu-west-1.compute.amazonaws.com:5432/ddmavhvjd8udo8")
Base = automap_base()

Base.prepare(engine, reflect=True)

#Save reference to the table
#country = Base.classes.country
#

#########################
# Flask Setup
#########################
app = Flask(__name__)

#########################
# Flask Routes
#########################

# ===================Web pages==============
@app.route("/")
def index():
    return render_template('index.html')

@app.route("/statistic")
def statistic():
    return render_template('statistic.html')

@app.route("/comparisonbar")
def comparisonbar():
    return render_template('comparisonbar.html')

@app.route("/comparison")
def comparison():
    return render_template('comparison.html')

@app.route("/map")
def map():
    return render_template('map.html')

@app.route("/aboutus")
def aboutus():
    return render_template('aboutus.html')

# ==================APIs====================

@app.route("/country", methods=["GET"])
def country():

    session = Session(engine)

    results = engine.execute("SELECT * FROM country").fetchall()

    #session.close()

    #create a list of dictionaries
    country=[]

    for i in results:
        a = {"country":i[2], 
            "prct_rpt_crime":i[3], 
            "gdp":i[4],
            "prct_leisure_satis_high":i[5],
            "prct_leisure_satis_med":i[6],
            "prct_leisure_satis_low":i[7],
            "prct_life_satis_high":i[8],
            "prct_life_satis_med":i[9],
            "prct_life_satis_low":i[10],
            "prct_rpt_pollution":i[11],
            "total_pop":i[12],
            "prct_yng_adt_pop":i[13],
            "police_trust_rating":i[14],
            "avg_temp":i[15],
            "avg_low_temp":i[16],
            "avg_precipitation":i[17]
            }
        country.append(a)
    
    return jsonify(country)


#---Hotel Review API----
@app.route("/restaurants", methods=["GET"])
def restaurants():
    

    session = Session(engine)

    results3 = engine.execute("SELECT * FROM restaurants where avg_rating = 5").fetchall()

    #create a list of dictionaries
    restaurants=[]

    for i in results3:
        d = {
            "restaurant_name": i[0],
            "country": i[1],
            "city": i[2],
            "address": i[3],
            "lat": i[4],
            "lng": i[5],
            "top_tags": i[6],
            "price_range": i[7],
            "meals": i[8],
            "cuisines": i[9],
            "special_diets": i[10],
            "features": i[11],
            "vegetarian_friendly": i[12],
            "vegan_option": i[13],
            "gluten_free": i[14],
            "ave_rating": i[15],
            "total_reviews_count": i[16],
            "excellent": i[17],
            "very_good": i[18],
            "average": i[19],
            "poor": i[20],
            "terrible": i[21],
            "food": i[22],
            "service": i[23],
            "value": i[24],
            "atomosphere": i[25]
            }     
        restaurants.append(d)
    
    return jsonify(restaurants)  

#---Hotel Review_Cleaned API----
@app.route("/hotel_reviews_cleaned", methods=["GET"])
def hotel_reviews_cleaned():
    #"""List all avaliable API routes."""

    #return (jsonify(country))

    session = Session(engine)

    results2 = engine.execute("SELECT * FROM hotel_reviews_cleaned").fetchall()

    #session.close()

    #create a list of dictionaries
    hotel_reviews_cleaned=[]


    for i in results2:
        c = {"ID":i[0], 
            "Hotel_Address":i[1],
            "Average_Score":i[2],
            "Negative_Review":i[4],
            "Positive_Review":i[5],
            "Reviewer_Score":i[6],
            "Lat":i[8],
            "Lng":i[9]
            }
        hotel_reviews_cleaned.append(c)
    
    return jsonify(hotel_reviews_cleaned)    
    

#---Top 100 Cities  API----
@app.route("/cities", methods=["GET"])
def cities():

    session = Session(engine)

    results_c = engine.execute("SELECT * FROM cities").fetchall()

    #session.close()

    #create a list of dictionaries
    cities=[]


    for i in results_c:
        e = {"id": i[0],
            "city_url":i[1],
            "city_name": i[2],
            "city_country": i[3],
            "lat": i[4],
            "lng": i[5]
            }
        cities.append(e)
    
    return jsonify(cities) 


#---Train Station API----
@app.route("/trains", methods=["GET"])
def trains():

    session = Session(engine)

    results_t = engine.execute("SELECT * FROM main_trains").fetchall()

    #session.close()

    #create a list of dictionaries
    trains=[]

    for i in results_t:
        f = {"id":i[0],
            "name": i[1],
            "name_norm": i[2],
            "uic": i[3],
            "lat": i[4],
            "lng": i[5],
            "parent_station_id": i[6],
            "country": i[7],
            "time_zone": i[8],
            "is_city": i[9],
            "is_main_station:": i[10],
            "is_airport": i[11]
            }
        trains.append(f)
    
    return jsonify(trains) 

if __name__=='__main__':
    app.run(debug=True)
        