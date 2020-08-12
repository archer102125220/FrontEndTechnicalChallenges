// import React, { Component } from 'react';
// import PropTypes from 'PropTypes';
// import GoogleMapReact from 'google-map-react';

//https://www.npmjs.com/package/google-map-react

/*document.getElementsByTagName('heade')[0].appendChild(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + key + '&libraries=places&callback=initMap';
    return script;
});*/
import React, { Component } from 'react';
import { compose, withProps, withHandlers, withState } from 'recompose';
import { withScriptjs, withGoogleMap, Marker } from 'react-google-maps';
const { GoogleMap: GoogleMapReact } = require('react-google-maps');

const key = process.env.GOOGLE_MAP_API_KEY;

const MyMapComponent = compose(
    withProps({
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=' + key + '&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: '94vh' }} />,
        containerElement: <div style={{ height: '94vh' }} />,
        mapElement: <div style={{ height: '94vh' }} />,
    }),
    withScriptjs,
    withGoogleMap,
    withState('places', 'updatePlaces', ''),
    withHandlers(() => {
        const refs = {
            map: undefined,
        };

        return {
            onMapMounted: () => ref => {
                refs.map = ref;
            },
            fetchPlaces: ({ updatePlaces }) => {
                // eslint-disable-next-line no-unused-vars
                let places;
                const bounds = refs.map.getBounds();
                // eslint-disable-next-line no-undef
                const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
                const request = {
                    bounds: bounds,
                    type: ['restaurant']
                };
                service.nearbySearch(request, (results, status) => {
                    // eslint-disable-next-line no-undef
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        console.log(results);
                        updatePlaces(results);
                    }
                });
            }
        };
    }),
)((props) => {
    return (
        <GoogleMapReact
            onTilesLoaded={props.fetchPlaces}
            ref={props.onMapMounted}
            onBoundsChanged={props.fetchPlaces}
            defaultZoom={8}
            defaultCenter={{ lat: 51.508530, lng: -0.076132 }}
        >
            {props.places && props.places.map((place, i) =>
                <Marker key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} />
            )}
        </GoogleMapReact>
    );
});

export class GoogleMap extends Component {
    render() {
        return (
            <MyMapComponent />
        );
    }
}
//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=24.985175,121.440307&radius=500&type=restaurant&keyword=餐廳&key=