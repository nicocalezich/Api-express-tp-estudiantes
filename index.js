const express = require('express')
const estudiantes = require('./routes/estudiantes')
const port = 5000
const app = express()
const resource = 'estudiante'
const route = `/${resource}`

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(route, estudiantes)

app.listen(port, () => {
  console.log(`Escuchando en puerto ${port}`)
})