import React from 'react'
import { get, invoke, map } from 'lodash'

import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'
import styled from 'styled-components'

import proptypes from './prop-types' // eslint-disable-line
import TrelloCard from '../trello-card'

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`

class TrelloCardsList extends React.Component {
  componentDidMount() {
    if ((this.props.cards && this.props.cards.length === 0) || this.props.shouldUpdate) {
      invoke(this.props, 'loadCards')
    }
  }

  renderList() {
    const { cards, list } = this.props

    if (!cards || cards.length === 0) {
      return <Typography>No matching card(s) found</Typography>
    }

    return map(cards, card => (
      <TrelloCard
        key={card.card.id}
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
