import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Typography, Grid, Button, Link } from '@mui/material';
import CarRentalIcon from '@mui/icons-material/CarRental';
import { Cookies } from "react-cookie";
import jwt_decode from "jwt-decode";



function NavBar() {
  
  const navigate = useNavigate();
  const cookies = new Cookies();
  // const [token, setToken] = useState(jwt_decode(cookies.get("token")) || {});
  // jwt_decode(cookies.get("token") || {}) 
  const token = cookies.get("token");

  if(token){
    const auth = jwt_decode(token)
    return ( 
      <Container sx={{ marginTop: 3, boxShadow: 1 }} position="sticky" maxWidth="l">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>
              <CarRentalIcon
                sx={{ fontSize: 50, color:"#5000D4" }}
              />
            </Typography>
          </Grid>
          <Grid container spacing={2} item xs={6}>
         { auth.role === "Admin" ? <Grid item xs={2}><Button><Link underline="none" href="/dashboard" ><Typography>dashboard</Typography></Link></Button></Grid>
         :<Grid item xs={2}><Button><Link underline="none" href="/booking"><Typography>bookings</Typography></Link></Button></Grid> }
            <Grid item xs={2}><Button><Link underline="none" href="#home"><Typography>home</Typography></Link></Button></Grid>
            <Grid item xs={2}><Button><Link underline="none" href="#about"><Typography>about</Typography></Link></Button></Grid>
            <Grid item xs={2}><Button><Link underline="none" href="#services"><Typography>services</Typography></Link></Button></Grid>
            <Grid item xs={2}><Button><Link underline="none" href="#cars"><Typography>cars</Typography></Link></Button></Grid>
            {/* {!auth &&<Grid item xs={2}><Button variant="outlined"><Link underline="none" href="/register"><Typography sx={{color: 'red'}}>Register</Typography></Link></Button></Grid>} */}
          </Grid>
        </Grid>
      
      </Container>
     );
  }if(!token){
    return ( 
      <Container sx={{ marginTop: 3, boxShadow: 1 }} position="sticky" maxWidth="l">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>
              <CarRentalIcon
                sx={{ fontSize: 50, color:"#5000D4" }}
              />
            </Typography>
          </Grid>
          <Grid container spacing={2} item xs={6}>
         {/* { token.role === "Admin" ? <Grid item xs={2}><Button><Link underline="none" href="/dashboard" ><Typography>dashboard</Typography></Link></Button></Grid>
        :<Grid item xs={2}><Button><Link underline="none" href="/booking"><Typography>bookings</Typography></Link></Button></Grid>} */}
            <Grid item xs={2}><Button><Link underline="none" href="#home"><Typography>home</Typography></Link></Button></Grid>
            <Grid item xs={2}><Button><Link underline="none" href="#about"><Typography>about</Typography></Link></Button></Grid>
            <Grid item xs={2}><Button><Link underline="none" href="#services"><Typography>services</Typography></Link></Button></Grid>
            <Grid item xs={2}><Button><Link underline="none" href="#cars"><Typography>cars</Typography></Link></Button></Grid>
            <Grid item xs={2}><Button variant="outlined"><Link underline="none" href="/register"><Typography sx={{color: 'red'}}>Register</Typography></Link></Button></Grid>
          </Grid>
        </Grid>
  
      </Container>
     );
  }
  
}

export default NavBar;