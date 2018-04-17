import styled from 'styled-components'

// should only be used in the main-app component and on pages
export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const BlockContainer = styled.div`
  display: block;
  padding: 10px 10px;
`

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const Container = styled.div`
  display: flex;
  flex: 1;
  overflow-x: auto;
  padding: 10px 10px;
`

export const ListContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: auto;
  padding: 10px 10px;
  @media (max-width: 768px) {
    margin: 0 -10px;
  }
`
