import React from 'react'
import {BrowserRouter} from "react-router-dom";
import { Navigation } from "./routes/Navigation";
import './App.css';

function App(){
  return(
    <BrowserRouter>
    <div className="App">
      <Navigation/>
    </div>
    </BrowserRouter>
  )
}
export default App;
