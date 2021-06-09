//My code
var svgWidth = 900;
var svgHeight = 750;

var margin = {
  top: 20,
  right: 80,
  bottom: 200,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#stacked-chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  //.attr("viewBox", [0, 0, width, height]);

// Append an SVG group
//var chartGroup = svg.append("g")
  //.attr("transform", `translate(${margin.left}, ${margin.top})`);
c_data = "/country"

d3.json(c_data, Safetydata=> {

  // Print the tvData
  console.log(Safetydata);

})
  // Cast the hours value to a number for poverty and healthcare
  Safetydata.forEach(function(data) {(
    data.UpperClass = +data.UpperClass,
    data.MiddleClass = +data.MiddleClass,
    data.LowerClass = +data.LowerClass,
    data.SafetyFromCrime = +data.SafetyFromCrime,
    data.AirBreathability = +data.AirBreathability,
    data.PoliceTrust = +data.PoliceTrust,
    data.Country = data.Country)});
    
    
var series = d3.stack()
    .keys(Safetydata.columns.slice(1))
  (Safetydata)
    .map(d => (d.forEach(v => v.key = d.key), d));

x = d3.scaleBand()
    .domain(Safetydata.map(d => d.Country))
    .range([margin.left, width - margin.right])
    .padding(0.1);

y = d3.scaleLinear()
    .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
    .rangeRound([height - margin.bottom, margin.top]);

color = d3.scaleOrdinal()
    .domain(series.map(d => d.key))
    .range(d3.schemeSpectral[series.length])
    .unknown("#ccc");  
    
var legend = svg.selectAll(".legend")
    .data(Safetydata.columns.slice(1).reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; })
      .style("font", "10px sans-serif");

  legend.append("rect")
      //.attr("x", width - 18)
      .attr("x", width + 25)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", color);

  legend.append("text")
      //.attr("x", width - 24)
      .attr("x", width + 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .text(function(d) { return d; });
                    
//Chart Building
    
chart = 
  svg.append("g")
    .selectAll("g")
    .data(series)
    .join("g")
      .attr("fill", d => color(d.key))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
      .attr("x", (d, i) => x(d.data.Country))
      .attr("y", d => y(d[1]))
      .attr("height", d => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth())
      .append("title")
      .text(d => `${Safetydata.Country}`);

  svg.append("g")
      .call(xAxis)
        .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");

  svg.append("g")
      .call(yAxis);
    // });

//////////////////////////////////////////

xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .call(g => g.selectAll(".domain").remove());

yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, "s"))
    .call(g => g.selectAll(".domain").remove());


