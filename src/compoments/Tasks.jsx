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
    Container
  } from '@mui/material';
  import { Link } from 'react-router-dom';
  import AddIcon from '@mui/icons-material/Add';
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
                                {/* <TableCell align="right">{task.status}</TableCell> */}
                                <TableCell align="right">
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
