import {
  Typography,
  Grid
} from '@material-ui/core';

export default ({ connectedUsers }) => {
  return (
    <Grid item md={12}>
      <Grid item xs={12} style={{ marginLeft: '12px' }}>
        <Typography variant='h6'>Usuarios {connectedUsers}</Typography>
      </Grid>
    </Grid>
  );
};
