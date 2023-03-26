import React, { useRef, useEffect } from 'react';
import { List, ListItem, ListItemText, Grid, Divider } from '@material-ui/core';
import { Box, Chip } from '@mui/material';

export default ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      <List style={{ bottom: 0 }}>
        {messages.map((message, i) => (
          <React.Fragment key={i}>
            <ListItem>
              <Grid container ref={messagesEndRef}>
                <Grid item xs={12}>
                  <ListItemText align='right' primary={message.message} />
                </Grid>
                <Grid spacing={1} container justifyContent='flex-end' alignItems='center'>
                  {message.roleId === 2 && (
                    <Grid item>
                      <Chip label={message.role.label} />
                    </Grid>
                  )}
                  <Grid item>
                    <ListItemText
                      align='right'
                      secondary={message.username}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};
