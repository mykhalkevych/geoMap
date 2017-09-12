

class GeoMap {

  constructor () {
    this.map = null;
    this.markers = [];
  }

  initMap (el, options) {
    this.map = new google.maps.Map(el, options);
  }

  setMarkers (locations, labels) {
    this.markers = locations.map(function(location, i) {
      return new google.maps.Marker({
        position: location,
        label: labels[i % labels.length]
      });
    });
  }

  createClustering (options) {
    new MarkerClusterer(this.map, this.markers, options)
  }

  setHightLigthRegion(options) {
    return new google.maps.Polygon(options);
  }

  hightLightRegion(region) {
    region.setMap(this.map);
  }
  getRegionCoords(region, geoData) {
    let regions = []
    geoData.features.map(country => {
      let coords = country.geometry.coordinates;
      if (coords.length > 1) {
        coords = coords.reduce((prev, current) => {
          return [...prev, ...current];
        })
        coords = coords.reduce((prev, current) => {
          return [...prev, ...current];
        })
      } else if (coords.length == 1) {
        coords = coords[0]
      }
      regions.push(coords)
    })
    return regions;
  }

  getPolygonPath(coordinates) {
    let path = [];
    coordinates.map(p => {
      let point = new google.maps.LatLng(p[1], p[0])
      path.push(point)
    })
    return path;
  }

}

export default GeoMap

