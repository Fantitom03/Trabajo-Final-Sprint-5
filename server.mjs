// Función para consumir la API, modificar y filtrar los datos
async function fetchAndModifyCountries() {
    try {
      // 1. Solicitud a la API
      const response = await fetch('https://restcountries.com/v3.1/all');
      
      // Verifica si la solicitud fue exitosa
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      // 2. Obtén los datos en formato JSON
      const countries = await response.json();
  
      // 3. Filtrar países que tienen el idioma español
      const spanishSpeakingCountries = countries.filter(country => {
        // Verifica si el campo 'languages' contiene 'spa'
        return country.languages && country.languages.spa === 'Spanish';
      });
  
      // 4. Modificar los datos eliminando campos y agregando "creador"
      const modifiedCountries = spanishSpeakingCountries.map(country => {
        // Usar destructuración para filtrar campos no deseados
        const {
          translations, tld, cca2, ccp3, cca3, c1oc, idd, altSpellings,
          car, coatOfArms, postalCode, demonyms, ...rest
        } = country;
  
        // Agregar el campo "creador"
        return {
          ...rest,
          creador: "Francisco Nicolas Leiva"
        };
      });
  
      // 5. Trabajar con los datos procesados
      console.log(modifiedCountries);
      return modifiedCountries;
  
    } catch (error) {
      console.error('Error al consumir la API:', error);
    }
  }
  
  // Ejecuta la función
  fetchAndModifyCountries();