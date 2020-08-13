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
import PropTypes from 'prop-types';
import { compose, withProps, withHandlers, withState } from 'recompose';
import { withScriptjs, withGoogleMap, Marker } from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
const { GoogleMap: GoogleMapReact } = require('react-google-maps');

const key = process.env.GOOGLE_MAP_API_KEY;

const refs = {
    map: undefined,
    types: ['restaurant'],
};
//https://neighborhood999.github.io/recompose/docs/API.html
export const GoogleMap = compose(
    withProps({
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=' + key + '&v=3.exp&libraries=places',
        loadingElement: <div style={{ height: '94vh' }} />,
        containerElement: <div style={{ height: '94vh' }} />,
        mapElement: <div style={{ height: '94vh' }} />,
    }),
    //https://tomchentw.github.io/react-google-maps/#!/Documentation
    withScriptjs,
    withGoogleMap,
    withState('places', 'updatePlaces', []),
    withHandlers({
        onMapMounted: () => ref => {
            refs.map = ref;
        },
        onSearchBoxMounted: () => ref => {
            refs.searchBox = ref;
        },
        fetchPlaces: ({ updatePlaces }) => () => {
            const bounds = refs.map.getBounds();
            // eslint-disable-next-line no-undef
            const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
            const request = {
                bounds: bounds,
                // radius: '500',
                type: refs.types,
                fields: ['opening_hours', 'utc_offset_minutes'],
            };
            service.nearbySearch(request, (results, status) => {
                // eslint-disable-next-line no-undef
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    // const resultsIsOpenNow = results.filter((places) => {
                    //     const isOpenNow = places.opening_hours;
                    //     console.log(places, isOpenNow);
                    //     return isOpenNow;
                    // });
                    updatePlaces(results);
                }
            });
        }
    })
    // eslint-disable-next-line react/display-name
)(class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: []
        };
    }

    onPlacesChanged = () => {
        const places = refs.searchBox.getPlaces();
        // eslint-disable-next-line no-undef
        const bounds = new google.maps.LatLngBounds();

        places.forEach(place => {
            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        refs.map.fitBounds(bounds);
    }

    componentDidUpdate() {
        const { props, state } = this;
        if (props.places !== state.places) {
            this.setState({
                places: props.places
            });
            props.setPlaces(props.places);
        }
        if (props.type !== refs.type) {
            refs.type = props.type;
        }
    }

    inputRender(element) {
        let inputElement = <input
            type='text'
            placeholder='輸入地址...'
            style={{
                boxSizing: 'border-box',
                border: '1px solid transparent',
                width: '240px',
                height: '35px',
                marginTop: '15px',
                padding: '0 12px',
                borderRadius: '3px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                fontSize: '14px',
                outline: 'none',
                textOverflow: 'ellipses',
            }}
        />;
        if (element !== undefined) inputElement = element;
        return inputElement;
    }

    render() {
        const { props, state } = this;
        return (
            <GoogleMapReact
                onTilesLoaded={props.fetchPlaces}
                ref={props.onMapMounted}
                onBoundsChanged={props.fetchPlaces}
                defaultZoom={8}
                defaultCenter={{ lat: 51.508530, lng: -0.076132 }}>
                <SearchBox
                    ref={props.onSearchBoxMounted}
                    bounds={props.bounds}
                    // eslint-disable-next-line no-undef
                    controlPosition={google.maps.ControlPosition.TOP_LEFT}
                    onPlacesChanged={this.onPlacesChanged}
                >
                    {this.inputRender(props.input)}
                </SearchBox>
                {state.places && state.places.map((place, i) => {
                    // console.log(place);
                    return (<Marker key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} />);
                })}
            </GoogleMapReact>
        );
    }
    static propTypes = {
        fetchPlaces: PropTypes.any,
        children: PropTypes.any,
        onMapMounted: PropTypes.func,
        onSearchBoxMounted: PropTypes.func,
        onPlacesChanged: PropTypes.func,
        places: PropTypes.any,
        Zoom: PropTypes.number,
        center: PropTypes.object,
        bounds: PropTypes.any,
        input: PropTypes.object,
        type: PropTypes.array,
        setPlaces: PropTypes.func
    }
    static defaultProps = {
        setPlaces: () => { }
    }
});

// export class GoogleMap extends Component {
//     render() {
//         return (
//             <MyMapComponent />
//         );
//     }
// }
//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=24.985175,121.440307&radius=500&type=restaurant&keyword=餐廳&key=