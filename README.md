# Shopwise – E-Commerce App

## Project Overview
A React + TypeScript storefront backed by the [DummyJSON](https://dummyjson.com) API. State lives in Redux Toolkit; async work runs through Redux-Saga.

## Features
Home page (hero, featured, deals, categories, recommended, quick links) · product listing with debounced search, category filter and price sort · product details with image gallery · cart (add, update, remove, total) · mock checkout with success screen · loading, error and empty states · responsive, dark-mode aware UI.

## Setup Instructions
```bash
npm install
npm run dev     # http://localhost:5173
npm test        # Jest + React Testing Library
npm run build
```

## Folder Structure
```
src/
 ├── app/            store, rootSaga
 ├── features/
 │    ├── products/  slice, saga, api, pages
 │    ├── cart/      slice, CartPage
 │    └── checkout/  CheckoutPage
 ├── hooks/          useCart, useDebounce
 ├── shared/         components, utils
 ├── routes/         AppRoutes
 └── tests/
```

## Technologies Used
React 18, TypeScript, Redux Toolkit, Redux-Saga, React Router, Vite, Jest, React Testing Library.

## Testing Summary
`src/tests` covers: loading, fetch success, error, search, category filter, price sorting, add/remove/update cart, total recalculation, `useCart`, `useDebounce`, `productsSlice`, `cartSlice`, and `productsSaga` success/failure.

## Screenshots
Add screenshots of Home, Products, Details, Cart and Checkout to `docs/screenshots/` and link them here.
