const css = require('../sass/style.css');
const sass = require('../sass/main.scss');

import Promise from 'bluebird'
import GeoMap from './map/Map.js';

function readFile(filePath) {
 return new Promise((resolve, reject) => {
    $.ajax({
      url: filePath,
      async: false,
      success: function (data){
        resolve(data);
      },
      error: function (err) {
        reject(err);
      }
    });
  });
}

window.onload = function () {

    // Create map

    let geoMap = new GeoMap();
    let mapElement = document.getElementById('map')
    let stylesMap;
    let mapOptions = {
      center: new google.maps.LatLng(0, 0),
      zoom: 2
    }
    let clusteringOptions = {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      maxZoom: 4,
      minimumClusterSize: 5
    }
    let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let locations = [
      {lat: -31.563910, lng: 147.154312},
      {lat: -33.718234, lng: 150.363181},
      {lat: -33.727111, lng: 150.371124},
      {lat: -33.848588, lng: 151.209834},
      {lat: -33.851702, lng: 151.216968},
      {lat: -34.671264, lng: 150.863657},
      {lat: -35.304724, lng: 148.662905},
      {lat: -36.817685, lng: 175.699196},
      {lat: -36.828611, lng: 175.790222},
      {lat: -37.750000, lng: 145.116667},
      {lat: -37.759859, lng: 145.128708},
      {lat: -37.765015, lng: 145.133858},
      {lat: -37.770104, lng: 145.143299},
      {lat: -37.773700, lng: 145.145187},
      {lat: -37.774785, lng: 145.137978},
      {lat: -37.819616, lng: 144.968119},
      {lat: -38.330766, lng: 144.695692},
      {lat: -39.927193, lng: 175.053218},
      {lat: -41.330162, lng: 174.865694},
      {lat: -42.734358, lng: 147.439506},
      {lat: -42.734358, lng: 147.501315},
      {lat: -42.735258, lng: 147.438000},
      {lat: -43.999792, lng: 170.463352}
    ]

    let polygonOptions= {
      paths: '',
      strokeColor: '#e7eaec',
      strokeOpacity: 1,
      strokeWeight: 1,
      fillColor: '#498596',
      fillOpacity: 0.8
    }

    readFile('./assets/map/mapStyle.json')
      .then(res => {
        mapOptions.styles = res.mapStyles
        geoMap.initMap(mapElement, mapOptions)
        geoMap.setMarkers(locations, labels)
        geoMap.createClustering(clusteringOptions)
    })
    readFile('./assets/map/countries.json')
      .then(res => {
        console.log('countries', res)
        let countriesPath = geoMap.getRegionCoords('oceania', res)



        polygonOptions.paths = geoMap.getPolygonPath(countriesPath[1])
        console.log('polygonOptions', countriesPath)
        let d = geoMap.setHightLigthRegion(polygonOptions)
        geoMap.hightLightRegion(d)
      })
  }