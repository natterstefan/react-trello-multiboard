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
      name: 'hello-world',
      id: 'board-1', // optional: only required when board is public but user should see it
      estimates_with_round_brackets: true,
      estimates_with_square_brackets: true,
    },
  ],
}
