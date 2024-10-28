import { AppBar, Button, CardMedia, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useStateContext from '../hooks/useStateContent';
import { red } from '@mui/material/colors';

export default function Layout() {
    const navigate = useNavigate();
    const {resetContext} = useStateContext();

    const logout = () => {
        resetContext()
        navigate('/')
    }

  return (
    <>
    <AppBar position='sticky'>
        <Toolbar sx={{width: 640, m: 'auto'}}>
            <CardMedia
              component="img"
              sx={{ width: 50 }}  // Diminui o tamanho da imagem, caso necessário
              image="./pokebola.png"
            />
            <Typography 
                variant='h4'
                align='center'
                sx={{flexGrow:1, color: red[900]}}>
                    Poke-Quiz
                    <Typography 
                variant='h4'
                align='center'
                sx={{flexGrow:1, color: 'white'}}>
                    App
            </Typography>
            </Typography>
            

            <Button onClick={logout} color='white'>Logout</Button>
        </Toolbar>
    </AppBar>
    <Container>
        <Outlet />
    </Container>
    </>
  )
}
