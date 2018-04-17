# Trello Card

## Documentation

- https://developers.trello.com/docs/cards

## Issues

When using the [embed script from Trello](https://p.trellocdn.com/embed.js) the
initial loading works fine, but because the embed.js polls in a certain interval
it does not w/o using the onLoad and onResize option. Because their script checks
if the card is still visible. As one can selected all or preferred members, they
might not. Trello will then set the card's iframe height to 0. Adjusting the iframe's
and its parent's css solves the issue. The cards are instantly available when
changing a filter.

The issue is based on the following feature of the embed.js:

```js
// Trello checks if each element is still visible for the user
var elInViewport = function elInViewport(el) {
  if (!document.body.contains(el)) {
    return false;
  }
  var bounds = el.getBoundingClientRect();

  return bounds.top <= window.innerHeight && bounds.top + bounds.height >= 0 && bounds.left <= window.innerWidth && bounds.left + bounds.width >= 0;
};

// and then later when polling is triggered
togglePolling(card.el, event.origin, event.data.secret, elInViewport(card.el));
```

## Alternative Rendering w/ iframes

One can also create the iframe manually, but resizing (CORS issue) is then still
an issue.

Example Code:

```js
render () {
  const { card } = this.props
  return (
    <iframe src={`https://trello.com/embed/card?id=${card.id}&secret=${card.id}&compact=true`}/>
  )
}
```

## Solutions from Trello

Solution 1:
```jsx
componentDidMount () {
  window.TrelloCards.create(card.id, $('#card_' + card.id)[0], {
    compact: true,
    onLoad: () => {},
    onResize: () => {}
  })
}

render () {
  return <span className='card_123' />
}
```

Solution 2:
```jsx

componentDidMount () {
  window.TrelloCards.load(document, { compact: true, allAnchors: false })
}

render () {
  const { card } = this.props

  return (
    <blockquote className="trello-card-compact">
      <a href={card.shortUrl}>{card.name}</a>
    </blockquote>   
  )
}
```
