import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class ScrollDialog extends Component {

    render() {
        const { props } = this;
        const { title, children, bottom } = props;

        return (
            <Dialog
                {...props}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText component='span'>
                        {children}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {bottom}
                </DialogActions>
            </Dialog>
        );
    }
    static propTypes = {
        open: PropTypes.bool,
        title: PropTypes.any,
        children: PropTypes.any,
        bottom: PropTypes.any,
    }
}