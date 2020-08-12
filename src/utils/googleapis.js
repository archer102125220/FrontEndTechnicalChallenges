import React, { Component } from 'react';
import PropTypes from 'PropTypes';
import GoogleMapReact from 'google-map-react';

//https://www.npmjs.com/package/google-map-react
const key = process.env.GOOGLE_MAP_API_KEY;

export class GoogleMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refs: {
                map: undefined,
            }
        };
    }

    MapIcon = ({ element, style }) => <div style={style}>{element}</div>

    render() {
        const { MapIcon, props } = this;
        const { center, zoom, place, height, width, style, mapIconStyle } = props;
        const newStyle = {
            height,
            width,
            '& div': {
                padding: '0px 6px !important',
            },
            ...style
        }, newMapIconStyle = {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            height: '60px',
            width: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            fontSize: '12px',
            color: '#fff',
            textAlign: 'center',
            marginTop: '-30px',
            marginLeft: '-30px',
            ...mapIconStyle
        };
        return (
            <div style={newStyle}>
                <GoogleMapReact
                    onMapMounted={() => ref => {
                        const { refs } = this.state;
                        console.log({ refs });
                        this.setState({ refs: { ...refs, map: ref } });
                    }}
                    bootstrapURLKeys={{ key }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                >
                    {
                        place.map((element, key) =>
                            (<MapIcon
                                key={key}
                                lat={element.lat}
                                lng={element.lng}
                                text={element.element}
                                style={newMapIconStyle}
                            />)
                        )
                    }
                </GoogleMapReact>
            </div>
        );
    }

    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 13,
        place: [{
            lat: 59.955413,
            lng: 30.337844
        }],
        height: '94vh',
        width: '100%',
        style: {},
        mapIconStyle: {}
    }

    static propTypes = {
        center: PropTypes.object,
        zoom: PropTypes.number,
        place: PropTypes.array,
        height: PropTypes.string,
        width: PropTypes.string,
        style: PropTypes.object,
        mapIconStyle: PropTypes.object
    }
}

//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=24.985175,121.440307&radius=500&type=restaurant&keyword=餐廳&key=