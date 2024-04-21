import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'


// slices
import formSlice from './slices/form.slice';

// sagas
import formSaga from './sagas/form.saga';

const persistConfig = {
    key: 'root',
    storage,
    blacklist:["isTimedOut","form","isSubmitted","submissionError","isSubmitting"]
};


const saga = createSagaMiddleware();
export const store = configureStore({
    reducer: {
        form:persistReducer(persistConfig,formSlice)
    },
    middleware:[saga]
})

saga.run(formSaga);


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch