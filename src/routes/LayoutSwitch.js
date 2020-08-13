import React, { Component } from 'react';
import { Switch } from 'dva/router';
import { connect } from 'dva';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { enquireScreen } from 'enquire-js';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import themCofing from './../../theme';
// import Socket from './../utils/socket';
import GlobalLayout from './../layouts/GlobalLayout';

const theme = createMuiTheme(themCofing);

const mapStateToProps = (state) => ({
    places: _.get(state, 'placesList.placesList', []),
});

const mapDispatchToProps = (/*dispatch*/) => ({
    // SOCKET_UserList: (payload, callback, loading) => dispatch({ type: 'userList/SOCKET_UserList', payload, callback, loading }),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    class LayoutSwitch extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isMobile: false,
            };
        }

        componentDidMount = () => {
            // const { SOCKET_UserList } = this.props;

            // const socketEvents = [
            //     { name: 'testEvent', event: SOCKET_UserList },
            //     { name: 'clickEvent', event: (clickEvent) => console.log({ clickEvent }) }
            // ];
            // Socket.eventInit(socketEvents);

            this.enquireHandler = enquireScreen(mobile => {
                this.setState({
                    isMobile: mobile ? true : false,
                });
            }/*, '(max-width: 1024px)' */);
        }

        render() {
            const { props, state } = this;
            const { children/*, history*/ } = props;
            // const { location } = history;
            // const { pathname } = location;
            return (
                <ThemeProvider theme={theme}>
                    {
                        <GlobalLayout isMobile={state.isMobile} {...props}>
                            <Switch isMobile={state.isMobile} {...props}>{children}</Switch>
                        </GlobalLayout>
                    }
                </ThemeProvider>);
        }
        static propTypes = {
            children: PropTypes.any,
            history: PropTypes.any,
            // SOCKET_UserList: PropTypes.func,
        };
    }
);
