import React, { useState } from 'react'
import { NavigationMain } from './NavigationMain'
import { Logo } from './Logo'
import { MenuButton } from './MenuButton'
import '../css/header.css'

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
