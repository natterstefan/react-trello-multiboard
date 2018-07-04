// Docs https://material-ui.com/demos/snackbars/
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
})

class Notification extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: typeof this.props.message !== 'undefined' || false,
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ open: false })
  }

  render() {
    const { autoHideDuration = 10000, classes, message } = this.props

    if (!message) {
      return null
    }

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={this.state.open}
        autoHideDuration={autoHideDuration}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    )
  }
}

Notification.propTypes = {
  autoHideDuration: PropTypes.number,
  classes: PropTypes.object.isRequired, // eslint-disable-line
  message: PropTypes.string,
}

Notification.defaultProps = {
  autoHideDuration: 10000,
  message: undefined,
}

export default withStyles(styles)(Notification)
