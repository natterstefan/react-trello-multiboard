import React from 'react'

const TrelloCardUI = () => (
  <a className="trello-card-wrapper" href="https://trello.com">
    <div className="trello-card">
      <div className="trello-card--content">
        <div className="trello-card--title">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam (5)[5]
        </div>
        <div className="trello-card--badges">
          <div>Comments</div>
          <div>Attachments</div>
          <div>Checklist</div>
        </div>
        <div className="trello-card--members">
          <ul>
            <li>
              <div className="trello-card--member">
                <img
                  src="https://trello-avatars.s3.amazonaws.com/e84bd5ae16effe6d9842563f7e41d93d/50.png"
                  alt="member-1"
                />
              </div>
            </li>
            <li>
              <div className="trello-card--member">
                <img
                  src="https://trello-avatars.s3.amazonaws.com/e84bd5ae16effe6d9842563f7e41d93d/50.png"
                  alt="member-2"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="trello-card--board-title">hello-world: #upcoming Sprint</div>
    </div>
  </a>
)
TrelloCardUI.displayName = 'TrelloCardUI'

export default TrelloCardUI
