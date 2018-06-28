import React from 'react'
import { shallow } from 'enzyme'

import TrelloCardUi from '../card'

import { props } from '../__mocks__/trello-card'

describe('Component/TrelloCardUi', () => {
  test('should render without throwing an error', () => {
    expect(
      shallow(
        <TrelloCardUi
          {...props.card}
          boardName={props.boardName}
          listName={props.listName}
          minimizeLabels
        />,
      ),
    ).toMatchSnapshot()
  })
})
