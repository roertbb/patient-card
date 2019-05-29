import React from 'react';
import { CssBaseline, Container, Box } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PatientList from './pages/PatientList';
import { StylesProvider } from '@material-ui/styles';
import Nav from './components/Nav';
import { observer } from 'mobx-react-lite';

function App() {
  return (
    <>
      <StylesProvider injectFirst>
        <CssBaseline />
        <BrowserRouter>
          <Nav />
          <Box pt={1} clone>
            <Container maxWidth="md">
              <Switch>
                <Route exact path="/" component={PatientList} />
                <Route component={PatientList} />
              </Switch>
            </Container>
          </Box>
        </BrowserRouter>
      </StylesProvider>
    </>
  );
}

export default observer(App);
