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
import DehazeIcon from '@material-ui/icons/Dehaze';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GridOnIcon from '@material-ui/icons/GridOn';

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
    viewTable: _.get(state, 'globall.viewTable', false),
    viewMenu: _.get(state, 'globall.viewMenu', false),
});

const mapDispatchToProps = (dispatch) => ({
    viewTable_change: (payload, callback, loading) => dispatch({ type: 'globall/viewTable_change', payload, callback, loading }),
    viewMenu_change: (payload, callback, loading) => dispatch({ type: 'globall/viewMenu_change', payload, callback, loading }),
    goToRoute: (path, callback) => {
        dispatch(routerRedux.push(path));
        if (callback) { callback(); }
    }
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(
    class GlobalLayout extends Component {
        toggleDrawer = (open) => {
            const { viewMenu_change } = this.props;
            viewMenu_change(open);
        }
        render() {
            const { children, classes, isMobile, viewMenu } = this.props;
            return (<Typography component='div'>
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <Paper className={classes.paperTitle}>FrontEndTechnicalChallenges</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paperButton}>{
                            !isMobile ? <Button>顯示表格</Button> : <Button onClick={() => this.toggleDrawer(true)} style={{ height: '5vh', borderRadius: 15, top: '-2px' }}><DehazeIcon /></Button>
                        }</Paper>
                    </Grid>
                </Grid>
                {children}
                <SwipeableDrawer
                    anchor='top'
                    open={viewMenu}
                    onClose={() => this.toggleDrawer(false)}
                    onOpen={() => this.toggleDrawer(true)}
                >
                    <div
                        role="presentation"
                        onClick={() => this.toggleDrawer(false)}
                        onKeyDown={() => this.toggleDrawer(false)}
                    >
                        <List>
                            {/* <ListItem button >
                                <ListItemText primary='' />
                            </ListItem> */}
                            <ListItem button >
                                <GridOnIcon />
                                <ListItemText primary='表格顯示' />
                            </ListItem>
                        </List>
                    </div>
                </SwipeableDrawer>
            </Typography>);
        }

        static propTypes = {
            classes: PropTypes.object.isRequired,
            isMobile: PropTypes.bool.isRequired,
            children: PropTypes.any,
            viewMenu: PropTypes.bool,
            viewMenu_change: PropTypes.func,
            viewTable: PropTypes.bool,
            viewTable_change: PropTypes.func
        }
    }
));
