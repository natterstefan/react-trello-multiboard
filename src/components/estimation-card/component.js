import React from 'react'
import { get, map } from 'lodash'

import LinearProgress from '@material-ui/core/LinearProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import proptypes from './prop-types'
import { getBoardName } from '../../utils/get-board-name'
import { getMemberByOneOfProperty } from '../../utils/get-member-by-property'

const EstimationCard = props => {
  const { boards, companyMember, error, isLoading, memberToggle, members } = props
  const { togglePreferred, togglePreferredMember } = memberToggle
  const { data } = boards

  if (error || !data || data.length === 0) {
    return <span />
  }
  if (isLoading) {
    return <LinearProgress />
  }

  let totalEstimations = 0
  let totalConsumed = 0

  const getBoardEstimations = boardItem => {
    // NOTE: add a test to component.test.js
    const boardId = get(boardItem, 'board.id')
    let consumed = 0
    let estimated = 0

    if (togglePreferred && togglePreferredMember) {
      // find the correct member in the list of available members
      const member = getMemberByOneOfProperty(
        members.members,
        ['id', 'username'],
        togglePreferredMember,
      )

      if (member) {
        // get the member specific estimation for the board
        const getMemberEstimation = key =>
          get(members, `[${member.id}].boardEstimations[${boardId}][${key}]`, 0)

        consumed = getMemberEstimation('consumed')
        estimated = getMemberEstimation('estimated')
      }
    } else if (togglePreferred) {
      // get the values for each board from the main account
      const getEstimations = key =>
        get(members, `[${companyMember}].boardEstimations[${boardId}][${key}]`, 0)

      consumed = getEstimations('consumed')
      estimated = getEstimations('estimated')
    } else {
      // get the board estimation
      consumed = get(boardItem, 'estimations.consumed', 0)
      estimated = get(boardItem, 'estimations.estimated', 0)
    }
    totalConsumed += consumed
    totalEstimations += estimated

    return { consumed, estimated }
  }

  return (
    <div style={{ display: 'flex' }}>
      <Card>
        <CardContent>
          <List>
            {map(data, boardItem => {
              const { estimated, consumed } = getBoardEstimations(boardItem)
              const boardName = getBoardName(get(boardItem, 'board.name', '-'))
              const boardId = get(boardItem, 'board.id')

              return (
                <ListItem key={boardId} dense button>
                  <Typography>
                    {boardName}: ({estimated})[{consumed}]
                  </Typography>
                </ListItem>
              )
            })}
            <ListItem key={`estimations-${totalEstimations}`} dense button>
              <Typography>
                <strong>
                  Total: ({totalEstimations})[{totalConsumed}]
                </strong>
              </Typography>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </div>
  )
}

EstimationCard.displayName = 'EstimationCard'
EstimationCard.propTypes = proptypes

export default EstimationCard
