console.log("script loaded");

///////////////////////////

let w = 1200;
let h = 400;
let topBuffer = 50;
let circleRadius = 4;
let opacity = .1;

let acousticnessToggle = 0;
let danceabilityToggle = 0;
let energyToggle = 0;
let livenessToggle = 0;
let speechinessToggle = 0;
let valenceToggle = 0;

///////////////////////////

function checkAll() {
    document.getElementById("chkAcousticness").checked = true;
    document.getElementById("chkDanceability").checked = true;
    document.getElementById("chkEnergy").checked = true;
    document.getElementById("chkLiveness").checked = true;
    document.getElementById("chkSpeechiness").checked = true;
    document.getElementById("chkValence").checked = true;
}

function uncheckAll() {
    document.getElementById("chkAcousticness").checked = false;
    document.getElementById("chkDanceability").checked = false;
    document.getElementById("chkEnergy").checked = false;
    document.getElementById("chkLiveness").checked = false;
    document.getElementById("chkSpeechiness").checked = false;
    document.getElementById("chkValence").checked = false;
}

function reload() {
  if (document.getElementById('chkAcousticness').checked)
  {
      acousticnessToggle = 1;
  } else {
      acousticnessToggle = 0;
  }

  if (document.getElementById('chkDanceability').checked)
  {
      danceabilityToggle = 1;
  } else {
      danceabilityToggle = 0;
  }

  if (document.getElementById('chkEnergy').checked)
  {
      energyToggle = 1;
  } else {
      energyToggle = 0;
  }

  if (document.getElementById('chkLiveness').checked)
  {
      livenessToggle = 1;
  } else {
      livenessToggle = 0;
  }

  if (document.getElementById('chkSpeechiness').checked)
  {
      speechinessToggle = 1;
  } else {
      speechinessToggle = 0;
  }

  if (document.getElementById('chkValence').checked)
  {
      valenceToggle = 1;
  } else {
      valenceToggle = 0;
  }

  d3.csv("acoustic_features.csv").then(gotData);

}

///////////////////////////


let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "white")
;

// d3.csv("albums.csv").then(gotData);
// d3.csv("acoustic_features.csv").then(gotData);

function gotData(unformattedData){

  unformattedData = unformattedData.slice(0,50000);

  incomingData = unformattedData;

  console.log(incomingData);

  let xDomain = [1963, 2019];

  var scale = d3.scaleLinear()
    .domain([1963, 2019])
    .range([0, w]);

  var x_axis = d3.axisBottom()
    .scale(scale)
    .tickFormat(d3.format("d"));

  let images = d3.range(1963, 2019+1).map(function(year){
    return {
      year: year,
      image: "person-of-the-year/" + year + ".jpg"
    }
  });

  // console.log(images);

  function picFunc(d){
    // console.log("pic func" + images[d].image);
    return images[d].image;
  }

  let groupelements = viz.selectAll(".datagroup").data(incomingData)
    .enter()
      .append("g")
      .attr("class", "datagroup")
  ;

  function xFunc(d){
    // console.log("d.date" + d.date);
    return xScale(d.date);
  }

  function findMinDate(d){
    return d.date;
  }

  function findMaxDate(d){
    return d.date;
  }

  let minYear = d3.min(incomingData, findMinDate);
  let maxYear = d3.max(incomingData, findMaxDate);

  console.log("min year: " + minYear);
  console.log("max year: " + maxYear);


  let xScale = d3.scaleLinear().domain([1963, maxYear]).range([0, w]);


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

  if(acousticnessToggle === 1){
    //ACOUSTICNESS--ACOUSTICNESS--ACOUSTICNESS--ACOUSTICNESS--ACOUSTICNESS--ACOUSTICNESS--ACOUSTICNESS
      groupelements.append("circle")
        .attr("cx", xFunc)
        .attr("cy", yPositionAcousticness)
        .attr("r", circleRadius)
        .attr("fill", "purple")
        .style("opacity", opacity)
      ;
  }



  function findMinDanceability(d){
    return d.danceability;
  }

  function findMaxDanceability(d){
    return d.danceability;
  }

  let minDanceability = d3.min(incomingData, findMinDanceability);
  let maxDanceability = d3.max(incomingData, findMaxDanceability);

  console.log("min danceability: " + minDanceability);
  console.log("max danceability: " + maxDanceability);

  let yScaleDanceability = d3.scaleLinear().domain([maxDanceability, .05]).range([topBuffer, h]);

  function yPositionDanceability(d){
    // console.log(d.danceability);
    return yScaleDanceability(d.danceability);
  }

  if(danceabilityToggle === 1){
    //DANCEABILITY--DANCEABILITY--DANCEABILITY--DANCEABILITY--DANCEABILITY--DANCEABILITY--DANCEABILITY
      groupelements.append("circle")
        .attr("cx", xFunc)
        .attr("cy", yPositionDanceability)
        .attr("r", circleRadius)
        .attr("fill", "red")
        .style("opacity", opacity)
      ;
  }




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

  let yScaleEnergy = d3.scaleLinear().domain([1, minEnergy]).range([topBuffer, h]);

  function yPositionEnergy(d){
    // console.log(d.energy);
    return yScaleAcousticness(d.energy);
  }

  if(energyToggle === 1){
    // ENERGY--ENERGY--ENERGY--ENERGY--ENERGY--ENERGY--ENERGY--ENERGY--ENERGY--ENERGY--ENERGY--ENERGY
      groupelements.append("circle")
        .attr("cx", xFunc)
        .attr("cy", yPositionEnergy)
        .attr("r", circleRadius)
        .attr("fill", "gold")
        .style("opacity", opacity)
      ;
  }




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

  let yScaleLiveness = d3.scaleLinear().domain([maxLiveness, .025]).range([topBuffer, h]);

  function yPositionLiveness(d){
    // console.log(d.liveness);
    return yScaleLiveness(d.liveness);
  }

  if(livenessToggle === 1){
    //LIVENESS--LIVENESS--LIVENESS--LIVENESS--LIVENESS--LIVENESS--LIVENESS--LIVENESS--LIVENESS
      groupelements.append("circle")
        .attr("cx", xFunc)
        .attr("cy", yPositionLiveness)
        .attr("r", circleRadius)
        .attr("fill", "blue")
        .style("opacity", opacity)
      ;
  }



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

  let yScaleSpeechiness = d3.scaleLinear().domain([maxSpeechiness-.2, .027]).range([topBuffer, h]);

  function yPositionSpeechiness(d){
    // console.log(d.speechiness);
    return yScaleSpeechiness(d.speechiness);
  }

  if(speechinessToggle === 1){
    //SPEECHINESS--SPEECHINESS--SPEECHINESS--SPEECHINESS--SPEECHINESS--SPEECHINESS--SPEECHINESS
      groupelements.append("circle")
        .attr("cx", xFunc)
        .attr("cy", yPositionSpeechiness)
        .attr("r", circleRadius)
        .attr("fill", "limegreen")
        .style("opacity", opacity)
      ;
  }




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
    // console.log(d.valence);
    return yScaleValence(d.valence);
  }

  if(valenceToggle === 1){
    //VALENCE--VALENCE--VALENCE--VALENCE--VALENCE--VALENCE--VALENCE--VALENCE--VALENCE--VALENCE
      groupelements.append("circle")
        .attr("cx", xFunc)
        .attr("cy", yPositionValence)
        .attr("r", circleRadius)
        .attr("fill", "cyan")
        .style("opacity", opacity)
      ;
  }



  viz.append('image')
    // .attr('xlink:href', picFunc)
    .attr('width', 50)
    .attr('height', 50)
    .attr('y', 25)
    .attr('x', 50)
    .attr('opacity', .5)
  ;

  viz.append("g")
    .call(x_axis)
  ;
  console.log("loaded");

  //how to just get the year out of the date
  function formatDate(date) {
      let d = new Date(date);
      // year = d.getFullYear();
      return d;
  }
}
