import axios from 'axios';

export default class Omdb {
    constructor() {
        this.baseUrl = 'http://www.omdbapi.com/?apikey=9bf64fc0';
    }

    searchByName(part, filters, page=1) {
        return axios.get(`${this.baseUrl}&s=${part}&page=${page}`).then(res => res.data);
    }
}