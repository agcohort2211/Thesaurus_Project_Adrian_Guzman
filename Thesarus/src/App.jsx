import React from 'react'
import './App.css'
import axios from 'axios'
import {useQuery} from 'react-query'




function App() {
const [inputWord, setInputWord] = React.useState('example')

console.log(inputWord)

function handleChange(event){
  event.preventDefault()
  setInputWord(event.target.value)
  
}

 function getSynonym(){
  return axios
  .get(`https://api.datamuse.com/words?rel_syn=${inputWord}`).then((res) => res.data);
   }

 

  const {isError,isLoading,data,refetch} = useQuery('words',getSynonym);

 if(isLoading){
  return <p>Loading...</p>
}

if(isError){
  return <p>Error</p>
}

//console.log("data is", data)

const synonyms = data.map(syn => <button key={syn.word} className='synonyms-Btn'>{syn.word} </button>)

 return(
    
    <div>
     
    <h1 className ="Title">Thesaurus</h1>
      <div className='flex'>
        <input type = "text" className= "text-Box" onChange={handleChange} placeholder='example'/> 
        <button onClick={refetch} className="search-Box" >Search</button>
      </div>

    <p className ='synonyms'> {synonyms} </p>
  
   
    </div>
  ) 

}

export default App
