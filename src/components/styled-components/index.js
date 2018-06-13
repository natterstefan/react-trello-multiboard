import styled from 'styled-components'

export const BlockContainer = styled.div`
  display: block;
  padding: 5px 0;
`

// Trello like scrolling
// - https://codeburst.io/how-to-create-horizontal-scrolling-containers-d8069651e9c6
// - https://codepen.io/SitePoint/pen/brmXRX
export const ScrollContainer = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: nowrap;
  max-width: 100vw;
  min-width: 0;
  overflow-x: auto;
  padding: 5px 0;

  &:after {
    content: '';
    flex: 0 0 40px;
  }
`
