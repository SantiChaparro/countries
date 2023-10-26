import style from "./Card.module.css";
import { getCountryById } from "../../redux/actions";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Card = (props) => { 
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(getCountryById(props.id));
    };

  
    return(
        <Link to = {`/detail/${props.id}`}>
            
            <div className={style.Card} onClick={handleClick} >
                
                <img src={props.bandera} alt={props.nombre}/>
                <p>{props.nombre}</p>
                <p>{props.continente}</p>
            </div>
        
        </Link>
        
    )
}

export default Card;