import { useState } from "react";
import { useDispatch } from "react-redux";
import { postActivity } from "../../redux/actions";

const validateForm = (form,setErrors,errors) => {
    const nameRegex = /^[a-zA-Z]+$/;
    const numberRegex = /^[0-9]+$/;
    const durationRegex = /^(?:\d{1,2}:\d{2})?$/;

    const validateErrors = {};

    if (!form.nombre) {
        validateErrors.nombre = "Nombre está vacío";
    } else if (!nameRegex.test(form.nombre)) {
        validateErrors.nombre = "El nombre debe contener solo letras";
    } else {
        validateErrors.nombre = "";
    }
  
    if (!form.dificultad) {
        validateErrors.dificultad = "Dificultad está vacía";
    } else if (!numberRegex.test(form.dificultad)) {
        validateErrors.dificultad = "La dificultad debe contener solo números";
    } else if (form.dificultad < 1 || form.dificultad > 5) {
        validateErrors.dificultad = "Los valores deben ir del 1 al 5";
    } else {
        validateErrors.dificultad = "";
    }

    if (!form.duracion) {
        validateErrors.duracion = "Duración está vacía";
      } else if (!durationRegex.test(form.duracion)) {
        validateErrors.duracion = "Formato de duración inválido (use HH:mm)";
      } else {
        validateErrors.duracion = "";
      }



     return validateErrors
    
    
    
};

const Form = () => {

    const [form,setForm] = useState({

        nombre:"",
        dificultad:"",
        duracion:"",
        temporada:"",
        Countries:[]
    })

    const[errors,setErrors] = useState({
        nombre:"",
        dificultad:"",
        duracion:"",
        temporada:"",
        Countries:[]
    });

    const [newCountry,setNewCountry] = useState("");

    const dispatch = useDispatch();

    const handleFormChange = (event) => {
        const {name,value} = event.target;

        const parsedValue = name === "dificultad" ? Number(value) : value;

        setForm({...form,[name]:parsedValue});
        const errors = validateForm({ ...form, [name]: parsedValue });
        setErrors(errors);
    };

    const handleAddCountry = () => {
        setForm(prevForm =>({...prevForm, paises: Array.isArray(prevForm.paises) ? [...prevForm.paises, newCountry] : [newCountry]}))
    }



    const handleSubmitButton = (event) => {

        event.preventDefault();
        dispatch(postActivity(form));//
        console.log(form)
       console.log(typeof form.dificultad)
       console.log(typeof form.duracion)
       console.log(typeof form.temporada)
       console.log(Array.isArray(form.Countries));
        
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
                <input type="text" value={form.dificultad} name="dificultad" onChange={handleFormChange} />
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
                <input type="text" value={newCountry} name="paises" onChange={(e)=>{setNewCountry(e.target.value)}} />
               
                <div>
                    <button type="button" onClick={handleAddCountry}>AGREGAR PAIS</button>
                </div>
            </div>
            <div>
                <button type="submit" onClick={handleSubmitButton}>ENVIAR</button>
            </div>
        </form>
    )
}

export default Form;

/*
 <div>
                    <label>PAISES AGREGADOS</label>
                    {form.Countries?.map((pais)=>(<li key={pais}>{pais}</li>))}
                </div>
 */