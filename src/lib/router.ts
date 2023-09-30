import {RootRoute, Route, Router} from "@tanstack/react-router";
import App from "@/App.tsx";
import Index from "@/pages";

const rootRoute = new RootRoute({
    component: App,
})

const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Index,
})

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([indexRoute])
const router = new Router({ routeTree })
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

// Create the router using your route tree
export default router