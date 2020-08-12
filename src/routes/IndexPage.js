import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { GoogleMap } from './../utils/googleapis';
//https://www.sipios.com/blog-tech/how-to-use-styled-components-with-material-ui-in-a-react-app
const styles = {
  normal: {
    fontFamily: 'Georgia, sans-serif',
    textAlign: 'center',
  }
};

const mapStateToProps = (state) => ({
  users: _.get(state, 'userList.userList', []),
});

const mapDispatchToProps = (/*dispatch*/) => ({

});


class IndexPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.normal}>
        <GoogleMap></GoogleMap>
      </div>
    );
  }
  static propTypes = {
    classes: PropTypes.object.isRequired,
    users: PropTypes.array,
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(IndexPage));
