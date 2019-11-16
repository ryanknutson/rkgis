const puppeteer = require('puppeteer')

// change this if you want to use another country
let url = x => "https://www.google.com/search?tbm=isch&q=" + encodeURIComponent(x);

// returns a promise with an array of objects
let rkgis = query => new Promise(async (resolve, reject) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url(query))

  // filter through the images
  let images = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.rg_di .rg_meta'))
    .map(e=>JSON.parse(e.textContent)))

  if (images.length == 0) reject("Couldn't get images")

  // make the data easier to understand
  images = images.map(e=>({
    title: e.pt,
    url: e.ou,
    height: e.oh,
    width: e.ow,
    origin_url: e.ru,
    type: e.ity
  }))

  await browser.close()
  resolve(images)
})

module.exports = rkgis
