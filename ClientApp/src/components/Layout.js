import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import CookieConsent from 'react-cookie-consent';
import { translate } from 'react-multi-lang';

class Layout extends React.Component {
  render() {
    const {t} = this.props;
    return (
      <div>
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
        <CookieConsent>
          {t("cookies.text")}
        </CookieConsent>
      </div>
    )
  }
}
export default translate(Layout);