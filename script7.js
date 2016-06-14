// var map = L.mapbox.map('map', ).setView([37.98, 23.839], 6);
//
// L.tileLayer('https://api.mapbox.com/styles/v1/kenzosuzuki/cip9oulrz0038dlnp1s462ttw/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2Vuem9zdXp1a2kiLCJhIjoiY2lwOWt3dGdlMDAyM25kbmxrd251Nzd1ZyJ9.OrDe4GKOUIn2s10-X4YxoA', {
//     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);
//
// L.marker([37.98, 23.839]).addTo(map)
    // .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    // .openPopup();
    //

    d3.tsv("ERR2Interim_13Jun_KM.tsv", function(data) {
     // drawMarkerSelect(data);
      drawMarkerArea(data);
    });


    function drawMarkerArea(data) {

      var xf = crossfilter(data);

      var groupname = "marker-select";

      var all = xf.groupAll();

      dc.dataCount("#dc-data-count", groupname)
            .dimension(xf)
            .group(all);

      var o = d3.scale.ordinal()
            .domain("ActionAid", "CRS", "DRC", "IMC", "Internews", "NRC", "Oxfam", "Samaritan's Purse", "Translators Without Borders")
            // .range(colorbrewer.RdBu[9]);

      var byAgency = xf.dimension(function(d) { return d.Agency; });
      var byAgencyGroup = byAgency.group().reduceCount();

      var bySector = xf.dimension(function(d) { return d.Sector; });
      var bySectorGroup = bySector.group().reduceCount();

      var byCountry = xf.dimension(function(d) { return d.Country; });
      var byCountryGroup = byCountry.group().reduceCount();

      var byProvince = xf.dimension(function(d) { return d.Province; });
      var byProvinceGroup = byProvince.group().reduceCount();

      var activities = xf.dimension(function(d) { return d.geo; });
      var activitiesGroup = activities.group().reduceCount();

      var dataTable = dc.dataTable(".dc-data-table");

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
        function(d) {return d.Province;}
      ]);


      dc.leafletMarkerChart("#map .map", groupname)
          .dimension(activities)
          .group(activitiesGroup)
          .width(400)
          .height(390)
          .center([39,27])
          .zoom(5)
          .cluster(true)
          // .marker(function (d, map){return d.Agency})
          .filterByArea(true)
          .renderPopup(false)
          // .bindPopup('sup')
          .popup(function (d, marker) {
            return d.Agency;
          })
          .brushOn(true);

    dc.rowChart("#Sector .Sector", groupname)
          .margins({top: 5, left: 10, right: 10, bottom: 30})
          .width(200)
          .height(300)
          .dimension(bySector)
          .group(bySectorGroup)
          .colors([ "#9467bd", "#7f7f7f", "#ff7f0e", "#2ca02c", "#d62728", "#8c564b", "#1f77b4",  "#e377c2", "#bcbd22", "#17becf"])
          .title(function(d){return d.value;})
          .ordering(function(d) { return -d.value; })
          .elasticX(true)
          .xAxis().ticks(4);

    dc.rowChart("#Agency .Agency", groupname)
          .margins({top: 5, left: 10, right: 10, bottom: 60})
          .width(200)
          .height(300)
          .dimension(byAgency)
          .colors(["cadetblue"])
          .group(byAgencyGroup)
          .title(function (d){
                return d.value;
                })
          .elasticX(true)
          .xAxis().ticks(4);

    dc.rowChart("#Province .Province", groupname)
          .margins({top: 5, left: 10, right: 10, bottom: 50})
          .width(200)
          .height(200)
          .dimension(byProvince)
          .group(byProvinceGroup)
          .colors(["gray"])
          .title(function (d){return d.value;})
          .ordering(function(d) { return -d.value; })
          .elasticX(true)
          .xAxis().ticks(4);

    $('#reset').on('click', function (){
      dc.filterAll(groupname);
      dc.redrawAll(groupname);
      return false;
    })
      dc.renderAll(groupname);
    }


          // .colors(d3.scale.category10())



// var dataTable = dc.dataTable("#dc-data-table");
//
//     dataTable
//     .dimension()
//     .group(byAgencyGroup)
//     .columns([
//       function(d) {return d.Agency;},
//       function(d) {return d.Sector;},
//       function(d) {return d.Country;},
//       function(d) {return d.Province;},
//     ])
//     .sortBy(function(d){return d.Agency;})
//     .order(d3.ascending);




    // dc.rowChart("#Province .Province", groupname)
    //       .margins({top: 5, left: 10, right: 10, bottom: 50})
    //       .width(200)
    //       .height(200)
    //       .dimension(byProvince)
    //       .group(byProvinceGroup)
    //       .colors(d3.scale.category10())
    //       .label(function (d){
    //             return d.Province;
    //             })
    //       .title(function(d){return d.value;})
    //       .elasticX(true)
    //       .xAxis().ticks(4);
    //  var scores = xf.dimension(function(d) { return d.scoreclass; });
    //  var scoresGroup = scores.group().reduceCount(function (d) { return d.scoreclass; });
    //
    //
    //
    // L.mapbox.accessToken = 'pk.eyJ1Ijoia2Vuem9zdXp1a2kiLCJhIjoiY2lwOWt3dGdlMDAyM25kbmxrd251Nzd1ZyJ9.OrDe4GKOUIn2s10-X4YxoA';
    // var map = L.mapbox.map('map', "kenzosuzuki.0c5e9dl0", {
    //     center: [37.98, 23.839],
    //     zoom: 6
    //   });
    //
    // L.mapbox.tileLayer("mapbox.pirates", {
    //
    // })
    // .addTo(map);
    // //// Global variables
    //
    //
    // //// Data Table
    //
    // d3.tsv("interimERR2.tsv", function(error, data){
    // var xf = crossfilter(data);
    //
    // var dataTable = dc.dataTable("#dc-data-table");
    //
    // var tableData = crossfilter(data);
    // var all = tableData.groupAll();
    // var dimension = tableData.dimension(function (d) {
    //   return d.Agency;
    // });
    //
    //
    // var facilities = xf.dimension(function(d) { return [d.Latitude, d.Longitude]; });
    // var facilitiesGroup = facilities.group().reduceCount();
    //
    // dc.leafletMarkerChart("#map", data)
    //       .dimension(facilities)
    //       .group(facilitiesGroup)
    //       .width(400)
    //       .height(390)
    //       .center([37.98,23.839])
    //       .zoom(6)
    //       .cluster(true)
    //       .filterByArea(true)
    //     //  .featureKeyAccessor(function(feature) {return feature.properties.geo; })
    //       .renderPopup(true)
    //     //  .popup(function(feature) { return feature.properties.sitear+" : "+feature.properties.neighbourhood; });
    //        //sitear	neighbourhood	organisat	governorate	district	photo	environment	phone	household	men	women	boys	girls	individual
    //       //.clusterObject({ maxClusterRadius: 40, disableClusteringAtZoom:10,spiderfyOnMaxZoom: false,showCoverageOnHover: false})
    //       .popup();
    //

    //
    // dc.renderAll();
    // //
    // // data.forEach(function(d){
    // //   // d.Agency = d.text;
    // //   // d.Sector = d.text;
    // //   // d.Province = d.text;
    // // });
    // //
    // // var facts = crossfilter(data);
    // //
    // // dataTable
    // // .width(960).height(800)
    // // // .dimension()
    // //   // .group(function(d){return "3W Table"
    // //   // })
    // // .size(10)
    // // .columns([
    // //   function(d){return d.Agency;},
    // //   function(d){return d.Sector;},
    // //   function(d){return d.Province;},
    // //         ])
    // // .sortBy(function(d){return d.Agency; })
    // // .order(d3.ascending);
    // //
    // });
    //
    //
    // //// Athens Map
    //       //
    //       // d3.json("neighbourhoodsSimple.json", function(data) {
    //       //
    //       //   var svg = d3.select("#AthensMap")
    //       //       .append("svg")
    //       //           .attr("width", 400)
    //       //           .attr("height", 600);
    //       //
    //       //   var group2 = svg.selectAll("g")
    //       //       .data(data.features)
    //       //       .enter()
    //       //       .append("g")
    //       //
    //       //       var projection2 = d3.geo.mercator()
    //       //       .center([23.839, 37.98])
    //       //       .scale(180000)
    //       //
    //       //       var path2 = d3.geo.path()
    //       //       .projection(projection2);
    //       //
    //       //       var areas2 = group2.append("path")
    //       //
    //       //           .attr("d", path2)
    //       //           .attr("class", "area")
    //       //           .attr("fill", "lightgray")
    //       //           .attr("fill-opacity", 0.5)
    //       //           .attr("stroke", "gray")
    //       //           // .on("mouseover", function(){
    //       //           //   d3.select(this)
    //       //           //     .attr("fill", "orange")
    //       //           // })
    //       //           // .on("mouseout", function(){
    //       //           //   d3.select(this)
    //       //           //     .attr("fill", "lightgray")});
    //       //
    //       //
    //       //                 // d3.json("data.json", function(error, data){
    //       //                 //
    //       //                 // var areas2 = group2.enter(data)
    //       //                 //   data(function (data) {
    //       //                 //     (d.Agency);
    //       //                 //   });
    //       //                 // });
    //       // //// Athens Map Circles
    //       //
    //       //           d3.json("data.json", function(error, data){
    //       //
    //       //             // var scale = d3.scale.linear()
    //       //             //           .domain ([1, 10])
    //       //             //           .range([0, 50]);
    //       //             //
    //       //             // var color = d3.scale.linear()
    //       //             //           .domain ([1, 200])
    //       //             //           .range(["green", "red"]);
    //       //             //
    //       //
    //       //             var circle2 = svg.selectAll("circle")
    //       //             .data(data)
    //       //             .enter().append("circle");
    //       //
    //       //             var tooltip2 = d3.select("body").append("div")
    //       //                 .attr("class", "tooltip2");
    //       //
    //       //             circle2
    //       //                 .attr("cx", function(d){
    //       //                   return projection2([d.Longitude, d.Latitude])[0];
    //       //                 })
    //       //                 .attr("cy", function(d){
    //       //                   return projection2([d.Longitude, d.Latitude])[1];
    //       //                 })
    //       //                 // .attr("cx", function(d){
    //       //                 //   return projection(d.coordinates)[0];
    //       //                 // })
    //       //                 // .attr("cy", function(d){
    //       //                 //   return projection(d.coordinates)[1];
    //       //                 // })
    //       //                 .attr("r", 15)
    //       //                 .attr("fill", "lightsteelblue")
    //       //                 .attr("fill-opacity", 0.2)
    //       //                 .attr("stroke", "steelblue")
    //       //                 .on("mouseover", function(d){
    //       //                   d3.select(this)
    //       //                     .attr("fill-opacity", 0.7)
    //       //                 tooltip2.html((d.Agency) + "</br>" + (d.Province) +"</br>")
    //       //                       .style("left", (d3.event.pageX) + "px")
    //       //                       .style("top", (d3.event.pageY - 28) + "px")
    //       //                 tooltip2.transition()
    //       //                       .style("opacity", 0.9);
    //       //                 })
    //       //                 .on("mouseout", function(d){
    //       //                   d3.select(this)
    //       //                       .attr("fill-opacity", 0.2)
    //       //                   tooltip2.transition()
    //       //                       .duration(50)
    //       //                       .style("opacity", 0);
    //       //               })
    //       //           });
    //       //       });
    //
    // //// Row Chart
    //
    // d3.json("data.json", function (error, data){
    //
    // var svg = d3.select("#Agency")
    //       .append("svg")
    //           .attr("width", 340)
    //           .attr("height", 600);
    //
    // var scale = d3.scale.linear()
    //             .domain([1, 50])
    //             .range([1, 50]);
    //
    // var color = d3.scale.linear()
    //             .domain([5, 15])
    //             .range(["red", "green"]);
    //
    //           var rect = svg.selectAll("rect")
    //           .data(data)
    //           .enter().append("rect");
    //
    //         rect
    //         .attr("x", function(d){
    //           return scale (d.Sector.length);
    //         })
    //         .attr("y", function(d){
    //           return scale (d.Agency.length);
    //         })
    //         // .attr("r", 10)
    //         .attr("width", 5)
    //         .attr("height", 10)
    //         .attr("fill", function(d){
    //           return color (d.Sector.length);
    //         });
    // });
    //
    // //// Greece Map
    //
    // var svg = d3.select("#Map")
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
    // //// Adm2 Polygons
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
    //         var projection2 = d3.geo.mercator()
    //         .center([30, 41])
    //         .scale(2300)
    //
    //         var quantize = d3.scale.quantize()
    //             .domain([0, .15])
    //             .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));
    //
    //         var path = d3.geo.path()
    //             .projection(projection2);
    //
    //         var group2 = svg.selectAll("g")
    //             .data(data.features)
    //             .enter().append("g")
    //               .attr("class", function(d) { return quantize(d.Agency); })
    //               .attr("d", path);
    //
    //
    //             var color = d3.scale.linear()
    //                   .domain([0,9])
    //                   .range(["Plum","Purple"]);
    //
    //             var path2 = d3.geo.path()
    //             .projection(projection2);
    //
    //             var areas2 = group2.append("path")
    //                 .attr("d", path2)
    //                 .attr("class", "area")
    //                 .attr("fill", "lightgray")
    //                 .attr("stroke", "gray");
    //
    //
    // // Greece  Map Circles
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
    //             var projection = d3.geo.mercator()
    //             .center([30, 41])
    //             .scale(2300)
    //
    //             var path2 = d3.geo.path()
    //             .projection(projection);
    //
    //
    //             var circle = svg.selectAll("circle")
    //             .data(data)
    //             .enter().append("circle");
    //
    //             var tooltip = d3.select("body").append("div")
    //                 .attr("class", "tooltip");
    //
    //             circle
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
    //                 .on("mouseover", function(d){
    //                   d3.select(this)
    //                     .attr("fill-opacity", 0.7)
    //                 tooltip.html((d.Agency) + "</br>" + (d.Province) +"</br>")
    //                       .style("left", (d3.event.pageX) + "px")
    //                       .style("top", (d3.event.pageY - 28) + "px")
    //                 tooltip.transition()
    //                       .style("opacity", 0.9);
    //                 })
    //                 .on("mouseout", function(d){
    //                   d3.select(this)
    //                       .attr("fill-opacity", 0.2)
    //                   tooltip.transition()
    //                       .duration(50)
    //                       .style("opacity", 0);
    //                 })
    //         });
    //       });
    //
    //       //// Region Map
    //
    //       // var svg1 = d3.select("#Region")
    //       //     .append("svg")
    //       //         .attr("width", 500)
    //       //         .attr("height", 600);
    //       //
    //       //
    //       // // d3.json("ERR2_Admin0.json", function(data) {
    //       // //
    //       // //   var group = svg.selectAll("g")
    //       // //       .data(data.features)
    //       // //       .enter()
    //       // //       .append("g")
    //       // //
    //       // //       var projection = d3.geo.mercator()
    //       // //       .center([28, 39])
    //       // //       .scale(3500)
    //       // //
    //       // //       var path = d3.geo.path()
    //       // //       .projection(projection);
    //       // //
    //       // //       var areas = group.append("path")
    //       // //           .attr("d", path)
    //       // //           .attr("class", "area")
    //       // //           .attr("fill", "beige")
    //       // //           .attr("fill-opacity", 0.9)
    //       // //           .attr("stroke", "grey");
    //       //
    //       //
    //       // //// Region Polygons
    //       //
    //       //       d3.json("ERR2_Admin0.json", function (error, data) {
    //       //
    //       //         // var svg = d3.select("#Map")
    //       //         //     .append("svg")
    //       //         //         .attr("width", 500)
    //       //         //         .attr("height", 600);
    //       //
    //       //         // var ChoroMap = dc.geoChoroplethChart ("#Map")
    //       //
    //       //         var projection1 = d3.geo.mercator()
    //       //         .center([27, 39])
    //       //         .scale(600)
    //       //
    //       //         var path1 = d3.geo.path()
    //       //             .projection(projection1);
    //       //
    //       //         var group1 = svg.selectAll("g")
    //       //             .data(data.features)
    //       //             .enter().append("g")
    //       //               .attr("class", function(d) { return quantize(d.Agency); })
    //       //               .attr("d", path1);
    //       //
    //       //
    //       //             var path1 = d3.geo.path()
    //       //             .projection(projection1);
    //       //
    //       //             var areas1 = group1.append("path")
    //       //                 .attr("d", path1)
    //       //                 .attr("class", "area")
    //       //                 .attr("fill", "pink")
    //       //                 .attr("stroke", "gray");
    //       //
    //       //
    //       // // Region  Map Circles
    //       //
    //       //           d3.json("data.json", function(error, data){
    //       //
    //       //             // var scale = d3.scale.linear()
    //       //             //           .domain ([1, 10])
    //       //             //           .range([0, 50]);
    //       //             //
    //       //             // var color = d3.scale.linear()
    //       //             //           .domain ([1, 200])
    //       //             //           .range(["green", "red"]);
    //       //             //
    //       //             var projection1 = d3.geo.mercator()
    //       //             .center([27, 39])
    //       //             .scale(2000)
    //       //
    //       //             var path1 = d3.geo.path()
    //       //             .projection(projection1);
    //       //
    //       //
    //       //             var circle1 = svg.selectAll("circle")
    //       //             .data(data)
    //       //             .enter().append("circle");
    //       //
    //       //             var tooltip = d3.select("body").append("div")
    //       //                 .attr("class", "tooltip");
    //       //
    //       //             circle1
    //       //                 .attr("cx", function(d){
    //       //                   return projection([d.Longitude, d.Latitude])[0];
    //       //                 })
    //       //                 .attr("cy", function(d){
    //       //                   return projection([d.Longitude, d.Latitude])[1];
    //       //                 })
    //       //                 // .attr("cx", function(d){
    //       //                 //   return projection(d.coordinates)[0];
    //       //                 // })
    //       //                 // .attr("cy", function(d){
    //       //                 //   return projection(d.coordinates)[1];
    //       //                 // })
    //       //                 .attr("r", 10)
    //       //                 .attr("fill", "steelblue")
    //       //                 .attr("fill-opacity", 0.5)
    //       //                 .attr("stroke", "steelblue")
    //       //                 // .on("mouseover", function(d){
    //       //                 //   d3.select(this)
    //       //                 //     .attr("fill-opacity", 0.7)
    //       //                 // tooltip.html((d.Agency) + "</br>" + (d.Province) +"</br>")
    //       //                 //       .style("left", (d3.event.pageX) + "px")
    //       //                 //       .style("top", (d3.event.pageY - 28) + "px")
    //       //                 // tooltip.transition()
    //       //                 //       .style("opacity", 0.9);
    //       //                 // })
    //       //                 // .on("mouseout", function(d){
    //       //                 //   d3.select(this)
    //       //                 //       .attr("fill-opacity", 0.2)
    //       //                 //   tooltip.transition()
    //       //                 //       .duration(50)
    //       //                 //       .style("opacity", 0);
    //       //                 // })
    //       //         });
    //       //       });
    //     // });
