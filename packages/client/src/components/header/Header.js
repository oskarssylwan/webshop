import React, { useState } from 'react'
import { NavigationMain } from 'components/navigation'
import { Logo } from 'components/logo'
import { MenuButton } from 'components/menuButton'
import './Header.css'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header id="header-main" className={`container ${isMenuOpen ? 'opacity' : ''}`}>
      <Logo />
      <NavigationMain isMenuOpen={isMenuOpen} />
      <MenuButton toggleMenu={() => setIsMenuOpen(!isMenuOpen)}/>
    </header>
  )
}
