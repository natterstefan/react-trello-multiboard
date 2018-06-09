import { get, includes, some } from 'lodash'
import { getMemberByOneOfProperty } from '../../utils/get-member-by-property'

/**
 * isCardHidden: finds out if the card is hidden or not (eg. when one member of
 * the card is toggled in the search)
 *
 * the current setup is only working in combination with the TrelloCardContainer
 * see /src/components/trello-card/index.js
 */
export const isCardHidden = (props = {}) => {
  const { memberToggle = {}, members = [], cardMembers = [] } = props
  let isShown = true // default: card is not hidden
  const togglePreferred = get(memberToggle, 'togglePreferred')
  const togglePreferredMember = get(memberToggle, 'togglePreferredMember')

  if (togglePreferred) {
    if (togglePreferredMember) {
      // first find the member and then check if the member is part of the cardMembers
      const foundMember =
        getMemberByOneOfProperty(members, ['id', 'username'], togglePreferredMember) || {}
      const foundMemberId = foundMember.id

      isShown = some(cardMembers, id => id === foundMemberId)
    } else {
      // members => all members we received and stored in the redux store
      // cardMembers => id's of the members on the current card
      isShown = some(members, member => includes(cardMembers, member.id))
    }
  }

  return !isShown
}
