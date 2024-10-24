import React from 'react'
import { useContext } from 'react'
import useStateContext, { stateContext } from '../hooks/useStateContent'

export default function Quiz() {

    const {context, setContext} = useStateContext();

    console.log(context);
  return (
    <div>Quiz</div>
  )
}
