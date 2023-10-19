const { default: axios } = require("axios");




const getCountriesFromApi =async () => {

    const countriesData = await axios.get("http://localhost:5000/countries");
    //console.log(countriesData.data);
    const countries = countriesData.data.map(countrie => {

        return {

            id: countrie.cca3,
            nombre: countrie.name.common,
            bandera: countrie.flags.png,
            continente: countrie.continents[0],
            capital: countrie.capital,
            subregion: countrie.subregion,
            area: countrie.area,
            poblacion: countrie.population,

        }
       
    });
    //console.log(countries)
    return countries;
}

module.exports = getCountriesFromApi;