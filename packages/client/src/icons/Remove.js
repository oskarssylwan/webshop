import React from 'react';

export default (props) => {
return (
	<svg onClick={props.onClick} name={props.name} className={props.classes} viewBox="0 0 64 64"><g fill={props.color}><path d="m46.6 30.1h-28.3c-1.1 0-2 0.9-2 2s0.9 2 2 2h28.3c1.1 0 2-0.9 2-2s-0.9-2-2-2z"/><path d="M32 0C14.4 0 0 14.4 0 32s14.4 32 32 32 32-14.4 32-32S49.6 0 32 0zM32 60C16.6 60 4 47.4 4 32S16.6 4 32 4s28 12.6 28 28S47.4 60 32 60z"/></g></svg>
)}
