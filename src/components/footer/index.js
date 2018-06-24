import React from 'react'
import Typography from '@material-ui/core/Typography'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import { GITHUB_URL } from '../../constants'

export const FooterContainer = styled.footer`
  background-color: #3f51b5;
  bottom: 20px;
  color: #fff;
  left: 0;
  margin: 55px 0 -25px;
  padding: 10px;
  position: absolute;
  right: 0;
  text-align: center;
  width: 100vw;
`

const Footer = () => (
  <FooterContainer>
    <Typography color="inherit" style={{ paddingBottom: 5 }}>
      <a href={GITHUB_URL} style={{ color: '#fff', textDecoration: 'none' }}>
        <FontAwesomeIcon icon={['fab', 'github']} size="lg" /> Star on GitHub
      </a>
    </Typography>
    <Typography color="inherit">
      We are not affiliated, associated, authorized, endorsed by or in any way officially connected
      to Trello®, Inc. (www.trello.com).
    </Typography>
  </FooterContainer>
)
Footer.displayName = 'Footer'

export default Footer
