import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Center from "./Center";
import useForm from "../hooks/useForm";
import { createAPIEndpoint, END_POINTS } from "../api";
import useStateContext from "../hooks/useStateContent";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";

export default function Login() {

  const {context, setContext, resetContext} = useStateContext();
  const navigate = useNavigate();

  const getFreshModelObject = () => ({
    name: "",
    email: "",
  })
  
  const {
    values, 
    setValues, 
    errors, 
    setErrors, 
    handleInputChange
  } = useForm(getFreshModelObject);

  useEffect(() => {
    resetContext()
  }, [])
  

  const login = (e) => {
    e.preventDefault();
    
    if(validate())
      createAPIEndpoint(END_POINTS.participant)
      .post(values)
      .then(res=> {
        setContext({participantId: res.data.id})
        navigate("/quiz");
      })
      .catch(error => console.log(error));
  }

  const validate = () => {
    let temp = {};
    // Regulars expressions to validade email and name
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ ]{2,50}$/;

    temp.email = EMAIL_REGEX.test(values.email) ? "" : "E-mail is not valid";
    temp.name = NAME_REGEX.test(values.name) ? "" : "Name is not valid";
    setErrors(temp);

    const isValid = Object.values(temp).every((x) => x === "");
    return isValid;
  }

  return (
    <Center>
      <Card sx={{ width: 400 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
            <CardMedia
              component="img"
              sx={{ width: 100 }}  // Diminui o tamanho da imagem, caso necessário
              image="./pokebola.png"
            />
            <Typography variant="h3" sx={{ marginY: 3, color:red[900]}}>
              Poke-Quiz
              <Typography variant="h3" sx={{ marginY: 3, color: 'white'}}>
              App
            </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              "& .MuiTextField-root": {
                margin: 1,
                width: "90%",
              },
            }}
          >
            <form noValidate onSubmit={login}>
              <TextField
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.email && { error: true, helperText: errors.email })}
              />
              <TextField
                label="Name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.name && { error: true, helperText: errors.name })}
              />
              <Button type="submit" size="large" variant="contained" sx={{ width: "90%" }}>
                Start
              </Button>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Center>
  );  
}
