/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Link, Grid, Box, Typography, Container, TextField, CssBaseline, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    // id:"",
      username: "",
      password:"",

    });

    const [error, setError] = useState("") 


    const handleChage = ({ currentTarget: input }) => {
      setData({ ...data, [input.name]: input.value });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const url ="Http://localhost:8000/api/auth/login"; 
        const response = await axios.post(url, data);
        const user = jwt_decode(response.data.token);
        console.log(user);
        document.cookie = "token=" + JSON.stringify(response.data.token)
        if(user.id === id){
          console.log("giii");
        }

        if(response.status===201){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Welcom Again!',
          })
        }

        } catch (error) {
        if (error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500 
        ){
          SetError(error.response)

        }
      }
    }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 4,
            padding: 3,
            height: '75vh',
            width: '60vh'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="First Name"
                  autoFocus
                  onChange={handleChage}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChage}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}