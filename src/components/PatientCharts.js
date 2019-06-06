import React from 'react';
import { LineChart } from 'react-chartkick';
import 'chart.js';
import { Box, Typography } from '@material-ui/core';

function PatientCharts({ resources }) {
  function reduceTemp(value, id) {
    return resources.reduce((prev, res) => {
      const date = (res.resource.issued || res.resource.authoredOn).split(
        'T'
      )[0];
      if (
        res.resource.component &&
        res.resource.component[id].code.text === value
      ) {
        return {
          ...prev,
          [date]: res.resource.component[id].valueQuantity.value
        };
      }
      return prev;
    }, {});
  }

  const Systolic = reduceTemp('Systolic Blood Pressure', 0);
  const Diastolic = reduceTemp('Diastolic Blood Pressure', 1);

  const bodyWeight = resources.reduce((prev, res) => {
    const date = (res.resource.issued || res.resource.authoredOn).split('T')[0];
    if (
      res.resource.valueQuantity &&
      res.resource.code.text === 'Body Weight'
    ) {
      return { ...prev, [date]: res.resource.valueQuantity.value };
    }

    return prev;
  }, {});

  return (
    <>
      {Object.keys(bodyWeight).length !== 0 && (
        <Box m={2} mr={4}>
          <Box m={2} mb={3}>
            <Typography variant="h5">Patient Weight</Typography>
          </Box>
          <LineChart
            curve={false}
            data={bodyWeight}
            min={Math.floor(Math.min(...Object.values(bodyWeight)) * 0.9)}
            max={Math.ceil(Math.max(...Object.values(bodyWeight)) * 1.1)}
          />
        </Box>
      )}

      {Object.keys(Systolic).length !== 0 && (
        <Box m={2} mr={4}>
          <Box m={2} mb={3}>
            <Typography variant="h5">Patient Blood Pressure</Typography>
          </Box>
          <LineChart
            curve={false}
            data={[
              { name: 'Systolic', data: Systolic },
              { name: 'Diastolic', data: Diastolic }
            ]}
            min={Math.floor(
              Math.min(
                ...Object.values(Systolic),
                ...Object.values(Diastolic)
              ) * 0.9
            )}
            max={Math.ceil(
              Math.max(
                ...Object.values(Systolic),
                ...Object.values(Diastolic)
              ) * 1.1
            )}
          />
        </Box>
      )}
    </>
  );
}

export default PatientCharts;
