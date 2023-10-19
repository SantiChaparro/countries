//import { countriesFiltered } from "./actions";
import {
    GET_COUNTRIES,
    GET_COUNTRY,
    GET_COUNTRY_BY_ID,
    EMPTY_STATE_COUNTRY,
    FILTER_COUNTRIES,
    EMPTY_STATE_FILTERED,
    ORDERED_COUNTRIES,
    EMPTY_STATE_ORDERED,
    FILTERED_BY_ACTIVITY,
    GET_ACTIVITIES,
    EMPTY_FILTERED_ACTIVITIES,
    POST_ACTIVITY
    

} from "./actions/"; 

const initialState = {
    countries: [],
    country: {},
    filteredCountries: [],
    orderedCountries: [],
    filteredByActivity: [],
    activities: []
}


const rootReducer = (state= initialState,action) =>{

    switch (action.type) {
        case GET_COUNTRIES:

            return {...state, countries: action.payload}
        
        case GET_COUNTRY:
            
            return {...state, countries: action.payload}

        case GET_COUNTRY_BY_ID:
            
            return {...state, country: action.payload}

        case EMPTY_STATE_COUNTRY :
            
            return {...state, country: action.payload}

        case FILTER_COUNTRIES:
           
            return {...state, filteredCountries: state.countries.filter((country)=> country.continente === action.payload)}

        case EMPTY_STATE_FILTERED:

            return {...state, filteredCountries: []}

        case ORDERED_COUNTRIES:
           let order = action.payload.order;
           let sortBy = action.payload.sortBy
           let usingState;

           if(state.filteredCountries.length > 0){
                 usingState = [...state.filteredCountries];
                 
            }else if(state.filteredByActivity.length > 0 ){
                 usingState = [...state.filteredByActivity];
                
            }else{
                usingState = [...state.countries];
                
            }

            if(order === "Ascendente" && sortBy === "nombre"){
                let ordered = usingState.sort((a,b) => a.nombre.localeCompare(b.nombre)) 
                console.log(ordered)
                return {...state, orderedCountries: ordered}

            }else if(order === "Ascendente" && sortBy === "poblacion"){
                let ordered = usingState.sort((a,b) => a.poblacion - b.poblacion )
                console.log(ordered)
                return {...state, orderedCountries: ordered}

            }else if(order === "Descendente" && sortBy === "nombre"){
                let ordered = usingState.sort((a,b) => b.nombre.localeCompare(a.nombre))
                console.log(ordered)
                return {...state, orderedCountries: ordered}

            }else{
               
                    let ordered = usingState.sort((a,b) => b.poblacion - a.poblacion )
                    console.log("reducer"+ordered)
                    return {...state, orderedCountries: ordered}
            }

        case EMPTY_STATE_ORDERED:
            
            return {...state, orderedCountries: action.payload }

        case FILTERED_BY_ACTIVITY:
           
           

            return {...state, filteredByActivity: state.countries.filter((country) => {
                if(country.Activities && country.Activities.length > 0){
                    return country.Activities.some((activity)=>activity.nombre === action.payload)
                }
            }) }

        case GET_ACTIVITIES:
            
            return {...state, activities: action.payload }

        case EMPTY_FILTERED_ACTIVITIES:
            
        return {...state, filteredByActivity: action.payload}

        case POST_ACTIVITY:

            return {...state, activities: action.payload}
            

        default:
            return {...state}
            
    }

}

export default rootReducer;


/*
  if(state.filteredCountries.length === 0){
                 usingState = [...state.countries];
            }else{
                 usingState = [...state.filteredCountries];
            }


*/