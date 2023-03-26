import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Avatar,
  Button,
  Grid,
  Box,
  Typography,
  TextField,
  CssBaseline,
  Paper
} from '@mui/material';
import Copyright from '../components/common/Copyright';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import api from '../api';
import { AUTH_REDUCER_LOGIN } from '../utils/constants.utils';

const formValidationSchema = Yup.object({
  username: Yup.string().required('Nombre de usuario es requerido'),
  password: Yup.string().required('Contraseña requerida')
});

export default function SignInSide () {
  const authState = useAuth();
  const navigator = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: formValidationSchema,
    onSubmit: async (values) => {
      try {
        const { data: { token, userData } } = await api.post('auth/login', values);
        authState.dispatch({
          type: AUTH_REDUCER_LOGIN,
          payload: {
            token,
            userData
          }
        });
        navigator('/');
      } catch (error) {
        console.log(error);
      }
    }
  });

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            'url(https://universidadesdemexico.mx/img/article/estudiar-en-la-universidad-kuepa)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                margin='normal'
                fullWidth
                id='username'
                label='username'
                name='username'
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                margin='normal'
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </form>
            <Grid container>
              <Grid item>
                <RouterLink to='/register' variant='body2'>
                  Don't have an account? Sign Up
                </RouterLink>
              </Grid>
            </Grid>
            <Copyright />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
