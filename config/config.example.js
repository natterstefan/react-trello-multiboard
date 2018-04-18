/* global module */
module.exports = {
  app_title: 'Trello Multiboard',
  api_key: 'your_api_key',
  company_member: 'exampleusername',
  preferred_members: /exampleusername|anotheruser/,
  boards: [
    {
      shortcut: 'hw',
      board: 'hello-world',
      lists: /#upcoming/,
      estimates_with_round_brackets: true,
      estimates_with_square_brackets: true,
    },
  ],
}
