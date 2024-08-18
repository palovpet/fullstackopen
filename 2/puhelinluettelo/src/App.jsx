import { useState, useEffect } from 'react'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('') 
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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

    personService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
    
    } else {
      console.log('nimi löytyi jo')
      window.alert(`${newName} löytyypi jo`)
    } 
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
  }

  const personsToShow = persons.filter(person =>
    person.name.includes(filter)
  )

  const deletePerson = (person) => {
    if (window.confirm(`Wish to delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter(n => n.id !== person.id))
        })
        .catch(error => {
          console.log('fail', error)
        })    
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterNumbers={filterNumbers} />
      <h3>add a new</h3>
      <AddNew addNameAndNumber={addNameAndNumber} newName={newName} newNumber={newNumber} handleChange={handleChange} />
      <h3>Numbers</h3>
      <ShowPersons personsToShow={personsToShow} deletePerson={deletePerson}/>     
    </div>
  )
}

const Filter = ({ filter, filterNumbers}) => {
  return (
  <div> filter  
    <input 
      name="filter"
      value={filter}
      onChange={filterNumbers}
    /> 
  </div>)
}

const AddNew = ({ addNameAndNumber, newName, newNumber, handleChange }) => {
  return (
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
  )
}

const ShowPersons = ({ personsToShow, deletePerson }) => {
  return (
    <div>
        {personsToShow.map(person => 
        <li 
          key={person.name}>{person.name} {person.number}
          <button type="button" onClick={() => deletePerson(person)}>delete</button>
          </li>
        )}
      </div>
  )
}

export default App