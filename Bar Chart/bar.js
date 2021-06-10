// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;
// ​Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 100,
  left: 100
};
// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
// ​// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);
// ​// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);
// ​// Load data from gdp-of-tv-watched.csv

url = ("country.json")
d3.json(url).then(function(country) {
  console.log(country);
// });

// d3.csv("country.csv").then(function(country) {
//   console.log(country);


// Cast the gdp value to a number for each piece of country
  // country.forEach(function(d) {
  //   d.gdp = +d.gdp;
  //   d.prct_rpt_crime = +d.prct_rpt_crime;
  //   d.prct_leisure_satis_high = +d.prct_leisure_satis_high;
  //   d.prct_life_satis_high = +d.prct_life_satis_high;
  //   d.prct_rpt_pollution = +d.prct_rpt_pollution;
  //   d.prct_yng_adt_pop = +d.prct_yng_adt_pop;
  //   d.police_trust_rating = +d.police_trust_rating;
  //   d.avg_temp = +d.avg_temp;
  //   d.avg_precipitation = +d.avg_precipitation;

    // country,
    // prct_rpt_crime,
    // gdp,
    // prct_leisure_satis_high,
    // prct_leisure_satis_med,
    // prct_leisure_satis_low,
    // prct_life_satis_high,
    // prct_life_satis_med,
    // prct_life_satis_low,
    // prct_rpt_pollution,
    // total_pop,
    // prct_yng_adt_pop,
    // police_trust_rating,
    // avg_temp,
    // avg_low_temp,
    // avg_precipitation
  // });
// ​  // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
  var xBandScale = d3.scaleBand()
    .domain(country.map(d => d.country))
    .range([0, chartWidth])
    .padding(0.1);
// ​  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(country, d => d.prct_leisure_satis_high)])
    .range([chartHeight, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);
// ​  // Append two SVG group elements to the chartGroup area,
//   // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis)
    .selectAll("text")
    .attr("transform", "rotate(-90)" )
    .attr("dx", "-4em")
    .attr("dy", "-0.9em")
    // .attr("transform", "rotate(-90)" );
// ​  // Create one SVG rectangle per piece of country
//   // Use the linear and band scales to position each rectangle within the chart
  var circlesGroup = chartGroup.selectAll(".bar")
    .data(country)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xBandScale(d.country))
    .attr("y", d => yLinearScale(d.prct_leisure_satis_high))
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => chartHeight - yLinearScale(d.prct_leisure_satis_high))

    // d3.csv("Radar_Country.csv").then(function(Radar_Country) {

      // Step 1: Parse Data/Cast as numbers
      // ==============================
      // Radar_Country.forEach(function(data) {
        
// country,prct_rpt_crime,prct_leisure_satis_high,prct_life_satis_high,prct_rpt_pollution,prct_yng_adt_pop,police_trust_rating,avg_temp,avg_precipitation


        // data.prct_rpt_crime = +data.prct_rpt_crime;
        // data.prct_leisure_satis_high = +data.prct_leisure_satis_high;
  
        // Radar_Country.forEach(function(data) {
        //   data.prct_rpt_crime = +data.prct_rpt_crime;
        //   data.prct_leisure_satis_high = +data.prct_leisure_satis_high;
        // });
  
     
    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.select("body")
      .append("div")
      .classed("tooltip", true);
    // Step 7: Create tooltip in the chart
    // ==============================
    circlesGroup.on("click", function(d) {
      toolTip.style("display", "block")
          .html(
            `<strong>${(d.country)} Salient Data <strong>
            <ul><li> Crime Reported in ${(d.country)} is ${(d.prct_rpt_crime)} Percent </li>
            <li> Leisure Satisfaction in ${(d.country)} is ${(d.prct_leisure_satis_high)} Percent</li>
            <li>Life Satisfaction in ${(d.country)} is ${ (d.prct_life_satis_high)} Percent </li>
            <li>Pollution in ${(d.country)} is ${(d.prct_rpt_pollution)} Pollution </li>
            <li>Poulation under 30 in ${(d.country)} is ${(d.prct_yng_adt_pop)} Percent </li>
            <li>Police trust in ${(d.country)} is ${(d.police_trust_rating)} Percent </li>
            <li>Average Temperature in ${(d.country)} is ${(d.avg_temp)} degrees fahrenhit </li>
            <li>Average Rainfall in ${(d.country)} is ${(d.avg_precipitation)} inches </li></ul>`) 
          .style("left", d3.event.pageX + "200")
          .style("top", d3.event.pageY + "px");
    })

    // d.prct_rpt_crime = +d.prct_rpt_crime;
    // d.prct_leisure_satis_high = +d.prct_leisure_satis_high;
    // d.prct_life_satis_high = +d.prct_life_satis_high;
    // d.prct_rpt_pollution = +d.prct_rpt_pollution;
    // d.prct_yng_adt_pop = +d.prct_yng_adt_pop;
    // d.police_trust_rating = +d.police_trust_rating;
    // d.avg_temp = +d.avg_temp;
    // d.avg_precipitation
    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    // .on("mouseout", function() {
    //   toolTip.style("display", "none");
    // });
    // var line1 = d3.line()
    // .x(d => xTimeScale(d.hair_length))
    // .y(d => yLinearScale1(d.prct_leisure_satis_high));



  }).catch(function(error) {
    console.log(error);
  });