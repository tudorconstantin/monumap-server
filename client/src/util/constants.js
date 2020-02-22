export default {
  monumentTypes: {
    DOMESTIC_URBAN: require('../assets/DOMESTIC_URBAN.png'), //require.context('./../assets/', false, /DOMESTIC_URBAN\.png/),
    ADMINISTRATIV: require('../assets/ADMINISTRATIV.png'),
    RELIGIOS: require('../assets/RELIGIOS.png'),
    TRANSPORTURI: require('../assets/TRANSPORTURI.png'),
    REPREZENTATIV: require('../assets/REPREZENTATIV.png'),
    INDUSTRIAL_PRELUCRATOR: require('../assets/INDUSTRIAL_PRELUCRATOR.png'),
    INDUSTRIAL_ENERGETIC: require('../assets/INDUSTRIAL_ENERGETIC.png'),
  },
  searchableFields: ['denumire', 'adresa', 'cod_lmi', 'tip_monument', 'tip_patrimoniu', 'sector'],
}