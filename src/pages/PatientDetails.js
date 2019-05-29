import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { withRouter } from 'react-router';
import LoadingContainer from '../components/LoadingContainer';
import {
  CircularProgress,
  TextField,
  Box,
  Typography
} from '@material-ui/core';
import PatientData from '../components/PatientData';
import PatientResources from '../components/PatientResources';
import styled from 'styled-components';
import PatientCharts from '../components/PatientCharts';

const FilterForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function PatientDetails({ history }) {
  const [patientData, setPatientData] = useState(null);
  const [patientResources, setPatientResources] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  function compareDates(a, b) {
    const aDate = (a.resource.issued || a.resource.authoredOn).split('T')[0];
    const bDate = (b.resource.issued || b.resource.authoredOn).split('T')[0];
    return new Date(aDate) < new Date(bDate) ? 1 : -1;
  }

  function handleChangeStartDate(event) {
    setStartDate(event.target.value);
  }

  function handleChangeEndDate(event) {
    setEndDate(event.target.value);
  }

  function filterResourcesWithinTimestamp() {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return patientResources.filter(res => {
      const date = res.resource.issued || res.resource.authoredOn;
      const parsedDate = new Date(date.split('T')[0]);
      return parsedDate >= start && parsedDate <= end;
    });
  }

  useEffect(() => {
    async function getPatientDetails() {
      const patientId = history.location.pathname.split('?')[0].split('/')[2];
      const { data } = await axios.get(
        `/Patient/${patientId}/$everything?_sort_by=date&_count=100`
      );
      const patient = data.entry.filter(
        entry => entry.resource.resourceType === 'Patient'
      );
      setPatientData(patient[0]);
      const resources = data.entry.filter(entry =>
        [
          'Observation',
          'MedicationStatement',
          'MedicationRequest',
          'Medication'
        ].includes(entry.resource.resourceType)
      );
      const filteredResources = resources.sort(compareDates);

      const dates = filteredResources
        .map(res => res.resource.issued || res.resource.authoredOn)
        .map(date => new Date(date.split('T')[0]));

      const first = dates[dates.length - 1].toISOString().split('T')[0];
      setStartDate(first);
      const last = dates[0].toISOString().split('T')[0];
      setEndDate(last);

      setPatientResources(resources);
      setLoading(false);
    }

    getPatientDetails();
  }, [history.location.pathname]);

  if (loading)
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );

  return (
    <>
      <Box m={2}>
        <Typography variant="h5">Patient Information</Typography>
      </Box>
      <PatientData patient={patientData} />
      <Box m={2}>
        <FilterForm noValidate>
          <Typography variant="h5">Patient Resources</Typography>
          <FilterForm>
            <Box mr={2}>
              <TextField
                id="date"
                label="From"
                type="date"
                value={startDate}
                onChange={handleChangeStartDate}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Box>
            <Box mr={2}>
              <TextField
                id="date"
                label="To"
                type="date"
                value={endDate}
                onChange={handleChangeEndDate}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Box>
          </FilterForm>
        </FilterForm>
      </Box>
      <PatientResources resources={filterResourcesWithinTimestamp()} />
      <PatientCharts resources={filterResourcesWithinTimestamp()} />
    </>
  );
}

export default withRouter(PatientDetails);
