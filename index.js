const express = require('express')
const algo = require('./algo')

const port = 5000

const app = express()

const resource = 'estudiante'

const route = `/${resource}`

const estudiantes = [
  {
    nombre: "José",
    apellido: "Vázquez",
    dni: 90909090,
    edad: 30
  }
]
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post(route, (req, res) => {
  const estudiante = req.body
  if (
    !estudiante.nombre ||
    !estudiante.apellido ||
    !estudiante.edad ||
    !estudiante.dni
    ){
      res.status(400).send("Nombre, apellido, edad y DNI son requeridos")
      return
    }
  
  const existe = estudiantes.find((est) => {
    return est.dni == estudiante.dni
  })

  if (!existe) {
    estudiantes.push(estudiante)
    res.status(200)
    res.json(estudiante)
  } else {
    res.status(409)
    res.send("El estudiante ya se encuentra registrado")
  }
})

app.delete(`${route}/:dni`, (req, res) => {
  const estudiante = estudiantes.find(e => e.dni === parseInt(req.params.dni))
  if(!estudiante){
      res.status(404).send("Estudiante no encontrado")
      return
  }
  const index = users.indexOf(estudiante)
  estudiantes.splice(index, 1)
  res.send(`Estudiante ${index} eliminado`)
})

app.put(`${route}/:dni`, (req, res) => {
  const estudiante = estudiantes.find(e => e.dni === parseInt(req.params.dni))
  if(!estudiante) res.status(404).send("Usuario no encontrado")
  if (
    !req.params.nombre ||
    !req.params.apellido ||
    !req.params.edad
    ){
      res.status(400).send("Nombre, apellido y edad son requeridos")
      return
    }
  else{
    estudiante.nombre = req.params.nombre
    estudiante.apellido = req.params.apellido
    estudiante.edad = req.params.edad
    res.send(estudiante)
  }
})

app.get(route, (req, res) => {
  res.json(estudiantes)
})

app.get(`${route}/:dni`, (req, res) => {
  const estudiante = estudiantes.find(e => e.dni === parseInt(req.params.dni))
  if (!estudiante) res.status(404).send("No se encontro al estudiante")
  res.send(estudiante)
})

app.get(`${route}/edad/:rango`, (req, res) => {
  
})

app.delete('/algo', algo.delete)

app.listen(port, () => {
  console.log(`Escuchando en puerto ${port}`)
})