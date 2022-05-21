const marcaciones = require('../marcacron/modules/marcaciones')
const cron = require('node-cron')



// const maracacion = cron.schedule('* * * * * ', () =>{ marcaciones.generarMarcacion })
//
// maracacion.start()
//


cron.schedule('* * * * * ', () =>{ console.log('98988sf98sd9g7s7g9sg7sg') })
cron.schedule('* * * * * ', () =>{ marcaciones.generarMarcacion() })