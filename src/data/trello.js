export const trello = window.Trello

export const isTrelloAvailable = () => {
  if (trello) {
    return true
  }
  return false
}

const getData = (query, resolve, reject) => {
  if (!isTrelloAvailable()) {
    reject(new Error('Trello is not defined'))
  }
  trello.get(
    query,
    result => {
      resolve(result)
    },
    errorMsg => {
      reject(errorMsg)
    },
  )
}

export const authenticateUser = () =>
  new Promise((resolve, reject) => {
    if (!isTrelloAvailable()) {
      reject(new Error('Trello is not defined'))
    }
    trello.authorize({
      name: 'multiboard-for-trello', // Note: probably add to config.js
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
  new Promise((resolve, reject) => getData('/member/me/boards?fields=id,name', resolve, reject))

export const getLists = boardId =>
  new Promise((resolve, reject) =>
    getData(`/boards/${boardId}/lists?fields=id,idBoard,name`, resolve, reject),
  )

export const getCards = listId =>
  new Promise((resolve, reject) =>
    getData(
      `/lists/${listId}/cards?members=true&member_fields=username,fullName,avatarHash&fields=id,name,idBoard,idMembers,idList,shortUrl,badges`,
      resolve,
      reject,
    ),
  )

export const getMember = memberId =>
  new Promise((resolve, reject) =>
    getData(`/members/${memberId}?fields=username,avatarHash,fullName`, resolve, reject),
  )

export default {
  authenticateUser,
  getMeBoards,
  getLists,
  getCards,
  getMember,
  isTrelloAvailable,
  trello,
}
