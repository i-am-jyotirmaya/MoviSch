import axios from 'axios';

export default class Omdb {
    constructor() {
        this.baseUrl = 'https://www.omdbapi.com/?apikey=9bf64fc0';
    }

    searchByName(part, page=1, filters={}) {
        return axios.get(`${this.baseUrl}&s=${part}&page=${page}`).then(res => res.data);
    }
}