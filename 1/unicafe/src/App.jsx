import { useState } from 'react'

const Statistics = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
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
      <p> good {props.good} </p>
      <p> neutral {props.neutral} </p>
      <p> bad {props.bad}</p>
      <p> all {props.allClicks.length}</p>
      <p> average {average(props.allClicks)}</p>
      <p> positive {divide(props.positives, props.allClicks.length)}%</p>
    </div>
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
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks} positives={positives}/>
    </div>
  )
}

export default App