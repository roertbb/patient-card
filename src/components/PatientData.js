import React, { memo } from 'react';
import { Box, Paper, Typography } from '@material-ui/core';

function Typo(props) {
  return (
    <Box mb={1}>
      <Typography {...props}>{props.children}</Typography>
    </Box>
  );
}
function PatientData({ patient }) {
  const { birthDate, gender, name, address } = patient.resource;
  const patientName = name.filter(name => name.use === 'official')[0];
  const parsedPatientName = `${patientName.given[0]} ${patientName.family}`;
  const parsedAddress = `${address[0].line.join(' ')}, ${address[0].city}, ${
    address[0].state
  }`;

  return (
    <Box mt={2} mb={2} p={2} clone>
      <Paper>
        <Typo variant="h5">{parsedPatientName}</Typo>
        <Typo>Birthdate: {birthDate}</Typo>
        <Typo>Gender: {gender}</Typo>
        <Typo>Address: {parsedAddress}</Typo>
      </Paper>
    </Box>
  );
}

export default memo(PatientData);
