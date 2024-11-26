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

app.get('/', (request, response) => {
  response.send('<h1>Hello World :)</h1>')
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  response.json(person)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

app.get('/info', (request, response) => {
    const count = persons.length
    const time = new Date().toString()
    response.send(`Phonebook has info for ${count} people<br>${time}`)
    
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

//hi"