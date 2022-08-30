import React , {useState} from "react"
import {NavLink, useNavigate} from "react-router-dom";

const Register = () =>{

    const history = useNavigate();
    const [user, setUser] = useState({
        name:"", email:"", mobile:"", password:"", cpassword:""
    });
    const isValid = Boolean(user.name && user.email && user.mobile && user.password && user.cpassword);

    let name, value;
    const handleInputs = (e)=>{
        name = e.target.name;
        value = e.target.value;


        setUser({...user, [name]:value});
    }


    const PostData = async (e) =>{
        e.preventDefault();

        const {name, email, mobile, password, cpassword} =user;

        const res = await fetch("/register", {
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name, email, mobile, password, cpassword
            })
        });

        const data = await res.json();
        // console.log(data);
        // console.log(data.error);
        if(data.error === "Password not matching"){
            window.alert("Password not matching")
            console.log("Password not matching");
        }
        else if(data.error === "Email already exists"){
            window.alert("Email already exists")
            console.log("Email already exists");
        }
        else if(data.message === "Succesfully registered"){
            window.alert("Succesfully registered")
            console.log("Succesfully registered");
            history("/login");
        }
        else{
            window.alert(data.error)
            console.log(data.error); 
        }
    }

    return (
        <>
            <section className="registration">
                <div className="registration-1">
                    <div className="registration-content">
                        <div className="registration-form">
                            <h2 className="registration-title" id="register_heading">Registration</h2>
                            <form method="POST" className="register-form" id="register-form">  
                                <p> <i className="zmdi zmdi-account material-icon-name"></i> Name : <input type="text" name="name" id="name" autoComplete="off" placeholder="Your Name" value={user.name} onChange={handleInputs}/></p>
                                <label className="alert" id="name"></label><br/>  

                                <p> <i className="zmdi zmdi-email material-icon-name"></i> E-mail : <input type="text" name="email" id="email" autoComplete="off" placeholder="Your Email" value={user.email} onChange={handleInputs}/></p>
                                <label className="alert" id="email"></label><br/> 

                                <p> <i className="zmdi zmdi-phone-in-talk material-icon-name"></i> Mobile : <input type="number" name="mobile" id="mobile" autoComplete="off" placeholder="Your Number" value={user.mobile} onChange={handleInputs}/> </p>
                                <label className="alert" id="mobile"></label><br/> <br/> 

                                <p> <i className="zmdi zmdi-lock material-icon-name"></i>  Password : <input type="password" name="password" id="password" autoComplete="off" placeholder="Your Password" value={user.password} onChange={handleInputs}/> </p>
                                <label className="alert" id="pwd"></label><br/> <br/> 

                                <p> <i className="zmdi zmdi-lock material-icon-name"></i>   Confirm Password : <input type="password" name="cpassword" id="cPassword" autoComplete="off" placeholder="Confirm Your Password" value={user.cpassword} onChange={handleInputs}/> </p>
                                <label className="alert" id="cpwd"></label><br/> <br/>  

                                <i className="zmdi zmdi-caret-down-circle"></i>
                                <p><input type="submit" value="Register" id="Submit" onClick={PostData} disabled={!isValid} title={isValid ? "Create your post" : "All fields must be filled out."}/></p><br/>
                                <label className="success" id="successbutton"></label><br/> <br/>
                            </form>
                        </div>
                            <div className="register_img">  
                                <NavLink to="/login" className="register-image-link" id="register-image-link">Already registered?</NavLink>
                            </div> 
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register