import React from 'react';
import { withRouter } from 'react-router';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import styled from 'styled-components';

const Title = styled(Typography)`
  cursor: pointer;
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
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Nav);
