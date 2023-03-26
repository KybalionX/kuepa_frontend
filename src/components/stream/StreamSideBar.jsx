import React, { useEffect, useState } from 'react';
import ClassChat from './ClassChat';
import UsersList from '../user/UsersList';
import { Grid, Box, Button } from '@mui/material';
import { TextField } from '@material-ui/core';
import { io } from 'socket.io-client';
import { Send as SendIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserCard from '../user/UserCard';
import { AUTH_REDUCER_LOGOUT } from '../../utils/constants.utils';

export default () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [connectedUsers, setConnectedUsers] = useState(0);
  const auth = useAuth();
  const navigator = useNavigate();
  const socket = React.useMemo(() => io(import.meta.env.VITE_WS_URL), []);

  useEffect(() => {
    // Carga de los mensajes al entrar a la conversación
    socket.on('initialMessages', (data) => setMessages(data));

    // Se obtiene un nuevo mensaje
    socket.on('messageResponse', (data) => setMessages((mess) => [...mess, data]));

    // Un usuario ha entrado ó ha salido de la sala
    socket.on('usersUpdate', (data) => setConnectedUsers(data.length));
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;
    socket.emit('message', {
      message: inputMessage,
      token: auth.state.token
    });
    setInputMessage('');
  };

  const logout = () => {
    auth.dispatch({
      type: AUTH_REDUCER_LOGOUT
    });
    navigator('/login');
  };

  return (
    <>
      <Grid item sx={{ height: '10%' }}>
        <Grid container>
          <Grid item xs={6}>
            <UsersList connectedUsers={connectedUsers} />
          </Grid>
          <Grid item xs={6}>
            <UserCard user={auth.state.userData} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs sx={{ height: '80%' }}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <ClassChat messages={messages} />
        </Box>
      </Grid>
      <Grid container sx={{ height: '10%' }} alignItems='center'>
        <Grid item xs={2}>
          <Button
            fullWidth
            color='error'
            endIcon={<LogoutIcon />}
            onClick={logout}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            label='Mensaje'
            fullWidth
            variant='outlined'
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            fullWidth
            endIcon={<SendIcon />}
            onClick={sendMessage}
          />
        </Grid>
      </Grid>
    </>
  );
};
