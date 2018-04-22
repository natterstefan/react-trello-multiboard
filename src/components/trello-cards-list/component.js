import React from 'react'
import { get, invoke, map } from 'lodash'

import Typography from 'material-ui/Typography'
import { LinearProgress } from 'material-ui/Progress'
import styled from 'styled-components'

import proptypes from './prop-types'
import TrelloCard from '../trello-card'

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`

class TrelloCardsList extends React.Component {
  componentDidMount() {
    invoke(this.props, 'loadCards')
  }

  renderList() {
    const { cards, list } = this.props

    if (cards.length === 0) {
      return <Typography>No matching card(s) found</Typography>
    }
    return map(cards, (card, idx) => (
      <TrelloCard
        key={idx}
        card={card.card}
        config={card.config}
        listName={get(list, 'name', '')}
      />
    ))
  }

  render() {
    const { isLoading } = this.props
    const listId = get(this.props, 'list.id')

    if (isLoading) {
      return <LinearProgress />
    }

    return <ColumnContainer className={`cards list_${listId}`}>{this.renderList()}</ColumnContainer>
  }
}

TrelloCardsList.propTypes = proptypes
export default TrelloCardsList
