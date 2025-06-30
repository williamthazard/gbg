import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import Grid from "./monomeGrid";
export default function GridLight({ connection, dirty, setDirty }: { connection: boolean, dirty: boolean, setDirty: React.Dispatch<React.SetStateAction<boolean>> }) {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const draw = () => {
      if (connection && dirty) {
        setTimeout(() => {
          const list = document.getElementsByTagName("a");
          Grid.clear();
          for(let i = 0; i < list.length; i++){
            Grid.led(i,0,2);
          }
          setDirty(false);
        }, 50);
      }
    };
    draw();
    const interval = setInterval(draw, 1000/120); //120 fps refresh rate
    Grid.key((x, y, z) => {
      Grid.led(x, y, z*15);
      const list = document.getElementsByTagName("a");
      for(let i = 0; i < list.length; i++){
        if (x <= i && y == 0) {
          if (z == 1 && x == i) {
            var str = list[x].href;
            var n = str.lastIndexOf('/');
            var result = str.substring(n + 1);
            var destination = String("/" + result);
            console.log("navigating to " + destination + " with monome grid");
            navigate(destination);
            setDirty(true);
          } else {
            Grid.led(x, y, 2)
          }
        }
      }
    })
    return () => clearInterval(interval);
  }, [connection, location, dirty, setDirty, navigate]);

  useEffect(() => {
    if (connection) {
      setDirty(true);
    }
  }, [location, connection]);
  return null;
}