import React from 'react';

function PatientResources({ resources }) {
  return resources.map(res => <p key={res.fullUrl}>{res.fullUrl}</p>);
}

export default PatientResources;
