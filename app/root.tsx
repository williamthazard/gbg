import {
  useRouteError,
  isRouteErrorResponse,
  Outlet,
} from "react-router-dom";
import * as React from 'react'
import Grid from "./components/monomeGrid";
import GridLight from "./components/gridLight";
import "./app.css";

// let gridStates = []; // set up a 16x8 table for x and y
// for(let i = 0; i < 16; i++) {
//   gridStates.push([0]);
//   for(let j = 0; j < 8; j++) {
//     gridStates[i].push(0)
//   }
// }

// Grid.key((x: number, y: number, z: number) => {
//     //toggle example
//     // if (z == 1 && gridStates[x][y] == 0) {
//     //   gridStates[x][y] = 1
//     // } else if (z == 1 && gridStates[x][y] == 1) {
//     //   gridStates[x][y] = 0
//     // }
//     // Grid.led(x,y,gridStates[x][y]*15)
//     Grid.led(x,y,z*15) //momentary
// })

export function Layout() {
  const [connected, setConnected] = React.useState(false);
  const [text, setText] = React.useState("Connect");
  const [dirty, setDirty] = React.useState(false);
  React.useEffect(() => {
    Grid.connected(() => {
      console.log("monome grid connected");
      setConnected(true);
      setText("Disconnect");
      setDirty(true);
    });
    Grid.removed(() => {
      console.log("monome grid disconnected");
      setConnected(false);
      setText("Connect");
      setDirty(false);
    });
  }, []);
  return (
    <div className="min-h-screen w-full">
      <div className="fixed bottom-4 right-4 md:bottom-20 md:right-20">
        <button 
          className="opacity-75"
          onClick={
            connected ? () => { Grid.remove(); } : () => { Grid.connect(); }
          }
        >
          {text} Grid
        </button>
      </div>
      <GridLight connection={connected} dirty={dirty} setDirty={setDirty}/>
      <Outlet />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
