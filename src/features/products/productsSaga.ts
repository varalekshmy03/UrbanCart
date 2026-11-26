import { call, put, takeLatest } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import { api } from './api';
import { fetchProductsRequest, fetchProductsSuccess, fetchProductsFailure, fetchProductRequest, fetchProductSuccess } from './productsSlice';
import type { Product } from './types';

const message = (e: unknown) => (e instanceof Error ? e.message : 'Something went wrong');

export function* fetchProductsWorker() {
  try {
    const products: Product[] = yield call(api.getProducts);
    yield put(fetchProductsSuccess(products));
  } catch (e) {
    yield put(fetchProductsFailure(message(e)));
  }
}
export function* fetchProductWorker(action: PayloadAction<number>) {
  try {
    const product: Product = yield call(api.getProduct, action.payload);
    yield put(fetchProductSuccess(product));
  } catch (e) {
    yield put(fetchProductsFailure(message(e)));
  }
}
export function* productsSaga() {
  yield takeLatest(fetchProductsRequest.type, fetchProductsWorker);
  yield takeLatest(fetchProductRequest.type, fetchProductWorker);
}
