// NOTE (201804)
// This component is not used anymore, and was replaced with ./card.js. But for
// the record it is still present in the repository. It might be removed in the
// future though.

/* global $ */
import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'

const heightOffset = 10

// usage: <TrelloCardIframe cardId={card.id} />
export default class TrelloCardIframe extends React.Component {
  static propTypes = {
    cardId: PropTypes.string.isRequired,
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
    // is listed and used above though (see onLoad and onResize).
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
