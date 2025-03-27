import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import {Navbar, Sidebar} from '../src/components/index'
import Layout from "./Layout";
function App() {
    return (
        <div className="">
            <div className="">
                <Navbar/>
                <Sidebar/>
            </div>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout/>}>
                        <Route path="/" element={<Dashboard />} />
                    </Route>
                </Routes>
            </BrowserRouter>
      </div>
    );
}
export default App;
