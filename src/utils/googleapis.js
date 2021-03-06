import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, withHandlers, withState } from 'recompose';
import { withScriptjs, withGoogleMap, Marker } from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import icon from './../assets/favicon.ico';
const { GoogleMap: GoogleMapReact } = require('react-google-maps');

const key = process.env.GOOGLE_MAP_API_KEY;

const refs = {
    map: undefined,
    types: ['restaurant'],
};
//https://tomchentw.github.io/react-google-maps/#!/Documentation
//https://neighborhood999.github.io/recompose/docs/API.html
//https://stackoverflow.com/questions/59716825/google-maps-api-deprecation-error-in-vuejs-web-app-utc-offset-is-deprecated-as
//https://github.com/xkjyeah/vue-google-maps/issues/675
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
                // radius: 500000,
                type: refs.types,
                // fields: ['opening_hours', 'utc_offset_minutes'],
            };
            service.nearbySearch(request, (results, status) => {
                // eslint-disable-next-line no-undef
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    // const resultsIsOpenNow = results.filter((places) => {
                    //     const isOpenNow = places.opening_hours;
                    //     console.log(places, isOpenNow);
                    //     return isOpenNow;
                    // });
                    // console.log({ results });
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
            places: [],
            locationMarker: { lat: 0, lng: 0 },
            alertOpen: false
        };
    }

    onPlacesChanged = () => {
        const places = refs.searchBox.getPlaces();
        // eslint-disable-next-line no-undef
        const bounds = new google.maps.LatLngBounds();
        // console.log(places);
        // console.log(places[0].photos[0].getUrl());
        const address = { formatted_address: places[0].formatted_address, name: places[0].name, address_components: places[0].address_components };
        this.props.getSearchBoxAddress(address);
        // console.log(bounds);
        places.forEach(place => {
            if (place.geometry.viewport) {
                console.log(place.geometry.viewport);
                bounds.union(place.geometry.viewport);
            } else {
                console.log(place.geometry.location);
                bounds.extend(place.geometry.location);
            }
        });
        refs.map.fitBounds(bounds);
    }

    getLocation = () => {
        if (navigator.geolocation) {

            // 使用者不提供權限，或是發生其它錯誤
            // eslint-disable-next-line no-inner-declarations
            function error() {
                alert('無法取得您的位置');
            }

            // 使用者允許抓目前位置，回傳經緯度
            // eslint-disable-next-line no-inner-declarations
            const success = (position) => {
                // eslint-disable-next-line no-undef
                const bounds = new google.maps.LatLngBounds();
                const { locationMarker } = this.state;
                const { lat, lng } = locationMarker;
                // console.log({ lat: position.coords.latitude, lng: position.coords.longitude });
                if (lat !== position.coords.latitude && lng !== position.coords.longitude) this.setState({ locationMarker: { lat: position.coords.latitude, lng: position.coords.longitude } });
                bounds.extend({ lat: position.coords.latitude, lng: position.coords.longitude });
                refs.map.fitBounds(bounds);
                // console.log(bounds.extend);
            };

            // 跟使用者拿所在位置的權限
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            alert('Sorry, 您的裝置不支援地理位置功能。');
        }
    }

    componentDidMount() {
        this.getLocation();
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
    //https://www.techmarks.com/google-map-lng-lat/
    render() {
        const { props, state } = this;
        const { locationMarker, alertOpen } = state;
        console.log(alertOpen);
        if (props.toLocation) this.getLocation();
        return (
            <span>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertOpen} autoHideDuration={3000} onClose={(event, reason) => this.setState({ alertOpen: reason === 'clickaway' })}>
                    <MuiAlert elevation={6} variant='filled' severity='info'>
                        此為目前位置
                </MuiAlert>
                </Snackbar>
                <GoogleMapReact
                    onTilesLoaded={props.fetchPlaces}
                    ref={props.onMapMounted}
                    onBoundsChanged={props.fetchPlaces}
                    defaultZoom={10}
                    defaultCenter={{ lat: 25.0171608, lng: 121.3662925 }}
                >
                    <SearchBox
                        ref={props.onSearchBoxMounted}
                        bounds={props.bounds}
                        // eslint-disable-next-line no-undef
                        controlPosition={google.maps.ControlPosition.TOP_LEFT}
                        onPlacesChanged={this.onPlacesChanged}
                    >
                        {this.inputRender(props.input)}
                    </SearchBox>
                    <Marker icon={icon} onClick={() => this.setState({ alertOpen: true })} position={locationMarker} />
                    {state.places && state.places.map((place, i) => {
                        return (<Marker key={i} onClick={(e) => props.onMarkerClick(e, place)} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} />);
                    })}
                </GoogleMapReact>
            </span>
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
        setPlaces: PropTypes.func,
        onMarkerClick: PropTypes.func,
        getSearchBoxAddress: PropTypes.func,
        toLocation: PropTypes.bool
    }
    static defaultProps = {
        setPlaces: () => { },
        onMarkerClick: () => { },
        getSearchBoxAddress: () => { }
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