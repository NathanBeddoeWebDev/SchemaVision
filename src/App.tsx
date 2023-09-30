import './App.css'
import './styles/globals.css'
import Sidebar from "./components/Sidebar.tsx";
import {Outlet, RootRoute} from "@tanstack/react-router";
function App() {

  return (
    <>
        <Sidebar></Sidebar>
        <main className={"pl-64"}>
            <Outlet />
        </main>
    </>
  )
}

export default App
