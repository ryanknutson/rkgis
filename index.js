const puppeteer = require('puppeteer')

// change this if you want to use another country
let url = x => "https://www.google.com/search?tbm=isch&q=" + encodeURIComponent(x);

// Fisher-Yates shuffle algorithm
let shuffle = a => {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

// returns a promise with an array of objects
let rkgis = (query, {max = 0, random = false} = {}) => new Promise(async (resolve, reject) => {
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

  // shuffle array
  images = random?shuffle(images):images

  // if max is 0, return the max number of images
  let res = max?images.slice(0, max):images

  resolve(res)
})

module.exports = rkgis
