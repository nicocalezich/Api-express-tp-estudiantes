const express = require('express')
const route = express.Router()

const estudiantes = [
  {
    nombre: "José",
    apellido: "Vázquez",
    dni: 90909090,
    edad: 30
  }
]

route.post("/", (req, res) => {
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
    res.status(200).json(estudiante)
  } else {
    res.status(409)
    res.send("El estudiante ya se encuentra registrado")
  }
})

route.delete(`/:dni`, (req, res) => {
  const estudiante = estudiantes.find(e => e.dni === parseInt(req.params.dni))
  if(!estudiante){
      res.status(404).send("Estudiante no encontrado")
      return
  }
  const index = estudiantes.indexOf(estudiante)
  estudiantes.splice(index, 1)
  res.send(`Estudiante ${index} eliminado`)
})

route.put(`/:dni`, (req, res) => {
  const estudiante = estudiantes.find(e => e.dni === parseInt(req.params.dni))
  if(!estudiante) res.status(404).send("Usuario no encontrado")
  if (
    !req.body.nombre ||
    !req.body.apellido ||
    !req.body.edad
    ){
      res.status(400).send("Nombre, apellido y edad son requeridos")
      return
    }
  else{
    estudiante.nombre = req.body.nombre
    estudiante.apellido = req.body.apellido
    estudiante.edad = req.body.edad
    res.json(estudiante)
  }
})

//obtiene todos los estudiantes
route.get(`/`, (req, res) => {
  res.json(estudiantes)
})

//obtiene un estudiante en especifico, en base a su DNI
route.get(`/:dni`, (req, res) => {
  const estudiante = estudiantes.find(e => e.dni === parseInt(req.params.dni))
  if (!estudiante) res.status(404).send("No se encontro al estudiante")
  res.json(estudiante)
})

//obtiene los estudiantes de determinado rango de edad, el formato sera "/n-n" correspondiendo n a una edad.
route.get(`/edad/:desde/:hasta`, (req, res) => {
  const desde = req.params.desde
  const hasta = req.params.hasta
  if (estudiantes && !isNaN(desde) && desde >= 0 && !isNaN(hasta) && hasta >= 0){  
    const sorted = estudiantes.sort(ordenarPorEdad)
    let buscados = []
    sorted.forEach(estudiante => {
      if (estudiante.edad >= desde && estudiante.edad <= hasta){
        buscados.push(estudiante)
      }
    })
    res.json(buscados)
  }
  else{
    res.send("No se pudo realizar la busqueda")
  }  
})

const ordenarPorEdad = (a,b) => {
  return (a.edad > b.edad) ? 1 : ((b.edad > a.edad) ? -1 : 0)
} 

module.exports = route