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
engine = create_engine("postgres://qrzencvolteygr:dd6be5a3860dbbd0736b9b3ca2ebfcb0074849a16041ddc135d276dbfcc8956e@ec2-54-220-35-19.eu-west-1.compute.amazonaws.com:5432/ddmavhvjd8udo8")
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

@app.route("/")
def index():
    return render_template('index.html')
#    return (
#        f"Available Routes:<br/>"
#         f"<br/>"
#         f"<br/>"
#         f"/country<br/>"
#         f"<br/>"
#         f"/hotel_reviews<br/>"
#    )

@app.route("/country", methods=["GET"])
def country():
    #"""List all avaliable API routes."""

    #return (jsonify(country))

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
@app.route("/hotel_reviews", methods=["GET"])
def hotel_reviews():
    #"""List all avaliable API routes."""

    #return (jsonify(country))

    session = Session(engine)

    results1 = engine.execute("SELECT * FROM hotel_reviews").fetchall()

    #session.close()

    #create a list of dictionaries
    hotel_reviews=[]

    for i in results1:
        b = {"ID":i[0], 
            "Hotel_Name":i[1], 
            "Additional_Number_of_Scoring":i[2],
            "Review_Date":i[3],
            "Average_Score":i[4],
            "Reviewer_Nationality":i[5],
            "Negative_Review":i[6],
            "Review_Total_Negative_Word_Counts":i[7],
            "Total_Number_of_Reviews":i[8],
            "Positive_Review":i[9],
            "Review_Total_Positive_Word_Counts":i[10],
            "Total_Number_of_Reviews_Reviewer_Has_Given":i[11],
            "Reviewer_Score":i[12],
            "Tags":i[13],
            "days_since_review":i[14],
            "lat":i[15],
            "lng":i[16],
            }
        hotel_reviews.append(b)
    
    return jsonify(hotel_reviews)    

if __name__=='__main__':
    app.run(debug=True)
        