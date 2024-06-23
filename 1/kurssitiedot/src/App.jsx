const Header = ({ name }) => {
  return (
      <h1>{name}</h1> 
  )
}

const Content = ({ course }) => {
  return (
    <p>{ course.name } { course.exercises }</p>
  )
}

/* const Total = (total) => {
  return (
    <p>Number of exercises {total.count} </p>  
  )
} */

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <>
      <Header name={course} />
      <Content course={part1}/>
      <Content course={part2}/>
      <Content course={part3}/>
    </>
  )
}

export default App