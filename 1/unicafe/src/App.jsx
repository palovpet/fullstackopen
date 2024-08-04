import { useState } from 'react'

const Statistics = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      <p> all {props.allClicks.length}</p>
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

  const divide = function(a, b) {
    if (b == 0){
      return 0
    }
    return ((a / b)*100)
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

  return (
    <div>
      <h3>give feedback</h3>
      <div>
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
      </div>
      <h3>statistics</h3>
      <p> good {good} </p>
      <p> neutral {neutral} </p>
      <p> bad {bad}</p>
      <p> all {allClicks.length}</p>
      <p> average {average(allClicks)}</p>
      <p> positive {divide(positives, allClicks.length)}%</p>
      <Statistics allClicks={allClicks} />
    </div>
  )
}

export default App