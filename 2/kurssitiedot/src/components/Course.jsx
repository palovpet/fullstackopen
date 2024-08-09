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

  export default Course