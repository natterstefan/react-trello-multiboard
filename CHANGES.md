# React-Trello-Multiboard Changelog

All notable changes to this project will be documented here. The format is based
on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project
adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased][1]

### Added

* <Routes /> component added for better and easier route management
* Google Analytics Feature: simply add `google_analytics_property` to the config.js
  and enable Google Analytics on the page (including a privacy page.) Take a look
  at the [README](README#google-analytics--privacy-page) to get to know the feature.
* CookieNotice component added, will be automatically present when Google Analytics
  is configured
* Markdown files can be used to create content for a page (eg. a privacy page)
* BREAKPOINTS constant added

### Changed

* jQuery (required for Trello), MaterialUI Fonts and Icons are self-hosted now
* <Layout /> component added to easier render Pages and their shared page components
* UI improvements
  * customize scrollbars (horizontal and vertical)
  * Options toggle (show and hide)
  * centered all elements in BoardsList (eg. board name)

### Removed

* removed iframe styling from main.scss

## 2018/07/04 [0.2.1][7]

### Added

* When Trello-API returns 401 (eg. when `api_key` changed and old token is still
  present in the localStorage) show error notification and force re-authentication.

## 2018/07/03 [0.2.0][6]

### Added

* config can now contain the `id` of a board, which allows adding public
  Trello boards as well. Related to breaking change note regarding config.js below.
* <TrelloCardUi /> can display labels (with toggle: show or hide)
* `<ListTabs \/>` added
* list `pattern` can be modified with query parameters. Examples:
  * http://localhost:2222/#/?pattern=#sprint-1,#sprint-2,#sprint-3
  * http://localhost:2222/#/pattern/#sprint-1,#sprint-2,#sprint-3/

### Changed

* **Breaking**: boards config in `config.js` changed:

```js
// previous config

boards: [
  {
    // ...
    board: 'hello-world', // renamed to 'name'
  },
],
```

```js
// new config

boards: [
  {
    // ...
    name: 'hello-world', // new property 'name'
    id: 'board-1', // optional, see README
  },
],
```

* **Breaking**: `config.js` can now contain multiple `lists` patterns, each list
  will be available in the `<ListTabs \/>` component and can later be used to
  select a specific list. All filters work as expected and as before (also with
  deeplinking for the list patterns)

```js
// previous config
boards: [
  {
    // ...
    lists: /#upcoming/,
  },
],
```

```js
// new config
lists: [/#upcoming/],
boards: [
  {
    // does not contain lists anymore
  },
],
```

* _Note_: even though semver would suggest adding releasing a major release, I
  decided to stick to 0.2.y still until further notice.

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
[6]: https://github.com/natterstefan/react-trello-multiboard/compare/v0.1.1...v0.2.0
[7]: https://github.com/natterstefan/react-trello-multiboard/compare/v0.2.0...v0.2.1
