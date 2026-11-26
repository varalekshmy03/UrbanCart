import { runSaga } from 'redux-saga';
import { api } from '../features/products/api';
import { fetchProductsWorker } from '../features/products/productsSaga';
import { fetchProductsSuccess, fetchProductsFailure } from '../features/products/productsSlice';
import { mockProducts } from './testUtils';

const run = async () => {
  const dispatched: unknown[] = [];
  await runSaga({ dispatch: (a: unknown) => dispatched.push(a) }, fetchProductsWorker).toPromise();
  return dispatched;
};
describe('productsSaga', () => {
  afterEach(() => jest.restoreAllMocks());
  it('dispatches success', async () => {
    jest.spyOn(api, 'getProducts').mockResolvedValue(mockProducts);
    expect(await run()).toEqual([fetchProductsSuccess(mockProducts)]);
  });
  it('dispatches failure', async () => {
    jest.spyOn(api, 'getProducts').mockRejectedValue(new Error('nope'));
    expect(await run()).toEqual([fetchProductsFailure('nope')]);
  });
});
