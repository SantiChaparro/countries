import Card from "../../components/Card/Card";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCountryById } from "../../redux/actions";
import { empyStateCountry } from "../../redux/actions";
import { useEffect } from "react";
import { useSelector } from "react-redux";
//import style from "../Detail";



const Detail = () => {
   
    const {id} = useParams();
   
    
    const dispatch = useDispatch();
    const country = useSelector(state=>state.country);
    console.log(country)
   

    useEffect(()=>{

        dispatch(getCountryById(id));
        
        return () => {
            dispatch(empyStateCountry()); 
        } 
       
        },[dispatch,id]);     

      
     return(
        <div>
           
           <img src={country.bandera}/>
           <p>pais: {country.nombre} </p>
           <p>id: {country.id}</p>
           <p>continente: {country.continente}</p>
           <p>capital: {country.capital}</p>
           <p>subregion: {country.subregion}</p>
           <p>area: {country?.area}</p>
           <p>poblacion: {country.poblacion}</p>
        </div>
    )
}

export default Detail;