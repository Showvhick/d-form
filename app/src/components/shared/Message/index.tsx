import React, { ReactElement } from 'react'

interface IProps {
    children:ReactElement | string
}


export default function index(props:IProps) {
  return (
    <div
        style={{width:"100%", height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}
    >
        {props.children}
    </div>
  )
}
