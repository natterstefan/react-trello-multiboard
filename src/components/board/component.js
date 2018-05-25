import React from 'react'
import { invoke, map } from 'lodash'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'
import styled from 'styled-components'

import proptypes from './prop-types'
import TrelloCardsList from '../trello-cards-list'

// Styled Components
const ThinContainer = styled.div`
  padding: 5px 0;
  min-width: 200px;
`

class Board extends React.Component {
  componentDidMount() {
    invoke(this.props, 'loadLists')
  }

  renderList() {
    const { lists } = this.props

    if (lists.length === 0) {
      return <Typography>No matching list(s) found</Typography>
    }
    return map(lists, (list, idx) => (
      <TrelloCardsList key={idx} list={list.list} config={list.config} />
    ))
  }

  render() {
    const { error, isLoading } = this.props

    if (error) {
      return <span />
    }
    if (isLoading) {
      return <LinearProgress />
    }

    return <ThinContainer>{this.renderList()}</ThinContainer>
  }
}

Board.propTypes = proptypes
export default Board
