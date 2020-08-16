import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = (theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

export default withStyles(useStyles)(class SimpleAccordion extends Component {

    render() {
        const { classes, dataTitle, data } = this.props;

        return (
            <div className={classes.root}>
                {data.map((element, key) => (
                    <Accordion key={key}>
                        {dataTitle.map((title, titleKey) => titleKey === 0 ?
                            (<AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                key={titleKey}
                            >
                                <Typography className={classes.heading}>{element[title.id]}</Typography>
                            </AccordionSummary>)
                            :
                            (<AccordionDetails key={titleKey}>
                                <Typography>{title.label + ':' + (element[title.id] || '尚無資料')}</Typography>
                            </AccordionDetails>)
                        )}
                    </Accordion>
                ))}
            </div>
        );
    }
    static propTypes = {
        classes: PropTypes.object.isRequired,
        dataTitle: PropTypes.array,
        data: PropTypes.array,
    }
});