$(document).ready(function() {
  // Width and Height of the whole visualization
  var w = 2000; 
  var h = 1000;  
  //D3 has some internal functionality that can turn GeoJSON data into screen coordinates based on the projection you set. This is not unlike other libraries such as Leaflet, but the result is much more open-ended, not constrained to shapes on a tiled Mercator map.1 So, yes, D3 supports projections.
  var projection = d3.geo.equirectangular()
  // Create GeoPath function that uses built-in D3 functionality to turn
// lat/lon coordinates into screen coordinates
  var path = d3.geo.path()
    .projection(projection);
  //add the following to create our SVG canvas.
  var svg = d3.select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h)
  svg.append('rect')
    .attr('width', w)
    .attr('height', h)
    .attr('fill', 'white');
  // Append empty placeholder g element to the SVG
  // g will contain geometry elements
  var g = svg.append("g");
  
  //add a call to d3.json to load the TopoJSON file
  //so it loads into our visualization
  d3.json('https://d3js.org/world-50m.v1.json', function(error, data) {
    if (error) console.error(error);
    g.append('path')
      .datum(topojson.feature(data, data.objects.countries))
      .attr('d', path);
    
    //create the zoom effect
    var zoom = d3.behavior.zoom()
      .on("zoom", function() {
        g.attr("transform", "translate(" +
          d3.event.translate.join(",") + ")scale(" + d3.event.scale + ")");
        g.selectAll("path")
          .attr("d", path.projection(projection));
      });
    svg.call(zoom);
    
    // Load the data from the json file
    var napoleon = {};
    napoleon.cities =
        [{"lon": 24.0 ,"lat":55.0 ,"name":"Kowno" },
         {"lon": 25.3 ,"lat":54.7 ,"name":"Wilna" },
         {"lon": 26.4 ,"lat":54.4 ,"name":"Smorgoni",dir:-1},
         {"lon": 26.8 ,"lat":54.3 ,"name":"Molodexno",dir:-1},
         {"lon": 27.7 ,"lat":55.2 ,"name":"Gloubokoe"},
         {"lon": 27.6 ,"lat":53.9 ,"name":"Minsk",dir:-1},
         {"lon": 28.5 ,"lat":54.3 ,"name":"Studienska",dir:-1},
         {"lon": 28.7 ,"lat":55.5 ,"name":"Polotzk"},
         {"lon": 29.2 ,"lat":54.4 ,"name":"Bobr",dir:-1},
         {"lon": 30.2 ,"lat":55.3 ,"name":"Witebsk"},
         {"lon": 30.4 ,"lat":54.5 ,"name":"Orscha",dir:-1},
         {"lon": 30.4 ,"lat":53.9 ,"name":"Mohilow",dir:-1},
         {"lon": 32.0 ,"lat":54.8 ,"name":"Smolensk"},
         {"lon": 33.2 ,"lat":54.9 ,"name":"Dorogobouge"},
         {"lon": 34.3 ,"lat":55.2 ,"name":"Wixma",dir:-1},
         {"lon": 34.4 ,"lat":55.5 ,"name":"Chjat"},
         {"lon": 36.0 ,"lat":55.5 ,"name":"Mojaisk"},
         {"lon": 37.6 ,"lat":55.8 ,"name":"Moscou"},
         {"lon": 36.6 ,"lat":55.3 ,"name":"Tarantino",dir:-1},
         {"lon": 36.5 ,"lat":55.0 ,"name":"Malo-jarosewli",dir:-1}
        ]
    napoleon.temp = [
        {lon:37.6, temp:0,   date:"18 Oct 1812"},
        {lon:36.0, temp:0,   date:"24 Oct 1812"},
        {lon:33.2, temp:-9,  date:"09 Nov 1812"},
        {lon:32.0, temp:-21, date:"14 Nov 1812"},
        {lon:29.2, temp:-11, date:"24 Nov 1812"},
        {lon:28.5, temp:-20, date:"28 Nov 1812"},
        {lon:27.2, temp:-24, date:"01 Dec 1812"},
        {lon:26.7, temp:-30, date:"06 Dec 1812"},
        {lon:25.3, temp:-26, date:"07 Dec 1812"}
    ];
    napoleon.army = [
        /* Group 1 */
        {lon:24.0,  lat:54.9,  size:340000, dir:1,  group:1},
        {lon:24.5,  lat:55.0,  size:340000, dir:1,  group:1},
        {lon:25.5,  lat:54.6,  size:340000, dir:1,  group:1},
        {lon:26.0,  lat:54.7,  size:320000, dir:1,  group:1},
        {lon:27.0,  lat:54.8,  size:300000, dir:1,  group:1},
        {lon:28.0,  lat:54.9,  size:280000, dir:1,  group:1},
        {lon:28.5,  lat:55.0,  size:240000, dir:1,  group:1},
        {lon:29.0,  lat:55.1,  size:210000, dir:1,  group:1},
        {lon:30.0,  lat:55.2,  size:180000, dir:1,  group:1},
        {lon:30.3,  lat:55.3,  size:175000, dir:1,  group:1},
        {lon:32.0,  lat:54.8,  size:145000, dir:1,  group:1},
        {lon:33.2,  lat:54.9,  size:140000, dir:1,  group:1},
        {lon:34.4,  lat:55.5,  size:127100, dir:1,  group:1},
        {lon:35.5,  lat:55.4,  size:100000, dir:1,  group:1},
        {lon:36.0,  lat:55.5,  size:100000, dir:1,  group:1},
        {lon:37.6,  lat:55.8,  size:100000, dir:1,  group:1},
        {lon:37.65, lat:55.65, size:100000, dir:-1, group:1},
        {lon:37.45, lat:55.62, size:98000,  dir:-1, group:1},
        {lon:37.0,  lat:55.0,  size:97000,  dir:-1, group:1},
        {lon:36.8,  lat:55.0,  size:96000,  dir:-1, group:1},
        {lon:35.4,  lat:55.3,  size:87000,  dir:-1, group:1},
        {lon:34.3,  lat:55.2,  size:55000,  dir:-1, group:1},
        {lon:33.3,  lat:54.8,  size:37000,  dir:-1, group:1},
        {lon:32.0,  lat:54.6,  size:24000,  dir:-1, group:1},
        {lon:30.4,  lat:54.4,  size:20000,  dir:-1, group:1},
        {lon:29.2,  lat:54.3,  size:20000,  dir:-1, group:1},
        {lon:29.13, lat:54.29, size:50000,  dir:-1, group:1}, /* joined by group 2 */
        {lon:28.5,  lat:54.2,  size:50000,  dir:-1, group:1},
        {lon:28.3,  lat:54.3,  size:48000,  dir:-1, group:1},
        {lon:26.8,  lat:54.3,  size:12000,  dir:-1, group:1},
        {lon:26.8,  lat:54.4,  size:14000,  dir:-1, group:1},
        {lon:25.0,  lat:54.4,  size:8000,   dir:-1, group:1},
        {lon:24.4,  lat:54.4,  size:4000,   dir:-1, group:1},
        {lon:24.2,  lat:54.4,  size:4000,   dir:-1, group:1},
        {lon:24.1,  lat:54.4,  size:4000,   dir:-1, group:1},
        /* Group 2 */
        {lon:24.0,  lat:55.1,  size:60000,  dir:1,  group:2},
        {lon:24.5,  lat:55.2,  size:60000,  dir:1,  group:2},
        {lon:25.5,  lat:54.7,  size:60000,  dir:1,  group:2},
        {lon:26.6,  lat:55.7,  size:40000,  dir:1,  group:2},
        {lon:27.4,  lat:55.6,  size:33000,  dir:1,  group:2},
        {lon:28.7,  lat:55.5,  size:33000,  dir:1,  group:2},
        {lon:28.7,  lat:55.5,  size:33000,  dir:-1, group:2},
        {lon:29.2,  lat:54.29, size:30000,  dir:-1, group:2},
        /* Group 3 */
        {lon:24.0,  lat:55.2,  size:22000,  dir:1,  group:3},
        {lon:24.5,  lat:55.3,  size:22000,  dir:1,  group:3},
        {lon:24.6,  lat:55.8,  size:6000,   dir:1,  group:3},
        {lon:24.6,  lat:55.8,  size:6000,   dir:-1, group:3},
        {lon:24.2,  lat:54.4,  size:6000,   dir:-1, group:3},
        {lon:24.1,  lat:54.4,  size:6000,   dir:-1, group:3}
    ];
      var locations = napoleon.cities;
      var hue = 0; //create the circles
      
      // we will pass our data (the TopoJSON) as an argument, then create SVG elements using a classic D3 append. Selecting all paths, the TopoJSON is bound in the data method. From here, we can perform work on each element.
      
      
      locations.map(function(d) {  // Create an object for holding dataset
        hue += 0.36                // Create property for each circle, give it value from color
        d.color = 'hsl(' + hue + ', 100%, 50%)';
      });
      debugger;
      // Classic D3... Select non-existent elements, bind the data, append the elements, and apply attributes
      g.selectAll('circle')
        .data(locations)
        .enter()
        .append('circle') //show the circles
        .attr('cx', function(d) {
          
            return projection([d.lon, d.lat])[0];
          
        })
        .attr('cy', function(d) {
          
            return projection([d.lon, d.lat])[1];
          
        })
        .attr('r', function(d) {
          if (d) {
            return 0.5;
          }
        })
        .style('fill', function(d) {
        //Use the Color Function to set the Fill Value for each circle
          return d.color;
        }).append("text")
      .text(function(d) {  if (d) {return d.name; }}).attr('cx', 6)
      .attr('cy', 3);
 // Classic D3... Select non-existent elements, bind the data, append the elements, and apply attributes
 g.selectAll('circle')
 .data(napoleon.army)
 .enter()
 .append('circle') //show the circles
 .attr('cx', function(d) {
   
     return projection([d.lon, d.lat])[0];
   
 })
 .attr('cy', function(d) {
   
     return projection([d.lon, d.lat])[1];
   
 })
 .attr('r', function(d) {
   if (d) {
     return 0.5;
   }
 }).style('fill', function(d) {
  //Use the Color Function to set the Fill Value for each circle
    return d.color;
  })

 

    });
  });
