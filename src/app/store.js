import { configureStore } from "@reduxjs/toolkit";
import { booksApi } from "../API/booksSlice";

// will need to import something from bookSlice.js

export const store = configureStore({
  reducer: {
    booksApi: booksApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(booksApi.middleware)  
})