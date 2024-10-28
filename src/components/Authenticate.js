import { useStepContext } from '@mui/material'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import useStateContext from '../hooks/useStateContent';

export default function Authenticate() {
const {context} = useStateContext();

  return (
    context.participantId === 0 
    ? <Navigate to = '/'/> 
    : <Outlet/>
  )
}
