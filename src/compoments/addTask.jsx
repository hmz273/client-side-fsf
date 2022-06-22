/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { Button, Container, TextField, Box, Grid } from '@mui/material'
import axios from 'axios';



export default function NewTask() {
  const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [dueDate, setDueDate] = useState('');
    

    const postData = () => {
        axios.post(`Http://localhost:8000/api/tasks/new`, { withCredentials: true } , {
            name,
            description,
            type,
            dueDate
        }).then(() => {
          navigate("/tasks");
        })
    }


    return (
        <Container multi>
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                name="name"
                label="Title"
                fullWidth
                onChange={(e) => setName(e.target.value)}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="type"
                label="type"
                fullWidth
                onChange={(e) => setType(e.target.value)}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
            <label>Date</label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              dateFormat='dd/MM/yyyy'
              minDate={new Date()}
              label="Check-in"
              name="dueDate"
               />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="description"
                label="Description"
                fullWidth
                multiline
                maxRows={4}
                onChange={(e) => setDescription(e.target.value)}
                variant="standard"
              />
            </Grid>
          </Grid>
          <Button onClick={postData} type='submit'>Add</Button>
          </Box>
        </Container>
      );
}
