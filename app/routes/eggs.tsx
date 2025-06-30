import type { Route } from "./+types/home";
import { NavLink } from "react-router-dom";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "eggs" },
    { name: "a flower in a garden of forking paths", content: "this is an audio recording I took on my phone of my friend Zander playing some music in Chicago" },
  ];
}

export default function Eggs() {
 return(
    <div className="flex items-center justify-center min-h-screen p-4 md:p-20">
        <div>
            <div className="flex justify-center">
                <audio controls src={`${import.meta.env.BASE_URL}zander.wav`} autoPlay loop></audio><br />
            </div>
            <br />
            <div className="flex justify-center">
                <h1 className="text-center text-lg md:text-4xl lg:text-6xl">
                <NavLink to="/">the</NavLink>&nbsp;
                <NavLink to="/frogs">eggs</NavLink>&nbsp;
                <NavLink to="/dash">of</NavLink>&nbsp;
                <NavLink to="/archaic">time</NavLink>&nbsp;
                </h1>
            </div>
            <br />
            <div className="flex justify-center">
                <h5>
                music by Zander Raymond
                </h5>
            </div>
        </div>
    </div>
    )   
}