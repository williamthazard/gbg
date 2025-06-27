import type { Route } from "./+types/home";
import { NavLink } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "frogs" },
    { name: "a flower in a garden of forking paths", content: "this is a video of some frogs that my friend Dean sent me – well, he sent me the video, not the frogs" },
  ];
}

export default function Frogs() {
    return(
        <div className="m-auto p-20">
            <video width="1024" poster="../public/frogs.jpeg" src="../public/frogs.mp4" autoPlay loop controls />
            <br />
            <div className="flex justify-center">
                <h1>
                    <NavLink to="/">these </NavLink> 
                    <NavLink to="/archaic">are </NavLink> 
                    <NavLink to="/dash">the </NavLink> 
                    <NavLink to="/eggs">frogs</NavLink>
                </h1>
            </div>
        </div>
    )   
}