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
      <h2>{header}</h2>
      {content.map(part => (
        <p key={part.id}>
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
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Käpistelyh</h1>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  )
}


export default App