import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// const rowData = [
//     { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png' },
//     { name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png' },
//     { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0, icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png' },
//     { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png' },
//     { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9, icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png' },
//     { name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, protein: 6.5, icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png' },
//     { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3, icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png' },
//     { name: 'Jelly Bean', calories: 375, fat: 0.0, carbs: 94, protein: 0.0, icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png' },
//     { name: 'KitKat', calories: 518, fat: 26.0, carbs: 65, protein: 7.0, icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png' },
//     { name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98, protein: 0.0, icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png' },
//     { name: 'Marshmallow', calories: 318, fat: 0, carbs: 81, protein: 2.0, icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png' },
//     { name: 'Nougat', calories: 360, fat: 19.0, carbs: 9, protein: 37.0, icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png' },
//     { name: 'Oreo', calories: 437, fat: 18.0, carbs: 63, protein: 4.0, icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png' },
// ];

// const rowTitle = [
//     { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
//     { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
//     { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
//     { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
//     { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
// ];

class EnhancedTableHead extends Component {
    constructor(props) {
        super(props);
    }

    createSortHandler = (property) => (event) => {
        this.props.onRequestSort(event, property);
    }

    render() {
        const { props } = this;
        const { classes, /*onSelectAllClick,*/ order, orderBy,/* numSelected, rowCount,*/ rowTitle } = props;
        return (
            <TableHead>
                <TableRow>
                    {/* <TableCell padding='checkbox'>
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{ 'aria-label': 'select all desserts' }}
                        />
                    </TableCell> */}
                    <TableCell></TableCell>
                    {rowTitle.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={this.createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }
    static propTypes = {
        classes: PropTypes.object.isRequired,
        numSelected: PropTypes.number,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number,
        rowTitle: PropTypes.array.isRequired,
        imgCell: PropTypes.string,
    }
}



const useToolbarStyles = (theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
});


export const EnhancedTableToolbar = withStyles(useToolbarStyles)(class EnhancedTableToolbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { props } = this;
        const { numSelected, classes } = props;
        return (
            <Toolbar className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })} >
                {numSelected > 0 ? (
                    <Typography className={classes.title} color='inherit' variant='subtitle1' component='div'>
                        {numSelected} selected
                    </Typography>
                ) : (
                        <Typography className={classes.title} variant='h6' id='tableTitle' component='div'>
                            Nutrition
                        </Typography>
                    )}

                {numSelected > 0 ? (
                    <Tooltip title='Delete'>
                        <IconButton aria-label='delete'>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                        <Tooltip title='Filter list'>
                            <IconButton aria-label='filter list'>
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                    )}
            </Toolbar>
        );
    }

    static propTypes = {
        numSelected: PropTypes.number.isRequired,
        classes: PropTypes.object
    }
});


const useStyles = (theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
});

export default withStyles(useStyles)(class EnhancedTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            page: 0,
            dense: false,
            rowsPerPage: 5
        };
    }

    handleRequestSort = (event, property) => {
        const { orderBy, order } = this.state;
        const isAsc = orderBy === property && order === 'asc';
        this.setState({
            order: isAsc ? 'desc' : 'asc',
            orderBy: property
        });
    }

    handleSelectAllClick = (event, rowData) => {
        if (event.target.checked) {
            const newSelecteds = rowData.map((n) => n.name);
            this.setState({
                selected: newSelecteds
            });
            return;
        }
        this.setState({
            selected: []
        });
    }

    handleClick = (event, name) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({
            selected: newSelected
        });
    }

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        });
    }

    handleChangeRowsPerPage = (event) => {
        this.setState({
            rowsPerPage: parseInt(event.target.value, 10),
            page: 0
        });
    }

    isSelected = (name) => this.state.selected.indexOf(name) !== -1

    render() {
        const { props, state } = this;
        const { classes, rowData, rowTitle, imgCell } = props;
        const { rowsPerPage, page, dense, selected, order, orderBy } = state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rowData.length - page * rowsPerPage);

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby='tableTitle'
                            size='medium'
                            aria-label='enhanced table'
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                // onSelectAllClick={(event) => this.handleSelectAllClick(event, rowData)}
                                onRequestSort={this.handleRequestSort}
                                rowCount={rowData.length}
                                rowTitle={rowTitle}
                                imgCell={imgCell}
                            />
                            <TableBody>
                                {stableSort(rowData, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = this.isSelected(row.name);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => this.handleClick(event, row.name)}
                                                // role='checkbox'
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.name}
                                                selected={isItemSelected}
                                            >
                                                {/* <TableCell padding='checkbox'>
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </TableCell> */}
                                                {
                                                    imgCell ?
                                                        <TableCell>
                                                            <img src={row[imgCell]} />
                                                        </TableCell> : <TableCell></TableCell>
                                                }

                                                {
                                                    rowTitle.map((element, key) => key === 0 ?
                                                        (<TableCell key={key} component='th' id={labelId} scope='row' padding='none'>{row[element.id] || '暫無資料'}</TableCell>)
                                                        :
                                                        (<TableCell key={key} align={element.numeric ? 'right' : 'left'}>{row[element.id] || '暫無資料'}</TableCell>)
                                                    )
                                                }
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 20]}
                        component='div'
                        count={rowData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        );
    }
    static propTypes = {
        classes: PropTypes.object,
        rowData: PropTypes.array,
        rowTitle: PropTypes.array,
        imgCell: PropTypes.string
    }
});