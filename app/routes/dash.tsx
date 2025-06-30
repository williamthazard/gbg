import type { Route } from "./+types/home";
import { NavLink } from "react-router-dom";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "dash" },
    { name: "a flower in a garden of forking paths", content: "Søren Kierkegaard" },
  ];
}

export default function Dash() {
    return(
      <div className="flex items-center justify-center min-h-screen p-4 md:p-20">
        <div>
            I have just now come from a <NavLink to="/frogs">party</NavLink> where I was its <NavLink to="/">life</NavLink> and <NavLink to="../archaic">soul</NavLink>; witticisms streamed from my lips, everyone laughed and admired me, but I went away — yes, the dash should be as long as the radius of the <NavLink to="/eggs">earth</NavLink>'s orbit ——————————— and wanted to shoot myself.
        </div>
      </div>
    )   
}