// https://codepen.io/natterstefan/pen/QxJZzW?editors=0110
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { get, map, includes } from 'lodash'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

// clicks on the label should not open a new tab with the TrelloCard
const onClick = (event, callback = () => {}) => {
  const classes = get(event, 'target.classList.value') || ''
  if (includes(classes, 'labels')) {
    event.preventDefault()
    callback()
  }
}

// TODO
// - handle case when avatarHash is null, use `initials` on user instead
const TrelloCardUI = ({
  badges,
  boardName,
  labels,
  members,
  minimizeLabels,
  name,
  shortUrl,
  listName,
  toggleMinimizeLabels,
}) => (
  <a
    className="trello-card-wrapper"
    href={shortUrl}
    onClick={event => onClick(event, toggleMinimizeLabels)}
    target="_blank"
  >
    <div className="trello-card">
      <div className="trello-card__content">
        <div className="trello-card--labels">
          {map(labels, label => (
            <span
              key={label.id}
              className={classNames(
                `trello-card--labels-text trello-card--labels-text__${label.color}`,
                {
                  'trello-card--labels-text__minimize': minimizeLabels,
                },
              )}
              title={label.name}
            >
              {label.name}
            </span>
          ))}
        </div>
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
  boardName: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
  listName: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      avatarHash: PropTypes.string,
      fullName: PropTypes.string,
      initials: PropTypes.string,
    }),
  ).isRequired,
  minimizeLabels: PropTypes.bool,
  name: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  toggleMinimizeLabels: PropTypes.func,
}

TrelloCardUI.defaultProps = {
  minimizeLabels: false,
  toggleMinimizeLabels: () => {},
}

export default TrelloCardUI
