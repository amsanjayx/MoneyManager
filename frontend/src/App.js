import React, { useReducer, createContext } from "react";
import {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Track from "./Components/Track";
import Logout from "./Components/Logout"
import Errorpage from "./Components/Errorpage";
import { initialState, reducer } from "./reducer/UseReducer";



//contextAPI
export const UserContext = createContext();

const App = () =>{

    const [state,dispatch] = useReducer(reducer, initialState )
    return (
        <>
            <UserContext.Provider value={{state,dispatch}}>
            <Navbar/>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/track" element={<Track />} />
                <Route exact path="/logout" element={<Logout />} />
                <Route path="*" element={<Errorpage />} />
            </Routes>
            </UserContext.Provider>
        </>
    )
}

export default App