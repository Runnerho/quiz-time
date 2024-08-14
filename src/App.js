import { useState } from 'react';
import './App.css';
import Header from './components/header';
import Section from './components/quiz';


function App() {
  //when your click start button, start times and show section
  const [start,SetStart] = useState(false)
  return (
    <div className="App">
      <Header/>
      {!start && <button className='start-button' onClick={()=>SetStart(true)}>start?</button>}
      {start && <Section/>}
    </div>
  )
}

export default App;
