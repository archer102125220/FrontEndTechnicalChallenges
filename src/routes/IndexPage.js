import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { enquireScreen } from 'enquire-js';
import { connect } from 'dva';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { GoogleMap } from './../utils/googleapis';
import TextField from '@material-ui/core/TextField';
//https://www.sipios.com/blog-tech/how-to-use-styled-components-with-material-ui-in-a-react-app

const styles = (them) => ({
  normal: {
    fontFamily: 'Georgia, sans-serif',
    textAlign: 'center',
  },
  root: {
    zIndex: '3 !important',
    position: 'fixed !important',
    top: '-3.5px !important',
    left: '30vh !important',
    backgroundColor: them.palette.inputBoxbackgroundColor.main,
    '& > *': {
      width: '75ch'
    },
  },
  isMobileRoot: {
    zIndex: '3 !important',
    position: 'fixed !important',
    top: '100px !important',
    left: '0px !important',
    backgroundColor: them.palette.inputBoxbackgroundColor.main,
    display: 'none',
    '& > *': {
      width: '75vh'
    },
  }
});

const mapStateToProps = (state) => ({
  placesList: _.get(state, 'placesList.placesList', []),
  searchBoxAddress: _.get(state, 'placesList.searchBoxAddress', {}),
  viewTable: _.get(state, 'globall.viewTable', false),
  viewMenu: _.get(state, 'globall.viewMenu', false),
});

const mapDispatchToProps = (dispatch) => ({
  GET_PlacesList: (payload, callback, loading) => dispatch({ type: 'placesList/GET_PlacesList', payload, callback, loading }),
  GET_SearchBoxAddress: (payload, callback, loading) => dispatch({ type: 'placesList/GET_SearchBoxAddress', payload, callback, loading }),
});


class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      places: []
    };
  }

  valueChange = (e) => {
    this.setState({
      inputValue: e.target.value
    });
  }

  setPlaces = (places) => {
    this.props.GET_PlacesList(places);
  }

  componentDidMount = () => {
    this.enquireHandler = enquireScreen(mobile => {
      this.setState({
        isMobile: mobile ? true : false,
      });
    }/*, '(max-width: 1024px)' */);
  }

  render() {
    const { classes, viewMenu } = this.props;
    const { isMobile } = this.state;
    return (
      <div className={classes.normal}>
        <GoogleMap
          setPlaces={this.setPlaces}
          input={
            <div className={isMobile ? classes.isMobileRoot : classes.root}
              style={{ display: isMobile && !viewMenu ? 'none' : 'block', zIndex: '2147483584' }}
            >
              <TextField id='filled-basic' label='輸入地址...' defaultValue='台灣台北' variant='filled' size='small' />
            </div>
          }
          getSearchBoxAddress={this.props.GET_SearchBoxAddress}
          onMarkerClick={(a, b) => console.log(a, b)}
        />
      </div>
    );
  }
  static propTypes = {
    classes: PropTypes.object.isRequired,
    placesList: PropTypes.array,
    GET_PlacesList: PropTypes.func,
    viewMenu: PropTypes.bool,
    searchBoxAddress: PropTypes.object,
    GET_SearchBoxAddress: PropTypes.func,
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(IndexPage));
