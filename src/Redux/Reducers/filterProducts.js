import { createSelector } from "@reduxjs/toolkit";
export const filterProducts = createSelector( [
    (state) => state.products.products,       // get array of products
    (state) => state.products.searchTerm,     // get search term
    (state) => state.products.filterPrice,    // get price filter
    (state) => state.products.categoryFilter, // get category filter
  ], (products, searchTerm, filterPrice, categoryFilter) => {
    return products.filter((p) => {
      const matchSearch = searchTerm
        ? p.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchPrice = p.price <= filterPrice;
      const matchCategory =
        categoryFilter.length > 0
          ? categoryFilter.includes(p.category)
          : true;

      return matchSearch && matchPrice && matchCategory;
    });
  }
);