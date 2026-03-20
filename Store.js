import {configureStore} from '@reduxjs/toolkit';
import Authreducer from './AuthSlice'
import Moviereducer from './MovieSlice'

export const Store = configureStore({
    reducer: {
        auth: Authreducer,
        movie: Moviereducer
    }
})

export default Store