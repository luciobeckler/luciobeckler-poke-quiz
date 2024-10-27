import React, { useEffect, useState } from 'react'
import { createAPIEndpoint, END_POINTS } from '../api'
import useStateContext from '../hooks/useStateContent';
import { Alert, Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { formatTimer } from '../helper';
import { useNavigate } from 'react-router-dom';

export default function Result() {
  const {context, setContext, resetContext} = useStateContext()
  const [score, setScore] = useState(0)
  const [qnAnswers, setQnAnswers] = useState([])
  const[showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()
  
  let answers;  

  useEffect(() => {
    const ids = context.selectedOptions.map(x => x.qstId);
    createAPIEndpoint(END_POINTS.getAnswers)
    .post(ids)
    .then(res => {
      const qna = context.selectedOptions
      .map(x => ({
        ...x,
        ...(res.data.find(y => y.id == x.qstId))
      }))

      setQnAnswers(qna);
      calculateScore(qna);
    })
    .catch(err => console.log(err));
  }, [])

  const calculateScore = qna =>{
    let tempScore = qna.reduce((acc, curr) => {
      return curr.answer == curr.selected ? acc + 1 : acc;
    }, 0)

    setScore(tempScore)
  }

  const restart = () =>{
    setContext({
      timeTaken: 0,
      selectedOptions: []
    })
    
    navigate('/quiz')
  }

  const submit = () =>{
    createAPIEndpoint(END_POINTS.participant)
    .put(context.participantId, {
      participantId: context.participantId,
      score: score,
      timeTaken: context.timeTaken
    })
    .then(res => {
      console.log(res.data)
      setShowAlert(true)
      setTimeout(()=>{
        setShowAlert(false)
      }, 4000) 

    })
    .catch(err => console.log(err))
  }

  return (
    <Card sx={{mt: 5, display:'flex', width: '100%', maxWidth:640, mx: 'auto'}}>
      <Box sx={{display:'flex', flexDirection: 'column', flexGrow: 1}}>
        <CardContent sx={{flex: '1 0 auto', textAlign: 'center'}}>
          <Typography variant='h4'>Congratulations!</Typography>
          <Typography variant='h6'>YOUR SCORE</Typography>
          <Typography variant='h5' sx={{fontWeight: 600}}>
            <Typography variant='span'>
              {score}
            </Typography>/5
          </Typography>
          <Typography variant = 'h6'>
            Took {formatTimer(context.timeTaken) + ' mins'}
          </Typography>
          <Button variant='contained'
            sx={{mx: 1}}
            size='small'
            onClick={submit}
          >
            Submit
          </Button>
          <Button variant='contained'
            sx={{mx: 1}}
            size='small'
            onClick={restart}
          >
            Re-try
          </Button>
          <Alert
            severity='success'
            variant='string'
            sx={{
              width:'60',
              m:'auto',
              visibility : showAlert ? 'visible' : 'hidden'
            }}>
              Score Updated.
            </Alert>
        </CardContent>
      </Box>
      <CardMedia 
      component='img'
      sx={{width:220}}
      image='./result.png'
      />
    </Card>
  )
}
