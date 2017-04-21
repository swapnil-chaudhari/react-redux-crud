import React, { Component } from 'react';
import SideBar from './SideBar'
import Logo from './Logo'
import RightNavigation from './RightNavigation'

class Header extends Component {

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                  <Logo />

                  <RightNavigation />

                  <SideBar />
              </nav>
    );
  }
}

export default Header;
