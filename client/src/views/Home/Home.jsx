import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { getCountries } from "../../redux/actions";
import { getActivities } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Home = () => {
    // borra esto si no funciona
    const[startIndex,setStartIndex] = useState(0);
    const[endIndex,setEndIndex] = useState(10);

    const dispatch = useDispatch();

    useEffect(() => {
        //volve getcountries() si no funciona
        dispatch(getCountries(startIndex,endIndex));
        dispatch(getActivities());
    },[])

    //borra esto si no funciona
    const handleNextClick = () => {
        const newStartIndex = endIndex;
        const newEndIndex = endIndex + 10;
        setStartIndex(newStartIndex);
        setEndIndex(newEndIndex);
        dispatch(getCountries(newStartIndex, newEndIndex));
    };

    const handlePrevClick = () => {
        const newStartIndex = Math.max(0, startIndex - 10);
        const newEndIndex = newStartIndex + 10;
        setStartIndex(newStartIndex);
        setEndIndex(newEndIndex);
        dispatch(getCountries(newStartIndex, newEndIndex));
    };



    return(
        <div>
            <h1>Home</h1>
            <CardsContainer handleNextClick={handleNextClick} handlePrevClick={handlePrevClick} startIndex={startIndex}/>  
        </div>
        
    )
}

export default Home;