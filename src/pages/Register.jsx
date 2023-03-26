import { useEffect, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  CssBaseline,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Copyright from '../components/common/Copyright';
import api from '../api/';
import { useAuth } from '../contexts/AuthContext';
import { AUTH_REDUCER_LOGIN } from '../utils/constants.utils';

const formValidationSchema = Yup.object({
  name: Yup.string().required('Nombre de usuario es requerido'),
  username: Yup.string().min(4).required('Nombre es requerido').test('Unique Username', 'Username already in use',
    (value) => {
      return new Promise((resolve, reject) => {
        api.get(`check_valid_username/${value}`)
          .then(({ data }) => {
            resolve(data.isValid);
          })
          .catch(() => resolve(false));
      });
    }
  ),
  password: Yup.string().min(6).max(16).required('Contraseña requerida'),
  roleId: Yup.number().required('Tipo de usuario requerido')
});

export default function SignUp () {
  const authState = useAuth();
  const navigator = useNavigate();
  const [roles, setRoles] = useState([]);
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      password: '',
      roleId: 1
    },
    validationSchema: formValidationSchema,
    onSubmit: async (values) => {
      const { data: { token, userData } } = await api.post('/auth/register', values);
      authState.dispatch({
        type: AUTH_REDUCER_LOGIN,
        payload: {
          token,
          userData
        }
      });
      navigator('/');
    }
  });

  useEffect(() => {
    api.get('/roles').then(({ data: { roles } }) => setRoles(roles));
  }, []);

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Regístrate
        </Typography>
        <Box sx={{ mt: 3 }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='given-name'
                  name='name'
                  fullWidth
                  label='Nombre'
                  autoFocus
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Username'
                  name='username'
                  autoComplete='family-name'
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={formik.touched.roleId && Boolean(formik.errors.roleId)}
                >
                  {roles.length > 0 && (
                    <Select
                      name='roleId'
                      label='dsa'
                      onChange={formik.handleChange}
                      value={formik.values.roleId}
                    >
                      {roles.map((rol) => (
                        <MenuItem key={`rol-${rol.id}`} value={rol.id}>
                          {rol.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </form>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <RouterLink to='/login' variant='body2'>
                Already have an account? Sign in
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
