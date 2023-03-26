import * as React from 'react';
import { CssBaseline, Grid } from '@mui/material';
import StreamFrame from '../components/stream/StreamFrame';
import StreamSideBar from '../components/stream/StreamSideBar';

export default function Streaming () {
  return (
    <Grid container sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={12} md={8} container>
        <StreamFrame url='https://www.youtube.com/embed/4TqDg44siUk' />
      </Grid>
      <Grid item xs={12} md={4} sx={{ height: '100vh' }}>
        <StreamSideBar />
      </Grid>
    </Grid>
  );
}
