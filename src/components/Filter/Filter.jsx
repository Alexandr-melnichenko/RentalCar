import { BtnSearch } from "./BtnSearch/BtnSearch";
import { FilterBrand } from "./FilterBrand/FilterBrand";
import { FilterMileAgeFrom } from "./FilterMileAgeFrom/FilterMileAgeFrom";
import { FilterMileAgeTo } from "./FilterMileAgeTo/FilterMileAgeTo";
import { FilterPrice } from "./FilterPrice/FilterPrice";

export const Filter = () => {
  return (
    <div>
      <FilterBrand />
      <FilterPrice />
      <FilterMileAgeFrom />
      <FilterMileAgeTo />
      <BtnSearch />
    </div>
  );
};
