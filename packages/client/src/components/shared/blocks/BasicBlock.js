import React from 'react'
import { Link } from 'react-router-dom'
import './Block.css'
import './BasicBlock.css'

export const BasicBlock = (props) => (
  <div className={`${props.additionalClasses}`}>
    <div className=" block-basic">
      <div className="wrapper-title">
        <div className="border"></div>
        <h2>{props.title}</h2>
      </div>
      <div className="wrapper-body">
        {props.body}
      </div>
      <div className="wrapper-image">
        {props.image
          ? <img src={props.image} alt="" className="object-fit-cover" />
          : null
        }
      </div>
      <div className="wrapper-secondary">
        {props.secondary}
      </div>
      {props.href
        ? <Link to={`${props.href}`} className="wrapper-link"></Link>
        : null}
    </div>
  </div>
)
