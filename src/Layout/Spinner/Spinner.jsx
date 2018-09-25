import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
    width: '100%',
  },
});

class Spinner extends Component {
  render () {
    const { classes } = this.props;
    return (
      <Fragment>
        <CircularProgress className={classes.progress} size={50}/>
      </Fragment>
    );
  }
};

Spinner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Spinner);