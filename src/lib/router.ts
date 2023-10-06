import {RootRoute, Route, Router} from "@tanstack/react-router";
import App from "@/App.tsx";
import Index from "@/pages";
import ConnectionPage from "@/pages/connection.tsx";
import CreateConnection from "@/pages/create-connection.tsx";
import {client} from "@/lib/rspc.ts";
import Database from "tauri-plugin-sql-api";

const rootRoute = new RootRoute({
    component: App,
});

const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Index,
});

const connectionsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/connections/$id",
    component: ConnectionPage,
    beforeLoad: async ({params}) => {
        const result = await client.query(["connections", Number(params.id)]);
        const db = await Database.load(result[0].connection_string || "");
        return {
            connection: result[0],
            db
        };
    },
});

const createConnectionRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/connections/create",
    component: CreateConnection,
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
    indexRoute,
    connectionsRoute,
    createConnectionRoute,
]);
const router = new Router({routeTree});
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

// Create the router using your route tree
export default router;
