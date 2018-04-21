/* eslint-disable react/no-multi-comp */
/* global $ */
import React from 'react'
import { get, invoke, map } from 'lodash'
import proptypes, { cardId as cardIdPropType } from './prop-types'

const heightOffset = 10

export class TrelloCardIframe extends React.Component {
  static propTypes = {
    cardId: cardIdPropType.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      height: 0,
    }

    this.onLoad = this.onLoad.bind(this)
    this.onResize = this.onResize.bind(this)
  }

  componentDidMount() {
    this.createCard()
  }

  onLoad(evt) {
    // Callback after the card has loaded
    // Can be used to resize the parent container
    const clientHeight = evt && get(evt, 'path[0].clientHeight', 0)
    if (clientHeight > 0) {
      this.setState({ height: clientHeight + heightOffset })
      return true
    }
    return false
  }

  onResize(dim) {
    // Callback after the card resizes when the comments
    // section is expanded or collapsed
    if (dim && dim.height > 0) {
      this.setState({ height: dim.height + heightOffset })
      return true
    }
    return false
  }

  createCard() {
    const { cardId } = this.props
    const cardElement = get($(`#card_${cardId}`), '[0]')

    // window.TrelloCards is part of trello's embed.min.js
    if (window.TrelloCards && window.TrelloCards.create) {
      window.TrelloCards.create(cardId, cardElement, {
        compact: true,
        onLoad: this.onLoad,
        onResize: this.onResize,
      })
      return true
    }
    return false

    // NOTE: each iframe also pushes it's new size to the parent site as a message
    // one can subscribe and do something with the data as well. The preferred way
    // is listed and used above though.
    // var receiveMessage = (event) => {
    //   if (event.data.command === 'resize' && event.data.secret) {
    //     var newHeight = event.data.options.height
    //     if (newHeight !== undefined && newHeight > 0) {
    //       this.setState({height: newHeight + 20})
    //     }
    //   }
    // }
    // window.addEventListener('message', receiveMessage, false)
  }

  render() {
    const { height } = this.state
    const { cardId } = this.props
    /**
     * NOTE: Alternative Solution (eg. when the Trello embed.min.js solution does
     * not work anymore).This solution could still be improved, with eg onLoad
     * --> https://stackoverflow.com/a/3142939/1238150
     */
    // const classes = []
    // each(get(card, 'idMembers', []), id => { if (id) { classes.push(`member_${id}`) } })
    // return (
    //   <iframe
    //     className={`card card_${cardId} ${classes.join(' ')}`}
    //     style={{
    //       border: 0,
    //       boxSizing: 'border-box',
    //       marginBottom: 5
    //     }}
    //     src={`https://trello.com/embed/card?id=${cardId}&secret=${cardId}&compact=true`}
    //   />
    // )
    return (
      <div
        id={`card_${cardId}`}
        style={{
          marginBottom: 15,
          height,
        }}
      />
    )
  }
}
TrelloCardIframe.displayName = 'TrelloCardIframe'

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
    const { card, isHidden } = this.props
    console.log('card', card) /* eslint-disable-line */
    return null;

    return (
      <div
        className={`card ${this.getMemberClass()}`}
        style={{
          display: isHidden ? 'none' : 'block',
        }}
      >
        <TrelloCardIframe cardId={card.id} />
      </div>
    )
  }
}

TrelloCard.propTypes = proptypes
export default TrelloCard
