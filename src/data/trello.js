import Config from '../../config/config'

export const trello = window.Trello

export const isTrelloAvailable = () => {
  if (trello) {
    return true
  }
  return false
}

export const getQuery = (query, resolve, reject) => {
  if (!isTrelloAvailable()) {
    reject(new Error('Trello is not defined'))
    return
  }

  trello.get(
    query,
    result => resolve(result),
    errorMsg => {
      let error = errorMsg
      if (errorMsg.status === 401) {
        // Trello Response Code 401: eg. when api_key changed but old one is still
        // present in the localStorage
        error = {
          responseText: errorMsg.responseText,
          status: errorMsg.status,
          statusText: errorMsg.statusText,
        }
      }
      reject(error)
    },
  )
}

export const authenticateUser = () =>
  new Promise((resolve, reject) => {
    if (!isTrelloAvailable()) {
      reject(new Error('Trello is not defined'))
    }
    trello.authorize({
      name: Config.app_title || 'multiboard-for-trello',
      type: 'redirect',
      scope: {
        read: true,
        write: false,
      },
      expiration: 'never',
      response_type: 'token',
      success: () => resolve(true),
      error: () => reject(new Error('Authentication failed')),
    })
  })

export const getMeBoards = () =>
  new Promise((resolve, reject) => getQuery('/member/me/boards?fields=id,name', resolve, reject))

export const getBoard = boardId =>
  new Promise((resolve, reject) => getQuery(`/boards/${boardId}?fields=id,name`, resolve, reject))

export const getLists = boardId =>
  new Promise((resolve, reject) =>
    getQuery(`/boards/${boardId}/lists?fields=id,idBoard,name`, resolve, reject),
  )

export const getCards = listId =>
  new Promise((resolve, reject) =>
    getQuery(
      `/lists/${listId}/cards?members=true&member_fields=avatarHash,fullName,initials,username&fields=badges,labels,name,id,idBoard,idList,idMembers,shortUrl`,
      resolve,
      reject,
    ),
  )

export const getMember = memberId =>
  new Promise((resolve, reject) =>
    getQuery(`/members/${memberId}?fields=username,avatarHash,fullName,initials`, resolve, reject),
  )

export default {
  authenticateUser,
  getCards,
  getBoard,
  getLists,
  getMeBoards,
  getMember,
  getQuery,
  isTrelloAvailable,
  trello,
}
