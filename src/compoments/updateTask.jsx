/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { Button, Container, TextField, Box, Grid } from '@mui/material'
import axios from 'axios';




export default function UpdateTask() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [task, setAPIData] = useState([]);


    useEffect(() => {
      axios.get(`Http://localhost:8000/api/tasks/${id}`)
          .then((response) => {
              console.log(response.data.data);
              setAPIData(response.data.data);
              
          })
  }, []);


  

  const postData = () => {
    axios.put(`Http://localhost:8000/api/tasks/${id}`, {
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
            focused
            placeholder={task.name}
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
            focused
            placeholder={task.type}
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
          focused
          placeholder={task.dueDate}
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
            focused
            placeholder={task.description}
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
