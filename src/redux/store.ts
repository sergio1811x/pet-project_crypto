import { configureStore } from "@reduxjs/toolkit";

import { cryptoApi } from "./Api/apiCoinRanking";
import { newsApi } from "./Api/apiCryptoNews";


export default configureStore({
    reducer: {
        [cryptoApi.reducerPath] : cryptoApi.reducer,
        [newsApi.reducerPath] : newsApi.reducer
    }
});