import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('') 

  const [filter, setFilter] = useState('')

  const getIndexorDefault = (list, value) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].name === value) {
        return i 
      }
    }
    return -1
  }
  
  const addNameAndNumber = (event) => {
    event.preventDefault()

    if (getIndexorDefault(persons, newName) === -1) {
    
    const nameObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(nameObject))
    
    } else {
      console.log('nimi löytyi jo')
      window.alert(`${newName} löytyypi jo`)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleChange = (event) => {
    const {name, value} = event.target

    if (name === "name") {
      setNewName(value)
    }
    if (name === "number") {
      setNewNumber(value)
    }
  }

  const filterNumbers = (event) => {
    const { value } = event.target
    setFilter(value)
    console.log(value)
  }

  const personsToShow = persons.filter(person =>
    person.name.includes(filter)
  )

  return (
    <div>
      <h2>Phonebook</h2>
      filtteröi <input
                  name="filter"
                  value={filter}
                  onChange={filterNumbers}
                  />
      <h3>add a new</h3>
      <form onSubmit={addNameAndNumber}>
        <div>
          name: <input
                  name="name"
                  value={newName}
                  onChange={handleChange}
                  />
        </div>
        <div>number: <input 
                      name="number"
                      value={newNumber}
                      onChange={handleChange}
                      />
        </div>
        <div><button type="submit">add</button></div>
      </form>
      <h3>Numbers</h3>
      <div>
        {personsToShow.map(person => 
        <li key={person.name}>{person.name} {person.number}</li>
        )}
      </div>      
    </div>
   
  )

}

export default App