const puppeteer = require('puppeteer')
require('dotenv').config() // npm i dotenv

/* Variables de entorno */
const user = process.env.USERNAME
const password = process.env.PASSWORD

const date = () => {
    let obj = {}
    /*Fecha completa*/
    obj.fecha = new Date()
    /*Valida dias y meses*/
    obj.dia = obj.fecha.getDate()
    if (obj.dia < 10) obj.dia = `0${obj.fecha.getDate()}`
    obj.mes = obj.fecha.getMonth()+1
    if (obj.mes < 10) obj.mes = `0${obj.fecha.getMonth()+1}`
    obj.formatoDia = `${obj.dia}/${obj.mes}/${obj.fecha.getFullYear()}`
    /*Valida horas*/
    obj.hora = obj.fecha.getHours()
    if (obj.hora < 10) obj.hora = `0${obj.fecha.getHours()}`
    obj.minutos = obj.fecha.getMinutes()
    if (obj.minutos < 10) obj.minutos = `0${obj.fecha.getMinutes()}`
    obj.segundos = obj.fecha.getSeconds()
    if (obj.segundos < 10) obj.segundos = `0${obj.fecha.getSeconds()}`
    obj.horaCompleta = `${obj.hora}:${obj.minutos}:${obj.segundos}`
    /* Nombre del mes */
    const arrayMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    obj.nombreMes = arrayMeses[obj.fecha.getMonth()]
    /* Nombre dia de la semana*/
    const arrayDias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    obj.numeroDia = obj.fecha.getDay()
    obj.nombreDia = arrayDias[obj.numeroDia]
    obj.fechaConNombres = `${obj.nombreDia} ${obj.dia} de ${obj.nombreMes} del ${obj.fecha.getFullYear()}`

    return obj
}

const generarMarcacion = async (orden, nombreMarcacion) => {
    try {
        //? 1- Abrir chrome
        const browser = await puppeteer.launch({ headless: true /*, devtools: true*/ }) // headless: false para que habra el navegador
        // Nueva pagina
        const page = await browser.newPage()
        // Defino tamaño de la pagina
        await page.setViewport({
            width: 1200,
            height: 900,
            deviceScaleFactor: 1
        })
        await page.goto('https://intranet4.colegium.com/login')

        //? 2- Inicio sesion
        console.log('\n\x1b[35m', '*', '\x1b[0m', ` ${date().nombreDia} ${date().formatoDia}.`)
        console.log('\x1b[36m', '1-', '\x1b[0m' ,`Iniciando sesión Intranet4 - ${user}`)
        await page.waitForSelector('input[type="text"]', {visible: true})
        await page.type('input[type="text"]', user, {delay:300})
        await page.type('input[type="password"]', password, {delay:300})
        await page.click('button[type="submit"]')

        //? 3- Genero marcación
        console.log('\x1b[36m', '2-', '\x1b[0m' ,'Generando la', '\x1b[33m',`${orden}`,'\x1b[0m', `marcación - ${nombreMarcacion}: ${date().horaCompleta} hrs.`)
        await page.waitForTimeout(2000)
        await page.click('body')
        await page.waitForTimeout(500)
        await page.waitForSelector('button[title="Marcaciones"]', {visible: true})
        await page.click('button[title="Marcaciones"]')
        // Boton marcacion
        if (nombreMarcacion !== 'Prueba marcacion') {
            await page.waitForSelector('#app > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__actions > div > button', {visible: true})
            await page.waitForTimeout(1000)
            await page.click('#app > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__actions > div > button')
        }

        //? 4- Termino proceso En 5 seg
        console.log('\x1b[36m', '3-', '\x1b[0m' ,'Marcación generada correctamente.')
        await page.waitForTimeout(5000)
        await browser.close();
    } catch (error) {
        console.error('\n\x1b[41m', '!Error al iniciar marcaCron!','\x1b[0m', error)
    }
}

const cambioDiaMarcacion = async () => {
    const d = date().nombreDia
    let espacio = '', espacio2 = '', ast = ''
    if (d == 'Miércoles') espacio2 = ' ', ast = '*'
    d == 'Lunes' ? espacio = '    ' : d == 'Martes' ? espacio = '   ' : d == 'Jueves' ? espacio = '   ' : d == 'Viernes' ? espacio = '  ' : ''
    console.log(`\n\n**********************************************${ast}`)
    console.log(`*                                            ${espacio2}*`)
    console.log('*', '\x1b[35m', `    🗓   ${date().fechaConNombres}${espacio}   ${espacio2}`, '\x1b[0m', '*')
    console.log(`*                                            ${espacio2}*`)
    console.log(`**********************************************${ast}\n`)
}

/* Recursos colores en la terminal */
// https://www.codegrepper.com/code-examples/javascript/console.log+color+terminal
// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color


exports.generarMarcacion = generarMarcacion
exports.cambioDiaMarcacion = cambioDiaMarcacion