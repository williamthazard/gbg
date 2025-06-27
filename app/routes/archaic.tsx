import type { Route } from "./+types/home";
import { NavLink } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "archaic" },
    { name: "a flower in a garden of forking paths", content: "you must change your life" },
  ];
}

export default function Archaic() {
 return(
    <div className="m-auto">
        <h1>ARCHAIC TORSO OF APOLLO</h1>
        <h4>Rainer Maria Rilke</h4>
        <br />
        We cannot know his legendary <NavLink to="/">head</NavLink> <br />
        with eyes like ripening fruit. And yet his torso <br />
        is still suffused with brilliance from inside, <br />
        like a lamp, in which his gaze, now turned to low, <br /><br />
        gleams in all its power. Otherwise <br />
        the curved breast could not <NavLink to="/frogs">dazzle</NavLink> you so, nor could <br />
        a smile run through the placid hips and thighs <br />
        to that dark center where procreation flared. <br /><br />
        Otherwise this stone would seem defaced <br />
        beneath the translucent cascade of the shoulders <br />
        and would not glisten like a wild beast’s fur: <br /><br />
        would not, from all the borders of itself, <br />
        burst like a star: for here there is no place <br />
        that does not see you. You must change your <NavLink to="/dash">life</NavLink>.
    </div>
    )   
}