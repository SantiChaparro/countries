import style from "./CardsContainer.module.css";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  countriesFiltered,
  emptyStateFiltered,
  sortedCountries,
  emptyStateOrdered,
  filterByActivities,
  emptyFilteredActivities,
} from "../../redux/actions";

const CardsContainer = (props) => {
  const countries = useSelector((state) => state.countries);
  const totalPaises = useSelector((state) => state.totalCountries);
  const filterCountries = useSelector((state) => state.filteredCountries);
  const orderedCountries = useSelector((state) => state.orderedCountries);
  const filterActivities = useSelector((state) => state.filteredByActivity);
  const allActivities = useSelector((state) => state.activities);
  const country = useSelector((state) => state.country);
  //console.log("por actividades")
  console.log("por actividades", filterActivities);
  // console.log("por por continente")
  console.log("por continente", filterCountries);
  console.log("ordenamiento", orderedCountries);

  const [order, setOrder] = useState("");
  const [sortBy, setSortBy] = useState("");

  const dispatch = useDispatch();

  const continents = [
    ...new Set(
      totalPaises?.map((country) => {
        return country.continente;
      })
    ),
  ];

  const handleContinent = (event) => {
    const value = event.target.value;

    dispatch(countriesFiltered(event.target.value));
  };

  const handleActivities = (event) => {
    dispatch(filterByActivities(event.target.value));
  };

  const handleResetButton = () => {
    dispatch(emptyStateFiltered());
    dispatch(emptyStateOrdered());
    dispatch(emptyFilteredActivities());
  };

  const handleOrderClick = () => {
    dispatch(sortedCountries(order, sortBy));
    console.log(order);
    console.log(sortBy);
  };

  let filteredData;

  if (orderedCountries.length > 0) {
    filteredData = orderedCountries;
  } else if (filterActivities.length > 0) {
    filteredData = filterActivities;
  } else if (filterCountries.length > 0) {
    filteredData = filterCountries;
  } else if (country.length > 0) {
    filteredData = country;
  } else {
    filteredData = countries;
  }

  const CardsToRender = filteredData;
  console.log("cardscontainer", CardsToRender);
 
  const containerClassName = CardsToRender.length > 1 ? style.CardsContainerGgrid : style.CardsContainerFlex;
  return (
    <div className={style.todo}>
      <div className={style.container}>
        <div className={style.filtrados}>
          <select name="continentes" onChange={handleContinent}>
            {continents?.map((continente) => {
              return <option value={continente}>{continente}</option>;
            })}
          </select>
          <select name="actividades" onChange={handleActivities}>
            {allActivities?.map((actividad) => {
              return (
                <option value={actividad.nombre}>{actividad.nombre}</option>
              );
            })}
          </select>
        </div>

        <div className={style.ordenamiento}>
          <div className={style.ordenamientoContainer}>
            <div className={style.labels}>
              <label>Nombre pais</label>
              <label>Poblacion</label>
            </div>
            <div className={style.radios}>
              <input
                type="radio"
                name="sortBy"
                value="nombre"
                onChange={() => {
                  setSortBy("nombre");
                }}
              />
              <input
                type="radio"
                name="sortBy"
                value="poblacion"
                onChange={() => {
                  setSortBy("poblacion");
                }}
              />
            </div>
          </div>
          <select value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="Ascendente">Ascendente</option>
            <option value="Descendente">Descendente</option>
          </select>
        </div>
        <div className={style.botonesOrdenamiento}>
          <button onClick={handleOrderClick}>ORDENAR</button>
          <button onClick={handleResetButton}>RESET</button>
        </div>
      </div>
      <div className={containerClassName}>
        {CardsToRender.map((countryItem) => (
          <Card
            key={countryItem.id}
            id={countryItem.id}
            bandera={countryItem.bandera}
            nombre={countryItem.nombre}
            continente={countryItem.continente}
          />
        ))}
      </div>

      <div className={style.botones}>
        <button
          onClick={props.handlePrevClick}
          disabled={props.startIndex === 0}
        >
          PREVIOUS
        </button>
        <button onClick={props.handleNextClick}>NEXT</button>
      </div>
    </div>
  );
};

export default CardsContainer;

