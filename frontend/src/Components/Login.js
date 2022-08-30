import React, {useContext, useState} from "react"
import {NavLink, useNavigate} from "react-router-dom";
import { UserContext } from "../App";


const Login = () =>{
    // eslint-disable-next-line
    const {state, dispatch} = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();
    const isValid = Boolean(email && password);


    const loginUser = async (e) =>{
        e.preventDefault();


       const res = await fetch("/signin", {
            method : "POST",
            headers : { "Content-Type": "application/json"},
            body: JSON.stringify({email, password})
       })
       const data = await res.json();
       //console.log(data.error);
        if(data.error === "Wrong email or password"){
            window.alert(data.error);
            console.log(data);
        }
        else if(data.message === "User signin successfully"){
            dispatch({type:"USER", payload:true})
            window.alert("Login Successful");
            history("/");
        }
       else{
            window.alert("Invalid credentials");
            console.log("Invalid credentials");
       }
    }
    return (
       <>
                <section className="login">
                <div className="login-1">
                    <div className="login-content">
                        <div className="login-form">
                            <h2 className="login-title" id="login_heading">Login</h2>
                            <form method ="POST" className="login-form" id="login-form">  
                                
                                <i className="zmdi zmdi-email material-icon-name"></i> E-mail : <input type="text"  id="Email" autoComplete="off" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <label className="alert" id="email"></label><br/> 

                                <i className="zmdi zmdi-lock material-icon-name"></i>  Password : <input type="password" id="Password" autoComplete="off" placeholder="Your Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <label className="alert" id="pwd"></label><br/> <br/> 

                                <i className="zmdi zmdi-caret-down-circle"></i><br/>
                                <input type="submit" value="Log In" id="Submit" onClick={loginUser} disabled={!isValid} title={isValid ? "Create your post" : "All fields must be filled out."}/><br/><br/>
                                <label className="success" id="successbutton"></label><br/> <br/>
                            </form>
                        </div>
                            <div className="login_img">   
                                <NavLink to="/register" className="login-image-link" id="login-image-link">Not registered yet?</NavLink>
                            </div> 
                    </div>
                </div>
            </section>
       </>
    )
}

export default Login