const Header = (header) => {
  return (
      <h1>{header.name}</h1> 
  )
}

const Content = (content) => {
  return (
    <div>
    <p>{content.part1} {content.exercises1}</p>
    <p>{content.part2} {content.exercises2}</p>
    <p>{content.part3} {content.exercises3}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header name={course} />
      <Content part1={part1} exercises1={exercises1} 
      part2={part2} exercises2={exercises2} 
      part3={part3} exercises3={exercises3}
      />
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </>
  )
}

export default App