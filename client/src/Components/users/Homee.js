import React, { useEffect, useRef, useState } from 'react'


function Homee() {

    const[add,setAdd]=useState('')
    const array=[1,2,3,4,5]

    const ref=useRef()

    useEffect(()=>{
        console.log('object')
    })

    const handleAdd=()=>{
        setAdd(add+1)
    }
  return (
    <div>
        <input type='text' ref={Sample}></input>
        <button ></button>
        <Sample data={'shinadh'}/>

    </div>
   
  )
}

export default Homee

  function Sample(props){
    return(
        props.data
    )
  }