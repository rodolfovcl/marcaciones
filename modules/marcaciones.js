const puppeteer = require('puppeteer')
/*Obtengo variables de entonrto utilizando dotenv: https://www.npmjs.com/package/dotenv*/
// npm i dotenv
require('dotenv').config()
const user = process.env.USERNAME
const password = process.env.PASSWORD


const generarMarcacion = async () => {
    try {
        //? 1- Abrir chrome
        const browser = await puppeteer.launch({ headless: false /*, devtools: true*/ }) // headless: false para que habra el navegador
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

        await page.waitForSelector('#input-14', {visible: true})
        await page.type('#input-14', user, {delay:300})
        await page.type('#input-17', password, {delay:300})
        await page.click('#app > div > div > div > div:nth-child(2) > form > div.container > div.sn-login__actions.my-0 > button')

        //? 3- Genero marcación
        await page.waitForTimeout(2000)
        await page.click('body')
        await page.waitForTimeout(500)
        await page.waitForSelector('button[title="Marcaciones"]', {visible: true})
        await page.click('button[title="Marcaciones"]')
        //! BOTON MARCACION?
        // await page.click('#app > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__actions > div > button')

        //? 4- En 15 seg termino proceso
        await page.waitForTimeout(15000)
        await process.exit()


    } catch (error) {
        console.log('Error al iniciar marcaCron: ', error)
    }
}
// generarMarcacion()
exports.generarMarcacion = generarMarcacion