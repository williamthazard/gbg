import { NavLink } from "react-router-dom";

export default function Frogs() {
    return(
        <div className="flex items-center justify-center min-h-screen p-4 md:p-20">
            <div className="m-auto">
                <video width="1024" poster={`${import.meta.env.BASE_URL}frogs.jpeg`} src={`${import.meta.env.BASE_URL}frogs.mp4`} autoPlay loop controls />
                <br />
                <div className="flex justify-center">
                    <h1 className="text-center text-lg md:text-4xl lg:text-6xl">
                        <NavLink to="/">these</NavLink>&nbsp;
                        <NavLink to="/archaic">are</NavLink>&nbsp;
                        <NavLink to="/dash">the</NavLink>&nbsp;
                        <NavLink to="/eggs">frogs</NavLink>&nbsp;
                    </h1>
                </div>
            </div>
        </div>
    )   
}