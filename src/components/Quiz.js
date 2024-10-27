import React, { useEffect, useState } from 'react'
import { BASE_URL, createAPIEndpoint, END_POINTS } from '../api'
import { Box, Card, CardContent, CardHeader, CardMedia, LinearProgress, List, ListItemButton, Typography } from '@mui/material'
import { formatTimer } from '../helper'
import useStateContext from '../hooks/useStateContent'
import { useNavigate } from 'react-router-dom'

export default function Quiz() {
  const navigate = useNavigate()
  const [qst, setQst] = useState([])
  const [indexQst, setIndexQst] = useState(0)
  const [timeTaken, setTimeTaken] = useState(0)
  const {context, setContext} = useStateContext()

  let timer;

  const startTimer = () => {
    timer = setInterval(() => {
      setTimeTaken(prev => prev + 1)
    }, [1000]);
  }

  useEffect(() => {
    setContext({
      timeTaken: 0,
      selectedOptions: []
    })
    
    createAPIEndpoint(END_POINTS.question)
    .get() 
    .then(res => {
      setQst(res.data)
      startTimer()
    })
    .catch(err => console.log(err))

    return () => {clearInterval(timer)}
  },[])

  const updateAnswer = (qstId, optionId) =>{
    const temp = [...context.selectedOptions]
    temp.push({
      qstId,
      selected: optionId
    })
    if(indexQst < 4){
      setContext({selectedOptions: [...temp]})
      setIndexQst(indexQst + 1)
    }  
    else{
      setContext({
        selectedOptions: [...temp],
        timeTaken
      })
      navigate("/result")
    }
  }

  return (
    qst.length !== 0 ?
    <Card
      sx={{maxWidth:640, mx: 'auto', mt: 5,
        '& .MuiCardHeader-action':{m:0, alignSelf: 'center'}}}>
      <CardHeader 
        title = {"Question " + (indexQst + 1) + " of " + qst.length}
        action = {<Typography>{ formatTimer(timeTaken) }</Typography>}
        />
      <Box>
        <LinearProgress variant='determinate' value={(indexQst + 1)*100 / 5} />
      </Box>
      {qst[indexQst].imageName != null ?
        <CardMedia 
          component="img"
          image= {BASE_URL + 'images/' + qst[indexQst].imageName}
          sx={{width:'auto', m: '10px auto'}}
        /> : null
      }
      <CardContent>
        <Typography variant='h6'>
          {qst[indexQst].tittle}
          <List>
            {qst[indexQst].options.map((optionTittle, indexOption) => 
              <ListItemButton key={indexOption} onClick={() => updateAnswer(qst[indexQst].id, indexOption)}>
                <div>
                  <b>{String.fromCharCode(65 + indexOption) + " . "}</b> {optionTittle}
                </div>
              </ListItemButton>
            )} 
          </List>
        </Typography>
      </CardContent>
    </Card> 
    : null
  )
}
