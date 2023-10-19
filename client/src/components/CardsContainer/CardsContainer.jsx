import style from "./CardsContainer.module.css";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { countriesFiltered,
         emptyStateFiltered,
         sortedCountries,
         emptyStateOrdered,
         filterByActivities,
         emptyFilteredActivities 
  } from "../../redux/actions";



const CardsContainer = (props) => {

    const countries = useSelector(state=>state.countries);
    const filterCountries = useSelector(state=>state.filteredCountries);
    const orderedCountries = useSelector(state=>state.orderedCountries);
    const filterActivities = useSelector(state=>state.filteredByActivity);
    const allActivities = useSelector(state=>state.activities);
   // console.log(countries)
    //console.log(orderedCountries)
    //console.log("paises filtradospor actividad"+filterActivities)
    //console.log("paises filtrados por continente"+filterCountries)
    console.log(JSON.stringify(allActivities))
   // console.log(typeof orderedCountries)
    //console.log(orderedCountries)
   

    const [order,setOrder] = useState("");
    const [sortBy,setSortBy] = useState("");

   

    const dispatch = useDispatch();
    //console.log("cardcontainer",filterCountries)
    const continents = [...new Set(countries?.map((country)=>{
      return country.continente
    }))];
    
  
   const handleContinent = (event)=>{
    const value = event.target.value;
    //console.log(typeof value)
   // console.log(event.target.value)
      dispatch(countriesFiltered(event.target.value));    
    }

    const handleActivities = (event) => {
      dispatch(filterByActivities(event.target.value));
    }

    const handleResetButton = () => {
      dispatch(emptyStateFiltered());
      dispatch(emptyStateOrdered());
      dispatch(emptyFilteredActivities());
    };

    const handleOrderClick = () => {
      dispatch(sortedCountries(order,sortBy));
      console.log(order)
      console.log(sortBy)
    };

   
   
    
    return(
      
        <div>
          <div>
            <select name="continentes" onChange={handleContinent}>
              {continents?.map((continente)=>{
                return <option value={continente}>{continente}</option>
              })}
            </select>
            <select name="actividades" onChange={handleActivities}>
              {allActivities?.map((actividad)=>{
                return <option value={actividad.nombre}>{actividad.nombre}</option>
              })}
            </select>
            <button onClick={handleResetButton}>RESET</button>
          <div>
            <input type="radio" name="sortBy" value="nombre" onChange={()=>{setSortBy("nombre")}} />
            <label>Nombre pais</label>
            <input type="radio" name="sortBy" value="poblacion" onChange={()=>{setSortBy("poblacion")}}/>
            <label>Poblacion</label>
            <select value={order} onChange={(e)=>setOrder(e.target.value)}>
              <option value="Ascendente">Ascendente</option>
              <option value="Descendente">Descendente</option>
            </select>
            <button onClick={handleOrderClick}>ORDENAR</button>
          </div>  
           
            
          </div>
          <div className={style.CardsContainer}>
          {
            orderedCountries.length > 0 ? (
              orderedCountries.map((country) => (
                <Card
                  key={country.id}
                  id={country.id}
                  bandera={country.bandera}
                  nombre={country.nombre}
                  continente={country.continente}
                />
              ))
            ) : filterCountries.length > 0 ? (
              filterCountries.map((country) => (
                <Card
                  key={country.id}
                  id={country.id}
                  bandera={country.bandera}
                  nombre={country.nombre}
                  continente={country.continente}
                />
              ))
            ) :  filterActivities.length > 0 ? (
              filterActivities.map((country) => (
                <Card
                  key={country.id}
                  id={country.id}
                  bandera={country.bandera}
                  nombre={country.nombre}
                  continente={country.continente}
                />
              ))
            ) : (
              countries.map((country) => (
                <Card
                  key={country.id}
                  id={country.id}
                  bandera={country.bandera}
                  nombre={country.nombre}
                  continente={country.continente}
                />
              ))
            )}
          </div>
          <div>
            <button onClick={props.handlePrevClick} disabled={props.startIndex === 0}>PREVIOUS</button>
            <button onClick={props.handleNextClick}>NEXT</button>
          </div>
          

        </div>
    )

};

export default CardsContainer;

/*
 {
              
              filterCountries.length > 0 ?(
                filterCountries?.map((country)=>{

                  return <Card 
                    key = {country.id}
                    id = {country.id}
                    bandera = {country.bandera}
                    nombre={country.nombre}
                    continente = {country.continente}

                    />
                })
              ) : (
                countries?.map((country)=>{
                    return <Card 
                    key = {country.id}
                    id = {country.id}
                    bandera = {country.bandera}
                    nombre={country.nombre}
                    continente = {country.continente}

                  />
              })
              )
            
             }

*/