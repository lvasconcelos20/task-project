
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";

interface PokemonCardProps {
  image: string;
  name: string;
  types: string;
}


export default function PokemonCard({image, name, types}: PokemonCardProps) {

    const typeHandler = () => {
      if(types[1]){
        return types[0].type.name + " | " + types[1].type.name;
      }
      return types[0].type.name
    }
    return (
      <Card
  sx={{
    width: {
      xs: 200,  
      sm: 200,  
      md: 230, 
      lg: 210,
      xl: 250, 
    },
    height: {
      xs: 280,
      sm: 260,
      md: 300,
      lg: 270,
      xl: 300,
    },
    background: '#B1D5FF',
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: '2px solid #659AD6',
    transition: '0.3s',
    "&:hover": {
      boxShadow: '0 0 10px rgba(255, 255, 255, 0.4)',
    },
  }}
  
  
>
      <CardMedia
        component="img"
        image={image}
        alt="pokemon"
        sx={{ height: 260, width: 300, borderBottom: "2px solid #659AD6"} }
      />
      <CardContent sx={{ padding: '12px' }}>
      <Box display="flex" justifyContent={"space-between"} alignItems={"center"}  >
      <Typography
          sx={{
            color: '#004FAA',
            textTransform: 'capitalize',
            fontWeight: 600,
            fontSize: { lg: 18, md: 20, xs: 16 },
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          }}
        >
          {name}
        </Typography>
      
        <Typography
            variant="caption"
            sx={{
              color: '#004FAA',
              textTransform: 'capitalize',
              fontSize: { xs: 12, md: 14 },
              textAlign: 'right'
            }}
        >
          {typeHandler()}
        </Typography>
        </Box>
      </CardContent>
    </Card>
      );
}

