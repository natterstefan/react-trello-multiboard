import { mockExampleBoardConfig } from '../../src/__mocks__/mocks'

module.exports = {
  app_title: 'Trello Multiboard',
  api_key: 'your_api_key',
  google_analytics_property: 'UA-12345678-9',
  company_member: 'exampleusername',
  preferred_members: /exampleusername|anotheruser/,
  lists: [/#upcoming/],
  boards: [mockExampleBoardConfig],
}
