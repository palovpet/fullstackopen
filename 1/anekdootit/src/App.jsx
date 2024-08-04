import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
    
  const [selected, setSelected] = useState(0) 
  const [points, setPoints] = useState(new Uint8Array(8))

  const handleSelection = () => {
    let rndm = Math.floor(Math.random() * 8)

    setSelected(rndm)
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)

  }

  const mostVoted = () => {
    let maxI = 0
    let maxV = points[0]

    for (let i = 1; i < points.length; i++) {
      if (points[i] > maxV) {
        maxV = points[i]
        maxI = i
      }
    }
    console.log(anecdotes[maxI])
    return anecdotes[maxI]
  }

  return (
    <div>
      <p><b>Anecdote of the day: </b> {anecdotes[selected]}</p>
        <button onClick={handleVote}>vote</button><button onClick={handleSelection}>next anecdote</button>
      
      <p><b>Anecdote with most votes: </b>{mostVoted()}</p>
      <p>{points}</p>
      
    </div>
  )
}


export default App