import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice';
import rootSaga from './rootSaga';

const rootReducer = combineReducers({ products: productsReducer, cart: cartReducer });
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const saga = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (gdm) => gdm({ thunk: false }).concat(saga),
  });
  saga.run(rootSaga);
  return store;
};
export const store = makeStore();
