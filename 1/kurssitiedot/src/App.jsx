const Header = ({ name }) => {
  return (
      <h1>{name}</h1> 
  )
}

const Content = ({ table }) => {
  return (
    <>
    { table.map(course => (
      <p> {course.name} {course.exercises} </p>
    ))}
    </>
  )
}

 const Total = ({ table }) => {
  let sum = 0
  table.forEach(course => {
    sum = sum + course.exercises
  })
  return (
    <p>Number of exercises {sum}</p>  
  )
}   

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header name={course.name} />
      <Content table={course.parts}/>
      <Total table={course.parts} /> 
   </>
  )
}

export default App