const express = require('express')
const app = express()

let persons = [
  {
    id: 1,
    name: "Petra",
    number: "123"
  },
  {
    id: 2,
    name: "Muru",
    number: "456"
  },
  {
    id: 3,
    name: "Äiti",
    number: "789"
  }
]

const cors = require('cors')

app.use(cors())

app.use(express.json())

app.use(express.static('dist'))


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

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }

app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }

    if (!body.number) {
      return response.status(400).json({ 
        error: 'number missing'
      })
    }

    const notUnique = persons.some(person => person.name === body.name)
    if (notUnique) {
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }
  
    const person = {
      id: generateId(),
      name: body.name,
      number: body.number, 
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })