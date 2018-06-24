/* global module */
module.exports = {
  app_title: 'Multiboard for Trello®',
  api_key: 'your_api_key',
  company_member: 'exampleusername',
  preferred_members: /exampleusername|anotheruser/,
  lists: [/#upcoming/],
  boards: [
    {
      shortcut: 'hw',
      board: 'hello-world',
      estimates_with_round_brackets: true,
      estimates_with_square_brackets: true,
    },
  ],
}
