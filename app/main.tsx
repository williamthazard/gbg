import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Layout, ErrorBoundary } from "./root";
import Home from "./routes/home";
import Archaic from "./routes/archaic";
import Frogs from "./routes/frogs";
import Dash from "./routes/dash";
import Eggs from "./routes/eggs";
import Heat from "./routes/heat";

// This assumes your index.html has <div id="root"></div>
const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
        <Route index element={<Home />} errorElement={<ErrorBoundary />}/>
        <Route path="archaic" element={<Archaic />} errorElement={<ErrorBoundary />}/>
        <Route path="frogs" element={<Frogs />} errorElement={<ErrorBoundary />}/>
        <Route path="dash" element={<Dash />} errorElement={<ErrorBoundary />}/>
        <Route path="eggs" element={<Eggs />} errorElement={<ErrorBoundary />}/>
        <Route path="heat" element={<Heat />} errorElement={<ErrorBoundary />}/>
        {/* todo: add a 404 route */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  </HashRouter>
);