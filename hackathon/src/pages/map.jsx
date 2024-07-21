import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios'; // Import Axios for HTTP requests

class MapComponent extends React.Component {
  state = {
    images: {}
  };

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
      zoom: 12
    });

    this.renderMarkers(map, locations); // Call method to render markers
  };

  renderMarkers = (map, locations) => {
    locations.forEach(async location => {
      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.name
      });

      try {
        const response = await axios.get(
          "https://api.unsplash.com/photos/random",
          {
            params: {
              query: `${location.name}`, // Replace with your query
              client_id: "91OB51_j4Er03DZxO-FM8i1LkZZWzTvqkGqW64pOeKA", // Replace with your Unsplash Access Key
            },
          }
        );
    
        // Handle the response data
        console.log(response.data);
    
        // Process the response data as needed (extract image URLs, etc.)
        const imageUrl = response.data.urls.regular; // Example: accessing regular-sized image
    
        // Use the imageUrl in your component state or JSX rendering
        // setState({ imageUrl });
        // const infowindow = new google.maps.InfoWindow({
        //     content: `
        //     <div>
        //       <h2>${location.name}</h2>
        //       <p>${location.address}</p>
        //       <img src = "${imageUrl}" style={{ width: '50px', height: '200px' }}</img>
        //     </div>`
        //   });
        const infowindow = new google.maps.InfoWindow({
            content: `
            <div>
              <img src = "${imageUrl}" style={{ width: '50px', height: '200px' }}</img>
            </div>`
          });

          marker.addListener('click', () => {
            infowindow.open(map, marker);
          });
    
      } catch (error) {
        console.error('Error fetching images from Unsplash:', error);
      }

      

      
    });
  };

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
