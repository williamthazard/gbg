import type { Route } from "./+types/home";
import { NavLink } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "eggs" },
    { name: "a flower in a garden of forking paths", content: "this is an audio recording I took on my phone of my friend Zander playing some music in Chicago" },
  ];
}

export default function Eggs() {
 return(
    <div className="m-auto">
        <div className="flex justify-center">
            <audio controls src="../public/zander.wav" autoPlay loop></audio><br />
        </div>
        <br />
        <div className="flex justify-center">
            <h1>
            <NavLink to="/">the </NavLink> 
            <NavLink to="/frogs">eggs </NavLink> 
            <NavLink to="/dash">of </NavLink> 
            <NavLink to="/archaic">time </NavLink>
            </h1>
        </div>
        <br />
        <div className="flex justify-center">
            <h5>
            music by Zander Raymond
            </h5>
        </div>
    </div>
    )   
}