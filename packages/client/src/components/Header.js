import React, { Component } from 'react'
import { NavigationMain } from './NavigationMain'
import { Logo } from './Logo'
import { MenuButton } from './MenuButton'
import '../css/header.css'

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false
    }
  }

  toggleMenu = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen})
  }


  render() {
    return (
        <header id="header-main" className={`container ${this.state.isMenuOpen ? "opacity" : ""}`}>
          <Logo />
          <NavigationMain isMenuOpen={this.state.isMenuOpen} />
          <MenuButton toggleMenu={this.toggleMenu}/>
        </header>
    );
  }
}
