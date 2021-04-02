import React from 'react'
import './Badge.css'

export const Badge = ({
  as = 'span',
  count = 0,
  className = '',
  children
}) => {
  const Component = as
  const _count = Math.max(0, count)
  const classes = `badge ${_count > 0 ? 'badge--visible' : ''} ${className}`

  return (
    <Component className={classes}>
      {children}
      <span className="badge__count">{_count > 99 ? '99+' : _count}</span>
    </Component>
  )
}
