import { act, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import type { ReactNode } from 'react';
import { makeStore } from '../app/store';
import { useCart } from '../hooks/useCart';
import { useDebounce } from '../hooks/useDebounce';
import { mockProducts } from './testUtils';

describe('useDebounce', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());
  it('delays value updates', () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 300), { initialProps: { v: 'a' } });
    rerender({ v: 'ab' });
    expect(result.current).toBe('a');
    act(() => { jest.advanceTimersByTime(300); });
    expect(result.current).toBe('ab');
  });
});
describe('useCart', () => {
  it('adds, updates, removes and totals', () => {
    const wrapper = ({ children }: { children: ReactNode }) => <Provider store={makeStore()}>{children}</Provider>;
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.add(mockProducts[1]));
    act(() => result.current.update(2, 2));
    expect(result.current.total).toBe(1800);
    expect(result.current.count).toBe(2);
    act(() => result.current.remove(2));
    expect(result.current.items).toHaveLength(0);
  });
});
