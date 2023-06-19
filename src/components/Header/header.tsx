import { FC } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';


const Header: FC = ()=> {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
       <Link to={'/'} style={{textDecoration: 'none'}}>
       <Typography variant="h6" component="div" sx={{color: 'white'}}>
          Atllas
        </Typography>
       </Link>
       
     <Box sx={{padding:0.5, cursor: 'pointer'}}>
    <Link to={'/jointheteam'} style={{textDecoration: 'none'}}>
     <Typography sx={{color: 'white'}}>
        Join the team!
        </Typography>
        </Link>
     </Box>
      </Toolbar>
    </AppBar>
  </Box>
  );
}

export default Header;