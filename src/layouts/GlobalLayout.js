import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import _ from 'lodash';
import { routerRedux } from 'dva/router';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = {
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: 2,
      textAlign: 'center',
      color: 'primary'
    }
  };
  

const mapStateToProps = (state) => ({
    users: _.get(state, 'userList.userList', []),
});

const mapDispatchToProps = (dispatch) => ({
    goToRoute: (path, callback) => {
        dispatch(routerRedux.push(path));
        if (callback) { callback(); }
    }
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(
    class GlobalLayout extends Component {
        state = {
        }

        render() {
            const { children, classes } = this.props;

            return (<Typography component='div'>
                    <div className={classes.root}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>xs=12</Paper>
                            </Grid>
                        </Grid>
                    </div>
                {children}
            </Typography>);
        }

        static propTypes = {
            classes: PropTypes.object.isRequired,
            children: PropTypes.any
        }
    }
));
