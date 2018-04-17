import React from 'react'
import { get, map } from 'lodash'
import List, { ListItem } from 'material-ui/List'
import { withStyles } from 'material-ui/styles'

import proptypes from './prop-types'
import Member from '../member'

const styles = () => ({
  root: {
    padding: '10px !important', // overwrites every padding of ListItem
  },
})

const MembersList = props => {
  const { members } = props

  return (
    <List style={{ display: 'flex', alignItems: 'self-start' }}>
      {map(get(members, 'members', []), ({ id }) => {
        // - display only preferred members in this list
        const isPreferred = get(members, `[${id}].data.preferred`, false)
        if (!isPreferred) {
          return null
        }

        return (
          <ListItem className={props.classes.root} key={id} dense button>
            <Member memberId={id} />
          </ListItem>
        )
      })}
    </List>
  )
}

MembersList.displayName = 'MembersList'
MembersList.propTypes = proptypes

export default withStyles(styles)(MembersList)
