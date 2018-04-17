import React from 'react'
import { get } from 'lodash'

import { withStyles } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { LinearProgress } from 'material-ui/Progress'
import styled from 'styled-components'

import proptypes from './prop-types'

const styles = () => ({
  root: {
    padding: '15px !important', // overwrites every padding of CardContent
  },
})

const MemberContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100px;
  text-align: center;
  align-items: center;
`

const Member = props => {
  const { doTogglePreferredMember, error, estimations, isActive, isLoading, member } = props

  if (error) {
    return <span />
  }
  if (isLoading) {
    return <LinearProgress />
  }

  const estimated = get(estimations, 'estimated', 0)
  const consumed = get(estimations, 'consumed', 0)

  return (
    <Card
      className={`member_card_${member.id}`}
      style={{
        backgroundColor: isActive ? '#3f51b5' : undefined,
      }}
      onClick={() => doTogglePreferredMember(member.id)}
    >
      <CardContent className={props.classes.root}>
        <MemberContainer>
          {member.avatarImg && <Avatar alt={member.name} src={member.avatarImg} />}
          <Typography style={{ color: isActive ? '#fff' : undefined }}>
            {estimations && (
              <span className={`member_card_${member.id}--estimations`}>
                ({estimated})[{consumed}]
              </span>
            )}
          </Typography>
        </MemberContainer>
      </CardContent>
    </Card>
  )
}

Member.propTypes = proptypes
Member.displayName = 'Member'

export default withStyles(styles)(Member)
