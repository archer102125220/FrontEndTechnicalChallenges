import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import _ from 'lodash';
import { routerRedux } from 'dva/router';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from './../lib/components/Button';

const styles = (them) => {
    const style = {
        padding: 2,
        color: them.palette.fontColor.main,
        backgroundColor: them.palette.fontbackgroundColor.main,
        height: '5vh',
        borderRadius: 0,
        boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 0px 0px rgba(0,0,0,0.12)',
    };
    return {
        paperTitle: {
            ...style,
            paddingLeft: '10px',
            lineHeight: '5vh',
            textAlign: 'left'
        },
        paperButton: {
            ...style,
            paddingRight: '10px',
            textAlign: 'right'
        }
    };
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
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <Paper className={classes.paperTitle}>FrontEndTechnicalChallenges</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paperButton}><Button>顯示表格</Button></Paper>
                    </Grid>
                </Grid>
                {children}
            </Typography>);
        }

        static propTypes = {
            classes: PropTypes.object.isRequired,
            children: PropTypes.any
        }
    }
));
