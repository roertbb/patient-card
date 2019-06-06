# Instalation

In order to run project [Node.js](https://nodejs.org/en/) is required

Install required dependencies using command

```
npm install
```

Run project using command

```
npm start
```

Client is using HAPI FHIR's REST API as source of data. As mentioned in [project requirements](https://www.cs.put.poznan.pl/kmiazga/students/iwm/KartaPacjenta.pdf) HAPI FHIR provides Resource called MedicationRequest instead of MedicationStatement and Medication, which is used by out client.

## Ports

HAPI FHIR server is running on port 8080 by default - http://localhost:8080/

Client is running by default on port 3000 - http://localhost:3000/

## Change server's URL

In order to run server on another instances please change `baseURL` in `axios.js`

```javascript
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/baseDstu3/' // change URL here
});

export default instance;
```
