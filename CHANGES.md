# React-Trello-Multiboard Changelog

All notable changes to this project will be documented here. The format is based
on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project
adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased

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

## 2018/04/22 0.0.1

### Added

* Initial Release/Commit can

  * load all boards of the authenticated user
  * filter it by the specified boards in the config
  * display only cards of filtered lists (see config)
  * and allow cards to be filtered by members

* Move from Bitbucket to GitHub and Open-Source project
