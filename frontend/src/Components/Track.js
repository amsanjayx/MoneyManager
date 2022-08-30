import React, {useEffect, useState, useContext} from "react"
import "../Components/style.css"
import {useNavigate} from "react-router-dom";
import { UserContext } from "../App";



const Track = () =>{
    // eslint-disable-next-line
    const {state, dispatch} = useContext(UserContext);

    const history = useNavigate();
    const [userData, setUserData] = useState({}); 
    const reload = () => {
        history("/");
        history("/Track");
        
    }

    
    const callTrackPage = async () =>{
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
            
            setUserData(data);
            
            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }
        }
        catch(err){
            console.log(err);
            history("/login");
        }
    }
    
    useEffect(()=>{
        callTrackPage();
        // eslint-disable-next-line
    }, []);


    //store updated data in states
    const handleInputs = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userData, [name]:value});
    }


    //send the data to backend
    const addTran = async (e) =>{
        e.preventDefault();
        const {Trans, amount} = userData;
        const res = await fetch("/update", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Trans, amount
            })   
        });


        const data = await res.json();
        //console.log(data);
        if(!data){
            console.log("Data not updated");
        }
        else{
            window.alert("Transaction added successfully/History updated");
            console.log("Transaction added");
            setUserData({...userData, Trans:"", amount:""});
            reload();
        }
        userData.Transactions.map((ele)=>{
            console.log(ele.Trans);
            console.log(ele.amount);
            if(ele.amount>0){
                return document.getElementById("tran-pos").innerHTML += ele.Trans+" : " +ele.amount+"<br/>"
            }
            else{
                return document.getElementById("tran-neg").innerHTML += ele.Trans+" : " +ele.amount+"<br/>"
            }

        })
    }




    return (
        
        <>
        <form method="GET">
            <div className="container">
            <h4>Your Balance</h4>
            <h1 id="balance">₹{ userData.balance}</h1>

            <div className="inc-exp-container">
                <div>
                <h4>Income</h4>
                <p id="money-plus" className="money plus">₹{ userData.income}</p>
                </div>
                <div>
                <h4>Expense</h4>
                <p id="money-minus" className="money minus">₹{ userData.expense}</p>
                </div>
            </div>

            <div className="histroy">
            <h3>Transaction History</h3>
            <ul id="list" className="list">
                    <div id="tran-pos">
                    
                    </div>
                    <div id="tran-neg">

                    </div>
            </ul>
            </div>
            <h3>Add new transaction</h3>
        <form id="form" method="POST" >
                <div className="form-control">
                <label id="trackhead1">Text</label>
                <input type="text" id="text" name="Trans" value={userData.Trans} onChange={handleInputs} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                <label id="trackhead2">Amount <br/> (negative - expense, positive - income)</label>
                <input type="number" id="amount" name="amount" value={userData.amount} onChange={handleInputs} placeholder="Enter amount..."/>
                </div>
                <button onClick={addTran} className="btn">Add transaction/Check history</button>
        </form>
        </div>
    </form>
        </>
    )
}

export default Track