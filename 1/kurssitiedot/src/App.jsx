const Header = (header) => {
  return (
      <h1>{header.name}</h1> 
  )
}

const Content = (content) => {
  return (
    <p>{content.name} {content.count}</p>
  )
}

const Total = (total) => {
  return (
    <p>Number of exercises {total.count} </p>  
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
      <Content name={part1} count={exercises1}/>
      <Content name={part2} count={exercises2}/>
      <Content name={part3} count={exercises3}/>
      <Total count={exercises1+exercises2+exercises3}/>
    </>
  )
}

export default App