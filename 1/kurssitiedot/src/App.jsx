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

/* const Total = (total) => {
  return (
    <p>Number of exercises {total.count} </p>  
  )
} */ 

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <>
      <Header name={course} />
      <Content table={parts}/>
   </>
  )
}

export default App