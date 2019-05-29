import { observable, action, decorate, flow } from 'mobx';
import axios from '../axios';

export class PatientStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.loading = true;
    this.patients = [];
    this.page = 0;
    this.numOfPages = 0;
    this.query = '';
    this.patientsPerPage = 15;

    this.fetchPatients();
  }

  setQuery = query => {
    this.query = query;
    this.fetchPatients(true);
  };

  setPage = page => {
    this.page = page;
    this.fetchPatients();
  };

  fetchPatients = flow(function*(newQuery = false) {
    this.loading = true;

    if (newQuery) this.page = 0;

    const params = [
      `_count=${this.patientsPerPage}`,
      `_getpagesoffset=${this.page * this.patientsPerPage}`
    ];
    if (this.query) params.push(`name=${this.query}`);

    try {
      const { data } = yield axios.get(`Patient?${params.join('&')}`);
      this.patients = data.entry;
      this.numOfPages = Math.ceil(data.total / this.patientsPerPage);
    } catch (error) {
      console.error(error);
    }
    this.loading = false;
  });
}

decorate(PatientStore, {
  loading: observable,
  patients: observable,
  page: observable,
  numOfPages: observable,
  query: observable,
  setQuery: action,
  setPage: action
});
