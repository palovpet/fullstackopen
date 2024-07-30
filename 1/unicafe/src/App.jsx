import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h3>give feedback</h3>
      <div>
        <button onClick={() => setGood(good + 1)}>
          good
        </button>
        <button onClick={() => setNeutral(neutral + 1)}>
          neutral
        </button>
        <button onClick={() => setBad(good + 1)}>
          bad
        </button>
      </div>
      <h3>statistics</h3>
      <p> good {good} </p>
      <p> neutral {neutral} </p>
      <p> bad {bad}</p>
    </div>
  )
}

export default App