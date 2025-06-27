import type { Route } from "./+types/home";
import { NavLink } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "the glass bead game" },
    { name: "a garden of forking paths", content: "welcome to the glass bead game" },
  ];
}

export default function Home() {
  return (
    <div className="m-auto">
      <h1>
        <NavLink to="/archaic">the </NavLink> 
        <NavLink to="/frogs">glass </NavLink> 
        <NavLink to="eggs">bead </NavLink> 
        <NavLink to="/dash">game </NavLink>
      </h1>
    </div>
  );
}