import { createSlice } from "@reduxjs/toolkit";

import Omdb from "../../services/omdb.service";

export const HomeSlice = createSlice({
    name: 'home',
    initialState: {
        searchValue: '',
        searchResult: {
            results: [],
            page: 0,
            totalResults: 0
        },
        error: ''
    },
    reducers: {
        searchTextInput: (state, action) => {
            state.searchValue = action.payload;
        },
        search: (state, action) => {
            state.searchResult.results.length = 0;
            state.searchResult.totalResults = 0;
            state.error = '';
            if(!state.searchValue) {
                state.searchResult.results.length = 0;
                state.searchResult.totalResults = 0;
                state.error = '';
            } else if (!JSON.parse(action.payload.Response.toLowerCase())) {
                state.error = action.payload.Error;
            } else {
                if(action.payload.Search && action.payload.Search.length)
                    state.searchResult.results.push(...action.payload.Search);
                state.searchResult.totalResults = +action.payload.totalResults;
                state.searchResult.page = action.payload.page;
            }
            // console.log(action);
        },
        clearSearchData: (state) => {
            state.searchResult.page = 0;
            state.searchResult.results.length = 0;
            state.searchResult.totalResults = 0;
            state.error = '';
        },
        clearSearchDataList: (state) => {
            state.searchResult.results.length = 0;
        }
    }
});

export const {search, searchTextInput, clearSearchData, clearSearchDataList} = HomeSlice.actions;

export const searchByName = (text, page=1) => async dispatch => {
    const omdb = new Omdb();
    const result = await omdb.searchByName(text, page);
    // console.log(result)
    dispatch(search({...result, page}));
}

export const selectSearchText = state => state.home.searchValue;

export const selectSearchResult = state => state.home.searchResult;

export const selectError = state => state.home.error;

export default HomeSlice.reducer;