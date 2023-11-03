import style from "./Form.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActivity } from "../../redux/actions";
import { getCountry, empyStateCountry } from "../../redux/actions";

const regexNombre = /^[A-Za-z]+$/;
const regexDuracion = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

const validate = (form) => {
  const errors = {};

  if (!form.nombre) errors.nombre = "El campo esta vacio";
  if (!regexNombre.test(form.nombre))
    errors.nombre = "El campo solo admite letras";
  if (!form.duracion) errors.duracion = "El campo esta vacio";
  if (!regexDuracion.test(form.duracion))
    errors.duracion = "El formato debe ser HH:MM";

  return errors;
};

const Form = () => {
  const country = useSelector((state) => state.country);
 // const allActivities = useSelector((state) => state.activities);

  const [paises, setPaises] = useState([]);

  const [form, setForm] = useState({
    nombre: "",
    dificultad: 1,
    duracion: "",
    temporada: "",
    paises: [],
  });

  const [errors, setErrors] = useState({});
  const [aux, setAux] = useState(false);
  const [message, setMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (country && country.length > 0) {
      if (paises.includes(country[0].nombre)) {
        setMessage("No puedes ingresar dos veces el mismo país");
      } else {
        setForm((prevForm) => ({
          ...prevForm,
          paises: [...prevForm.paises, country[0].id],
        }));
        setPaises((prevPaises) => [...prevPaises, country[0].nombre]);
      }
    }
  }, [country]);

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      setAux(false);
      setMessage("");
    } else {
      setAux(true);
      if (errors) {
        const errorMessages = Object.keys(errors).join(" y el campo ");
        setMessage(
        "Existe algún error presente en el campo" + " " + errorMessages
        );
      }
    }
  }, [errors]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setForm((prevForm) => {
      return { ...prevForm, [name]: value };
    });
    setErrors(validate({ ...form, [name]: value }));
  };

  const handleNameChange = (event) => {
    setInput(event.target.value);
  };

  const handleAddCountry = () => {
    dispatch(getCountry(input));
    setInput("");
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    if (aux === true) {
      setMessage("No puedes enviar el formulario, existe algún error");
    } else if (paises.length === 0) {
      setAux(true);
      setMessage("No puedes enviar el formulario sin agregar paises");
    } else {
      try {
        setAux(false);
        dispatch(postActivity(form));
        dispatch(empyStateCountry());
        setForm({
          nombre: "",
          dificultad: 1,
          duracion: "",
          temporada: "",
          paises: [],
        });
        setPaises([]);
        setInput("");
        setSubmitError(null);
        setMessage("Actividad creada con éxito");
      } catch (error) {
        console.error("Error al agregar la actividad:", error);
        setSubmitError(
          error.response ? error.response.data.error : error.message
        );
       
      }
    }
  };

  return (
    <form>
      <div className={style.formContainer}>
        <div className={style.nombre}>
          <label name="nombre">Nombre </label>
          <input
            type="text"
            value={form.nombre}
            name="nombre"
            onChange={handleFormChange}
          />
          <div className={style.errorSpan}>
            <span>
              <strong>{errors.nombre}</strong>
            </span>
          </div>
        </div>
        <div className={style.dificultad}>
          <label name="dificultad">Dificultad </label>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={5}
            value={form.dificultad}
            name="dificultad"
            onChange={handleFormChange}
          />
          <div className={style.errorSpan}>
            <span>
              <strong>{errors.dificultad}</strong>
            </span>
          </div>
        </div>

        <div className={style.duracion}>
          <label name="duracion">Duración </label>
          <input
            type="text"
            value={form.duracion}
            name="duracion"
            onChange={handleFormChange}
          />
          <div className={style.errorSpan}>
            <span>
              <strong>{errors.duracion}</strong>
            </span>
          </div>
        </div>
        <div className={style.temporada}>
          <label>Temporada</label>
          <select
            name="temporada"
            value={form.temporada}
            onChange={handleFormChange}
          >
            <option>Verano</option>
            <option>Otoño</option>
            <option>Invierno</option>
            <option>Primavera</option>
          </select>
        </div>
        <div>
          <label name="paises">Paises </label>
          <input
            type="search"
            value={input}
            name="paises"
            onChange={handleNameChange}
          />
          <div className={style.paises}>
            {paises && paises.length > 0 ? (
              <ul>
                {paises.map((pais, index) => {
                  return (
                    <li className={style.errorSpan} key={index}>
                      <strong>{pais}</strong>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className={style.errorSpan}>
                <p>
                  <strong>No hay paises agregados</strong>
                </p>
              </div>
            )}
          </div>

          <div className={style.btnAgregar}>
            <button type="button" onClick={handleAddCountry}>
              AGREGAR PAIS
            </button>
          </div>
        </div>
        <div className={style.btnSubmit}>
          <button type="submit" onClick={handleSubmitButton} disabled={aux}>
            ENVIAR
          </button>
        </div>
        <div className={style.errorSpan}>
          <strong>{message && <p>{message}</p>}</strong>
        </div>
      </div>
    </form>
  );
};

export default Form;
