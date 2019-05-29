import React, { useState, useContext } from 'react';
import {
  Typography,
  Box,
  Paper,
  InputBase,
  IconButton,
  CircularProgress
} from '@material-ui/core';
import ItemList from '../components/List';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../store/RootStore';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from '../components/Pagination';

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledPaper = styled(Paper)`
  width: 300px;
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const CircularContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function PatientList(props) {
  const [localQuery, setLocalQuery] = useState('');

  const {
    patientStore: { loading, patients, page, numOfPages, setPage, setQuery }
  } = useContext(RootStoreContext);

  function handleQueryChange(event) {
    setLocalQuery(event.target.value);
  }

  function handleSearchPatient(event) {
    event.preventDefault();
    setQuery(localQuery);
  }

  return (
    <>
      <StyledBox m={2}>
        <Typography variant="h5">Patient List</Typography>
        <form onSubmit={handleSearchPatient}>
          <StyledPaper>
            <InputBase
              fullWidth
              placeholder="Search Patient"
              value={localQuery}
              onChange={handleQueryChange}
            />
            <IconButton type="submit" aria-label="Search">
              <SearchIcon />
            </IconButton>
          </StyledPaper>
        </form>
      </StyledBox>

      {loading ? (
        <>
          {patients.length ? (
            <ItemList items={patients} loading />
          ) : (
            <CircularContainer>
              <CircularProgress />
            </CircularContainer>
          )}
        </>
      ) : (
        <ItemList items={patients} />
      )}
      <Pagination
        currentPage={page}
        numOfPages={numOfPages}
        setPage={setPage}
      />
    </>
  );
}

export default observer(PatientList);