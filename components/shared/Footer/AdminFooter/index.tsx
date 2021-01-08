import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
// import styles from '../../../../styles/AdminFooter.module.css'
import Logo from '../../Logo'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFacebookF, faInstagram, faYoutube, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
// import Image from 'next/image'

const AdminFooter: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Logo />
        </Col>
        <Col>
          <span className="float-right">
            soomifortaleza.com.br • danielfvdev@gmai.com
          </span>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminFooter