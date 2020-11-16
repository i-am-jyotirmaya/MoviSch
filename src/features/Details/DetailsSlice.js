import { createSlice } from '@reduxjs/toolkit';
import Omdb from '../../services/omdb.service';

export const DetailsSlice = createSlice({
    name: 'details',
    initialState: {
        Title: "",
        Year: "",
        Rated: "",
        Released: "",
        Runtime: "",
        Genre: "",
        Director: "",
        Writer: "",
        Actors: "",
        Plot: "",
        Language: "",
        Country: "",
        Awards: "",
        Poster: "",
        Ratings: [
            {
                Source: "",
                Value: ""
            },
            {
                Source: "",
                Value: ""
            },
            {
                Source: "",
                Value: ""
            }
        ],
        Metascore: "",
        imdbRating: "",
        imdbVotes: "",
        Type: "",
        DVD: "",
        BoxOffice: "",
        Production: "",
        Website: ""
    },
    reducers: {
        fetchDetails: (state, action) => {
            if(action.payload && action.payload.Response === "True") {
                state.Title = action.payload.Title;
                state.Year = action.payload.Year;
                state.Rated = action.payload.Rated;
                state.Released = action.payload.Released;
                state.Runtime = action.payload.Runtime;
                state.Genre = action.payload.Genre;
                state.Director = action.payload.Director;
                state.Writer = action.payload.Writer;
                state.Actors = action.payload.Actors;
                state.Plot = action.payload.Plot;
                state.Language = action.payload.Language;
                state.Country = action.payload.Country;
                state.Awards = action.payload.Awards;
                state.Poster = action.payload.Poster;
                state.Ratings = [
                    {
                        Source: action.payload.Ratings[0].Source,
                        Value: action.payload.Ratings[0].Value
                    },
                    {
                        Source: action.payload.Ratings[1] && action.payload.Ratings[1].Source,
                        Value: action.payload.Ratings[1] && action.payload.Ratings[1].Value
                    },
                    {
                        Source: action.payload.Ratings[2] && action.payload.Ratings[2].Source,
                        Value: action.payload.Ratings[2] && action.payload.Ratings[2].Value
                    }
                ];
                state.Metascore = action.payload.Metascore;
                state.imdbRating = action.payload.imdbRating;
                state.imdbVotes = action.payload.imdbVotes;
                state.Type = action.payload.Type;
                state.DVD = action.payload.DVD;
                state.BoxOffice = action.payload.BoxOffice;
                state.Production = action.payload.Production;
                state.Website = action.payload.Website;
            }
        }
    }
});

export const {fetchDetails} = DetailsSlice.actions;

export const fetchDetailsAsync = (imdbId) => async dispatch => {
    const omdb = new Omdb();
    omdb.fetchDetails(imdbId).then(
        res => dispatch(fetchDetails(res))
    );
}

export const selectDetails = state => state.details;

export default DetailsSlice.reducer;