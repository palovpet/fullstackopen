import { useState, useEffect } from 'react'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('') 
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  const addNameAndNumber = (event) => {
    event.preventDefault()

    const personAdded = persons.find(person => person.name === newName)

    if (!personAdded) {
      const personObject = {
        name: newName,
        number: newNumber
      }

    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(`Number for ${personObject.name} for added! ʕ •ᴥ•ʔ`)
        setTimeout(() => {setNotificationMessage('')}, 5000)
      })
    
    } else {
      if (window.confirm(`Update number for ${newName}?`)) {
        const id = personAdded.id
        const changedPerson = {...personAdded, number: newNumber}
        personService
          .update(id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== id ? person : response.data))
          })
          .catch(error => {
            setNotificationMessage(`${newName} was deleted from numbers already (O___O)'`)
            setTimeout(() => {setNotificationMessage('')}, 5000)
          })
        setNotificationMessage(`Number for ${newName} updated 凸ಠ益ಠ)凸 `)
        setTimeout(() => {setNotificationMessage('')}, 5000)
      } else {
        console.log("ei päivitetty numeroa")
      }
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
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
          console.log('fail', error)
          setNotificationMessage(`${person.name} deleted already o___O`)
          setTimeout(() => {setNotificationMessage('')}, 5000)
        })    
    setNotificationMessage(`${person.name} deleted ಠ_ಠ `)
    setTimeout(() => {setNotificationMessage('')}, 5000)
    }
  }

  return (
    <div>
      <Notification message={notificationMessage} />
      <h2>Phonebook</h2>
      <Filter filter={filter} filterNumbers={filterNumbers} />
      <h3>add a new</h3>
      <AddNew addNameAndNumber={addNameAndNumber} newName={newName} newNumber={newNumber} handleChange={handleChange} />
      <h3>Numbers</h3>
      <ShowPersons personsToShow={personsToShow} deletePerson={deletePerson}/>     
    </div>
  )
}

const Notification = ({ message }) => {
  if (!message) {
    return null
  }
  return (
    <div className="message">
      {message}
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