import React from 'react'
import { get, invoke, map } from 'lodash'
import proptypes from './prop-types'

import TrelloCardUI from './card'

class TrelloCard extends React.Component {
  componentDidMount() {
    const { config } = this.props
    // Note: previously we added all members (or only preferred) ones from the
    // card to the store. One can add it here again for instance.

    // update the estimations
    const estimation = {
      estimated: config.estimates_with_round_brackets ? this.getEstimation(/\([0-9]+\)/g) : 0, // (%s)
      consumed: config.estimates_with_square_brackets ? this.getEstimation(/\[[0-9]+\]/g) : 0, // [%s]
    }

    invoke(this.props, 'addEstimations', estimation)
  }

  getEstimation(reg) {
    const { card } = this.props
    const cardName = get(card, 'name') || ''

    const estimates = cardName.match(reg)
    if (!estimates) {
      return 0
    }
    let complexity = 0
    for (let i = 0; i < estimates.length; i++) {
      complexity += parseInt(estimates[i].substr(1), 10)
    }
    return complexity
  }

  getMemberClass() {
    const { card } = this.props
    // add an extra class, to make cards selectable via css
    const classes = map(get(card, 'idMembers', []), id => `member_${id}`)
    return classes.join(' ')
  }

  render() {
    const { boardName, card, isHidden, listName } = this.props

    return (
      <div
        id={`card_${card.id}`}
        className={`card ${this.getMemberClass()}`}
        style={{
          display: isHidden ? 'none' : 'block',
        }}
      >
        <TrelloCardUI {...card} listName={listName} boardName={boardName} />
      </div>
    )
  }
}

TrelloCard.propTypes = proptypes
export default TrelloCard
