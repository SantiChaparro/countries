import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActivity } from "../../redux/actions";
import { getCountry, empyStateCountry } from "../../redux/actions";

const regexNombre = /^[A-Za-z]+$/;
const regexDuracion = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

const validate = (form,country) => {

    const errors = {};
    
    if(!form.nombre) errors.nombre = "El campo esta vacio";
    if(!regexNombre.test(form.nombre)) errors.nombre = "El campo solo admite letras";
    if(!form.duracion) errors.duracion = "El campo esta vacio";
    if(!regexDuracion.test(form.duracion)) errors.duracion = "El formato debe ser HH:MM";

    



    return errors;
    
};



const Form = () => {

    const country = useSelector(state=>state.country);
    const allActivities = useSelector(state=>state.activities);

   
    const [form,setForm] = useState({

        nombre:"",
        dificultad:1,
        duracion:"",
        temporada:"",
        paises:[]
    })

    const[errors,setErrors] = useState({});

    const [input,setInput] = useState("");
    const [nombrePaises,setNombrePaises] = useState([]); 
    

    const dispatch = useDispatch();

    useEffect(() => {
        if (country && country.length > 0) {
          setForm((prevForm) => ({
            ...prevForm,
            paises: [...prevForm.paises, country[0].id],
          }));
        }
        
      }, [country]);
    

    const handleFormChange = (event) => {
        const {name,value} = event.target;

        
        setForm(prevForm => {
            return { ...prevForm, [name]: value };
        });
        setErrors(validate({ ...form, [name]: value }));
        ;
    };
    
    const handleNameChange = (event) => {
        setInput(event.target.value);
        
    };
    console.log(input)

    const handleAddCountry = () => {
        dispatch(getCountry(input))
        //console.log(form.paises)
    }
     console.log(Array.isArray(country))
     console.log(typeof country)
     console.log(country)
     console.log(form.paises)
      
 
     //console.log(country[0].id)

    const handleSubmitButton = (event) => {

        event.preventDefault();
        dispatch(postActivity(form));
        dispatch(empyStateCountry());
        console.log(country)
        
    };

    return(
        <form>
            <div>
                <label name="nombre">Nombre </label>
                <input type="text" value={form.nombre} name="nombre" onChange={handleFormChange} />
                <div>
                    <span><strong>{errors.nombre}</strong></span>
                </div>
            </div>
            <div>
                <label name="dificultad">Dificultad </label>
                <input type="number" min={1} max={5} value={form.dificultad} name="dificultad"  onChange={handleFormChange} />
                <div>
                    <span><strong>{errors.dificultad}</strong></span>
                </div>
            </div>
            
            <div>
                <label name="duracion">Duración </label>
                <input type="text" value={form.duracion} name="duracion" onChange={handleFormChange} />
                <div>
                    <span><strong>{errors.duracion}</strong></span>
                </div>
            </div>
            <div>
                <select name="temporada" value={form.temporada} onChange={handleFormChange}>
                    <option>Verano</option>
                    <option>Otoño</option>
                    <option>Invierno</option>
                    <option>Primavera</option>
                </select>
            </div>
            <div>
                <label name="paises">Paises </label>
                <input type="search" value={input} name="paises" onChange={handleNameChange} />
                <div>
                    <strong>Países seleccionados:</strong>
                    {form.paises.length > 0 ? (
                        <ul>
                            {console.log(nombrePaises)}
                            
                        {
                            nombrePaises.map((country) => (
                            <li>{country}</li>
                        ))}
                        </ul>
                    ) : (
                        <p>No hay países seleccionados.</p>
                    )}
                </div>
               
                <div>
                    <button type="button" onClick={handleAddCountry} >AGREGAR PAIS</button>
                </div>
            </div>
            <div>
                <button type="submit" onClick={handleSubmitButton}>ENVIAR</button>
            </div>
        </form>
    )
}

export default Form;

