import React from 'react';
import { withRouter } from 'react-router';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import styled from 'styled-components';

const Title = styled(({ ...other }) => <Typography {...other} />)`
  cursor: pointer;
  flex-grow: 1;
`;

function Nav({ history }) {
  function moveToHomescreen() {
    history.push('/');
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Title variant="h6" onClick={moveToHomescreen}>
          Patient Card
        </Title>
        <Button color="inherit" onClick={moveToHomescreen}>
          Patient list
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Nav);
