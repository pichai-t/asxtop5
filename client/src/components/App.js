import React, {useState, useEffect} from 'react'

function App() {

  const [backendData, setBackendData] = useState([{}]);
  // useEffect( () => {
  //                   setBackendData({"users": ["Pichai1", "Pichai2", "Pichai3", "Pichai5  "]})           
  //                  }, []);

  useEffect( () => {
    fetch("/api").then( 
        response => response.json()).then(
          data => {
            setBackendData(data)
          }
        )
  }, []);

  return (
    <div>

    { (typeof backendData.users === 'undefined') ? (
      <h3> Loading....</h3>
      ) : (
        backendData.users.map(  (user, id) => (
        <p key={id}>  {user} </p>
      )) )
    }
    </div>

  )
}

export default App