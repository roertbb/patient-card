import React from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Box
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

function PatientResources({ resources }) {
  return (
    <Box mb={3}>
      {resources.map(res => {
        const type = res.resource.resourceType;
        const date = (res.resource.issued || res.resource.authoredOn).split(
          'T'
        )[0];

        const nestedTitle =
          res.resource.component &&
          res.resource.component.map(comp => comp.code.text).join(', ');
        const nestedDesc =
          res.resource.component &&
          res.resource.component
            .map(
              comp =>
                `${comp.code.text} - ${comp.valueQuantity.value} ${
                  comp.valueQuantity.unit
                }`
            )
            .join(', ');

        const singleTitle =
          res.resource.valueQuantity && res.resource.code.text;
        const singleDesc =
          res.resource.valueQuantity &&
          `${res.resource.code.text} - ${res.resource.valueQuantity.value} ${
            res.resource.valueQuantity.code
          }`;

        const medicationTitle =
          res.resource.medicationCodeableConcept &&
          res.resource.medicationCodeableConcept.text;

        const title = nestedTitle || singleTitle || medicationTitle;
        const content = nestedDesc || singleDesc || medicationTitle;

        return (
          <ExpansionPanel key={res.fullUrl}>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <Typography>{`${date} | ${type} | ${title}`}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>{content}</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </Box>
  );
}

export default PatientResources;
