import React from "react"
import {NavLink} from "react-router-dom";

const Errorpage = () =>{
    return (
        <>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1 class="error">Error 404 <br/> WE ARE SORRY, PAGE NOT FOUND!</h1>
                        <NavLink to="/" id="error-link">Back to Homepage</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Errorpage 