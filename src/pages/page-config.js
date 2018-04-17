import React from 'react'
import { omit } from 'lodash'

// Syntax Highlighting
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/styles/hljs'

// Material UI
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

// Config & Components
import proptypes from './page-config.prop-types'
import Config from '../../config'
import AppContainer from '../components/app-menu-container'
import ErrorBoundary from '../components/error-boundary'

// Utils
import { regexStringifier } from '../utils/regex-stringify'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
})

const ConfigPage = props => (
  <ErrorBoundary>
    <AppContainer>
      <Paper className={props.classes.root} elevation={4}>
        <Typography variant="headline" component="h1">
          Current Config
        </Typography>
        <SyntaxHighlighter language="javascript" style={docco}>
          {JSON.stringify(omit(Config, 'api_key'), regexStringifier, 2)}
        </SyntaxHighlighter>
      </Paper>
    </AppContainer>
  </ErrorBoundary>
)

ConfigPage.displayName = 'ConfigPage'
ConfigPage.propTypes = proptypes

export default withStyles(styles)(ConfigPage)
