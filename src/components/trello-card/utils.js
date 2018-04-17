import { get, includes, some } from 'lodash'

/**
 * isCardHidden: finds out if the card is hidden or not (eg. when one member of
 * the card is toggled in the search)
 *
 * the current setup is only working in combination with the TrelloCardContainer
 */
export const isCardHidden = (props = {}) => {
  const { memberToggle = false, members = [], idMembers = [] } = props
  let isShown = true // default: card is not hidden
  const togglePreferred = memberToggle && get(memberToggle, 'togglePreferred')
  const togglePreferredMember = memberToggle && get(memberToggle, 'togglePreferredMember')

  if (togglePreferred) {
    if (togglePreferredMember) {
      isShown = some(idMembers, id => id === togglePreferredMember)
    } else {
      // members => all members we received and stored in the redux store
      // idMembers => id's of the members on the current card
      isShown = some(members, member => includes(idMembers, member.id))
    }
  }

  return !isShown
}
