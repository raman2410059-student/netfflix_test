import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    Trending: [],
    Popular: [],
    WatchList: [],
    SearchResult: []
}
 
const MovieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        SetTrending: (state, action) => {
            state.Trending = action.payload;
        },
        SetPopular: (state, action) => {
            state.Popular = action.payload;
        },
        SetSearchResult: (state, action) => {
            state.SearchResult = action.payload;
        },
        AddToWatchList: (state, action) => {
            state.WatchList.push(action.payload);
        },
        RemoveFromWatchList: (state, action) => {
            state.WatchList = state.WatchList.filter(
                (movie) => (movie.id !== action.payload)
            )
        }
    }
})
export const {SetTrending,
              SetPopular, 
              SetSearchResult,
             AddToWatchList,
            RemoveFromWatchList
}= MovieSlice.actions;
export default MovieSlice.reducer;