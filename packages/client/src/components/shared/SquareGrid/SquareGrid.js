import React from 'react'
import './SquareGrid.css'

export const SquareGrid = ({
  as = 'div',
  className = '',
  ...props
}) => {
  const Component = as
  const classes = `grid-square ${className}`
  return <Component {...props} className={classes} />
}
