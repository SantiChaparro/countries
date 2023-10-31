import style from "./SearchBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountry } from "../../redux/actions";

const SearchBar = () => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleImputChange = (event) => {
    setName(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleSearch = () => {
    if (!name) {
      window.alert("No ingresaste datos");
    } else if (!isNaN(name)) {
      window.alert("solo puedes ingresar letras");
    } else {
      dispatch(getCountry(name));
      setName("");
    }
  };

  return (
    <div className={style.SearchBar}>
      <input
        type="search"
        value={name}
        onChange={handleImputChange}
        onKeyPress={handleKeyPress}
        placeholder="Nombre del pais"
      ></input>
      <button onClick={handleSearch}>BUSCAR</button>
    </div>
  );
};

export default SearchBar;
