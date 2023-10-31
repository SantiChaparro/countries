import style from "./Landing.module.css";
import pngwingImage from '../../assets/pngwing.com.png';
import { Link } from 'react-router-dom';

const Landing = () => {
    return(
        <div className={style.Landing}>
            
            <div className={style.imageContainer}>

                 <img src={pngwingImage} alt="imagen_ingreso" />
            </div>
            <div className={style.buttoncontainer}>
                <Link to={"/home"}>
                    <button>
                        <span class={style.box}>
                            ingresa  !
                        </span>
                    </button>
                </Link>
               
            </div>
            
        </div>
    )
}

export default Landing;