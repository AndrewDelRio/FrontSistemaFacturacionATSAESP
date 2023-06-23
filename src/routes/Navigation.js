import React from 'react'
import {Routes, Route} from "react-router-dom";
import LoginWindow from "../pages/LoginWindow/LoginWindow";

export const Navigation = () =>{
    return(
        <Routes>
            <Route path = "/" element ={<LoginWindow/>}/>
        </Routes>
    )
}