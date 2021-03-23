import React from 'react'
import { Navigation } from './Navigation'
import '../css/navigation.css'

export const NavigationMain = (props) => {
  const isOpen = props.isMenuOpen ? 'navigation-primary-open' : ''
  const classes = `navigation-primary ${isOpen}`
  return <Navigation classes={classes} />
}
