import React, {useState, useEffect} from "react"

const Home = () =>{
    const [userName, setUserName] = useState(""); 
    const [show, setShow] = useState(false);

    const userHomePage = async () =>{
        try{
            const res = await fetch("/track", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials:"include"
            });

            const data = await res.json();
            console.log(data);
            setUserName(data.name);
            setShow(true);
            
        }
        catch(err){
            console.log(err);
        }
    }

    
    useEffect(()=>{
        userHomePage();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="home-page">
                <div className="home-div">
                    <h1 id="nameh1">Track your expenses with ease.</h1>
                    <h2 id="homeh2">{show ? userName.toUpperCase() : "Money Manager"}</h2>
                    <h3 id="homeh3">{show ? "Great to have you back!" : "By Sanjay Sharma"}</h3>
                </div>
            </div>
        </>
    )
}

export default Home