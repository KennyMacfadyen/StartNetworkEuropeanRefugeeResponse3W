var svg = d3.select('.Map')
    .append("svg")
        .attr("width", 700)
        .attr("height", 700);

//// Base Map ///////

d3.json("ERR2_Admin0.json", function(data) {

  var group = svg.selectAll("g")
      .data(data.features)
      .enter()
      .append("g")

      var projection = d3.geo.mercator()
      .center([28, 39])
      .scale(3500)

      var path = d3.geo.path()
      .projection(projection);

      var areas = group.append("path")
          .attr("d", path)
          .attr("class", "area")
          .attr("fill", "grey")
          .attr("fill-opacity", 0.5)
          .attr("stroke", "white");

////// Circles ////////////////////////

          d3.json("data.json", function(error, data){

            // var scale = d3.scale.linear()
            //           .domain ([1, 10])
            //           .range([0, 50]);
            //
            // var color = d3.scale.linear()
            //           .domain ([1, 200])
            //           .range(["green", "red"]);
            //

            var circle = svg.selectAll("circle")
            .data(data)
            .enter().append("circle");

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
                .attr("r", 20)
                .attr("fill", "steelblue")
                .attr("fill-opacity", 0.2)
                .on("mouseover", function(d){
                  d3.select(this)
                    .attr("fill-opacity", 0.7);
                })
                .on("mouseout", function(d){
                  d3.select(this)
                    .attr("fill-opacity", 0.2);
                })
          });
});
