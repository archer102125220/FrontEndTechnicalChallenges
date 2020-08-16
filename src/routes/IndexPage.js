import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { enquireScreen } from 'enquire-js';
import { connect } from 'dva';
// import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { GoogleMap } from './../utils/googleapis';
import TextField from '@material-ui/core/TextField';
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
import Button from '../lib/myMaterial/Button';
import Table from '../lib/myMaterial/Table';
import Dialog from '../lib/myMaterial/Dialog';
import ExpansionPanel from '../lib/myMaterial/ExpansionPanel';
import MyList from '../lib/myMaterial/List';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
//https://www.sipios.com/blog-tech/how-to-use-styled-components-with-material-ui-in-a-react-app

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
    },
    GridListRoot: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: them.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
  };
};

const mapStateToProps = (/*state*/) => ({});

const mapDispatchToProps = (/*dispatch*/) => ({});


class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      viewTable: false,
      viewMenu: false,
      viewDetailed: false,
      detailed: {},
      searchBoxAddress: {},
      titles: [
        { id: 'name', numeric: false, disablePadding: true, label: '餐廳名稱' },
        { id: 'vicinity', numeric: false, disablePadding: false, label: '地址' },
        { id: 'rating', numeric: true, disablePadding: false, label: '評價(星)' },
        { id: 'price_level_change', numeric: false, disablePadding: false, label: '價位等級' },
      ]
    };
  }
  setPlaces = (places) => {
    this.setState({ places });
  }
  menu_change = (open) => {
    this.setState({ viewMenu: open });
  }
  table_change = (open) => {
    this.setState({ viewTable: open });
  }
  detailed_change = (open, place) => {
    if (place) {
      this.setState({ viewDetailed: open, detailed: place });
    } else {
      this.setState({ viewDetailed: open });
    }

  }
  searchBoxAddress_change = (searchBoxAddress) => {
    this.setState({ searchBoxAddress });
  }

  componentDidMount = () => {
    this.enquireHandler = enquireScreen(mobile => {
      this.setState({
        isMobile: mobile ? true : false,
      });
    }/*, '(max-width: 1024px)' */);
  }

  render() {
    const { classes } = this.props;
    const { isMobile, titles, viewTable, viewMenu, viewDetailed, searchBoxAddress, detailed } = this.state;
    let { places } = this.state;
    const price_level_change = ['價格親民', '價格略高', '略顯昂貴', '高檔消費'];
    places = places.map(element => ({ ...element, price_level_change: price_level_change[Math.floor(element.price_level)] }));
    const DialogTitleOutout = (searchBoxAddress.name === undefined ? '台灣台北' : searchBoxAddress.name) + ' 附近的20間餐廳';
    const tileData = (detailed.photos || []).map(element => ({
      img: element.getUrl(),
      title: 'Image',
      author: 'author',
      cols: 2,
    }));
    return (
      <div>
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
            getSearchBoxAddress={this.searchBoxAddress_change}
            onMarkerClick={(e, place) => this.detailed_change(true, place)}
          />
        </div>
        <div className={isMobile ? classes.parperIsMobile : classes.parper}>
          <MyList button={true} data={places} dataTitle='name' onClick={(e, place) => this.detailed_change(true, place)} />
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
          <Typography gutterBottom variant="h5" component="h2">
            {detailed.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            地址：{detailed.vicinity}<br /><br />
            評價:{detailed.rating}<StarIcon /><br /><br />
            價位等級:{(price_level_change[Math.floor(detailed.price_level)] || '尚無資料')}<br />
          </Typography>
          <div className={classes.GridListRoot}>
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
              {tileData.map((tile) => (
                <GridListTile key={tile.img} cols={tile.cols || 1}>
                  <img src={tile.img} alt={tile.title} />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </Dialog>
      </div>
    );
  }
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(IndexPage));
