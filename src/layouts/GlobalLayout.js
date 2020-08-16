import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
// import _ from 'lodash';
// import { routerRedux } from 'dva/router';
import Typography from '@material-ui/core/Typography';

const mapStateToProps = (/*state*/) => ({
});

const mapDispatchToProps = (/*dispatch*/) => ({
    // goToRoute: (path, callback) => {
    //     dispatch(routerRedux.push(path));
    //     if (callback) { callback(); }
    // }
});

export default connect(mapStateToProps, mapDispatchToProps)(
    class GlobalLayout extends Component {
        constructor(props) {
            super(props);
        }
        render() {
            const { children } = this.props;
            return (<Typography component='div'>
                {children}
            </Typography>);
        }

        static propTypes = {
            children: PropTypes.any,
        }
    }
);