
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const {Country} =  require('./src/db.js');
const getCountriesFromApi = require("./src/controllers/getCountriesFromApi");



conn.sync({ force: true }).then( async() => {

  try {
    const countriesData = await getCountriesFromApi();
    
      await Country.bulkCreate(countriesData);
    
    console.log("Paises agregados con éxito a la base de datos");
  } catch (error) {
    console.error("error al cargar los datos",error)
  }

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  })

}).catch(error => console.error(error))
