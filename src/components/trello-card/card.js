import React from 'react'
import { map } from 'lodash'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const TrelloCardUI = ({ badges, boardName, description, members, name, shortUrl, listName }) => (
  <a className="trello-card-wrapper" href={shortUrl}>
    <div className="trello-card">
      <div className="trello-card--content">
        <div className="trello-card--title">{name}</div>
        <div className="trello-card--badges">
          {badges.description && (
            <div>
              <FontAwesomeIcon icon={['fa', 'align-left']} size="lg" />
            </div>
          )}
          {badges.comments > 0 && (
            <div>
              <FontAwesomeIcon icon={['fa', 'comment-dots']} size="lg" /> {badges.comments}
            </div>
          )}
          {badges.attachments > 0 && (
            <div>
              <FontAwesomeIcon icon={['fa', 'paperclip']} size="lg" /> {badges.attachments}
            </div>
          )}
          {badges.checkItems > 0 && (
            <div>
              <FontAwesomeIcon icon={['fa', 'check-square']} size="lg" /> {badges.checkItemsChecked}/{
                badges.checkItems
              }
            </div>
          )}
        </div>
        <div className="trello-card--members">
          <ul>
            {map(members, ({ avatarHash, fullName }) => (
              <li key={`${shortUrl}-${avatarHash}`}>
                <div className="trello-card--member">
                  <img
                    src={`https://trello-avatars.s3.amazonaws.com/${avatarHash}/50.png`}
                    alt={fullName}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="trello-card--board-details">
        <div className="trello-card--board-name">{boardName}:</div>
        <div className="trello-card--list-name">{listName}</div>
      </div>
    </div>
  </a>
)
TrelloCardUI.displayName = 'TrelloCardUI'

export default TrelloCardUI
