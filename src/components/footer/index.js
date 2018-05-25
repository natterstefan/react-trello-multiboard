import React from 'react'
import Typography from '@material-ui/core/Typography'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import { GITHUB_URL } from '../../constants'

export const FooterContainer = styled.footer`
  background-color: #3f51b5;
  color: #fff;
  display: flex;
  flex: 1;
  justify-content: center;
  margin-top: 30;
  margin: 55px -30px -24px;
  padding: 10px 0px;
`

const Footer = () => (
  <FooterContainer>
    <Typography color="inherit">
      <a href={GITHUB_URL} style={{ color: '#fff', textDecoration: 'none' }}>
        <FontAwesomeIcon icon={['fab', 'github']} size="lg" /> Star on GitHub
      </a>
    </Typography>
  </FooterContainer>
)
Footer.displayName = 'Footer'

export default Footer
