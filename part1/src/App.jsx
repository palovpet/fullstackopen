const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const nimi = "Otso"
  const ika = 0
  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Mikko" age={26+10}/>
      <Hello name={nimi} age={ika}/>
    </>
  )
}

export default App