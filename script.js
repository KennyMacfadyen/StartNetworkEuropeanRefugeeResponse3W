//// Global variables


//// Data Table

d3.json("data.json", function(error, data){

var dataTable = dc.dataTable("#dc-data-table");

var tableData = crossfilter(data);
var all = tableData.groupAll();
var dimension = tableData.dimension(function (d) {
  return d.Agency;
});


dataTable.width(960).height(5000)
.dimension(dimension)
.group(function(d) {return "Who What Where"})
.columns([
  function(d) {return d.Agency;},
  function(d) {return d.Sector;},
  function(d) {return d.Country;},
  function(d) {return d.Province;},
]);

dc.renderAll();
//
// data.forEach(function(d){
//   // d.Agency = d.text;
//   // d.Sector = d.text;
//   // d.Province = d.text;
// });
//
// var facts = crossfilter(data);
//
// dataTable
// .width(960).height(800)
// // .dimension()
//   // .group(function(d){return "3W Table"
//   // })
// .size(10)
// .columns([
//   function(d){return d.Agency;},
//   function(d){return d.Sector;},
//   function(d){return d.Province;},
//         ])
// .sortBy(function(d){return d.Agency; })
// .order(d3.ascending);
//
});


//// Athens Map

      d3.json("neighbourhoodsSimple.json", function(data) {

        var svg = d3.select("#AthensMap")
            .append("svg")
                .attr("width", 400)
                .attr("height", 600);

        var group2 = svg.selectAll("g")
            .data(data.features)
            .enter()
            .append("g")

            var projection2 = d3.geo.mercator()
            .center([23.839, 37.98])
            .scale(180000)

            var path2 = d3.geo.path()
            .projection(projection2);

            var areas2 = group2.append("path")

                .attr("d", path2)
                .attr("class", "area")
                .attr("fill", "lightgray")
                .attr("fill-opacity", 0.5)
                .attr("stroke", "gray")
                // .on("mouseover", function(){
                //   d3.select(this)
                //     .attr("fill", "orange")
                // })
                // .on("mouseout", function(){
                //   d3.select(this)
                //     .attr("fill", "lightgray")});


                      // d3.json("data.json", function(error, data){
                      //
                      // var areas2 = group2.enter(data)
                      //   data(function (data) {
                      //     (d.Agency);
                      //   });
                      // });
      //// Athens Map Circles

                d3.json("data.json", function(error, data){

                  // var scale = d3.scale.linear()
                  //           .domain ([1, 10])
                  //           .range([0, 50]);
                  //
                  // var color = d3.scale.linear()
                  //           .domain ([1, 200])
                  //           .range(["green", "red"]);
                  //

                  var circle2 = svg.selectAll("circle")
                  .data(data)
                  .enter().append("circle");

                  var tooltip2 = d3.select("body").append("div")
                      .attr("class", "tooltip2");

                  circle2
                      .attr("cx", function(d){
                        return projection2([d.Longitude, d.Latitude])[0];
                      })
                      .attr("cy", function(d){
                        return projection2([d.Longitude, d.Latitude])[1];
                      })
                      // .attr("cx", function(d){
                      //   return projection(d.coordinates)[0];
                      // })
                      // .attr("cy", function(d){
                      //   return projection(d.coordinates)[1];
                      // })
                      .attr("r", 15)
                      .attr("fill", "lightsteelblue")
                      .attr("fill-opacity", 0.2)
                      .attr("stroke", "steelblue")
                      .on("mouseover", function(d){
                        d3.select(this)
                          .attr("fill-opacity", 0.7)
                      tooltip2.html((d.Agency) + "</br>" + (d.Province) +"</br>")
                            .style("left", (d3.event.pageX) + "px")
                            .style("top", (d3.event.pageY - 28) + "px")
                      tooltip2.transition()
                            .style("opacity", 0.9);
                      })
                      .on("mouseout", function(d){
                        d3.select(this)
                            .attr("fill-opacity", 0.2)
                        tooltip2.transition()
                            .duration(50)
                            .style("opacity", 0);
                    })
                });
            });

//// Row Chart

d3.json("data.json", function (error, data){

var svg = d3.select("#Agency")
      .append("svg")
          .attr("width", 340)
          .attr("height", 600);

var scale = d3.scale.linear()
            .domain([1, 50])
            .range([1, 50]);

var color = d3.scale.linear()
            .domain([5, 15])
            .range(["red", "green"]);

          var rect = svg.selectAll("rect")
          .data(data)
          .enter().append("rect");

        rect
        .attr("x", function(d){
          return scale (d.Sector.length);
        })
        .attr("y", function(d){
          return scale (d.Agency.length);
        })
        // .attr("r", 10)
        .attr("width", 5)
        .attr("height", 10)
        .attr("fill", function(d){
          return color (d.Sector.length);
        });
});

//// Greece Map

var svg = d3.select("#Map")
    .append("svg")
        .attr("width", 500)
        .attr("height", 600);


// d3.json("ERR2_Admin0.json", function(data) {
//
//   var group = svg.selectAll("g")
//       .data(data.features)
//       .enter()
//       .append("g")
//
//       var projection = d3.geo.mercator()
//       .center([28, 39])
//       .scale(3500)
//
//       var path = d3.geo.path()
//       .projection(projection);
//
//       var areas = group.append("path")
//           .attr("d", path)
//           .attr("class", "area")
//           .attr("fill", "beige")
//           .attr("fill-opacity", 0.9)
//           .attr("stroke", "grey");


//// Adm2 Polygons

      d3.json("ERR2_Admin0.json", function (error, data) {

        // var svg = d3.select("#Map")
        //     .append("svg")
        //         .attr("width", 500)
        //         .attr("height", 600);

        // var ChoroMap = dc.geoChoroplethChart ("#Map")

        var projection2 = d3.geo.mercator()
        .center([30, 41])
        .scale(2300)

        var quantize = d3.scale.quantize()
            .domain([0, .15])
            .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

        var path = d3.geo.path()
            .projection(projection2);

        var group2 = svg.selectAll("g")
            .data(data.features)
            .enter().append("g")
              .attr("class", function(d) { return quantize(d.Agency); })
              .attr("d", path);


            var color = d3.scale.linear()
                  .domain([0,9])
                  .range(["Plum","Purple"]);

            var path2 = d3.geo.path()
            .projection(projection2);

            var areas2 = group2.append("path")
                .attr("d", path2)
                .attr("class", "area")
                .attr("fill", "lightgray")
                .attr("stroke", "gray");


// Greece  Map Circles

          d3.json("data.json", function(error, data){

            // var scale = d3.scale.linear()
            //           .domain ([1, 10])
            //           .range([0, 50]);
            //
            // var color = d3.scale.linear()
            //           .domain ([1, 200])
            //           .range(["green", "red"]);
            //
            var projection = d3.geo.mercator()
            .center([30, 41])
            .scale(2300)

            var path2 = d3.geo.path()
            .projection(projection);


            var circle = svg.selectAll("circle")
            .data(data)
            .enter().append("circle");

            var tooltip = d3.select("body").append("div")
                .attr("class", "tooltip");

            circle
                .attr("cx", function(d){
                  return projection([d.Longitude, d.Latitude])[0];
                })
                .attr("cy", function(d){
                  return projection([d.Longitude, d.Latitude])[1];
                })
                // .attr("cx", function(d){
                //   return projection(d.coordinates)[0];
                // })
                // .attr("cy", function(d){
                //   return projection(d.coordinates)[1];
                // })
                .attr("r", 10)
                .attr("fill", "steelblue")
                .attr("fill-opacity", 0.5)
                .attr("stroke", "steelblue")
                .on("mouseover", function(d){
                  d3.select(this)
                    .attr("fill-opacity", 0.7)
                tooltip.html((d.Agency) + "</br>" + (d.Province) +"</br>")
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 28) + "px")
                tooltip.transition()
                      .style("opacity", 0.9);
                })
                .on("mouseout", function(d){
                  d3.select(this)
                      .attr("fill-opacity", 0.2)
                  tooltip.transition()
                      .duration(50)
                      .style("opacity", 0);
                })
        });
      });

      //// Region Map

      // var svg1 = d3.select("#Region")
      //     .append("svg")
      //         .attr("width", 500)
      //         .attr("height", 600);
      //
      //
      // // d3.json("ERR2_Admin0.json", function(data) {
      // //
      // //   var group = svg.selectAll("g")
      // //       .data(data.features)
      // //       .enter()
      // //       .append("g")
      // //
      // //       var projection = d3.geo.mercator()
      // //       .center([28, 39])
      // //       .scale(3500)
      // //
      // //       var path = d3.geo.path()
      // //       .projection(projection);
      // //
      // //       var areas = group.append("path")
      // //           .attr("d", path)
      // //           .attr("class", "area")
      // //           .attr("fill", "beige")
      // //           .attr("fill-opacity", 0.9)
      // //           .attr("stroke", "grey");
      //
      //
      // //// Region Polygons
      //
      //       d3.json("ERR2_Admin0.json", function (error, data) {
      //
      //         // var svg = d3.select("#Map")
      //         //     .append("svg")
      //         //         .attr("width", 500)
      //         //         .attr("height", 600);
      //
      //         // var ChoroMap = dc.geoChoroplethChart ("#Map")
      //
      //         var projection1 = d3.geo.mercator()
      //         .center([27, 39])
      //         .scale(600)
      //
      //         var path1 = d3.geo.path()
      //             .projection(projection1);
      //
      //         var group1 = svg.selectAll("g")
      //             .data(data.features)
      //             .enter().append("g")
      //               .attr("class", function(d) { return quantize(d.Agency); })
      //               .attr("d", path1);
      //
      //
      //             var path1 = d3.geo.path()
      //             .projection(projection1);
      //
      //             var areas1 = group1.append("path")
      //                 .attr("d", path1)
      //                 .attr("class", "area")
      //                 .attr("fill", "pink")
      //                 .attr("stroke", "gray");
      //
      //
      // // Region  Map Circles
      //
      //           d3.json("data.json", function(error, data){
      //
      //             // var scale = d3.scale.linear()
      //             //           .domain ([1, 10])
      //             //           .range([0, 50]);
      //             //
      //             // var color = d3.scale.linear()
      //             //           .domain ([1, 200])
      //             //           .range(["green", "red"]);
      //             //
      //             var projection1 = d3.geo.mercator()
      //             .center([27, 39])
      //             .scale(2000)
      //
      //             var path1 = d3.geo.path()
      //             .projection(projection1);
      //
      //
      //             var circle1 = svg.selectAll("circle")
      //             .data(data)
      //             .enter().append("circle");
      //
      //             var tooltip = d3.select("body").append("div")
      //                 .attr("class", "tooltip");
      //
      //             circle1
      //                 .attr("cx", function(d){
      //                   return projection([d.Longitude, d.Latitude])[0];
      //                 })
      //                 .attr("cy", function(d){
      //                   return projection([d.Longitude, d.Latitude])[1];
      //                 })
      //                 // .attr("cx", function(d){
      //                 //   return projection(d.coordinates)[0];
      //                 // })
      //                 // .attr("cy", function(d){
      //                 //   return projection(d.coordinates)[1];
      //                 // })
      //                 .attr("r", 10)
      //                 .attr("fill", "steelblue")
      //                 .attr("fill-opacity", 0.5)
      //                 .attr("stroke", "steelblue")
      //                 // .on("mouseover", function(d){
      //                 //   d3.select(this)
      //                 //     .attr("fill-opacity", 0.7)
      //                 // tooltip.html((d.Agency) + "</br>" + (d.Province) +"</br>")
      //                 //       .style("left", (d3.event.pageX) + "px")
      //                 //       .style("top", (d3.event.pageY - 28) + "px")
      //                 // tooltip.transition()
      //                 //       .style("opacity", 0.9);
      //                 // })
      //                 // .on("mouseout", function(d){
      //                 //   d3.select(this)
      //                 //       .attr("fill-opacity", 0.2)
      //                 //   tooltip.transition()
      //                 //       .duration(50)
      //                 //       .style("opacity", 0);
      //                 // })
      //         });
      //       });
    // });
