import { Icon, Box } from '@material-ui/core';
import PersonIcon from '@mui/icons-material/Person';

export default ({ user }) => {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' xs={12}>
      <Icon>
        <PersonIcon />
      </Icon>
      <p>{user.username}</p>
    </Box>
  );
};
