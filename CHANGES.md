# React-Trello-Multiboard Changelog

All notable changes to this project will be documented here. The format is based
on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project
adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased][1]

### Changed

* `config.js` can now contain multiple `lists` patterns, each list will be available
  in the <ListTabs /> and can later be used to select a specific list. All filters
  work as expected and as before.

### Added

* <ListTabs /> added

## 2018/06/09 [0.1.1][5]

* Bugfix TrelloCard `isHidden` calculation

## 2018/06/09 [0.1.0][4]

### Added

* [connected-react-router](https://github.com/supasate/connected-react-router)
  added to make history actions and current location available to all components
  in the redux store
* Deeplinkg feature for preferred members: You now get a shareable link when you
  click on a member to filter his cards.

### Changed

* <EstimationCard /> is visible only after it was toggled in the <MainApp />
* <BoardsList /> displays it's estimations already in the title
* upgraded all packages to latest version, including major releases
* use [@natterstefan/eslint-config-ns](https://github.com/natterstefan/eslint-config-ns)
  for eslint, stylelint and prettier

## 2018/05/25 [0.0.2][3]

### Added

* custom `<TrelloCardUi />` component added (replaces Trello's embedded iframe)
* fallback for missing `avatarHash` implemented (use member's `initials`) added
* `sideEffects` option for webpack's treeshaking feature added, `.babelrc` modified
  (`"modules": false`) and prod.config.js (webpack config) updated as well. Read more about
  treeshaking [here](https://webpack.js.org/guides/tree-shaking/),
  [here](https://stackoverflow.com/a/47675519/1238150) and
  [here](https://github.com/webpack/webpack/issues/6992#issuecomment-379662391).

### Changed

* upgraded all packages to latest version, including major releases (eg. `redux`
  from `3.7.2` to `4.0.0`, and `react` to `16.3.2` and `sass-loader` to `7.0.1`)
* refactored and removed not used styled components
* fix `overflow-x` css usage in several components
* use mocks more consistently in tests

### Deprecated

* `<TrelloCardIframe />` deprecated, use `<TrelloCardUi />` instead now

### Fixed

* reloadButton refreshes all data in the store

## 2018/04/22 [0.0.1][2]

### Added

* Initial Release/Commit can

  * load all boards of the authenticated user
  * filter it by the specified boards in the config
  * display only cards of filtered lists (see config)
  * and allow cards to be filtered by members

* Move from Bitbucket to GitHub and Open-Source project

[1]: https://github.com/natterstefan/react-trello-multiboard/compare/v0.1.0...HEAD
[2]: https://github.com/natterstefan/react-trello-multiboard/releases/tag/v0.0.1
[3]: https://github.com/natterstefan/react-trello-multiboard/compare/v0.0.1...v0.0.2
[4]: https://github.com/natterstefan/react-trello-multiboard/compare/v0.0.2...v0.1.0
[5]: https://github.com/natterstefan/react-trello-multiboard/compare/v0.1.0...v0.1.1
