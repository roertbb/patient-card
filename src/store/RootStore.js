import { createContext } from 'react';
import { PatientStore } from './PatientStore';

class RootStore {
  patientStore = new PatientStore(this);
}

export const RootStoreContext = createContext(new RootStore());
