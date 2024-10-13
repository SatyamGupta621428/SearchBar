import { useState, useEffect } from 'react'

function App() {
  
  const API_URL = 'https://randomuser.me/api/?results=30'
  const[data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  useEffect(()=>{
     async function callAPI(){
      const response = await fetch(API_URL)
      const api_data = await response.json()
      setData(api_data.results)
     }
     callAPI()
  }, [])

  const[txtValue, setTxtValue] = useState('')
  
  const handleInput = (e)=>{
    setTxtValue(e.target.value)
  }

  useEffect(()=>{
    //write the logic for checking if the words in the data array starts with the textbox value
    const filteredData = data.filter((item)=>item.name.first.toLowerCase().startsWith(txtValue.toLowerCase()))
    setFilteredData(filteredData);
  }, [txtValue])

  return (
    <>
    <div>
      <input type="text" placeholder='Type To Search...' value = {txtValue} onChange={handleInput}/>
    </div>
    <div>
      {txtValue.length > 0 && filteredData.map((item, index)=> (
        <li key = {index}>{item.name.first + "  "}{item.name.last}</li>))}
    </div>
    </>
  )
}

export default App
