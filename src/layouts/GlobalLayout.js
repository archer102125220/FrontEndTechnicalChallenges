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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GridOnIcon from '@material-ui/icons/GridOn';
import CloseIcon from '@material-ui/icons/Close';
import Button from './../lib/components/Button';
import Table from './../lib/components/Table';
import ExpansionPanel from './../lib/components/ExpansionPanel';

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
        },
        parper: {
            display: 'flex',
            position: 'fixed !important',
            // flexWrap: 'wrap',
            right: '1vh',
            top: '10Vw',
            '& > *': {
                margin: them.spacing(1),
                width: them.spacing(16),
                height: them.spacing(16),
            },
        },
    };
};

const mapStateToProps = (state) => ({
    viewTable: _.get(state, 'globall.viewTable', false),
    viewMenu: _.get(state, 'globall.viewMenu', false),
    places: _.get(state, 'placesList.placesList', []),
    searchBoxAddress: _.get(state, 'placesList.searchBoxAddress', {}),
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
        constructor(props) {
            super(props);
            this.state = {
                titles: [//icon name vicinity photos rating price_level
                    { id: 'name', numeric: false, disablePadding: true, label: '餐廳名稱' },
                    { id: 'vicinity', numeric: false, disablePadding: false, label: '地址' },
                    { id: 'rating', numeric: true, disablePadding: false, label: '評價(星)' },
                    { id: 'price_level_change', numeric: false, disablePadding: false, label: '價位等級' },
                ]
            };
        }
        menu_change = (open) => {
            const { viewMenu_change } = this.props;
            viewMenu_change(open);
        }
        table_change = (open) => {
            const { viewTable_change } = this.props;
            viewTable_change(open);
        }
        render() {
            const { children, classes, isMobile, viewMenu, viewTable, searchBoxAddress } = this.props;
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
                {/* <div className={classes.parper}>
                    <Paper elevation={3} />
                </div> */}
                <Drawer
                    variant="persistent"
                    anchor='top'
                    open={viewMenu}
                    onClose={() => this.menu_change(false)}
                >
                    <div
                        role="presentation"
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
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle>{DialogTitleOutout}</DialogTitle>
                    <DialogContent dividers={true}>
                        <DialogContentText component='span'>
                            {isMobile ? <ExpansionPanel data={places} dataTitle={titles} /> : <Table rowData={places} rowTitle={titles} />}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.table_change(false)} color="primary">
                            <CloseIcon />
                        </Button>
                    </DialogActions>
                </Dialog>
            </Typography>);
        }

        static propTypes = {
            classes: PropTypes.object.isRequired,
            isMobile: PropTypes.bool.isRequired,
            children: PropTypes.any,
            viewMenu: PropTypes.bool,
            viewMenu_change: PropTypes.func,
            viewTable: PropTypes.bool,
            viewTable_change: PropTypes.func,
            places: PropTypes.array,
            searchBoxAddress: PropTypes.any,
        }
    }
));
