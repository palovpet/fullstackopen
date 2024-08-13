import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const getIndexorDefault = (list, value) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].name === value) {
        return i 
      }
    }
    return -1
  }
  
  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    console.log(persons)

    if (getIndexorDefault(persons, newName) === -1) {
    
    const nameObject = {
      name: newName,
      id: String(persons.length + 1)
    }
    setPersons(persons.concat(nameObject))
    
    } else {
      console.log('nimi löytyi jo')
      window.alert(`${newName} löytyypi jo`)
    }
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
                  value={newName}
                  onChange={handleNameChange}
                  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => 
        <li key={person.name}>{person.name}</li>
        )}
      </div>      
    </div>
   
  )

}

export default App