/* eslint-disable no-undef */
import axios from 'axios';
import NavBar from './NavBar';
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    Paper,
    TableContainer,
    Container,
    Button
  } from '@mui/material';
  import { Link } from 'react-router-dom';
  import Swal from 'sweetalert2'
  import AddIcon from '@mui/icons-material/Add';
  import EditIcon from '@mui/icons-material/Edit';
  import DoneAllIcon from '@mui/icons-material/DoneAll';
  import WorkIcon from '@mui/icons-material/Work';
  import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
  


export default function ReadCommand() {
    const [tasks, setAPIData] = useState([]);
    useEffect(() => {
        axios.get(`Http://localhost:8000/api/tasks`, {withCredentials: true})
            .then((response) => {
                setAPIData(response.data.data);
            })
    }, []);


    const getData = () => {
        axios.get(`Http://localhost:8000/api/tasks`, {withCredentials: true})
            .then((response) => {
                setAPIData(response.data.data);
            })
    }

    const onDelete = (_id) => {
        axios.delete(`Http://localhost:8000/api/tasks/${_id}`, {withCredentials: true})
        .then(() => {
            getData();
        })
    }


    const DoneTask = async(id) => {  
        try {
          // make axios post request 
          const response = await axios({
            method: "PUT",
            url: `Http://localhost:8000/api/tasks/done/${id}`,
            withCredentials: true,
            data: tasks,
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then(() => {
            getData();
            })
            if(response.status===200){
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                d_idOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'successfully'
              })
            }
        } catch(error) {
          console.log(error)
        }
      }
  
      const WorkinginTask = async(id) => {
        console.log(id)
        try {
          // make axios post request 
          const response = await axios({
            method: "PUT",
            url: `Http://localhost:8000/api/tasks/encour/${id}`,
            withCredentials: true,
            data: tasks,
            headers: { "Content-Type": "multipart/form-data" },
          }).then(() => {
            getData();
          })
          if(response.status===200){
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
              icon: 'warning',
              title: 'Work Hard Boss'
            })
          }
        } catch(error) {
          console.log(error)
        }
      }



    return (
        <>
        <NavBar />
        <Container sx={{ marginTop: 3 }} maxWidth="lg">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <Link to='/new'>
                            <AddIcon />
                        </Link>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">description</TableCell>
                            <TableCell align="right">type</TableCell>
                            <TableCell align="right">dueDate</TableCell>
                            <TableCell align="right">label</TableCell>
                            <TableCell align="right">ChangeLabel</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow
                                key={task._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {task._id}
                                </TableCell>
                                <TableCell align="right">{task.name}</TableCell>
                                <TableCell align="right">{task.description}</TableCell>
                                <TableCell align="right">{task.type}</TableCell>
                                <TableCell align="right">{task.dueDate}</TableCell>
                                <TableCell align="right">{task.label}</TableCell>
                                <TableCell align="right">
                                    <DoneAllIcon variant="outlined" color="success" size="small" sx={{ borderRadius: '16px', marginRight:2 }} onClick={() => DoneTask(task._id)}></DoneAllIcon>
                                    <WorkIcon variant="outlined" color="primary" size="small" sx={{ borderRadius: '16px' }} onClick={() => WorkinginTask(task._id)}></WorkIcon>
                                </TableCell>
                                <TableCell align="right">
                                    {task.label == 'done'? <Button variant="outlined" size="small" color = "success" sx={{ borderRadius: '16px'}}>Complete</Button> : <Button variant="outlined" color= "error" size="small" sx={{ borderRadius: '16px'}}>Incomplete</Button>}
                                </TableCell>
                                <TableCell align="right">
                                    <Link to={`/update/${task._id}`}>
                                    <TableCell> 
                                        <EditIcon />
                                    </TableCell>
                                    </Link>
                                    <DeleteOutlineIcon color="error" onClick={() => onDelete(task._id)}>Delete</DeleteOutlineIcon>
                                    {/* <editHotel /> */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* </Box> */}
        </Container></>
      );
}
