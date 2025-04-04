// export const selectFilteredCars = (state) => state.cars.filteredItems;
// export const selectCars = (state) => state.cars.items;
// export const selectStatus = (state) => state.cars.status;
// export const selectIsLoading = (state) => state.cars.isLoading;
// export const selectError = (state) => state.cars.error;

export const selectAllCars = (state) => state.cars.allCars;
export const selectFilteredCars = (state) => state.cars.filteredCars;
export const selectFavorites = (state) => state.cars.favorites;
export const selectFilters = (state) => state.cars.filters;
export const selectIsLoading = (state) => state.cars.isLoading;
export const selectError = (state) => state.cars.error;
export const selectIsFilterApplied = (state) => state.cars.isFilterApplied;
