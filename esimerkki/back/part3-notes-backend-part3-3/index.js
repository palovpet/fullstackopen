const express = require('express')
const app = express()


let persons = [
  {
    id: 1,
    content: "Petra",
    number: "123"
  },
  {
    id: 2,
    content: "Muru",
    number: "456"
  },
  {
    id: 3,
    content: "Äiti",
    number: "789"
  }
]

app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(requestLogger)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World :)</h1>')
})


app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    console.log('no person with this id')
    response.status(404).end()
  }
  
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.get('/info', (request, response) => {
  const count = persons.length
  const time = new Date().toString()
  response.send(`Phonebook has info for ${count} people<br>${time}`)
  
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)  
  response.status(204).end()
})


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const notUnique = persons.some(person => person.content === body.content)
  if (notUnique) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    id: generateId(),
    content: body.content,
    number: body.number, 
  }

  persons = persons.concat(person)

  response.json(note)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})