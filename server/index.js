const express = require('express')
const {Nuxt, Builder} = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
app.set('port', port)
let config = require('../nuxt.config.js') // Import and Set Nuxt.js options
config.dev = !(process.env.NODE_ENV === 'production')
async function start() {
  const nuxt = new Nuxt(config) // Init Nuxt.js
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  app.use(nuxt.render) // Give nuxt middleware to express
  app.listen(port, host) // Listen the server
  console.log(`Server listening on http://${host}:${port}`) // eslint-disable-line no-console
}
start()
