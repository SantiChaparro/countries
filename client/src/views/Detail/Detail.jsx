import Card from "../../components/Card/Card";
import style from "./Detail.module.css"
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCountryById } from "../../redux/actions";
import { empyStateCountry } from "../../redux/actions";
import { useEffect } from "react";
import { useSelector } from "react-redux";


const Detail = () => {
   
    const {id} = useParams();
   
    
    const dispatch = useDispatch();
    const country = useSelector(state=>state.country);
    
    useEffect(()=>{

        dispatch(getCountryById(id));
        
        return () => {
            dispatch(empyStateCountry()); 
        } 
       
        },[dispatch,id]);     

      
     return(
        <div className={style.container}>
            <div className={style.Card}>
                <img src={country.bandera}/>
                <p><strong>{country.nombre}</strong></p>
                {country ? (

                    <p>
                                        
                    {country.nombre} ubicada/o en {country.continente}, abarca {country.area} Km cuadrados.
                    <br />
                    Pertenece a la sub región de {country.subregion}, teniendo como su capital a {country.capital}
                    <br></br>
                    Su población actual es de {country.poblacion} habitantes.
                    <br />
                    {country.Activities && country.Activities.length > 0 ? (
                        <span>
                            Actividades turísticas que pueden realizarse:
                            <ul>
                                {country.Activities.map(activity => (
                                    <li key={activity.id}>{activity.nombre}</li>
                                ))}
                            </ul>
                        </span>
                    ) : null}

                    </p>

                ):null}
                
                
                
            </div>
        </div>
        
    )
}

export default Detail;