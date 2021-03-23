import React from 'react'

export const Switch = ({ on, children, ...rest }) =>
 React.Children.map(children, child => React.cloneElement(child, { on, ...rest }))

Switch.Case = ({ on, match = [], children }) => match.includes(on) ? children : <></>
