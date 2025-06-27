import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import * as React from 'react'
import type { Route } from "./+types/root";
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

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = React.useState(false);
  const [text, setText] = React.useState("Connect");
  const [dirty, setDirty] = React.useState(false);
  Grid.connected(() => {
    console.log("monome grid connected via webserial");
    setConnected(true);
    setText("Disconnect");
    setDirty(true);
  });
  Grid.removed(() => {
    console.log("monome grid disconnected from webserial");
    setConnected(false);
    setText("Connect");
    setDirty(false);
  })
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <div className="fixed bottom-20 right-20">
          <button onClick={
            connected ? () => {
              Grid.remove(); 
            } : () => {
              Grid.connect(); 
            }
          }>{text} Grid</button>
        </div>
        <GridLight connection={connected} dirty={dirty}/>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
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
