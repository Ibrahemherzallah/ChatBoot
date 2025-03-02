import { useEffect, useState } from "react";
import { NavBar } from "../components/navBar/navBar";
import Input from "../components/input/input";
// import { response } from "express";

const Home = () => {

  const [flag,setFlag] = useState(true);
  const [pokiName,setPokiName] = useState('');
  useEffect(() => {
    if(pokiName == "ditto" || pokiName == "Bulbasaur" || pokiName == "Ivysaur" || pokiName == "Venusaur" || pokiName == "	Charmander"){
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokiName}`)
      .then(response => response.json())
      .then(data => console.log("the data is  : ", data));
    }
    else {
      return;
    }
    console.log("the name is  : ", flag);
  },[flag])


  return(
    <div>
      <NavBar />
      <h1>your name is {flag? "BROO" : "areen"}</h1>
      <Input placeholder={"enter the pokimon name"} onChange={()=>{setPokiName(event.target.value)}}/>
      <br />
      <br />
      <button onClick={()=>{setFlag(!flag)}}>show data</button>
    </div>
  )
}
export default Home;