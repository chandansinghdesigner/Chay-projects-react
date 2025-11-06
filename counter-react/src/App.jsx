import { useState } from 'react'
import './App.css'

function App() {
  let [Counter, setCounter] = useState(15)

  const addValue = () => {
    if (Counter < 20) {
      setCounter(Counter * 2)
    } else {
      console.log("Maximum limit reached (20)")
    }
  }

  const removeValue = () => {
    if (Counter > 0) {
      setCounter(Counter - 1)
    } else {
      console.log("Counter can't go below 0")
    }
  }

  return (
    <>
      <h1>Chai or React</h1>
      <h2>Counter Value : {Counter}</h2>

      <button onClick={addValue}>Add Value</button>
      <button onClick={removeValue}>Remove Value</button>
    </>
  )
}

export default App
