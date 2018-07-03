import { forEach } from 'lodash'
import { getCards } from '../../data/trello'

const actions = {
  REQUEST: 'REQUEST_CARD',
  RECEIVE: 'RECEIVE_CARD',
}

const startRequestCard = listId => ({ type: actions.REQUEST, listId })

const receiveCards = (listId, data, error = null) => ({
  type: actions.RECEIVE,
  listId,
  payload: data,
  error,
})

const requestCards = (list, config) => async dispatch => {
  dispatch(startRequestCard(list.id))

  try {
    const result = await getCards(list.id)
    const cards = []
    forEach(result, card => {
      const cardObj = {
        card,
        config,
      }
      cards.push(cardObj)
    })

    dispatch(receiveCards(list.id, cards))
  } catch (error) {
    dispatch(receiveCards(list.id, null, error))
  }
}

export { actions, requestCards }
