const puppeteer = require('puppeteer')
require('dotenv').config() // npm i dotenv

const user = process.env.USERNAME
const password = process.env.PASSWORD
const fecha = new Date()
const dia = `${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()}`
const hora = `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`

const generarMarcacion = async (tipoMarcacion, nombreMarcacion) => {
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
        console.log(`\nDia ${dia}.`)
        console.log(`Iniciando sesion Intranet4 - ${user}`)
        await page.waitForSelector('#input-14', {visible: true})
        await page.type('#input-14', user, {delay:300})
        await page.type('#input-17', password, {delay:300})
        await page.click('#app > div > div > div > div:nth-child(2) > form > div.container > div.sn-login__actions.my-0 > button')

        //? 3- Genero marcación
        console.log(`Generando ${tipoMarcacion} marcacion - ${nombreMarcacion}: ${hora} hrs.`)
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

        //? 4- En 15 seg termino proceso
        await page.waitForTimeout(5000)
        console.log('Proceso terminado.')
        await browser.close();
    } catch (error) {
        console.error('Error al iniciar marcaCron: ', error)
    }
}


exports.generarMarcacion = generarMarcacion