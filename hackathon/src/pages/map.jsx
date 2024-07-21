import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapComponent extends React.Component {
  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    const { google, locations } = this.props;

    // Calculate center of all markers
    const bounds = new google.maps.LatLngBounds();
    locations.forEach(location => {
      bounds.extend(new google.maps.LatLng(location.lat, location.lng));
    });
    const center = bounds.getCenter();

    const map = new google.maps.Map(document.getElementById('map'), {
      center: center, // Center of all markers
      zoom: 10.5
    });

    this.renderMarkers(map, locations); // Call method to render markers
  }

  renderMarkers = (map, locations) => {
    locations.forEach(location => {
      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.name
      });

      const infowindow = new google.maps.InfoWindow({
        content: `<div><h2>${location.name}</h2><p>${location.address}</p></div>`
      });

      marker.addListener('click', () => {
        infowindow.open(map, marker);
      });
    });
  }

  render() {
    return (
      <div id="map" style={{ width: '100%', height: '400px' }}>
        {/* Map will be rendered here */}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBkBj17X-zv50p4aHszSfjAsINjqpcSofQ' // Replace with your Google Maps API key
})(MapComponent);
