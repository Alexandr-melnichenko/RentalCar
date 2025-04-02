import { Catalog } from "../../components/Catalog/Catalog";
import { Filter } from "../../components/Filter/Filter";
import { Header } from "../../components/Header/Header";

export const CatalogPage = () => {
  return (
    <div>
      <Header />
      <Filter />
      <Catalog />
    </div>
  );
};
