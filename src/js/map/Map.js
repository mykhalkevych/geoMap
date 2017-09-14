
class GeoMap {

  constructor () {
    this.map = null;
  }

  initMap (el, options) {
    this.map = new google.maps.Map(el, options);
  }

  setMarkers (locations, labels) {
    return locations.map(function(location, i) {
      return new google.maps.Marker({
        position: location,
        label: labels[i % labels.length]
      });
    });
  }

  hideMarkers (markers) {
    markers.map(marker => {
        marker.setMap(null);
    })
  }

  createClustering (options, markers) {
    return new MarkerClusterer(this.map, markers, options);
  }

  hideClustering(cluster) {
    console.log(cluster)
    cluster.setMap(null);
  }

  setHightLigthRegion(options) {
    return new google.maps.Polygon(options);
  }

  hightLightRegion (region) {
    region.setMap(this.map);
  }
  hideHightLightRegion (region) {
    region.setMap(null);
  }
  getRegionCoords (region, geoData) {
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


  getCountries (list, geoData) {
    let countries = [];
    geoData.features.map(country => {
      if (!!~(list.indexOf(country.id))) {
        countries.push(country);
      }
    })
    return countries;
  }

  getCountryCoordinats (country) {
    let coords = country.geometry.coordinates;
    let pathType = country.geometry.type

    if (pathType === 'Polygon') {
      coords = coords.reduce((prev, current) => {
        return [...prev, ...current];
      })
    } else {
      coords = coords.reduce((prev, current) => {
        return [...prev, ...current];
      })
    }
    return coords;
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

export class PolygonOption {
  constructor(paths, options) {
    this.paths = paths;
    Object.assign(this, options)
  }
}

export default GeoMap

