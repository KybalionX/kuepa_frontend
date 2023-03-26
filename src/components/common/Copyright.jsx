import { Typography, Link } from '@mui/material';

export default () => (
  <Typography
    variant='body2'
    color='text.secondary'
    align='center'
    sx={{ mt: 5 }}
  >
    {'Made with ❤ by '}
    <img src='/kuepa_logo.png' width={80} alt='kuepa_logo' />
    {' and '}
    <Link
      color='inherit'
      href='https://github.com/KybalionX'
      target='_blank'
      rel='noreferrer'
    >
      Nicolás Flórez
    </Link>
  </Typography>
);
