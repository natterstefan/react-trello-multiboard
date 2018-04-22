import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

// TODO
// - add tests
// - handle case when avatarHash is null, use `initials` on user instead
const TrelloCardUI = ({ badges, boardName, members, name, shortUrl, listName }) => (
  <a className="trello-card-wrapper" href={shortUrl}>
    <div className="trello-card">
      <div className="trello-card__content">
        <div className="trello-card__title">{name}</div>
        <div className="trello-card__badges">
          {badges &&
            badges.description && (
              <div>
                <FontAwesomeIcon icon={['fa', 'align-left']} size="sm" />
              </div>
            )}
          {badges &&
            badges.comments > 0 && (
              <div>
                <FontAwesomeIcon icon={['fa', 'comment-dots']} size="sm" /> {badges.comments}
              </div>
            )}
          {badges &&
            badges.attachments > 0 && (
              <div>
                <FontAwesomeIcon icon={['fa', 'paperclip']} size="sm" /> {badges.attachments}
              </div>
            )}
          {badges &&
            badges.checkItems > 0 && (
              <div>
                <FontAwesomeIcon icon={['fa', 'check-square']} size="sm" />{' '}
                {badges.checkItemsChecked}/{badges.checkItems}
              </div>
            )}
        </div>
        <div className="trello-card__members">
          <ul>
            {map(members, ({ avatarHash, fullName, initials }) => (
              <li key={`${shortUrl}-${avatarHash}`}>
                <div className="trello-card__member">
                  {avatarHash ? (
                    <img
                      className="trello-card__member--image"
                      src={`https://trello-avatars.s3.amazonaws.com/${avatarHash}/50.png`}
                      alt={fullName}
                    />
                  ) : (
                    <span className="trello-card__member--intials">{initials}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="trello-card__board-details">
        <div className="trello-card__board-name">{boardName}:</div>
        <div className="trello-card__list-name">{listName}</div>
      </div>
    </div>
  </a>
)

TrelloCardUI.displayName = 'TrelloCardUI'
TrelloCardUI.propTypes = {
  badges: PropTypes.shape({
    description: PropTypes.bool,
    comments: PropTypes.number,
    attachments: PropTypes.number,
    checkItems: PropTypes.number,
    checkItemsChecked: PropTypes.number,
  }).isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      avatarHash: PropTypes.string,
      fullName: PropTypes.string,
      initials: PropTypes.string,
    }),
  ).isRequired,
  boardName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  listName: PropTypes.string.isRequired,
}

export default TrelloCardUI
