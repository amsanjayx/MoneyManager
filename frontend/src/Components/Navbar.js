import React, {useContext} from "react"
import "bootstrap/dist/css/bootstrap.css";
import {NavLink} from "react-router-dom";
import logo from "../Components/images/logo.png"
import { UserContext } from "../App";

const Navbar = () =>{
    // eslint-disable-next-line
    const {state, dispatch} = useContext(UserContext);
    const RenderMenu = () =>{
        if(state){
            return(
                <>
                    <li className="nav-item active">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/Track">Track</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/Logout">Logout</NavLink>
                    </li>
                </>
            )
        }
        else{
            return(
            <>
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Login">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Register">Register</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Track">Track</NavLink>
                        </li>
            </>
             )

        }
    }
    return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light" id="navbar">
                <NavLink className="navbar-brand" to="#">
                <NavLink to="/">
                    <img src={logo} alt="logo" id="logo-img"/>
                </NavLink>
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto">
                       <RenderMenu />
                    </ul>
                </div>
                </nav>
            </>
    )
}

export default Navbar