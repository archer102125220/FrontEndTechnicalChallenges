import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = (/*theme*/) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        // backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    listSection: {
        // backgroundColor: 'inherit',
    },
    ul: {
        // backgroundColor: 'inherit',
        padding: 0,
    },
});

export default withStyles(useStyles)(class PinnedSubheaderList extends Component {

    render() {
        const { classes, data, dataTitle, button } = this.props;

        return (
            <List className={classes.root} subheader={<li />}>
                {/* {data.map((sectionId) => (
                    <li key={`section-${sectionId}`} className={classes.listSection}>
                        <ul className={classes.ul}>
                            <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
                            {[0, 1, 2].map((item) => (
                                <ListItem key={`item-${sectionId}-${item}`}>
                                    <ListItemText primary={`Item ${item}`} />
                                </ListItem>
                            ))}
                        </ul>
                    </li>
                ))} */}

                <li className={classes.listSection}>
                    {
                        data.map((element, key) => (
                            <ListItem button={button} key={key}>
                                <ul className={classes.ul}>
                                    {
                                        dataTitle === '' ?
                                            <ListItemText primary={element} /> :
                                            <ListItemText primary={element[dataTitle]} />
                                    }
                                </ul>
                            </ListItem>
                        ))
                    }
                </li>
            </List >
        );
    }
    static propTypes = {
        classes: PropTypes.object.isRequired,
        data: PropTypes.array,
        dataTitle: PropTypes.any,
        button: PropTypes.bool
    }
    static defaultProps = {
        data: [0, 1, 2, 3, 4],
        dataTitle: '',
        button: false
    }
});