import React, { useEffect, useState } from 'react'

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(()=> {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])
  return (
    <div className="App">
      {(typeof backendData.message === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        backendData.message.map((message, i) => (
          <p key={i}>{message}</p>
        ))
      )}
    </div>
  )
}

export default App;
