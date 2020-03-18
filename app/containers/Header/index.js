/**********************
Name - Header
Author - Nasir Ansari
Description: This is header component
***********************/

import React from 'react';
import './style.css';
import { Helmet } from 'react-helmet';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBFormInline,
} from "mdbreact";
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  signOut = () => {
    localStorage.removeItem('currUser');
    localStorage.removeItem('token');
    window.location.reload('/login')
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Header</title>
          <meta name="description" content="Description of Header" />
        </Helmet>

        <MDBNavbar className='navbar-custom1' dark expand="lg">
          <MDBNavbarBrand>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              <MDBNavItem className='navItem-custom1' active>
                <Link className='a-custom1' to="/">Home</Link>
              </MDBNavItem>
              <MDBNavItem className='navItem-custom1'>
                <Link className='a-custom1' to="/my-watch-list"> My Watch List </Link>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBFormInline waves>
                </MDBFormInline>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
          <div onClick={(e) => { this.signOut() }} className="md-form my-0 " style={{ cursor: 'pointer', marginRight: '10px' }}>
            Logout <i title='Logout' className='fas fa-sign-out-alt' />
          </div>
        </MDBNavbar>
      </div>
    );
  }
}

export default Header;



