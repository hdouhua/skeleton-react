import React, { useState } from 'react'

const countStyle = {
  display: 'inline-block',
  padding: '0 10px',
  fontWeight: '600'
}

const Counter: React.FC<{ value?: number }> = ({ value = 0 }) => {
  const [clicks, setClicks] = useState(value)

  function increaseAsync() {
    window.setTimeout(() => {
      setClicks(clicks + 1)
    }, 1000)
  }

  return (
    <>
      <h1>Counter</h1>
      <p>This is a simple example of a React component.</p>
      <button className="btn btn-primary" onClick={increaseAsync}>
        ++
      </button>
      &nbsp;
      <button className="btn btn-primary" onClick={() => setClicks(clicks + 1)}>
        +
      </button>
      <span style={countStyle}>{clicks}</span>
      <button className="btn btn-primary" onClick={() => setClicks(clicks - 1)}>
        -
      </button>
    </>
  )
}

export default Counter
