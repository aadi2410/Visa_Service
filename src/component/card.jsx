import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Header_img from '../assets/header_img.png';

export default function Blogcard() {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            A
          </Avatar>
        }
        title="Visa-Free Destinations"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={Header_img}
        alt="Paella dish"
      />
      <CardContent>
        <Typography className='blog-card-heading' variant='h6' style={{lineHeight: 'normal', marginBottom: 10}}>62 Visa-Free Destinations For Indian Passport Holders</Typography>
        <Typography variant="body2" color="text.secondary" className='blog-card-content'>
        Great news for travel enthusiasts! Indian passport holders can now explore a fantastic array of 62 countries without the hassle of obtaining a visa. This exciting development opens up new horizons for globetrotters, allowing them to delve into diverse cultures, breathtaking landscapes, and historical wonders.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
