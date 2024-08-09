/* const Total = ({ sum }) => <p>Number of exercises {sum}</p> */

const Course = ( {course} ) => {
  const header = course.name
  const content = course.parts

  const total = content.reduce((sum, part) => {
    const newSum = sum + part.exercises
    return newSum
  }, 0)
  

  return (
    <div>
      <h1>{header}</h1>
      {content.map(part => (
        <p>
          {part.name} {part.exercises}
        </p>
      ))}
      <p>
        <b>total of {total} exercises</b>
      </p>
    </div>
  )

}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }

    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}


export default App