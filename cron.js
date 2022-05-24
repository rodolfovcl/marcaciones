const marcaciones = require('../marcacron/modules/marcaciones')
const cron = require('node-cron')



/*Desde las 07:58 todos los días de la semana de lunes a viernes*/
cron.schedule('58 07 * * 1-5 ', () =>{ marcaciones.cambioDiaMarcacion() }) /*Cambio de dia*/
cron.schedule('00 08 * * 1-5 ', () =>{ marcaciones.generarMarcacion('1RA','Inicio de jornada') })
cron.schedule('00 13 * * 1-5 ', () =>{ marcaciones.generarMarcacion('2DA','Salida al almuerzo') })
cron.schedule('00 14 * * 1-5 ', () =>{ marcaciones.generarMarcacion('3RA','Vuelta del almuerzo') })
cron.schedule('00 18 * * 1-5 ', () =>{ marcaciones.generarMarcacion('4TA','Termino de jornada') })

/* Descomentar para pruebas */
// marcaciones.cambioDiaMarcacion()
// marcaciones.generarMarcacion('0','Prueba marcacion')