import type { Route } from "./+types/home";
import { NavLink } from "react-router-dom";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "the glass bead game" },
    { name: "a garden of forking paths", content: "welcome to the glass bead game" },
  ];
}

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4 md:p-20">
      <h1 className="text-center text-lg md:text-4xl lg:text-6xl">
        <NavLink to="/archaic">the</NavLink>&nbsp;
        <NavLink to="/frogs">glass</NavLink>&nbsp;
        <NavLink to="eggs">bead</NavLink>&nbsp;
        <NavLink to="/dash">game</NavLink>&nbsp;
      </h1>
    </div>
  );
}