import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import rspc, {queryClient, client} from './lib/rspc';
import router from "@/lib/router.ts";
import {RouterProvider} from "@tanstack/react-router";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <rspc.Provider client={client} queryClient={queryClient}>
            {/* @ts-ignore weird RouterProvider ts error */}
            <RouterProvider router={router}>
                <App/>
            </RouterProvider>
        </rspc.Provider>
    </React.StrictMode>,
)
