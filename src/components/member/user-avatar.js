import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'

import { member as memberPropType } from './prop-types'

const styles = {
  initalAvatar: {
    backgroundColor: '#e6e6e6',
    color: '#000',
    fontWeight: 'bold',
    fontSize: '0.875rem',
  },
}

const UserAvatar = props => {
  const { classes, member } = props

  return (
    <div>
      {member.avatarHash && member.avatarImg && <Avatar alt={member.name} src={member.avatarImg} />}
      {!member.avatarHash &&
        member.initials && <Avatar className={classes.initalAvatar}>{member.initials}</Avatar>}
    </div>
  )
}

UserAvatar.displayName = 'UserAvatar'
UserAvatar.propTypes = {
  classes: PropTypes.shape({
    initalAvatar: PropTypes.string,
  }).isRequired,
  member: PropTypes.shape({
    ...memberPropType.isRequired,
    avatarHash: PropTypes.string,
  }).isRequired,
}

export default withStyles(styles)(UserAvatar)
