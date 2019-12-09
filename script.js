let w = 1200;
let h = 400;
let topBuffer = 50;
let circleRadius = 3;
let opacity = .2;

let acousticnessColor = "#E11584";
let danceabilityColor = "#2C5499";
let energyColor = "#4F8D23";
let livenessColor = "#E8C917";
let speechinessColor = "#E05D1A";
let valenceColor = "#B9231F";
let tempoColor = "#372780";
let durationColor = "#25A032";

let viz = d3.select("#container").append("svg")
  .style("width", w)
  .style("height", h)
  .style("background-color", "#ffffff")
;

d3.json("top2albumSongs.json").then(gotData);


function gotData(unformattedData){
  // unformattedData = unformattedData.slice(0,100);
  incomingData = unformattedData;

  let minDate = d3.min(incomingData, findMinDate);
  let maxDate = d3.max(incomingData, findMaxDate);

  console.log("min date: " + minDate);
  console.log("max date: " + maxDate);

  function findMinDate(d){
    return d.weekOfRangDate;
  }

  function findMaxDate(d){
    return d.weekOfRangDate;
  }

  let scale = d3.scaleLinear()
    .domain([1963, 2019])
    .range([0, w]);

  let x_axis = d3.axisBottom()
    .scale(scale)
    .tickFormat(d3.format("d"));

  viz.append("g")
    .call(x_axis)
  ;

  let groupelements = viz.selectAll(".datagroup").data(incomingData)
    .enter()
      .append("g")
      .attr("class", "datagroup")
  ;

  let timeparser = d3.timeParse("%Y-%m-%d");

  // console.log(timeparser(minDate));
  // console.log(timeparser(maxDate));

  let xScale = d3.scaleLinear().domain([timeparser(minDate), timeparser(maxDate)]).range([0, w]);

  function xFunc(d){
    // console.log(xScale(timeparser(d.weekOfRangDate)));
    return xScale(timeparser(d.weekOfRangDate));
  }

//ACOUSTICNESS

  function findMinAcousticness(d){
    return d.acousticness;
  }

  function findMaxAcousticness(d){
    return d.acousticness;
  }

  let minAcousticness = d3.min(incomingData, findMinAcousticness);
  let maxAcousticness = d3.max(incomingData, findMaxAcousticness);

  console.log("min acousticness: " + minAcousticness);
  console.log("max acousticness: " + maxAcousticness);

  let yScaleAcousticness = d3.scaleLinear().domain([maxAcousticness, .04]).range([topBuffer, h]);

  function yPositionAcousticness(d){
    // console.log(d.acousticness);
    return yScaleAcousticness(d.acousticness);
  }


//DANCEABILITY

  function findMinDanceability(d){
    return d.danceability;
  }

  function findMaxDanceability(d){
    return d.danceability;
  }

  let minDanceability = d3.min(incomingData, findMinDanceability);
  let maxDanceability = d3.max(incomingData, findMaxDanceability);
  //
  console.log("min danceability: " + minDanceability);
  console.log("max danceability: " + maxDanceability);

  let yScaleDanceability = d3.scaleLinear().domain([maxDanceability, .05]).range([topBuffer, h]);

  function yPositionDanceability(d){
    // console.log(d.danceability);
    return yScaleDanceability(d.danceability);
  }


//ENERGY

  function findMinEnergy(d){
    return d.energy;
  }

  function findMaxEnergy(d){
    return d.energy;
  }

  let minEnergy = d3.min(incomingData, findMinEnergy);
  let maxEnergy = d3.max(incomingData, findMaxEnergy);

  console.log("min energy: " + minEnergy);
  console.log("max energy: " + maxEnergy);

  let yScaleEnergy = d3.scaleLinear().domain([maxEnergy, minEnergy]).range([topBuffer, h]);

  function yPositionEnergy(d){
    // console.log(d.energy);
    return yScaleEnergy(d.energy);
  }


//LIVENESS

  function findMinLiveness(d){
    return d.liveness;
  }

  function findMaxLiveness(d){
    return d.liveness;
  }

  let minLiveness = d3.min(incomingData, findMinLiveness);
  let maxLiveness = d3.max(incomingData, findMaxLiveness);

  console.log("min liveness: " + minLiveness);
  console.log("max liveness: " + maxLiveness);

  let yScaleLiveness = d3.scaleLinear().domain([maxLiveness, .025]).range([topBuffer, h+10]);

  function yPositionLiveness(d){
    // console.log(d.liveness);
    return yScaleLiveness(d.liveness);
  }


//SPEECHINESS

  function findMinSpeechiness(d){
    return d.speechiness;
  }

  function findMaxSpeechiness(d){
    return d.speechiness;
  }

  let minSpeechiness = d3.min(incomingData, findMinSpeechiness);
  let maxSpeechiness = d3.max(incomingData, findMaxSpeechiness);

  console.log("min speechiness: " + minSpeechiness);
  console.log("max speechiness: " + maxSpeechiness);

  let yScaleSpeechiness = d3.scaleLinear().domain([maxSpeechiness, minSpeechiness]).range([topBuffer, h+5]);

  function yPositionSpeechiness(d){
    console.log(d.speechiness);
    return yScaleSpeechiness(d.speechiness);
  }

//VALENCE

  function findMinValence(d){
    return d.valence;
  }

  function findMaxValence(d){
    return d.valence;
  }

  let minValence = d3.min(incomingData, findMinValence);
  let maxValence = d3.max(incomingData, findMaxValence);

  console.log("min valence: " + minValence);
  console.log("max valence: " + maxValence);

  let yScaleValence = d3.scaleLinear().domain([1, .025]).range([topBuffer, h]);

  function yPositionValence(d){
    console.log(d.valence);
    return yScaleValence(d.valence);
  }

//TEMPO

  function findMinTempo(d){
    return d.tempo;
  }

  function findMaxTempo(d){
    return d.tempo;
  }

  let minTempo = d3.min(incomingData, findMinTempo);
  let maxTempo = d3.max(incomingData, findMaxTempo);

  console.log("min tempo: " + minTempo);
  console.log("max tempo: " + maxTempo);

  let yScaleTempo = d3.scaleLinear().domain([200, 50]).range([topBuffer+20, h]);

  function yPositionTempo(d){
    // console.log(d.valence);
    return yScaleTempo(d.tempo);
  }

//DURATION

  function findMinDuration(d){
    return d.duration_ms;
  }

  function findMaxDuration(d){
    return d.duration_ms;
  }

  let minDuration = d3.min(incomingData, findMinDuration);
  let maxDuration = d3.max(incomingData, findMaxDuration);

  console.log("min duration: " + minDuration);
  console.log("max duration: " + maxDuration);

  let yScaleDuration = d3.scaleLinear().domain([maxDuration, 0]).range([topBuffer+310, h]);

  function yPositionDuration(d){
    // console.log(d.valence);
    return yScaleDuration(d.duration_ms);
  }


  let temporaryDataArray = [];

  function prepareTempData(){
    temporaryDataArray = [];

    incomingData.forEach(function(d){
      if(chkAcousticness.checked){
        temporaryDataArray.push({song:d.name, x:xScale(timeparser(d.weekOfRangDate)), y: yScaleAcousticness(d.acousticness), color: "#E11584"} )
      }

      if(chkDanceability.checked){
        temporaryDataArray.push({song:d.name, x:xScale(timeparser(d.weekOfRangDate)), y: yScaleDanceability(d.danceability), color: "#2C5499"} )
      }

      if(chkEnergy.checked){
        temporaryDataArray.push({song:d.name, x:xScale(timeparser(d.weekOfRangDate)), y: yScaleEnergy(d.energy), color: "#4F8D23"} )
      }

      if(chkLiveness.checked){
        temporaryDataArray.push({song:d.name, x:xScale(timeparser(d.weekOfRangDate)), y: yScaleLiveness(d.liveness), color: "#E8C917"} )
      }

      if(chkSpeechiness.checked){
        temporaryDataArray.push({song:d.name, x:xScale(timeparser(d.weekOfRangDate)), y: yScaleSpeechiness(d.speechiness), color: "#E05D1A"} )
      }

      if(chkValence.checked){
        temporaryDataArray.push({song:d.name, x:xScale(timeparser(d.weekOfRangDate)), y: yScaleValence(d.valence), color: "#B9231F"} )
      }

      if(chkTempo.checked){
        temporaryDataArray.push({song:d.name, x:xScale(timeparser(d.weekOfRangDate)), y: yScaleTempo(d.tempo), color: "#372780"} )
      }

      if(chkDuration.checked){
        temporaryDataArray.push({song:d.name, x:xScale(timeparser(d.weekOfRangDate)), y: yScaleDuration(d.duration), color: "#25A032"} )
      }
    })

    drawViz();

  }

  function drawViz(){
    console.log(temporaryDataArray);
    console.log(temporaryDataArray.length + " datapoints drawn");

    let svg = d3.select('body').append('svg')

    svg.selectAll('circle')
      .data(temporaryDataArray)
        .enter().append('circle')
  }

  chkAcousticness.addEventListener('change', prepareTempData);
  chkDanceability.addEventListener('change', prepareTempData);
  chkEnergy.addEventListener('change', prepareTempData);
  chkLiveness.addEventListener('change', prepareTempData);
  chkSpeechiness.addEventListener('change', prepareTempData);
  chkValence.addEventListener('change', prepareTempData);
  chkTempo.addEventListener('change', prepareTempData);
  chkDuration.addEventListener('change', prepareTempData);


  // //how to just get the year out of the date USE THIS FOR THE IMAGES
  // function formatDate(date) {
  //     let d = new Date(date);
  //     // year = d.getFullYear();
  //     return d;
  // }

  // let images = d3.range(1963, 2019+1).map(function(year){
  //   return {
  //     year: year + "-06-15",
  //     image: "person-of-the-year/" + year + ".jpg"
  //   }
  // });

  // console.log(images);



  console.log("loaded");


  // drawViz();

  // function drawViz(){
  //   chkAcousticness.addEventListener('change', function() {
  //     if(this.checked) {
  //       groupelements.append("circle")
  //         .attr("cx", xFunc)
  //         .attr("cy", yPositionAcousticness)
  //         .attr("r", circleRadius)
  //         .attr("fill", "#E11584")
  //         .style("opacity", opacity)
  //       ;
  //     } else {
  //         console.log("unchecked");
  //     }
  //   });
  //
  //   chkDanceability.addEventListener('change', function() {
  //     if(this.checked) {
  //       groupelements.append("circle")
  //         .attr("cx", xFunc)
  //         .attr("cy", yPositionDanceability)
  //         .attr("r", circleRadius)
  //         .attr("fill", "#2C5499")
  //         .style("opacity", opacity)
  //       ;
  //     } else {
  //         console.log("unchecked");
  //     }
  //   });
  //
  //   chkEnergy.addEventListener('change', function() {
  //     if(this.checked) {
  //       groupelements.append("circle")
  //         .attr("cx", xFunc)
  //         .attr("cy", yPositionEnergy)
  //         .attr("r", circleRadius)
  //         .attr("fill", "#4F8D23")
  //         .style("opacity", opacity)
  //       ;
  //     } else {
  //         console.log("unchecked");
  //     }
  //   });
  //
  //   chkLiveness.addEventListener('change', function() {
  //     if(this.checked) {
  //       groupelements.append("circle")
  //         .attr("cx", xFunc)
  //         .attr("cy", yPositionLiveness)
  //         .attr("r", circleRadius)
  //         .attr("fill", "#E8C917")
  //         .style("opacity", opacity)
  //       ;
  //     } else {
  //         console.log("unchecked");
  //     }
  //   });
  //
  //   chkSpeechiness.addEventListener('change', function() {
  //     if(this.checked) {
  //       groupelements.append("circle")
  //         .attr("cx", xFunc)
  //         .attr("cy", yPositionSpeechiness)
  //         .attr("r", circleRadius)
  //         .attr("fill", "#E05D1A")
  //         .style("opacity", opacity)
  //       ;
  //     } else {
  //         console.log("unchecked");
  //     }
  //   });
  //
  //   chkValence.addEventListener('change', function() {
  //     if(this.checked) {
  //       groupelements.append("circle")
  //         .attr("cx", xFunc)
  //         .attr("cy", yPositionValence)
  //         .attr("class", "valenceCircle")
  //         .attr("r", circleRadius)
  //         .attr("fill", "#B9231F")
  //         .style("opacity", opacity)
  //       ;
  //     } else {
  //         console.log("unchecked");
  //     }
  //   });
  //
  //   chkTempo.addEventListener('change', function() {
  //     if(this.checked) {
  //       groupelements.append("circle")
  //         .attr("cx", xFunc)
  //         .attr("cy", yPositionTempo)
  //         .attr("class", "tempoCircle")
  //         .attr("r", circleRadius)
  //         .attr("fill", "#372780")
  //         .style("opacity", opacity)
  //       ;
  //     } else {
  //       console.log("unchecked");
  //     }
  //   });
  //
  //   chkDuration.addEventListener('change', function() {
  //     if(this.checked) {
  //       groupelements.append("circle")
  //         .attr("cx", xFunc)
  //         .attr("cy", yPositionDuration)
  //         .attr("class", "durationCircle")
  //         .attr("r", circleRadius)
  //         .attr("fill", "#25A032")
  //         .style("opacity", opacity)
  //       ;
  //     } else {
  //       console.log("unchecked");
  //     }
  //   });
  // }
}
