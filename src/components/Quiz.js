import React, { useEffect, useState } from 'react'
import { creatAPIEndpoint, END_POINTS } from '../api'
import { Box, Card, CardContent, CardHeader, LinearProgress, List, ListItemButton, Typography } from '@mui/material'
import { formatTimer } from '../helper'
import useStateContext from '../hooks/useStateContent'

export default function Quiz() {
  //debugger
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
    creatAPIEndpoint(END_POINTS.question)
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
    //navigate to result
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
      <CardContent>
        <Typography variant='h6'>
          {qst[indexQst].tittle}
          <List>
            {qst[indexQst].options.map((optionTittle, indexOption) => 
              <ListItemButton key={indexOption} onClick={() => updateAnswer(qst[indexQst].Id, indexOption)}>
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
