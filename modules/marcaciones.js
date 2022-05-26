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
        console.log(`\nDia ${date().formatoDia}.`)
        console.log(`Iniciando sesión Intranet4 - ${user}`)
        await page.waitForSelector('input[type="text"]', {visible: true})
        await page.type('input[type="text"]', user, {delay:300})
        await page.type('input[type="password"]', password, {delay:300})
        await page.click('button[type="submit"]')

        //? 3- Genero marcación
        console.log(`Generando ${orden} marcación - ${nombreMarcacion}: ${date().horaCompleta} hrs.`)
        await page.waitForTimeout(2000)
        await page.click('body')
        await page.waitForTimeout(500)
        await page.waitForSelector('button[title="Marcaciones"]', {visible: true})
        // await page.waitForSelector('#app > div > header > div > button:nth-child(4)', {visible: true})
        await page.click('button[title="Marcaciones"]')
        // await page.click('#app > div > header > div > button:nth-child(4)')
        // Boton marcacion
        if (nombreMarcacion !== 'Prueba marcacion') {
            await page.waitForSelector('#app > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__actions > div > button', {visible: true})
            await page.waitForTimeout(1000)
            await page.click('#app > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__actions > div > button')
        }

        //? 4- En 15 seg termino proceso
        await page.waitForTimeout(5000)
        console.log('Marcación generada correctamente.')
        await browser.close();
    } catch (error) {
        console.error('Error al iniciar marcaCron: ', error)
    }
}

const cambioDiaMarcacion = async () => {
    console.log(`\n****************************************`)
    console.log(`*                                      *`)
    console.log(`*      🗓   ${date().nombreDia} - ${date().formatoDia}      *`)
    console.log(`*                                      *`)
    console.log(`****************************************`)
}


exports.generarMarcacion = generarMarcacion
exports.cambioDiaMarcacion = cambioDiaMarcacion