import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCars } from "../../redux/operations";
import { FilterForm } from "../FilterForm/FilterForm";

const cars = [
  { id: 1, brand: "Mercedes", price: 40, mileAge: 3432 },
  { id: 2, brand: "Toyota", price: 60, mileAge: 5604 },
  { id: 3, brand: "BMW", price: 90, mileAge: 1200 },
  { id: 4, brand: "Honda", price: 30, mileAge: 5647 },
  { id: 5, brand: "Bently", price: 100, mileAge: 500 },
  { id: 6, brand: "Opel", price: 20, mileAge: 7890 },
];

export const Catalog = () => {
  const [filteredCars, setFilteredCars] = useState(cars);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleFilter = (values) => {
    let filtered = cars;

    if (values.brand) {
      filtered = filtered.filter((p) => p.brand === values.brand);
    }

    if (values.price) {
      filtered = filtered.filter((p) => p.price === Number(values.price));
    }

    if (values.mileAgeFrom) {
      filtered = filtered.filter(
        (p) => p.mileAge >= Number(values.mileAgeFrom)
      );
    }

    if (values.mileAgeTo) {
      filtered = filtered.filter((p) => p.mileAge <= Number(values.mileAgeTo));
    }

    setFilteredCars(filtered);
  };

  return (
    <div>
      <FilterForm onFilter={handleFilter} />
      <ul>
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <li key={car.id}>
              {car.name} - {car.price} $
            </li>
          ))
        ) : (
          <p>Not found cars...</p>
        )}
      </ul>
    </div>
  );
};

// <ul className={s.listContact}>
//   {filteredContacts.map((contact) => (
//     <li key={contact.id}>
//       <Contact contact={contact} />
//     </li>
//   ))}
// </ul>

// const MovieList = ({ films }) => {
//     const location = useLocation();
//     console.log('Location:', location);
//     console.log('films:', films);

//     return (
//       <ul className={style.movieList}>
//         {films.map(film => {
//           const imgUrl = film.poster_path
//             ? `${IMG_BASE_URL}/w185${film.poster_path}`
//             : null;

//           return (
//             <li className={style.movieListItem} key={film.id}>
//               <Link
//                 to={`/movies/${film.id}`}
//                 // state={{ from: `${location.pathname}${location.search}` }}
//                 state={location}
//               >
//                 {imgUrl ? (
//                   <img src={imgUrl} alt={`${film.name}`} />
//                 ) : (
//                   <img
//                     width="185px"
//                     src={imgNotAvailable}
//                     alt={`Image not available`}
//                   />
//                 )}
//                 <p className={style.title}>{film.title}</p>
//                 <p className={style.rating}>
//                   {film.release_date.split('-')[0]} year
//                 </p>
//                 <p className={style.rating}>
//                   Rating: {film.vote_average.toFixed(1)} / {film.vote_count}
//                 </p>
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     );
//   };

//   export default MovieList;
