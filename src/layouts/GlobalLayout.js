import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import _ from 'lodash';
import { routerRedux } from 'dva/router';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DehazeIcon from '@material-ui/icons/Dehaze';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GridOnIcon from '@material-ui/icons/GridOn';
import CloseIcon from '@material-ui/icons/Close';
import Button from './../lib/components/Button';
import Table from './../lib/components/Table';
import Dialog from './../lib/components/Dialog';
import ExpansionPanel from './../lib/components/ExpansionPanel';
import MyList from './../lib/components/List';

const styles = (them) => {
    const style = {
        padding: 2,
        color: them.palette.fontColor.main,
        backgroundColor: them.palette.fontbackgroundColor.main,
        height: '5vh',
        borderRadius: 0,
        boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 0px 0px rgba(0,0,0,0.12)',
    };
    const parper = {
        display: 'flex',
        position: 'fixed !important',
        // flexWrap: 'wrap',
        right: '1vh',
        top: '10vw',
        '& > *': {
            margin: them.spacing(1),
            backgroundColor: 'rgb(255,255,255,0.7)',
            width: '40vw',
            height: '45vh',
        },
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
        },
        parper,
        parperIsMobile: {
            ...parper,
            right: '55vw',
            top: '50vh'
        },
    };
};

const mapStateToProps = (state) => ({
    places: _.get(state, 'placesList.placesList', []),
    searchBoxAddress: _.get(state, 'placesList.searchBoxAddress', {}),
});

const mapDispatchToProps = (dispatch) => ({
    goToRoute: (path, callback) => {
        dispatch(routerRedux.push(path));
        if (callback) { callback(); }
    }
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(
    class GlobalLayout extends Component {
        constructor(props) {
            super(props);
            this.state = {
                viewTable: false,
                viewMenu: false,
                viewDetailed: false,
                detailed: {},
                titles: [
                    { id: 'name', numeric: false, disablePadding: true, label: '餐廳名稱' },
                    { id: 'vicinity', numeric: false, disablePadding: false, label: '地址' },
                    { id: 'rating', numeric: true, disablePadding: false, label: '評價(星)' },
                    { id: 'price_level_change', numeric: false, disablePadding: false, label: '價位等級' },
                ]
            };
        }
        menu_change = (open) => {
            this.setState({ viewMenu: open });
        }
        table_change = (open) => {
            this.setState({ viewTable: open });
        }
        detailed_change = (open, place) => {
            this.setState({ viewDetailed: open, detailed: place });
        }
        render() {
            const { viewTable, viewMenu, viewDetailed } = this.state;
            const { children, classes, isMobile, searchBoxAddress } = this.props;
            let { places } = this.props;
            const { titles } = this.state;
            const price_level_change = ['價格親民', '價格略高', '略顯昂貴', '高檔消費'];
            places = places.map(element => ({ ...element, price_level_change: price_level_change[element.price_level] }));
            const DialogTitleOutout = (searchBoxAddress.name === undefined ? '台灣台北' : searchBoxAddress.name) + ' 附近的20間餐廳';
            return (<Typography component='div'>
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <Paper className={classes.paperTitle}>FrontEndTechnicalChallenges</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paperButton}>{
                            !isMobile ? <Button onClick={() => this.table_change(true)}>顯示表格</Button> : <Button onClick={() => this.menu_change(true)} style={{ height: '5vh', borderRadius: 15, top: '-2px' }}><DehazeIcon /></Button>
                        }</Paper>
                    </Grid>
                </Grid>
                {children}
                <div className={isMobile ? classes.parperIsMobile : classes.parper}>
                    <MyList button={true} data={places} dataTitle='name' onClick={(e, place) => this.detailed_change(false, place)} />
                </div>
                <Drawer
                    variant='persistent'
                    anchor='top'
                    open={viewMenu}
                    onClose={() => this.menu_change(false)}
                >
                    <div
                        role='presentation'
                        onClick={() => this.menu_change(false)}
                        onKeyDown={() => this.menu_change(false)}
                    >
                        <List>
                            <ListItem button >
                                <ListItemIcon><CloseIcon /></ListItemIcon>
                            </ListItem>
                            <ListItem button onClick={() => this.table_change(true)} >
                                <ListItemIcon><GridOnIcon /></ListItemIcon>
                                <ListItemText primary='表格顯示' />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
                <Dialog
                    open={viewTable}
                    onClose={() => this.table_change(false)}
                    fullWidth={true}
                    maxWidth='xl'
                    scroll='paper'
                    aria-labelledby='scroll-dialog-title'
                    aria-describedby='scroll-dialog-description'
                    title={DialogTitleOutout}
                    bottom={<Button onClick={() => this.table_change(false)} color='primary'>
                        <CloseIcon />
                    </Button>}
                >
                    {isMobile ? <ExpansionPanel data={places} dataTitle={titles} /> : <Table rowData={places} rowTitle={titles} />}
                </Dialog>
                <Dialog
                    open={viewDetailed}
                    onClose={() => this.detailed_change(false)}
                    fullWidth={true}
                    maxWidth='xl'
                    scroll='paper'
                    aria-labelledby='scroll-dialog-title'
                    aria-describedby='scroll-dialog-description'
                    title={<div style={{ textAlign: 'right' }}><Button onClick={() => this.detailed_change(false)} color='primary'>
                        <CloseIcon />
                    </Button></div>}
                >

                </Dialog>
            </Typography>);
        }

        static propTypes = {
            classes: PropTypes.object.isRequired,
            isMobile: PropTypes.bool.isRequired,
            children: PropTypes.any,
            viewMenu: PropTypes.bool,
            places: PropTypes.array,
            searchBoxAddress: PropTypes.any
        }
    }
));
