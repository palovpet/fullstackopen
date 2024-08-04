import { useState } from 'react'

const StatisticLine = (props) => {

  return (
    <p>{props.text} {props.value}</p>
  )
}

const Statistics = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        <h3>statistics</h3>
        <p>No feedback given</p>
      </div>
    )
  }

  const average = function(t) {
    if (t.length == 0){
      return 0
    }

    let sum = 0
    t.forEach(value => {
      sum = sum + value
    })
    return sum/t.length
  }

  const divide = function(a, b) {
    if (b == 0){
      return 0
    }
    return ((a / b)*100)
  }

  return (
    <div>
      <h3>statistics</h3>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value ={props.allClicks.length} />
      <StatisticLine text="average" value={average(props.allClicks)} />
      <StatisticLine text="positive" value={(divide(props.positives, props.allClicks.length) + '%')}/>
    </div>
  )

}

const Button = ({ handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])
  const [positives, setPositives] = useState(0)

  const handleGoodClick = () => {
    setAll(allClicks.concat(1))
    setGood(good + 1)
    setPositives(positives + 1)
  }

  const handleNeutralClick = () => {
    setAll(allClicks.concat(0))
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(allClicks.concat(-1))
    setBad(bad + 1)
  }

  return (
    <div>
      <h3>give feedback</h3>
      <div>
        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick={handleNeutralClick} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks} positives={positives}/>
    </div>
  )
}

export default App