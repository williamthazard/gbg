import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"), 
    route("archaic","routes/archaic.tsx"),
    route("frogs","routes/frogs.tsx"),
    route("dash","routes/dash.tsx"),
    route("eggs","routes/eggs.tsx")
] satisfies RouteConfig;