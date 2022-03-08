//Database setup
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDmiCwVMXulyRN6xk-fQfKGxXTTBENKNM",
  authDomain: "motoronoff-a6aad.firebaseapp.com",
  projectId: "motoronoff-a6aad",
  storageBucket: "motoronoff-a6aad.appspot.com",
  messagingSenderId: "500048995531",
  appId: "1:500048995531:web:c3b587cff300383125a74e",
  measurementId: "G-0070J5V870"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {getDatabase, ref , get , set, child, update, remove} 
from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";
const db=getDatabase();






let btn= document.getElementById('btn');
let clk= document.getElementById('clk');
let sub=document.getElementById('sub');

btn.disabled=true;


function SelectData(){
    const dbref=ref(db);
    get(child(dbref, "motorData")).then((snapshot)=>{
        if(snapshot.exists()){
            btn.innerText=snapshot.val().motor_status;
            console.log(snapshot.val().motor_status);
        }
        else{
            console.log("no data found")
        }
    })
    .catch(err=>{
        console.log("unsuccessful error"+err);
    });
}

SelectData();


function InsertData(){
    set(ref(db,"motorData"),{
        motor_status: btn.innerText,
    })
    .then(()=>{
        console.log("data stored successfully");
    })
    .catch(err=>{
        console.log("unsuccessful error"+err);
    })
}




const password= '1234';
sub.onclick=function(){
    let inp=document.getElementById('pass');
    let inputVal=inp.value;
    console.log(inputVal);
    if(inputVal===password)
    {
        btn.disabled=false;
        inp.value='';
        inp.style.borderColor='rgb(255, 123, 0)';
        sub.style.borderColor='rgb(255, 123, 0)';
    }
    else{
        btn.disabled=true;
        inp.value='';
        inp.style.borderColor='gray';
        sub.style.borderColor='gray';
    }
}




btn.onclick=function()
{
   
    
    btn.classList.toggle('active');
    if(btn.innerText==='TURN ON')
    {
        btn.innerText='TURN OFF';
        clk.style.color='red';
        btn.style.color='gray';
        setTimeout(function(){
            alert("Motor Is Running now");
        }, 1000);
        
    }
    else 
    {
        btn.innerText='TURN ON';
        clk.style.color='gray';
        btn.style.color='red';
        setTimeout(function(){
            alert("Motor Is OFF now");
        }, 1000);
    } 
    InsertData();
}