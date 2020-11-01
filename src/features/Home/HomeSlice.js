import { createSlice } from "@reduxjs/toolkit";

import Omdb from "../../services/omdb.service";

export const HomeSlice = createSlice({
    name: 'home',
    initialState: {
        searchValue: '',
        searchResult: {
            results: [],
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
            }
            // console.log(action);
        }
    }
});

export const {search, searchTextInput} = HomeSlice.actions;

export const searchByName = text => async dispatch => {
    const omdb = new Omdb();
    const result = await omdb.searchByName(text);

    dispatch(search(result));
}

export const selectSearchText = state => state.home.searchValue;

export const selectSearchResult = state => state.home.searchResult;

export const selectError = state => state.home.error;

export default HomeSlice.reducer;